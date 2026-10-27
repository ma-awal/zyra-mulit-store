import { NextResponse } from 'next/server';

/** Receives contact form messages. Logs them for now; connect an email service to go live. */
export async function POST(request) {
  try {
    const body = await request.json();
    if (!body?.name || !body?.email || !body?.message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    console.log('[contact message]', JSON.stringify(body));
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}
