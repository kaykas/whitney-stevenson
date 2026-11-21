import { BOT_POLICY, SITE_ORIGIN } from "@/lib/bot-policy";
import { AI_DISCOVERY_PATHS as P, AI_SUMMARY, abs } from "@/lib/content/ai-discovery";

// Static at build time. Bot names come from BOT_POLICY, the same source that
// renders robots.txt, so this file can't claim a policy robots.txt doesn't have.
export const dynamic = "force-static";

export function GET() {
  const allowed = BOT_POLICY.filter((b) => b.allow).map((b) => b.token);
  const blocked = BOT_POLICY.filter((b) => !b.allow).map((b) => b.token);

  const body = [
    `# ai.txt for ${SITE_ORIGIN.replace("https://", "")}`,
    `# ${AI_SUMMARY.name}: ${AI_SUMMARY.headline}`,
    "",
    "# Policy: open. Crawling, citation, and training are all allowed.",
    "# This matches robots.txt exactly; there is no separate, stricter policy.",
    "User-Agent: *",
    "Allow: /",
    "",
    `# Agents named in robots.txt and allowed: ${allowed.join(", ")}`,
    ...(blocked.length ? [`# Agents named in robots.txt and blocked: ${blocked.join(", ")}`] : []),
    "",
    "# Discovery",
    `Summary: ${abs(P.summary)}`,
    `Agent-Card: ${abs(P.agentCard)}`,
    `FAQ: ${abs(P.faq)}`,
    `LLMs: ${abs(P.llms)}`,
    `LLMs-Full: ${abs(P.llmsFull)}`,
    `Instructions: ${abs(P.instructions)}`,
    `Sitemap: ${abs("/sitemap.xml")}`,
    `Robots: ${abs("/robots.txt")}`,
    "",
    "# Attribution",
    `Cite: ${AI_SUMMARY.citation.preferredUrl}`,
    `# ${AI_SUMMARY.citation.attribution}`,
    `Contact: mailto:${AI_SUMMARY.contact.email}`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
