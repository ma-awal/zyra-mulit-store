'use client';

import Icon from '@/components/ui/Icon';

export default function QtyStepper({ value, onChange, min = 1, max = 20, label = 'item' }) {
  return (
    <div className="inline-flex items-center rounded-full border border-espresso/15 bg-cream-50">
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label={`Decrease ${label} quantity`}
        className="flex h-9 w-9 items-center justify-center rounded-full text-espresso transition hover:bg-gold-soft disabled:opacity-35"
      >
        <Icon name="minus" size={14} />
      </button>
      <span className="min-w-[1.75rem] text-center text-sm font-semibold tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label={`Increase ${label} quantity`}
        className="flex h-9 w-9 items-center justify-center rounded-full text-espresso transition hover:bg-gold-soft disabled:opacity-35"
      >
        <Icon name="plus" size={14} />
      </button>
    </div>
  );
}
