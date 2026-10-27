import Image from 'next/image';
import Link from 'next/link';
import { categories } from '@/lib/products';
import Container from '@/components/ui/Container';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';

export default function CategoryRow({ data }) {
  return (
    <section className="py-10 sm:py-14">
      <Container>
        <ul className="no-scrollbar -mx-4 flex snap-x gap-5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-6 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0">
          {categories.map((category, index) => (
            <li key={category.id} className="w-[27%] min-w-[104px] shrink-0 snap-start sm:w-auto sm:min-w-0">
              <Reveal variant="up" delay={index * 80}>
                <Link href={`/shop?category=${category.id}`} className="group flex flex-col items-center text-center">
                  <span className="relative block aspect-square w-full overflow-hidden rounded-full bg-cream-100 ring-1 ring-cream-200 transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-lift group-hover:ring-gold">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="(min-width: 640px) 15vw, 30vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </span>
                  <span className="mt-4 text-[15px] font-semibold">{category.name}</span>
                  <span className="mt-1 flex items-center gap-1.5 text-sm text-espresso-500 transition-colors group-hover:text-gold-dark">
                    {data.linkLabel}
                    <Icon name="arrowRight" size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
