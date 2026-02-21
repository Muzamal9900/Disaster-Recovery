const fs = require('fs');
const path = require('path');

// All Australian states and their major cities
const stateData = {
  nsw: {
    name: 'New South Wales',
    capital: 'Sydney',
    cities: ['Newcastle', 'Wollongong', 'Central Coast', 'Parramatta', 'Blacktown', 'Liverpool', 'Penrith'],
    disasters: ['Bushfires', 'Flooding', 'Storms', 'Coastal Erosion'],
    climateRisks: 'Increasing bushfire frequency and severe flooding events'
  },
  vic: {
    name: 'Victoria',
    capital: 'Melbourne',
    cities: ['Geelong', 'Ballarat', 'Bendigo', 'Frankston', 'Dandenong', 'Cranbourne', 'Shepparton'],
    disasters: ['Bushfires', 'Flooding', 'Storms', 'Heatwaves'],
    climateRisks: 'Extreme bushfire conditions and flash flooding'
  },
  qld: {
    name: 'Queensland',
    capital: 'Brisbane',
    cities: ['Gold Coast', 'Sunshine Coast', 'Townsville', 'Cairns', 'Toowoomba', 'Rockhampton', 'Mackay'],
    disasters: ['Cyclones', 'Flooding', 'Severe Storms', 'Storm Surge'],
    climateRisks: 'Tropical cyclones and monsoonal flooding'
  },
  wa: {
    name: 'Western Australia',
    capital: 'Perth',
    cities: ['Fremantle', 'Mandurah', 'Bunbury', 'Rockingham', 'Joondalup', 'Armadale', 'Midland'],
    disasters: ['Bushfires', 'Cyclones', 'Flooding', 'Severe Storms'],
    climateRisks: 'Northern cyclones and southern bushfires'
  },
  sa: {
    name: 'South Australia',
    capital: 'Adelaide',
    cities: ['Mount Gambier', 'Whyalla', 'Murray Bridge', 'Port Augusta', 'Port Lincoln', 'Gawler'],
    disasters: ['Bushfires', 'Heatwaves', 'Flooding', 'Severe Storms'],
    climateRisks: 'Extreme heat events and bushfire danger'
  },
  tas: {
    name: 'Tasmania',
    capital: 'Hobart',
    cities: ['Launceston', 'Devonport', 'Burnie', 'Kingston', 'Ulverstone', 'Bridgewater'],
    disasters: ['Bushfires', 'Flooding', 'Severe Storms', 'Landslides'],
    climateRisks: 'Increased bushfire risk and extreme weather events'
  },
  act: {
    name: 'Australian Capital Territory',
    capital: 'Canberra',
    cities: ['Belconnen', 'Tuggeranong', 'Gungahlin', 'Woden Valley', 'Weston Creek'],
    disasters: ['Bushfires', 'Storms', 'Hail', 'Frost Damage'],
    climateRisks: 'Bushfire smoke and severe storm events'
  },
  nt: {
    name: 'Northern Territory',
    capital: 'Darwin',
    cities: ['Palmerston', 'Alice Springs', 'Katherine', 'Tennant Creek', 'Nhulunbuy'],
    disasters: ['Cyclones', 'Flooding', 'Bushfires', 'Extreme Heat'],
    climateRisks: 'Severe tropical cyclones and monsoon flooding'
  }
};


// Create directories and files using AgContentPageTemplate
const baseDir = path.join(__dirname, '..', 'app', 'locations');

Object.entries(stateData).forEach(([stateCode, state]) => {
  const stateDir = path.join(baseDir, stateCode);
  if (!fs.existsSync(stateDir)) fs.mkdirSync(stateDir, { recursive: true });

  const safeName = state.name.replace(/\s+/g, '');
  const statePage = `import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Disaster Recovery ${state.name} | 24/7 Emergency Services | ${state.capital} & All Cities',
  description: 'Leading disaster recovery services across ${state.name}. Emergency response for ${state.disasters.join(", ")}.',
};

export default function ${safeName}Page() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Disaster Recovery ${state.name}',
        subtitle: '24/7 Online Emergency Response Across All ${stateCode.toUpperCase()} Regions. Serving ${state.capital} and ${state.cities.length} more cities.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim/start' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Locations', href: '/locations' },
        { label: '${state.name}' },
      ]}
    />
  );
}`;

  fs.writeFileSync(path.join(stateDir, 'page.tsx'), statePage);
  console.log(`✅ Created ${state.name} page (AG)`);

  // Create city subdirectories
  state.cities.forEach(city => {
    const citySlug = city.toLowerCase().replace(/\s+/g, '-');
    const cityDir = path.join(stateDir, citySlug);
    if (!fs.existsSync(cityDir)) fs.mkdirSync(cityDir, { recursive: true });

    const cityPage = `import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Disaster Recovery ${city} | Emergency Services ${state.name}',
  description: '24/7 disaster recovery in ${city}, ${state.name}. Water damage, fire restoration, mould removal.',
};

export default function ${city.replace(/\s+/g, '')}Page() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Disaster Recovery ${city}',
        subtitle: '24/7 Emergency Services in ${city}, ${state.name}.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim/start' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Locations', href: '/locations' },
        { label: '${state.name}', href: '/locations/${stateCode}' },
        { label: '${city}' },
      ]}
    />
  );
}`;

    fs.writeFileSync(path.join(cityDir, 'page.tsx'), cityPage);
  });
});

console.log('\n✅ All state and city pages generated with Antigravity templates!');
