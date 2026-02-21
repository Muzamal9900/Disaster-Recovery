import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getLocationSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Service Locations | Disaster Recovery Australia-Wide',
  description: 'Find disaster recovery services across all Australian states and territories. 24/7 emergency response nationwide.',
};

export default function LocationsPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Service Locations',
        subtitle: 'Find disaster recovery services across all Australian states and territories',
      }}
      cta={{ text: 'Emergency Response', href: '/claim/start' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Locations' },
      ]}
      sections={getLocationSections({ city: 'Australia', state: 'National' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
