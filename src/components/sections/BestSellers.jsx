import Link from 'next/link';
import { getBestSellers } from '@/lib/products';
import Container from '@/components/ui/Container';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';
import ProductCard from '@/components/shop/ProductCard';

export default function BestSellers({ data }) {
  const items = getBestSellers();

  return (
    <section className="py-10 sm:py-14">
      <Container>
        <Reveal variant="up" className="flex items-end justify-between gap-4">
          <h2 className="text-4xl sm:text-5xl">{data.title}</h2>
          <Link
            href={data.linkHref}
            className="group mb-1.5 flex items-center gap-2 text-sm font-semibold transition-colors hover:text-gold-dark"
          >
            {data.linkLabel}
            <Icon name="arrowRight" size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <ul className="no-scrollbar -mx-4 mt-7 flex snap-x gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-5">
          {items.map((product, index) => (
            <li key={product.id} className="w-[64%] shrink-0 snap-start sm:w-auto">
              <Reveal variant="up" delay={index * 100} className="h-full">
                <ProductCard product={product} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
