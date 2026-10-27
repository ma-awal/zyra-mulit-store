import Link from 'next/link';

const variants = {
  gold: 'bg-gold text-espresso shadow-glow hover:-translate-y-0.5 hover:bg-gold-light',
  dark: 'bg-espresso text-cream hover:-translate-y-0.5 hover:bg-espresso-700',
  outline: 'border border-espresso/20 bg-transparent text-espresso hover:border-gold hover:bg-gold-soft',
  light: 'bg-cream-50 text-espresso hover:bg-gold-soft',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-[15px]',
  lg: 'px-8 py-4 text-base',
};

export default function Button({
  href,
  variant = 'gold',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-300 active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
