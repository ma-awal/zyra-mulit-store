import legal from '@/data/legal.json';
import LegalPage from '@/components/layout/LegalPage';

export const metadata = { title: 'Terms & Conditions' };

export default function TermsPage() {
  return <LegalPage data={legal.terms} />;
}
