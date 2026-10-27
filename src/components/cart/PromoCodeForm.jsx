'use client';

import { useState } from 'react';
import site from '@/data/site.json';
import { useStore } from '@/context/StoreContext';
import Icon from '@/components/ui/Icon';

export default function PromoCodeForm() {
  const { promo, applyPromo, clearPromo } = useStore();
  const [code, setCode] = useState('');
  const [feedback, setFeedback] = useState(null); // { ok, message }

  if (promo) {
    return (
      <div className="flex items-center justify-between rounded-2xl bg-gold-soft px-4 py-3 text-sm">
        <span className="flex items-center gap-2 font-semibold text-gold-deep">
          <Icon name="tag" size={16} /> {promo} applied
        </span>
        <button type="button" onClick={clearPromo} className="font-medium text-espresso-500 underline hover:text-espresso">
          Remove
        </button>
      </div>
    );
  }

  const submit = (event) => {
    event.preventDefault();
    if (!code.trim()) return;
    const result = applyPromo(code);
    setFeedback(result);
    if (result.ok) setCode('');
  };

  return (
    <form onSubmit={submit}>
      <label htmlFor="promo-code" className="text-sm font-semibold">
        Promo code
      </label>
      <div className="mt-2 flex gap-2">
        <input
          id="promo-code"
          value={code}
          onChange={(event) => {
            setCode(event.target.value);
            setFeedback(null);
          }}
          placeholder={`Try ${site.promoCodes[0].code}`}
          autoCapitalize="characters"
          className="min-w-0 flex-1 rounded-full border border-cream-300 bg-cream-50 px-4 py-3 uppercase placeholder:normal-case placeholder:text-espresso-400 focus:border-gold focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-full bg-espresso px-5 text-sm font-semibold text-cream transition hover:bg-espresso-700"
        >
          Apply
        </button>
      </div>
      {feedback && (
        <p className={`mt-2 text-sm ${feedback.ok ? 'text-olive' : 'text-red-700'}`} role="status">
          {feedback.message}
        </p>
      )}
    </form>
  );
}
