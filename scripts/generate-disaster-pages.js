const fs = require('fs');
const path = require('path');

// Disaster types by region
const disasters = [
  {
    slug: 'cyclone-response',
    name: 'Cyclone Damage Recovery',
    regions: ['Far North Queensland', 'Northern Territory', 'North Western Australia'],
    description: 'Expert cyclone damage restoration including structural repairs, water extraction, and debris removal',
    severity: 'Extreme',
    responseTime: '2-4 hours',
    keywords: ['cyclone damage', 'tropical storm recovery', 'wind damage repair'],
    cities: ['Cairns', 'Townsville', 'Darwin', 'Broome', 'Port Hedland']
  },
  {
    slug: 'bushfire-restoration',
    name: 'Bushfire & Smoke Damage',
    regions: ['NSW', 'Victoria', 'South Australia', 'Tasmania', 'Western Australia'],
    description: 'Complete bushfire recovery including smoke damage, soot removal, and structural restoration',
    severity: 'Extreme',
    responseTime: 'Immediate',
    keywords: ['bushfire restoration', 'smoke damage cleanup', 'fire recovery'],
    cities: ['Sydney', 'Melbourne', 'Adelaide', 'Hobart', 'Perth']
  },
  {
    slug: 'flood-recovery',
    name: 'Major Flood Recovery',
    regions: ['Queensland', 'Northern NSW', 'Victoria'],
    description: 'Comprehensive flood damage restoration, water extraction, and mould prevention',
    severity: 'High',
    responseTime: '1-2 hours',
    keywords: ['flood recovery', 'water damage restoration', 'flood cleanup'],
    cities: ['Brisbane', 'Gold Coast', 'Lismore', 'Ballarat', 'Shepparton']
  },
  {
    slug: 'storm-damage',
    name: 'Severe Storm Response',
    regions: ['All Australian States'],
    description: 'Emergency storm damage repairs including roof tarping, water extraction, and debris removal',
    severity: 'High',
    responseTime: '30 minutes',
    keywords: ['storm damage repair', 'emergency tarping', 'hail damage'],
    cities: ['All Capital Cities']
  },
  {
    slug: 'coastal-erosion',
    name: 'Coastal & Storm Surge Damage',
    regions: ['All Coastal Areas'],
    description: 'Specialised coastal property restoration from storm surge, king tides, and erosion damage',
    severity: 'High',
    responseTime: '2-4 hours',
    keywords: ['coastal damage', 'storm surge recovery', 'beach erosion repair'],
    cities: ['Gold Coast', 'Sunshine Coast', 'Newcastle', 'Wollongong', 'Perth Beaches']
  }
];

// Generate disaster pages using AgContentPageTemplate
disasters.forEach(disaster => {
  const safeName = disaster.name.replace(/[&\s]+/g, '');
  const pageContent = `import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: '${disaster.name} Services | 24/7 Online Emergency Response | Disaster Recovery',
  description: '${disaster.description}. Serving ${disaster.regions.join(", ")}. ${disaster.responseTime} response time.',
  keywords: ${JSON.stringify(disaster.keywords)}
};

export default function ${safeName}Page() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: '${disaster.name}',
        subtitle: '${disaster.description}',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim/start' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Disasters', href: '/disasters' },
        { label: '${disaster.name}' },
      ]}
    />
  );
}`;

  const disasterDir = path.join(__dirname, '..', 'app', 'disasters', disaster.slug);
  if (!fs.existsSync(disasterDir)) fs.mkdirSync(disasterDir, { recursive: true });
  fs.writeFileSync(path.join(disasterDir, 'page.tsx'), pageContent);
  console.log(`✅ Created ${disaster.name} page (AG)`);
});

// Create disasters index page
const indexContent = `import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Disaster Types & Emergency Response | All Australian Natural Disasters',
  description: 'Comprehensive disaster recovery for all types of natural disasters in Australia.',
};

export default function DisastersPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'All Disaster Types Coverage',
        subtitle: 'Complete disaster recovery services for every type of natural disaster nationwide.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim/start' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Disasters' },
      ]}
    />
  );
}`;

const dir = path.join(__dirname, '..', 'app', 'disasters');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'page.tsx'), indexContent);

console.log('\n✅ All disaster pages generated with Antigravity templates!');
