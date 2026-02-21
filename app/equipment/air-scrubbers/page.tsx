import { Metadata } from 'next';
import { Settings } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'HEPA Air Scrubbers | Air purification | Advanced Restoration Technology',
  description: 'Professional hepa air scrubbers for air purification. Latest technology for faster, better restoration results.' };

export default function HEPAAirScrubbersPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Settings className="h-12 w-12" />,
        title: 'HEPA Air Scrubbers',
        subtitle: 'Professional Equipment for Air purification',
      }}
      cta={{ text: 'Learn More', href: '/services' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Equipment', href: '/equipment' },
        { label: 'HEPA Air Scrubbers' },
      ]}
    />
  );
}
