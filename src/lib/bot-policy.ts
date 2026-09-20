/**
 * Single source of truth for this site's crawler and AI-agent policy.
 *
 * WHY THIS FILE EXISTS
 * --------------------
 * The policy used to live as hand-written groups in `src/app/robots.ts` with
 * `// AI Trainers — block` / `// AI Citers — allow` comments above them. The
 * comments drifted from the entries: `cohere-ai` (a training crawler) sat under
 * "citers", and `ClaudeBot` was blocked while `anthropic-ai` and `Claude-Web`
 * — the same vendor's legacy tokens for the same job — were allowed. A crawler
 * got the whole site or none of it depending on which string it happened to
 * send. An AEO audit flagged this as "Inconsistent AI training bot policy".
 *
 * Comments can't be verified, so they were the wrong place for intent. Vendor
 * and purpose are recorded here as DATA, which `scripts/check-bot-policy.mjs`
 * validates against the rendered robots.txt on every build.
 *
 * THE POLICY, AND WHY
 * -------------------
 * Allow everything, training included.
 *
 * This site is a promotional surface whose job is to help Whitney land a B2B
 * event marketing role. It ships `public/llms.txt` and `public/llms-full.txt`,
 * the latter of which opens "intended for AI assistants (ChatGPT, Claude,
 * Perplexity, Gemini, etc.) to ingest in full" and closes with a "Citation
 * Guidance for AI Assistants" section written to be quoted verbatim. There is
 * no rights-protection motive anywhere in the project. Soliciting ingestion in
 * one file while blocking the ingesting crawlers in another is incoherent, and
 * it is incoherent in the *blocking* direction — so the blocks are what go.
 *
 * If that ever changes and training should genuinely be refused, flip the
 * `allow` flag on every `ai-training` and `ai-control` row TOGETHER, and revise
 * the invitation language in `public/llms-full.txt` in the same commit. The
 * build will fail if a vendor's AI agents disagree with each other.
 *
 * `ai-search` and `ai-user` are a different matter: they are the agents that
 * put this site into an assistant's answer with a link back. Blocking one costs
 * a citation and buys nothing, so `check-bot-policy.mjs` hard-fails the build if
 * any of them is ever disallowed, whatever the training policy is doing. That
 * guardrail exists because the earlier per-vendor consistency check only caught
 * a vendor disagreeing with ITSELF — a policy that blocked every assistant
 * crawler uniformly was perfectly "consistent" and would have sailed through,
 * which is the AEO finding "Indexable page blocked from some AI search bots".
 */

export type AgentPurpose =
  /** Classic web search indexing. Not an AI-training agent. */
  | "search"
  /** Grounds and cites live assistant answers. The AEO surface that matters. */
  | "ai-search"
  /** Fetches a page because a human asked an assistant to look at it. */
  | "ai-user"
  /** Ingests content into a model-training corpus. */
  | "ai-training"
  /**
   * Not a crawler at all — a robots.txt token a vendor honours as an opt-in /
   * opt-out signal for AI use of content its normal crawler already fetched.
   * Only meaningful as an explicit group, which is why these are listed.
   */
  | "ai-control";

export type AgentPolicy = {
  /** robots.txt user-agent token, spelled exactly as the vendor documents it. */
  token: string;
  /** Grouping key for the vendor-consistency check. */
  vendor: string;
  purpose: AgentPurpose;
  allow: boolean;
  note?: string;
};

/**
 * Every agent is `allow: true` today. The list is still worth maintaining:
 *
 *  - `ai-control` tokens (`Google-Extended`, `Applebot-Extended`) only take
 *    effect as explicit groups, and removing their former `Disallow: /` is the
 *    actual behavioural change in this file.
 *  - The rows document which vendor and which purpose each token serves, so the
 *    next edit can't quietly mis-file a trainer as a citer the way `cohere-ai`
 *    was.
 *
 * Be honest about the rest: because the wildcard group allows everything, the
 * `search` / `ai-search` / `ai-user` rows are documentation, not enforcement.
 * They also carry a footgun — under robots.txt precedence a bot that matches
 * its own group ignores `*` completely, so a future `Disallow` added only to
 * `*` would NOT apply to any agent named here. `check-bot-policy.mjs` fails the
 * build if the wildcard group ever grows a `Disallow`, which forces that rule
 * to be mirrored into every group rather than silently bypassed.
 */
export const BOT_POLICY: readonly AgentPolicy[] = [
  // OpenAI
  { token: "GPTBot", vendor: "OpenAI", purpose: "ai-training", allow: true },
  { token: "OAI-SearchBot", vendor: "OpenAI", purpose: "ai-search", allow: true },
  { token: "ChatGPT-User", vendor: "OpenAI", purpose: "ai-user", allow: true },

  // Anthropic. Replaces the retired `anthropic-ai` and `Claude-Web` tokens,
  // whose old Allow groups contradicted ClaudeBot's Disallow.
  { token: "ClaudeBot", vendor: "Anthropic", purpose: "ai-training", allow: true },
  { token: "Claude-SearchBot", vendor: "Anthropic", purpose: "ai-search", allow: true },
  { token: "Claude-User", vendor: "Anthropic", purpose: "ai-user", allow: true },

  // Google
  { token: "Googlebot", vendor: "Google", purpose: "search", allow: true },
  {
    token: "Google-Extended",
    vendor: "Google",
    purpose: "ai-control",
    allow: true,
    note: "Gates Gemini training and AI Overviews grounding. Was Disallow, which blocked the Gemini citations llms.txt asks for.",
  },
  {
    token: "Google-CloudVertexBot",
    vendor: "Google",
    purpose: "ai-search",
    allow: true,
    note: "Fetches pages to ground Vertex AI agent answers. Distinct from Google-Extended and not covered by it.",
  },

  // Apple
  { token: "Applebot", vendor: "Apple", purpose: "search", allow: true },
  {
    token: "Applebot-Extended",
    vendor: "Apple",
    purpose: "ai-control",
    allow: true,
    note: "Gates Apple Intelligence training. Was Disallow.",
  },

  // Perplexity
  { token: "PerplexityBot", vendor: "Perplexity", purpose: "ai-search", allow: true },
  { token: "Perplexity-User", vendor: "Perplexity", purpose: "ai-user", allow: true },

  // Microsoft
  { token: "bingbot", vendor: "Microsoft", purpose: "search", allow: true },

  // Meta
  { token: "meta-externalagent", vendor: "Meta", purpose: "ai-training", allow: true },
  { token: "Meta-ExternalFetcher", vendor: "Meta", purpose: "ai-user", allow: true },

  // Amazon
  {
    token: "Amazonbot",
    vendor: "Amazon",
    purpose: "search",
    allow: true,
    note: "Alexa answers and search indexing. Was Disallow under an 'AI Trainers' comment it does not belong to.",
  },

  // Common Crawl — the corpus most open models train on.
  { token: "CCBot", vendor: "Common Crawl", purpose: "ai-training", allow: true },

  // ByteDance
  { token: "Bytespider", vendor: "ByteDance", purpose: "ai-training", allow: true },

  { token: "TikTokSpider", vendor: "ByteDance", purpose: "ai-training", allow: true },

  // Cohere — was filed under "AI Citers" despite being a training crawler.
  { token: "cohere-ai", vendor: "Cohere", purpose: "ai-training", allow: true },
  {
    token: "cohere-training-data-crawler",
    vendor: "Cohere",
    purpose: "ai-training",
    allow: true,
    note: "Cohere's current token; cohere-ai is the legacy one. Both listed so the answer can't depend on which is sent.",
  },

  // Smaller assistants that cite sources.
  { token: "DuckAssistBot", vendor: "DuckDuckGo", purpose: "ai-search", allow: true },
  { token: "MistralAI-User", vendor: "Mistral", purpose: "ai-user", allow: true },
  { token: "YouBot", vendor: "You.com", purpose: "ai-search", allow: true },
  { token: "AI2Bot", vendor: "Allen Institute", purpose: "ai-training", allow: true },
  { token: "Ai2Bot-Dolma", vendor: "Allen Institute", purpose: "ai-training", allow: true },

  // Independent search indexes whose answer engines (Brave Leo, Kagi Assistant)
  // ground on their own crawl. `search` is the honest purpose — neither token
  // gates training — but they are named here because an assistant answer that
  // cites this site can come from either one.
  { token: "Bravebot", vendor: "Brave", purpose: "search", allow: true },
  { token: "Kagibot", vendor: "Kagi", purpose: "search", allow: true },
];

/** Canonical host. The apex redirects here, so never emit the apex. */
export const SITE_ORIGIN = "https://www.whitneystevenson.com";
