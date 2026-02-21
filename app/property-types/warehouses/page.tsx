import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Warehouse & Storage Disaster Recovery | Industrial Properties | $2200 Minimum',
  description: 'Large-scale disaster recovery for warehouses and storage facilities. 45 minutes response. 100% insurance coverage.',
  keywords: ["warehouse flood recovery","storage facility restoration","industrial damage"]
};

export default function WarehouseStoragePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Warehouse & Storage Disaster Recovery',
        subtitle: 'Insurance Coverage',
      }}
      cta={{ text: 'Get Assessment', href: '/quote' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Property Types', href: '/property-types' },
        { label: 'Warehouse & Storage Disaster Recovery' },
      ]}
    />
  );
}
