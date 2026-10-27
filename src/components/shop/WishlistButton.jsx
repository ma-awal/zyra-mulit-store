'use client';

import { useStore } from '@/context/StoreContext';
import Icon from '@/components/ui/Icon';

export default function WishlistButton({ productId, productName = 'item', className = '', size = 'sm' }) {
  const { wishlist, toggleWishlist } = useStore();
  const active = wishlist.includes(productId);
  const box = size === 'lg' ? 'h-12 w-12' : 'h-9 w-9';

  return (
    <button
      type="button"
      onClick={() => toggleWishlist(productId)}
      aria-pressed={active}
      aria-label={active ? `Remove ${productName} from wishlist` : `Save ${productName} to wishlist`}
      className={`flex ${box} items-center justify-center rounded-full bg-white/90 shadow-soft backdrop-blur transition-all duration-300 hover:scale-110 ${
        active ? 'text-gold-dark' : 'text-espresso'
      } ${className}`}
    >
      <Icon name="heart" size={size === 'lg' ? 22 : 17} fill={active ? 'currentColor' : 'none'} />
    </button>
  );
}
