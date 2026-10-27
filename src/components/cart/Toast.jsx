'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import Icon from '@/components/ui/Icon';

export default function Toast() {
  const { toast, dismissToast } = useStore();

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(dismissToast, 3000);
    return () => clearTimeout(timer);
  }, [toast, dismissToast]);

  if (!toast) return null;

  return (
    <div
      key={toast.key}
      role="status"
      className="fixed bottom-24 left-1/2 z-[80] flex w-[calc(100%-2rem)] max-w-sm animate-toast-in items-center gap-3 rounded-2xl bg-night px-4 py-3 text-sm text-cream shadow-lift lg:bottom-8"
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold text-espresso">
        <Icon name="check" size={16} strokeWidth={2.6} />
      </span>
      <span className="flex-1 leading-snug">{toast.message}</span>
      {toast.action && (
        <Link href={toast.action.href} onClick={dismissToast} className="font-semibold text-gold hover:underline">
          {toast.action.label}
        </Link>
      )}
    </div>
  );
}
