// Static JSON-LD built from route data (post slugs/titles in src/lib/posts.ts)
// — no user input, no sanitization needed (xss: n/a, static only).
//
// One shared BreadcrumbList for every non-home route. Item names mirror labels
// a reader can see on the page: "Home" and "Field Notes" are the sitewide
// footer links, and a post's last crumb is its visible <h1>. The last item
// carries `item` too, because Google accepts it and it keeps the trail
// self-describing for AI parsers. Guarded by scripts/check-breadcrumbs.mjs.
const ORIGIN = "https://www.whitneystevenson.com";

export type Crumb = { name: string; path: string };

export const HOME_CRUMB: Crumb = { name: "Home", path: "/" };
export const FIELD_NOTES_CRUMB: Crumb = { name: "Field Notes", path: "/blog" };

export default function BreadcrumbJsonLd({ items }: { items: Crumb[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.path === "/" ? ORIGIN : `${ORIGIN}${c.path}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} // static data only
    />
  );
}
