import { Metadata } from 'next';
import { Wind } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Cyclone Damage Restoration | Disaster Recovery',
  description: '',
};

export default function CycloneDamageRestorationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)',
        icon: <Wind className="h-12 w-12" />,
        title: 'Cyclone Damage Restoration',
        subtitle: '',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim/start' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Cyclone Damage Restoration' },
      ]}
    />
  );
}
