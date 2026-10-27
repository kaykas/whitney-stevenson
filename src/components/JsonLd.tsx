// Static JSON-LD structured data — no user input, no sanitization needed (xss: n/a, static only)

// Every Organization node carries name, url and description. Ahrefs flagged
// "Organization schema missing or incomplete" on name-only stubs. Guarded by
// scripts/check-organization-schema.mjs. See ERRORS.md (2026-10-27).
const ORGS = {
  planExperiential: {
    "@type": "Organization",
    name: "Plan Experiential",
    url: "https://www.planexperiential.com",
    description: "Experiential marketing and event production agency.",
  },
  illumio: {
    "@type": "Organization",
    name: "Illumio",
    url: "https://www.illumio.com",
    description: "Cybersecurity company. Whitney built its first Latin America channel partnership.",
  },
  arxan: {
    "@type": "Organization",
    name: "Arxan Technologies",
    url: "https://digital.ai",
    description: "Application security company, now part of Digital.ai.",
  },
  presidioWomensGolf: {
    "@type": "SportsOrganization",
    name: "Presidio Women's Golf Club",
    url: "https://www.presidiogolf.com",
    description: "Women's golf club at Presidio Golf Course in San Francisco, co-founded by Whitney.",
    location: {
      "@type": "Place",
      name: "Presidio Golf Course",
      address: {
        "@type": "PostalAddress",
        addressLocality: "San Francisco",
        addressRegion: "CA",
        addressCountry: "US",
      },
    },
  },
};

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
  worksFor: [ORGS.planExperiential],
  alumniOf: [ORGS.illumio, ORGS.arxan],
  memberOf: [ORGS.presidioWomensGolf],
  sameAs: [
    "https://www.linkedin.com/in/whitneystevenson",
    "https://www.whitneystevenson.com"
  ],
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} // static data only
    />
  );
}
