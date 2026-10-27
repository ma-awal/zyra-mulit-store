import Icon from '@/components/ui/Icon';

/** Shows a rating like 4.5 with gold stars (supports halves). */
export default function Stars({ rating = 0, size = 13, className = '' }) {
  const percent = Math.max(0, Math.min(100, (rating / 5) * 100));
  const row = (
    <span className="flex gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <Icon key={i} name="star" size={size} strokeWidth={0} fill="currentColor" />
      ))}
    </span>
  );

  return (
    <span className={`relative inline-flex ${className}`} role="img" aria-label={`Rated ${rating} out of 5`}>
      <span className="text-espresso/15">{row}</span>
      <span className="absolute inset-y-0 left-0 overflow-hidden text-gold" style={{ width: `${percent}%` }}>
        <span className="block w-max">{row}</span>
      </span>
    </span>
  );
}
