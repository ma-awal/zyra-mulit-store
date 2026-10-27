'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getCategory, getBestSellers, products } from '@/lib/products';
import { formatPrice } from '@/lib/format';
import Icon from '@/components/ui/Icon';

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    setQuery('');
    const timer = setTimeout(() => inputRef.current?.focus(), 80);
    return () => clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return getBestSellers();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (getCategory(p.category)?.name || '').toLowerCase().includes(q)
    );
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] animate-fade-in" role="dialog" aria-modal="true" aria-label="Search products">
      <div className="absolute inset-0 bg-night/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative mx-auto mt-4 w-[calc(100%-1.5rem)] max-w-xl animate-sheet-in overflow-hidden rounded-3xl bg-cream-50 shadow-lift sm:mt-20">
        <div className="flex items-center gap-3 border-b border-cream-200 px-5">
          <Icon name="search" size={20} className="text-gold-dark" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search earrings, bags, watches..."
            aria-label="Search products"
            className="h-16 flex-1 bg-transparent text-espresso placeholder:text-espresso-400 focus:outline-none"
          />
          <button type="button" onClick={onClose} aria-label="Close search" className="rounded-full p-2 text-espresso-500 hover:bg-gold-soft">
            <Icon name="close" size={18} />
          </button>
        </div>

        <div className="max-h-[62vh] overflow-y-auto p-3">
          <p className="px-3 pb-2 pt-1 text-xs font-medium uppercase tracking-[0.18em] text-espresso-400">
            {query.trim() ? `${results.length} result${results.length === 1 ? '' : 's'}` : 'Best sellers'}
          </p>
          {results.length === 0 ? (
            <p className="px-3 py-10 text-center text-espresso-500">
              Nothing matches “{query}”. Try another word or{' '}
              <Link href="/shop" onClick={onClose} className="font-semibold text-gold-dark underline">
                browse the shop
              </Link>
              .
            </p>
          ) : (
            <ul>
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/product/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-4 rounded-2xl p-2 transition hover:bg-gold-soft/60"
                  >
                    <span className="relative h-16 w-14 shrink-0 overflow-hidden rounded-xl bg-cream-100">
                      <Image src={product.image} alt="" fill sizes="56px" className="object-cover" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium">{product.name}</span>
                      <span className="block text-sm text-espresso-500">{getCategory(product.category)?.name}</span>
                    </span>
                    <span className="font-semibold">{formatPrice(product.price)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Link
          href={query.trim() ? `/shop?q=${encodeURIComponent(query.trim())}` : '/shop'}
          onClick={onClose}
          className="flex items-center justify-center gap-2 border-t border-cream-200 py-4 text-sm font-semibold text-gold-dark transition hover:bg-gold-soft/60"
        >
          {query.trim() ? 'See all results' : 'Shop all products'}
          <Icon name="arrowRight" size={15} />
        </Link>
      </div>
    </div>
  );
}
