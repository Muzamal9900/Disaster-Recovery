import { Metadata } from 'next';
import { FileText } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Disaster Recovery - Emergency restoration and disaster recovery services.' };

export default function TermsOfService() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <FileText className="h-12 w-12" />,
        title: "Terms of Service",
        subtitle: "Terms of Service for Disaster Recovery - Emergency restoration and disaster recovery services.",
      }}
      cta={{ text: 'Contact Us', href: '/contact' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: "Terms of Service" },
      ]}
    />
  );
}
