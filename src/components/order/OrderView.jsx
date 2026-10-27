'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import orderContent from '@/data/order.json';
import { useStore } from '@/context/StoreContext';
import { formatDate, formatPrice } from '@/lib/format';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import EmptyState from '@/components/ui/EmptyState';
import OrderSummary from '@/components/cart/OrderSummary';
import RateModal from '@/components/order/RateModal';

export default function OrderView() {
  const { hydrated, lastOrder, updateOrder } = useStore();
  const [rateOpen, setRateOpen] = useState(false);
  const closeRate = useCallback(() => setRateOpen(false), []);

  if (!hydrated) return <div className="min-h-[50vh]" aria-busy="true" />;

  if (!lastOrder) {
    return (
      <EmptyState
        icon="package"
        title="No orders yet"
        text="When you place an order, you will find it here and can track it."
        action={{ label: 'Start Shopping', href: '/shop' }}
      />
    );
  }

  const { shipping } = lastOrder;
  const rowClass =
    'flex w-full items-center gap-4 rounded-2xl border border-cream-200 bg-cream-50 p-4 text-left shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/60';

  const helpContent = (item) => (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-soft text-gold-deep">
        <Icon name={item.icon} size={20} />
      </span>
      <span className="flex-1">
        <span className="block font-semibold">{item.title}</span>
        <span className="block text-sm text-espresso-500">
          {item.action === 'rate' && lastOrder.rating ? `You rated ${lastOrder.rating} of 5` : item.text}
        </span>
      </span>
      <Icon name="chevronRight" size={18} className="text-espresso-400" />
    </>
  );

  return (
    <section className="pb-12 pt-6 sm:pt-10">
      <Container>
        <h1 className="text-4xl sm:text-5xl">Your Order</h1>
        <p className="mt-2 text-espresso-500">
          Order <strong className="text-espresso">#{lastOrder.id}</strong> · Placed {formatDate(lastOrder.placedAt)}
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
          <div className="space-y-6">
            <ul className="space-y-3">
              {lastOrder.items.map((item) => (
                <li key={`${item.id}-${item.color}`} className="flex gap-4 rounded-3xl border border-cream-200 bg-cream-50 p-3 shadow-soft sm:p-4">
                  <span className="relative h-28 w-24 shrink-0 overflow-hidden rounded-2xl bg-cream-100">
                    <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
                  </span>
                  <div className="flex flex-col justify-center">
                    <p className="font-medium">{item.name}</p>
                    <p className="mt-1 text-lg font-bold">{formatPrice(item.price)}</p>
                    <p className="mt-1 text-sm text-espresso-500">Color: {item.color}</p>
                    <p className="text-sm text-espresso-500">Qty: {item.qty}</p>
                  </div>
                </li>
              ))}
            </ul>

            <Button href="/track" size="lg" className="w-full">
              Track Order
            </Button>

            <ul className="space-y-3">
              {orderContent.help.map((item) => (
                <li key={item.title}>
                  {item.href ? (
                    <Link href={item.href} className={rowClass}>
                      {helpContent(item)}
                    </Link>
                  ) : (
                    <button type="button" onClick={() => setRateOpen(true)} className={rowClass}>
                      {helpContent(item)}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <aside className="space-y-5">
            <OrderSummary
              lines={lastOrder.items}
              totals={lastOrder.totals}
              promo={lastOrder.promo}
              title="Summary"
            />

            <div className="rounded-3xl border border-cream-200 bg-cream-50 p-5 shadow-soft sm:p-6">
              <h2 className="text-2xl">Delivery</h2>
              <address className="mt-3 text-[15px] not-italic leading-relaxed text-espresso-500">
                <span className="block font-medium text-espresso">{shipping.fullName}</span>
                <span className="block">{shipping.address}</span>
                <span className="block">
                  {shipping.city} {shipping.postalCode}
                </span>
                <span className="block">{shipping.phone}</span>
              </address>
              <p className="mt-4 text-sm text-espresso-500">
                Payment: <span className="font-medium text-espresso">{lastOrder.payment}</span>
              </p>
              <p className="text-sm text-espresso-500">
                Estimated delivery: <span className="font-medium text-espresso">{lastOrder.estimatedDelivery}</span>
              </p>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-soft">
              <Image src={orderContent.thanksImage} alt={orderContent.thanksAlt} fill sizes="(min-width: 1024px) 400px, 100vw" className="object-cover" />
            </div>
          </aside>
        </div>
      </Container>

      <RateModal
        open={rateOpen}
        onClose={closeRate}
        initialRating={lastOrder.rating || 0}
        onSubmit={({ rating, review }) => updateOrder({ rating, review })}
      />
    </section>
  );
}
