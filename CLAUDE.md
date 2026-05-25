# Project: Whitney Stevenson personal site

## What this is

A personality-forward promotional site for Whitney Stevenson — a B2B event marketer with 10+ years of experience (Plan Experiential, Illumio LATAM, Arxan, Presidio Women's Golf Club). The site exists to help her land her next B2B event marketing role. It is **not** a formal portfolio: it is an opinionated, voice-forward web presence that shows who she is, not just what she's done.

Stakeholders:
- **Whitney** — the human ingredients: stories, voice messages, photos
- **Jascha** — drives look-and-feel + Variant.io design iteration
- **Mira (me)** — handles design and build

Live at: https://whitneystevenson.com (Squarespace-purchased domain, Jascha owns; deployed via Vercel)

## Tech stack

- **Next.js 16.2.3** (App Router, Turbopack)
- **React 19.2**
- **TypeScript 5**
- **Tailwind 4** via `@tailwindcss/postcss`
- **lucide-react** for icons
- **Vercel** for hosting + previews
- ESLint 9 (eslint-config-next 16.2.3)

Whitney's CV (reference, not deployed): `/Users/jkw/.claude/channels/telegram/inbox/1777328761677-AgADLwcAAjQmgEc.pdf`

## Conventions

- **App Router only** (`src/app/`). No pages/.
- **Server components by default.** Mark `"use client"` only when truly needed (interactivity, browser APIs).
- **Tailwind utility-first.** No CSS modules unless escape-hatch needed. Brand colors live in `tailwind.config` / `globals.css`.
- **Voice over template.** Copy is Whitney's, not LinkedIn boilerplate. If you can't tell who wrote a sentence, it's wrong.
- **One source of truth for content** — story extracts and quotes live in `src/lib/content/` (TS modules, not CMS). When Whitney sends new material, capture it there.
- **Photos** go in `public/` with descriptive filenames (`whitney-portrait-2024.jpg`, not `IMG_4231.jpeg`).
- **Deploy after every meaningful edit batch.** This is a feedback rule from prior collaboration (`feedback_whitney_deploy_each_iteration` in auto-memory): when iterating with Whitney, push to Vercel prod after every edit so she can verify on whitneystevenson.com.

## Never do

- Don't ask Whitney for "Variant exports" or "design specs Jascha hasn't produced." Execute on assets and shell; let design happen via Variant in parallel. (See `feedback_execute_dont_ask_variant`.)
- Don't make this a portfolio. Personality first. If a section reads like a recruiter wrote it, kill it.
- Don't add a CMS. Content lives in TS modules. The site is small enough that the marginal cost of a deploy is lower than the operational cost of a CMS.
- Don't add tracking/analytics without Jascha's explicit say-so. This is Whitney's personal surface; default to no third-party scripts.

## Always do

- Read ERRORS.md before touching any existing feature.
- Push to Vercel prod after every iteration so Whitney can verify live (see "deploy each iteration" rule above).
- When Whitney sends a voice message, transcribe it (whisper) and capture story extracts in `~/.openclaw/workspace/whitney-watcher/notes.md` AND in `src/lib/content/` if the material lands on the site.
- Match her register in copy: warm, direct, a bit playful, exclamation-points-friendly. Don't over-formalize.

## Current focus

[Update each session.]

2026-05-02: Site shell scaffolded. Awaiting (a) Whitney's first batch of story material and (b) Jascha's first Variant design pass. Holding pattern on the build until those land.

## Key files

- `src/app/layout.tsx` — root layout, fonts, global metadata
- `src/app/page.tsx` — landing page
- `src/app/globals.css` — Tailwind base + brand tokens
- `src/lib/content/` — story extracts, quotes, project capsules (TS modules — single source of truth)
- `public/` — photos and static assets

## Last session

2026-05-02 — Bootstrapped CLAUDE.md, ERRORS.md, ARCHITECTURE.md per Jascha's collaboration playbook. Site shell remains scaffolded pending content + Variant pass.

<!-- skill-routing:start -->
## Skill routing

_Auto-generated from `~/.openclaw/workspace/skill-routing.yaml`. Do not edit between markers — re-run `tools/generate-skill-routing-sections.py` to refresh._

**Surfaces:** marketing-site, seo

**Skills relevant to this project (in priority order):**

- `/design-review`
- `/delight-pass`
- `/qa`
- `/verify`

Run a skill by typing its slash-name. Proactive-suggest is enabled — phrasings matching each skill's `Use when:` description will surface the skill automatically.

<!-- skill-routing:end -->
