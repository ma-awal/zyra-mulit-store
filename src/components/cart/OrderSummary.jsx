import Image from 'next/image';
import { formatPrice } from '@/lib/format';

/** Read-only list of items + totals. Used in checkout and on the order page. */
export default function OrderSummary({ lines, totals, title = 'Order Summary', promo }) {
  return (
    <div className="rounded-3xl border border-cream-200 bg-cream-50 p-5 shadow-soft sm:p-6">
      <h2 className="text-2xl">{title}</h2>

      <ul className="mt-4 divide-y divide-cream-200">
        {lines.map((line) => (
          <li key={line.key || `${line.id}-${line.color}`} className="flex items-center gap-3 py-3">
            <span className="relative h-14 w-12 shrink-0 overflow-hidden rounded-xl bg-cream-100">
              <Image src={line.image} alt="" fill sizes="48px" className="object-cover" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium">{line.name}</span>
              <span className="block text-xs text-espresso-500">
                {line.color} · Qty {line.qty}
              </span>
            </span>
            <span className="text-sm font-semibold">{formatPrice(line.price * line.qty)}</span>
          </li>
        ))}
      </ul>

      <dl className="mt-3 space-y-2.5 border-t border-cream-200 pt-4 text-[15px]">
        <div className="flex justify-between text-espresso-500">
          <dt>Subtotal</dt>
          <dd className="font-medium text-espresso">{formatPrice(totals.subtotal)}</dd>
        </div>
        {totals.discount > 0 && (
          <div className="flex justify-between text-olive">
            <dt>Discount{promo ? ` (${promo})` : ''}</dt>
            <dd className="font-medium">-{formatPrice(totals.discount)}</dd>
          </div>
        )}
        <div className="flex justify-between text-espresso-500">
          <dt>Shipping</dt>
          <dd className="font-medium text-espresso">{totals.shipping === 0 ? 'Free' : formatPrice(totals.shipping)}</dd>
        </div>
        <div className="flex justify-between border-t border-cream-200 pt-3 text-lg font-bold">
          <dt>Total</dt>
          <dd>{formatPrice(totals.total)}</dd>
        </div>
      </dl>
    </div>
  );
}
