import Link from "next/link";
import type { Metadata } from "next";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Field Notes",
  description:
    "Stories from the room — case studies, signature moments, and operational philosophy from 10+ years of B2B event marketing in San Francisco.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  return (
    <>
      <div className="ambient-gradient" />
      <div className="page-wrapper">
        <nav className="side-nav">
          <div className="sans-label side-text">Whitney Stevenson</div>
          <div className="side-icons">
            <span>IN</span>
            <span>TW</span>
          </div>
          <div
            className="sans-label"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Field Notes
          </div>
        </nav>
        <main className="main-content">
          <section className="hero-section">
            <div className="hero-text-container" style={{ gridColumn: "1 / -1" }}>
              <Link href="/" className="sans-label" style={{ marginBottom: 20, display: "inline-block" }}>
                ← Back to home
              </Link>
              <div className="sans-label" style={{ marginBottom: 20 }}>
                Field Notes
              </div>
              <h1 className="serif-huge">Stories<br />from the Room</h1>
              <p className="sans-body" style={{ marginTop: 30, maxWidth: 560 }}>
                Case studies, signature moments, and operational philosophy from
                a decade of running B2B events for technology companies and
                entertainment brands. Explore blog posts and articles that share
                insights from my life and experience as a writer publishing
                content for this niche.
              </p>
            </div>
          </section>

          <section className="stories-section">
            {posts.map((p) => (
              <article className="story-card" key={p.slug}>
                <span className="story-number">→</span>
                {p.hero && (
                  <div
                    className="story-image"
                    style={{ backgroundImage: `url('${p.hero}')` }}
                    aria-hidden="true"
                  />
                )}
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
        </main>
      </div>
    </>
  );
}
