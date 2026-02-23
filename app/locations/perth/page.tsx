import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getLocationSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';
import { LocationSchemaWrapper } from '@/components/seo/LocationSchemaWrapper';

export const metadata: Metadata = {
  title: 'Disaster Recovery Perth | 24/7 Emergency Restoration WA',
  description: 'Professional disaster recovery services in Perth, Western Australia. IICRC-certified contractors for water damage, fire damage, mould remediation. 24/7 emergency response.',
};

export default function PerthLocationPage() {
  return (
    <>
      <LocationSchemaWrapper
        city="Perth"
        state="WA"
        stateFullName="Western Australia"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Locations', href: '/locations' },
          { label: 'Perth' },
        ]}
      />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
          icon: <MapPin className="h-12 w-12" />,
          title: 'Disaster Recovery Perth',
          subtitle: '24/7 Emergency Services in Perth',
        }}
        cta={{ text: 'Emergency Response', href: '/claim/start' }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Locations', href: '/locations' },
          { label: 'Perth' },
        ]}
        sections={getLocationSections({ city: 'Perth', state: 'WA' })}
        relatedPages={getRelatedPages('location-perth')}
      />
    </>
  );
}
