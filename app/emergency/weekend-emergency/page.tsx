import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Weekend Emergency Response | Saturday & Sunday | $2200 Minimum + $750 Surcharge',
  description: 'Immediate weekend disaster recovery when you need it most. 30 minutes response time. Available Saturday & Sunday. Insurance approved.',
  keywords: ["weekend emergency","saturday disaster recovery","sunday emergency service"]
};

export default function WeekendEmergencyResponsePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #D93025 50%, #B91C1C 100%)',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'Weekend Emergency Response',
        subtitle: 'Insurance Covered',
      }}
      cta={{ text: 'Emergency Response Now', href: '/claim/start' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Emergency', href: '/emergency' },
        { label: 'Weekend Emergency Response' },
      ]}
    />
  );
}
