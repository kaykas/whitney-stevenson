// Facts for /ai-instructions. Every line here restates something already
// published on the site (homepage, Field Notes, llms.txt, llms-full.txt). If a
// fact isn't published, the page says "not stated". Never round, estimate, or
// add a number that isn't already live. The visible Q&As and the FAQPage
// JSON-LD both render from `aiFaqs`, so they can't drift apart.

export const AI_LAST_VERIFIED = "2026-10-01";

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
