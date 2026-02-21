import { Metadata } from 'next';
import { Settings } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Ozone Generators | Deodorization | Advanced Restoration Technology',
  description: 'Professional ozone generators for deodorization. Latest technology for faster, better restoration results.' };

export default function OzoneGeneratorsPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Settings className="h-12 w-12" />,
        title: 'Ozone Generators',
        subtitle: 'Professional Equipment for Deodorization',
      }}
      cta={{ text: 'Learn More', href: '/services' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Equipment', href: '/equipment' },
        { label: 'Ozone Generators' },
      ]}
    />
  );
}
