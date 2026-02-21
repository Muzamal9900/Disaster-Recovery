import { Metadata } from 'next';
import { Map } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: "Site Map | Disaster Recovery",
  description: "",
};

export default function SitemapPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Map className="h-12 w-12" />,
        title: "Site Map",
        subtitle: "",
      }}
      cta={{ text: 'Home', href: '/' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: "Site Map" },
      ]}
    />
  );
}
