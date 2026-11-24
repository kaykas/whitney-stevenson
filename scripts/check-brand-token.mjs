#!/usr/bin/env node
/**
 * Guardrail for SEOmator geo-brand-entity-sameas (ERRORS.md 2026-11-24).
 *
 * On the prerendered homepage, fails unless:
 *   - <title>, og:title, twitter:title and the <h1> text each contain the exact
 *     brand token "Whitney Stevenson" (case-insensitive, whitespace collapsed).
 *     The H1 is "WHITNEY<br />STEVENSON"; without a space its text content
 *     reads "WHITNEYSTEVENSON", which doesn't match.
 *   - Every sameAs on the homepage JSON-LD is an absolute https URL.
 *   - At least one Organization on `/` has 4+ sameAs links, at least one of
 *     them a Knowledge Graph source (Wikipedia or Wikidata).
 *
 * Standalone: `npm run check:brand`.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const HOME = join(process.cwd(), ".next", "server", "app", "index.html");
const TOKEN = "whitney stevenson";
const KG = /^https:\/\/(en\.wikipedia\.org\/wiki\/|www\.wikidata\.org\/wiki\/Q\d+$)/;

if (!existsSync(HOME)) {
  console.error("check-brand-token: .next/server/app/index.html not found (run next build)");
  process.exit(1);
}
const html = readFileSync(HOME, "utf8");

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const text = (s) => decode(s.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
const meta = (attr, name) =>
  html.match(new RegExp(`<meta ${attr}="${name}" content="([^"]*)"`))?.[1];

const surfaces = {
  title: html.match(/<title>([\s\S]*?)<\/title>/)?.[1],
  "og:title": meta("property", "og:title"),
  "twitter:title": meta("name", "twitter:title"),
  h1: html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1],
};

const failures = [];
for (const [name, raw] of Object.entries(surfaces)) {
  if (raw === undefined) {
    failures.push(`/: no ${name} found`);
    continue;
  }
  const t = text(raw);
  if (!t.toLowerCase().includes(TOKEN)) failures.push(`/: ${name} "${t}" lacks brand token "Whitney Stevenson"`);
}

const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) =>
  JSON.parse(m[1]),
);
function* nodes(v) {
  if (Array.isArray(v)) for (const x of v) yield* nodes(x);
  else if (v && typeof v === "object") {
    yield v;
    for (const x of Object.values(v)) yield* nodes(x);
  }
}
let bestOrg = 0;
for (const node of nodes(blocks)) {
  const sameAs = [].concat(node.sameAs ?? []);
  for (const s of sameAs) {
    if (!/^https:\/\/\S+$/.test(s)) failures.push(`/: ${node["@type"]} "${node.name}" sameAs "${s}" is not absolute https`);
  }
  const types = [].concat(node["@type"] ?? []);
  if (types.some((t) => /Organization$/.test(t)) && sameAs.some((s) => KG.test(s))) {
    bestOrg = Math.max(bestOrg, sameAs.length);
  }
}
if (bestOrg < 4) failures.push(`/: no Organization with 4+ sameAs including a Wikipedia/Wikidata link (best: ${bestOrg})`);

if (failures.length) {
  console.error(`check-brand-token: ${failures.length} problem(s)`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log("check-brand-token: OK (title, og:title, twitter:title, h1 carry the brand token; Organization sameAs >= 4)");
