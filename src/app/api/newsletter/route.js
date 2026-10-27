import { NextResponse } from 'next/server';

/** Receives newsletter sign-ups. Logs them for now; connect Mailchimp / Klaviyo etc. to go live. */
export async function POST(request) {
  try {
    const body = await request.json();
    if (!body?.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }
    console.log('[newsletter signup]', body.email);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}
