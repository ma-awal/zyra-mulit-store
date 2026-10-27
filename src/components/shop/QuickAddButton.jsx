'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/context/StoreContext';
import Icon from '@/components/ui/Icon';

export default function QuickAddButton({ product }) {
  const { addItem } = useStore();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return undefined;
    const timer = setTimeout(() => setAdded(false), 1300);
    return () => clearTimeout(timer);
  }, [added]);

  return (
    <button
      type="button"
      onClick={() => {
        addItem(product.id);
        setAdded(true);
      }}
      aria-label={`Add ${product.name} to cart`}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-espresso shadow-glow transition-all duration-300 hover:scale-110 hover:bg-gold-light active:scale-95"
    >
      <Icon name={added ? 'check' : 'plus'} size={18} strokeWidth={2.4} />
    </button>
  );
}
