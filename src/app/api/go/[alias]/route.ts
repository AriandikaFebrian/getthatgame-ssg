// app/api/go/[alias]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { shortlinks } from '@/lib/shortlinks';

const PRIORITY: ('shrinkme' | 'linkvertise')[] = [
  'shrinkme',
  'linkvertise',
];

export async function GET(
  _req: NextRequest,
  { params }: { params: { alias: string } }
) {
  const alias = params.alias;

  const linkGroup = shortlinks[alias];
  if (!linkGroup) {
    return new NextResponse('Alias not found', { status: 404 });
  }

  for (const provider of PRIORITY) {
    const url = linkGroup[provider];
    if (url) {
      return NextResponse.redirect(url, 302);
    }
  }

  return new NextResponse('No valid shortlink found for alias', { status: 404 });
}
