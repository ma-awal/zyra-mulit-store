'use client';

import Image from 'next/image';
import Link from 'next/link';
import site from '@/data/site.json';
import { useStore } from '@/context/StoreContext';
import { formatPrice } from '@/lib/format';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import EmptyState from '@/components/ui/EmptyState';
import QtyStepper from '@/components/ui/QtyStepper';
import PromoCodeForm from '@/components/cart/PromoCodeForm';

export default function CartView() {
  const { hydrated, lines, itemCount, subtotal, totals, setQty, removeLine, promo } = useStore();

  if (!hydrated) {
    return <div className="min-h-[50vh]" aria-busy="true" />;
  }

  if (lines.length === 0) {
    return (
      <EmptyState
        icon="bag"
        title="Your cart is empty"
        text="Add a few small details and make your look complete."
        action={{ label: 'Start Shopping', href: '/shop' }}
      />
    );
  }

  const remaining = Math.max(0, site.shipping.freeOver - subtotal);
  const progress = Math.min(100, (subtotal / site.shipping.freeOver) * 100);

  return (
    <section className="pb-10 pt-6 sm:pt-10">
      <Container>
        <div className="flex items-end justify-between">
          <h1 className="text-4xl sm:text-5xl">
            Cart <span className="text-espresso-400">({itemCount})</span>
          </h1>
          <Link href="/shop" className="hidden text-sm font-semibold underline underline-offset-4 hover:text-gold-dark sm:block">
            Continue Shopping
          </Link>
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.55fr_1fr] lg:gap-10">
          <div>
            <div className="rounded-3xl bg-gold-soft/70 px-5 py-4 text-sm">
              {remaining > 0 ? (
                <p>
                  Add <strong>{formatPrice(remaining)}</strong> more for free shipping.
                </p>
              ) : (
                <p className="flex items-center gap-2 font-semibold text-gold-deep">
                  <Icon name="truck" size={17} /> You have free shipping!
                </p>
              )}
              <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/70">
                <div
                  className="h-full rounded-full bg-gold transition-all duration-700 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <ul className="mt-4 space-y-3">
              {lines.map((line) => (
                <li
                  key={line.key}
                  className="flex gap-4 rounded-3xl border border-cream-200 bg-cream-50 p-3 shadow-soft sm:p-4"
                >
                  <Link
                    href={`/product/${line.slug}`}
                    className="relative h-28 w-24 shrink-0 overflow-hidden rounded-2xl bg-cream-100 sm:h-32 sm:w-28"
                  >
                    <Image src={line.image} alt={line.name} fill sizes="112px" className="object-cover" />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link href={`/product/${line.slug}`} className="block truncate font-medium hover:text-gold-dark">
                          {line.name}
                        </Link>
                        <p className="mt-0.5 text-sm text-espresso-500">Color: {line.color}</p>
                        <p className="mt-1 font-bold">{formatPrice(line.price)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeLine(line.key)}
                        aria-label={`Remove ${line.name}`}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-espresso-400 transition hover:bg-red-50 hover:text-red-700"
                      >
                        <Icon name="trash" size={17} />
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-3">
                      <QtyStepper value={line.qty} onChange={(next) => setQty(line.key, next)} label={line.name} />
                      <p className="font-semibold">{formatPrice(line.price * line.qty)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <aside className="h-fit space-y-5 rounded-3xl border border-cream-200 bg-cream-50 p-5 shadow-soft sm:p-7 lg:sticky lg:top-28">
            <PromoCodeForm />

            <dl className="space-y-3 border-t border-cream-200 pt-5 text-[15px]">
              <div className="flex justify-between text-espresso-500">
                <dt>Subtotal</dt>
                <dd className="font-medium text-espresso">{formatPrice(totals.subtotal)}</dd>
              </div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-olive">
                  <dt>Discount ({promo})</dt>
                  <dd className="font-medium">-{formatPrice(totals.discount)}</dd>
                </div>
              )}
              <div className="flex justify-between text-espresso-500">
                <dt>Shipping</dt>
                <dd className="font-medium text-espresso">{totals.shipping === 0 ? 'Free' : formatPrice(totals.shipping)}</dd>
              </div>
              <div className="flex justify-between border-t border-cream-200 pt-4 text-xl font-bold">
                <dt>Total</dt>
                <dd>{formatPrice(totals.total)}</dd>
              </div>
            </dl>

            <Button href="/checkout" size="lg" className="w-full">
              Proceed to Checkout
              <Icon name="arrowRight" size={18} />
            </Button>
            <Link href="/shop" className="block text-center text-sm font-medium underline underline-offset-4 hover:text-gold-dark">
              Continue Shopping
            </Link>
            <p className="flex items-center justify-center gap-2 text-xs text-espresso-500">
              <Icon name="lock" size={13} /> Secure checkout
            </p>
          </aside>
        </div>
      </Container>
    </section>
  );
}
