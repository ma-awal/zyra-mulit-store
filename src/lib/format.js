import site from '@/data/site.json';

export function formatPrice(value) {
  return `${site.currency}${Number(value).toFixed(2)}`;
}

export function formatDateTime(input) {
  const date = input instanceof Date ? input : new Date(input);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function formatDate(input) {
  const date = input instanceof Date ? input : new Date(input);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
