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
  // Mirrors the visible author block under every post.
  jobTitle: "Event & hospitality leader",
  description:
    "Event & hospitality leader, San Francisco. 10+ years building B2B events for technology and entertainment.",
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
  const imgUrl = `${ORIGIN}${a.image ?? DEFAULT_IMAGE}`;
  return {
    "@type": a.type ?? "Article",
    "@id": `${url}#article`,
    headline: a.headline,
    description: a.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url, name: a.headline },
    datePublished: a.datePublished,
    dateModified: a.dateModified ?? a.datePublished,
    image: {
      "@type": "ImageObject",
      url: imgUrl,
      contentUrl: imgUrl,
      width: 800,
      height: 800,
      caption: a.headline,
      creditText: "Whitney Stevenson",
      creator: {
        "@type": "Person",
        name: "Whitney Stevenson",
      },
      copyrightNotice: "© 2026 Whitney Stevenson",
      license: "https://www.whitneystevenson.com/#about",
      acquireLicensePage: "https://www.whitneystevenson.com/#contact",
    },
    author: AUTHOR,
    publisher: PUBLISHER,
    inLanguage: "en-US",
    ...(a.keywords?.length ? { keywords: a.keywords.join(", ") } : {}),
  };
}

// Per-route WebPage node carrying the speakable selectors. It used to be one
// hardcoded block in layout.tsx with no `name` and `url: "/"`, so every route
// claimed to be the homepage and SEOmator failed schema-required-fields
// ("WebPage: missing name") on all of them. Each route now renders its own.
// Guarded by scripts/check-webpage-schema.mjs. See ERRORS.md (2026-11-21).
export type WebPageInput = {
  /** Visible page name, usually the page title or the post's <h1>. */
  name: string;
  /** Site-relative path; "/" for the homepage. */
  path: string;
  description?: string;
  /** Route also renders <BreadcrumbJsonLd>; links to its `#breadcrumb` id. */
  breadcrumb?: boolean;
  /** `@id` of the node the page is about (article, blog, or the Person). */
  mainEntityId?: string;
};

/** Sitewide Person id, owned by the Person block in src/components/JsonLd.tsx. */
export const PERSON_ID = `${ORIGIN}/#person`;

export function webPageSchema(p: WebPageInput) {
  const url = p.path === "/" ? `${ORIGIN}/` : `${ORIGIN}${p.path}`;
  return {
    "@type": "WebPage",
    "@id": url,
    url,
    name: p.name,
    ...(p.description ? { description: p.description } : {}),
    ...(p.breadcrumb ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
    ...(p.mainEntityId ? { mainEntity: { "@id": p.mainEntityId } } : {}),
    inLanguage: "en-US",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", ".speakable", "[data-speakable]"],
    },
  };
}

export function withContext<T extends object>(schema: T) {
  return { "@context": "https://schema.org", ...schema };
}

// Sitewide WebSite node with a SearchAction. SEOmator schema-website-search
// flagged the site for having no WebSite schema, so answer engines and Google
// had no declared site name or on-site search entry point. The urlTemplate
// points at the real /search route (src/app/search/page.tsx), which filters
// the Field Notes. Rendered once, on the homepage. Guarded by
// scripts/check-website-schema.mjs. See ERRORS.md (2026-11-22).
export const WEBSITE_ID = `${ORIGIN}/#website`;
export const SEARCH_PATH = "/search";
export const SEARCH_PARAM = "q";

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${ORIGIN}/`,
    name: "Whitney Stevenson",
    description:
      "Whitney Stevenson, B2B event marketer in San Francisco: stories, Field Notes, and how to reach her.",
    inLanguage: "en-US",
    publisher: { "@id": PERSON_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${ORIGIN}${SEARCH_PATH}?${SEARCH_PARAM}={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}
