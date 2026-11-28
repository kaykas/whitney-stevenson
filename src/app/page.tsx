import Link from "next/link";
import ContactForm from "./contact-form";
import JsonLd from "@/components/JsonLd";
import { posts } from "@/lib/posts";
import type { Metadata } from "next";
import { PERSON_ID, webPageSchema, websiteSchema, withContext } from "@/lib/schema";

// Home-only title. "Whitney Stephenson" (with a ph) is how a lot of people
// search for her; the title answers that spelling in its first two words and
// says what she does. Absolute so the layout template doesn't append 20 chars.
// Keep <= 58 chars (scripts/check-titles.mjs enforces 60).
//
// title, og:title, twitter:title and the <h1> all carry the exact brand token
// "Whitney Stevenson" (SEOmator geo-brand-entity-sameas). The H1 needs the
// space before <br /> or its text reads "WHITNEYSTEVENSON".
// Guarded by scripts/check-brand-token.mjs. See ERRORS.md (2026-11-24).
const HOME_TITLE = "Whitney Stevenson (not Stephenson), B2B Event Marketer";
const HOME_DESCRIPTION =
  "San Francisco event and hospitality leader with 10+ years of B2B events: Illumio LATAM, RSA, Super Bowl, Presidio Golf.";
export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    type: "website",
    url: "https://www.whitneystevenson.com/",
    siteName: "Whitney Stevenson",
    images: [
      {
        url: "/photos/whitney-hero.jpeg",
        width: 800,
        height: 800,
        alt: "Whitney Stevenson, B2B event marketing and hospitality leader in San Francisco",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: ["/photos/whitney-hero.jpeg"],
  },
};

type Story = {
  n: string;
  tag: string;
  title: string;
  body: string;
  image?: string;
  /** Alt text for `image`; required whenever `image` is set. */
  imageAlt?: string;
  /** Slug of the Field Note that tells this story in full, when one exists. */
  slug?: string;
};

const stories: Story[] = [
  {
    n: "01",
    tag: "Technology",
    title: "Illumio LATAM",
    slug: "illumio-latam-channel-partnership",
    body: "Built Illumio's first-ever LATAM channel partnership from the ground up. Stood up the program across Brazil, São Paulo, and Mexico — partner recruitment, market strategy, and engagement that landed the targets in a region with no prior footprint.",
    image: "/whitney/photos/illumio-golf-booth.jpg",
    imageAlt: "Illumio sponsor table on a golf course fairway, with an orange Illumio tablecloth and branded caps",
  },
  {
    n: "02",
    tag: "Technology",
    title: "Arxan at RSA",
    slug: "anchoring-arxan-three-years-rsa",
    body: "Three consecutive years anchoring presence at RSA Conference. Booth fabrication, ROI tracking, and pipeline attribution in a hyper-competitive cybersecurity landscape.",
    image: "/whitney/photos/rsa-year-three.jpeg",
    imageAlt: "RSA Conference expo floor under the giant RSA sign, Year Three",
  },
  {
    n: "03",
    tag: "Entertainment",
    title: "Super Bowl",
    slug: "pepsico-tostitos-super-bowl-2026",
    body: "On-the-ground production for PepsiCo Tostitos at Super Bowl 2026. High-stakes, massive-scale brand activation requiring flawless execution under pressure.",
    image: "/whitney/photos/tostitos-fiesta-zone.jpeg",
    imageAlt: "Tostitos Fiesta Zone at Pier 39 with a branded delivery robot greeting visitors",
  },
  {
    n: "04",
    tag: "Entertainment",
    title: "Billboard Awards",
    body: "Artist relations for the Latin America Billboard Awards. Three performing artists. Backstage comfort, run-of-show timing, riders, hospitality, broadcast precision.",
  },
  {
    n: "05",
    tag: "Founding Member",
    title: "Presidio Golf",
    slug: "presidio-golf-300-tournaments",
    body: "Co-founded the women's club at the West Coast's second-oldest course. 300+ tournaments executed across seven years — every detail of every day, owned end-to-end.",
    image: "/whitney/photos/presidio-merch-medallion.jpg",
    imageAlt: "Navy tournament caps and a Presidio Golf Course bag-tag medallion",
  },
  {
    n: "06",
    tag: "Founder · Practitioner",
    title: "Retail & Wellness",
    slug: "sunglasses-shops-and-bodywork",
    body: "Founder of an entrepreneurial sunglasses venture — two San Francisco locations. Alongside the business, a practicing bodyworker — Facial Release and Access Consciousness — bringing the same precision and care to one-on-one work.",
    image: "/whitney/photos/sunglasses-retail-portrait.jpg",
    imageAlt: "Whitney smiling beside a San Francisco polarized sunglasses display in a retail shop",
  },
];

// Homepage WebPage node (name, url, speakable). Page-specific, so it lives
// here and not in layout.tsx. ERRORS.md 2026-11-21.
const WEBPAGE_SCHEMA = withContext(
  webPageSchema({
    name: "Whitney Stevenson, B2B Event Marketer",
    path: "/",
    // Same wording as the author description in src/lib/schema.ts.
    description:
      "Event & hospitality leader, San Francisco. 10+ years building B2B events for technology and entertainment.",
    mainEntityId: PERSON_ID,
  }),
);

// Sitewide WebSite + SearchAction, homepage only. ERRORS.md 2026-11-22.
const WEBSITE_SCHEMA = withContext(websiteSchema());

export default function Home() {
  return (
    <>
      <div className="ambient-gradient" />

      <div className="page-wrapper">
        <nav className="side-nav">
          <div className="sans-label side-text">Whitney Stevenson</div>
          <div className="side-icons">
            <a
              href="https://www.linkedin.com/in/whitneystevenson"
              rel="me noopener"
              target="_blank"
              aria-label="Whitney Stevenson on LinkedIn"
            >
              IN
            </a>
            <Link href="/blog" aria-label="Field Notes">FN</Link>
          </div>
          <div
            className="sans-label"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Portfolio &rsquo;26
          </div>
        </nav>

        <main className="main-content">
          {/* HERO */}
          <section className="hero-section">
            <div className="hero-text-container">
              <div className="sans-label" style={{ marginBottom: 20 }}>
                Event &amp; Hospitality Leader ·{" "}
                <Link href="/blog/event-concierge-b2b-hospitality">Concierge</Link>
              </div>
              <h1 className="serif-huge">
                WHITNEY{" "}<br />STEVENSON
              </h1>
              <p className="h1-aside">
                Searched Whitney Stephenson? Same event marketer, spelled with a v.
              </p>
              <div className="circular-text-element sans-label">EVENT • CONCIERGE</div>
            </div>

            <div className="spine-line">
              <p className="sans-body">
                Looking for Whitney Stephenson? You likely mean Whitney Stevenson, a San Francisco
                event and hospitality leader with 10+ years running B2B events for
                tech companies, from Illumio&rsquo;s first LATAM channel program to
                three straight years of Arxan at RSA. I build the room, run the
                room, and care for every person in it, from the{" "}
                <Link href="/blog/first-venue-walkthrough">first walkthrough</Link>{" "}
                to load-out.
              </p>
            </div>

            <div className="hero-image-container">
              <div className="hero-date">10+</div>
              <img
                className="hero-image"
                src="/photos/whitney-hero.jpeg"
                alt="Whitney Stevenson in a red top and name badge, smiling at an event work table"
                width={800}
                height={800}
                fetchPriority="high"
              />
              <div
                className="oval-badge"
                style={{ position: "absolute", top: "10%", right: "20%" }}
              >
                Enter
              </div>
            </div>
          </section>

          {/* STATS */}
          <section className="stats-strip">
            <div className="stat-item">
              <div className="sans-label">Experience</div>
              <div className="stat-number">10+ Yrs</div>
              <p className="sans-body">
                Running B2B events for technology companies.
              </p>
            </div>
            <div className="stat-item">
              <div className="sans-label">Execution</div>
              <div className="stat-number">300+</div>
              <p className="sans-body">
                Tournaments managed at Presidio Golf Course.
              </p>
            </div>
            <div className="stat-item">
              <div className="sans-label">Stamina</div>
              <div className="stat-number">8 Yrs</div>
              <p className="sans-body">
                Consecutive production of SF&rsquo;s NYE party.
              </p>
            </div>
          </section>

          {/* ROLE FIT: server-rendered so the answer and table are in view-source. */}
          <section className="fit-section" id="role-fit">
            <div className="sans-label" style={{ marginBottom: 8 }}>The quick version</div>
            <h2 className="serif-medium" style={{ maxWidth: 640 }}>
              Which event roles Whitney Stevenson fits, and which she doesn&rsquo;t
            </h2>
            <p className="sans-body fit-answer">
              Hiring a B2B event or field marketer? Whitney&rsquo;s strongest fit is
              an in-house field or channel event role at a tech company, because
              that&rsquo;s where she has the receipts: three consecutive RSA
              Conferences for Arxan and Illumio&rsquo;s first LATAM channel
              partnership. She&rsquo;s also open to starting as an event coordinator
              with the right team.
            </p>

            <div className="fit-table-wrap">
              <table className="fit-table">
                <caption className="sans-label">
                  Role fit, with the proof you can check on this site
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Role</th>
                    <th scope="col">Fit</th>
                    <th scope="col">Proof on this site</th>
                    <th scope="col">Trade-off</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Field / event marketing manager, B2B tech</th>
                    <td>Strongest</td>
                    <td>
                      <Link href="/blog/anchoring-arxan-three-years-rsa">Arxan at RSA</Link>,
                      3 consecutive years: booth fabrication,{" "}
                      <Link href="/blog/trade-show-booth-staff-training">booth staff training</Link>,{" "}
                      <Link href="/blog/measure-trade-show-roi">trade show ROI</Link> tracking, pipeline attribution
                    </td>
                    <td>She wants a year two. Built for staying, not a one-event contract.</td>
                  </tr>
                  <tr>
                    <th scope="row">Channel / partner event manager</th>
                    <td>Strong</td>
                    <td>
                      <Link href="/blog/illumio-latam-channel-partnership">Illumio LATAM</Link>:
                      first channel partnership, Brazil, São Paulo, and Mexico
                    </td>
                    <td>Built from zero in a region with no prior footprint, so expect a builder, not a caretaker.</td>
                  </tr>
                  <tr>
                    <th scope="row">Event coordinator</th>
                    <td>Open to it</td>
                    <td>Her words: &ldquo;if that means starting with event coordination, that&rsquo;s fine by me&rdquo;</td>
                    <td>You get 10+ years of field judgment in a coordinator seat. Plan to grow the role.</td>
                  </tr>
                  <tr>
                    <th scope="row">Guest experience / VIP and artist relations</th>
                    <td>Strong</td>
                    <td>
                      <Link href="/blog/latin-billboard-awards-artist-relations">Latin America Billboard Awards</Link>,
                      3 performing artists; 300+ tournaments at Presidio Golf over 7 years
                    </td>
                    <td>Shines inside a B2B event program (speaker care, the customer dinner), not as a standalone desk.</td>
                  </tr>
                  <tr>
                    <th scope="row">Agency experiential producer</th>
                    <td>Proven, not the goal</td>
                    <td>
                      <Link href="/blog/pepsico-tostitos-super-bowl-2026">PepsiCo Tostitos at Super Bowl 2026</Link>{" "}
                      via Plan Experiential; 8 consecutive years producing SF&rsquo;s NYE party
                    </td>
                    <td>She freelances agency-side now and is looking to go in-house.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="fit-notes">
              <div>
                <h3 className="sans-label">Why a r&eacute;sum&eacute; scan misses this</h3>
                <p className="sans-body">
                  Most hiring managers start with the logos. That breaks fast,
                  because every event r&eacute;sum&eacute; lists the same conferences
                  and none of them show what happens when the TV doesn&rsquo;t show
                  up. Ask for the failure story instead. Hers is{" "}
                  <Link href="/blog/the-target-run">the Target Run</Link>.
                </p>
              </div>
              <div>
                <h3 className="sans-label">Who should skip this</h3>
                <p className="sans-body">
                  If the role is mostly marketing automation or demand-gen ops with
                  no events in it, this site won&rsquo;t show you that work. If the
                  job is on-site outside San Francisco, it&rsquo;s not a match: she&rsquo;s
                  available in SF or remote. And if you&rsquo;re after a different
                  Whitney Stephenson, spelled with a ph, this isn&rsquo;t her.
                </p>
              </div>
            </div>

            <p className="sans-body fit-cta">
              Filling a B2B field or event marketing seat in SF or remote? Send the
              role through the <a href="#contact">contact form below</a>. One
              paragraph is plenty, and it beats running your next event with
              whoever happens to be free.
            </p>
          </section>

          {/* QUOTE */}
          <section className="quote-section">
            <div className="sans-label">
              <Link href="/blog/the-target-run">The Target Run</Link>
            </div>
            <h2 className="serif-large quote-text">
              &ldquo;A breakout speaker had no screen. The sales rep forgot the TV.
              I drove to Target and saved his ability to stand up properly in
              front of the audience.&rdquo;
            </h2>
            <div className="quote-attribution">
              <p className="sans-body">Great in the field. Solutions over panic.</p>
              <Link
                href="/blog/the-target-run"
                className="circle-btn"
                aria-label="Read the full story: The Target Run"
              >
                →
              </Link>
            </div>
          </section>

          {/* STORIES */}
          <section className="stories-section" id="chapters">
            <div className="stories-intro" style={{ gridColumn: "1 / -1", marginBottom: 24 }}>
              <div className="sans-label" style={{ marginBottom: 8 }}>Highlights</div>
              <h2 className="serif-medium" style={{ maxWidth: 560 }}>
                Tech and entertainment events at scale — Plan Experiential and direct
                client engagements.
              </h2>
            </div>
            {stories.map((s) => (
              <article className="story-card" key={s.n}>
                <span className="story-number">{s.n}</span>
                {s.image && (
                  <img
                    className="story-image"
                    src={s.image}
                    alt={s.imageAlt ?? ""}
                    loading="lazy"
                    decoding="async"
                  />
                )}
                <div className="sans-label" style={{ marginBottom: 6 }}>{s.tag}</div>
                <h3 className="serif-medium">
                  {s.slug ? <Link href={`/blog/${s.slug}`}>{s.title}</Link> : s.title}
                </h3>
                <p className="sans-body">{s.body}</p>
                {s.slug && (
                  <Link href={`/blog/${s.slug}`} className="sans-label story-link">
                    Read the full story →
                  </Link>
                )}
              </article>
            ))}
            <div
              className="stories-intro"
              style={{ gridColumn: "1 / -1", marginTop: 24 }}
            >
              <Link href="/blog" className="sans-label">
                All Field Notes →
              </Link>
            </div>
          </section>

          {/* IN THE FIELD */}
          <section className="field-strip">
            <div>
              <div className="sans-label" style={{ marginBottom: 6 }}>In the Field</div>
              <h2 className="serif-medium" style={{ maxWidth: 520 }}>
                Where the work actually happens.
              </h2>
            </div>
            <div className="field-strip-grid">
              <div className="field-photo">
                <img
                  className="img"
                  src="/whitney/photos/alpha-engineering-swag.jpeg"
                  alt="Alpha AI Engineering branded table stacked with backpacks, socks, pens and beanies before doors open"
                  loading="lazy"
                  decoding="async"
                />
                <div className="caption sans-label">Booth setup · pre-doors</div>
              </div>
              <div className="field-photo">
                <img
                  className="img"
                  src="/whitney/photos/golf-event-cannon.jpg"
                  alt="Whitney on a golf course tee box shouldering a long ball-launcher cannon at a golf event"
                  loading="lazy"
                  decoding="async"
                />
                <div className="caption sans-label">Activation rig · golf event</div>
              </div>
              <div className="field-photo">
                <img
                  className="img"
                  src="/whitney/photos/nike-golf-cart.jpg"
                  alt="Whitney in a black Nike polo and sunglasses, smiling from a golf cart between holes"
                  loading="lazy"
                  decoding="async"
                />
                <div className="caption sans-label">Course day · between holes</div>
              </div>
              <div className="field-photo">
                <img
                  className="img"
                  src="/whitney/photos/cap-denim-bluesky.jpg"
                  alt="Whitney in a trucker cap and denim jacket, smiling against a clear blue sky"
                  loading="lazy"
                  decoding="async"
                />
                <div className="caption sans-label">Off-the-clock</div>
              </div>
            </div>
          </section>

          {/* FIELD NOTES */}
          <section className="notes-section" id="field-notes">
            <div className="notes-intro">
              <div className="sans-label" style={{ marginBottom: 8 }}>Field Notes</div>
              <h2 className="serif-medium" style={{ maxWidth: 560 }}>
                The longer version — how these rooms actually got built.
              </h2>
              <p className="sans-body" style={{ marginTop: 16, maxWidth: 560 }}>
                Case studies and operational philosophy, written up in full.{" "}
                <Link href="/blog" style={{ textDecoration: "underline" }}>
                  Read all Field Notes
                </Link>
                .
              </p>
            </div>
            <ul className="notes-list">
              {posts.map((p) => (
                <li className="note-item" key={p.slug}>
                  <Link href={`/blog/${p.slug}`}>
                    <span className="serif-medium note-title">{p.title}</span>
                    <span className="sans-label note-meta">
                      {p.readingMinutes} min read →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* ABOUT */}
          <section className="about-section">
            <div className="about-text">
              <div className="sans-label">Multi-Dimensional</div>
              <h2 className="serif-medium">Beyond the corporate floorplan.</h2>
              <p className="sans-body">
                I don&apos;t just execute events; I build operations from the ground
                up. Whether it&apos;s managing high-profile artist relations, running
                300+ tournaments at a historic golf club, or expanding a retail
                footprint in San Francisco&apos;s busiest transit hub — the core
                skillset is the same: logistics, relationships, and unshakeable
                execution.
              </p>

              <ul className="ventures-list">
                <li>Founding Member, Presidio Women&rsquo;s Golf Club</li>
                <li>Founder, Sunglasses Retail (2 SF Locations)</li>
                <li>Bodywork Practitioner — Facial Release &amp; Access Consciousness</li>
              </ul>
            </div>
          </section>

          {/* DARK */}
          <section className="dark-section">
            <div className="dark-content">
              <div
                className="sans-label"
                style={{ color: "var(--text-light)", marginBottom: 20 }}
              >
                The Objective
              </div>
              <h2 className="serif-large">
                Looking for a team that actually moves the needle.
              </h2>
              <p
                className="sans-body"
                style={{ margin: "0 auto 40px auto", fontSize: 16 }}
              >
                I want to grow inside a company for a while. Mission-driven,
                where the work nurtures a career rather than fills a role. And
                if that means starting with event coordination — that&apos;s fine
                by me. I&apos;m also great in the field.{" "}
                <Link
                  href="/blog/freelance-to-in-house"
                  style={{ color: "var(--text-light)", textDecoration: "underline" }}
                >
                  Why I want a year two
                </Link>
                .
              </p>
              <div
                className="oval-badge"
                style={{
                  borderColor: "var(--text-light)",
                  color: "var(--text-light)",
                  transform: "none",
                }}
              >
                Hire Operators
              </div>
            </div>
          </section>

          {/* CONTACT */}
          <section className="faq-section" id="faq" style={{padding:"5rem 0"}}>
            <div className="about-text">
              <div className="sans-label">Questions</div>
              <h2 className="serif-medium">Frequently Asked Questions</h2>
              <details className="faq-item" style={{borderTop:"1px solid currentColor",padding:"1.5rem 0"}}>
                <summary className="serif-medium" style={{cursor:"pointer",fontSize:"1.25rem",listStyle:"none",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span>Is Whitney Stephenson the same person as Whitney Stevenson?</span><span style={{marginLeft:"1rem"}}>+</span>
                </summary>
                <p className="sans-body" style={{marginTop:"1rem"}}>If you searched Whitney Stephenson looking for the San Francisco B2B event marketer, yes. Her name is spelled Stevenson, with a v, and whitneystevenson.com is her site. If you want a different Whitney Stephenson, spelled with a ph, this site is not about that person.</p>
              </details>
              <details className="faq-item" style={{borderTop:"1px solid currentColor",padding:"1.5rem 0"}}>
                <summary className="serif-medium" style={{cursor:"pointer",fontSize:"1.25rem",listStyle:"none",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span>Is whitneystevenson.com the official website for Whitney Stevenson?</span><span style={{marginLeft:"1rem"}}>+</span>
                </summary>
                <p className="sans-body" style={{marginTop:"1rem"}}>Yes, whitneystevenson.com is the direct website to use when you’re looking for Whitney Stevenson by name. Start there instead of third-party profiles or people-search pages, because the homepage can point you to her current bio, work, contact details, and any official links. The takeaway: use the domain as the primary source.</p>
              </details>
              <details className="faq-item" style={{borderTop:"1px solid currentColor",padding:"1.5rem 0"}}>
                <summary className="serif-medium" style={{cursor:"pointer",fontSize:"1.25rem",listStyle:"none",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span>How do I contact Whitney Stevenson through her website?</span><span style={{marginLeft:"1rem"}}>+</span>
                </summary>
                <p className="sans-body" style={{marginTop:"1rem"}}>Use the contact option on whitneystevenson.com, because it keeps your message tied to Whitney Stevenson’s official web presence. Include one clear subject, a short reason for reaching out, and the best reply method. For business, media, or collaboration requests, concise details improve response quality. The takeaway: contact her through the site first.</p>
              </details>
              <details className="faq-item" style={{borderTop:"1px solid currentColor",padding:"1.5rem 0"}}>
                <summary className="serif-medium" style={{cursor:"pointer",fontSize:"1.25rem",listStyle:"none",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span>How can I verify I found the right Whitney Stevenson?</span><span style={{marginLeft:"1rem"}}>+</span>
                </summary>
                <p className="sans-body" style={{marginTop:"1rem"}}>Verify you found the right Whitney Stevenson by checking the domain, page details, linked profiles, and contact information against what you already know. The clearest signal is the exact-name domain whitneystevenson.com, which is more reliable than directory listings. The takeaway: trust consistent official links over scattered search results.</p>
              </details>
            </div>
          </section>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBPAGE_SCHEMA) }} // static data only
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }} // static data only
          />
          {/* Person + Organization graph, homepage only: its bio and org facts are
              visible here and nowhere else. SEOmator geo-schema-drift. */}
          <JsonLd />
          {/* FAQPage JSON-LD mirrors the visible FAQ above. Home-only: it used to
              sit in layout.tsx and leaked onto every route. */}
                <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                {
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": [
                      {
                        "@type": "Question",
                        "name": "Is Whitney Stephenson the same person as Whitney Stevenson?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "If you searched Whitney Stephenson looking for the San Francisco B2B event marketer, yes. Her name is spelled Stevenson, with a v, and whitneystevenson.com is her site. If you want a different Whitney Stephenson, spelled with a ph, this site is not about that person."
                        }
                      },
                      {
                        "@type": "Question",
                        "name": "Is whitneystevenson.com the official website for Whitney Stevenson?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "Yes, whitneystevenson.com is the direct website to use when you’re looking for Whitney Stevenson by name. Start there instead of third-party profiles or people-search pages, because the homepage can point you to her current bio, work, contact details, and any official links. The takeaway: use the domain as the primary source."
                        }
                      },
                      {
                        "@type": "Question",
                        "name": "How do I contact Whitney Stevenson through her website?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "Use the contact option on whitneystevenson.com, because it keeps your message tied to Whitney Stevenson’s official web presence. Include one clear subject, a short reason for reaching out, and the best reply method. For business, media, or collaboration requests, concise details improve response quality. The takeaway: contact her through the site first."
                        }
                      },
                      {
                        "@type": "Question",
                        "name": "How can I verify I found the right Whitney Stevenson?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "Verify you found the right Whitney Stevenson by checking the domain, page details, linked profiles, and contact information against what you already know. The clearest signal is the exact-name domain whitneystevenson.com, which is more reliable than directory listings. The takeaway: trust consistent official links over scattered search results."
                        }
                      }
                    ]
                }
              ),
            }}
          />
          <section className="contact-section" id="contact">
            <div>
              <h2 className="serif-medium" style={{ marginBottom: 20 }}>
                Let&rsquo;s get to work.
              </h2>
              <p className="sans-body">
                Available for full-time roles based in San Francisco or remote.
              </p>
              <p className="sans-body" style={{ marginTop: 16, fontSize: 14 }}>
                Or email directly:{" "}
                <a
                  href="mailto:whitneyannestevenson@gmail.com"
                  style={{ textDecoration: "underline" }}
                >
                  whitneyannestevenson@gmail.com
                </a>
              </p>
              <p className="sans-body" style={{ marginTop: 16, fontSize: 14 }}>
                Read the <Link href="/blog">Field Notes</Link> or connect on{" "}
                <a
                  href="https://www.linkedin.com/in/whitneystevenson"
                  rel="me noopener"
                  target="_blank"
                  style={{ textDecoration: "underline" }}
                >
                  LinkedIn
                </a>
                .
              </p>
            </div>
            <ContactForm />
          </section>
        </main>
      </div>
    </>
  );
}
