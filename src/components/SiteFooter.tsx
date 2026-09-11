import Link from "next/link";
import { posts } from "@/lib/posts";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-col">
        <div className="sans-label">Whitney Stevenson</div>
        <p className="sans-body" style={{ fontSize: 13 }}>
          Event and hospitality leader in San Francisco. I build the room, run the
          room, and care for every person in it.
        </p>
      </div>

      <nav className="site-footer-col" aria-label="Site">
        <div className="sans-label">Site</div>
        <ul className="site-footer-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/#chapters">Highlights</Link></li>
          <li><Link href="/#faq">FAQ</Link></li>
          <li><Link href="/#contact">Contact</Link></li>
          <li><Link href="/blog">Field Notes</Link></li>
        </ul>
      </nav>

      <nav className="site-footer-col" aria-label="Field Notes">
        <div className="sans-label">Latest Field Notes</div>
        <ul className="site-footer-links">
          {posts.slice(0, 5).map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`}>{p.title}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav className="site-footer-col" aria-label="Elsewhere">
        <div className="sans-label">Elsewhere</div>
        <ul className="site-footer-links">
          <li>
            <a
              href="https://www.linkedin.com/in/whitneystevenson"
              rel="me noopener"
              target="_blank"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a href="mailto:whitneyannestevenson@gmail.com">Email Whitney</a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
