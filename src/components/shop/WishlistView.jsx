'use client';

import { useStore } from '@/context/StoreContext';
import { getProductById } from '@/lib/products';
import Container from '@/components/ui/Container';
import EmptyState from '@/components/ui/EmptyState';
import Reveal from '@/components/ui/Reveal';
import ProductCard from '@/components/shop/ProductCard';

export default function WishlistView() {
  const { hydrated, wishlist } = useStore();
  const items = wishlist.map(getProductById).filter(Boolean);

  if (!hydrated) return <div className="min-h-[40vh]" aria-busy="true" />;

  if (items.length === 0) {
    return (
      <EmptyState
        icon="heart"
        title="Your wishlist is empty"
        text="Tap the heart on any product to save it here."
        action={{ label: 'Explore the Shop', href: '/shop' }}
      />
    );
  }

  return (
    <Container className="pb-12">
      <ul className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {items.map((product, index) => (
          <li key={product.id} className="h-full">
            <Reveal variant="up" delay={(index % 5) * 80} className="h-full">
              <ProductCard product={product} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Container>
  );
}
