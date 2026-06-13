import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import "./globals.css";

const SITE_URL = "https://www.whitneystevenson.com";
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
                    "@type": "FAQPage",
                    "mainEntity": [
                      {
                        "@type": "Question",
                        "name": "Is whitneystevenson.com the official website for Whitney Stevenson?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "Yes, whitneystevenson.com is the direct website to use when you’re looking for Whitney Stevenson by name. Start there instead of third-party profiles or people-search pages, because the homepage can point you to her current bio, work, contact details, and any official links. The takeaway: use the domain as the primary source."
                        }
                      },
                      {
                        "@type": "Question",
                        "name": "How do I contact Whitney Stevenson through her website?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "Use the contact option on whitneystevenson.com, because it keeps your message tied to Whitney Stevenson’s official web presence. Include one clear subject, a short reason for reaching out, and the best reply method. For business, media, or collaboration requests, concise details improve response quality. The takeaway: contact her through the site first."
                        }
                      },
                      {
                        "@type": "Question",
                        "name": "How can I verify I found the right Whitney Stevenson?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "Verify you found the right Whitney Stevenson by checking the domain, page details, linked profiles, and contact information against what you already know. The clearest signal is the exact-name domain whitneystevenson.com, which is more reliable than directory listings. The takeaway: trust consistent official links over scattered search results."
                        }
                      }
                    ]
                }
              ),
            }}
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
        <JsonLd />
      </body>
    </html>
  );
}
