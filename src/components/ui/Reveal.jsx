'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Smooth scroll-reveal wrapper.
 * variant: up | down | left | right | zoom | fade
 * delay: milliseconds, use it to stagger siblings.
 */
export default function Reveal({
  as: Tag = 'div',
  variant = 'up',
  delay = 0,
  once = true,
  className = '',
  style,
  children,
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref}
      style={{ '--reveal-delay': `${delay}ms`, ...style }}
      className={`reveal reveal-${variant} ${visible ? 'is-visible' : ''} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
