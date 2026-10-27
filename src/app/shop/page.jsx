import PageHeader from '@/components/ui/PageHeader';
import ShopBrowser from '@/components/shop/ShopBrowser';

export const metadata = {
  title: 'Shop',
  description: 'Shop jewelry, bags, sunglasses, watches, hats and scarves.',
};

export default function ShopPage({ searchParams }) {
  const category = typeof searchParams?.category === 'string' ? searchParams.category : 'all';
  const query = typeof searchParams?.q === 'string' ? searchParams.q : '';

  return (
    <>
      <PageHeader eyebrow="The collection" title="Shop All" subtitle="Small details that make every look feel finished." />
      <ShopBrowser initialCategory={category} initialQuery={query} />
    </>
  );
}
