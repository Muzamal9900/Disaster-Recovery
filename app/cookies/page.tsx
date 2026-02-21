import { Metadata } from 'next';
import { FileText } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: "Cookies | Disaster Recovery",
  description: "",
};

export default function CookiesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <FileText className="h-12 w-12" />,
        title: "Cookies",
        subtitle: "",
      }}
      cta={{ text: 'Contact Us', href: '/contact' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: "Cookies" },
      ]}
    />
  );
}
