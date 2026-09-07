# ERRORS

Failures captured as rules. Read the last 5 entries before touching the site.

Format: `[YYYY-MM-DD] | [what broke] | [root cause] | [rule]`

Append to the bottom on every new failure. Don't edit history — rules accumulate.

---

[2026-05-02] | (seeded — no incidents recorded yet) | n/a | Append below as failures occur. Per Jascha's collaboration playbook: every mistake becomes a rule before moving on. Two prior pieces of guidance baked into CLAUDE.md (not failures, but worth re-stating): (1) deploy to Vercel prod after every iteration so Whitney can verify; (2) don't ask Whitney/Jascha for assets they aren't producing — execute on shell + assets I have.

[2026-09-06] | Ahrefs/GSC flagged the homepage (`/`) with "Page has no outgoing links" (Error severity) | `src/app/page.tsx` shipped with only two anchors: a same-page fragment (`#chapters`) and a `mailto:`. Crawlers count neither as an outgoing link, so the homepage was a dead end — no crawl path from `/` to `/blog` or any post, and no external corroborating link. The blog index and post templates already linked correctly; only the homepage was orphaned. | RULE: every route must ship at least one crawlable `<a href>`/`<Link>` to another URL — fragment-only anchors and `mailto:` don't count. When adding a route or a content section, wire it into the internal link graph in both directions (home → blog → post → home) and give at least one external `rel="me"` link to a verified profile. Never invent a social URL to satisfy this; link only profiles that exist (the placeholder "TW" span was replaced with a real `/blog` link rather than a fabricated Twitter URL). Verify after build with: `grep -o 'href="[^"]*"' .next/server/app/index.html`.
