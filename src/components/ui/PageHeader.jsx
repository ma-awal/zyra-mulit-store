import Container from '@/components/ui/Container';

export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <section className="px-3 pt-3 sm:px-5 lg:px-8">
      <div className="relative isolate mx-auto max-w-[1320px] overflow-hidden rounded-[28px] bg-gradient-to-br from-cream-50 via-cream-100 to-gold-soft py-12 text-center sm:rounded-[36px] sm:py-16">
        <div className="pointer-events-none absolute -right-16 -top-20 -z-10 h-64 w-64 animate-float rounded-full bg-gold/25 blur-3xl" />
        <Container>
          {eyebrow && (
            <p className="animate-fade-up text-xs font-medium uppercase tracking-[0.22em] text-espresso-500">{eyebrow}</p>
          )}
          <h1
            className="mt-2 animate-fade-up font-display text-4xl leading-tight text-espresso sm:text-5xl lg:text-6xl"
            style={{ animationDelay: '100ms' }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className="mx-auto mt-3 max-w-xl animate-fade-up text-base text-espresso-500 sm:text-lg"
              style={{ animationDelay: '200ms' }}
            >
              {subtitle}
            </p>
          )}
        </Container>
      </div>
    </section>
  );
}
