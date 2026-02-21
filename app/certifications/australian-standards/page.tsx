import { Metadata } from 'next';
import { Award } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Australian Standards Compliant | AS/NZS compliance | Disaster Recovery',
  description: 'Australian Standards Compliant restoration services. AS/NZS compliance. Qualified, certified, and compliant disaster recovery.' };

export default function AustralianStandardsCompliantPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #312E81 0%, #4338CA 100%)',
        icon: <Award className="h-12 w-12" />,
        title: 'Australian Standards Compliant',
        subtitle: 'AS/NZS compliance',
      }}
      cta={{ text: 'View Services', href: '/services' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Certifications', href: '/certifications' },
        { label: 'Australian Standards Compliant' },
      ]}
    />
  );
}
