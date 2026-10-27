import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <section className="py-24 text-center">
      <Container>
        <p className="font-display text-8xl text-gold">404</p>
        <h1 className="mt-2 text-4xl sm:text-5xl">This page is out of style</h1>
        <p className="mt-3 text-espresso-500">The page you are looking for does not exist or has moved.</p>
        <Button href="/" size="lg" className="mt-8">
          Back to Home
        </Button>
      </Container>
    </section>
  );
}
