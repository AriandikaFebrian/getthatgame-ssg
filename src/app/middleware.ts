// middleware.ts (Next.js 13+)

import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const match = pathname.match(/^\/game\/([^/]+)\/unlocked\/([^/]+)/);
  if (match) {
    const [_, slug, host] = match;
    const cookieName = `unlocked_${slug}_${host}`;
    const cookieValue = req.cookies.get(cookieName);

    if (!cookieValue) {
      return NextResponse.redirect(new URL('/403', req.url)); // Redirect ke halaman 403
    }
  }

  return NextResponse.next();
}

// Aktifkan middleware hanya di halaman download
export const config = {
  matcher: ['/game/:slug/unlocked/:host'],
};
