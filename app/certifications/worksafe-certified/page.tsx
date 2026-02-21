import { Metadata } from 'next';
import { Award } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'WorkSafe Certified | Safety compliance | Disaster Recovery',
  description: 'WorkSafe Certified restoration services. Safety compliance. Qualified, certified, and compliant disaster recovery.' };

export default function WorkSafeCertifiedPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #312E81 0%, #4338CA 100%)',
        icon: <Award className="h-12 w-12" />,
        title: 'WorkSafe Certified',
        subtitle: 'Safety compliance',
      }}
      cta={{ text: 'View Services', href: '/services' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Certifications', href: '/certifications' },
        { label: 'WorkSafe Certified' },
      ]}
    />
  );
}
