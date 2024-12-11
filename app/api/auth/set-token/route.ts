import { NextRequest, NextResponse } from 'next/server';
import { setAuthToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const { token } = await request.json();

  if (!token) {
    return NextResponse.json({ error: 'Token is required' }, { status: 400 });
  }

  await setAuthToken(token);

  return NextResponse.json({ success: true });
}
