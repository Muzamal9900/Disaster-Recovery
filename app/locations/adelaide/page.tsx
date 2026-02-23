import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getLocationSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';
import { LocationSchemaWrapper } from '@/components/seo/LocationSchemaWrapper';

export const metadata: Metadata = {
  title: 'Disaster Recovery Adelaide | 24/7 Emergency Restoration SA',
  description: 'Professional disaster recovery services in Adelaide, South Australia. IICRC-certified contractors for water damage, fire damage, mould remediation. 24/7 emergency response.',
};

export default function AdelaideLocationPage() {
  return (
    <>
      <LocationSchemaWrapper
        city="Adelaide"
        state="SA"
        stateFullName="South Australia"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Locations', href: '/locations' },
          { label: 'Adelaide' },
        ]}
      />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
          icon: <MapPin className="h-12 w-12" />,
          title: 'Disaster Recovery Adelaide',
          subtitle: '24/7 Emergency Services in Adelaide',
        }}
        cta={{ text: 'Emergency Response', href: '/claim/start' }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Locations', href: '/locations' },
          { label: 'Adelaide' },
        ]}
        sections={getLocationSections({ city: 'Adelaide', state: 'SA' })}
        relatedPages={getRelatedPages('location-adelaide')}
      />
    </>
  );
}
