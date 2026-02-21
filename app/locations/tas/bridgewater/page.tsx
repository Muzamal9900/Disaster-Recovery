import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Disaster Recovery Bridgewater | Emergency Services Tasmania',
  description: '24/7 disaster recovery in Bridgewater, Tasmania. Water damage, fire restoration, mould removal. Call Online Form Available 24/7.' };

export default function BridgewaterPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Disaster Recovery Bridgewater',
        subtitle: '24/7 Emergency Services in Bridgewater',
      }}
      cta={{ text: 'Emergency Response', href: '/claim/start' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Locations', href: '/locations' },
        { label: 'TAS', href: '/locations/tas' },
        { label: 'Bridgewater' },
      ]}
    />
  );
}
