import site from '@/data/site.json';

const round2 = (n) => Math.round(n * 100) / 100;

export function findPromo(code) {
  if (!code) return null;
  const clean = String(code).trim().toLowerCase();
  return site.promoCodes.find((p) => p.code.toLowerCase() === clean) || null;
}

/**
 * subtotal: sum of item prices.
 * Shipping is free for orders over `freeOver` (before discount).
 */
export function computeTotals(subtotal, promoCode) {
  const promo = findPromo(promoCode);
  const discount = promo ? round2((subtotal * promo.percent) / 100) : 0;
  const shipping = subtotal === 0 || subtotal >= site.shipping.freeOver ? 0 : site.shipping.fee;
  const total = round2(subtotal - discount + shipping);
  return { subtotal: round2(subtotal), discount, shipping, total, promo };
}
