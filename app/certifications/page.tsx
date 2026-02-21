import { Metadata } from 'next';
import { Award } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getCertificationSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: "Certifications | Disaster Recovery",
  description: "",
};

export default function CertificationsPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)',
        icon: <Award className="h-12 w-12" />,
        title: "Certifications",
        subtitle: "",
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim/start' }}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Certifications" },
      ]}
      sections={getCertificationSections({ certName: 'Professional Certifications', body: 'Our network maintains the highest industry certifications.' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
