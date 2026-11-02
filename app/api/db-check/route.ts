import { NextResponse } from 'next/server';
import { getPublishedPosts } from '@/lib/posts';

export const dynamic = 'force-dynamic';

export async function GET() {
  const result = await getPublishedPosts(1);

  if (result !== null) {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: false }, { status: 503 });
}
