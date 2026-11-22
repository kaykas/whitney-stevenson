#!/usr/bin/env node
/**
 * Guardrail for SEOmator `schema-website-search`, ERRORS.md 2026-11-22.
 *
 * Fails unless the prerendered homepage carries exactly one WebSite node with
 * `@id` /#website, `url`, `name`, and a SearchAction whose EntryPoint
 * urlTemplate contains the `{search_term_string}` placeholder named by
 * `query-input`, and whose path is a real app route (src/app/<path>/page.tsx).
 * Also fails if a WebSite node appears on any other route (one per site).
 *
 * Reads the PRERENDERED HTML. Standalone: `npm run check:website`.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = process.cwd();
const APP_DIR = join(ROOT, ".next", "server", "app");
const ORIGIN = "https://www.whitneystevenson.com";
const errors = [];

function walk(dir) {
  return readdirSync(dir).flatMap((e) => {
    const full = join(dir, e);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

function nodes(html) {
  return [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((m) => { try { return JSON.parse(m[1]); } catch { return null; } })
    .filter(Boolean)
    .flatMap((b) => (Array.isArray(b) ? b : b["@graph"] ? b["@graph"] : [b]));
}

const isWebSite = (n) => [].concat(n?.["@type"]).includes("WebSite");

if (!existsSync(APP_DIR)) {
  console.error("check-website-schema: no .next/server/app — run `next build` first.");
  process.exit(1);
}

for (const file of walk(APP_DIR).filter((f) => f.endsWith(".html"))) {
  const rel = relative(APP_DIR, file).split(sep).join("/");
  const sites = nodes(readFileSync(file, "utf8")).filter(isWebSite);
  if (rel === "index.html") {
    if (sites.length !== 1) { errors.push(`/: expected 1 WebSite node, found ${sites.length}`); continue; }
    const s = sites[0];
    if (s["@id"] !== `${ORIGIN}/#website`) errors.push(`/: WebSite @id is ${s["@id"]}`);
    if (s.url !== `${ORIGIN}/`) errors.push(`/: WebSite url is ${s.url}`);
    if (!s.name) errors.push("/: WebSite missing name");
    const a = s.potentialAction;
    if (a?.["@type"] !== "SearchAction") { errors.push("/: WebSite missing SearchAction potentialAction"); continue; }
    const tpl = a.target?.urlTemplate ?? (typeof a.target === "string" ? a.target : "");
    const qi = String(a["query-input"] ?? "");
    const name = qi.match(/name=(\S+)/)?.[1];
    if (!/^required\b/.test(qi) || !name) errors.push(`/: bad query-input "${qi}"`);
    if (!name || !tpl.includes(`{${name}}`)) errors.push(`/: urlTemplate "${tpl}" lacks {${name}}`);
    if (!tpl.startsWith(`${ORIGIN}/`)) errors.push(`/: urlTemplate "${tpl}" not on canonical origin`);
    const path = new URL(tpl.replace(/\{[^}]+\}/g, "x")).pathname.replace(/^\/|\/$/g, "");
    if (!existsSync(join(ROOT, "src", "app", path, "page.tsx"))) {
      errors.push(`/: SearchAction path /${path} has no src/app/${path}/page.tsx`);
    }
  } else if (sites.length) {
    errors.push(`${rel}: WebSite node belongs on the homepage only (found ${sites.length})`);
  }
}

if (errors.length) {
  console.error("check-website-schema FAILED:\n  " + errors.join("\n  "));
  process.exit(1);
}
console.log("check-website-schema OK: homepage WebSite + SearchAction valid, no stray WebSite nodes.");
