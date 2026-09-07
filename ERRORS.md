# ERRORS

Failures captured as rules. Read the last 5 entries before touching the site.

Format: `[YYYY-MM-DD] | [what broke] | [root cause] | [rule]`

Append to the bottom on every new failure. Don't edit history — rules accumulate.

---

[2026-05-02] | (seeded — no incidents recorded yet) | n/a | Append below as failures occur. Per Jascha's collaboration playbook: every mistake becomes a rule before moving on. Two prior pieces of guidance baked into CLAUDE.md (not failures, but worth re-stating): (1) deploy to Vercel prod after every iteration so Whitney can verify; (2) don't ask Whitney/Jascha for assets they aren't producing — execute on shell + assets I have.

[2026-09-07] | Ahrefs/GSC flagged `/` with "Page has no outgoing links" (Error severity) | The homepage's only anchors were a same-page fragment (`#chapters`) and a `mailto:` — neither counts as an outgoing link to a crawler. `/blog` and all five posts were reachable only via sitemap.xml, never via an on-page link, so the whole Field Notes section was effectively orphaned. | Every page must carry at least one real crawlable `href` to another URL. Fragment-only and `mailto:` links do not count. Sitemap inclusion is not internal linking — if a route is in `sitemap.ts`, some rendered page must also link to it. A sitewide footer (`src/components/SiteFooter.tsx`, mounted in `layout.tsx`) is the guardrail; don't remove it. Verify after any nav/layout change by grepping hrefs out of the prerendered HTML: `grep -o 'href="[^"]*"' .next/server/app/index.html`.
