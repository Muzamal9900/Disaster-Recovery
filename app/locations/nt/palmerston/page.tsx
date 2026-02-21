import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Disaster Recovery Palmerston | Emergency Services Northern Territory',
  description: '24/7 disaster recovery in Palmerston, Northern Territory. Water damage, fire restoration, mould removal. Call Online Form Available 24/7.' };

export default function PalmerstonPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Disaster Recovery Palmerston',
        subtitle: '24/7 Emergency Services in Palmerston',
      }}
      cta={{ text: 'Emergency Response', href: '/claim/start' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Locations', href: '/locations' },
        { label: 'NT', href: '/locations/nt' },
        { label: 'Palmerston' },
      ]}
    />
  );
}
