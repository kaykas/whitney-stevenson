import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";
import Script from "next/script";

const SITE_URL = "https://www.whitneystevenson.com";
// Keep the rendered <title> at or under 60 chars — Ahrefs/GSC flag longer as
// "Title too long" and Google truncates it in the SERP. Routes that inherit the
// template below spend 20 of those chars on " | Whitney Stevenson", leaving 40.
// Enforced by scripts/check-titles.mjs.
const TITLE = "Whitney Stevenson — B2B Event Marketing, San Francisco";
// Keep under 155 chars — Ahrefs/GSC flag longer as "Meta description too long"
// and Google truncates it in the SERP. Enforced by scripts/check-meta-descriptions.mjs.
const DESCRIPTION =
  "San Francisco event and hospitality leader with 10+ years of B2B events for tech and entertainment — Illumio LATAM, RSA, Super Bowl, Presidio Golf.";

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
    // Trailing slash: must match the canonical exactly (metadataBase + "/"
    // renders https://www.whitneystevenson.com/) or Ahrefs flags
    // "Open Graph URL not matching canonical".
    url: `${SITE_URL}/`,
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
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-J17RBCXLNP" />
        <script
          dangerouslySetInnerHTML={{ // xss: static GA4 snippet, no user input
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-J17RBCXLNP');`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap"
          rel="stylesheet"
        />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                {
                    "@context": "https://schema.org",
                    "@type": "WebPage",
                    "speakable": {
                      "@type": "SpeakableSpecification",
                      "cssSelector": [
                        "h1",
                        "h2",
                        ".speakable",
                        "[data-speakable]"
                      ]
                    },
                    "url": "https://www.whitneystevenson.com/"
                }
              ),
            }}
          />
</head>
      <body>
        {children}
        <SiteFooter />
        <JsonLd />
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="s0n8sNjaBqGtru1g6u3f1Q"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
