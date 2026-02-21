import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Commercial Buildings Disaster Recovery | Offices, shops, warehouses | Australia',
  description: 'Specialised disaster recovery for commercial buildings. Offices, shops, warehouses. Insurance approved, 24/7 response.' };

export default function CommercialBuildingsPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Commercial Buildings Disaster Recovery',
        subtitle: 'Offices, shops, warehouses',
      }}
      cta={{ text: 'Get Assessment', href: '/quote' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Property Types', href: '/property-types' },
        { label: 'Commercial Buildings Disaster Recovery' },
      ]}
    />
  );
}
