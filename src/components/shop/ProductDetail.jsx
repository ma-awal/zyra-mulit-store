'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import site from '@/data/site.json';
import { getCategory } from '@/lib/products';
import { formatPrice } from '@/lib/format';
import { useStore } from '@/context/StoreContext';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import Stars from '@/components/ui/Stars';
import QtyStepper from '@/components/ui/QtyStepper';
import WishlistButton from '@/components/shop/WishlistButton';

export default function ProductDetail({ product }) {
  const router = useRouter();
  const { addItem } = useStore();
  const [color, setColor] = useState(product.defaultColor || product.colors[0].name);
  const [qty, setQty] = useState(1);
  const category = getCategory(product.category);

  const add = () => addItem(product.id, { color, qty });
  const buyNow = () => {
    addItem(product.id, { color, qty, silent: true });
    router.push('/checkout');
  };

  return (
    <section className="pb-8 pt-6 sm:pt-10">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-2 text-sm text-espresso-500">
          <Link href="/shop" className="hover:text-gold-dark">
            Shop
          </Link>
          <Icon name="chevronRight" size={14} />
          <Link href={`/shop?category=${product.category}`} className="hover:text-gold-dark">
            {category?.name}
          </Link>
        </nav>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="relative mx-auto aspect-[7/8] w-full max-w-xl overflow-hidden rounded-[28px] bg-cream-100 shadow-soft lg:max-w-none">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <WishlistButton productId={product.id} productName={product.name} size="lg" className="absolute right-4 top-4" />
          </div>

          <div className="flex flex-col">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-espresso-500">{category?.name}</p>
            <h1 className="mt-2 text-4xl leading-tight sm:text-5xl">{product.name}</h1>

            <div className="mt-4 flex items-center gap-3 text-sm text-espresso-500">
              <Stars rating={product.rating} size={16} />
              <span>
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <p className="mt-5 text-3xl font-bold">{formatPrice(product.price)}</p>
            <p className="mt-4 max-w-lg leading-relaxed text-espresso-500">{product.description}</p>

            <fieldset className="mt-7">
              <legend className="text-sm font-semibold">
                Color: <span className="font-normal text-espresso-500">{color}</span>
              </legend>
              <div className="mt-3 flex gap-3" role="radiogroup" aria-label="Color">
                {product.colors.map((option) => (
                  <button
                    key={option.name}
                    type="button"
                    role="radio"
                    aria-checked={color === option.name}
                    aria-label={option.name}
                    onClick={() => setColor(option.name)}
                    className={`flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      color === option.name ? 'border-gold-dark scale-110' : 'border-transparent hover:border-espresso/20'
                    }`}
                  >
                    <span className="block h-7 w-7 rounded-full ring-1 ring-espresso/15" style={{ backgroundColor: option.hex }} />
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-7 flex items-center gap-4">
              <span className="text-sm font-semibold">Quantity</span>
              <QtyStepper value={qty} onChange={setQty} label={product.name} />
            </div>

            <div className="mt-8 hidden gap-3 sm:flex">
              <Button type="button" size="lg" className="flex-1" onClick={add}>
                <Icon name="cart" size={18} /> Add to Cart
              </Button>
              <Button type="button" size="lg" variant="dark" className="flex-1" onClick={buyNow}>
                Buy Now
              </Button>
            </div>

            <ul className="mt-8 grid gap-3 rounded-3xl bg-cream-100 p-5 text-sm">
              <li className="flex items-center gap-3">
                <Icon name="truck" size={20} className="text-gold-dark" />
                Free shipping on orders over {formatPrice(site.shipping.freeOver)}
              </li>
              <li className="flex items-center gap-3">
                <Icon name="refresh" size={20} className="text-gold-dark" />
                Easy 30-day returns
              </li>
              <li className="flex items-center gap-3">
                <Icon name="shield" size={20} className="text-gold-dark" />
                100% secure checkout
              </li>
            </ul>

            <div className="mt-6 divide-y divide-cream-200 border-y border-cream-200">
              <details className="group py-4" open>
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
                  Product details
                  <Icon name="chevronDown" size={18} className="transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-espresso-500">
                  {product.details.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </details>
              <details className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
                  Shipping & returns
                  <Icon name="chevronDown" size={18} className="transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-espresso-500">
                  Delivery in {site.shipping.estimate}. Free shipping over {formatPrice(site.shipping.freeOver)}, otherwise{' '}
                  {formatPrice(site.shipping.fee)}. Returns accepted within 30 days.{' '}
                  <Link href="/terms#returns" className="font-semibold text-gold-dark underline">
                    Read the policy
                  </Link>
                </p>
              </details>
            </div>
          </div>
        </div>
      </Container>

      {/* Sticky action bar on phones */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-cream-200 bg-cream-50/95 px-4 pt-3 backdrop-blur-xl sm:hidden"
        style={{ paddingBottom: 'calc(12px + env(safe-area-inset-bottom, 0px))' }}
      >
        <div className="flex items-center gap-3">
          <div>
            <p className="text-xs text-espresso-500">Total</p>
            <p className="text-xl font-bold leading-none">{formatPrice(product.price * qty)}</p>
          </div>
          <Button type="button" size="lg" className="flex-1" onClick={add}>
            <Icon name="cart" size={18} /> Add to Cart
          </Button>
        </div>
      </div>
    </section>
  );
}
