import { Metadata } from 'next';
import { Zap } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: "Simple Server Component Page | Disaster Recovery",
  description: "",
};

export default function SimplePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
        icon: <Zap className="h-12 w-12" />,
        title: "Simple Server Component Page",
        subtitle: "",
      }}
      cta={{ text: 'Get Started', href: '/' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: "Simple Server Component Page" },
      ]}
    />
  );
}
