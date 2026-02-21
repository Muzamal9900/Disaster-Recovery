import { Metadata } from 'next';
import { Award } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getCertificationSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'HAZMAT Certified | Hazardous materials | Disaster Recovery',
  description: 'HAZMAT Certified restoration services. Hazardous materials. Qualified, certified, and compliant disaster recovery.' };

export default function HAZMATCertifiedPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #312E81 0%, #4338CA 100%)',
        icon: <Award className="h-12 w-12" />,
        title: 'HAZMAT Certified',
        subtitle: 'Hazardous materials',
      }}
      cta={{ text: 'View Services', href: '/services' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Certifications', href: '/certifications' },
        { label: 'HAZMAT Certified' },
      ]}
      sections={getCertificationSections({ certName: 'Hazmat Certification', body: 'Certified handling of hazardous materials and contamination.' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
