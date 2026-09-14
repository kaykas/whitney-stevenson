import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Canonical URL shape is no-trailing-slash (`/blog`, not `/blog/`), which is what
  // sitemap.ts, robots.ts and every `alternates.canonical` emit. Pinned explicitly so
  // a future default flip can't start 308-ing every canonical URL. Ahrefs flags any
  // linked URL that answers 3XX, so the canonical shape has to stay the linked shape.
  trailingSlash: false,
};

export default nextConfig;
