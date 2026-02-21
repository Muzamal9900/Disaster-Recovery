import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'New Year Emergency Service | December 31st - January 1st | $2200 Minimum + $1500 Surcharge',
  description: 'New Year disaster response when others are celebrating. 60 minutes response time. Available December 31st - January 1st. Insurance approved.',
  keywords: ["new year emergency","nye disaster recovery","january 1 emergency"]
};

export default function NewYearEmergencyServicePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #D93025 50%, #B91C1C 100%)',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'New Year Emergency Service',
        subtitle: 'Insurance Covered',
      }}
      cta={{ text: 'Emergency Response Now', href: '/claim/start' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Emergency', href: '/emergency' },
        { label: 'New Year Emergency Service' },
      ]}
    />
  );
}
