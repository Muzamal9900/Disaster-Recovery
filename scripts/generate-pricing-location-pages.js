const fs = require('fs');
const path = require('path');

// Major cities and their services with pricing
const majorCities = [
  { name: 'Sydney', state: 'NSW', multiplier: 1.3 },
  { name: 'Melbourne', state: 'VIC', multiplier: 1.25 },
  { name: 'Brisbane', state: 'QLD', multiplier: 1.2 },
  { name: 'Perth', state: 'WA', multiplier: 1.15 },
  { name: 'Adelaide', state: 'SA', multiplier: 1.1 },
  { name: 'Gold Coast', state: 'QLD', multiplier: 1.2 },
  { name: 'Newcastle', state: 'NSW', multiplier: 1.05 },
  { name: 'Canberra', state: 'ACT', multiplier: 1.15 },
  { name: 'Sunshine Coast', state: 'QLD', multiplier: 1.1 },
  { name: 'Wollongong', state: 'NSW', multiplier: 1.05 }
];

const services = [
  { 
    slug: 'water-damage', 
    name: 'Water Damage Restoration',
    basePrice: 2200,
    averageJob: 5500,
    description: 'Complete water extraction, drying, and restoration'
  },
  { 
    slug: 'fire-damage', 
    name: 'Fire & Smoke Damage',
    basePrice: 2200,
    averageJob: 12000,
    description: 'Fire damage restoration, smoke removal, and rebuild'
  },
  { 
    slug: 'mould-removal', 
    name: 'Mould Remediation',
    basePrice: 2200,
    averageJob: 4500,
    description: 'Professional mould removal and prevention'
  },
  { 
    slug: 'flood-recovery', 
    name: 'Flood Recovery',
    basePrice: 2200,
    averageJob: 8500,
    description: 'Major flood damage restoration and recovery'
  },
  { 
    slug: 'storm-damage', 
    name: 'Storm Damage Repair',
    basePrice: 2200,
    averageJob: 6500,
    description: 'Storm damage assessment and complete repairs'
  }
];

// Generate city-service pricing pages using AgContentPageTemplate
majorCities.forEach(city => {
  services.forEach(service => {
    const adjustedBase = Math.round(service.basePrice * city.multiplier);
    const adjustedAverage = Math.round(service.averageJob * city.multiplier);
    const safeName = city.name.replace(/\s+/g, '') + service.name.replace(/[&\s]+/g, '') + 'Pricing';

    const pageContent = `import { Metadata } from 'next';
import { DollarSign } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: '${service.name} Cost ${city.name} | Pricing from $${adjustedBase.toLocaleString()} | Free Quote',
  description: '${service.name} pricing in ${city.name}, ${city.state}. Minimum $${adjustedBase.toLocaleString()}, average $${adjustedAverage.toLocaleString()}. Insurance approved.',
  keywords: [
    '${service.name.toLowerCase()} cost ${city.name.toLowerCase()}',
    '${service.slug} pricing ${city.name.toLowerCase()}',
    'disaster recovery cost ${city.name.toLowerCase()}'
  ]
};

export default function ${safeName}Page() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        icon: <DollarSign className="h-12 w-12" />,
        title: '${service.name} Cost in ${city.name}',
        subtitle: '${service.description}. Transparent pricing with no hidden fees. From $${adjustedBase.toLocaleString()}.',
      }}
      cta={{ text: 'Get Free Quote', href: '/quote' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Pricing', href: '/pricing' },
        { label: '${city.name} ${service.name}' },
      ]}
    />
  );
}`;

    const pricingDir = path.join(__dirname, '..', 'app', 'pricing', city.name.toLowerCase().replace(/\s+/g, '-'), service.slug);
    if (!fs.existsSync(pricingDir)) fs.mkdirSync(pricingDir, { recursive: true });
    fs.writeFileSync(path.join(pricingDir, 'page.tsx'), pageContent);
    console.log(`✅ Created ${city.name} ${service.name} pricing page (AG)`);
  });
});

console.log('\n✅ All pricing location pages generated with Antigravity templates!');
console.log(`Generated ${majorCities.length * services.length} pricing pages.`);
