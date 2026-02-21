import { Metadata } from 'next';
import { Briefcase } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: "Careers | Disaster Recovery",
  description: "",
};

export default function CareersPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Briefcase className="h-12 w-12" />,
        title: "Careers",
        subtitle: "",
      }}
      cta={{ text: 'View Openings', href: '/careers' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: "Careers" },
      ]}
    />
  );
}
