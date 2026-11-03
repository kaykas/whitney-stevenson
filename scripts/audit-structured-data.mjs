#!/usr/bin/env node
// Google rich-results validation audit over the real Next.js prerender output.
//
// Ahrefs/GSC "Structured data has Google rich results validation error"
// (13 URLs, 2026-10-22). /compare pages listed the products under comparison
// as `Article.about: [{ "@type": "SoftwareApplication", name }]`. Google
// validates every SoftwareApplication node it finds, nested or not, as a
// Software App rich result, which requires `offers` plus `aggregateRating` or
// `review`. A name-only node fails both, so each page reported an error. Those
// `about` entries are now typed `Thing`, which has no rich-result requirements.
//
// Each page hand-writes its JSON-LD, so a new page can reintroduce the
// pattern with a green build. This fails the build when any JSON-LD node is
// missing the fields Google requires for its rich-result type.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const APP_DIR = process.argv[2] || ".next/server/app";
const SCAN_SOURCE = !process.argv[2];

function htmlFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) out.push(...htmlFiles(path));
    else if (name.endsWith(".html")) out.push(path);
  }
  return out;
}

function routeOf(file) {
  const rel = relative(APP_DIR, file).replace(/\\/g, "/").replace(/\.html$/, "");
  return rel === "index" ? "/" : `/${rel}`;
}

function collectNodes(value, out) {
  if (Array.isArray(value)) value.forEach((v) => collectNodes(v, out));
  else if (value && typeof value === "object") {
    if (value["@type"]) out.push(value);
    Object.values(value).forEach((v) => collectNodes(v, out));
  }
  return out;
}

const has = (node, key) => node[key] !== undefined && node[key] !== null && node[key] !== "";
const typesOf = (node) => [].concat(node["@type"]);

// Per-type checks. Each returns a list of problems for one node.
const CHECKS = {
  // Software App rich result: offers AND (aggregateRating OR review).
  SoftwareApplication: (n) => [
    ...(has(n, "offers") ? [] : ["missing offers (missing-offers-or-review)"]),
    ...(has(n, "aggregateRating") || has(n, "review")
      ? []
      : ["missing aggregateRating or review (missing-offers-or-review)"]),
  ],
  // Product snippets: offers, review or aggregateRating.
  Product: (n) =>
    has(n, "offers") || has(n, "review") || has(n, "aggregateRating")
      ? []
      : ["missing offers, review or aggregateRating (missing-offers-or-review)"],
  Article: (n) => ["headline", "datePublished", "author"].filter((k) => !has(n, k)).map((k) => `missing ${k}`),
  Question: (n) => [
    ...(has(n, "name") ? [] : ["missing name"]),
    ...(has(n, "acceptedAnswer") && has(n.acceptedAnswer, "text") ? [] : ["missing acceptedAnswer.text"]),
  ],
  BreadcrumbList: (n) => {
    const items = [].concat(n.itemListElement ?? []);
    if (items.length === 0) return ["empty itemListElement"];
    return items.flatMap((it, i) => [
      ...(has(it, "position") ? [] : [`item ${i + 1} missing position`]),
      ...(has(it, "name") || (it.item && has(it.item, "name")) ? [] : [`item ${i + 1} missing name`]),
      // Only the last crumb may omit `item`.
      ...(i < items.length - 1 && !has(it, "item") ? [`item ${i + 1} missing item`] : []),
    ]);
  },
};
CHECKS.SoftwareApplication.aliases = ["WebApplication", "MobileApplication", "VideoGame"];
for (const alias of CHECKS.SoftwareApplication.aliases) CHECKS[alias] = CHECKS.SoftwareApplication;
CHECKS.BlogPosting = CHECKS.Article;
CHECKS.NewsArticle = CHECKS.Article;

const failures = [];
let pages = 0;
let blocks = 0;
let nodes = 0;

for (const file of htmlFiles(APP_DIR)) {
  const html = readFileSync(file, "utf8");
  const route = routeOf(file);
  const scripts = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  if (scripts.length === 0) continue;
  pages++;
  let faqPages = 0;
  for (const [, body] of scripts) {
    blocks++;
    let json;
    try {
      json = JSON.parse(body);
    } catch (err) {
      failures.push(`${route}: JSON-LD does not parse (${err.message})`);
      continue;
    }
    for (const node of collectNodes(json, [])) {
      nodes++;
      for (const type of typesOf(node)) {
        if (type === "FAQPage") faqPages++;
        const check = CHECKS[type];
        if (!check) continue;
        for (const problem of check(node)) {
          failures.push(`${route}: ${type}${node.name ? ` "${node.name}"` : ""} ${problem}`);
        }
      }
    }
  }
  // Google reports "Duplicate field FAQPage" when a page carries more than one.
  if (faqPages > 1) {
    failures.push(`${route}: ${faqPages} FAQPage nodes (Google allows one per page) [duplicate-faq]`);
  }
}

// JSON-LD rendered through next/script is injected client-side, so it is
// absent from the prerendered HTML this audit reads but present in the DOM
// Googlebot renders. The homepage FAQPage shipped that way and duplicated the
// layout's. Require plain <script> tags so the checks above see everything.
function sourceFiles(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) out.push(...sourceFiles(path));
    else if (/\.(tsx|jsx)$/.test(name)) out.push(path);
  }
  return out;
}
if (SCAN_SOURCE) {
  const sourceRoots = existsSync("src") ? ["src"] : ["app", "components", "lib"];
  for (const root of sourceRoots) {
    for (const file of sourceFiles(root)) {
      const src = readFileSync(file, "utf8");
      for (const [tag] of src.matchAll(/<Script\b[^>]*>/g)) {
        if (tag.includes("ld+json")) {
          failures.push(`${file}: JSON-LD rendered via next/script; use a plain <script> tag`);
        }
      }
    }
  }
}

if (failures.length) {
  console.error(`structured-data audit FAILED: ${failures.length} Google rich-results validation error(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  console.error(
    "\nFix: give the node the fields Google requires, or, for products only named as an " +
      'article\'s subject, type them `"@type": "Thing"` instead of SoftwareApplication/Product.',
  );
  process.exit(1);
}

console.log(
  `structured-data audit OK: ${pages} pages, ${blocks} JSON-LD blocks, ${nodes} typed nodes, zero Google rich-results validation errors.`,
);
