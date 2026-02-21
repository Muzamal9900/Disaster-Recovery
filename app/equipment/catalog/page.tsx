import { Metadata } from 'next';
import { Settings } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Professional Equipment Catalog | Disaster Recovery Equipment & Specifications',
  description: 'Browse our comprehensive catalog of professional disaster recovery equipment. Detailed specifications, rental pricing, and availability for water damage, fire restoration, and mould remediation equipment.',
  keywords: 'disaster recovery equipment, restoration equipment catalog, industrial dehumidifiers, air scrubbers, thermal imaging cameras, moisture meters, equipment rental Brisbane',
  openGraph: {
    title: 'Professional Disaster Recovery Equipment Catalog',
    description: 'Complete catalog of professional-grade restoration equipment with detailed specifications and rental options.',
    images: ['/images/equipment/catalog-hero.jpg'],
    type: 'website' } };

export default function EquipmentCatalogPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Settings className="h-12 w-12" />,
        title: 'Disaster Recovery Equipment Catalog',
        subtitle: 'State-of-the-art restoration equipment with detailed specifications, technical data, and rental pricing for professional contractors',
      }}
      cta={{ text: 'Learn More', href: '/services' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Equipment', href: '/equipment' },
        { label: 'Disaster Recovery Equipment Catalog' },
      ]}
    />
  );
}
