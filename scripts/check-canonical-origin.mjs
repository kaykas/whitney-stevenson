#!/usr/bin/env node
/**
 * Guardrail for the recurring Ahrefs/GSC "3XX redirect" warning
 * (ERRORS.md 2026-09-09, 2026-09-26, 2026-09-28).
 *
 * `https://www.whitneystevenson.com` with no trailing slash is the one canonical
 * URL shape. Anything else we publish is a link into a redirect:
 *   - `http://…`                        -> 308 (Vercel HTTPS upgrade)
 *   - `https://whitneystevenson.com/…`  -> 307 (apex -> www, Vercel domain setting)
 *   - `/blog/` or `…/blog/`             -> 308 (Next, trailingSlash: false)
 *
 * The 09-09 fix removed seven apex links from public/llms-full.txt and left a
 * manual `grep` as the rule. A rule that needs a human to remember it is not a
 * guardrail, so this runs as `postbuild` over everything a crawler can reach:
 * prerendered HTML, the rendered robots.txt + sitemap.xml, and the static text
 * assets in public/ (llms.txt, llms-full.txt, …).
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative, sep } from "node:path";

const ROOT = process.cwd();
const APP_DIR = join(ROOT, ".next", "server", "app");
const PUBLIC_DIR = join(ROOT, "public");
const CANONICAL_ORIGIN = "https://www.whitneystevenson.com";

const NOT_CRAWLABLE = new Set(["_global-error.html", "_error.html"]);
const PUBLIC_TEXT_EXT = new Set([".txt", ".xml", ".json", ".webmanifest", ".html"]);

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

if (!existsSync(APP_DIR)) {
  console.error("check-canonical-origin: .next/server/app not found — run `next build` first");
  process.exit(1);
}

const targets = [
  ...walk(APP_DIR).filter(
    (f) =>
      (f.endsWith(".html") && !NOT_CRAWLABLE.has(f.split(sep).pop())) ||
      f.endsWith("robots.txt.body") ||
      f.endsWith("sitemap.xml.body"),
  ),
  ...(existsSync(PUBLIC_DIR)
    ? walk(PUBLIC_DIR).filter((f) => PUBLIC_TEXT_EXT.has(extname(f).toLowerCase()))
    : []),
];

// Any absolute URL on our domain, any scheme, with or without www.
const ABSOLUTE = /https?:\/\/(?:www\.)?whitneystevenson\.com[^\s"'<>`)\]\\]*/gi;
// Root-relative <a>/<link> hrefs — the rendered link graph.
const RELATIVE_HREF = /<(?:a|link)\b[^>]*?\bhref="(\/[^"]*)"/gi;

function problemWith(url) {
  // Prose often ends a URL with punctuation; crawlers don't include it.
  const clean = url.replace(/[.,;:!?]+$/, "");
  let parsed;
  try {
    parsed = new URL(clean);
  } catch {
    return null;
  }
  if (parsed.protocol !== "https:") return "http scheme (308)";
  if (parsed.host !== "www.whitneystevenson.com") return "apex host (307)";
  if (parsed.pathname.length > 1 && parsed.pathname.endsWith("/")) return "trailing slash (308)";
  return null;
}

const failures = [];

for (const file of targets) {
  const text = readFileSync(file, "utf8");
  const where = relative(ROOT, file);
  for (const [url] of text.matchAll(ABSOLUTE)) {
    const problem = problemWith(url);
    if (problem) failures.push(`${where}: ${url} — ${problem}`);
  }
  for (const [, href] of text.matchAll(RELATIVE_HREF)) {
    if (href.startsWith("//")) continue;
    const problem = problemWith(CANONICAL_ORIGIN + href.split("#")[0].split("?")[0]);
    if (problem) failures.push(`${where}: href="${href}" — ${problem}`);
  }
}

if (failures.length) {
  console.error(`check-canonical-origin: ${failures.length} published URL(s) answer 3XX:`);
  for (const f of [...new Set(failures)]) console.error(`  ${f}`);
  console.error(`Every published URL must be ${CANONICAL_ORIGIN}/<path> with no trailing slash.`);
  process.exit(1);
}

console.log(`check-canonical-origin: ${targets.length} files OK — every published URL is canonical`);
