import { SITE_ORIGIN } from "@/lib/bot-policy";
import { AI_LAST_VERIFIED } from "@/lib/content/ai-instructions";
import { AI_DISCOVERY_PATHS as P, AI_SUMMARY, abs } from "@/lib/content/ai-discovery";

// Agent card at /.well-known/agent-card.json (A2A AgentCard shape), so agents
// probing .well-known find a manifest instead of a 404.
//
// This site runs no live agent and no MCP server. The card says so, and every
// capability is false. The "skills" are the read-only documents the site
// already publishes, each with its URL, so an agent can fetch them directly.
// All values come from ai-discovery.ts, the same source as ai.txt and
// summary.json, so this card can't claim anything those files don't.
export const dynamic = "force-static";

export function GET() {
  return Response.json({
    protocolVersion: "0.3.0",
    name: `${AI_SUMMARY.name} (whitneystevenson.com)`,
    description: `${AI_SUMMARY.summary} This is a static site: there is no live agent or MCP endpoint to call. Read the documents listed under skills instead.`,
    url: `${SITE_ORIGIN}/`,
    documentationUrl: abs(P.instructions),
    version: AI_LAST_VERIFIED,
    provider: {
      organization: AI_SUMMARY.name,
      url: `${SITE_ORIGIN}/`,
    },
    capabilities: {
      streaming: false,
      pushNotifications: false,
      stateTransitionHistory: false,
    },
    defaultInputModes: ["text/plain"],
    defaultOutputModes: ["application/json", "text/plain", "text/markdown"],
    skills: [
      {
        id: "profile-summary",
        name: "Profile summary",
        description: `Who Whitney is, what she's done, and what roles she's open to. Fetch ${abs(P.summary)}.`,
        tags: ["profile", "b2b-events", "read-only"],
        outputModes: ["application/json"],
      },
      {
        id: "faq",
        name: "FAQ",
        description: `Answers to common questions about Whitney's experience and availability. Fetch ${abs(P.faq)}.`,
        tags: ["faq", "read-only"],
        outputModes: ["application/json"],
      },
      {
        id: "full-text",
        name: "Full site text",
        description: `The site's content as plain text for AI assistants. Fetch ${abs(P.llms)} for the index or ${abs(P.llmsFull)} for everything.`,
        tags: ["llms-txt", "read-only"],
        outputModes: ["text/plain", "text/markdown"],
      },
      {
        id: "crawl-policy",
        name: "Crawl and citation policy",
        description: `Crawling, citation, and training are all allowed. Fetch ${abs(P.aiTxt)} for the policy and attribution rules.`,
        tags: ["policy", "read-only"],
        outputModes: ["text/plain"],
      },
    ],
    contact: {
      email: AI_SUMMARY.contact.email,
      page: AI_SUMMARY.contact.page,
    },
  });
}
