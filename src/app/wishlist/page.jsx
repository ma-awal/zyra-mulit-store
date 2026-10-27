import PageHeader from '@/components/ui/PageHeader';
import WishlistView from '@/components/shop/WishlistView';

export const metadata = { title: 'Wishlist' };

export default function WishlistPage() {
  return (
    <>
      <PageHeader eyebrow="Saved for later" title="Your Wishlist" />
      <div className="pt-8 sm:pt-12">
        <WishlistView />
      </div>
    </>
  );
}
