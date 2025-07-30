import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('unlock_token')?.value;

  console.log('✅ Middleware aktif! Path:', pathname);

  if (pathname.includes('/unlocked/')) {
    if (!token) {
      console.log('⛔ Tidak ada token. Redirect ke /unauthorized');
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/game/(.*)/unlocked/(.*)"],
};

