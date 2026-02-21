import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Industrial Facilities Disaster Recovery | Factories and warehouses | Australia',
  description: 'Specialised disaster recovery for industrial facilities. Factories and warehouses. Insurance approved, 24/7 response.' };

export default function IndustrialFacilitiesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Industrial Facilities Disaster Recovery',
        subtitle: 'Factories and warehouses',
      }}
      cta={{ text: 'Get Assessment', href: '/quote' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Property Types', href: '/property-types' },
        { label: 'Industrial Facilities Disaster Recovery' },
      ]}
    />
  );
}
