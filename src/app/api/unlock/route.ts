import { tokens } from '@/lib/tokens';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token || typeof token !== 'string') {
    return new NextResponse('Invalid token', { status: 400 });
  }

  const tokenData = tokens[token];
  if (!tokenData) {
    return new NextResponse('Token not found', { status: 404 });
  }

  const { slug, host } = tokenData;

  const redirectUrl = `https://getthatgame-ssg.vercel.app/game/${slug}/unlocked/${host}`;

  // ✅ Set cookie tapi dengan nama unik berdasarkan slug dan host
  const cookieName = `unlock_${slug}_${host}`;
  const response = NextResponse.redirect(redirectUrl, 302);

  response.cookies.set(cookieName, token, {
    path: `/game/${slug}/unlocked/${host}`,
    maxAge: 60 * 10, // 10 menit
    httpOnly: false, // masih bisa dibaca client
  });

  return response;
}
