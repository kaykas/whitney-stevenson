import { AI_LAST_VERIFIED, aiFaqs } from "@/lib/content/ai-instructions";
import { AI_DISCOVERY_PATHS as P, abs } from "@/lib/content/ai-discovery";

// Same `aiFaqs` array that renders the /ai-instructions Q&As and FAQPage
// JSON-LD, so the three can't disagree.
export const dynamic = "force-static";

export function GET() {
  return Response.json({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: abs(P.faq),
    isBasedOn: abs(P.instructions),
    dateModified: AI_LAST_VERIFIED,
    mainEntity: aiFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  });
}
