'use client';

import { useEffect, useMemo, useState } from 'react';
import { categories, getCategory, isValidCategory, products } from '@/lib/products';
import Container from '@/components/ui/Container';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import ProductCard from '@/components/shop/ProductCard';

const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Top Rated' },
];

export default function ShopBrowser({ initialCategory = 'all', initialQuery = '' }) {
  const safeCategory = isValidCategory(initialCategory) ? initialCategory : 'all';
  const [category, setCategory] = useState(safeCategory);
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState('featured');

  // Keep in sync when links elsewhere (header, footer) change the URL.
  useEffect(() => setCategory(safeCategory), [safeCategory]);
  useEffect(() => setQuery(initialQuery), [initialQuery]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter((p) => {
      const inCategory = category === 'all' || p.category === category;
      const matches =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (getCategory(p.category)?.name || '').toLowerCase().includes(q);
      return inCategory && matches;
    });
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    return list;
  }, [category, query, sort]);

  const chips = [{ id: 'all', name: 'All' }, ...categories];
  const activeCategory = getCategory(category);

  return (
    <section className="py-8 sm:py-12">
      <Container>
        <div className="sticky top-[76px] z-30 -mx-4 bg-cream-50/90 px-4 py-3 backdrop-blur-xl sm:static sm:mx-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
          <div role="tablist" aria-label="Categories" className="no-scrollbar flex gap-2 overflow-x-auto sm:flex-wrap">
            {chips.map((chip) => (
              <button
                key={chip.id}
                type="button"
                role="tab"
                aria-selected={category === chip.id}
                onClick={() => setCategory(chip.id)}
                className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  category === chip.id
                    ? 'bg-espresso text-cream shadow-soft'
                    : 'bg-cream-100 text-espresso hover:bg-gold-soft'
                }`}
              >
                {chip.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:items-center sm:justify-between">
          <label className="relative block sm:w-80">
            <span className="sr-only">Search products</span>
            <Icon name="search" size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-espresso-400" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products..."
              className="w-full rounded-full border border-cream-300 bg-cream-50 py-3 pl-11 pr-4 placeholder:text-espresso-400 focus:border-gold focus:outline-none"
            />
          </label>

          <div className="flex items-center justify-between gap-4 sm:justify-end">
            <p className="text-sm text-espresso-500">
              {visible.length} product{visible.length === 1 ? '' : 's'}
            </p>
            <label className="relative">
              <span className="sr-only">Sort products</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="appearance-none rounded-full border border-cream-300 bg-cream-50 py-2.5 pl-4 pr-10 text-sm font-medium focus:border-gold focus:outline-none"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
              <Icon name="chevronDown" size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-espresso-500" />
            </label>
          </div>
        </div>

        {visible.length === 0 ? (
          <div className="mx-auto flex max-w-md flex-col items-center py-16 text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gold-soft text-gold-dark">
              <Icon name="sparkle" size={32} strokeWidth={1.6} />
            </span>
            <h2 className="mt-6 text-3xl">
              {query.trim() ? 'No products found' : 'New arrivals coming soon'}
            </h2>
            <p className="mt-2 text-espresso-500">
              {query.trim()
                ? 'Try a different word or clear your search.'
                : `We are adding more ${activeCategory ? activeCategory.name.toLowerCase() : 'products'} soon. Meanwhile, explore the rest of the collection.`}
            </p>
            <Button
              type="button"
              size="lg"
              className="mt-7"
              onClick={() => {
                setCategory('all');
                setQuery('');
              }}
            >
              View all products
            </Button>
          </div>
        ) : (
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {visible.map((product, index) => (
              <li key={`${category}-${query}-${sort}-${product.id}`} className="h-full">
                <Reveal variant="up" delay={(index % 5) * 80} className="h-full">
                  <ProductCard product={product} />
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
