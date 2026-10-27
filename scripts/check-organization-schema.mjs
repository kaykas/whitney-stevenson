#!/usr/bin/env node
/**
 * Guardrail for the Ahrefs "Organization schema missing or incomplete" notice
 * (ERRORS.md 2026-10-27).
 *
 * Walks every JSON-LD block on every crawlable prerendered route and fails if
 * any Organization-family node (Organization, SportsOrganization, Corporation,
 * ...) lacks a name, an absolute https url, or a description. Also requires
 * the sitewide Person on `/` to reference at least one Organization, so the
 * nodes can't silently disappear.
 *
 * Reads the PRERENDERED HTML, same as the other postbuild checks.
 * Standalone: `npm run check:org`.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const APP_DIR = join(process.cwd(), ".next", "server", "app");
const NOT_CRAWLABLE = new Set(["_global-error.html", "_error.html", "_not-found.html"]);
const ORG_TYPES = new Set([
  "Organization", "SportsOrganization", "Corporation", "LocalBusiness",
  "NGO", "EducationalOrganization", "NewsMediaOrganization",
]);

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

function jsonLd(html) {
  return [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(
    (m) => JSON.parse(m[1]),
  );
}

function* nodes(value) {
  if (Array.isArray(value)) {
    for (const v of value) yield* nodes(v);
  } else if (value && typeof value === "object") {
    yield value;
    for (const v of Object.values(value)) yield* nodes(v);
  }
}

const isOrg = (n) => [].concat(n["@type"] ?? []).some((t) => ORG_TYPES.has(t));

const files = walk(APP_DIR).filter(
  (f) => f.endsWith(".html") && !NOT_CRAWLABLE.has(relative(APP_DIR, f).split(sep).join("/")),
);
const failures = [];
let orgCount = 0;
let homeOrgs = 0;

for (const file of files) {
  const route = routeOf(file);
  for (const block of jsonLd(readFileSync(file, "utf8"))) {
    for (const node of nodes(block)) {
      if (!isOrg(node)) continue;
      orgCount++;
      if (route === "/") homeOrgs++;
      const label = `${route}: ${node["@type"]} "${node.name ?? "(no name)"}"`;
      if (!node.name) failures.push(`${label} missing "name"`);
      if (!/^https:\/\/[^\s]+$/.test(node.url ?? "")) failures.push(`${label} missing absolute https "url"`);
      if (!node.description) failures.push(`${label} missing "description"`);
    }
  }
}

if (homeOrgs === 0) failures.push(`/: no Organization nodes found (Person worksFor/alumniOf/memberOf dropped?)`);

if (failures.length) {
  console.error(`check-organization-schema: ${failures.length} problem(s)`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`check-organization-schema: OK (${orgCount} Organization nodes across ${files.length} routes)`);
