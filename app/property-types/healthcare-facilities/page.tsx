import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Healthcare Facility Disaster Recovery | Healthcare Properties | $2200 Minimum',
  description: 'Specialised disaster recovery for hospitals, clinics, and medical facilities. Immediate response. 100% insurance coverage.',
  keywords: ["healthcare disaster recovery","hospital restoration","medical facility damage"]
};

export default function HealthcareFacilityPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Healthcare Facility Disaster Recovery',
        subtitle: 'Insurance Coverage',
      }}
      cta={{ text: 'Get Assessment', href: '/quote' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Property Types', href: '/property-types' },
        { label: 'Healthcare Facility Disaster Recovery' },
      ]}
    />
  );
}
