import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/format';
import Stars from '@/components/ui/Stars';
import ColorDots from '@/components/shop/ColorDots';
import QuickAddButton from '@/components/shop/QuickAddButton';
import WishlistButton from '@/components/shop/WishlistButton';

export default function ProductCard({ product, priority = false }) {
  const href = `/product/${product.slug}`;

  return (
    <article className="group relative flex h-full flex-col rounded-3xl bg-cream-50 p-2.5 shadow-soft ring-1 ring-cream-200/80 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
      <div className="relative aspect-[7/8] overflow-hidden rounded-2xl bg-cream-100">
        <Link href={href} aria-label={product.name} className="absolute inset-0">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 20vw, (min-width: 640px) 30vw, 64vw"
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
          />
        </Link>
        <WishlistButton productId={product.id} productName={product.name} className="absolute right-2.5 top-2.5" />
      </div>

      <div className="flex flex-1 flex-col px-2 pb-1.5 pt-4">
        <h3 className="font-sans text-[15px] font-medium leading-snug">
          <Link href={href} className="transition-colors hover:text-gold-dark">
            {product.name}
          </Link>
        </h3>

        <div className="mt-2 flex items-center justify-between gap-2">
          <p className="text-lg font-bold">{formatPrice(product.price)}</p>
          <QuickAddButton product={product} />
        </div>

        <div className="mt-2 flex items-center gap-2 text-xs text-espresso-500">
          <Stars rating={product.rating} />
          <span>({product.reviews})</span>
        </div>

        <div className="mt-3">
          <ColorDots colors={product.colors} />
        </div>
      </div>
    </article>
  );
}
