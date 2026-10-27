import Image from 'next/image';
import checkout from '@/data/checkout.json';
import site from '@/data/site.json';
import Button from '@/components/ui/Button';

export default function OrderPlaced({ order }) {
  const content = checkout.placed;

  return (
    <div className="mx-auto max-w-xl text-center">
      <span className="mx-auto flex h-20 w-20 animate-pop items-center justify-center rounded-full bg-gold shadow-glow">
        <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="#1D1710" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12.5l4.5 4.5L19 7.5" strokeDasharray="60" className="animate-draw" />
        </svg>
      </span>

      <h1 className="mt-6 text-4xl sm:text-5xl">{content.title}</h1>
      <p className="mt-3 text-espresso-500">{content.text}</p>
      <p className="text-espresso-500">
        Your order number is <strong className="text-espresso">#{order.id}</strong>
      </p>

      <div className="mt-7 rounded-3xl bg-cream-100 px-6 py-5">
        <p className="text-sm text-espresso-500">Estimated Delivery</p>
        <p className="mt-1 text-xl font-semibold">{order.estimatedDelivery || site.shipping.estimate}</p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button href="/order" size="lg" className="sm:min-w-[220px]">
          View Order Details
        </Button>
        <Button href="/shop" size="lg" variant="outline">
          Continue Shopping
        </Button>
      </div>

      <div className="relative mx-auto mt-10 aspect-[4/3] max-w-md overflow-hidden rounded-[28px] shadow-soft">
        <Image src={content.image} alt={content.imageAlt} fill sizes="(min-width: 640px) 448px, 100vw" className="object-cover" />
      </div>
    </div>
  );
}
