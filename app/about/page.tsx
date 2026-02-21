import { Metadata } from 'next';
import { Users } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: "Rapid Response | Disaster Recovery",
  description: "We understand that time is critical in disaster recovery. Our teams are ready 24/7.",
};

export default function ModernAboutPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
        icon: <Users className="h-12 w-12" />,
        title: "Rapid Response",
        subtitle: "We understand that time is critical in disaster recovery. Our teams are ready 24/7.",
      }}
      cta={{ text: 'Contact Us', href: '/contact' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: "Rapid Response" },
      ]}
    />
  );
}
