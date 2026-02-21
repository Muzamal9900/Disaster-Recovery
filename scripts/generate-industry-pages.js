const fs = require('fs');
const path = require('path');

// Industry-specific disaster recovery pages
const industries = [
  {
    slug: 'mining-resources',
    name: 'Mining & Resources',
    description: 'Specialised disaster recovery for mining operations, processing plants, and resource facilities',
    risks: ['Equipment damage', 'Site flooding', 'Chemical spills', 'Structural damage'],
    locations: ['Pilbara WA', 'Hunter Valley NSW', 'Bowen Basin QLD', 'Goldfields WA'],
    keywords: ['mining disaster recovery', 'mine site restoration', 'processing plant cleanup']
  },
  {
    slug: 'agriculture-farming',
    name: 'Agriculture & Farming',
    description: 'Farm and agricultural facility disaster recovery including livestock areas and crop storage',
    risks: ['Flood damage', 'Bushfire', 'Storm damage', 'Drought-related issues'],
    locations: ['Murray-Darling Basin', 'Wheatbelt WA', 'Darling Downs QLD'],
    keywords: ['farm disaster recovery', 'agricultural restoration', 'rural property cleanup']
  },
  {
    slug: 'healthcare-medical',
    name: 'Healthcare & Medical Facilities',
    description: 'Critical disaster recovery for hospitals, clinics, aged care, and medical centres',
    risks: ['Contamination', 'Power outages', 'Water damage', 'Biohazard incidents'],
    locations: ['All capital cities', 'Regional health districts'],
    keywords: ['hospital disaster recovery', 'medical facility restoration', 'healthcare cleanup']
  },
  {
    slug: 'education-schools',
    name: 'Education & Schools',
    description: 'School and university disaster recovery with minimal disruption to learning',
    risks: ['Water damage', 'Mould growth', 'Storm damage', 'Fire damage'],
    locations: ['All education precincts nationwide'],
    keywords: ['school disaster recovery', 'university restoration', 'education facility cleanup']
  },
  {
    slug: 'retail-shopping',
    name: 'Retail & Shopping Centres',
    description: 'Rapid restoration for retail stores and shopping centres to minimize business interruption',
    risks: ['Water damage', 'Fire damage', 'Storm damage', 'Vandalism cleanup'],
    locations: ['CBD areas', 'Westfield centres', 'DFO outlets'],
    keywords: ['retail disaster recovery', 'shopping centre restoration', 'store cleanup']
  },
  {
    slug: 'hospitality-tourism',
    name: 'Hospitality & Tourism',
    description: 'Hotel, resort, and tourism facility disaster recovery nationwide',
    risks: ['Cyclone damage', 'Flooding', 'Fire damage', 'Guest area contamination'],
    locations: ['Gold Coast', 'Cairns', 'Sydney', 'Melbourne', 'Perth'],
    keywords: ['hotel disaster recovery', 'resort restoration', 'tourism facility cleanup']
  }
];

// Generate industry pages using AgContentPageTemplate
industries.forEach(industry => {
  const safeName = industry.name.replace(/[&\s]+/g, '');
  const pageContent = `import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: '${industry.name} Disaster Recovery | Specialised Industrial Restoration | Australia',
  description: '${industry.description}. 24/7 emergency response, insurance approved, minimal downtime guaranteed.',
  keywords: ${JSON.stringify(industry.keywords)}
};

export default function ${safeName}Page() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: '${industry.name} Disaster Recovery',
        subtitle: '${industry.description}. 24/7 emergency response, insurance approved, minimal downtime guaranteed.',
      }}
      cta={{ text: 'Get Industry Quote', href: '/quote' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Industries', href: '/industries' },
        { label: '${industry.name} Disaster Recovery' },
      ]}
    />
  );
}`;

  const industryDir = path.join(__dirname, '..', 'app', 'industries', industry.slug);
  if (!fs.existsSync(industryDir)) fs.mkdirSync(industryDir, { recursive: true });
  fs.writeFileSync(path.join(industryDir, 'page.tsx'), pageContent);
  console.log(`✅ Created ${industry.name} page (AG)`);
});

// Create main industries index page
const indexContent = `import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Industry-Specific Disaster Recovery | Commercial & Industrial Restoration',
  description: 'Specialised disaster recovery services for all Australian industries.',
};

export default function IndustriesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Industry-Specific Disaster Recovery',
        subtitle: 'Specialised disaster recovery services for all Australian industries. Mining, healthcare, education, retail, agriculture, and more.',
      }}
      cta={{ text: 'Get Industry Quote', href: '/quote' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Industries' },
      ]}
    />
  );
}`;

const dir = path.join(__dirname, '..', 'app', 'industries');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'page.tsx'), indexContent);

console.log('\n✅ All industry pages generated with Antigravity templates!');
