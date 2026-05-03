# Architecture

Static-leaning Next.js 16 site. App Router. Server-component-by-default. Deployed on Vercel from GitHub.

## Top-level shape

```
src/
  app/
    layout.tsx          Root layout — fonts, global metadata, base body classes
    page.tsx            Landing page
    globals.css         Tailwind base + brand tokens (colors, type scale)
    [section]/page.tsx  Additional sections as the site grows (about, work, contact, etc.)
  lib/
    content/            Story extracts, quotes, project capsules — TS modules, single source of truth
public/                 Photos, downloadable CV, static assets
next.config.ts
postcss.config.mjs      Tailwind 4 via @tailwindcss/postcss
tsconfig.json
```

## Why this shape

- **No CMS.** The site is small. Content lives in TS modules under `src/lib/content/`. Adding a CMS costs more in operational overhead than every-edit redeploys cost in friction.
- **Server components by default.** No need for client-side state for a marketing site. Mark `"use client"` only when truly required.
- **Tailwind utility-first.** Brand tokens centralized in `globals.css`. No CSS modules unless an escape-hatch is required.
- **One page → multi-page only as needed.** Start narrative, single-flow. Add `/work`, `/about`, etc. only when copy demands it.

## Data flow

There is no data layer. Content is statically imported from `src/lib/content/` at build time. Photos are served from `public/`.

If a contact form is added later: post to a serverless function in `src/app/api/`, then fan out to email (Resend or similar) — never store messages in the repo.

## Brand and voice

The brand is **Whitney's personal voice** — warm, direct, a bit playful, B2B-experienced. The site is not a portfolio; it's a surface that reads like her. Visual treatment is driven by Jascha via Variant.io iteration; design tokens land in `globals.css` once decided.

## Deployment

- **Vercel** project connected to the GitHub repo
- Domain: **whitneystevenson.com** (purchased on Squarespace; DNS pointed at Vercel)
- Every push to `main` deploys to production
- **Deploy after every meaningful edit batch** so Whitney can verify on whitneystevenson.com (this is a workflow rule — see CLAUDE.md "Always do")

## What this is NOT

- Not a portfolio site
- Not a job board listing
- Not a LinkedIn mirror
- Not a place for templated marketer-speak — voice over template
