// app/api/unlock/route.ts
import { tokens } from '@/lib/tokens';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token || typeof token !== 'string') {
    return new NextResponse('Invalid token', { status: 400 });
  }

  const data = tokens[token];
  if (!data) {
    return new NextResponse('Token not found', { status: 404 });
  }

  const { slug, host } = data;

  // ABSOLUTE URL (bukan relative)
  const redirectUrl = `${req.nextUrl.origin}/game/${slug}/unlocked/${host}`;
  return NextResponse.redirect(redirectUrl, 302);
}
