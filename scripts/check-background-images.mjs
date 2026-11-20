#!/usr/bin/env node
/**
 * Guardrail for SEOmator `images-background-seo` (ERRORS.md 2026-11-20).
 *
 * Search engines don't index photos loaded as CSS `background-image`, so every
 * content photo must ship as a real <img> with alt text. Fails the build if any
 * crawlable prerendered route:
 *   - has an inline `background-image: url(...)` style (gradients are fine), or
 *   - has an <img> without a non-empty alt (a missing `heroAlt`/`imageAlt`
 *     renders as alt="").
 *
 * Runs as `postbuild`. Standalone: `npm run check:bg-images`.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const APP_DIR = join(process.cwd(), ".next", "server", "app");
const NOT_CRAWLABLE = new Set(["_global-error.html", "_error.html"]);

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

const files = walk(APP_DIR).filter(
  (f) => f.endsWith(".html") && !NOT_CRAWLABLE.has(f.split(sep).pop()),
);

const failures = [];
let imgCount = 0;
for (const file of files) {
  const route = routeOf(file);
  const html = readFileSync(file, "utf8");

  for (const m of html.matchAll(/background(?:-image)?\s*:[^;"]*url\(/gi)) {
    failures.push(`${route}: CSS background image near "${html.slice(m.index, m.index + 80)}"`);
  }

  for (const m of html.matchAll(/<img\b[^>]*>/gi)) {
    imgCount++;
    const alt = m[0].match(/\balt="([^"]*)"/i);
    if (!alt || !alt[1].trim()) {
      const src = m[0].match(/\bsrc="([^"]*)"/i)?.[1] ?? "?";
      failures.push(`${route}: <img src="${src}"> has no alt text`);
    }
  }
}

if (failures.length) {
  console.error(`check-background-images: ${failures.length} problem(s)`);
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log(
  `check-background-images: OK — ${files.length} routes, no CSS background images, ${imgCount} <img> all with alt text`,
);
