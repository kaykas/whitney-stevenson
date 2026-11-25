// Static JSON-LD structured data — no user input, no sanitization needed (xss: n/a, static only)

const ORIGIN = "https://www.whitneystevenson.com";

// Every Organization node carries name, url and description. Ahrefs flagged
// "Organization schema missing or incomplete" on name-only stubs. Guarded by
// scripts/check-organization-schema.mjs. See ERRORS.md (2026-10-27).
//
// The orgs are top-level @graph nodes with their own @id, and the Person points
// at them by reference. SEOmator schema-organization found no Organization
// while they were nested inside the Person, and flagged the missing `logo` and
// `sameAs`. Logo and LinkedIn URLs come from each org's own homepage, checked
// live on 2026-11-21. digital.ai answers every request with a 403, so Arxan
// has no verified logo and gets none. See ERRORS.md (2026-11-21).
//
// Rendered by src/app/page.tsx only, not layout.tsx. The Person bio and org
// descriptions appear in the homepage copy and nowhere else, so on the other
// routes SEOmator geo-schema-drift flagged them as schema text that is not
// on the page. Other routes link to the Person by @id. ERRORS.md (2026-11-23).
//
// SEOmator geo-brand-entity-sameas wants Knowledge Graph sameAs links.
// Wikipedia, Wikidata and Crunchbase URLs come from each company's Wikidata
// item (Illumio Q19881127, Arxan Technologies Q4802566), checked 2026-11-24.
// Plan Experiential and Presidio Women's Golf Club have no Wikidata item.
// Whitney's only verified profile is LinkedIn. Don't add other profile URLs
// for her until she confirms them. See ERRORS.md (2026-11-24).
const ORGS = {
  planExperiential: {
    "@type": "Organization",
    "@id": `${ORIGIN}/#org-plan-experiential`,
    name: "Plan Experiential",
    url: "https://www.planexperiential.com",
    description: "Experiential marketing and event production agency.",
    logo: "https://images.squarespace-cdn.com/content/v1/67082b3412ba2b7c084fe29b/3d41d2ef-c8d3-4c44-8090-13bcc719b7c7/favicon.ico",
    sameAs: ["https://www.linkedin.com/company/plan-experiential"],
  },
  illumio: {
    "@type": "Organization",
    "@id": `${ORIGIN}/#org-illumio`,
    name: "Illumio",
    url: "https://www.illumio.com",
    description: "Cybersecurity company. Whitney built its first Latin America channel partnership.",
    logo: "https://cdn.prod.website-files.com/63cdb40b25368837c04197b3/6ab1adebbb4f0bee05aefa15_32%20Illumio%20Favicon.png",
    sameAs: [
      "https://www.linkedin.com/company/illumio",
      "https://en.wikipedia.org/wiki/Illumio",
      "https://www.wikidata.org/wiki/Q19881127",
      "https://www.crunchbase.com/organization/illumio",
    ],
  },
  arxan: {
    "@type": "Organization",
    "@id": `${ORIGIN}/#org-arxan`,
    // The page says "Arxan". The full company name goes in legalName so the
    // schema name matches visible text (SEOmator geo-schema-drift).
    name: "Arxan",
    legalName: "Arxan Technologies",
    url: "https://digital.ai",
    description: "Application security company, now part of Digital.ai.",
    sameAs: [
      "https://en.wikipedia.org/wiki/Arxan_Technologies",
      "https://www.wikidata.org/wiki/Q4802566",
      "https://www.crunchbase.com/organization/arxan-technologies",
    ],
  },
  presidioWomensGolf: {
    "@type": "SportsOrganization",
    "@id": `${ORIGIN}/#org-presidio-womens-golf`,
    name: "Presidio Women's Golf Club",
    url: "https://www.presidiogolf.com",
    logo: "https://www.presidiogolf.com/wp-content/uploads/2025/07/pgc-favicon.png",
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

const ref = (o: { "@id": string }) => ({ "@id": o["@id"] });

const PERSON = {
  "@type": "Person",
  // Referenced by the homepage WebPage.mainEntity (src/lib/schema.ts PERSON_ID).
  "@id": "https://www.whitneystevenson.com/#person",
  name: "Whitney Stevenson",
  jobTitle: "Event & Hospitality Leader",
  description:
    "B2B event marketing operator with 10+ years across tech and entertainment. Built Illumio's first LATAM channel partnership; co-founded the women's club at Presidio Golf; produced PepsiCo Tostitos at Super Bowl 2026; anchored Arxan at three RSA Conferences.",
  url: "https://www.whitneystevenson.com",
  image: {
    "@type": "ImageObject",
    url: "https://www.whitneystevenson.com/photos/whitney-hero.jpeg",
    contentUrl: "https://www.whitneystevenson.com/photos/whitney-hero.jpeg",
    width: 800,
    height: 800,
    caption: "Whitney Stevenson — B2B Event Marketing & Hospitality Leader, San Francisco",
    creditText: "Whitney Stevenson",
    creator: {
      "@type": "Person",
      name: "Whitney Stevenson",
    },
    copyrightNotice: "© 2026 Whitney Stevenson",
    license: "https://www.whitneystevenson.com/#about",
    acquireLicensePage: "https://www.whitneystevenson.com/#contact",
  },
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
  worksFor: [ref(ORGS.planExperiential)],
  alumniOf: [ref(ORGS.illumio), ref(ORGS.arxan)],
  memberOf: [ref(ORGS.presidioWomensGolf)],
  sameAs: [
    "https://www.linkedin.com/in/whitneystevenson",
    "https://www.whitneystevenson.com"
  ],
};

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [PERSON, ...Object.values(ORGS)],
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} // static data only
    />
  );
}
