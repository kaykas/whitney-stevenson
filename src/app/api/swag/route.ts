import { NextResponse, type NextRequest } from 'next/server';
import { detectAiCrawler } from '@/lib/aeo-markdown';
import {
  getSwagStats,
  openOrClaimSwagBag,
  recordAgentBagIssued,
  renderSwagBagAscii,
  renderSwagPageHtml,
  signSwagGuestbook,
} from '@/lib/swag-store';

export const runtime = 'nodejs';

function isAutomatedRequest(req: NextRequest, webdriverFlag?: boolean): boolean {
  if (webdriverFlag === true) return true;
  const ua = req.headers.get('user-agent') || '';
  const accept = req.headers.get('accept') || '';
  const { isAi } = detectAiCrawler(ua, accept);
  if (isAi) return true;
  return /bot|crawler|spider|headless|curl|wget|python-requests|httpx|aiohttp/i.test(ua);
}

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const wantsPage = sp.get('page') === '1';
  const stampParam = sp.get('stamp') || undefined;
  const wantsStats = sp.get('stats') === '1';
  const accept = req.headers.get('accept') || '';
  const ua = req.headers.get('user-agent') || '';
  const { isAi } = detectAiCrawler(ua, accept);

  if (isAi && !wantsStats) {
    recordAgentBagIssued();
  }

  if (wantsPage) {
    return new NextResponse(renderSwagPageHtml(stampParam), {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  }

  if (wantsStats || accept.includes('application/json')) {
    return NextResponse.json(getSwagStats(), {
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  }

  return new NextResponse(renderSwagBagAscii() + '\n', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

export async function POST(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const openParam = sp.get('open');
  const signParam = sp.get('sign');

  let body: Record<string, unknown> = {};
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    body = {};
  }

  const isBot = isAutomatedRequest(req, body.webdriver === true);

  if (openParam) {
    const res = openOrClaimSwagBag(openParam, isBot);
    return NextResponse.json(res.data, { status: res.status });
  }

  if (signParam) {
    const res = signSwagGuestbook(signParam, body.human, body.agent, isBot);
    return NextResponse.json(res.data, { status: res.status });
  }

  return NextResponse.json({ error: 'Missing ?open= or ?sign= parameter' }, { status: 400 });
}
