import data from '@/data/products.json';

export const categories = data.categories;
export const products = data.products;

export function getProduct(slug) {
  return products.find((p) => p.slug === slug) || null;
}

export function getProductById(id) {
  return products.find((p) => p.id === id) || null;
}

export function getBestSellers() {
  return products.filter((p) => p.bestSeller);
}

export function getCategory(id) {
  return categories.find((c) => c.id === id) || null;
}

export function isValidCategory(id) {
  return categories.some((c) => c.id === id);
}

export function getRelated(product, count = 4) {
  const same = products.filter((p) => p.id !== product.id && p.category === product.category);
  const others = products.filter((p) => p.id !== product.id && p.category !== product.category);
  return [...same, ...others].slice(0, count);
}
