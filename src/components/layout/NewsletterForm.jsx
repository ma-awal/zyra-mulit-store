'use client';

import { useState } from 'react';
import site from '@/data/site.json';
import Icon from '@/components/ui/Icon';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | done | error

  const submit = async (event) => {
    event.preventDefault();
    setStatus('sending');
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error('failed');
      setEmail('');
      setStatus('done');
    } catch (error) {
      setStatus('error');
    }
  };

  if (status === 'done') {
    return (
      <p className="flex items-center gap-2 rounded-2xl border border-gold/40 px-4 py-3 text-sm text-gold">
        <Icon name="success" size={18} /> {site.newsletter.success}
      </p>
    );
  }

  return (
    <form onSubmit={submit} noValidate={false}>
      <div className="flex overflow-hidden rounded-2xl border border-gold/60 bg-white/5 focus-within:border-gold">
        <label className="sr-only" htmlFor="newsletter-email">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={site.newsletter.placeholder}
          autoComplete="email"
          className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-cream placeholder:text-cream/45 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          aria-label="Subscribe"
          className="flex w-14 items-center justify-center bg-gold text-espresso transition hover:bg-gold-light disabled:opacity-60"
        >
          <Icon name="arrowRight" size={20} />
        </button>
      </div>
      {status === 'error' && <p className="mt-2 text-sm text-red-300">Something went wrong. Please try again.</p>}
    </form>
  );
}
