import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";

function Stars({ value, size = 16 }) {
  return (
    <div
      className="flex items-center gap-0.5 text-gold"
      aria-label={`${value} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon
          key={i}
          name="star"
          size={size}
          strokeWidth={1.4}
          fill={i < Math.round(value) ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
}

export default function ReviewsSection({ data }) {
  return (
    <section className="w-screen relative left-1/2 -translate-x-1/2 bg-gradient-to-b from-cream-50 to-[#FEF1D6] py-14 sm:py-20">
      <div className="mx-auto max-w-[1320px] px-3 sm:px-5 lg:px-8">
        <Container>
          <Reveal variant="up">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-espresso-700 sm:text-sm">
                  {data.eyebrow}
                </p>
                <h2 className="mt-3 text-[2.4rem] leading-[1.08] text-espresso sm:text-5xl">
                  {data.title}
                </h2>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-gold/20 bg-white px-5 py-3">
                <span className="font-serif text-4xl text-espresso">
                  {data.rating}
                </span>
                <div>
                  <Stars value={data.rating} />
                  <p className="mt-1 text-sm text-espresso-500">
                    {data.count} happy customers
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="-mx-3 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-3 pb-4 sm:mx-0 sm:px-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0">
            {data.items.map((review) => (
              <Reveal
                key={review.name}
                variant="up"
                className="min-w-[85%] snap-center sm:min-w-[60%] md:min-w-0"
              >
                <article className="relative flex h-full flex-col rounded-3xl border border-gold/15 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(242,176,30,0.45)] sm:p-7">
                  <Icon
                    name="quote"
                    size={30}
                    strokeWidth={1.3}
                    className="text-gold/60"
                  />

                  <Stars value={review.rating} />

                  <p className="mt-4 flex-1 leading-relaxed text-espresso-500">
                    {review.text}
                  </p>

                  <div className="mt-6 flex items-center gap-3 border-t border-gold/15 pt-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/20 font-sans text-sm font-semibold text-espresso">
                      {review.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                    <div className="min-w-0">
                      <p className="font-sans text-sm font-semibold text-espresso">
                        {review.name}
                      </p>
                      <p className="flex items-center gap-1 text-xs text-espresso-500">
                        <Icon name="check" size={12} className="text-gold" />
                        {review.role} · {review.product}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
