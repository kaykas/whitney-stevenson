// RSS 2.0 feed for Field Notes, plus the <link rel="alternate"> entry that
// advertises it. Static data from src/lib/posts.ts, no user input.
//
// Why it exists: the GEO audit flagged "[GEO:signals-rss-freshness] Missing
// <link rel=alternate type=application/rss+xml>". Crawlers and AI answer
// engines read the feed to learn what's new without re-crawling every page.
//
// Next merges `alternates` SHALLOWLY down the route tree, so every route that
// sets its own `alternates.canonical` must spread FEED_ALTERNATE_TYPES too, or
// the feed link silently disappears from that page. Enforced by
// scripts/check-feed.mjs.
import { byDateDesc } from "@/lib/posts";

export const FEED_PATH = "/feed.xml";
export const FEED_TITLE = "Field Notes by Whitney Stevenson";
const ORIGIN = "https://www.whitneystevenson.com";
const FEED_DESCRIPTION =
  "Stories from the room: case studies, signature moments, and operational philosophy from 10+ years of B2B event marketing in San Francisco.";

export const FEED_ALTERNATE_TYPES = {
  types: { "application/rss+xml": [{ url: FEED_PATH, title: FEED_TITLE }] },
};

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** "2026-11-20" -> RFC 822 date at noon UTC (deterministic, no build-time clock). */
function rfc822(date: string): string {
  return new Date(`${date}T12:00:00Z`).toUTCString();
}

export function renderFeed(): string {
  const items = byDateDesc();
  // Freshness = newest post date, not build time, so a rebuild with no new
  // content doesn't fake a "modified" signal.
  const lastBuild = items.length ? rfc822(items[0].date) : rfc822("2026-11-02");
  const body = items
    .map((p) => {
      const url = `${ORIGIN}/blog/${p.slug}`;
      return [
        "    <item>",
        `      <title>${esc(p.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${rfc822(p.date)}</pubDate>`,
        `      <dc:creator>Whitney Stevenson</dc:creator>`,
        `      <description>${esc(p.description)}</description>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${esc(FEED_TITLE)}</title>
    <link>${ORIGIN}/blog</link>
    <atom:link href="${ORIGIN}${FEED_PATH}" rel="self" type="application/rss+xml"/>
    <description>${esc(FEED_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
${body}
  </channel>
</rss>
`;
}
