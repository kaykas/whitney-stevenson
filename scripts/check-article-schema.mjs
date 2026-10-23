#!/usr/bin/env node
/**
 * Guardrail for the Ahrefs "Article page missing Article schema" notice
 * (ERRORS.md 2026-10-22).
 *
 * Every Field Note (`/blog/*`) and `/ai-instructions` must ship exactly one
 * Article-family JSON-LD node with the fields Google lists for Article rich
 * results: headline, author, datePublished, dateModified, image, plus
 * mainEntityOfPage pointing at the route's own URL. `/blog` must ship a Blog
 * whose blogPost list covers every post card on the page. All of it is built
 * by `articleSchema` in src/lib/schema.ts.
 *
 * Runs as `postbuild`. Standalone: `npm run check:article`.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const APP_DIR = join(process.cwd(), ".next", "server", "app");
const ORIGIN = "https://www.whitneystevenson.com";
const ARTICLE_TYPES = new Set(["Article", "BlogPosting", "NewsArticle"]);
const REQUIRED = ["headline", "author", "datePublished", "dateModified", "image", "mainEntityOfPage"];

function jsonLd(html) {
  return [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(
    (m) => JSON.parse(m[1]),
  );
}

function read(file) {
  const path = join(APP_DIR, file);
  return existsSync(path) ? readFileSync(path, "utf8") : null;
}

const blogDir = join(APP_DIR, "blog");
const postFiles = existsSync(blogDir)
  ? readdirSync(blogDir).filter((f) => f.endsWith(".html")).map((f) => `blog/${f}`)
  : [];

if (postFiles.length === 0) {
  console.error("check-article-schema: no prerendered posts found in .next/server/app/blog");
  process.exit(1);
}

const failures = [];

function checkArticle(route, node) {
  for (const field of REQUIRED) {
    if (!node[field]) failures.push(`${route}: ${node["@type"]} missing "${field}"`);
  }
  const self = route === "/" ? `${ORIGIN}/` : `${ORIGIN}${route}`;
  if (node.mainEntityOfPage?.["@id"] !== self) {
    failures.push(`${route}: mainEntityOfPage @id is ${node.mainEntityOfPage?.["@id"]}, expected ${self}`);
  }
}

for (const file of [...postFiles, "ai-instructions.html"]) {
  const route = "/" + file.replace(/\.html$/, "");
  const html = read(file);
  if (!html) {
    failures.push(`${route}: no prerendered HTML`);
    continue;
  }
  const articles = jsonLd(html).filter((n) => ARTICLE_TYPES.has(n["@type"]));
  if (articles.length !== 1) {
    failures.push(`${route}: ${articles.length} Article-family JSON-LD nodes, expected 1`);
    continue;
  }
  checkArticle(route, articles[0]);
  console.log(`  ${route.padEnd(48)} ${articles[0]["@type"]}`);
}

const blogHtml = read("blog.html");
const blog = blogHtml && jsonLd(blogHtml).find((n) => n["@type"] === "Blog");
if (!blog) {
  failures.push("/blog: no Blog JSON-LD");
} else {
  const listed = new Set((blog.blogPost ?? []).map((p) => p.url));
  for (const file of postFiles) {
    const url = `${ORIGIN}/${file.replace(/\.html$/, "")}`;
    if (!listed.has(url)) failures.push(`/blog: Blog.blogPost is missing ${url}`);
  }
  for (const post of blog.blogPost ?? []) {
    if (!ARTICLE_TYPES.has(post["@type"])) failures.push(`/blog: blogPost ${post.url} is ${post["@type"]}`);
  }
  console.log(`  ${"/blog".padEnd(48)} Blog (${listed.size} posts)`);
}

if (failures.length) {
  console.error('\ncheck-article-schema FAILED — Ahrefs "Article page missing Article schema" would regress:\n');
  for (const f of failures) console.error(`  ✗ ${f}`);
  console.error("\nSee ERRORS.md (2026-10-22). Build Article JSON-LD with articleSchema()");
  console.error("from src/lib/schema.ts rather than by hand.\n");
  process.exit(1);
}

console.log(`\ncheck-article-schema: ${postFiles.length + 2} routes OK`);
