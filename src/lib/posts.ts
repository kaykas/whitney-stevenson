export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingMinutes: number;
  keywords: string[];
  hero?: string;
};

export const posts: Post[] = [
  {
    slug: "illumio-latam-channel-partnership",
    title: "How I Built Illumio's First LATAM Channel Partnership",
    description:
      "Day-1 of standing up Illumio's Latin America channel program — Brazil, São Paulo, Mexico — from zero. Partner recruiting, market strategy, and what actually moved the targets in a region with no prior footprint.",
    date: "2026-04-28",
    readingMinutes: 7,
    keywords: [
      "Illumio LATAM channel",
      "B2B channel partner program",
      "Latin America channel events",
      "channel marketing Latin America",
    ],
    hero: "/whitney/photos/illumio-golf-booth.jpg",
  },
  {
    slug: "the-target-run",
    title: "The Target Run: Why I Don't Panic",
    description:
      "A breakout speaker walked on stage with no screen. The sales rep had forgotten the TV. I drove to Target. The session went on. A short essay on calm-under-pressure as a craft, not a personality trait.",
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
    description:
      "Three consecutive years running Arxan Technologies' presence at RSA Conference — booth fabrication, ROI tracking, and pipeline attribution in the most over-budgeted, hyper-competitive trade show in cybersecurity. What worked, what we cut, and why showing up the same way three years in a row is the strategy.",
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
    description:
      "I founded the women's club at the West Coast's second-oldest golf course and produced 300+ tournaments over seven years. The lessons aren't about golf — they're about what operations actually means when nothing can fail and every detail compounds.",
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
    description:
      "On-the-ground production for PepsiCo Tostitos at Super Bowl 2026, Pier 39 Fiesta Zone. A massive-scale brand activation in a city that had never hosted the Super Bowl. Build week, show week, load-out — what flawless execution under that kind of pressure actually requires.",
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
