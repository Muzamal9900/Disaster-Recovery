import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Healthcare & Medical Facilities Disaster Recovery | Specialised Industrial Restoration | Australia',
  description: 'Critical disaster recovery for hospitals, clinics, aged care, and medical centres. 24/7 emergency response, insurance approved, minimal downtime guaranteed.',
  keywords: ["hospital disaster recovery","medical facility restoration","healthcare cleanup"]
};

export default function HealthcareMedicalFacilitiesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Healthcare & Medical Facilities Disaster Recovery',
        subtitle: 'Critical disaster recovery for hospitals, clinics, aged care, and medical centres. 24/7 emergency response, insurance approved, minimal downtime guaranteed.',
      }}
      cta={{ text: 'Get Industry Quote', href: '/quote' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Industries', href: '/industries' },
        { label: 'Healthcare & Medical Facilities Disaster Recovery' },
      ]}
    />
  );
}
