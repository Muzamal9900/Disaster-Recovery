import { Metadata } from 'next';
import { ClipboardCheck } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: "Universal Disaster Response Checklist | Disaster Recovery",
  description: "",
};

export default function GeneralDisasterChecklistPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        icon: <ClipboardCheck className="h-12 w-12" />,
        title: "Universal Disaster Response Checklist",
        subtitle: "",
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim/start' }}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Emergency", href: "/emergency" },
        { label: "Universal Disaster Response Checklist" },
      ]}
    />
  );
}
