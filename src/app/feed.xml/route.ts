import { renderFeed } from "@/lib/feed";

export const dynamic = "force-static";

export function GET() {
  return new Response(renderFeed(), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
