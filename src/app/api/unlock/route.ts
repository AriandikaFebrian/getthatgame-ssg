// /app/api/unlock/route.ts atau /app/api/unlock/[token]/route.ts
import { tokens } from '@/lib/tokens';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token || typeof token !== 'string') {
    return new NextResponse('Invalid token', { status: 400 });
  }

  const data = tokens[token]; // 🔐 Validasi token
  if (!data) {
    return new NextResponse('Token not found', { status: 404 });
  }

  const { slug, host } = data;
  const redirectUrl = `https://getthatgame-ssg.vercel.app/game/${slug}/unlocked/${host}`;

  const response = NextResponse.redirect(redirectUrl, 302);
  response.cookies.set('unlock_token', token, {
    path: '/',
    maxAge: 60 * 10, // 10 menit
    httpOnly: false, // ✅ Kalau perlu dibaca di client, tetap false
  });

  return response;
}
