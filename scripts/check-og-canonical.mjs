#!/usr/bin/env node
/**
 * Guardrail for the Ahrefs "Open Graph URL not matching canonical" warning
 * (ERRORS.md 2026-09-30).
 *
 * Every crawlable route must ship exactly one <link rel="canonical"> and exactly
 * one <meta property="og:url">, the two must be byte-identical, and both must
 * point at the route itself on the canonical origin.
 *
 * The trap this catches: Next merges `openGraph` SHALLOWLY down the route tree.
 * src/app/layout.tsx sets `openGraph.url` to the homepage, so any route that
 * sets its own `alternates.canonical` but forgets `openGraph.url` silently
 * inherits the homepage og:url — the canonical says `/blog/foo`, og:url says
 * `/`. That is exactly how /blog shipped before 55729e6. Reading the
 * PRERENDERED HTML is the only way to see what a crawler sees, because the
 * final value is composed from layout defaults + per-route metadata.
 *
 * Runs as `postbuild`, so a new route that forgets the override fails
 * `npm run build` instead of surfacing weeks later in Ahrefs.
 * Standalone: `npm run check:og`.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const APP_DIR = join(process.cwd(), ".next", "server", "app");
const ORIGIN = "https://www.whitneystevenson.com";

// React error boundaries are never crawled. `_not-found.html` is served with a
// 404 status, and Ahrefs only runs this check against indexable 200 pages.
const NOT_CRAWLABLE = new Set(["_global-error.html", "_error.html", "_not-found.html"]);

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

/** `.next/server/app/blog/foo.html` -> `/blog/foo`; `index.html` -> `/` */
function routeOf(file) {
  const rel = relative(APP_DIR, file).split(sep).join("/");
  const path = "/" + rel.replace(/\.html$/, "").replace(/(^|\/)index$/, "");
  return path === "/" ? "/" : path.replace(/\/$/, "");
}

function attr(tag, name) {
  return tag.match(new RegExp(`\\b${name}="([^"]*)"`, "i"))?.[1];
}

function canonicals(html) {
  return [...html.matchAll(/<link\b[^>]*\brel="canonical"[^>]*>/gi)].map((m) => attr(m[0], "href"));
}

function ogUrls(html) {
  return [...html.matchAll(/<meta\b[^>]*\bproperty="og:url"[^>]*>/gi)].map((m) => attr(m[0], "content"));
}

const pages = walk(APP_DIR)
  .filter((f) => f.endsWith(".html"))
  .filter((f) => !NOT_CRAWLABLE.has(relative(APP_DIR, f).split(sep).pop()));

if (pages.length === 0) {
  console.error("check-og-canonical: no prerendered HTML found in .next/server/app");
  process.exit(1);
}

const failures = [];

for (const file of pages) {
  const route = routeOf(file);
  const html = readFileSync(file, "utf8");
  const canon = canonicals(html);
  const og = ogUrls(html);

  if (canon.length !== 1) failures.push(`${route}: ${canon.length} canonical tags, expected 1`);
  if (og.length !== 1) failures.push(`${route}: ${og.length} og:url tags, expected 1`);
  if (canon.length !== 1 || og.length !== 1) continue;

  // Next renders metadataBase + "/" without the slash, so the homepage is the bare origin.
  const expected = route === "/" ? ORIGIN : ORIGIN + route;

  if (og[0] !== canon[0]) {
    failures.push(`${route}: og:url "${og[0]}" does not match canonical "${canon[0]}"`);
  } else if (canon[0] !== expected) {
    failures.push(`${route}: canonical "${canon[0]}" is not self-referencing (expected "${expected}")`);
  }
}

if (failures.length) {
  console.error('\ncheck-og-canonical FAILED — Ahrefs "Open Graph URL not matching canonical" would regress:\n');
  for (const f of failures) console.error(`  ✗ ${f}`);
  console.error("\nSee ERRORS.md (2026-09-30). Any route that sets `alternates.canonical`");
  console.error("must also set `openGraph.url` to the same absolute URL — the layout's");
  console.error("openGraph block is inherited wholesale, homepage url included.\n");
  process.exit(1);
}

console.log(`check-og-canonical: ${pages.length} routes OK — og:url matches self-referencing canonical`);
