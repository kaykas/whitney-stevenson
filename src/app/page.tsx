import ContactForm from "./contact-form";

type Story = {
  n: string;
  tag: string;
  title: string;
  body: string;
  image?: string;
};

const stories: Story[] = [
  {
    n: "01",
    tag: "Technology",
    title: "Illumio LATAM",
    body: "Built Illumio's first-ever LATAM channel partnership from the ground up. Stood up the program across Brazil, São Paulo, and Mexico — partner recruitment, market strategy, and engagement that landed the targets in a region with no prior footprint.",
    image: "/whitney/photos/illumio-golf-booth.jpg",
  },
  {
    n: "02",
    tag: "Technology",
    title: "Arxan at RSA",
    body: "Three consecutive years anchoring presence at RSA Conference. Booth fabrication, ROI tracking, and pipeline attribution in a hyper-competitive cybersecurity landscape.",
    image: "/whitney/photos/rsa-year-three.jpeg",
  },
  {
    n: "03",
    tag: "Entertainment",
    title: "Super Bowl",
    body: "On-the-ground production for PepsiCo Tostitos at Super Bowl 2026. High-stakes, massive-scale brand activation requiring flawless execution under pressure.",
    image: "/whitney/photos/tostitos-fiesta-zone.jpeg",
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
    body: "Co-founded the women's club at the West Coast's second-oldest course. 300+ tournaments executed across seven years — every detail of every day, owned end-to-end.",
    image: "/whitney/photos/presidio-merch-medallion.jpg",
  },
  {
    n: "06",
    tag: "Founder · Practitioner",
    title: "Retail & Wellness",
    body: "Founder of an entrepreneurial sunglasses venture — two San Francisco locations. Alongside the business, a practicing bodyworker — Facial Release and Access Consciousness — bringing the same precision and care to one-on-one work.",
    image: "/whitney/photos/sunglasses-retail-portrait.jpg",
  },
];

export default function Home() {
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
            Portfolio &rsquo;26
          </div>
        </nav>

        <main className="main-content">
          {/* HERO */}
          <section className="hero-section">
            <div className="hero-text-container">
              <div className="sans-label" style={{ marginBottom: 20 }}>
                Event &amp; Hospitality Leader · Concierge
              </div>
              <h1 className="serif-huge">
                WHITNEY<br />STEVENSON
              </h1>
              <div className="circular-text-element sans-label">EVENT • CONCIERGE</div>
            </div>

            <div className="spine-line">
              <p className="sans-body">
                Event and hospitality leader. I build the room, run the room, and
                care for every person in it — white-glove from the first walkthrough
                to load-out, every guest considered.
              </p>
            </div>

            <div className="hero-image-container">
              <div className="hero-date">10+</div>
              <div
                className="hero-image"
                style={{ backgroundImage: "url('/photos/whitney-hero.jpeg')" }}
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
              <p className="sans-body" style={{ fontSize: 11 }}>
                Running B2B events for technology companies.
              </p>
            </div>
            <div className="stat-item">
              <div className="sans-label">Execution</div>
              <div className="stat-number">300+</div>
              <p className="sans-body" style={{ fontSize: 11 }}>
                Tournaments managed at Presidio Golf Course.
              </p>
            </div>
            <div className="stat-item">
              <div className="sans-label">Stamina</div>
              <div className="stat-number">8 Yrs</div>
              <p className="sans-body" style={{ fontSize: 11 }}>
                Consecutive production of SF&rsquo;s NYE party.
              </p>
            </div>
          </section>

          {/* QUOTE */}
          <section className="quote-section">
            <div className="sans-label">The Target Run</div>
            <h2 className="serif-large quote-text">
              &ldquo;A breakout speaker had no screen. The sales rep forgot the TV.
              I drove to Target and saved his ability to stand up properly in
              front of the audience.&rdquo;
            </h2>
            <div className="quote-attribution">
              <p className="sans-body">Great in the field. Solutions over panic.</p>
              <a href="#chapters" className="circle-btn" aria-label="See the work">→</a>
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
                  <div
                    className="story-image"
                    style={{ backgroundImage: `url('${s.image}')` }}
                    aria-hidden="true"
                  />
                )}
                <div className="sans-label" style={{ marginBottom: 6, opacity: 0.7 }}>{s.tag}</div>
                <h3 className="serif-medium">{s.title}</h3>
                <p className="sans-body">{s.body}</p>
              </article>
            ))}
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
                <div
                  className="img"
                  style={{ backgroundImage: "url('/whitney/photos/alpha-engineering-swag.jpeg')" }}
                  aria-hidden="true"
                />
                <div className="caption sans-label">Booth setup · pre-doors</div>
              </div>
              <div className="field-photo">
                <div
                  className="img"
                  style={{ backgroundImage: "url('/whitney/photos/golf-event-cannon.jpg')" }}
                  aria-hidden="true"
                />
                <div className="caption sans-label">Activation rig · golf event</div>
              </div>
              <div className="field-photo">
                <div
                  className="img"
                  style={{ backgroundImage: "url('/whitney/photos/nike-golf-cart.jpg')" }}
                  aria-hidden="true"
                />
                <div className="caption sans-label">Course day · between holes</div>
              </div>
              <div className="field-photo">
                <div
                  className="img"
                  style={{ backgroundImage: "url('/whitney/photos/cap-denim-bluesky.jpg')" }}
                  aria-hidden="true"
                />
                <div className="caption sans-label">Off-the-clock</div>
              </div>
            </div>
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
                by me. I&apos;m also great in the field.
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
            </div>
            <ContactForm />
          </section>
        </main>
      </div>
    </>
  );
}
