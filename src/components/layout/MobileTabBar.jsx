'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import site from '@/data/site.json';
import { useStore } from '@/context/StoreContext';
import Icon from '@/components/ui/Icon';

function isActive(pathname, href) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function MobileTabBar() {
  const pathname = usePathname();
  const { itemCount, wishlist } = useStore();

  // Checkout and product pages have their own sticky action bar.
  if (pathname.startsWith('/checkout') || pathname.startsWith('/product/')) return null;

  const counts = { cart: itemCount, heart: wishlist.length };

  return (
    <nav
      aria-label="Quick navigation"
      className="fixed inset-x-3 z-40 rounded-3xl bg-night/95 px-2 py-2 text-cream shadow-lift backdrop-blur-xl lg:hidden"
      style={{ bottom: 'calc(12px + env(safe-area-inset-bottom, 0px))' }}
    >
      <ul className="grid grid-cols-5">
        {site.tabBar.map((tab) => {
          const active = isActive(pathname, tab.href);
          const count = counts[tab.icon];
          return (
            <li key={tab.label}>
              <Link
                href={tab.href}
                aria-current={active ? 'page' : undefined}
                className={`relative flex flex-col items-center gap-1 rounded-2xl py-2 text-[11px] font-medium transition-colors ${
                  active ? 'text-gold' : 'text-cream/70'
                }`}
              >
                <span className="relative">
                  <Icon name={tab.icon} size={22} strokeWidth={active ? 2.2 : 1.8} />
                  {count > 0 && (
                    <span className="absolute -right-2 -top-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-gold px-1 text-[9px] font-bold text-espresso">
                      {count}
                    </span>
                  )}
                </span>
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
