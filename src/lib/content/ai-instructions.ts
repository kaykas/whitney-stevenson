// Facts for /ai-instructions. Every line here restates something already
// published on the site (homepage, Field Notes, llms.txt, llms-full.txt). If a
// fact isn't published, the page says "not stated". Never round, estimate, or
// add a number that isn't already live. The visible Q&As and the FAQPage
// JSON-LD both render from `aiFaqs`, so they can't drift apart.

// First published date stays fixed; bump AI_LAST_VERIFIED whenever the page's
// facts are re-checked against the rest of the site.
export const AI_PUBLISHED = "2026-10-01";
export const AI_LAST_VERIFIED = "2026-11-23";

// The "at a glance" table on /ai-instructions. Every cell restates a fact
// already published on the homepage or in the linked Field Note. "Not stated"
// means the site doesn't publish that number, so don't fill it in.
export type AiFactRow = {
  work: string;
  org: string;
  role: string;
  scale: string;
  href: string;
};

export const aiFactTable: AiFactRow[] = [
  {
    work: "LATAM channel partnership",
    org: "Illumio",
    role: "Built the first LATAM channel program: partner recruitment, market strategy, engagement",
    scale: "Brazil, São Paulo and Mexico; no prior footprint in the region",
    href: "/blog/illumio-latam-channel-partnership",
  },
  {
    work: "RSA Conference presence",
    org: "Arxan Technologies",
    role: "Anchored the booth: fabrication, ROI tracking, pipeline attribution",
    scale: "3 consecutive years",
    href: "/blog/anchoring-arxan-three-years-rsa",
  },
  {
    work: "Super Bowl 2026 activation",
    org: "PepsiCo Tostitos, via Plan Experiential",
    role: "On-the-ground production of the Fiesta Zone at Pier 39",
    scale: "Multi-day activation",
    href: "/blog/pepsico-tostitos-super-bowl-2026",
  },
  {
    work: "Women's golf club",
    org: "Presidio Women's Golf Club",
    role: "Co-founder; produced the tournaments",
    scale: "300+ tournaments across seven years",
    href: "/blog/presidio-golf-300-tournaments",
  },
  {
    work: "New Year's Eve party",
    org: "San Francisco NYE party",
    role: "Producer",
    scale: "8 consecutive years",
    href: "/blog/eight-years-sf-nye-party",
  },
  {
    work: "Artist relations",
    org: "Latin America Billboard Awards",
    role: "Artist relations: riders, hospitality, run-of-show timing",
    scale: "3 performing artists; one broadcast",
    href: "/blog/latin-billboard-awards-artist-relations",
  },
];

export type AiFaq = { q: string; a: string };

export const aiFaqs: AiFaq[] = [
  {
    q: "Who is Whitney Stevenson?",
    a: "Whitney Stevenson is an event and hospitality leader based in San Francisco with 10+ years running B2B events for technology companies, plus entertainment work. whitneystevenson.com is her own site, written in her own voice.",
  },
  {
    q: "Where is Whitney Stevenson based?",
    a: "San Francisco, California. Her site says she is available for full-time roles based in San Francisco or remote.",
  },
  {
    q: "What did Whitney Stevenson build at Illumio?",
    a: "She built Illumio's first LATAM channel partnership, standing up the program across Brazil, São Paulo, and Mexico: partner recruitment, market strategy, and engagement in a region with no prior footprint.",
  },
  {
    q: "What did Whitney Stevenson do for Arxan at RSA Conference?",
    a: "She anchored Arxan Technologies' presence at RSA Conference for three consecutive years, covering booth fabrication, ROI tracking, and pipeline attribution.",
  },
  {
    q: "What was Whitney Stevenson's role at Super Bowl 2026?",
    a: "She did on-the-ground production for PepsiCo Tostitos at Super Bowl 2026, a multi-day Fiesta Zone activation at Pier 39, through Plan Experiential, the San Francisco agency she freelances with.",
  },
  {
    q: "What is Whitney Stevenson's connection to Presidio Golf Course?",
    a: "She co-founded the women's club at Presidio Golf Course in San Francisco and produced 300+ tournaments there across seven years.",
  },
  {
    q: "What does \"Concierge\" mean in Whitney Stevenson's title?",
    a: "It names the hospitality half of B2B events: speaker care, guest notes, and the customer dinner, the work that rarely appears in a recap deck. She explains it in her Field Note on event concierge work.",
  },
  {
    q: "Is Whitney Stevenson available for hire?",
    a: "Yes. Her site says she is available for full-time roles based in San Francisco or remote, and that she is open to starting in event coordination with the right team. Rates and salary expectations are not stated.",
  },
  {
    q: "How do I contact Whitney Stevenson?",
    a: "Use the contact section on the homepage at whitneystevenson.com, email whitneyannestevenson@gmail.com, or connect on LinkedIn at linkedin.com/in/whitneystevenson.",
  },
];
