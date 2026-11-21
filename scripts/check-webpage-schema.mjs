#!/usr/bin/env node
/**
 * Guardrail for SEOmator `schema-required-fields` ("WebPage: missing name"),
 * ERRORS.md 2026-11-21.
 *
 * The speakable WebPage block used to be hardcoded in layout.tsx with no
 * `name` and `url: "/"`, so all routes shipped a nameless WebPage that
 * claimed to be the homepage. Now each route renders its own via
 * webPageSchema() in src/lib/schema.ts.
 *
 * Fails unless every crawlable route has exactly one top-level WebPage node
 * whose `url` and `@id` are the route's own canonical URL, with a non-empty
 * `name`, a `speakable` spec, and `mainEntity` (plus `breadcrumb` off the
 * homepage) referencing an `@id` rendered on the same route. Any other
 * WebPage node anywhere in the route's JSON-LD (e.g. a nested mainEntityOfPage) must also carry a `name`.
 *
 * Reads the PRERENDERED HTML. Standalone: `npm run check:webpage`.
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

function jsonLdBlocks(html) {
  return [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((m) => {
      try { return JSON.parse(m[1]); } catch { return null; }
    })
    .filter(Boolean)
    .flatMap((b) => (Array.isArray(b) ? b : b["@graph"] ? b["@graph"] : [b]));
}

function isWebPage(node) {
  const t = node?.["@type"];
  return Array.isArray(t) ? t.includes("WebPage") : t === "WebPage";
}

function nested(node, out = []) {
  if (Array.isArray(node)) node.forEach((n) => nested(n, out));
  else if (node && typeof node === "object") {
    out.push(node);
    Object.values(node).forEach((v) => nested(v, out));
  }
  return out;
}

const pages = walk(APP_DIR)
  .filter((f) => f.endsWith(".html"))
  .filter((f) => !NOT_CRAWLABLE.has(relative(APP_DIR, f).split(sep).pop()));

if (pages.length === 0) {
  console.error("check-webpage-schema: no prerendered HTML found in .next/server/app");
  process.exit(1);
}

const failures = [];
for (const file of pages) {
  const route = routeOf(file);
  const self = route === "/" ? `${ORIGIN}/` : `${ORIGIN}${route}`;
  const blocks = jsonLdBlocks(readFileSync(file, "utf8"));

  const top = blocks.filter(isWebPage);
  if (top.length !== 1) {
    failures.push(`${route}: expected 1 top-level WebPage, found ${top.length}`);
  } else {
    const [wp] = top;
    if (wp.url !== self) failures.push(`${route}: WebPage url is ${wp.url}, expected ${self}`);
    if (wp["@id"] !== self) failures.push(`${route}: WebPage @id is ${wp["@id"]}, expected ${self}`);
    if (!wp.speakable) failures.push(`${route}: WebPage has no speakable`);
    // SEOmator recommends breadcrumb (non-home) and mainEntity; both must
    // point at a node this route actually renders, or they dangle.
    // Only typed nodes count: a bare {"@id"} reference is not a definition.
    const ids = new Set(nested(blocks).filter((n) => n["@type"]).map((n) => n["@id"]).filter(Boolean));
    const refs = { mainEntity: wp.mainEntity?.["@id"] };
    if (route !== "/") refs.breadcrumb = wp.breadcrumb?.["@id"];
    for (const [key, id] of Object.entries(refs)) {
      if (!id) failures.push(`${route}: WebPage has no ${key} @id reference`);
      else if (!ids.has(id) || id === wp["@id"]) failures.push(`${route}: WebPage ${key} ${id} not found on page`);
    }
  }

  for (const node of nested(blocks).filter(isWebPage)) {
    if (typeof node.name !== "string" || node.name.trim() === "") {
      failures.push(`${route}: WebPage ${node["@id"] ?? node.url ?? "(no id)"} missing name`);
    }
  }
}

if (failures.length) {
  console.error("check-webpage-schema: FAIL");
  for (const f of failures) console.error("  " + f);
  process.exit(1);
}
console.log(`check-webpage-schema: OK (${pages.length} routes, one named WebPage each)`);
