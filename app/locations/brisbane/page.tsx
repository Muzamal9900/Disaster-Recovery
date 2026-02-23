import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getLocationSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';
import { LocationSchemaWrapper } from '@/components/seo/LocationSchemaWrapper';

export const metadata: Metadata = {
  title: 'Disaster Recovery Brisbane | 24/7 Emergency Restoration QLD',
  description: 'Professional disaster recovery services in Brisbane, Queensland. IICRC-certified contractors for water damage, fire damage, mould remediation. 24/7 emergency response.',
};

export default function BrisbaneLocationPage() {
  return (
    <>
      <LocationSchemaWrapper
        city="Brisbane"
        state="QLD"
        stateFullName="Queensland"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Locations', href: '/locations' },
          { label: 'Brisbane' },
        ]}
      />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
          icon: <MapPin className="h-12 w-12" />,
          title: 'Disaster Recovery Brisbane',
          subtitle: '24/7 Emergency Services in Brisbane',
        }}
        cta={{ text: 'Emergency Response', href: '/claim/start' }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Locations', href: '/locations' },
          { label: 'Brisbane' },
        ]}
        sections={getLocationSections({ city: 'Brisbane', state: 'QLD' })}
        relatedPages={getRelatedPages('location-brisbane')}
      />
    </>
  );
}
