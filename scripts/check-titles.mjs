#!/usr/bin/env node
/**
 * Guardrail for the Ahrefs/GSC "Title too long" warning (ERRORS.md 2026-09-12).
 *
 * Every crawlable route must ship exactly one <title>, it must be unique across
 * the site, and it must fit the SERP: Google truncates the title link around
 * 600px / ~60 characters, and Ahrefs warns past that. A too-short title is its
 * own Ahrefs warning, so there is a floor too.
 *
 * The trap this catches: most routes inherit `template: "%s | Whitney Stevenson"`
 * from src/app/layout.tsx, which silently adds 20 characters to whatever the
 * route declares. A 45-character post title looks fine in the source module and
 * renders as a 65-character title tag. Measuring the PRERENDERED HTML is the
 * only way to see what a crawler actually sees — and it also catches metadata
 * composed anywhere: layout defaults, per-route `metadata`, `generateMetadata`.
 *
 * Runs as `postbuild`, so a regression fails `npm run build` instead of
 * surfacing weeks later in Ahrefs. Standalone: `npm run check:titles`.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const APP_DIR = join(process.cwd(), ".next", "server", "app");

const MAX_LENGTH = 60; // Ahrefs warns above this; Google truncates around here
const MIN_LENGTH = 30; // Ahrefs warns below this ("Title too short")

// React error boundaries — rendered client-side on a crash, never crawled.
//
// `_not-found.html` is excluded too, and only from THIS check: Next ships its
// own built-in "404: This page could not be found." <title> inside the
// not-found boundary *in addition to* the one the root layout's metadata
// emits, so that route always has two and neither is ours to dedupe. It is
// served with a 404 status, so it is never indexed and has no SERP budget to
// blow — Ahrefs reports "Title too long" against indexable URLs only. It stays
// in scope for check-meta-descriptions.mjs, which it passes cleanly.
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

/** Text of every <title> in the document head. */
function titles(html) {
  return [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)].map((m) => m[1]);
}

/** Crawlers see decoded text — `&#x27;` is one character, not six. */
function decodeEntities(text) {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

const pages = walk(APP_DIR)
  .filter((f) => f.endsWith(".html"))
  .filter((f) => !NOT_CRAWLABLE.has(relative(APP_DIR, f).split(sep).pop()));

if (pages.length === 0) {
  console.error("check-titles: no prerendered HTML found in .next/server/app");
  process.exit(1);
}

const failures = [];
const seen = new Map(); // title -> first route that used it

for (const file of pages) {
  const route = routeOf(file);
  const found = titles(readFileSync(file, "utf8")).map((t) => decodeEntities(t).trim());

  if (found.length === 0) {
    failures.push(`${route}: no <title>`);
    console.log(`  ${route.padEnd(42)} missing`);
    continue;
  }
  if (found.length > 1) {
    failures.push(`${route}: ${found.length} <title> tags, expected 1`);
  }

  const title = found[0];
  const { length } = title;

  if (length > MAX_LENGTH) {
    failures.push(`${route}: title is ${length} chars, max ${MAX_LENGTH} — "${title}"`);
  } else if (length < MIN_LENGTH) {
    failures.push(`${route}: title is only ${length} chars, min ${MIN_LENGTH} — "${title}"`);
  }

  // Duplicate titles are their own Ahrefs issue and mean two routes compete for
  // the same query. Cheap to check while the HTML is already parsed.
  if (seen.has(title)) {
    failures.push(`${route}: duplicate title, same as ${seen.get(title)} — "${title}"`);
  } else {
    seen.set(title, route);
  }

  console.log(`  ${route.padEnd(42)} ${String(length).padStart(3)} chars  ${title}`);
}

if (failures.length) {
  console.error('\ncheck-titles FAILED — Ahrefs "Title too long" would regress:\n');
  for (const f of failures) console.error(`  ✗ ${f}`);
  console.error("\nSee ERRORS.md (2026-09-12). Post titles come from `metaTitle` in");
  console.error("src/lib/posts.ts — the long `title` field is the visible <h1>, not the");
  console.error("title tag. Keep both; shorten the meta one. Remember the layout template");
  console.error('adds " | Whitney Stevenson" (20 chars) to every inherited title.\n');
  process.exit(1);
}

console.log(`\ncheck-titles: ${pages.length} crawlable routes OK`);
