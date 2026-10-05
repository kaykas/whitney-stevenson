export type Post = {
  slug: string;
  /** Visible <h1> on the post page and the card heading on /blog. */
  title: string;
  /**
   * <title> text for the post, BEFORE the " | Whitney Stevenson" template
   * suffix in layout.tsx adds 20 characters. Must stay at or under 40 chars so
   * the rendered title tag fits the ~60-character SERP budget — Ahrefs/GSC flag
   * longer as "Title too long". Enforced by scripts/check-titles.mjs.
   */
  metaTitle: string;
  /** Visible lede on the post page and blog index. Length is a design call. */
  description: string;
  /**
   * <meta name="description"> for the post. Must stay under 155 characters —
   * Ahrefs/GSC flag anything longer as "Meta description too long" and Google
   * truncates it in the SERP. Enforced by scripts/check-meta-descriptions.mjs.
   */
  metaDescription: string;
  date: string;
  readingMinutes: number;
  keywords: string[];
  hero?: string;
  /**
   * Optional FAQ for the post. Rendered as a visible section under the body
   * AND as FAQPage JSON-LD from this same array, so the structured data can
   * never drift from what a reader sees. Answers are plain text, drawn only
   * from what the post itself says. Enforced by scripts/check-faq.mjs.
   */
  faqs?: { question: string; answer: string }[];
};

export const posts: Post[] = [
  {
    slug: "b2b-client-golf-outing",
    title: "The Scoring Tent Is the Meeting: How I'd Plan a B2B Client Golf Outing",
    metaTitle: "How to Plan a B2B Client Golf Outing",
    description:
      "I produced 300+ tournaments at Presidio Golf Course, and I've worked the sponsor table at B2B outings too. The planning guides cover format and budget well. They skip the stretch between the last putt and the awards, which is the only time all day your clients are standing still with nothing on their schedule.",
    metaDescription:
      "How to plan a B2B client golf outing from someone who ran 300+ tournaments: pairings, the turn, and the scoring tent most guides skip.",
    date: "2026-10-04",
    readingMinutes: 5,
    keywords: [
      "corporate golf outing planning",
      "B2B client golf event",
      "how to plan a corporate golf tournament",
      "client golf outing ideas",
      "B2B event marketer San Francisco",
    ],
  },
  {
    slug: "event-marketing-interview-questions",
    title: "The Interview Questions I Want You to Ask Me (and What a Real Answer Sounds Like)",
    metaTitle: "Event Marketing Interview Questions",
    description:
      "Every interview guide for event marketing managers is written for the person doing the hiring. This one is written from the other chair: the questions I'd want a hiring manager to ask me, what a real answer sounds like, and the one question none of the guides include. What happened ninety days after your last event?",
    metaDescription:
      "Event marketing interview questions from the candidate's side: what a real answer sounds like, and the 90-day question every guide skips.",
    date: "2026-10-03",
    readingMinutes: 5,
    keywords: [
      "event marketing manager interview questions",
      "hiring a B2B event marketer",
      "event marketing interview",
      "field marketing events manager hiring",
      "B2B event marketer San Francisco",
    ],
    faqs: [
      {
        question: "What interview question does Whitney Stevenson most want a hiring manager to ask?",
        answer:
          "What happened ninety days after your last event? None of the interview guides include it, because every question on them stops at load-out. Her best answer comes from Arxan, where she stayed long enough after RSA Conference to watch badge scans turn into specific opportunities with a dollar value attached.",
      },
      {
        question: "How should you follow up when a candidate says they measure event success by ROI?",
        answer:
          "Ask when. When did they last look at the pipeline number, and who handed it to them? A candidate who can name the week they saw the number has lived it. Whitney can: by the end of Q2 after her second RSA with Arxan, the team could point to specific opportunities and their dollar value, and that spreadsheet bought them year three.",
      },
      {
        question: "How did Whitney prove an RSA Conference booth produced revenue at Arxan?",
        answer:
          "After year one, leadership asked whether she could prove it. So the next year every badge scanned at the booth was tagged in the CRM as RSA-sourced, every lead went to a rep within 24 hours, and the team tracked the 30-60-90 day follow-up every single week.",
      },
      {
        question: "What is a quick way to tell whether an event marketer has worked a real build?",
        answer:
          "Ask what they look at first on a site visit. People who have only seen events from the attendee side talk about the ballroom. People who have stood at a loading dock with a truck idling talk about the dock. Whitney starts at the back door every time and asks how tall the dock door is long before she says anything nice about the chandeliers.",
      },
    ],
  },
  {
    slug: "first-venue-walkthrough",
    title: "The First Walkthrough: What I Look For Before Anyone Signs the Venue Contract",
    metaTitle: "What I Look For on a Venue Walkthrough",
    description:
      "My homepage promises white-glove care from the first walkthrough to load-out, and people mostly ask about load-out. The walkthrough is where I earn it. Here's what I'm doing when I wander a venue with a coffee and my phone camera, and why the loading dock gets more of my attention than the ballroom.",
    metaDescription:
      "How a B2B event marketer walks a venue before the contract: the loading dock, the outlets, and the route a late VP takes from the curb.",
    date: "2026-10-01",
    readingMinutes: 4,
    keywords: [
      "event venue walkthrough",
      "venue site visit checklist",
      "B2B event planning venue",
      "conference venue selection",
      "B2B event marketer San Francisco",
    ],
    faqs: [
      {
        question: "What should you check first on a venue walkthrough?",
        answer:
          "The loading dock. I start at the back door because that's where build week goes wrong. I want to know how tall the dock door is, how long a truck can sit there before somebody writes a ticket, whether the freight elevator fits a crate in real life or only on paper, and who holds the key at 9 p.m. on a Sunday when the fabricator is running late.",
      },
      {
        question: "What do you look at in the main room during a site visit?",
        answer:
          "Mostly the cheap seats. I stand where the last row will be and check whether I can read a slide from there. I count the outlets, because a breakout room with two outlets and a demo station is going to have a very exciting Tuesday. Then I find the spot inside the door where people will bunch up and start moving the registration table in my head.",
      },
      {
        question: "How do you check the guest experience on a walkthrough?",
        answer:
          "I go back out to the curb and come in again as the VP who just got off a delayed flight. How far is the rideshare drop from the door? Is there signage? Is the accessible entrance around the side past the dumpsters? Where can a speaker sit quietly for ten minutes? And I time the walk from the main room to the nearest restroom, every single time.",
      },
      {
        question: "What happens to your walkthrough notes after the visit?",
        answer:
          "They go back to the venue the same day, photos of the power panel and the dock door included. That gives the venue a chance to correct me, and it starts a relationship with their operations people, who are the ones I'll be calling at 6 a.m. on show day.",
      },
    ],
  },
  {
    slug: "event-concierge-b2b-hospitality",
    title: "Why \"Concierge\" Is in My Title: The Half of Events Nobody Recaps",
    metaTitle: "What an Event Concierge Actually Does",
    description:
      "The word next to my name on this site confuses people, and I kept it on purpose. In B2B events, concierge work is the part nobody puts in the recap deck: the VP who landed late and hasn't eaten, the partner who flew in to meet one person. It's also where a lot of pipeline quietly moves.",
    metaDescription:
      "What an event concierge does at B2B events: guest notes and speaker care, the quiet hospitality work that moves B2B pipeline.",
    date: "2026-09-30",
    readingMinutes: 4,
    keywords: [
      "event concierge B2B",
      "executive event hospitality",
      "customer dinner event planning",
      "VIP guest experience events",
      "B2B event marketer San Francisco",
    ],
  },
  {
    slug: "freelance-to-in-house",
    title: "Why I Want a Year Two: Trading Freelance for One Team",
    metaTitle: "Why I'm Going In-House After Freelance",
    description:
      "Freelance event work ends on load-out night, and you never learn what the badge scans turned into. After agency work at Plan Experiential and the long runs I'm proudest of (Presidio Golf, eight years of New Year's Eve), here's why I want to join one events team and stay long enough to compound.",
    metaDescription:
      "Why a freelance event producer wants to go in-house: recurring work compounds, and the best events are built from last year's receipts.",
    date: "2026-09-29",
    readingMinutes: 4,
    keywords: [
      "in-house event marketing manager",
      "freelance to in-house events",
      "B2B event marketer hiring",
      "event coordinator San Francisco",
      "recurring event strategy",
    ],
    faqs: [
      {
        question: "Why is Whitney Stevenson moving from freelance to an in-house events role?",
        answer:
          "Freelance event work ends on load-out night, and you never find out what the badge scans turned into. I want to join one events team and stay long enough for the work to compound, the way it did across three straight years of RSA Conference at Arxan.",
      },
      {
        question: "Why does recurring event work get better every year?",
        answer:
          "Year two gets built out of year one's receipts. At Arxan I was still there ninety days after RSA when the reps followed up, so we knew which parts of the booth were earning their keep. By year five of a recurring event, the caterer picks up at 11 p.m. because you picked up for them once, and the January post-mortem is a document people actually open.",
      },
      {
        question: "Would Whitney start in an event coordination role?",
        answer:
          "Happily! If the right company needs me to begin by wrangling shipping manifests and badge lists, I'll do it, because I know exactly what a perfect badge list is worth at 7 a.m. on day one of a show. I'd rather earn the bigger job from inside the building.",
      },
      {
        question: "What does a freelance event producer bring to an in-house team on day one?",
        answer:
          "Someone who has already made the scary mistakes on somebody else's budget. Agency life means learning a new stakeholder map every few weeks and reading a client's brand guidelines on the drive to the venue. When something breaks, I fix it and keep the room calm.",
      },
    ],
  },
  {
    slug: "sunglasses-shops-and-bodywork",
    title:
      "Two Shops and a Treatment Table: The Other Half of My Resume",
    metaTitle: "Sunglasses Shops, Bodywork, and Events",
    description:
      "Before the Super Bowl and RSA, I founded a sunglasses venture and grew it to two San Francisco locations, and I still practice bodywork alongside event work. What a storefront and a treatment table taught me about foot traffic, scaling past the founder, and noticing trouble ten minutes before it arrives.",
    metaDescription:
      "Founding two San Francisco sunglasses shops and practicing bodywork taught me more about event hospitality than any trade show ever did.",
    date: "2026-09-28",
    readingMinutes: 5,
    keywords: [
      "retail founder event marketer",
      "event hospitality philosophy",
      "booth design foot traffic",
      "San Francisco sunglasses shop",
      "bodywork and event production",
    ],
  },
  {
    slug: "eight-years-sf-nye-party",
    title:
      "Eight Years of Midnight: What Producing the Same Party Taught Me",
    metaTitle: "Eight Years of SF's New Year's Eve",
    description:
      "Eight consecutive years producing San Francisco's New Year's Eve party. Midnight is the one deadline in this business that never moves, and a recurring event teaches you things a one-off never can: compounding vendor trust, the January post-mortem as the real deliverable, and hospitality that turns a ticketed night into an appointment people keep.",
    metaDescription:
      "Eight consecutive years producing San Francisco's New Year's Eve party. What a recurring event teaches you that a one-off never can.",
    date: "2026-09-27",
    readingMinutes: 6,
    keywords: [
      "New Year's Eve event production",
      "recurring event strategy",
      "San Francisco NYE party producer",
      "annual event production",
      "countdown run of show",
    ],
  },
  {
    slug: "latin-billboard-awards-artist-relations",
    title:
      "Artist Relations at the Latin Billboard Awards: Three Artists, One Broadcast Clock",
    metaTitle: "Backstage at the Latin Billboard Awards",
    description:
      "Running artist relations for three performing artists at the Latin Billboard Awards — riders as trust contracts, run-of-show timing against a broadcast clock that doesn't bend, and why hospitality is risk management with warmer lighting.",
    metaDescription:
      "Artist relations for three performers at the Latin Billboard Awards — riders, green rooms, and run-of-show timing against a broadcast clock.",
    date: "2026-09-26",
    readingMinutes: 7,
    keywords: [
      "Latin Billboard Awards",
      "artist relations events",
      "backstage hospitality production",
      "run of show broadcast",
      "awards show production",
    ],
  },
  {
    slug: "illumio-latam-channel-partnership",
    title: "How I Built Illumio's First LATAM Channel Partnership",
    metaTitle: "Building Illumio's First LATAM Channel",
    description:
      "Day-1 of standing up Illumio's Latin America channel program — Brazil, São Paulo, Mexico — from zero. Partner recruiting, market strategy, and what actually moved the targets in a region with no prior footprint.",
    metaDescription:
      "Standing up Illumio's first Latin America channel program from zero — Brazil, Sao Paulo, Mexico. Partner recruiting and what moved the targets.",
    date: "2026-04-28",
    readingMinutes: 7,
    keywords: [
      "Illumio LATAM channel",
      "B2B channel partner program",
      "Latin America channel events",
      "channel marketing Latin America",
    ],
    hero: "/whitney/photos/illumio-golf-booth.jpg",
    faqs: [
      {
        question: "What did Illumio have in Latin America when Whitney Stevenson started?",
        answer:
          "Nothing yet. No channel program, no regional partners, no localized collateral and no relationships on the ground in Brazil, São Paulo or Mexico. The mandate was to build the program from scratch and hit the targets.",
      },
      {
        question: "Where did Whitney start when building Illumio's LATAM channel?",
        answer:
          "On planes, for the first ninety days. São Paulo came first, because that's where the LATAM cybersecurity industry clusters and where channel decision-makers actually take meetings. Then Mexico City, then Brazil more broadly. She learned which restaurants the regional CISOs go to, which trade shows mattered, and which partners already had budget for Zero Trust.",
      },
      {
        question: "What moved the targets for Illumio's Latin America channel program?",
        answer:
          "Hospitality and trust. The white papers and MDF budgets already existed. What partners needed was proof Illumio would still be there in twelve months, so Whitney ran quarterly partner roundtables in São Paulo, co-marketed regional events with anchor accounts, showed up at Latin American cybersecurity conferences with the same polish as the big San Francisco shows, and followed up within 24 hours every time.",
      },
      {
        question: "What would Whitney do differently building a LATAM channel program again?",
        answer:
          "Bring the regional voice into the global event calendar earlier. Some of the best LATAM co-marketed plays could have happened sooner if the global event team had aligned to LATAM sequencing instead of the other way around.",
      },
      {
        question: "Did the partners from Illumio's first LATAM program stick?",
        answer:
          "Yes! Every partner Whitney onboarded in those first ninety days is still in Illumio's book today.",
      },
    ],
  },
  {
    slug: "the-target-run",
    title: "The Target Run: Why I Don't Panic",
    metaTitle: "The Target Run: Why I Don't Panic",
    description:
      "A breakout speaker walked on stage with no screen. The sales rep had forgotten the TV. I drove to Target. The session went on. A short essay on calm-under-pressure as a craft, not a personality trait.",
    metaDescription:
      "A speaker hit the stage with no screen. I drove to Target and the session went on. On calm under pressure as a craft, not a personality trait.",
    date: "2026-04-28",
    readingMinutes: 4,
    keywords: [
      "event production crisis",
      "white-glove event execution",
      "B2B event hospitality",
      "calm under pressure events",
    ],
  },
  {
    slug: "anchoring-arxan-three-years-rsa",
    title: "Anchoring Arxan at Three Years of RSA Conference",
    metaTitle: "Three Years of RSA: Anchoring Arxan",
    description:
      "Three consecutive years running Arxan Technologies' presence at RSA Conference — booth fabrication, ROI tracking, and pipeline attribution in the most over-budgeted, hyper-competitive trade show in cybersecurity. What worked, what we cut, and why showing up the same way three years in a row is the strategy.",
    metaDescription:
      "Three straight years running Arxan's RSA Conference presence — booth build, ROI tracking, pipeline attribution. What worked and what we cut.",
    date: "2026-04-28",
    readingMinutes: 8,
    keywords: [
      "RSA Conference booth strategy",
      "cybersecurity event marketing",
      "trade show ROI tracking",
      "B2B booth fabrication",
      "Arxan Technologies events",
    ],
    hero: "/whitney/photos/rsa-year-three.jpeg",
  },
  {
    slug: "presidio-golf-300-tournaments",
    title: "What 300+ Tournaments at Presidio Golf Taught Me About Operations",
    metaTitle: "What 300+ Tournaments Taught Me",
    description:
      "I founded the women's club at the West Coast's second-oldest golf course and produced 300+ tournaments over seven years. The lessons aren't about golf — they're about what operations actually means when nothing can fail and every detail compounds.",
    metaDescription:
      "I founded the women's club at the West Coast's second-oldest course and produced 300+ tournaments. What operations means when nothing can fail.",
    date: "2026-04-28",
    readingMinutes: 7,
    keywords: [
      "event operations philosophy",
      "tournament logistics",
      "Presidio Golf Course",
      "founder women's golf club",
      "white-glove event operations",
    ],
    hero: "/whitney/photos/presidio-merch-medallion.jpg",
  },
  {
    slug: "pepsico-tostitos-super-bowl-2026",
    title: "PepsiCo Tostitos at Super Bowl 2026: Behind the Activation",
    metaTitle: "Tostitos at Super Bowl 2026",
    description:
      "On-the-ground production for PepsiCo Tostitos at Super Bowl 2026, Pier 39 Fiesta Zone. A massive-scale brand activation in a city that had never hosted the Super Bowl. Build week, show week, load-out — what flawless execution under that kind of pressure actually requires.",
    metaDescription:
      "On-the-ground production for PepsiCo Tostitos at Super Bowl 2026, Pier 39 Fiesta Zone. Build week, show week, load-out — what flawless requires.",
    date: "2026-04-28",
    readingMinutes: 6,
    keywords: [
      "Super Bowl brand activation",
      "PepsiCo event production",
      "experiential marketing San Francisco",
      "Tostitos Fiesta Zone",
      "high-pressure event execution",
    ],
    hero: "/whitney/photos/tostitos-fiesta-zone.jpeg",
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
