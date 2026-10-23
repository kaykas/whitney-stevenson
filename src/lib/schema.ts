// Shared Article-family JSON-LD. Static data from src/lib/posts.ts and
// src/lib/content/, no user input.
//
// One helper so every long-form page (each Field Note, the Field Notes index,
// /ai-instructions) ships the same complete Article shape: headline, author,
// publisher, dates, image, and mainEntityOfPage. Ahrefs flagged "Article page
// missing Article schema" on pages that had none. Guarded by
// scripts/check-article-schema.mjs. See ERRORS.md (2026-10-22).
const ORIGIN = "https://www.whitneystevenson.com";
const DEFAULT_IMAGE = "/photos/whitney-hero.jpeg";

const AUTHOR = {
  "@type": "Person",
  name: "Whitney Stevenson",
  url: ORIGIN,
  sameAs: [ORIGIN, "https://www.linkedin.com/in/whitneystevenson"],
};

const PUBLISHER = {
  "@type": "Person",
  name: "Whitney Stevenson",
  url: ORIGIN,
};

export type ArticleInput = {
  type?: "Article" | "BlogPosting";
  headline: string;
  description: string;
  /** Site-relative path, e.g. "/blog/the-target-run". */
  path: string;
  datePublished: string;
  dateModified?: string;
  /** Site-relative image path. Falls back to the site portrait. */
  image?: string;
  keywords?: string[];
};

export function articleSchema(a: ArticleInput) {
  const url = `${ORIGIN}${a.path}`;
  return {
    "@type": a.type ?? "Article",
    headline: a.headline,
    description: a.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: a.datePublished,
    dateModified: a.dateModified ?? a.datePublished,
    image: `${ORIGIN}${a.image ?? DEFAULT_IMAGE}`,
    author: AUTHOR,
    publisher: PUBLISHER,
    inLanguage: "en-US",
    ...(a.keywords?.length ? { keywords: a.keywords.join(", ") } : {}),
  };
}

export function withContext<T extends object>(schema: T) {
  return { "@context": "https://schema.org", ...schema };
}
