import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://whitneystevenson.com";
const TITLE = "Whitney Stevenson — B2B Event Marketing & Hospitality, San Francisco";
const DESCRIPTION =
  "Whitney Stevenson is a San Francisco event and hospitality leader with 10+ years building B2B events for tech and entertainment. Plan Experiential, Illumio LATAM, RSA, Super Bowl, Latin Billboard Awards, Presidio Golf.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Whitney Stevenson",
  },
  description: DESCRIPTION,
  keywords: [
    "B2B event marketing",
    "event manager San Francisco",
    "event producer Bay Area",
    "event concierge",
    "event hospitality",
    "field marketing manager",
    "channel event manager",
    "experiential event producer",
    "white-glove event execution",
    "Whitney Stevenson",
  ],
  authors: [{ name: "Whitney Stevenson" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: SITE_URL,
    siteName: "Whitney Stevenson",
    images: [{ url: "/photos/whitney-hero.jpeg", width: 800, height: 800 }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/photos/whitney-hero.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Whitney Stevenson",
              jobTitle: "Event & Hospitality Leader",
              description:
                "B2B event marketing operator with 10+ years across tech and entertainment. Built Illumio's first LATAM channel partnership; co-founded the women's club at Presidio Golf; produced PepsiCo Tostitos at Super Bowl 2026; anchored Arxan at three RSA Conferences.",
              url: SITE_URL,
              image: `${SITE_URL}/photos/whitney-hero.jpeg`,
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
              worksFor: [
                { "@type": "Organization", name: "Plan Experiential" },
              ],
              alumniOf: [
                { "@type": "Organization", name: "Illumio (LATAM Channel)" },
                { "@type": "Organization", name: "Arxan Technologies" },
              ],
              memberOf: [
                { "@type": "Organization", name: "Presidio Women's Golf Club" },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
