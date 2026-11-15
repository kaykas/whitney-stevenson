import { NextResponse, type NextRequest } from 'next/server';
import { detectAiCrawler } from '@/lib/aeo-markdown';

export function middleware(req: NextRequest) {
  if (req.headers.get('x-aeo-internal-fetch') === '1') {
    return NextResponse.next();
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return NextResponse.next();
  }

  const { pathname, searchParams } = req.nextUrl;

  if (pathname.startsWith('/_next') || pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  const swagMatch = pathname.match(/^\/swag(?:\/([a-zA-Z0-9_-]+))?\/?$/);
  if (swagMatch) {
    const rewriteUrl = req.nextUrl.clone();
    rewriteUrl.pathname = '/api/swag';
    rewriteUrl.searchParams.set('page', '1');
    if (swagMatch[1]) {
      rewriteUrl.searchParams.set('stamp', swagMatch[1]);
    }
    return NextResponse.rewrite(rewriteUrl);
  }

  if (pathname.endsWith('.md')) {
    const strippedPath = pathname.slice(0, -3) || '/';
    const rewriteUrl = req.nextUrl.clone();
    rewriteUrl.pathname = '/api/aeo-md';
    rewriteUrl.searchParams.set('path', strippedPath);
    rewriteUrl.searchParams.set('bot', 'dot-md-url');
    return NextResponse.rewrite(rewriteUrl);
  }

  if (/\.[a-zA-Z0-9]+$/.test(pathname)) {
    return NextResponse.next();
  }

  const ua = req.headers.get('user-agent') || '';
  const accept = req.headers.get('accept') || '';
  const formatParam = searchParams.get('format');

  const { isAi, botName } = detectAiCrawler(ua, accept, formatParam);
  if (isAi) {
    const rewriteUrl = req.nextUrl.clone();
    rewriteUrl.pathname = '/api/aeo-md';
    rewriteUrl.searchParams.set('path', pathname);
    rewriteUrl.searchParams.set('bot', botName);
    return NextResponse.rewrite(rewriteUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|llms.txt|llms-full.txt).*)',
  ],
};
