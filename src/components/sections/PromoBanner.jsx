import Image from "next/image";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";

export default function PromoBanner({ data }) {
  const caps = data.eyebrowStyle === "caps";

  return (
    <section className="py-3 sm:py-5">
      <Reveal variant="up">
        <div
          className="group relative isolate w-screen left-1/2 -translate-x-1/2 overflow-hidden"
          style={{ background: data.background }}
        >
          {/* Full-width image (desktop/tablet) */}
          <div className="absolute inset-y-0 right-0 hidden w-[58vw] sm:block">
            <div className="fade-left-sm absolute inset-0">
              <Image
                src={data.image}
                alt={data.imageAlt}
                fill
                sizes="100vw"
                className="object-cover object-right"
              />
            </div>
          </div>

          <div className="mx-auto max-w-[1320px] px-3 sm:px-5 lg:px-8">
            <div className="relative sm:min-h-[400px]">
              <div className="relative z-10 flex flex-col justify-center px-3 pb-2 pt-9 sm:max-w-[48%] sm:px-9 sm:py-16 lg:pl-8">
                <p
                  className={
                    caps
                      ? "text-xs font-medium uppercase tracking-[0.24em] text-espresso-700 sm:text-sm"
                      : "text-lg font-medium text-espresso-700 sm:text-xl"
                  }
                >
                  {data.eyebrow}
                </p>
                <h2 className="mt-3 text-[2.7rem] leading-[1.04] text-espresso sm:text-5xl lg:text-[4.2rem]">
                  {data.titleLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h2>
                <p className="mt-3 text-base text-espresso-700 sm:text-lg">
                  {data.text}
                </p>
                <div className="mt-7">
                  <Button href={data.cta.href} variant="dark" size="md">
                    {data.cta.label}
                    <Icon name="arrowRight" size={16} className="text-gold" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile image */}
          <div className="relative h-64 sm:hidden">
            <div className="fade-left-sm absolute inset-0">
              <Image
                src={data.image}
                alt={data.imageAlt}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
