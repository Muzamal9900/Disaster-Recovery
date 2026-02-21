const fs = require('fs');
const path = require('path');

const timeBasedPages = [
  { slug: 'after-hours', name: 'After Hours Emergency', time: '5PM - 9AM' },
  { slug: 'weekend', name: 'Weekend Emergency', time: 'Saturday & Sunday' },
  { slug: 'public-holiday', name: 'Public Holiday Emergency', time: 'All Australian Holidays' },
  { slug: 'midnight', name: 'Midnight Emergency', time: '12AM - 6AM' },
  { slug: 'early-morning', name: 'Early Morning Emergency', time: '4AM - 7AM' },
  { slug: 'late-night', name: 'Late Night Emergency', time: '10PM - 2AM' },
  { slug: 'christmas', name: 'Christmas Emergency', time: 'December 24-26' },
  { slug: 'new-year', name: 'New Year Emergency', time: 'December 31 - January 2' },
  { slug: 'easter', name: 'Easter Emergency', time: 'Easter Long Weekend' },
  { slug: 'anzac-day', name: 'ANZAC Day Emergency', time: 'April 25' }
];
const propertyTypes = [
  { slug: 'residential', name: 'Residential Properties', description: 'Houses, units, apartments' },
  { slug: 'commercial', name: 'Commercial Buildings', description: 'Offices, shops, warehouses' },
  { slug: 'strata', name: 'Strata Properties', description: 'Body corporate managed properties' },
  { slug: 'government', name: 'Government Facilities', description: 'Federal, state, local government' },
  { slug: 'heritage', name: 'Heritage Buildings', description: 'Protected and historical properties' },
  { slug: 'high-rise', name: 'High Rise Buildings', description: 'Apartments and office towers' },
  { slug: 'industrial', name: 'Industrial Facilities', description: 'Factories and warehouses' },
  { slug: 'rental', name: 'Rental Properties', description: 'Investment and rental homes' },
  { slug: 'luxury', name: 'Luxury Properties', description: 'High-value estates and homes' },
  { slug: 'rural', name: 'Rural Properties', description: 'Farms and country properties' }
];
const equipment = [
  { slug: 'thermal-imaging', name: 'Thermal Imaging Cameras', purpose: 'Moisture detection' },
  { slug: 'moisture-meters', name: 'Professional Moisture Meters', purpose: 'Water damage assessment' },
  { slug: 'industrial-dehumidifiers', name: 'Industrial Dehumidifiers', purpose: 'Structural drying' },
  { slug: 'air-scrubbers', name: 'HEPA Air Scrubbers', purpose: 'Air purification' },
  { slug: 'hydroxyl-generators', name: 'Hydroxyl Generators', purpose: 'Odour elimination' },
  { slug: 'infrared-drying', name: 'Infrared Drying Systems', purpose: 'Targeted drying' },
  { slug: 'negative-air-machines', name: 'Negative Air Machines', purpose: 'Containment' },
  { slug: 'ozone-generators', name: 'Ozone Generators', purpose: 'Deodorization' },
  { slug: 'ultrasonic-cleaning', name: 'Ultrasonic Cleaning', purpose: 'Contents restoration' },
  { slug: 'drone-inspection', name: 'Drone Roof Inspection', purpose: 'Damage assessment' }
];
const insuranceCompanies = [
  'NRMA', 'AAMI', 'Allianz', 'QBE', 'Suncorp', 'CGU', 'Budget Direct',
  'RACQ', 'RACV', 'RAA', 'RAC', 'RACT', 'Youi', 'Woolworths Insurance',
  'Coles Insurance', 'CommInsure', 'ANZ Insurance', 'Westpac Insurance',
  'NAB Insurance', 'SGIC', 'SGIO', 'GIO', 'Shannons', 'Vero'
];
const certifications = [
  { slug: 'iicrc-certified', name: 'IICRC Certified', standard: 'International restoration standard' },
  { slug: 'australian-standards', name: 'Australian Standards Compliant', standard: 'AS/NZS compliance' },
  { slug: 'worksafe-certified', name: 'WorkSafe Certified', standard: 'Safety compliance' },
  { slug: 'asbestos-licensed', name: 'Asbestos Removal Licensed', standard: 'Class A & B asbestos' },
  { slug: 'hazmat-certified', name: 'HAZMAT Certified', standard: 'Hazardous materials' },
  { slug: 'iso-certified', name: 'ISO Certified', standard: 'Quality management' }
];
const majorCities = [
  'Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast',
  'Newcastle', 'Canberra', 'Sunshine Coast', 'Wollongong', 'Geelong',
  'Hobart', 'Townsville', 'Cairns', 'Darwin', 'Toowoomba', 'Ballarat',
  'Bendigo', 'Albury', 'Launceston', 'Mackay', 'Rockhampton', 'Bunbury',
  'Bundaberg', 'Coffs Harbour', 'Wagga Wagga', 'Hervey Bay', 'Mildura'
];
const services = [
  'water-damage', 'fire-damage', 'flood-restoration', 'mould-removal',
  'storm-damage', 'sewage-cleanup', 'carpet-drying', 'ceiling-repairs',
  'emergency-plumbing', 'contents-restoration', 'document-drying',
  'electronics-restoration', 'odour-removal', 'biohazard-cleanup'
];
const comparisons = [
  { slug: 'diy-vs-professional', name: 'DIY vs Professional Restoration' },
  { slug: 'insurance-vs-cash', name: 'Insurance Claim vs Cash Payment' },
  { slug: 'emergency-vs-scheduled', name: 'Emergency vs Scheduled Service' },
  { slug: 'local-vs-national', name: 'Local vs National Companies' },
  { slug: 'cheap-vs-quality', name: 'Cheap vs Quality Restoration' }
];
const caseStudies = [
  { slug: 'brisbane-floods-2022', name: 'Brisbane Floods 2022 Recovery' },
  { slug: 'black-summer-bushfires', name: 'Black Summer Bushfire Restoration' },
  { slug: 'townsville-floods-2019', name: 'Townsville Floods 2019' },
  { slug: 'cyclone-debbie-recovery', name: 'Cyclone Debbie Recovery' },
  { slug: 'sydney-storms-2021', name: 'Sydney Storms 2021' }
];

// Helper: write AG content page
function writeAgPage(dir, { title, subtitle, icon, gradient, metaTitle, metaDesc, breadcrumbs, ctaText, ctaHref }) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const safeName = title.replace(/[^a-zA-Z0-9]/g, '');
  const content = `import { Metadata } from 'next';
import { ${icon} } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: "${metaTitle}",
  description: "${metaDesc}",
};

export default function ${safeName}Page() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: '${gradient}',
        icon: <${icon} className="h-12 w-12" />,
        title: "${title}",
        subtitle: "${subtitle}",
      }}
      cta={{ text: '${ctaText || "Get Emergency Help"}', href: '${ctaHref || "/claim/start"}' }}
      breadcrumbs={${JSON.stringify(breadcrumbs)}}
    />
  );
}
`;
  fs.writeFileSync(path.join(dir, 'page.tsx'), content);
}

// Generate time-based emergency pages
console.log('Generating time-based emergency pages...');
timeBasedPages.forEach(t => {
  writeAgPage(path.join(__dirname, '..', 'app', 'emergency', t.slug), {
    title: t.name + ' Services', subtitle: 'Available ' + t.time + '. No Extra Charges. Same Day Response.',
    icon: 'Clock', gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
    metaTitle: t.name + ' Services | ' + t.time + ' | 24/7 Disaster Recovery',
    metaDesc: 'Emergency disaster recovery services available ' + t.time + '. Immediate response nationwide.',
    breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Emergency', href: '/emergency' }, { label: t.name }],
  });
});

// Generate property type pages
console.log('Generating property type pages...');
propertyTypes.forEach(p => {
  writeAgPage(path.join(__dirname, '..', 'app', 'property-types', p.slug), {
    title: p.name + ' Disaster Recovery', subtitle: p.description + '. Insurance approved, 24/7 response.',
    icon: 'Building2', gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
    metaTitle: p.name + ' Disaster Recovery | ' + p.description + ' | Australia',
    metaDesc: 'Specialised disaster recovery for ' + p.name.toLowerCase() + '. ' + p.description + '.',
    breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Property Types', href: '/property-types' }, { label: p.name }],
  });
});

// Generate equipment pages
console.log('Generating equipment and technology pages...');
equipment.forEach(e => {
  writeAgPage(path.join(__dirname, '..', 'app', 'equipment', e.slug), {
    title: e.name, subtitle: 'Professional Equipment for ' + e.purpose + '.',
    icon: 'Settings', gradient: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)',
    metaTitle: e.name + ' | ' + e.purpose + ' | Advanced Restoration Technology',
    metaDesc: 'Professional ' + e.name.toLowerCase() + ' for ' + e.purpose.toLowerCase() + '.',
    breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Equipment', href: '/equipment' }, { label: e.name }],
  });
});

// Generate insurance company pages
console.log('Generating insurance company partnership pages...');
insuranceCompanies.forEach(company => {
  const slug = company.toLowerCase().replace(/\s+/g, '-');
  writeAgPage(path.join(__dirname, '..', 'app', 'insurance', slug), {
    title: company + ' Insurance Claims', subtitle: 'Preferred Provider. Direct Billing. No Upfront Costs.',
    icon: 'Shield', gradient: 'linear-gradient(135deg, #14532D 0%, #1E40AF 100%)',
    metaTitle: company + ' Insurance Claims | Approved Restoration Provider | Direct Billing',
    metaDesc: 'Preferred ' + company + ' insurance restoration provider. Direct billing, no upfront costs.',
    breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Insurance', href: '/insurance' }, { label: company }],
    ctaText: 'Start Your Claim', ctaHref: '/claim/start',
  });
});

// Generate certification pages
console.log('Generating certification pages...');
certifications.forEach(c => {
  writeAgPage(path.join(__dirname, '..', 'app', 'certifications', c.slug), {
    title: c.name, subtitle: c.standard + '. Qualified, certified, and compliant disaster recovery.',
    icon: 'Award', gradient: 'linear-gradient(135deg, #581C87 0%, #7E22CE 100%)',
    metaTitle: c.name + ' | ' + c.standard + ' | Disaster Recovery',
    metaDesc: c.name + ' restoration services. ' + c.standard + '.',
    breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Certifications', href: '/certifications' }, { label: c.name }],
  });
});

// Generate cost pages
console.log('Generating cost/pricing pages...');
majorCities.slice(0, 10).forEach(city => {
  services.slice(0, 5).forEach(service => {
    const slug = city.toLowerCase() + '-' + service;
    const svcName = service.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    writeAgPage(path.join(__dirname, '..', 'app', 'cost', slug), {
      title: city + ' ' + svcName + ' Cost', subtitle: 'Transparent Pricing. Insurance Coverage. Free Quotes.',
      icon: 'DollarSign', gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
      metaTitle: city + ' ' + svcName + ' Cost | Pricing Guide | Free Quotes',
      metaDesc: 'How much does ' + svcName.toLowerCase() + ' cost in ' + city + '? Average prices and insurance coverage.',
      breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Cost', href: '/cost' }, { label: city + ' ' + svcName }],
      ctaText: 'Get Free Quote', ctaHref: '/quote',
    });
  });
});

// Generate FAQ pages
console.log('Generating FAQ pages...');
services.forEach(service => {
  const svcName = service.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  writeAgPage(path.join(__dirname, '..', 'app', 'faq', service), {
    title: svcName + ' FAQ', subtitle: 'Expert Answers to Your Questions.',
    icon: 'HelpCircle', gradient: 'linear-gradient(135deg, #312E81 0%, #3730A3 100%)',
    metaTitle: svcName + ' FAQ | Common Questions Answered | Expert Guide',
    metaDesc: 'Everything you need to know about ' + svcName.toLowerCase() + '.',
    breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'FAQ', href: '/faq' }, { label: svcName }],
  });
});

// Generate comparison pages
console.log('Generating comparison pages...');
comparisons.forEach(c => {
  writeAgPage(path.join(__dirname, '..', 'app', 'compare', c.slug), {
    title: c.name, subtitle: 'Make an Informed Decision.',
    icon: 'Scale', gradient: 'linear-gradient(135deg, #581C87 0%, #BE185D 100%)',
    metaTitle: c.name + ' | Comparison Guide | Make the Right Choice',
    metaDesc: 'Compare ' + c.name.toLowerCase() + '. Pros, cons, costs, and expert recommendations.',
    breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Compare', href: '/compare' }, { label: c.name }],
  });
});

// Generate case study pages
console.log('Generating case study pages...');
caseStudies.forEach(s => {
  writeAgPage(path.join(__dirname, '..', 'app', 'case-studies', s.slug), {
    title: 'Case Study: ' + s.name, subtitle: 'A Success Story in Disaster Recovery.',
    icon: 'FileText', gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
    metaTitle: s.name + ' | Case Study | Disaster Recovery Success Story',
    metaDesc: 'How we helped recover from ' + s.name + '. Real results, timelines, and restoration process.',
    breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Case Studies', href: '/case-studies' }, { label: s.name }],
  });
});

const totalPages = timeBasedPages.length + propertyTypes.length + equipment.length +
  insuranceCompanies.length + certifications.length + (10 * 5) + services.length +
  comparisons.length + caseStudies.length;

console.log(`\n✅ Successfully generated ${totalPages} pages with Antigravity templates!`);
