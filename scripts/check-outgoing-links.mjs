#!/usr/bin/env node
/**
 * Guardrail for the recurring Ahrefs/GSC "Page has no outgoing links" error
 * (ERRORS.md 2026-09-06, 2026-09-07).
 *
 * Every crawlable route must ship at least one real <a href> to a DIFFERENT
 * URL, plus at least one external link. Same-page fragments (#faq), self-links
 * (/ -> /), and mailto:/tel: do not count — crawlers ignore all three.
 *
 * Runs as `postbuild`, so a regression fails `npm run build` instead of
 * surfacing weeks later in Ahrefs.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const APP_DIR = join(process.cwd(), ".next", "server", "app");
const SITE_HOST = "www.whitneystevenson.com";

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

/** hrefs from <a> tags only — <link rel=...> and <script src> are not links. */
function anchorHrefs(html) {
  return [...html.matchAll(/<a\b[^>]*?\bhref="([^"]*)"/gi)].map((m) => m[1]);
}

function normalize(href) {
  // Strip fragment and query; resolve absolute same-host URLs to their path.
  const bare = href.split("#")[0].split("?")[0];
  if (/^https?:\/\//i.test(bare)) {
    try {
      const url = new URL(bare);
      return url.host === SITE_HOST
        ? { kind: "internal", path: url.pathname.replace(/\/$/, "") || "/" }
        : { kind: "external", path: bare };
    } catch {
      return { kind: "ignored", path: bare };
    }
  }
  if (bare.startsWith("/")) {
    return { kind: "internal", path: bare.replace(/\/$/, "") || "/" };
  }
  // mailto:, tel:, bare fragments, empty
  return { kind: "ignored", path: bare };
}

const pages = walk(APP_DIR)
  .filter((f) => f.endsWith(".html"))
  .filter((f) => !NOT_CRAWLABLE.has(relative(APP_DIR, f).split(sep).pop()));

if (pages.length === 0) {
  console.error("check-outgoing-links: no prerendered HTML found in .next/server/app");
  process.exit(1);
}

const failures = [];

for (const file of pages) {
  const route = routeOf(file);
  const links = anchorHrefs(readFileSync(file, "utf8")).map(normalize);

  const internalOutgoing = [
    ...new Set(
      links.filter((l) => l.kind === "internal" && l.path !== route).map((l) => l.path),
    ),
  ];
  const external = [...new Set(links.filter((l) => l.kind === "external").map((l) => l.path))];

  if (internalOutgoing.length === 0) {
    failures.push(
      `${route}: no crawlable internal link to another URL (fragments/mailto do not count)`,
    );
  }
  if (external.length === 0) {
    failures.push(`${route}: no external link`);
  }

  console.log(
    `  ${route.padEnd(42)} ${internalOutgoing.length} internal, ${external.length} external`,
  );
}

if (failures.length) {
  console.error('\ncheck-outgoing-links FAILED — "Page has no outgoing links" would regress:\n');
  for (const f of failures) console.error(`  ✗ ${f}`);
  console.error("\nSee ERRORS.md (2026-09-06, 2026-09-07). The sitewide footer in");
  console.error("src/components/SiteFooter.tsx is the guardrail — do not remove it.\n");
  process.exit(1);
}

console.log(`\ncheck-outgoing-links: ${pages.length} crawlable routes OK`);
