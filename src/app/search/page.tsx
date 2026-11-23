import Link from "next/link";
import type { Metadata } from "next";
import { posts, type Post } from "@/lib/posts";
import { SEARCH_PARAM, SEARCH_PATH } from "@/lib/schema";

// Target of the WebSite SearchAction in src/lib/schema.ts (SEOmator
// schema-website-search, ERRORS.md 2026-11-22). Plain GET form, server-side
// match over the Field Notes in src/lib/posts.ts, no client JS and no
// third-party search. Results pages are noindex and stay out of the sitemap.
export const metadata: Metadata = {
  title: "Search Field Notes",
  description: "Search Whitney Stevenson's Field Notes on B2B events, booths, hospitality, and partner programs.",
  alternates: { canonical: SEARCH_PATH },
  robots: { index: false, follow: true },
  openGraph: { url: `https://www.whitneystevenson.com${SEARCH_PATH}` },
};

function matches(post: Post, terms: string[]): boolean {
  const haystack = [post.title, post.description, ...post.keywords].join(" ").toLowerCase();
  return terms.every((t) => haystack.includes(t));
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const raw = (await searchParams)[SEARCH_PARAM];
  const query = (Array.isArray(raw) ? raw[0] : raw ?? "").trim().slice(0, 100);
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const results = terms.length ? posts.filter((p) => matches(p, terms)) : [];

  return (
    <>
      <div className="ambient-gradient" />
      <div className="page-wrapper">
        <nav className="side-nav">
          <div className="sans-label side-text">Whitney Stevenson</div>
          <div
            className="sans-label"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Search
          </div>
        </nav>
        <main className="main-content">
          <section className="hero-section">
            <div className="hero-text-container" style={{ gridColumn: "1 / -1" }}>
              <Link href="/blog" className="sans-label" style={{ marginBottom: 20, display: "inline-block" }}>
                ← All Field Notes
              </Link>
              <h1 className="serif-huge">Search Field Notes</h1>
              <form action={SEARCH_PATH} method="get" role="search" style={{ marginTop: 30, maxWidth: 560 }}>
                <label htmlFor="search-q" className="sans-label" style={{ display: "block", marginBottom: 10 }}>
                  What are you looking for?
                </label>
                <input
                  id="search-q"
                  name={SEARCH_PARAM}
                  type="search"
                  defaultValue={query}
                  placeholder="booth staffing, hospitality, LATAM…"
                  className="sans-body"
                  style={{ width: "100%", padding: "12px 14px", border: "1px solid currentColor", background: "transparent" }}
                />
              </form>
              {terms.length > 0 && (
                <p className="sans-body" style={{ marginTop: 20 }}>
                  {results.length === 0
                    ? `Nothing yet for "${query}". Try a broader word, or browse all the Field Notes.`
                    : `${results.length} Field Note${results.length === 1 ? "" : "s"} for "${query}"`}
                </p>
              )}
            </div>
          </section>

          {results.length > 0 && (
            <section className="stories-section">
              {results.map((p) => (
                <article className="story-card" key={p.slug}>
                  <span className="story-number">→</span>
                  <div className="sans-label" style={{ marginBottom: 6, opacity: 0.7 }}>
                    {p.date} · {p.readingMinutes} min read
                  </div>
                  <h2 className="serif-medium">
                    <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                  </h2>
                  <p className="sans-body">{p.description}</p>
                </article>
              ))}
            </section>
          )}
        </main>
      </div>
    </>
  );
}
