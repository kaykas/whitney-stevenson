import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://whitneystevenson.com/sitemap.xml",
    host: "https://whitneystevenson.com",
  };
}
