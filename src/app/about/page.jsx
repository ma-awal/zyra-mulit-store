import Image from "next/image";
import about from "@/data/about.json";
import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";

export const metadata = {
  title: "About",
  description:
    "The story behind Zyra, an accessories store for small details and big style.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title={about.title}
        subtitle={about.subtitle}
      />

      <section className="py-12 sm:py-16">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal variant="left">
            <div className="relative aspect-[4/4] overflow-hidden rounded-[28px] shadow-lift">
              <Image
                src={about.image}
                alt={about.imageAlt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal
            variant="right"
            className="space-y-5 text-lg leading-relaxed text-espresso-500"
          >
            {about.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="pb-12 sm:pb-16">
        <Container>
          <Reveal variant="up">
            <h2 className="text-center text-4xl sm:text-5xl">
              {about.valuesTitle}
            </h2>
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {about.values.map((value, index) => (
              <li key={value.title}>
                <Reveal
                  variant="up"
                  delay={index * 110}
                  className="h-full rounded-3xl border border-cream-200 bg-cream-50 p-6 text-center shadow-soft"
                >
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-soft text-gold-deep">
                    <Icon name={value.icon} size={26} strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-5 font-sans text-lg font-semibold">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-espresso-500">{value.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="px-3 pb-6 sm:px-5 lg:px-8">
        <Reveal variant="zoom">
          <div className="mx-auto max-w-[1320px] rounded-[28px] bg-gradient-to-br from-[#FFEBA6] to-[#FDD053] px-6 py-14 text-center sm:rounded-[36px] sm:py-20">
            <h2 className="mx-auto max-w-2xl text-4xl sm:text-5xl">
              {about.cta.title}
            </h2>
            <Button
              href={about.cta.href}
              variant="dark"
              size="lg"
              className="mt-8"
            >
              {about.cta.label}
              <Icon name="arrowRight" size={18} className="text-gold" />
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
