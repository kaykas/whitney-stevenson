// Static JSON-LD structured data — no user input, no sanitization needed (xss: n/a, static only)
const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Whitney Stevenson",
  jobTitle: "Event & Hospitality Leader",
  description:
    "B2B event marketing operator with 10+ years across tech and entertainment. Built Illumio's first LATAM channel partnership; co-founded the women's club at Presidio Golf; produced PepsiCo Tostitos at Super Bowl 2026; anchored Arxan at three RSA Conferences.",
  url: "https://www.whitneystevenson.com",
  image: "https://www.whitneystevenson.com/photos/whitney-hero.jpeg",
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Francisco",
    addressRegion: "CA",
    addressCountry: "US",
  },
  knowsAbout: [
    "B2B Event Marketing",
    "Event Production",
    "Event Hospitality",
    "Channel Partner Programs",
    "Field Marketing",
    "Experiential Marketing",
    "Cybersecurity Industry Events",
    "Latin America B2B Markets",
    "Artist Relations",
    "Brand Activation",
  ],
  worksFor: [{ "@type": "Organization", name: "Plan Experiential" }],
  alumniOf: [
    { "@type": "Organization", name: "Illumio (LATAM Channel)" },
    { "@type": "Organization", name: "Arxan Technologies" },
  ],
  memberOf: [{ "@type": "Organization", name: "Presidio Women's Golf Club" }],
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} // static data only
    />
  );
}
