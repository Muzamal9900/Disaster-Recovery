import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getLocationSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';
import { LocationSchemaWrapper } from '@/components/seo/LocationSchemaWrapper';

export const metadata: Metadata = {
  title: 'Disaster Recovery Melbourne | 24/7 Emergency Restoration VIC',
  description: 'Professional disaster recovery services in Melbourne, Victoria. IICRC-certified contractors for water damage, fire damage, mould remediation. 24/7 emergency response.',
};

export default function MelbourneLocationPage() {
  return (
    <>
      <LocationSchemaWrapper
        city="Melbourne"
        state="VIC"
        stateFullName="Victoria"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Locations', href: '/locations' },
          { label: 'Melbourne' },
        ]}
      />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
          icon: <MapPin className="h-12 w-12" />,
          title: 'Disaster Recovery Melbourne',
          subtitle: '24/7 Emergency Services in Melbourne',
        }}
        cta={{ text: 'Emergency Response', href: '/claim/start' }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Locations', href: '/locations' },
          { label: 'Melbourne' },
        ]}
        sections={getLocationSections({ city: 'Melbourne', state: 'VIC' })}
        relatedPages={getRelatedPages('location-melbourne')}
      />
    </>
  );
}
