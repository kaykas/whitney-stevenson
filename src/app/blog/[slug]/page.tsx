import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { posts, getPost } from "@/lib/posts";
import BreadcrumbJsonLd, { HOME_CRUMB, FIELD_NOTES_CRUMB } from "@/components/BreadcrumbJsonLd";
import { illumioLatamPost } from "./posts/illumio-latam-channel-partnership";
import { targetRunPost } from "./posts/the-target-run";
import { arxanRsaPost } from "./posts/anchoring-arxan-three-years-rsa";
import { presidioGolfPost } from "./posts/presidio-golf-300-tournaments";
import { tostitosSuperBowlPost } from "./posts/pepsico-tostitos-super-bowl-2026";
import { latinBillboardAwardsPost } from "./posts/latin-billboard-awards-artist-relations";
import { nyeEightYearsPost } from "./posts/eight-years-sf-nye-party";
import { sunglassesBodyworkPost } from "./posts/sunglasses-shops-and-bodywork";
import { freelanceToInHousePost } from "./posts/freelance-to-in-house";
import { eventConciergePost } from "./posts/event-concierge-b2b-hospitality";
import { firstWalkthroughPost } from "./posts/first-venue-walkthrough";
import { interviewQuestionsPost } from "./posts/event-marketing-interview-questions";
import { clientGolfOutingPost } from "./posts/b2b-client-golf-outing";
import { boothStaffTrainingPost } from "./posts/trade-show-booth-staff-training";

const POST_BODIES: Record<string, () => React.ReactNode> = {
  "trade-show-booth-staff-training": boothStaffTrainingPost,
  "b2b-client-golf-outing": clientGolfOutingPost,
  "event-marketing-interview-questions": interviewQuestionsPost,
  "first-venue-walkthrough": firstWalkthroughPost,
  "event-concierge-b2b-hospitality": eventConciergePost,
  "freelance-to-in-house": freelanceToInHousePost,
  "sunglasses-shops-and-bodywork": sunglassesBodyworkPost,
  "eight-years-sf-nye-party": nyeEightYearsPost,
  "latin-billboard-awards-artist-relations": latinBillboardAwardsPost,
  "illumio-latam-channel-partnership": illumioLatamPost,
  "the-target-run": targetRunPost,
  "anchoring-arxan-three-years-rsa": arxanRsaPost,
  "presidio-golf-300-tournaments": presidioGolfPost,
  "pepsico-tostitos-super-bowl-2026": tostitosSuperBowlPost,
};

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    // metaTitle, not title: the visible <h1> is design copy and runs long,
    // while the <title> has a ~60-char SERP budget that the layout template's
    // " | Whitney Stevenson" suffix eats 20 of. See ERRORS.md (2026-09-12).
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      url: `https://www.whitneystevenson.com/blog/${post.slug}`,
      publishedTime: post.date,
      // Always emit og:image — posts without a hero photo fall back to the
      // site default, otherwise Ahrefs flags the URL as
      // "Open Graph tags incomplete".
      images: [
        { url: post.hero ?? "/photos/whitney-hero.jpeg", width: 800, height: 800 },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  const Body = POST_BODIES[slug];
  if (!post || !Body) return notFound();

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
          <article className="post-article">
            <Link href="/blog" className="sans-label" style={{ display: "inline-block", marginBottom: 30 }}>
              ← All Field Notes
            </Link>
            <div className="sans-label" style={{ marginBottom: 12, opacity: 0.7 }}>
              {post.date} · {post.readingMinutes} min read
            </div>
            <h1 className="serif-large" style={{ marginBottom: 30 }}>{post.title}</h1>
            <p className="sans-body post-lede" style={{ marginBottom: 40 }}>
              {post.description}
            </p>
            {post.hero && (
              <div
                className="post-hero"
                style={{ backgroundImage: `url('${post.hero}')` }}
                aria-hidden="true"
              />
            )}
            <div className="post-body">
              <Body />
            </div>
            {post.faqs && post.faqs.length > 0 && (
              <section className="post-body post-faq" aria-labelledby="post-faq-heading">
                <h2 id="post-faq-heading">Frequently Asked Questions</h2>
                {post.faqs.map((faq) => (
                  <div key={faq.question} className="post-faq-item">
                    <h3>{faq.question}</h3>
                    <p>{faq.answer}</p>
                  </div>
                ))}
              </section>
            )}
            <div className="post-footer">
              <div className="post-author">
                <div
                  className="post-author-img"
                  style={{ backgroundImage: "url('/photos/whitney-hero.jpeg')" }}
                  aria-hidden="true"
                />
                <div>
                  <div className="sans-label" style={{ marginBottom: 6 }}>
                    Whitney Stevenson
                  </div>
                  <p className="sans-body" style={{ fontSize: 14, marginBottom: 8 }}>
                    Event &amp; hospitality leader, San Francisco. 10+ years building
                    B2B events for technology and entertainment — Plan Experiential,
                    Illumio LATAM, RSA, Super Bowl, Latin Billboard Awards, Presidio
                    Golf.
                  </p>
                  <p className="sans-body" style={{ fontSize: 14 }}>
                    Available for full-time roles. <Link href="/#contact">Get in touch</Link>{" "}
                    or read more <Link href="/blog">Field Notes</Link>.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </main>
      </div>
      <BreadcrumbJsonLd
        items={[HOME_CRUMB, FIELD_NOTES_CRUMB, { name: post.title, path: `/blog/${post.slug}` }]}
      />
      {/* FAQPage JSON-LD renders from the same post.faqs array as the visible
          section above, so the markup can't describe Q&As a reader can't see.
          Enforced by scripts/check-faq.mjs. */}
      {post.faqs && post.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              url: `https://www.whitneystevenson.com/blog/${post.slug}`,
              mainEntity: post.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
              })),
            }),
          }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.metaDescription,
            datePublished: post.date,
            author: {
              "@type": "Person",
              name: "Whitney Stevenson",
              url: "https://www.whitneystevenson.com",
              sameAs: [
                "https://www.whitneystevenson.com",
                "https://www.linkedin.com/in/whitneystevenson"
              ]
            },
            dateModified: post.date,
            keywords: post.keywords.join(", "),
            url: `https://www.whitneystevenson.com/blog/${post.slug}`,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://www.whitneystevenson.com/blog/${post.slug}`
            },
            image: post.hero
              ? `https://www.whitneystevenson.com${post.hero}`
              : undefined,
          }),
        }}
      />
    </>
  );
}
