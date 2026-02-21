const fs = require('fs');
const path = require('path');

// Property types with specific requirements
const propertyTypes = [
  {
    slug: 'residential-homes',
    name: 'Residential Home',
    category: 'Residential',
    description: 'Complete disaster recovery for houses, townhouses, and residential properties',
    averageSize: '200-400 sqm',
    commonIssues: ['Water damage', 'Fire damage', 'Storm damage', 'Mould growth'],
    responseTime: '30-60 minutes',
    averageCost: '$3,500 - $15,000',
    insuranceCoverage: '95%',
    keywords: ['residential disaster recovery', 'home restoration', 'house water damage']
  },
  {
    slug: 'apartment-units',
    name: 'Apartment & Unit',
    category: 'Residential',
    description: 'Specialised disaster recovery for apartments, units, and high-rise residences',
    averageSize: '80-150 sqm',
    commonIssues: ['Water leaks from above', 'Balcony flooding', 'Kitchen fires', 'Bathroom flooding'],
    responseTime: '30-45 minutes',
    averageCost: '$2,200 - $8,000',
    insuranceCoverage: '95%',
    keywords: ['apartment water damage', 'unit flood recovery', 'high rise restoration']
  },
  {
    slug: 'commercial-offices',
    name: 'Commercial Office',
    category: 'Commercial',
    description: 'Business continuity focused disaster recovery for offices and commercial spaces',
    averageSize: '500-5000 sqm',
    commonIssues: ['Ceiling leaks', 'HVAC water damage', 'Fire damage', 'IT equipment damage'],
    responseTime: '30 minutes priority',
    averageCost: '$10,000 - $100,000+',
    insuranceCoverage: '100%',
    keywords: ['commercial disaster recovery', 'office flood restoration', 'business continuity']
  },
  {
    slug: 'retail-stores',
    name: 'Retail Store',
    category: 'Commercial',
    description: 'Rapid disaster recovery to minimize retail business interruption',
    averageSize: '200-2000 sqm',
    commonIssues: ['Inventory damage', 'Customer area flooding', 'Fire damage', 'Storm damage'],
    responseTime: '30 minutes priority',
    averageCost: '$5,000 - $50,000',
    insuranceCoverage: '100%',
    keywords: ['retail disaster recovery', 'shop flood damage', 'store restoration']
  },
  {
    slug: 'strata-properties',
    name: 'Strata Property',
    category: 'Strata',
    description: 'Coordinated disaster recovery for strata-managed properties and common areas',
    averageSize: 'Varies',
    commonIssues: ['Common area flooding', 'Multiple unit damage', 'Basement flooding', 'Roof leaks'],
    responseTime: '30 minutes',
    averageCost: '$5,000 - $200,000+',
    insuranceCoverage: '100% via strata',
    keywords: ['strata disaster recovery', 'body corporate restoration', 'common area damage']
  },
  {
    slug: 'government-facilities',
    name: 'Government Facility',
    category: 'Government',
    description: 'Approved vendor for government facility disaster recovery and restoration',
    averageSize: '1000-10000 sqm',
    commonIssues: ['Critical infrastructure damage', 'Public area safety', 'Document recovery', 'Continuity planning'],
    responseTime: 'Immediate priority',
    averageCost: 'Contract rates',
    insuranceCoverage: '100% funded',
    keywords: ['government disaster recovery', 'public facility restoration', 'council property damage']
  },
  {
    slug: 'warehouses',
    name: 'Warehouse & Storage',
    category: 'Industrial',
    description: 'Large-scale disaster recovery for warehouses and storage facilities',
    averageSize: '2000-20000 sqm',
    commonIssues: ['Inventory damage', 'Roof leaks', 'Forklift accidents', 'Sprinkler activation'],
    responseTime: '45 minutes',
    averageCost: '$20,000 - $500,000+',
    insuranceCoverage: '100%',
    keywords: ['warehouse flood recovery', 'storage facility restoration', 'industrial damage']
  },
  {
    slug: 'healthcare-facilities',
    name: 'Healthcare Facility',
    category: 'Healthcare',
    description: 'Specialised disaster recovery for hospitals, clinics, and medical facilities',
    averageSize: 'Varies',
    commonIssues: ['Contamination control', 'Critical area protection', 'Equipment damage', 'Infection control'],
    responseTime: 'Immediate',
    averageCost: 'Priority rates',
    insuranceCoverage: '100%',
    keywords: ['healthcare disaster recovery', 'hospital restoration', 'medical facility damage']
  },
  {
    slug: 'schools-education',
    name: 'School & Education',
    category: 'Education',
    description: 'Safe and rapid disaster recovery for schools and educational facilities',
    averageSize: '1000-10000 sqm',
    commonIssues: ['Classroom flooding', 'Library damage', 'Gymnasium flooding', 'IT room damage'],
    responseTime: '30 minutes',
    averageCost: '$10,000 - $200,000',
    insuranceCoverage: '100%',
    keywords: ['school disaster recovery', 'education facility restoration', 'classroom flood damage']
  },
  {
    slug: 'hotels-accommodation',
    name: 'Hotel & Accommodation',
    category: 'Hospitality',
    description: 'Minimal disruption disaster recovery for hotels and accommodation providers',
    averageSize: '50-500 rooms',
    commonIssues: ['Guest room flooding', 'Kitchen fires', 'Laundry flooding', 'Conference area damage'],
    responseTime: 'Immediate',
    averageCost: '$10,000 - $300,000',
    insuranceCoverage: '100%',
    keywords: ['hotel disaster recovery', 'accommodation restoration', 'hospitality damage']
  }
];

// Generate property type pages using AgContentPageTemplate
propertyTypes.forEach(property => {
  const safeName = property.name.replace(/[&\s]+/g, '');
  const pageContent = `import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: '${property.name} Disaster Recovery | ${property.category} Properties | $2200 Minimum',
  description: '${property.description}. ${property.responseTime} response. ${property.insuranceCoverage} insurance coverage.',
  keywords: ${JSON.stringify(property.keywords)}
};

export default function ${safeName}Page() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: '${property.name} Disaster Recovery',
        subtitle: '${property.description}. ${property.responseTime} response. ${property.insuranceCoverage} insurance coverage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim/start' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Property Types', href: '/property-types' },
        { label: '${property.name} Disaster Recovery' },
      ]}
    />
  );
}`;

  const propertyDir = path.join(__dirname, '..', 'app', 'property-types', property.slug);
  if (!fs.existsSync(propertyDir)) fs.mkdirSync(propertyDir, { recursive: true });
  fs.writeFileSync(path.join(propertyDir, 'page.tsx'), pageContent);
  console.log(`✅ Created ${property.name} page (AG)`);
});

// Create property types index page
const indexContent = `import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Property Type Disaster Recovery | Residential, Commercial, Strata | All Properties',
  description: 'Specialised disaster recovery for all property types. Residential homes, commercial offices, strata properties, government facilities.',
};

export default function PropertyTypesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Disaster Recovery for All Property Types',
        subtitle: 'Specialised restoration services tailored to your property type. From residential homes to government facilities.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim/start' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Property Types' },
      ]}
    />
  );
}`;

const dir = path.join(__dirname, '..', 'app', 'property-types');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'page.tsx'), indexContent);

console.log('\n✅ All property type pages generated with Antigravity templates!');
console.log(`Generated ${propertyTypes.length} property type pages.`);
