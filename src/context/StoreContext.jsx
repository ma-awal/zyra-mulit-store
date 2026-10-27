'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getProductById } from '@/lib/products';
import { computeTotals, findPromo } from '@/lib/pricing';

const StoreContext = createContext(null);
const STORAGE_KEY = 'zyra-store-v1';

export const lineKey = (id, color) => `${id}__${color}`;

export function StoreProvider({ children }) {
  const [lines, setLines] = useState([]); // [{ id, color, qty }]
  const [wishlist, setWishlist] = useState([]); // [productId]
  const [promo, setPromo] = useState(null); // promo code string
  const [lastOrder, setLastOrder] = useState(null);
  const [toast, setToast] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  // Load everything saved in the browser, once.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (Array.isArray(saved.lines)) {
          setLines(saved.lines.filter((l) => l && getProductById(l.id) && l.qty > 0));
        }
        if (Array.isArray(saved.wishlist)) {
          setWishlist(saved.wishlist.filter((id) => getProductById(id)));
        }
        if (saved.promo && findPromo(saved.promo)) setPromo(saved.promo);
        if (saved.lastOrder) setLastOrder(saved.lastOrder);
      }
    } catch (error) {
      // Ignore corrupted storage.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ lines, wishlist, promo, lastOrder }));
    } catch (error) {
      // Storage can be unavailable (private mode).
    }
  }, [lines, wishlist, promo, lastOrder, hydrated]);

  const showToast = useCallback((message, action) => {
    setToast({ key: Date.now(), message, action });
  }, []);
  const dismissToast = useCallback(() => setToast(null), []);

  const addItem = useCallback(
    (productId, { color, qty = 1, silent = false } = {}) => {
      const product = getProductById(productId);
      if (!product) return;
      const chosen = color || product.defaultColor || product.colors[0].name;
      setLines((prev) => {
        const found = prev.find((l) => l.id === productId && l.color === chosen);
        if (found) return prev.map((l) => (l === found ? { ...l, qty: l.qty + qty } : l));
        return [...prev, { id: productId, color: chosen, qty }];
      });
      if (!silent) showToast(`${product.name} added to cart`, { label: 'View cart', href: '/cart' });
    },
    [showToast]
  );

  const setQty = useCallback((key, qty) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => lineKey(l.id, l.color) !== key)
        : prev.map((l) => (lineKey(l.id, l.color) === key ? { ...l, qty: Math.min(qty, 20) } : l))
    );
  }, []);

  const removeLine = useCallback((key) => {
    setLines((prev) => prev.filter((l) => lineKey(l.id, l.color) !== key));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const toggleWishlist = useCallback(
    (productId) => {
      const product = getProductById(productId);
      setWishlist((prev) => {
        const exists = prev.includes(productId);
        if (product) {
          showToast(exists ? 'Removed from wishlist' : `${product.name} saved to wishlist`, exists ? undefined : { label: 'View', href: '/wishlist' });
        }
        return exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      });
    },
    [showToast]
  );

  const applyPromo = useCallback((code) => {
    const found = findPromo(code);
    if (!found) return { ok: false, message: 'That code is not valid.' };
    setPromo(found.code);
    return { ok: true, message: `Code ${found.code} applied: ${found.percent}% off.` };
  }, []);
  const clearPromo = useCallback(() => setPromo(null), []);

  const placeOrder = useCallback((order) => {
    setLastOrder(order);
    setLines([]);
    setPromo(null);
  }, []);
  const updateOrder = useCallback((patch) => {
    setLastOrder((prev) => (prev ? { ...prev, ...patch } : prev));
  }, []);

  const detailedLines = useMemo(
    () =>
      lines.map((l) => ({
        ...getProductById(l.id),
        key: lineKey(l.id, l.color),
        color: l.color,
        qty: l.qty,
      })),
    [lines]
  );
  const itemCount = useMemo(() => lines.reduce((sum, l) => sum + l.qty, 0), [lines]);
  const subtotal = useMemo(() => detailedLines.reduce((sum, l) => sum + l.price * l.qty, 0), [detailedLines]);
  const totals = useMemo(() => computeTotals(subtotal, promo), [subtotal, promo]);

  const value = useMemo(
    () => ({
      hydrated,
      lines: detailedLines,
      itemCount,
      subtotal,
      totals,
      promo,
      wishlist,
      lastOrder,
      toast,
      addItem,
      setQty,
      removeLine,
      clearCart,
      toggleWishlist,
      applyPromo,
      clearPromo,
      placeOrder,
      updateOrder,
      showToast,
      dismissToast,
    }),
    [
      hydrated,
      detailedLines,
      itemCount,
      subtotal,
      totals,
      promo,
      wishlist,
      lastOrder,
      toast,
      addItem,
      setQty,
      removeLine,
      clearCart,
      toggleWishlist,
      applyPromo,
      clearPromo,
      placeOrder,
      updateOrder,
      showToast,
      dismissToast,
    ]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used inside <StoreProvider>');
  return context;
}
