import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Residential Home Disaster Recovery | Residential Properties | $2200 Minimum',
  description: 'Complete disaster recovery for houses, townhouses, and residential properties. 30-60 minutes response. 95% insurance coverage.',
  keywords: ["residential disaster recovery","home restoration","house water damage"]
};

export default function ResidentialHomePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Residential Home Disaster Recovery',
        subtitle: 'Insurance Coverage',
      }}
      cta={{ text: 'Get Assessment', href: '/quote' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Property Types', href: '/property-types' },
        { label: 'Residential Home Disaster Recovery' },
      ]}
    />
  );
}
