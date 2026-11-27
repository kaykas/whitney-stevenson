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
 * Also locks published descriptions against scripts/meta-description-baseline.json
 * (ERRORS.md 2026-10-22): Ahrefs raises "Meta description changed" whenever a
 * live route's description differs from the previous crawl, so a description
 * that is already published may not drift silently. A route missing from the
 * baseline (a new post) is reported but passes. To change a published
 * description on purpose, edit it and run `npm run meta:baseline`, then commit
 * both.
 *
 * Also checks SERP pixel width (ERRORS.md 2026-11-19, SEOmator
 * content-description-pixel-width): SEOmator fails a description wider than
 * ~920px even when it is under 160 chars, because capitals and wide letters
 * cost more than "i" or ".". `estimateWidth` is a per-character-class model fitted
 * to SEOmator's reported widths for every route on this site (41 samples); it
 * reads 9-21px WIDER than SEOmator, so passing here means passing there. Every
 * route must fit, except the published routes listed in PIXEL_GRANDFATHERED,
 * which were already wider when the check landed. That list may only shrink:
 * new posts must fit, and a listed route that now fits fails until you remove it.
 *
 * Runs as `postbuild`, so a regression fails `npm run build` instead of
 * surfacing weeks later in Ahrefs. Standalone: `npm run check:meta`.
 */
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const APP_DIR = join(process.cwd(), ".next", "server", "app");

const BASELINE = join(process.cwd(), "scripts", "meta-description-baseline.json");
const UPDATE = process.argv.includes("--update");

const MAX_LENGTH = 160; // Ahrefs warns above this
const MIN_LENGTH = 70; // Ahrefs warns below this ("Meta description too short")
const MAX_PIXELS = 920; // SEOmator content-description-pixel-width "good" threshold

/**
 * Published routes whose descriptions this estimator put over 920px on
 * 2026-11-19 (the estimate runs slightly wide, so a few sit just under
 * SEOmator's own line).
 * Rewriting them all at once would set off 39 Ahrefs "Meta description
 * changed" notices, so they are shortened gradually: fix a route, run
 * `npm run meta:baseline`, and delete it from this list. Never add to it.
 */
const PIXEL_GRANDFATHERED = new Set([
  "/blog",
  "/blog/anchoring-arxan-three-years-rsa",
  "/blog/b2b-client-golf-outing",
  "/blog/b2b-event-calendar",
  "/blog/brand-activation-budget",
  "/blog/breakout-speaker-care",
  "/blog/calculating-trade-show-roi",
  "/blog/channel-partner-events",
  "/blog/client-holiday-party",
  "/blog/conference-customer-dinner",
  "/blog/conference-sponsorship-package",
  "/blog/eight-years-sf-nye-party",
  "/blog/event-agency-vs-in-house",
  "/blog/event-load-out",
  "/blog/event-marketing-interview-questions",
  "/blog/event-post-mortem",
  "/blog/event-run-of-show-cut-list",
  "/blog/event-venue-contract-clauses",
  "/blog/executive-vip-dinner-trade-show",
  "/blog/exhibition-stand-staff-training",
  "/blog/first-venue-walkthrough",
  "/blog/free-event-no-shows",
  "/blog/freelance-to-in-house",
  "/blog/hotel-av-drayage-contract-clauses",
  "/blog/illumio-latam-channel-partnership",
  "/blog/keynote-sponsorship-vs-ancillary-suite",
  "/blog/latin-billboard-awards-artist-relations",
  "/blog/measure-trade-show-roi",
  "/blog/pepsico-tostitos-super-bowl-2026",
  "/blog/plan-brand-activation",
  "/blog/post-event-follow-up-sla",
  "/blog/presidio-golf-300-tournaments",
  "/blog/sunglasses-shops-and-bodywork",
  "/blog/the-target-run",
  "/blog/trade-show-booth-design",
  "/blog/trade-show-booth-staff-training",
  "/blog/trade-show-giveaways",
]);

/** Estimated SERP width in px (Arial-ish, ~14px). Conservative vs SEOmator. */
function estimateWidth(text) {
  let px = 0;
  for (const c of text) {
    if (c === " ") px += 4.1;
    else if (/[.,:;!'\u2019]/.test(c)) px += 4.6;
    else if (/[IMW]/.test(c)) px += 10.7;
    else if (/[A-Z]/.test(c)) px += 9.5;
    else if (/[0-9]/.test(c)) px += 7.4;
    else if (/[a-z\u00C0-\u017F]/.test(c)) px += 7.6;
    else if (/[\u2014\u2013&+%$#@*]/.test(c)) px += 9;
    else px += 8.1;
  }
  return Math.round(px);
}

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
const current = {};

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
  current[route] = description;

  if (length > MAX_LENGTH) {
    failures.push(
      `${route}: description is ${length} chars, max ${MAX_LENGTH} — "${description.slice(0, 60)}..."`,
    );
  } else if (length < MIN_LENGTH) {
    failures.push(`${route}: description is only ${length} chars, min ${MIN_LENGTH}`);
  }

  const px = estimateWidth(description);
  if (px > MAX_PIXELS && !PIXEL_GRANDFATHERED.has(route)) {
    failures.push(
      `${route}: description is ~${px}px wide, max ${MAX_PIXELS}px (SEOmator content-description-pixel-width)`,
    );
  } else if (px <= MAX_PIXELS && PIXEL_GRANDFATHERED.has(route)) {
    failures.push(`${route}: now fits (~${px}px), remove it from PIXEL_GRANDFATHERED`);
  }

  console.log(
    `  ${route.padEnd(42)} ${String(length).padStart(3)} chars ${String(px).padStart(5)}px` +
      (px > MAX_PIXELS ? " (grandfathered)" : ""),
  );
}

const baseline = existsSync(BASELINE) ? JSON.parse(readFileSync(BASELINE, "utf8")) : {};
const sorted = Object.fromEntries(Object.entries(current).sort(([a], [b]) => a.localeCompare(b)));

if (UPDATE) {
  writeFileSync(BASELINE, JSON.stringify(sorted, null, 2) + "\n");
  console.log(`\ncheck-meta-descriptions: baseline written for ${Object.keys(sorted).length} routes`);
} else {
  const unlocked = [];
  for (const [route, description] of Object.entries(sorted)) {
    if (!(route in baseline)) unlocked.push(route);
    else if (baseline[route] !== description) {
      failures.push(
        `${route}: published description changed (Ahrefs "Meta description changed")\n` +
          `      was: "${baseline[route]}"\n      now: "${description}"`,
      );
    }
  }
  if (unlocked.length) {
    console.log(`\n  not yet in baseline (new routes, pass): ${unlocked.join(", ")}`);
    console.log("  lock them with `npm run meta:baseline` and commit the JSON.");
  }
}

if (failures.length) {
  console.error('\ncheck-meta-descriptions FAILED — Ahrefs "Meta description too long" would regress:\n');
  for (const f of failures) console.error(`  ✗ ${f}`);
  console.error("\nSee ERRORS.md (2026-09-09). Post metadata comes from `metaDescription`");
  console.error("in src/lib/posts.ts — the long `description` field is the visible lede,");
  console.error("not the meta tag. Keep both; shorten the meta one.");
  console.error("If you changed a published description ON PURPOSE, run `npm run meta:baseline`.\n");
  process.exit(1);
}

console.log(`\ncheck-meta-descriptions: ${pages.length} crawlable routes OK`);
