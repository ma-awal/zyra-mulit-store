import Image from "next/image";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

export default function Hero({ data }) {
  const delay = (ms) => ({ animationDelay: `${ms}ms` });

  return (
    <section className="relative isolate w-screen left-1/2 -translate-x-1/2 overflow-hidden bg-gradient-to-br from-cream-50 via-[#FEF1D6] to-[#FCE2A0]">
      <div className="pointer-events-none absolute -left-24 top-1/3 -z-10 h-72 w-72 animate-float rounded-full bg-gold/20 blur-3xl" />

      {/* Full-width image */}
      <div className="absolute inset-y-0 right-0 hidden w-[62vw] lg:block">
        <div className="hero-fade animate-hero-img absolute inset-0">
          <Image
            src={data.image}
            alt={data.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-right"
          />
        </div>
      </div>

      <div className="mx-auto max-w-[1320px] px-3 sm:px-5 lg:px-8">
        <div className="relative grid lg:min-h-[680px]">
          <div className="relative z-10 flex flex-col justify-center px-3 pb-2 pt-10 sm:px-9 sm:pt-14 lg:max-w-[52%] lg:py-24">
            <p
              className="animate-fade-up text-xs font-medium uppercase tracking-[0.24em] text-espresso-700 sm:text-sm"
              style={delay(100)}
            >
              {data.eyebrow}
            </p>

            <h1 className="mt-4 text-[3rem] leading-[1.02] text-espresso sm:text-6xl lg:text-[5.6rem]">
              {data.titleLines.map((line, index) => (
                <span
                  key={line}
                  className="block animate-fade-up"
                  style={delay(220 + index * 140)}
                >
                  {line}
                </span>
              ))}
            </h1>

            <p
              className="mt-5 max-w-sm animate-fade-up text-base leading-relaxed text-espresso-500 sm:text-lg"
              style={delay(560)}
            >
              {data.description}
            </p>

            <div className="mt-8 animate-fade-up" style={delay(700)}>
              <Button href={data.cta.href} size="lg">
                {data.cta.label}
                <Icon name="arrowRight" size={18} />
              </Button>
            </div>
          </div>

          {/* Mobile/tablet image */}
          <div className="relative -mx-3 min-h-[360px] sm:-mx-5 sm:min-h-[480px] lg:hidden">
            <div className="hero-fade animate-hero-img absolute inset-0">
              <Image
                src={data.image}
                alt={data.imageAlt}
                fill
                priority
                sizes="100vw"
                className="object-cover object-[50%_12%]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
