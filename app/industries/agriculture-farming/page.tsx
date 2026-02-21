import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Agriculture & Farming Disaster Recovery | Specialised Industrial Restoration | Australia',
  description: 'Farm and agricultural facility disaster recovery including livestock areas and crop storage. 24/7 emergency response, insurance approved, minimal downtime guaranteed.',
  keywords: ["farm disaster recovery","agricultural restoration","rural property cleanup"]
};

export default function AgricultureFarmingPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Agriculture & Farming Disaster Recovery',
        subtitle: 'Farm and agricultural facility disaster recovery including livestock areas and crop storage. 24/7 emergency response, insurance approved, minimal downtime guaranteed.',
      }}
      cta={{ text: 'Get Industry Quote', href: '/quote' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Industries', href: '/industries' },
        { label: 'Agriculture & Farming Disaster Recovery' },
      ]}
    />
  );
}
