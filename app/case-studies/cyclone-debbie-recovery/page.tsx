import { Metadata } from 'next';
import { FileText } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Cyclone Debbie Recovery | Case Study | Disaster Recovery Success Story',
  description: 'How we helped recover from Cyclone Debbie Recovery. Real results, timelines, and restoration process.' };

export default function CycloneDebbieRecoveryPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        icon: <FileText className="h-12 w-12" />,
        title: 'Cyclone Debbie Recovery',
        subtitle: 'How we helped recover from Cyclone Debbie Recovery. Real results, timelines, and restoration process.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim/start' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Case Studies', href: '/case-studies' },
        { label: 'Cyclone Debbie Recovery' },
      ]}
    />
  );
}
