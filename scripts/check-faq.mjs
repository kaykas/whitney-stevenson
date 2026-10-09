#!/usr/bin/env node
/**
 * Guardrail for per-page FAQPage JSON-LD (ERRORS.md 2026-10-04).
 *
 * Any crawlable route that ships FAQPage structured data must ship exactly
 * one block, and every Question name and Answer text in it must also appear
 * in the page's visible HTML (scripts stripped). FAQ copy may not contain em
 * dashes (site voice rule). Routes listed in REQUIRED must carry a FAQPage.
 *
 * Reads the PRERENDERED HTML, same as the other postbuild checks.
 * Standalone: `npm run check:faq`.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const APP_DIR = join(process.cwd(), ".next", "server", "app");
const NOT_CRAWLABLE = new Set(["_global-error.html", "_error.html", "_not-found.html"]);
const REQUIRED = ["/", "/blog/first-venue-walkthrough", "/blog/freelance-to-in-house",
  "/blog/latin-billboard-awards-artist-relations", "/blog/pepsico-tostitos-super-bowl-2026",
  "/blog/sunglasses-shops-and-bodywork", "/blog/the-target-run",
  "/blog/anchoring-arxan-three-years-rsa", "/blog/presidio-golf-300-tournaments",
  "/blog/b2b-client-golf-outing"];

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

function routeOf(file) {
  const rel = relative(APP_DIR, file).split(sep).join("/");
  const path = "/" + rel.replace(/\.html$/, "").replace(/(^|\/)index$/, "");
  return path === "/" ? "/" : path.replace(/\/$/, "");
}

function decode(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}

const norm = (s) => s.replace(/\s+/g, " ").trim();

function jsonLdBlocks(html) {
  return [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((m) => {
      try { return JSON.parse(m[1]); } catch { return null; }
    })
    .filter(Boolean);
}

function visibleText(html) {
  const body = html.replace(/<script\b[\s\S]*?<\/script>/gi, " ").replace(/<style\b[\s\S]*?<\/style>/gi, " ");
  return norm(decode(body.replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]+>/g, " ")));
}

const pages = walk(APP_DIR)
  .filter((f) => f.endsWith(".html"))
  .filter((f) => !NOT_CRAWLABLE.has(relative(APP_DIR, f).split(sep).pop()));

if (pages.length === 0) {
  console.error("check-faq: no prerendered HTML found in .next/server/app");
  process.exit(1);
}

const failures = [];
const withFaq = new Set();

for (const file of pages) {
  const route = routeOf(file);
  const html = readFileSync(file, "utf8");
  const faqs = jsonLdBlocks(html).filter((b) => b["@type"] === "FAQPage");
  if (faqs.length === 0) continue;
  withFaq.add(route);
  if (faqs.length > 1) {
    failures.push(`${route}: ${faqs.length} FAQPage blocks, expected 1`);
    continue;
  }
  const items = faqs[0].mainEntity ?? [];
  if (items.length === 0) failures.push(`${route}: FAQPage has no questions`);
  const text = visibleText(html);
  for (const q of items) {
    const name = norm(q.name ?? "");
    const answer = norm(q.acceptedAnswer?.text ?? "");
    if (!name || !answer) failures.push(`${route}: question missing name or answer`);
    if (!text.includes(name)) failures.push(`${route}: question not visible on page: "${name}"`);
    if (!text.includes(answer)) failures.push(`${route}: answer not visible on page for "${name}"`);
    if (route !== "/" && /—/.test(name + answer)) failures.push(`${route}: em dash in FAQ "${name}"`);
  }
}

for (const route of REQUIRED) {
  if (!withFaq.has(route)) failures.push(`${route}: expected a FAQPage block, found none`);
}

if (failures.length) {
  console.error("\ncheck-faq FAILED — FAQPage JSON-LD must mirror visible Q&As:\n");
  for (const f of failures) console.error(`  ✗ ${f}`);
  console.error("\nSee ERRORS.md (2026-10-04). Post FAQs live in `faqs` on src/lib/posts.ts.\n");
  process.exit(1);
}

console.log(`check-faq: ${withFaq.size} routes with FAQPage OK — every Q&A is visible on the page`);
