import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getInsuranceSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'CommInsure Insurance Claims | Approved Restoration Provider | Direct Billing',
  description: 'Preferred CommInsure insurance restoration provider. Direct billing, no upfront costs, claim assistance. Call Online Form Available 24/7.' };

export default function CommInsureInsurancePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
        icon: <Shield className="h-12 w-12" />,
        title: 'CommInsure Insurance Claims',
        subtitle: 'Preferred Provider • Direct Billing • No Upfront Costs',
      }}
      cta={{ text: 'Start Your Claim', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Insurance', href: '/insurance' },
        { label: 'CommInsure Insurance Claims' },
      ]}
      sections={getInsuranceSections({ insurerName: 'CommInsure', insurerSlug: 'comminsure' })}
      relatedPages={getRelatedPages('insurance')}
    />
  );
}
