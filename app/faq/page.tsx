import { Metadata } from 'next';
import { HelpCircle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | All FAQs | Disaster Recovery',
  description: 'Find answers to all your questions about disaster recovery, water damage, fire restoration, mould removal, insurance claims, and emergency response.' };

export default function FAQIndexPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
        icon: <HelpCircle className="h-12 w-12" />,
        title: 'Frequently Asked Questions',
        subtitle: 'Get answers to common disaster recovery questions',
      }}
      cta={{ text: 'Get Help Now', href: '/claim/start' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'FAQ' },
      ]}
    />
  );
}
