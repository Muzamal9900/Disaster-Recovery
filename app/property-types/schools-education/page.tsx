import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'School & Education Disaster Recovery | Education Properties | $2200 Minimum',
  description: 'Safe and rapid disaster recovery for schools and educational facilities. 30 minutes response. 100% insurance coverage.',
  keywords: ["school disaster recovery","education facility restoration","classroom flood damage"]
};

export default function SchoolEducationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: 'School & Education Disaster Recovery',
        subtitle: 'Insurance Coverage',
      }}
      cta={{ text: 'Get Assessment', href: '/quote' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Property Types', href: '/property-types' },
        { label: 'School & Education Disaster Recovery' },
      ]}
    />
  );
}
