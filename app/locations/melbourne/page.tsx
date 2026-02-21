import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getLocationSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';



export default function MelbourneLocationPage() {
  return (
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
  );
}
