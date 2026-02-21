import { Metadata } from 'next';
import { Bug } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: "Mould Discovery Emergency Checklist | Disaster Recovery",
  description: "",
};

export default function MouldChecklistPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        icon: <Bug className="h-12 w-12" />,
        title: "Mould Discovery Emergency Checklist",
        subtitle: "",
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim/start' }}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Emergency", href: "/emergency" },
        { label: "Mould Discovery Emergency Checklist" },
      ]}
    />
  );
}
