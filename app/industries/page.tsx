import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Industry-Specific Disaster Recovery | Commercial & Industrial Restoration',
  description: 'Specialised disaster recovery services for all Australian industries. Mining, healthcare, education, retail, agriculture, and more.' };

export default function IndustriesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Industry-Specific Disaster Recovery',
        subtitle: 'Specialised disaster recovery services for all Australian industries. Mining, healthcare, education, retail, agriculture, and more.',
      }}
      cta={{ text: 'Get Industry Quote', href: '/quote' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Industries' },
      ]}
    />
  );
}
