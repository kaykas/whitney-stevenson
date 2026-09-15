#!/usr/bin/env node
/**
 * Guardrail for the recurring Ahrefs/GSC "Meta description too long" warning
 * (ERRORS.md 2026-09-09).
 *
 * Every crawlable route must ship exactly one <meta name="description">, and it
 * must fit the SERP: Google truncates around 155-160 characters and Ahrefs
 * warns past 160. A too-short description is its own Ahrefs warning, so there
 * is a floor too.
 *
 * Checks the PRERENDERED HTML rather than the source modules, so it catches
 * regressions from anywhere metadata is composed — layout defaults, per-route
 * `metadata`, or `generateMetadata`.
 *
 * Runs as `postbuild`, so a regression fails `npm run build` instead of
 * surfacing weeks later in Ahrefs. Standalone: `npm run check:meta`.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const APP_DIR = join(process.cwd(), ".next", "server", "app");

const MAX_LENGTH = 160; // Ahrefs warns above this
const MIN_LENGTH = 70; // Ahrefs warns below this ("Meta description too short")

// React error boundaries — rendered client-side on a crash, never crawled.
const NOT_CRAWLABLE = new Set(["_global-error.html", "_error.html"]);

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

/** Content of every <meta name="description">, attribute order agnostic. */
function metaDescriptions(html) {
  return [...html.matchAll(/<meta\b[^>]*>/gi)]
    .map((m) => m[0])
    .filter((tag) => /\bname=["']description["']/i.test(tag))
    .map((tag) => tag.match(/\bcontent=["']([^"']*)["']/i)?.[1] ?? "");
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
  console.error("check-meta-descriptions: no prerendered HTML found in .next/server/app");
  process.exit(1);
}

const failures = [];

for (const file of pages) {
  const route = routeOf(file);
  const found = metaDescriptions(readFileSync(file, "utf8")).map(decodeEntities);

  if (found.length === 0) {
    failures.push(`${route}: no <meta name="description">`);
    console.log(`  ${route.padEnd(42)} missing`);
    continue;
  }
  if (found.length > 1) {
    failures.push(`${route}: ${found.length} <meta name="description"> tags, expected 1`);
  }

  const description = found[0];
  const { length } = description;

  if (length > MAX_LENGTH) {
    failures.push(
      `${route}: description is ${length} chars, max ${MAX_LENGTH} — "${description.slice(0, 60)}..."`,
    );
  } else if (length < MIN_LENGTH) {
    failures.push(`${route}: description is only ${length} chars, min ${MIN_LENGTH}`);
  }

  console.log(`  ${route.padEnd(42)} ${String(length).padStart(3)} chars`);
}

if (failures.length) {
  console.error('\ncheck-meta-descriptions FAILED — Ahrefs "Meta description too long" would regress:\n');
  for (const f of failures) console.error(`  ✗ ${f}`);
  console.error("\nSee ERRORS.md (2026-09-09). Post metadata comes from `metaDescription`");
  console.error("in src/lib/posts.ts — the long `description` field is the visible lede,");
  console.error("not the meta tag. Keep both; shorten the meta one.\n");
  process.exit(1);
}

console.log(`\ncheck-meta-descriptions: ${pages.length} crawlable routes OK`);
