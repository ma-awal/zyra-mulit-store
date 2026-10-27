'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import site from '@/data/site.json';
import { categories } from '@/lib/products';
import { useStore } from '@/context/StoreContext';
import Icon from '@/components/ui/Icon';
import Logo from '@/components/ui/Logo';
import SearchOverlay from '@/components/layout/SearchOverlay';

function isActive(pathname, href) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

function Badge({ count }) {
  if (!count) return null;
  return (
    <span
      key={count}
      className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] animate-pop items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-espresso"
    >
      {count}
    </span>
  );
}

export default function Header() {
  const pathname = usePathname();
  const { itemCount, wishlist } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const iconButton =
    'relative flex h-10 w-10 items-center justify-center rounded-full text-espresso transition-colors hover:bg-gold-soft';

  return (
    <>
      <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5 lg:px-8">
        <div
          className={`relative mx-auto flex h-16 max-w-[1320px] items-center justify-between rounded-2xl border px-3 transition-all duration-500 sm:px-6 lg:h-[72px] lg:px-8 ${
            scrolled
              ? 'border-cream-200 bg-cream-50/90 shadow-soft backdrop-blur-xl'
              : 'border-transparent bg-cream-50/70 backdrop-blur-md'
          }`}
        >
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className={`${iconButton} lg:hidden`}
          >
            <Icon name="menu" size={22} />
          </button>

          <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
            <Logo />
          </div>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-10">
              {site.nav.map((item) => {
                const active = item.dropdown ? false : isActive(pathname, item.href);
                return (
                  <li key={item.label} className="group relative">
                    <Link
                      href={item.href}
                      className="relative flex items-center gap-1 py-2 text-[15px] font-medium text-espresso transition-colors hover:text-gold-dark"
                    >
                      {item.label}
                      {item.dropdown && (
                        <Icon name="chevronDown" size={14} className="transition-transform duration-300 group-hover:rotate-180" />
                      )}
                      <span
                        className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-gold transition-all duration-300 ${
                          active ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      />
                    </Link>

                    {item.dropdown === 'categories' && (
                      <div className="invisible absolute left-1/2 top-full w-[340px] -translate-x-1/2 translate-y-2 pt-4 opacity-0 transition-all duration-300 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                        <div className="grid grid-cols-2 gap-1 rounded-3xl border border-cream-200 bg-cream-50 p-3 shadow-lift">
                          {categories.map((category) => (
                            <Link
                              key={category.id}
                              href={`/shop?category=${category.id}`}
                              className="flex items-center gap-3 rounded-2xl p-2 transition hover:bg-gold-soft/70"
                            >
                              <span className="relative h-10 w-10 overflow-hidden rounded-full bg-cream-100">
                                <Image src={category.image} alt="" fill sizes="40px" className="object-cover" />
                              </span>
                              <span className="text-sm font-medium">{category.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-0.5 sm:gap-1">
            <button type="button" onClick={() => setSearchOpen(true)} aria-label="Search products" className={iconButton}>
              <Icon name="search" size={20} />
            </button>
            <Link href="/wishlist" aria-label={`Wishlist, ${wishlist.length} saved`} className={`${iconButton} hidden lg:flex`}>
              <Icon name="heart" size={20} />
              <Badge count={wishlist.length} />
            </Link>
            <Link href="/order" aria-label="Your orders" className={`${iconButton} hidden lg:flex`}>
              <Icon name="user" size={20} />
            </Link>
            <Link href="/cart" aria-label={`Cart, ${itemCount} item${itemCount === 1 ? '' : 's'}`} className={iconButton}>
              <Icon name="cart" size={20} />
              <Badge count={itemCount} />
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile menu sheet (kept outside the header so blur does not break fixed positioning) */}
      <div
        className={`fixed inset-0 z-[65] transition-[visibility] duration-500 lg:hidden ${menuOpen ? 'visible' : 'invisible'}`}
        aria-hidden={!menuOpen}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-night/50 backdrop-blur-sm transition-opacity duration-500 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
        />
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={`absolute left-0 top-0 flex h-full w-[88%] max-w-sm flex-col overflow-y-auto bg-cream-50 px-6 pb-8 pt-5 shadow-lift transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between">
            <Logo />
            <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu" className={iconButton}>
              <Icon name="close" size={22} />
            </button>
          </div>

          <nav aria-label="Mobile" className="mt-8">
            <ul>
              {site.nav
                .filter((item) => !item.dropdown)
                .map((item) => (
                  <li key={item.label} className="border-b border-cream-200">
                    <Link
                      href={item.href}
                      className={`flex items-center justify-between py-4 font-display text-3xl ${
                        isActive(pathname, item.href) ? 'text-gold-dark' : 'text-espresso'
                      }`}
                    >
                      {item.label}
                      <Icon name="arrowRight" size={20} className="text-espresso-400" />
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>

          <p className="mb-3 mt-8 text-xs font-medium uppercase tracking-[0.2em] text-espresso-400">Categories</p>
          <ul className="grid grid-cols-2 gap-2">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/shop?category=${category.id}`}
                  className="flex items-center gap-3 rounded-2xl bg-cream-100 p-2 pr-3 transition active:bg-gold-soft"
                >
                  <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                    <Image src={category.image} alt="" fill sizes="40px" className="object-cover" />
                  </span>
                  <span className="text-sm font-medium">{category.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-8 text-sm text-espresso-500">
            <p>{site.contact.email}</p>
            <p>{site.contact.phone}</p>
          </div>
        </aside>
      </div>

      <SearchOverlay open={searchOpen} onClose={closeSearch} />
    </>
  );
}
