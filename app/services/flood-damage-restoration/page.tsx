import { Metadata } from 'next';
import { Waves } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Flood Damage Restoration | Disaster Recovery',
  description: '',
};

export default function FloodDamageRestorationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0C4A6E 0%, #0369A1 100%)',
        icon: <Waves className="h-12 w-12" />,
        title: 'Flood Damage Restoration',
        subtitle: '',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim/start' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Flood Damage Restoration' },
      ]}
    />
  );
}
