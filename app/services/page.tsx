import { Metadata } from 'next';
import { Wrench } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Water Damage Restoration | Disaster Recovery',
  description: 'Cutting-edge water damage restoration using molecular drying technology and advanced moisture mapping.',
};

export default function UltraModernServicesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
        icon: <Wrench className="h-12 w-12" />,
        title: 'Water Damage Restoration',
        subtitle: 'Cutting-edge water damage restoration using molecular drying technology and advanced moisture mapping.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim/start' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Water Damage Restoration' },
      ]}
    />
  );
}
