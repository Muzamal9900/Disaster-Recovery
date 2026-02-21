import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'CGU Insurance Claims | Approved Restoration Provider | Direct Billing',
  description: 'Preferred CGU insurance restoration provider. Direct billing, no upfront costs, claim assistance. Call Online Form Available 24/7.' };

export default function CGUInsurancePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
        icon: <Shield className="h-12 w-12" />,
        title: 'CGU Insurance Claims',
        subtitle: 'Preferred Provider • Direct Billing • No Upfront Costs',
      }}
      cta={{ text: 'Start Your Claim', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Insurance', href: '/insurance' },
        { label: 'CGU Insurance Claims' },
      ]}
    />
  );
}
