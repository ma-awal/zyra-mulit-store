import legal from '@/data/legal.json';
import LegalPage from '@/components/layout/LegalPage';

export const metadata = { title: 'Privacy Policy' };

export default function PrivacyPage() {
  return <LegalPage data={legal.privacy} />;
}
