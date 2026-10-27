import { notFound } from 'next/navigation';
import { getProduct, getRelated, products } from '@/lib/products';
import Container from '@/components/ui/Container';
import Reveal from '@/components/ui/Reveal';
import ProductDetail from '@/components/shop/ProductDetail';
import ProductCard from '@/components/shop/ProductCard';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const product = getProduct(params.slug);
  if (!product) return { title: 'Product not found' };
  return { title: product.name, description: product.description };
}

export default function ProductPage({ params }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const related = getRelated(product, 4);

  return (
    <>
      <ProductDetail product={product} />
      {related.length > 0 && (
        <section className="pb-10 pt-6 sm:pb-16">
          <Container>
            <Reveal variant="up">
              <h2 className="text-3xl sm:text-4xl">You may also like</h2>
            </Reveal>
            <ul className="no-scrollbar -mx-4 mt-6 flex snap-x gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0 sm:pb-0">
              {related.map((item, index) => (
                <li key={item.id} className="w-[64%] shrink-0 snap-start sm:w-auto">
                  <Reveal variant="up" delay={index * 90} className="h-full">
                    <ProductCard product={item} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}
