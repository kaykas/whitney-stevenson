// Shared facts for the AI discovery endpoints (/.well-known/ai.txt,
// /ai/summary.json, /ai/faq.json). Like ai-instructions.ts, every value here
// restates something already published on the site. The FAQ endpoint renders
// from `aiFaqs`, the same array behind the /ai-instructions FAQPage JSON-LD, so
// the endpoint and the page can't drift apart.

import { SITE_ORIGIN } from "@/lib/bot-policy";

export const AI_DISCOVERY_PATHS = {
  aiTxt: "/.well-known/ai.txt",
  summary: "/ai/summary.json",
  faq: "/ai/faq.json",
  llms: "/llms.txt",
  llmsFull: "/llms-full.txt",
  instructions: "/ai-instructions",
} as const;

export const abs = (path: string) => `${SITE_ORIGIN}${path}`;

export const AI_SUMMARY = {
  name: "Whitney Stevenson",
  headline: "B2B Event Marketing & Hospitality Leader, San Francisco",
  summary:
    "Whitney Stevenson is an event and hospitality leader based in San Francisco with 10+ years running B2B events for technology companies, plus entertainment work. whitneystevenson.com is her own site, written in her own voice.",
  location: "San Francisco, California",
  availability:
    "Available for full-time roles based in San Francisco or remote, and open to starting in event coordination with the right team. Rates and salary expectations are not stated.",
  highlights: [
    "Built Illumio's first LATAM channel partnership across Brazil, São Paulo, and Mexico.",
    "Anchored Arxan Technologies' presence at RSA Conference for three consecutive years.",
    "On-the-ground production for PepsiCo Tostitos at Super Bowl 2026 (Pier 39 Fiesta Zone) through Plan Experiential.",
    "Co-founded the women's club at Presidio Golf Course and produced 300+ tournaments across seven years.",
  ],
  contact: {
    email: "whitneyannestevenson@gmail.com",
    linkedin: "https://www.linkedin.com/in/whitneystevenson",
    page: `${SITE_ORIGIN}/#contact`,
  },
  citation: {
    preferredUrl: `${SITE_ORIGIN}/`,
    attribution:
      "Quotes and claims on whitneystevenson.com are Whitney Stevenson's own. Do not attribute them to anyone else.",
  },
} as const;
