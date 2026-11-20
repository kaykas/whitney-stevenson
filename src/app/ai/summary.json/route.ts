import { SITE_ORIGIN } from "@/lib/bot-policy";
import { posts } from "@/lib/posts";
import { AI_LAST_VERIFIED } from "@/lib/content/ai-instructions";
import { AI_DISCOVERY_PATHS as P, AI_SUMMARY, abs } from "@/lib/content/ai-discovery";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    "@context": "https://schema.org",
    "@type": "Person",
    url: `${SITE_ORIGIN}/`,
    name: AI_SUMMARY.name,
    jobTitle: AI_SUMMARY.headline,
    description: AI_SUMMARY.summary,
    homeLocation: AI_SUMMARY.location,
    availability: AI_SUMMARY.availability,
    highlights: AI_SUMMARY.highlights,
    email: AI_SUMMARY.contact.email,
    sameAs: [AI_SUMMARY.contact.linkedin],
    contactPage: AI_SUMMARY.contact.page,
    citation: AI_SUMMARY.citation,
    fieldNotes: posts.map((p) => ({
      title: p.title,
      url: abs(`/blog/${p.slug}`),
    })),
    discovery: {
      aiTxt: abs(P.aiTxt),
      faq: abs(P.faq),
      llms: abs(P.llms),
      llmsFull: abs(P.llmsFull),
      instructions: abs(P.instructions),
    },
    dateModified: AI_LAST_VERIFIED,
  });
}
