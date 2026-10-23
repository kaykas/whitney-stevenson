#!/usr/bin/env node
/**
 * Guardrail for the Ahrefs "Page has only one dofollow incoming internal link"
 * notice (ERRORS.md 2026-10-22).
 *
 * Every crawlable route except `/` must be linked from at least MIN_SOURCES
 * DIFFERENT prerendered pages (self-links don't count, nor do repeated links
 * from the same page). Older Field Notes used to rely on `/` and `/blog` alone;
 * the "Keep Reading" block under each post (getOlderPosts in src/lib/posts.ts)
 * and the pinned footer list now add more paths in.
 *
 * Also asserts the sitewide footer is identical on every route. The footer
 * used to list the latest five posts, so each new post changed the word count
 * of every page ("Word count changed").
 *
 * Runs as `postbuild`. Standalone: `npm run check:incoming`.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const APP_DIR = join(process.cwd(), ".next", "server", "app");
const SITE_HOST = "www.whitneystevenson.com";
const MIN_SOURCES = 2;

// React error boundaries — rendered client-side on a crash, never crawled.
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

/** Internal paths from <a href>, fragments and queries stripped. */
function internalTargets(html) {
  return [...html.matchAll(/<a\b[^>]*?\bhref="([^"]*)"/gi)]
    .map((m) => m[1].split("#")[0].split("?")[0])
    .map((href) => {
      if (/^https?:\/\//i.test(href)) {
        try {
          const url = new URL(href);
          return url.host === SITE_HOST ? url.pathname : null;
        } catch {
          return null;
        }
      }
      return href.startsWith("/") ? href : null;
    })
    .filter(Boolean)
    .map((p) => p.replace(/\/$/, "") || "/");
}

const pages = walk(APP_DIR)
  .filter((f) => f.endsWith(".html"))
  .filter((f) => !NOT_CRAWLABLE.has(relative(APP_DIR, f).split(sep).pop()));

if (pages.length === 0) {
  console.error("check-incoming-links: no prerendered HTML found in .next/server/app");
  process.exit(1);
}

const routes = new Set(pages.map(routeOf));
const sources = new Map([...routes].map((r) => [r, new Set()]));
const footers = new Map();
const failures = [];

for (const file of pages) {
  const route = routeOf(file);
  const html = readFileSync(file, "utf8");
  for (const target of internalTargets(html)) {
    if (target !== route && sources.has(target)) sources.get(target).add(route);
  }
  const footer = html.match(/<footer class="site-footer"[\s\S]*?<\/footer>/)?.[0];
  if (!footer) failures.push(`${route}: no sitewide <footer class="site-footer">`);
  else footers.set(route, footer);
}

for (const [route, from] of [...sources].sort()) {
  if (route === "/") continue;
  console.log(`  ${route.padEnd(48)} ${String(from.size).padStart(2)} linking pages`);
  if (from.size < MIN_SOURCES) {
    failures.push(
      `${route}: linked from ${from.size} page(s) [${[...from].join(", ")}], need ${MIN_SOURCES}`,
    );
  }
}

const distinctFooters = new Set(footers.values());
if (distinctFooters.size > 1) {
  failures.push(
    `sitewide footer differs across routes (${distinctFooters.size} variants) — it must be static`,
  );
}

if (failures.length) {
  console.error('\ncheck-incoming-links FAILED — Ahrefs internal-link notices would regress:\n');
  for (const f of failures) console.error(`  ✗ ${f}`);
  console.error("\nSee ERRORS.md (2026-10-22). Posts get incoming links from the");
  console.error("\"Keep Reading\" block (getOlderPosts) and the pinned footer (getFooterPosts).\n");
  process.exit(1);
}

console.log(`\ncheck-incoming-links: ${routes.size - 1} routes linked from ${MIN_SOURCES}+ pages, footer static`);
