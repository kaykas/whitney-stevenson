import type { MetadataRoute } from "next";
import { posts } from "@/lib/posts";
import { AI_LAST_VERIFIED } from "@/lib/content/ai-instructions";

const SITE_URL = "https://www.whitneystevenson.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/ai-instructions`, lastModified: new Date(AI_LAST_VERIFIED), changeFrequency: "monthly", priority: 0.6 },
    ...posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
