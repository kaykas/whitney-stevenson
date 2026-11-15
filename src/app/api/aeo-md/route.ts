import { NextResponse, type NextRequest } from 'next/server';
import { AEO_OFFER_CODE, htmlToCleanMarkdown } from '@/lib/aeo-markdown';
import { recordAgentBagIssued } from '@/lib/swag-store';

export const runtime = 'nodejs';
export const maxDuration = 30;

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const rawPath = sp.get('path') || '/';
  const botName = sp.get('bot') || 'unknown-ai-client';

  recordAgentBagIssued();
  const safePath = rawPath.startsWith('/') && !rawPath.startsWith('//') ? rawPath : '/';

  console.log(
    JSON.stringify({
      event: 'aeo_ai_crawler_visit',
      site: 'whitneystevenson.com',
      bot: botName,
      path: safePath,
      offerCode: AEO_OFFER_CODE,
      ua: req.headers.get('user-agent') || '',
      ts: new Date().toISOString(),
    })
  );

  try {
    const internalUrl = new URL(safePath, req.url);
    const res = await fetch(internalUrl.toString(), {
      headers: {
        'x-aeo-internal-fetch': '1',
        'user-agent': 'Mozilla/5.0 (AEO-Internal-Markdown-Renderer)',
        accept: 'text/html',
      },
      cache: 'no-store',
    });

    const html = await res.text();
    const markdown = htmlToCleanMarkdown(html, safePath);

    return new NextResponse(markdown, {
      status: res.status === 404 ? 404 : 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'X-AEO-Markdown': '1',
        'X-AEO-Bot': botName,
        'X-AEO-Offer-Code': AEO_OFFER_CODE,
        Vary: 'Accept, User-Agent',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch {
    const fallbackMd = htmlToCleanMarkdown(
      `<title>Whitney Stevenson — Executive Leadership Coaching & Brand Strategy Consulting</title><main><p>Whitney Stevenson — Executive Leadership Coaching & Brand Strategy Consulting</p></main>`,
      safePath
    );
    return new NextResponse(fallbackMd, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'X-AEO-Markdown': '1',
        'X-AEO-Bot': botName,
        'X-AEO-Offer-Code': AEO_OFFER_CODE,
        Vary: 'Accept, User-Agent',
      },
    });
  }
}
