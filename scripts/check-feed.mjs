#!/usr/bin/env node
/**
 * Guardrail for the GEO audit item "[GEO:signals-rss-freshness] Missing
 * <link rel=alternate type=application/rss+xml>" (ERRORS.md 2026-11-20).
 *
 * 1. Every crawlable prerendered page ships exactly one
 *    <link rel="alternate" type="application/rss+xml"> pointing at /feed.xml.
 *    Next merges `alternates` shallowly, so a route that sets its own
 *    canonical without spreading FEED_ALTERNATE_TYPES drops the link.
 * 2. The prerendered /feed.xml is RSS 2.0 with a lastBuildDate and one <item>
 *    per Field Note.
 *
 * Runs as `postbuild`. Standalone: `npm run check:feed`.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
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

const failures = [];
const pages = walk(APP_DIR)
  .filter((f) => f.endsWith(".html"))
  .filter((f) => !NOT_CRAWLABLE.has(relative(APP_DIR, f).split(sep).pop()));

for (const file of pages) {
  const html = readFileSync(file, "utf8");
  const links = [...html.matchAll(/<link\b[^>]*\btype="application\/rss\+xml"[^>]*>/gi)].map((m) => m[0]);
  const rel = relative(APP_DIR, file).split(sep).join("/");
  if (links.length !== 1) {
    failures.push(`${rel}: expected 1 RSS alternate link, found ${links.length}`);
    continue;
  }
  const href = links[0].match(/\bhref="([^"]*)"/i)?.[1];
  if (!/\brel="alternate"/i.test(links[0]) || href !== `${ORIGIN}/feed.xml`) {
    failures.push(`${rel}: bad RSS alternate link ${links[0]}`);
  }
}

const feedFile = join(APP_DIR, "feed.xml.body");
if (!existsSync(feedFile)) {
  failures.push("feed.xml was not prerendered (.next/server/app/feed.xml.body missing)");
} else {
  const xml = readFileSync(feedFile, "utf8");
  const postsSrc = readFileSync(join(process.cwd(), "src", "lib", "posts.ts"), "utf8");
  const expected = (postsSrc.match(/^\s{4}slug: "/gm) ?? []).length;
  const items = (xml.match(/<item>/g) ?? []).length;
  if (!xml.includes('<rss version="2.0"')) failures.push("feed.xml: not RSS 2.0");
  if (!/<lastBuildDate>[^<]+GMT<\/lastBuildDate>/.test(xml)) failures.push("feed.xml: missing lastBuildDate");
  if (items === 0 || items !== expected) failures.push(`feed.xml: ${items} items, expected ${expected} (one per post)`);
}

if (failures.length) {
  console.error(`check-feed: ${failures.length} problem(s)\n  ` + failures.join("\n  "));
  process.exit(1);
}
console.log(`check-feed: ${pages.length} pages advertise /feed.xml; feed OK`);
