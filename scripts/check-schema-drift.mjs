#!/usr/bin/env node
/**
 * Guardrail for SEOmator geo-schema-drift (ERRORS.md 2026-11-23).
 *
 * The rule compares JSON-LD against the visible page text. The sitewide
 * Person + Organization graph used to render from layout.tsx on every route,
 * so 42 of 44 routes carried names and bios ("Arxan Technologies", the
 * Presidio club description, ...) that only the homepage shows.
 *
 * Fails if:
 *   - any route other than `/` carries an Organization-family node, or
 *   - any Person or Organization `name` in a route's JSON-LD is not in that
 *     route's visible text (case- and whitespace-insensitive).
 *
 * Reads the PRERENDERED HTML, same as the other postbuild checks.
 * Standalone: `npm run check:drift`.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const APP_DIR = join(process.cwd(), ".next", "server", "app");
const NOT_CRAWLABLE = new Set(["_global-error.html", "_error.html", "_not-found.html"]);
const ORG_TYPES = new Set([
  "Organization", "SportsOrganization", "Corporation", "LocalBusiness",
  "NGO", "EducationalOrganization", "NewsMediaOrganization",
]);

const walk = (dir) =>
  readdirSync(dir).flatMap((e) => {
    const full = join(dir, e);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });

function routeOf(file) {
  const rel = relative(APP_DIR, file).split(sep).join("/");
  const path = "/" + rel.replace(/\.html$/, "").replace(/(^|\/)index$/, "");
  return path === "/" ? "/" : path.replace(/\/$/, "");
}

function* nodes(value) {
  if (Array.isArray(value)) for (const v of value) yield* nodes(v);
  else if (value && typeof value === "object") {
    yield value;
    for (const v of Object.values(value)) yield* nodes(v);
  }
}

const norm = (s) =>
  s.toLowerCase().replace(/[‘’]/g, "'").replace(/\s+/g, " ").trim();

function visibleText(html) {
  const body = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ");
  return norm(body);
}

const types = (n) => [].concat(n["@type"] ?? []);
const isOrg = (n) => types(n).some((t) => ORG_TYPES.has(t));
const isPerson = (n) => types(n).includes("Person");

const files = walk(APP_DIR).filter(
  (f) => f.endsWith(".html") && !NOT_CRAWLABLE.has(relative(APP_DIR, f).split(sep).join("/")),
);
const failures = [];
let checked = 0;

for (const file of files) {
  const route = routeOf(file);
  const html = readFileSync(file, "utf8");
  const text = visibleText(html);
  const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(
    (m) => JSON.parse(m[1]),
  );
  for (const block of blocks) {
    for (const n of nodes(block)) {
      if (isOrg(n) && route !== "/") {
        failures.push(`${route}: Organization "${n.name}" off the homepage (render JsonLd from page.tsx only)`);
      }
      if ((isOrg(n) || isPerson(n)) && typeof n.name === "string") {
        checked++;
        if (!text.includes(norm(n.name))) {
          failures.push(`${route}: ${types(n).join("/")} name "${n.name}" is not in the visible text`);
        }
      }
    }
  }
}

if (failures.length) {
  console.error(`check-schema-drift: ${failures.length} problem(s)`);
  for (const f of [...new Set(failures)]) console.error(`  - ${f}`);
  console.error("\nSee ERRORS.md (2026-11-23).\n");
  process.exit(1);
}
console.log(`check-schema-drift: OK (${checked} Person/Organization names visible across ${files.length} routes)`);
