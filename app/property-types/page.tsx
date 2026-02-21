import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Property Type Disaster Recovery | Residential, Commercial, Strata | All Properties',
  description: 'Specialised disaster recovery for all property types. Residential homes, commercial offices, strata properties, government facilities.' };

export default function PropertyTypesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: "Property Type Disaster Recovery",
        subtitle: "Specialised disaster recovery for all property types. Residential homes, commercial offices, strata properties, government facilities.",
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim/start' }}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Property Type Disaster Recovery" },
      ]}
    />
  );
}
