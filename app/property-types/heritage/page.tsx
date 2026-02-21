import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Heritage Buildings Disaster Recovery | Protected and historical properties | Australia',
  description: 'Specialised disaster recovery for heritage buildings. Protected and historical properties. Insurance approved, 24/7 response.' };

export default function HeritageBuildingsPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Heritage Buildings Disaster Recovery',
        subtitle: 'Protected and historical properties',
      }}
      cta={{ text: 'Get Assessment', href: '/quote' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Property Types', href: '/property-types' },
        { label: 'Heritage Buildings Disaster Recovery' },
      ]}
    />
  );
}
