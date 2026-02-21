import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Disaster Types & Emergency Response | All Australian Natural Disasters',
  description: 'Comprehensive disaster recovery for all types of natural disasters in Australia. Cyclones, bushfires, floods, storms, and more.' };

export default function DisastersPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: "Disaster Types & Emergency Response",
        subtitle: "Comprehensive disaster recovery for all types of natural disasters in Australia. Cyclones, bushfires, floods, storms, and more.",
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim/start' }}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Disaster Types & Emergency Response" },
      ]}
    />
  );
}
