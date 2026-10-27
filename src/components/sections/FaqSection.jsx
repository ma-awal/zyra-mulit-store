"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";

export default function FaqSection({ data }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="px-3 py-12 sm:px-5 sm:py-16 lg:px-8">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal variant="up">
          <div className="lg:sticky lg:top-28">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-espresso-700 sm:text-sm">
              {data.eyebrow}
            </p>
            <h2 className="mt-3 text-[2.4rem] leading-[1.08] text-espresso sm:text-5xl">
              {data.title}
            </h2>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-espresso-500 sm:text-lg">
              {data.text}
            </p>
          </div>
        </Reveal>

        <div className="space-y-3">
          {data.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <Reveal key={item.question} variant="up">
                <div
                  className={`rounded-2xl border bg-white transition-all duration-300 ${
                    isOpen
                      ? "border-gold/60 shadow-[0_10px_30px_-12px_rgba(242,176,30,0.35)]"
                      : "border-gold/15"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                  >
                    <span className="font-sans text-base font-semibold text-espresso sm:text-lg">
                      {item.question}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                        isOpen
                          ? "bg-gold text-espresso"
                          : "bg-cream-50 text-espresso-700"
                      }`}
                    >
                      <Icon name={isOpen ? "minus" : "plus"} size={16} />
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-espresso-500 sm:px-6 sm:pb-6">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
