#!/usr/bin/env node
/**
 * Guardrail for the AEO finding "Inconsistent AI training bot policy".
 *
 * The original robots.ts blocked `ClaudeBot` while allowing `anthropic-ai` and
 * `Claude-Web` — the same vendor, the same purpose, opposite answers — and
 * filed the `cohere-ai` trainer under an "AI Citers — allow" comment. Comments
 * can't be verified, so this script verifies the rendered artifact instead.
 *
 * Checks the PRERENDERED robots.txt, not `src/lib/bot-policy.ts`. A guardrail
 * that reads the same module it is guarding only proves the module agrees with
 * itself. The vendor/purpose map below is independent knowledge (which token
 * belongs to whom — an external fact about crawlers); every allow/disallow
 * DECISION is read back out of the robots.txt a crawler would actually fetch.
 *
 * Fails the build when:
 *   1. a vendor's AI agents disagree with each other (the flagged defect);
 *   2. `llms.txt` / `llms-full.txt` solicit ingestion while a trainer is blocked
 *      (the cross-file contradiction);
 *   3. a token is declared in more than one group;
 *   4. a major AI agent is missing from the policy entirely;
 *   5. the wildcard group grows a `Disallow` (see the footgun note in
 *      src/lib/bot-policy.ts — named groups do not inherit from `*`);
 *   6. the Sitemap line is missing or points at the non-canonical apex host;
 *   7. any `ai-search` / `ai-user` agent is disallowed (the AEO finding
 *      "Indexable page blocked from some AI search bots");
 *   8. a group grants access with `Allow:` but no `Disallow:` line, which
 *      pre-RFC-9309 parsers may discard as malformed.
 *
 * Runs as `postbuild`. Standalone: `npm run check:bots`.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const ROBOTS = join(process.cwd(), ".next", "server", "app", "robots.txt.body");
const PUBLIC_DIR = join(process.cwd(), "public");
const CANONICAL_HOST = "www.whitneystevenson.com";

/**
 * Independent vendor/purpose map. `ai-*` purposes participate in the
 * per-vendor consistency check; `search` agents do not (a site may reasonably
 * allow web search while refusing AI training, so Googlebot vs Google-Extended
 * disagreeing is legitimate — ClaudeBot vs Claude-SearchBot disagreeing is not,
 * they are both AI surfaces of one vendor).
 */
const AGENTS = {
  GPTBot: { vendor: "OpenAI", purpose: "ai-training" },
  "OAI-SearchBot": { vendor: "OpenAI", purpose: "ai-search" },
  "ChatGPT-User": { vendor: "OpenAI", purpose: "ai-user" },
  ClaudeBot: { vendor: "Anthropic", purpose: "ai-training" },
  "Claude-SearchBot": { vendor: "Anthropic", purpose: "ai-search" },
  "Claude-User": { vendor: "Anthropic", purpose: "ai-user" },
  "anthropic-ai": { vendor: "Anthropic", purpose: "ai-training", retired: true },
  "Claude-Web": { vendor: "Anthropic", purpose: "ai-training", retired: true },
  Googlebot: { vendor: "Google", purpose: "search" },
  "Google-Extended": { vendor: "Google", purpose: "ai-control" },
  "Google-CloudVertexBot": { vendor: "Google", purpose: "ai-search" },
  Applebot: { vendor: "Apple", purpose: "search" },
  "Applebot-Extended": { vendor: "Apple", purpose: "ai-control" },
  PerplexityBot: { vendor: "Perplexity", purpose: "ai-search" },
  "Perplexity-User": { vendor: "Perplexity", purpose: "ai-user" },
  bingbot: { vendor: "Microsoft", purpose: "search" },
  "meta-externalagent": { vendor: "Meta", purpose: "ai-training" },
  "Meta-ExternalFetcher": { vendor: "Meta", purpose: "ai-user" },
  Amazonbot: { vendor: "Amazon", purpose: "search" },
  CCBot: { vendor: "Common Crawl", purpose: "ai-training" },
  Bytespider: { vendor: "ByteDance", purpose: "ai-training" },
  TikTokSpider: { vendor: "ByteDance", purpose: "ai-training" },
  "cohere-ai": { vendor: "Cohere", purpose: "ai-training" },
  "cohere-training-data-crawler": { vendor: "Cohere", purpose: "ai-training" },
  DuckAssistBot: { vendor: "DuckDuckGo", purpose: "ai-search" },
  "MistralAI-User": { vendor: "Mistral", purpose: "ai-user" },
  YouBot: { vendor: "You.com", purpose: "ai-search" },
  AI2Bot: { vendor: "Allen Institute", purpose: "ai-training" },
  "Ai2Bot-Dolma": { vendor: "Allen Institute", purpose: "ai-training" },
  Bravebot: { vendor: "Brave", purpose: "search" },
  Kagibot: { vendor: "Kagi", purpose: "search" },
};

/**
 * Agents the policy must take an explicit position on. Deliberately not "every
 * key in AGENTS" — retired tokens must NOT be reintroduced, and this list is
 * the set whose absence would be a real AEO gap.
 */
const MUST_COVER = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Googlebot",
  "Google-Extended",
  "Google-CloudVertexBot",
  "Applebot-Extended",
  "PerplexityBot",
  "Perplexity-User",
  "DuckAssistBot",
  "Bravebot",
  "Kagibot",
  "CCBot",
  "meta-externalagent",
];

if (!existsSync(ROBOTS)) {
  console.error(`check-bot-policy FAILED — no prerendered robots.txt at ${ROBOTS}`);
  console.error("Run `npm run build` first (this normally runs as postbuild).");
  process.exit(1);
}

const robotsTxt = readFileSync(ROBOTS, "utf8");
const failures = [];

/** Parse into groups: [{ agents: [token], allow: [path], disallow: [path] }] */
function parseGroups(text) {
  const groups = [];
  let current = null;
  let lastWasAgent = false;

  for (const raw of text.split("\n")) {
    const line = raw.replace(/#.*$/, "").trim();
    if (!line) continue;
    const match = line.match(/^([A-Za-z-]+)\s*:\s*(.*)$/);
    if (!match) continue;
    const field = match[1].toLowerCase();
    const value = match[2].trim();

    if (field === "user-agent") {
      // Consecutive User-agent lines share one group of rules.
      if (!current || !lastWasAgent) {
        current = { agents: [], allow: [], disallow: [] };
        groups.push(current);
      }
      current.agents.push(value);
      lastWasAgent = true;
      continue;
    }
    lastWasAgent = false;
    if (!current) continue;
    if (field === "allow") current.allow.push(value);
    if (field === "disallow") current.disallow.push(value);
  }
  return groups;
}

const groups = parseGroups(robotsTxt);

// --- 3. no token declared twice -------------------------------------------
const seen = new Map();
for (const group of groups) {
  for (const agent of group.agents) {
    const key = agent.toLowerCase();
    if (seen.has(key)) {
      failures.push(
        `"${agent}" is declared in more than one group — crawlers use the first match, so the second is dead config`,
      );
    }
    seen.set(key, group);
  }
}

// --- decisions, read back out of the rendered file ------------------------
/** true = may crawl the site root, false = blocked. */
function decisionFor(group) {
  if (group.disallow.some((p) => p === "/")) return false;
  if (group.allow.some((p) => p === "/" || p === "")) return true;
  return !group.disallow.length;
}

const decisions = new Map(); // token (as written) -> boolean
for (const group of groups) {
  const verdict = decisionFor(group);
  for (const agent of group.agents) {
    if (agent === "*") continue;
    decisions.set(agent, verdict);
  }
}

// --- 5. wildcard group must stay fully permissive -------------------------
const wildcard = groups.find((g) => g.agents.includes("*"));
if (!wildcard) {
  failures.push("no `User-Agent: *` group — unlisted crawlers have no policy at all");
} else if (wildcard.disallow.some((p) => p !== "")) {
  failures.push(
    `the \`*\` group has Disallow ${wildcard.disallow
      .filter((p) => p !== "")
      .map((p) => `"${p}"`)
      .join(", ")} — every named agent below it has its OWN group and therefore ` +
      "ignores `*` entirely, so that rule silently does not apply to any AI bot. " +
      "Mirror it into every group in src/lib/bot-policy.ts, or drop it.",
  );
}

// --- 8. permissive groups must say so in both dialects --------------------
// `Allow:` postdates the original robots.txt spec. A parser written to that
// spec expects a `Disallow` line in every group and may discard a group that
// has none, leaving the bot with no record it recognises. An empty
// `Disallow:` is the old spelling of "nothing is forbidden" — emitting it
// alongside `Allow: /` makes the permission legible to every parser
// generation. See the docblock in src/app/robots.ts.
for (const group of groups) {
  if (!decisionFor(group)) continue;
  if (group.disallow.length) continue;
  failures.push(
    `group [${group.agents.join(", ")}] grants access with \`Allow:\` but has no ` +
      "`Disallow:` line — parsers predating the Allow directive can discard it as " +
      'malformed. Emit an empty `Disallow:` too (robots.ts renders `disallow: [""]`).',
  );
}

// --- 7. no AI-search or AI-user agent may be blocked ---------------------
// Check 1 only catches a vendor disagreeing with ITSELF, so a policy that
// blocked every assistant crawler uniformly would pass it while being exactly
// the AEO finding "Indexable page blocked from some AI search bots". These are
// the agents that produce a cited link back; blocking one is never the intent
// on a site whose whole job is being found.
for (const [token, allowed] of decisions) {
  if (allowed) continue;
  const purpose = AGENTS[token]?.purpose;
  if (purpose !== "ai-search" && purpose !== "ai-user") continue;
  failures.push(
    `"${token}" (${AGENTS[token].vendor}, ${purpose}) is disallowed — that is an ` +
      "assistant-search/citation agent, and blocking it hides indexable pages from " +
      "AI answers. If this is deliberate, it contradicts public/llms.txt and both " +
      "have to change together.",
  );
}

// --- 4. required coverage --------------------------------------------------
for (const token of MUST_COVER) {
  if (!decisions.has(token)) {
    failures.push(
      `"${token}" (${AGENTS[token].vendor}, ${AGENTS[token].purpose}) has no group — add it to BOT_POLICY in src/lib/bot-policy.ts`,
    );
  }
}

// retired tokens must not come back
for (const token of decisions.keys()) {
  if (AGENTS[token]?.retired) {
    failures.push(
      `"${token}" is a retired ${AGENTS[token].vendor} token and was half of the original inconsistency — remove it; ${AGENTS[token].vendor}'s live tokens carry the policy`,
    );
  }
  if (!AGENTS[token]) {
    console.log(`  note: "${token}" is not in this script's vendor map — unverified`);
  }
}

// --- 1. per-vendor AI consistency (the flagged defect) --------------------
const byVendor = new Map();
for (const [token, allowed] of decisions) {
  const meta = AGENTS[token];
  if (!meta || !meta.purpose.startsWith("ai-")) continue;
  if (!byVendor.has(meta.vendor)) byVendor.set(meta.vendor, []);
  byVendor.get(meta.vendor).push({ token, allowed, purpose: meta.purpose });
}

for (const [vendor, entries] of byVendor) {
  const allowed = entries.filter((e) => e.allowed);
  const blocked = entries.filter((e) => !e.allowed);
  if (allowed.length && blocked.length) {
    failures.push(
      `${vendor}'s AI agents disagree — allowed: ${allowed
        .map((e) => `${e.token} (${e.purpose})`)
        .join(", ")} | blocked: ${blocked
        .map((e) => `${e.token} (${e.purpose})`)
        .join(", ")}. One vendor, one answer.`,
    );
  }
}

// --- 2. robots.txt vs the llms.txt invitation ----------------------------
const llmsFiles = existsSync(PUBLIC_DIR)
  ? readdirSync(PUBLIC_DIR).filter((f) => /^llms.*\.txt$/.test(f))
  : [];

const INVITES_INGESTION = /ingest|for AI assistants|Citation Guidance/i;
const invitingFiles = llmsFiles.filter((f) =>
  INVITES_INGESTION.test(readFileSync(join(PUBLIC_DIR, f), "utf8")),
);

if (invitingFiles.length) {
  const blockedTrainers = [...decisions]
    .filter(([token, allowed]) => !allowed && AGENTS[token]?.purpose === "ai-training")
    .map(([token]) => token);

  if (blockedTrainers.length) {
    failures.push(
      `${invitingFiles.join(", ")} invite AI assistants to ingest this site, but ` +
        `robots.txt blocks ${blockedTrainers.join(", ")}. Either allow them or ` +
        "remove the invitation — the two files must tell one story.",
    );
  }
}

// --- 6. sitemap line ------------------------------------------------------
const sitemap = robotsTxt.match(/^\s*Sitemap:\s*(\S+)/im);
if (!sitemap) {
  failures.push("no Sitemap: line in robots.txt");
} else if (!sitemap[1].includes(CANONICAL_HOST)) {
  failures.push(
    `Sitemap points at ${sitemap[1]} — must use the canonical host ${CANONICAL_HOST} (the apex redirects)`,
  );
}

// --- report ---------------------------------------------------------------
const aiTokens = [...decisions].filter(([t]) => AGENTS[t]?.purpose.startsWith("ai-"));
for (const [vendor, entries] of [...byVendor].sort()) {
  const verdict = entries.every((e) => e.allowed)
    ? "allow"
    : entries.every((e) => !e.allowed)
      ? "block"
      : "MIXED";
  console.log(`  ${vendor.padEnd(18)} ${verdict.padEnd(6)} ${entries.map((e) => e.token).join(", ")}`);
}

if (failures.length) {
  console.error('\ncheck-bot-policy FAILED — "Inconsistent AI training bot policy" would regress:\n');
  for (const f of failures) console.error(`  ✗ ${f}`);
  console.error("\nPolicy and rationale live in src/lib/bot-policy.ts; robots.ts renders it.\n");
  process.exit(1);
}

console.log(
  `\ncheck-bot-policy: ${decisions.size} agents, ${aiTokens.length} AI-purpose, ${byVendor.size} vendors consistent`,
);
