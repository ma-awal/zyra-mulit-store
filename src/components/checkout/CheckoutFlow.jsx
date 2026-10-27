'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import checkout from '@/data/checkout.json';
import site from '@/data/site.json';
import { useStore } from '@/context/StoreContext';
import { formatPrice } from '@/lib/format';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import EmptyState from '@/components/ui/EmptyState';
import OrderSummary from '@/components/cart/OrderSummary';
import StepIndicator from '@/components/checkout/StepIndicator';
import OrderPlaced from '@/components/checkout/OrderPlaced';

const emptyShipping = Object.fromEntries(checkout.shippingFields.map((f) => [f.name, '']));
const emptyCard = { number: '', expiry: '', cvv: '' };

const fieldClass = (invalid) =>
  `mt-1.5 w-full rounded-2xl border bg-cream-50 px-4 py-3.5 text-espresso placeholder:text-espresso-400 transition focus:outline-none ${
    invalid ? 'border-red-400 focus:border-red-500' : 'border-cream-300 focus:border-gold'
  }`;

function validateShipping(values) {
  const errors = {};
  checkout.shippingFields.forEach((field) => {
    const value = values[field.name].trim();
    if (!value) {
      errors[field.name] = `${field.label} is required.`;
      return;
    }
    if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errors[field.name] = 'Enter a valid email address.';
    }
    if (field.type === 'tel' && value.replace(/\D/g, '').length < 7) {
      errors[field.name] = 'Enter a valid phone number.';
    }
    if (field.name === 'postalCode' && value.length < 3) {
      errors[field.name] = 'Enter a valid postal code.';
    }
  });
  return errors;
}

function validateCard(card) {
  const errors = {};
  const digits = card.number.replace(/\D/g, '');
  if (digits.length < 13 || digits.length > 19) errors.number = 'Enter a valid card number.';

  const match = card.expiry.match(/^(\d{2})\/(\d{2})$/);
  if (!match) {
    errors.expiry = 'Use MM/YY.';
  } else {
    const month = Number(match[1]);
    const year = 2000 + Number(match[2]);
    const now = new Date();
    const expired = year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth() + 1);
    if (month < 1 || month > 12 || expired) errors.expiry = 'This card has expired.';
  }

  if (!/^\d{3,4}$/.test(card.cvv)) errors.cvv = 'Enter 3 or 4 digits.';
  return errors;
}

function Field({ field, value, error, onChange }) {
  return (
    <label className={`block text-sm font-medium ${field.span === 2 ? 'sm:col-span-2' : ''}`}>
      {field.label}
      <input
        name={field.name}
        type={field.type}
        value={value}
        onChange={onChange}
        autoComplete={field.autoComplete}
        placeholder={field.placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${field.name}-error` : undefined}
        className={fieldClass(error)}
      />
      {error && (
        <span id={`${field.name}-error`} className="mt-1 block text-xs font-normal text-red-700">
          {error}
        </span>
      )}
    </label>
  );
}

export default function CheckoutFlow() {
  const { hydrated, lines, totals, promo, placeOrder } = useStore();
  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState(emptyShipping);
  const [shippingErrors, setShippingErrors] = useState({});
  const [method, setMethod] = useState('card');
  const [card, setCard] = useState(emptyCard);
  const [cardErrors, setCardErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending
  const [apiError, setApiError] = useState('');
  const [placed, setPlaced] = useState(null);
  const topRef = useRef(null);
  const firstRender = useRef(true);

  // Scroll to the top of the form when the step changes (not on first load).
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [step]);

  const methodLabel = useMemo(() => checkout.paymentMethods.find((m) => m.id === method)?.label, [method]);

  if (!hydrated && !placed) return <div className="min-h-[50vh]" aria-busy="true" />;

  if (!placed && lines.length === 0) {
    return (
      <EmptyState
        icon="bag"
        title="Nothing to check out yet"
        text="Your cart is empty. Add something you love first."
        action={{ label: 'Start Shopping', href: '/shop' }}
      />
    );
  }

  const updateShipping = (event) => {
    const { name, value } = event.target;
    setShipping((prev) => ({ ...prev, [name]: value }));
    setShippingErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const goToPayment = (event) => {
    event.preventDefault();
    const errors = validateShipping(shipping);
    setShippingErrors(errors);
    if (Object.keys(errors).length === 0) setStep(2);
  };

  const updateCard = (event) => {
    const { name, value } = event.target;
    let next = value;
    if (name === 'number') {
      next = value.replace(/\D/g, '').slice(0, 19).replace(/(.{4})/g, '$1 ').trim();
    } else if (name === 'expiry') {
      const digits = value.replace(/\D/g, '').slice(0, 4);
      next = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
    } else if (name === 'cvv') {
      next = value.replace(/\D/g, '').slice(0, 4);
    }
    setCard((prev) => ({ ...prev, [name]: next }));
    setCardErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const confirmPayment = async (event) => {
    event.preventDefault();
    setApiError('');

    if (method === 'card') {
      const errors = validateCard(card);
      setCardErrors(errors);
      if (Object.keys(errors).length > 0) return;
    }

    setStatus('sending');
    try {
      // Card details stay in the browser and are never sent anywhere.
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: shipping,
          payment: methodLabel,
          items: lines.map((l) => ({ id: l.id, name: l.name, price: l.price, qty: l.qty, color: l.color })),
          totals,
        }),
      });
      if (!response.ok) throw new Error('Order failed');
      const data = await response.json();

      const order = {
        id: data.orderId,
        placedAt: new Date().toISOString(),
        estimatedDelivery: site.shipping.estimate,
        items: lines.map((l) => ({
          id: l.id,
          slug: l.slug,
          name: l.name,
          price: l.price,
          qty: l.qty,
          color: l.color,
          image: l.image,
        })),
        totals,
        promo,
        shipping,
        payment: methodLabel,
      };
      placeOrder(order);
      setPlaced(order);
      setStep(3);
    } catch (error) {
      setApiError('We could not place your order. Please try again.');
    } finally {
      setStatus('idle');
    }
  };

  return (
    <section className="pb-12 pt-6 sm:pt-10">
      <Container>
        <div ref={topRef} className="scroll-mt-28" />

        {step === 3 && placed ? (
          <OrderPlaced order={placed} />
        ) : (
          <>
            <div className="flex items-center gap-3">
              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  aria-label="Back to shipping"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-100 transition hover:bg-gold-soft"
                >
                  <Icon name="arrowLeft" size={18} />
                </button>
              )}
              <h1 className="text-4xl sm:text-5xl">{step === 1 ? 'Checkout' : 'Payment Method'}</h1>
            </div>

            <div className="mt-6 max-w-2xl">
              <StepIndicator steps={checkout.steps} current={step} />
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
              <div>
                {step === 1 && (
                  <form onSubmit={goToPayment} noValidate className="animate-fade-up space-y-6">
                    <h2 className="text-2xl">Shipping Address</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {checkout.shippingFields.map((field) => (
                        <Field
                          key={field.name}
                          field={field}
                          value={shipping[field.name]}
                          error={shippingErrors[field.name]}
                          onChange={updateShipping}
                        />
                      ))}
                    </div>
                    <Button type="submit" size="lg" className="w-full sm:w-auto sm:min-w-[280px]">
                      Continue to Payment
                      <Icon name="arrowRight" size={18} />
                    </Button>
                  </form>
                )}

                {step === 2 && (
                  <form onSubmit={confirmPayment} noValidate className="animate-fade-up space-y-5">
                    <fieldset>
                      <legend className="sr-only">Payment method</legend>
                      <div className="space-y-3" role="radiogroup">
                        {checkout.paymentMethods.map((option) => {
                          const selected = method === option.id;
                          return (
                            <label
                              key={option.id}
                              className={`flex cursor-pointer items-center gap-4 rounded-2xl border-2 px-4 py-4 transition-all duration-300 ${
                                selected ? 'border-gold bg-gold-soft/60 shadow-soft' : 'border-cream-200 bg-cream-50 hover:border-gold/50'
                              }`}
                            >
                              <input
                                type="radio"
                                name="payment"
                                value={option.id}
                                checked={selected}
                                onChange={() => setMethod(option.id)}
                                className="sr-only"
                              />
                              <span
                                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                                  selected ? 'border-gold-dark' : 'border-espresso/25'
                                }`}
                                aria-hidden="true"
                              >
                                {selected && <span className="h-3 w-3 rounded-full bg-gold-dark" />}
                              </span>
                              <span className="flex-1 font-medium">{option.label}</span>
                              {option.badges && (
                                <span className="flex gap-1">
                                  {option.badges.map((badge) => (
                                    <span key={badge} className="rounded bg-white px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-espresso-500 ring-1 ring-cream-300">
                                      {badge}
                                    </span>
                                  ))}
                                </span>
                              )}
                              {option.badge && <span className="text-sm font-bold italic text-espresso-500">{option.badge}</span>}
                              {option.icon && <Icon name={option.icon} size={22} className="text-espresso-400" />}
                            </label>
                          );
                        })}
                      </div>
                    </fieldset>

                    {method === 'card' ? (
                      <div className="grid animate-fade-up gap-4 sm:grid-cols-2">
                        <label className="block text-sm font-medium sm:col-span-2">
                          Card Number
                          <input
                            name="number"
                            value={card.number}
                            onChange={updateCard}
                            inputMode="numeric"
                            autoComplete="cc-number"
                            placeholder="1234 5678 9012 3456"
                            aria-invalid={Boolean(cardErrors.number)}
                            className={fieldClass(cardErrors.number)}
                          />
                          {cardErrors.number && <span className="mt-1 block text-xs font-normal text-red-700">{cardErrors.number}</span>}
                        </label>
                        <label className="block text-sm font-medium">
                          Expiry Date
                          <input
                            name="expiry"
                            value={card.expiry}
                            onChange={updateCard}
                            inputMode="numeric"
                            autoComplete="cc-exp"
                            placeholder="MM/YY"
                            aria-invalid={Boolean(cardErrors.expiry)}
                            className={fieldClass(cardErrors.expiry)}
                          />
                          {cardErrors.expiry && <span className="mt-1 block text-xs font-normal text-red-700">{cardErrors.expiry}</span>}
                        </label>
                        <label className="block text-sm font-medium">
                          CVV
                          <input
                            name="cvv"
                            value={card.cvv}
                            onChange={updateCard}
                            inputMode="numeric"
                            autoComplete="cc-csc"
                            placeholder="123"
                            aria-invalid={Boolean(cardErrors.cvv)}
                            className={fieldClass(cardErrors.cvv)}
                          />
                          {cardErrors.cvv && <span className="mt-1 block text-xs font-normal text-red-700">{cardErrors.cvv}</span>}
                        </label>
                      </div>
                    ) : (
                      <p className="animate-fade-up rounded-2xl bg-cream-100 px-4 py-4 text-sm text-espresso-500">
                        {method === 'cod'
                          ? `Pay ${formatPrice(totals.total)} in cash when your order arrives.`
                          : `Confirm below to place your order with ${methodLabel}.`}
                      </p>
                    )}

                    {apiError && (
                      <p role="alert" className="flex items-start gap-2 rounded-2xl bg-red-50 p-3 text-sm text-red-700">
                        <Icon name="warning" size={16} className="mt-0.5 shrink-0" /> {apiError}
                      </p>
                    )}

                    <Button type="submit" size="lg" className="w-full sm:w-auto sm:min-w-[280px]" disabled={status === 'sending'}>
                      {status === 'sending' ? 'Processing...' : `Confirm Payment · ${formatPrice(totals.total)}`}
                    </Button>
                    <p className="flex items-center gap-2 text-xs text-espresso-500">
                      <Icon name="lock" size={13} /> Your payment details are never stored.
                    </p>
                  </form>
                )}
              </div>

              <aside className="h-fit space-y-3 lg:sticky lg:top-28">
                <OrderSummary lines={lines} totals={totals} promo={promo} />
                <Link href="/cart" className="block text-center text-sm font-medium underline underline-offset-4 hover:text-gold-dark">
                  Edit Cart
                </Link>
              </aside>
            </div>
          </>
        )}
      </Container>
    </section>
  );
}
