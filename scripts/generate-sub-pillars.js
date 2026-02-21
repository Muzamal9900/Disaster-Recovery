const fs = require('fs');
const path = require('path');

// Define all sub-pillar pages to create
const subPillarPages = {
  'water-damage': [
    { slug: 'washing-machine-flooding', title: 'Washing Machine Flood Damage', keywords: 'washing machine overflow, laundry flooding' },
    { slug: 'dishwasher-leaks', title: 'Dishwasher Leak Water Damage', keywords: 'dishwasher flooding, kitchen water damage' },
    { slug: 'hot-water-system-burst', title: 'Hot Water System Burst Damage', keywords: 'hot water tank leak, heater flooding' },
    { slug: 'toilet-overflow', title: 'Toilet Overflow Cleanup', keywords: 'toilet flooding, bathroom water damage' },
    { slug: 'shower-leaks', title: 'Shower Leak Water Damage', keywords: 'shower pan leak, bathroom flooding' },
    { slug: 'roof-leak-damage', title: 'Roof Leak Water Damage', keywords: 'roof leaking, storm water damage' },
    { slug: 'concrete-water-damage', title: 'Concrete Water Damage Restoration', keywords: 'concrete flooding, slab moisture' },
    { slug: 'crawl-space-flooding', title: 'Crawl Space Water Removal', keywords: 'under house flooding, subfloor water' },
    { slug: 'garage-flooding', title: 'Garage Flood Cleanup', keywords: 'garage water damage, carport flooding' },
    { slug: 'pool-leak-damage', title: 'Pool Leak Property Damage', keywords: 'swimming pool leak, pool water damage' }
  ],
  'mould-remediation': [
    { slug: 'black-mould-removal', title: 'Black Mould Removal Brisbane', keywords: 'toxic black mould, stachybotrys removal' },
    { slug: 'bathroom-mould', title: 'Bathroom Mould Remediation', keywords: 'shower mould, bathroom ceiling mould' },
    { slug: 'attic-mould', title: 'Attic Mould Removal', keywords: 'roof cavity mould, ceiling mould' },
    { slug: 'crawl-space-mould', title: 'Crawl Space Mould Treatment', keywords: 'subfloor mould, under house mould' },
    { slug: 'wall-cavity-mould', title: 'Wall Cavity Mould Removal', keywords: 'inside wall mould, hidden mould' },
    { slug: 'bedroom-mould', title: 'Bedroom Mould Remediation', keywords: 'sleeping area mould, health risks' },
    { slug: 'commercial-mould', title: 'Commercial Mould Remediation', keywords: 'office mould, workplace mould' },
    { slug: 'hvac-mould', title: 'Air Conditioning Mould Removal', keywords: 'AC duct mould, HVAC contamination' },
    { slug: 'carpet-mould', title: 'Carpet Mould Remediation', keywords: 'mouldy carpet, underlay mould' },
    { slug: 'timber-mould', title: 'Timber Mould Treatment', keywords: 'wood rot, structural mould' }
  ],
  'biohazard-cleaning': [
    { slug: 'crime-scene-cleanup', title: 'Crime Scene Cleanup Brisbane', keywords: 'forensic cleaning, trauma cleanup' },
    { slug: 'unattended-death', title: 'Unattended Death Cleanup', keywords: 'decomposition cleanup, deceased estate' },
    { slug: 'blood-cleanup', title: 'Blood Spill Cleanup Services', keywords: 'bloodborne pathogen, accident cleanup' },
    { slug: 'hoarding-cleanup', title: 'Hoarding Cleanup Services', keywords: 'hoarder house, extreme cleaning' },
    { slug: 'drug-lab-cleanup', title: 'Drug Lab Decontamination', keywords: 'meth lab cleanup, chemical remediation' },
    { slug: 'infectious-disease', title: 'Infectious Disease Sanitization', keywords: 'COVID cleaning, virus disinfection' },
    { slug: 'sharps-disposal', title: 'Needle & Sharps Disposal', keywords: 'syringe cleanup, medical waste' },
    { slug: 'animal-waste', title: 'Animal Waste Cleanup', keywords: 'pet hoarding, feces removal' },
    { slug: 'suicide-cleanup', title: 'Suicide Cleanup Services', keywords: 'trauma cleaning, compassionate cleanup' },
    { slug: 'bodily-fluids', title: 'Bodily Fluid Cleanup', keywords: 'vomit cleanup, human waste' }
  ],
  'commercial-services': [
    { slug: 'office-water-damage', title: 'Office Water Damage Restoration', keywords: 'commercial flooding, workplace water' },
    { slug: 'retail-flood-damage', title: 'Retail Store Flood Recovery', keywords: 'shop flooding, retail water damage' },
    { slug: 'warehouse-flooding', title: 'Warehouse Flood Cleanup', keywords: 'industrial flooding, storage water damage' },
    { slug: 'restaurant-water-damage', title: 'Restaurant Water Damage', keywords: 'kitchen flooding, hospitality water' },
    { slug: 'hotel-flood-recovery', title: 'Hotel Flood Restoration', keywords: 'accommodation flooding, guest room water' },
    { slug: 'school-water-damage', title: 'School Water Damage Cleanup', keywords: 'education facility, classroom flooding' },
    { slug: 'hospital-water-damage', title: 'Healthcare Facility Water Damage', keywords: 'medical facility, hospital flooding' },
    { slug: 'gym-flooding', title: 'Gym & Fitness Centre Flooding', keywords: 'sports facility, gym water damage' },
    { slug: 'data-centre-flooding', title: 'Data Centre Water Damage', keywords: 'server room flooding, IT disaster' },
    { slug: 'factory-water-damage', title: 'Factory Flood Recovery', keywords: 'manufacturing plant, industrial water' }
  ],
  'fire-damage': [
    { slug: 'kitchen-fire-damage', title: 'Kitchen Fire Damage Restoration', keywords: 'cooking fire, kitchen smoke damage' },
    { slug: 'electrical-fire-damage', title: 'Electrical Fire Damage Cleanup', keywords: 'wiring fire, electrical burn damage' },
    { slug: 'smoke-odour-removal', title: 'Smoke Odour Removal Services', keywords: 'smoke smell, fire odour elimination' },
    { slug: 'soot-damage-cleanup', title: 'Soot Damage Cleaning', keywords: 'soot removal, carbon cleaning' },
    { slug: 'bushfire-smoke-damage', title: 'Bushfire Smoke Damage', keywords: 'wildfire smoke, outdoor fire damage' },
    { slug: 'garage-fire-damage', title: 'Garage Fire Restoration', keywords: 'vehicle fire, garage smoke damage' },
    { slug: 'commercial-fire-damage', title: 'Commercial Fire Restoration', keywords: 'business fire, office fire damage' },
    { slug: 'contents-restoration', title: 'Fire Damaged Contents Restoration', keywords: 'belongings restoration, document recovery' },
    { slug: 'structural-fire-damage', title: 'Structural Fire Damage Repair', keywords: 'building fire, frame damage' },
    { slug: 'chimney-fire-damage', title: 'Chimney Fire Damage Cleanup', keywords: 'flue fire, chimney restoration' }
  ],
  'storm-damage': [
    { slug: 'hail-damage-repair', title: 'Hail Damage Restoration', keywords: 'hailstorm damage, ice damage repair' },
    { slug: 'wind-damage-repair', title: 'Wind Damage Restoration', keywords: 'cyclone damage, storm wind repair' },
    { slug: 'tree-damage-cleanup', title: 'Fallen Tree Damage Cleanup', keywords: 'tree removal, storm tree damage' },
    { slug: 'fence-storm-damage', title: 'Fence Storm Damage Repair', keywords: 'fence repair, boundary damage' },
    { slug: 'window-storm-damage', title: 'Storm Window Damage', keywords: 'broken windows, glass damage' },
    { slug: 'flood-damage-restoration', title: 'Flash Flood Damage Recovery', keywords: 'flood cleanup, storm flooding' },
    { slug: 'lightning-damage', title: 'Lightning Strike Damage', keywords: 'electrical surge, lightning fire' },
    { slug: 'cyclone-damage', title: 'Cyclone Damage Restoration', keywords: 'tropical cyclone, hurricane damage' },
    { slug: 'storm-surge-damage', title: 'Storm Surge Flood Damage', keywords: 'coastal flooding, tidal damage' },
    { slug: 'tornado-damage', title: 'Tornado Damage Cleanup', keywords: 'twister damage, severe wind' }
  ],
  'sewage-cleanup': [
    { slug: 'toilet-backup', title: 'Toilet Sewage Backup Cleanup', keywords: 'toilet overflow, bathroom sewage' },
    { slug: 'main-line-backup', title: 'Main Sewer Line Backup', keywords: 'sewer blockage, main drain backup' },
    { slug: 'septic-overflow', title: 'Septic Tank Overflow Cleanup', keywords: 'septic backup, tank overflow' },
    { slug: 'grease-trap-overflow', title: 'Grease Trap Overflow', keywords: 'commercial kitchen, grease spill' },
    { slug: 'storm-drain-backup', title: 'Storm Drain Sewage Backup', keywords: 'stormwater overflow, drain flooding' },
    { slug: 'basement-sewage', title: 'Basement Sewage Flooding', keywords: 'lower level sewage, underground backup' },
    { slug: 'commercial-sewage', title: 'Commercial Sewage Cleanup', keywords: 'business sewage, workplace contamination' },
    { slug: 'grey-water-cleanup', title: 'Grey Water Damage Cleanup', keywords: 'washing machine water, sink overflow' },
    { slug: 'black-water-cleanup', title: 'Black Water Contamination', keywords: 'category 3 water, hazardous sewage' },
    { slug: 'sewage-decontamination', title: 'Sewage Decontamination Services', keywords: 'sanitization, bacterial cleanup' }
  ],
  'specialty-services': [
    { slug: 'asbestos-water-damage', title: 'Asbestos Water Damage', keywords: 'wet asbestos, contaminated materials' },
    { slug: 'document-drying', title: 'Document Water Damage Recovery', keywords: 'paper restoration, book drying' },
    { slug: 'electronics-water-damage', title: 'Electronics Water Damage', keywords: 'computer water damage, device recovery' },
    { slug: 'art-restoration', title: 'Water Damaged Art Restoration', keywords: 'painting restoration, artwork recovery' },
    { slug: 'antique-restoration', title: 'Antique Water Damage Restoration', keywords: 'heritage items, valuable restoration' },
    { slug: 'piano-water-damage', title: 'Piano Water Damage Restoration', keywords: 'musical instrument, piano flooding' },
    { slug: 'wine-cellar-flooding', title: 'Wine Cellar Flood Recovery', keywords: 'wine storage, cellar water damage' },
    { slug: 'boat-water-damage', title: 'Marine Water Damage', keywords: 'boat flooding, yacht restoration' },
    { slug: 'caravan-water-damage', title: 'Caravan Water Damage', keywords: 'RV flooding, mobile home water' },
    { slug: 'solar-panel-water-damage', title: 'Solar Panel Water Damage', keywords: 'solar system, panel flooding' }
  ],
  'emergency-services': [
    { slug: '24-hour-water-extraction', title: '24 Hour Water Extraction', keywords: 'emergency pumping, rapid extraction' },
    { slug: 'emergency-board-up', title: 'Emergency Board Up Services', keywords: 'security boarding, window boarding' },
    { slug: 'emergency-tarping', title: 'Emergency Roof Tarping', keywords: 'temporary roof, tarp installation' },
    { slug: 'emergency-power', title: 'Emergency Power Solutions', keywords: 'generators, temporary power' },
    { slug: 'emergency-drying', title: 'Emergency Structural Drying', keywords: 'rapid drying, moisture removal' },
    { slug: 'emergency-plumbing', title: 'Emergency Plumbing Services', keywords: 'burst pipe repair, leak stop' },
    { slug: 'after-hours-response', title: 'After Hours Emergency Response', keywords: 'night emergency, weekend service' },
    { slug: 'priority-response', title: 'Priority Emergency Response', keywords: 'rapid deployment, first response' },
    { slug: 'disaster-response', title: 'Natural Disaster Response', keywords: 'catastrophe response, major event' },
    { slug: 'emergency-sanitization', title: 'Emergency Sanitization', keywords: 'urgent disinfection, contamination control' }
  ],
  'location-specific': [
    { slug: 'brisbane-cbd-water-damage', title: 'Brisbane CBD Water Damage', keywords: 'city flooding, downtown Brisbane' },
    { slug: 'gold-coast-flood-restoration', title: 'Gold Coast Flood Restoration', keywords: 'coastal flooding, beach property' },
    { slug: 'sunshine-coast-water-damage', title: 'Sunshine Coast Water Damage', keywords: 'coastal damage, beach restoration' },
    { slug: 'ipswich-flood-recovery', title: 'Ipswich Flood Recovery', keywords: 'western flooding, Ipswich restoration' },
    { slug: 'logan-water-damage', title: 'Logan Water Damage Services', keywords: 'Logan flooding, southern Brisbane' },
    { slug: 'redlands-storm-damage', title: 'Redlands Storm Damage', keywords: 'bayside damage, island restoration' },
    { slug: 'moreton-bay-flooding', title: 'Moreton Bay Flood Services', keywords: 'northern flooding, bay area' },
    { slug: 'toowoomba-water-damage', title: 'Toowoomba Water Damage', keywords: 'highlands flooding, mountain damage' },
    { slug: 'cairns-cyclone-damage', title: 'Cairns Cyclone Recovery', keywords: 'tropical damage, FNQ restoration' },
    { slug: 'townsville-flood-restoration', title: 'Townsville Flood Restoration', keywords: 'north QLD flooding, tropical recovery' }
  ]
};

// Template for generating sub-pillar pages using AgContentPageTemplate
const generatePageContent = (category, page) => {
  const safeName = page.title.replace(/\s+/g, '');
  return `import { Metadata } from 'next';
import { Wrench } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: '${page.title} | Professional Services | Disaster Recovery',
  description: 'Professional ${page.title.toLowerCase()} services in Queensland. 24/7 emergency response. Insurance approved.',
  keywords: '${page.keywords}'
};

export default function ${safeName}Page() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)',
        icon: <Wrench className="h-12 w-12" />,
        title: '${page.title}',
        subtitle: 'Expert ${page.title.toLowerCase()} services across Queensland. Fast response, professional restoration, insurance approved.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim/start' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: '${category.replace(/-/g, " ").replace(/\\b\\w/g, l => l.toUpperCase())}', href: '/services/${category}' },
        { label: '${page.title}' },
      ]}
    />
  );
}`;
};

// Create directories and files
Object.entries(subPillarPages).forEach(([category, pages]) => {
  pages.forEach(page => {
    const dir = path.join(__dirname, '..', 'app', 'services', category, page.slug);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const content = generatePageContent(category, page);
    fs.writeFileSync(path.join(dir, 'page.tsx'), content);
    console.log(`Created: ${category}/${page.slug}/page.tsx (AG)`);
  });
});

console.log('\n✅ Successfully generated 100 sub-pillar pages with Antigravity templates!');
Object.keys(subPillarPages).forEach(category => {
  console.log(`- ${category}: ${subPillarPages[category].length} pages`);
});
