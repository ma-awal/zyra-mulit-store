import { NextResponse } from 'next/server';

/**
 * Receives orders from the checkout page.
 * Card details are never sent here. Right now the order is validated and logged.
 * To go live: save it to a database, send a confirmation email, or push it to WooCommerce / Shopify here.
 */
export async function POST(request) {
  try {
    const body = await request.json();

    const customer = body?.customer;
    const hasCustomer = customer?.fullName && customer?.email && customer?.address && customer?.phone;
    const hasItems = Array.isArray(body?.items) && body.items.length > 0;

    if (!hasCustomer || !hasItems) {
      return NextResponse.json({ error: 'Invalid order' }, { status: 400 });
    }

    const orderId = `ZYR${Math.floor(10000 + Math.random() * 90000)}`;
    console.log('[new order]', orderId, JSON.stringify({ customer, items: body.items, totals: body.totals, payment: body.payment }));

    return NextResponse.json({ orderId });
  } catch (error) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}
