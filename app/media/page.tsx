import { Metadata } from 'next';
import { Newspaper } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: "Media | Disaster Recovery",
  description: "",
};

export default function MediaPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
        icon: <Newspaper className="h-12 w-12" />,
        title: "Media",
        subtitle: "",
      }}
      cta={{ text: 'Media Contact', href: '/contact' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: "Media" },
      ]}
    />
  );
}
