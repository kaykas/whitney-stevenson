#!/usr/bin/env node
/**
 * Guardrail for the AEO finding "no BreadcrumbList on non-home pages"
 * (ERRORS.md 2026-10-01).
 *
 * Every crawlable non-home route must ship exactly one BreadcrumbList JSON-LD
 * block whose trail starts at the homepage, ends at the route itself, has
 * contiguous 1-based positions, and only uses canonical-origin URLs. For blog
 * posts, the last crumb's name must also appear in the page's <h1>, so the
 * structured data can't drift from what a reader sees.
 *
 * Reads the PRERENDERED HTML, same as the other postbuild checks, so a new
 * route that forgets <BreadcrumbJsonLd> fails `npm run build`.
 * Standalone: `npm run check:breadcrumbs`.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const APP_DIR = join(process.cwd(), ".next", "server", "app");
const ORIGIN = "https://www.whitneystevenson.com";
const NOT_CRAWLABLE = new Set(["_global-error.html", "_error.html", "_not-found.html"]);

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

function jsonLdBlocks(html) {
  return [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((m) => {
      try { return JSON.parse(m[1]); } catch { return null; }
    })
    .filter(Boolean);
}

const pages = walk(APP_DIR)
  .filter((f) => f.endsWith(".html"))
  .filter((f) => !NOT_CRAWLABLE.has(relative(APP_DIR, f).split(sep).pop()));

if (pages.length === 0) {
  console.error("check-breadcrumbs: no prerendered HTML found in .next/server/app");
  process.exit(1);
}

const failures = [];
let checked = 0;

for (const file of pages) {
  const route = routeOf(file);
  if (route === "/") continue;
  checked++;
  const html = readFileSync(file, "utf8");
  const lists = jsonLdBlocks(html).filter((b) => b["@type"] === "BreadcrumbList");

  if (lists.length !== 1) {
    failures.push(`${route}: ${lists.length} BreadcrumbList blocks, expected 1`);
    continue;
  }
  const items = lists[0].itemListElement ?? [];
  if (items.length < 2) {
    failures.push(`${route}: breadcrumb trail has ${items.length} items, expected at least 2`);
    continue;
  }
  items.forEach((it, i) => {
    if (it["@type"] !== "ListItem") failures.push(`${route}: item ${i + 1} is not a ListItem`);
    if (it.position !== i + 1) failures.push(`${route}: item ${i + 1} has position ${it.position}`);
    if (!it.name) failures.push(`${route}: item ${i + 1} has no name`);
    if (typeof it.item !== "string" || !(it.item === ORIGIN || it.item.startsWith(ORIGIN + "/")) || it.item.endsWith("/")) {
      failures.push(`${route}: item ${i + 1} url "${it.item}" is not a canonical-origin URL`);
    }
  });
  if (items[0].item !== ORIGIN) failures.push(`${route}: trail does not start at the homepage`);
  const last = items[items.length - 1];
  if (last.item !== ORIGIN + route) {
    failures.push(`${route}: trail ends at "${last.item}", expected "${ORIGIN + route}"`);
  }
  if (route.startsWith("/blog/")) {
    const h1 = decode(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, "") ?? "");
    if (!h1.includes(last.name)) {
      failures.push(`${route}: last crumb "${last.name}" does not match visible <h1> "${h1}"`);
    }
  }
}

if (failures.length) {
  console.error("\ncheck-breadcrumbs FAILED — non-home pages must ship a BreadcrumbList:\n");
  for (const f of failures) console.error(`  ✗ ${f}`);
  console.error("\nSee ERRORS.md (2026-10-01). Render <BreadcrumbJsonLd> from");
  console.error("src/components/BreadcrumbJsonLd.tsx in every non-home route template.\n");
  process.exit(1);
}

console.log(`check-breadcrumbs: ${checked} non-home routes OK — BreadcrumbList present and self-terminating`);
