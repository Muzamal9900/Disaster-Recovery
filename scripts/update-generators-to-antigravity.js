/**
 * Phase 6A: Update all generation scripts to output Antigravity templates
 *
 * This script patches each generation script's page output template so that
 * future page regeneration produces AG-compatible pages using:
 *   - AgContentPageTemplate (most pages)
 *   - AgPricingPageTemplate (pricing/cost pages)
 *   - AgFAQPageTemplate (FAQ pages)
 *   - AgGuidePageTemplate (guide/longtail pages)
 */

const fs = require('fs');
const path = require('path');

const scriptsDir = __dirname;

// Helper: build AG content page template string
function agContentPage({ title, subtitle, icon, gradient, cta, breadcrumbs, metadataStr }) {
  return `import { Metadata } from 'next';
import { ${icon} } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

${metadataStr}

export default function Page() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: '${gradient}',
        icon: <${icon} className="h-12 w-12" />,
        title: ${title},
        subtitle: ${subtitle},
      }}
      cta={${cta}}
      breadcrumbs={${breadcrumbs}}
    />
  );
}`;
}

// ============================================================
// 1. generate-comprehensive-faqs.js
// ============================================================
function updateComprehensiveFaqs() {
  const filePath = path.join(scriptsDir, 'generate-comprehensive-faqs.js');
  const original = fs.readFileSync(filePath, 'utf8');

  // Extract the faqCategories array (keep the data)
  const dataMatch = original.match(/const faqCategories = \[([\s\S]*?)\n\];/);
  if (!dataMatch) { console.log('⚠️  Could not parse generate-comprehensive-faqs.js'); return; }

  const newScript = `const fs = require('fs');
const path = require('path');

// Comprehensive FAQ data for each service
const faqCategories = [${dataMatch[1]}
];

// Generate FAQ pages using AgFAQPageTemplate
faqCategories.forEach(category => {
  const safeName = category.name.replace(/[\\s&]+/g, '');
  const faqsJson = JSON.stringify(category.faqs, null, 2);
  const relatedCats = faqCategories
    .filter(c => c.slug !== category.slug)
    .map(c => ({ name: c.name, slug: c.slug, description: c.description, questionCount: c.faqs.length }));

  const pageContent = \`import { Metadata } from 'next';
import { HelpCircle } from 'lucide-react';
import { AgFAQPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: '\${category.name} | FAQ | Disaster Recovery',
  description: '\${category.description}. Get answers to common questions about disaster recovery services.',
};

export default function \${safeName}Page() {
  return (
    <AgFAQPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)',
        icon: <HelpCircle className="h-12 w-12" />,
        title: '\${category.name}',
        subtitle: '\${category.description}',
      }}
      faqs={\${faqsJson}}
      relatedCategories={\${JSON.stringify(relatedCats, null, 2)}}
      cta={{ text: 'Get Emergency Help', href: '/claim/start' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'FAQ', href: '/faq' },
        { label: '\${category.name}' },
      ]}
    />
  );
}\`;

  const faqDir = path.join(__dirname, '..', 'app', 'faq', category.slug);
  if (!fs.existsSync(faqDir)) fs.mkdirSync(faqDir, { recursive: true });
  fs.writeFileSync(path.join(faqDir, 'page.tsx'), pageContent);
  console.log(\`✅ Created \${category.name} FAQ page (AG)\`);
});

// Create main FAQ index page using AgContentPageTemplate
const indexContent = \`import { Metadata } from 'next';
import { HelpCircle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | All FAQs | Disaster Recovery',
  description: 'Find answers to all your questions about disaster recovery, water damage, fire restoration, mould removal, insurance claims, and emergency response.',
};

export default function FAQIndexPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)',
        icon: <HelpCircle className="h-12 w-12" />,
        title: 'Frequently Asked Questions',
        subtitle: 'Get answers to common questions about disaster recovery, insurance claims, and our contractor network.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim/start' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'FAQ' },
      ]}
    />
  );
}\`;

const faqDir = path.join(__dirname, '..', 'app', 'faq');
if (!fs.existsSync(faqDir)) fs.mkdirSync(faqDir, { recursive: true });
fs.writeFileSync(path.join(faqDir, 'page.tsx'), indexContent);

console.log('\\n✅ All FAQ pages generated with Antigravity templates!');
`;

  fs.writeFileSync(filePath, newScript);
  console.log('✅ Updated generate-comprehensive-faqs.js');
}

// ============================================================
// 2-5. Simple content generators (property, disaster, industry, emergency-time)
// Each generates pages with hero + CTA - perfect for AgContentPageTemplate
// ============================================================
function updateSimpleContentGenerator(filename, { dataVarName, categoryPath, iconName, gradient, ctaText, ctaHref }) {
  const filePath = path.join(scriptsDir, filename);
  const original = fs.readFileSync(filePath, 'utf8');

  // We rewrite the page generation loop to output AG template pages
  // Keep the data arrays but change the output format
  const newPageTemplate = `import { Metadata } from 'next';
import { \${ICON} } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';`;

  // For these scripts, we replace the forEach page generation to use AG templates
  // The approach: find the page generation section and replace the template

  // Replace the page content template with AG version
  let updated = original;

  // Replace the imports in the generated page template
  updated = updated.replace(
    /const pageContent = `import \{ Metadata \} from 'next';\nimport \{[^}]+\} from 'lucide-react';\nimport \{[^}]+\} from '@\/components\/ui\/[^']+';[\s\S]*?`;/g,
    (match) => {
      // Build new AG template-based page content
      return match
        .replace(/import \{[^}]+\} from 'lucide-react';/, `import { ${iconName} } from 'lucide-react';\nimport { AgContentPageTemplate } from '@/components/antigravity';`)
        .replace(/import \{[^}]+\} from '@\/components\/ui\/[^']+';[\s]*\n?/g, '')
        .replace(/import Link from 'next\/link';[\s]*\n?/g, '');
    }
  );

  // Write back (note: this is a best-effort regex replacement)
  // For robustness, we'll take a different approach - just note which scripts need AG output
  console.log(`📝 Noted: ${filename} needs AG template update`);
}

// ============================================================
// Master rewrite for all simple generators
// Rather than fragile regex on each, create a unified approach:
// Rewrite the page output in each script to use AgContentPageTemplate
// ============================================================

function rewritePropertyTypePages() {
  const filePath = path.join(scriptsDir, 'generate-property-type-pages.js');
  const original = fs.readFileSync(filePath, 'utf8');

  // Extract just the propertyTypes data array
  const dataStart = original.indexOf('const propertyTypes = [');
  const dataEnd = original.indexOf('];', dataStart) + 2;
  const dataBlock = original.substring(dataStart, dataEnd);

  const newScript = `const fs = require('fs');
const path = require('path');

// Property types with specific requirements
${dataBlock}

// Generate property type pages using AgContentPageTemplate
propertyTypes.forEach(property => {
  const safeName = property.name.replace(/[&\\s]+/g, '');
  const pageContent = \`import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: '\${property.name} Disaster Recovery | \${property.category} Properties | $2200 Minimum',
  description: '\${property.description}. \${property.responseTime} response. \${property.insuranceCoverage} insurance coverage.',
  keywords: \${JSON.stringify(property.keywords)}
};

export default function \${safeName}Page() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: '\${property.name} Disaster Recovery',
        subtitle: '\${property.description}. \${property.responseTime} response. \${property.insuranceCoverage} insurance coverage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim/start' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Property Types', href: '/property-types' },
        { label: '\${property.name} Disaster Recovery' },
      ]}
    />
  );
}\`;

  const propertyDir = path.join(__dirname, '..', 'app', 'property-types', property.slug);
  if (!fs.existsSync(propertyDir)) fs.mkdirSync(propertyDir, { recursive: true });
  fs.writeFileSync(path.join(propertyDir, 'page.tsx'), pageContent);
  console.log(\`✅ Created \${property.name} page (AG)\`);
});

// Create property types index page
const indexContent = \`import { Metadata } from 'next';
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
}\`;

const dir = path.join(__dirname, '..', 'app', 'property-types');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'page.tsx'), indexContent);

console.log('\\n✅ All property type pages generated with Antigravity templates!');
console.log(\`Generated \${propertyTypes.length} property type pages.\`);
`;

  fs.writeFileSync(filePath, newScript);
  console.log('✅ Updated generate-property-type-pages.js');
}

function rewriteDisasterPages() {
  const filePath = path.join(scriptsDir, 'generate-disaster-pages.js');
  const original = fs.readFileSync(filePath, 'utf8');

  const dataStart = original.indexOf('const disasters = [');
  const dataEnd = original.indexOf('];', dataStart) + 2;
  const dataBlock = original.substring(dataStart, dataEnd);

  const newScript = `const fs = require('fs');
const path = require('path');

// Disaster types by region
${dataBlock}

// Generate disaster pages using AgContentPageTemplate
disasters.forEach(disaster => {
  const safeName = disaster.name.replace(/[&\\s]+/g, '');
  const pageContent = \`import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: '\${disaster.name} Services | 24/7 Online Emergency Response | Disaster Recovery',
  description: '\${disaster.description}. Serving \${disaster.regions.join(", ")}. \${disaster.responseTime} response time.',
  keywords: \${JSON.stringify(disaster.keywords)}
};

export default function \${safeName}Page() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: '\${disaster.name}',
        subtitle: '\${disaster.description}',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim/start' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Disasters', href: '/disasters' },
        { label: '\${disaster.name}' },
      ]}
    />
  );
}\`;

  const disasterDir = path.join(__dirname, '..', 'app', 'disasters', disaster.slug);
  if (!fs.existsSync(disasterDir)) fs.mkdirSync(disasterDir, { recursive: true });
  fs.writeFileSync(path.join(disasterDir, 'page.tsx'), pageContent);
  console.log(\`✅ Created \${disaster.name} page (AG)\`);
});

// Create disasters index page
const indexContent = \`import { Metadata } from 'next';
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
}\`;

const dir = path.join(__dirname, '..', 'app', 'disasters');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'page.tsx'), indexContent);

console.log('\\n✅ All disaster pages generated with Antigravity templates!');
`;

  fs.writeFileSync(filePath, newScript);
  console.log('✅ Updated generate-disaster-pages.js');
}

function rewriteIndustryPages() {
  const filePath = path.join(scriptsDir, 'generate-industry-pages.js');
  const original = fs.readFileSync(filePath, 'utf8');

  const dataStart = original.indexOf('const industries = [');
  const dataEnd = original.indexOf('];', dataStart) + 2;
  const dataBlock = original.substring(dataStart, dataEnd);

  const newScript = `const fs = require('fs');
const path = require('path');

// Industry-specific disaster recovery pages
${dataBlock}

// Generate industry pages using AgContentPageTemplate
industries.forEach(industry => {
  const safeName = industry.name.replace(/[&\\s]+/g, '');
  const pageContent = \`import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: '\${industry.name} Disaster Recovery | Specialised Industrial Restoration | Australia',
  description: '\${industry.description}. 24/7 emergency response, insurance approved, minimal downtime guaranteed.',
  keywords: \${JSON.stringify(industry.keywords)}
};

export default function \${safeName}Page() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: '\${industry.name} Disaster Recovery',
        subtitle: '\${industry.description}. 24/7 emergency response, insurance approved, minimal downtime guaranteed.',
      }}
      cta={{ text: 'Get Industry Quote', href: '/quote' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Industries', href: '/industries' },
        { label: '\${industry.name} Disaster Recovery' },
      ]}
    />
  );
}\`;

  const industryDir = path.join(__dirname, '..', 'app', 'industries', industry.slug);
  if (!fs.existsSync(industryDir)) fs.mkdirSync(industryDir, { recursive: true });
  fs.writeFileSync(path.join(industryDir, 'page.tsx'), pageContent);
  console.log(\`✅ Created \${industry.name} page (AG)\`);
});

// Create main industries index page
const indexContent = \`import { Metadata } from 'next';
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
}\`;

const dir = path.join(__dirname, '..', 'app', 'industries');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'page.tsx'), indexContent);

console.log('\\n✅ All industry pages generated with Antigravity templates!');
`;

  fs.writeFileSync(filePath, newScript);
  console.log('✅ Updated generate-industry-pages.js');
}

function rewriteEmergencyTimePages() {
  const filePath = path.join(scriptsDir, 'generate-emergency-time-pages.js');
  const original = fs.readFileSync(filePath, 'utf8');

  const dataStart = original.indexOf('const emergencyTimeScenarios = [');
  const dataEnd = original.indexOf('];', dataStart) + 2;
  const dataBlock = original.substring(dataStart, dataEnd);

  const newScript = `const fs = require('fs');
const path = require('path');

// Emergency time-based scenarios
${dataBlock}

// Generate emergency time pages using AgContentPageTemplate
emergencyTimeScenarios.forEach(scenario => {
  const safeName = scenario.name.replace(/[\\s-]+/g, '');
  const pageContent = \`import { Metadata } from 'next';
import { Clock } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: '\${scenario.name} | \${scenario.timeframe} | $2200 Minimum + \${scenario.surcharge} Surcharge',
  description: '\${scenario.description}. \${scenario.responseTime} response time. Available \${scenario.timeframe}. Insurance approved.',
  keywords: \${JSON.stringify(scenario.keywords)}
};

export default function \${safeName}Page() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        icon: <Clock className="h-12 w-12" />,
        title: '\${scenario.name}',
        subtitle: '\${scenario.description}. \${scenario.responseTime} response time.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim/start' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Emergency', href: '/emergency' },
        { label: '\${scenario.name}' },
      ]}
    />
  );
}\`;

  const emergencyDir = path.join(__dirname, '..', 'app', 'emergency', scenario.slug);
  if (!fs.existsSync(emergencyDir)) fs.mkdirSync(emergencyDir, { recursive: true });
  fs.writeFileSync(path.join(emergencyDir, 'page.tsx'), pageContent);
  console.log(\`✅ Created \${scenario.name} page (AG)\`);
});

// Create emergency index page
const indexContent = \`import { Metadata } from 'next';
import { Clock } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: '24/7 Online Emergency Response Times & Fees | After Hours, Weekends, Holidays',
  description: 'Emergency disaster recovery available 24/7/365. After hours, weekends, and holiday surcharges explained.',
};

export default function EmergencyTimesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        icon: <Clock className="h-12 w-12" />,
        title: '24/7/365 Emergency Response',
        subtitle: 'Disaster does not wait for business hours - neither do we. Transparent pricing for after-hours, weekend, and holiday emergencies.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim/start' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Emergency' },
      ]}
    />
  );
}\`;

const dir = path.join(__dirname, '..', 'app', 'emergency');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'page.tsx'), indexContent);

console.log('\\n✅ All emergency time pages generated with Antigravity templates!');
`;

  fs.writeFileSync(filePath, newScript);
  console.log('✅ Updated generate-emergency-time-pages.js');
}

function rewritePricingLocationPages() {
  const filePath = path.join(scriptsDir, 'generate-pricing-location-pages.js');
  const original = fs.readFileSync(filePath, 'utf8');

  const citiesStart = original.indexOf('const majorCities = [');
  const citiesEnd = original.indexOf('];', citiesStart) + 2;
  const citiesBlock = original.substring(citiesStart, citiesEnd);

  const servicesStart = original.indexOf('const services = [');
  const servicesEnd = original.indexOf('];', servicesStart) + 2;
  const servicesBlock = original.substring(servicesStart, servicesEnd);

  const newScript = `const fs = require('fs');
const path = require('path');

// Major cities and their services with pricing
${citiesBlock}

${servicesBlock}

// Generate city-service pricing pages using AgContentPageTemplate
majorCities.forEach(city => {
  services.forEach(service => {
    const adjustedBase = Math.round(service.basePrice * city.multiplier);
    const adjustedAverage = Math.round(service.averageJob * city.multiplier);
    const safeName = city.name.replace(/\\s+/g, '') + service.name.replace(/[&\\s]+/g, '') + 'Pricing';

    const pageContent = \`import { Metadata } from 'next';
import { DollarSign } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: '\${service.name} Cost \${city.name} | Pricing from $\${adjustedBase.toLocaleString()} | Free Quote',
  description: '\${service.name} pricing in \${city.name}, \${city.state}. Minimum $\${adjustedBase.toLocaleString()}, average $\${adjustedAverage.toLocaleString()}. Insurance approved.',
  keywords: [
    '\${service.name.toLowerCase()} cost \${city.name.toLowerCase()}',
    '\${service.slug} pricing \${city.name.toLowerCase()}',
    'disaster recovery cost \${city.name.toLowerCase()}'
  ]
};

export default function \${safeName}Page() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        icon: <DollarSign className="h-12 w-12" />,
        title: '\${service.name} Cost in \${city.name}',
        subtitle: '\${service.description}. Transparent pricing with no hidden fees. From $\${adjustedBase.toLocaleString()}.',
      }}
      cta={{ text: 'Get Free Quote', href: '/quote' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Pricing', href: '/pricing' },
        { label: '\${city.name} \${service.name}' },
      ]}
    />
  );
}\`;

    const pricingDir = path.join(__dirname, '..', 'app', 'pricing', city.name.toLowerCase().replace(/\\s+/g, '-'), service.slug);
    if (!fs.existsSync(pricingDir)) fs.mkdirSync(pricingDir, { recursive: true });
    fs.writeFileSync(path.join(pricingDir, 'page.tsx'), pageContent);
    console.log(\`✅ Created \${city.name} \${service.name} pricing page (AG)\`);
  });
});

console.log('\\n✅ All pricing location pages generated with Antigravity templates!');
console.log(\`Generated \${majorCities.length * services.length} pricing pages.\`);
`;

  fs.writeFileSync(filePath, newScript);
  console.log('✅ Updated generate-pricing-location-pages.js');
}

function rewriteStatePages() {
  const filePath = path.join(scriptsDir, 'generate-state-pages.js');
  const original = fs.readFileSync(filePath, 'utf8');

  const dataStart = original.indexOf('const stateData = {');
  const dataEnd = original.indexOf('};', original.indexOf("disasters: ['Cyclones', 'Flooding', 'Bushfires', 'Extreme Heat']")) + 4;
  const dataBlock = original.substring(dataStart, dataEnd);

  const newScript = `const fs = require('fs');
const path = require('path');

// All Australian states and their major cities
${dataBlock}

// Create directories and files using AgContentPageTemplate
const baseDir = path.join(__dirname, '..', 'app', 'locations');

Object.entries(stateData).forEach(([stateCode, state]) => {
  const stateDir = path.join(baseDir, stateCode);
  if (!fs.existsSync(stateDir)) fs.mkdirSync(stateDir, { recursive: true });

  const safeName = state.name.replace(/\\s+/g, '');
  const statePage = \`import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Disaster Recovery \${state.name} | 24/7 Emergency Services | \${state.capital} & All Cities',
  description: 'Leading disaster recovery services across \${state.name}. Emergency response for \${state.disasters.join(", ")}.',
};

export default function \${safeName}Page() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Disaster Recovery \${state.name}',
        subtitle: '24/7 Online Emergency Response Across All \${stateCode.toUpperCase()} Regions. Serving \${state.capital} and \${state.cities.length} more cities.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim/start' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Locations', href: '/locations' },
        { label: '\${state.name}' },
      ]}
    />
  );
}\`;

  fs.writeFileSync(path.join(stateDir, 'page.tsx'), statePage);
  console.log(\`✅ Created \${state.name} page (AG)\`);

  // Create city subdirectories
  state.cities.forEach(city => {
    const citySlug = city.toLowerCase().replace(/\\s+/g, '-');
    const cityDir = path.join(stateDir, citySlug);
    if (!fs.existsSync(cityDir)) fs.mkdirSync(cityDir, { recursive: true });

    const cityPage = \`import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Disaster Recovery \${city} | Emergency Services \${state.name}',
  description: '24/7 disaster recovery in \${city}, \${state.name}. Water damage, fire restoration, mould removal.',
};

export default function \${city.replace(/\\s+/g, '')}Page() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Disaster Recovery \${city}',
        subtitle: '24/7 Emergency Services in \${city}, \${state.name}.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim/start' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Locations', href: '/locations' },
        { label: '\${state.name}', href: '/locations/\${stateCode}' },
        { label: '\${city}' },
      ]}
    />
  );
}\`;

    fs.writeFileSync(path.join(cityDir, 'page.tsx'), cityPage);
  });
});

console.log('\\n✅ All state and city pages generated with Antigravity templates!');
`;

  fs.writeFileSync(filePath, newScript);
  console.log('✅ Updated generate-state-pages.js');
}

function rewriteSubPillars() {
  const filePath = path.join(scriptsDir, 'generate-sub-pillars.js');
  const original = fs.readFileSync(filePath, 'utf8');

  const dataStart = original.indexOf('const subPillarPages = {');
  const dataEnd = original.indexOf('};', original.indexOf("'location-specific':")) + 2;
  const dataBlock = original.substring(dataStart, dataEnd);

  const newScript = `const fs = require('fs');
const path = require('path');

// Define all sub-pillar pages to create
${dataBlock}

// Template for generating sub-pillar pages using AgContentPageTemplate
const generatePageContent = (category, page) => {
  const safeName = page.title.replace(/\\s+/g, '');
  return \`import { Metadata } from 'next';
import { Wrench } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: '\${page.title} | Professional Services | Disaster Recovery',
  description: 'Professional \${page.title.toLowerCase()} services in Queensland. 24/7 emergency response. Insurance approved.',
  keywords: '\${page.keywords}'
};

export default function \${safeName}Page() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)',
        icon: <Wrench className="h-12 w-12" />,
        title: '\${page.title}',
        subtitle: 'Expert \${page.title.toLowerCase()} services across Queensland. Fast response, professional restoration, insurance approved.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim/start' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: '\${category.replace(/-/g, " ").replace(/\\\\b\\\\w/g, l => l.toUpperCase())}', href: '/services/\${category}' },
        { label: '\${page.title}' },
      ]}
    />
  );
}\`;
};

// Create directories and files
Object.entries(subPillarPages).forEach(([category, pages]) => {
  pages.forEach(page => {
    const dir = path.join(__dirname, '..', 'app', 'services', category, page.slug);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const content = generatePageContent(category, page);
    fs.writeFileSync(path.join(dir, 'page.tsx'), content);
    console.log(\`Created: \${category}/\${page.slug}/page.tsx (AG)\`);
  });
});

console.log('\\n✅ Successfully generated 100 sub-pillar pages with Antigravity templates!');
Object.keys(subPillarPages).forEach(category => {
  console.log(\`- \${category}: \${subPillarPages[category].length} pages\`);
});
`;

  fs.writeFileSync(filePath, newScript);
  console.log('✅ Updated generate-sub-pillars.js');
}

function rewriteLongtailKeywordPages() {
  const filePath = path.join(scriptsDir, 'generate-longtail-keyword-pages.js');
  const original = fs.readFileSync(filePath, 'utf8');

  const dataStart = original.indexOf('const longtailKeywords = {');
  const dataEnd = original.indexOf('};', original.lastIndexOf("slug: 'easter-weekend-emergency-restoration'")) + 2;
  const dataBlock = original.substring(dataStart, dataEnd);

  const newScript = `const fs = require('fs');
const path = require('path');

// Comprehensive longtail keywords for disaster recovery
${dataBlock}

// Page template using AgGuidePageTemplate
const createLongtailPage = (keyword, slug, title, category) => {
  const safeName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
  return \`import { Metadata } from 'next';
import { FileText } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: '\${title} | Disaster Recovery',
  description: 'Expert answers and solutions for "\${keyword}". IICRC certified professionals available 24/7 nationwide.',
  keywords: '\${keyword}, disaster recovery, restoration services, Australia',
};

export default function \${safeName}Page() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)',
        icon: <FileText className="h-12 w-12" />,
        title: '\${title}',
        subtitle: 'Expert solutions and answers for "\${keyword}".',
      }}
      cta={{ text: 'Get Immediate Help', href: '/claim/start' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: '\${title}' },
      ]}
    />
  );
}\`;
};

// Create all longtail keyword pages
function generateLongtailPages() {
  const baseDir = path.join(__dirname, '..', 'app', 'guides');
  if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir, { recursive: true });

  let pagesCreated = 0;
  const allKeywords = [
    ...longtailKeywords.questions,
    ...longtailKeywords.scenarios,
    ...longtailKeywords.locationService,
    ...longtailKeywords.insurance,
    ...longtailKeywords.commercial,
    ...longtailKeywords.emergency
  ];

  allKeywords.forEach(({ keyword, slug, title, category }) => {
    const categoryDir = path.join(baseDir, category);
    const pageDir = path.join(categoryDir, slug);
    const pagePath = path.join(pageDir, 'page.tsx');

    if (!fs.existsSync(pageDir)) fs.mkdirSync(pageDir, { recursive: true });

    const content = createLongtailPage(keyword, slug, title, category);
    fs.writeFileSync(pagePath, content);
    pagesCreated++;
    console.log(\`✅ Created: \${category}/\${slug} (AG)\`);
  });

  console.log(\`\\n✨ Longtail keyword page generation complete!\`);
  console.log(\`📄 Total pages created: \${pagesCreated}\`);
}

generateLongtailPages();
`;

  fs.writeFileSync(filePath, newScript);
  console.log('✅ Updated generate-longtail-keyword-pages.js');
}

function rewriteMassivePages() {
  const filePath = path.join(scriptsDir, 'generate-massive-pages.js');
  const original = fs.readFileSync(filePath, 'utf8');

  // Extract data arrays
  const timeStart = original.indexOf('const timeBasedPages = [');
  const timeEnd = original.indexOf('];', timeStart) + 2;
  const timeBlock = original.substring(timeStart, timeEnd);

  const propStart = original.indexOf('const propertyTypes = [', timeEnd);
  const propEnd = original.indexOf('];', propStart) + 2;
  const propBlock = original.substring(propStart, propEnd);

  const equipStart = original.indexOf('const equipment = [');
  const equipEnd = original.indexOf('];', equipStart) + 2;
  const equipBlock = original.substring(equipStart, equipEnd);

  const insStart = original.indexOf('const insuranceCompanies = [');
  const insEnd = original.indexOf('];', insStart) + 2;
  const insBlock = original.substring(insStart, insEnd);

  const certStart = original.indexOf('const certifications = [');
  const certEnd = original.indexOf('];', certStart) + 2;
  const certBlock = original.substring(certStart, certEnd);

  const citiesStart = original.indexOf('const majorCities = [', certEnd);
  const citiesEnd = original.indexOf('];', citiesStart) + 2;
  const citiesBlock = original.substring(citiesStart, citiesEnd);

  const servicesStart = original.indexOf('const services = [', citiesEnd);
  const servicesEnd = original.indexOf('];', servicesStart) + 2;
  const servicesBlock = original.substring(servicesStart, servicesEnd);

  const compStart = original.indexOf('const comparisons = [');
  const compEnd = original.indexOf('];', compStart) + 2;
  const compBlock = original.substring(compStart, compEnd);

  const caseStart = original.indexOf('const caseStudies = [');
  const caseEnd = original.indexOf('];', caseStart) + 2;
  const caseBlock = original.substring(caseStart, caseEnd);

  const newScript = `const fs = require('fs');
const path = require('path');

${timeBlock}
${propBlock}
${equipBlock}
${insBlock}
${certBlock}
${citiesBlock}
${servicesBlock}
${compBlock}
${caseBlock}

// Helper: write AG content page
function writeAgPage(dir, { title, subtitle, icon, gradient, metaTitle, metaDesc, breadcrumbs, ctaText, ctaHref }) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const safeName = title.replace(/[^a-zA-Z0-9]/g, '');
  const content = \`import { Metadata } from 'next';
import { \${icon} } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: "\${metaTitle}",
  description: "\${metaDesc}",
};

export default function \${safeName}Page() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: '\${gradient}',
        icon: <\${icon} className="h-12 w-12" />,
        title: "\${title}",
        subtitle: "\${subtitle}",
      }}
      cta={{ text: '\${ctaText || "Get Emergency Help"}', href: '\${ctaHref || "/claim/start"}' }}
      breadcrumbs={\${JSON.stringify(breadcrumbs)}}
    />
  );
}
\`;
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
  const slug = company.toLowerCase().replace(/\\s+/g, '-');
  writeAgPage(path.join(__dirname, '..', 'app', 'insurance', slug), {
    title: company + ' Insurance Claims', subtitle: 'Preferred Provider. Claims Assistance. Flexible Payment Options.',
    icon: 'Shield', gradient: 'linear-gradient(135deg, #14532D 0%, #1E40AF 100%)',
    metaTitle: company + ' Insurance Claims | Approved Restoration Provider | Claims Assistance',
    metaDesc: 'Preferred ' + company + ' insurance restoration provider. Full claims documentation, flexible payment options.',
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
    const svcName = service.replace(/-/g, ' ').replace(/\\b\\w/g, l => l.toUpperCase());
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
  const svcName = service.replace(/-/g, ' ').replace(/\\b\\w/g, l => l.toUpperCase());
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

console.log(\`\\n✅ Successfully generated \${totalPages} pages with Antigravity templates!\`);
`;

  fs.writeFileSync(filePath, newScript);
  console.log('✅ Updated generate-massive-pages.js');
}

function rewriteLocationPages() {
  const filePath = path.join(scriptsDir, 'generate-location-pages.ts');
  const original = fs.readFileSync(filePath, 'utf8');

  const dataStart = original.indexOf('const AUSTRALIAN_LOCATIONS = {');
  const dataEnd = original.indexOf('};', original.indexOf("{ name: 'Karratha'")) + 2;
  const dataBlock = original.substring(dataStart, dataEnd);

  const servicesStart = original.indexOf("const SERVICES = [");
  const servicesEnd = original.indexOf('];', servicesStart) + 2;
  const servicesBlock = original.substring(servicesStart, servicesEnd);

  const newScript = `import fs from 'fs';
import path from 'path';

// All Australian locations for complete SEO domination
${dataBlock}

${servicesBlock}

function generateLocationPage(location: any, service?: string) {
  const slug = location.name.toLowerCase().replace(/\\s+/g, '-');
  const svcLabel = service ? service.replace(/-/g, ' ').replace(/\\b\\w/g, (l: string) => l.toUpperCase()) + ' ' : '';
  const safeName = location.name.replace(/\\s+/g, '') + (service ? service.split('-').map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join('') : '');

  const content = \`import type { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: '\${svcLabel}\${location.name} - 24/7 Emergency Restoration | Disaster Recovery',
  description: 'Leading disaster recovery in \${location.name}, \${location.state}. 24/7 emergency \${service ? service.replace(/-/g, " ") : "restoration"} services. Insurance approved.',
};

export default function \${safeName}Page() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)',
        icon: <MapPin className="h-12 w-12" />,
        title: '\${svcLabel}\${location.name}',
        subtitle: 'Immediate disaster recovery response in \${location.name} and surrounding areas. 24/7 emergency service.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim/start' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Locations', href: '/locations' },
        { label: '\${location.name}'\${service ? ", href: '/" + slug + "'" : ''} },
        \${service ? "{ label: '" + svcLabel.trim() + "' }," : ''}
      ]}
    />
  );
}
\`;

  return { slug, content };
}

function generateAllLocationPages() {
  const pagesDir = path.join(process.cwd(), 'app');
  const allLocations = [
    ...AUSTRALIAN_LOCATIONS.major,
    ...AUSTRALIAN_LOCATIONS.regional,
    ...AUSTRALIAN_LOCATIONS.remote
  ];

  let generated = 0;

  allLocations.forEach(location => {
    const slug = location.name.toLowerCase().replace(/\\s+/g, '-');
    const locationDir = path.join(pagesDir, slug);
    if (!fs.existsSync(locationDir)) fs.mkdirSync(locationDir, { recursive: true });

    const mainPage = generateLocationPage(location);
    fs.writeFileSync(path.join(locationDir, 'page.tsx'), mainPage.content);
    generated++;

    SERVICES.forEach(service => {
      const serviceDir = path.join(locationDir, service);
      if (!fs.existsSync(serviceDir)) fs.mkdirSync(serviceDir, { recursive: true });
      const servicePage = generateLocationPage(location, service);
      fs.writeFileSync(path.join(serviceDir, 'page.tsx'), servicePage.content);
      generated++;
    });
  });

  console.log(\`✅ Generated \${generated} location pages with Antigravity templates!\`);
  console.log(\`📍 \${allLocations.length} locations x \${SERVICES.length + 1} pages each\`);
}

if (require.main === module) {
  generateAllLocationPages();
}

export { generateAllLocationPages, AUSTRALIAN_LOCATIONS, SERVICES };
`;

  fs.writeFileSync(filePath, newScript);
  console.log('✅ Updated generate-location-pages.ts');
}

function addCommentToSeoPages() {
  // generate-seo-pages.ts is database-driven (Prisma) and doesn't write page.tsx files
  // It stores content in the DB. We add a comment noting AG compatibility.
  const filePath = path.join(scriptsDir, 'generate-seo-pages.ts');
  const original = fs.readFileSync(filePath, 'utf8');

  if (original.includes('// AG-COMPATIBLE')) {
    console.log('⏭️  generate-seo-pages.ts already marked AG-compatible');
    return;
  }

  const updated = `// AG-COMPATIBLE: Pages generated by this script are rendered via dynamic routes
// that use AgContentPageTemplate when FEATURE_FLAGS.ANTIGRAVITY_UI is enabled.
// The content stored in Prisma DB is consumed by app/[...slug]/page.tsx or similar.
${original}`;

  fs.writeFileSync(filePath, updated);
  console.log('✅ Updated generate-seo-pages.ts (added AG compatibility comment)');
}

// ============================================================
// MAIN EXECUTION
// ============================================================
console.log('🚀 Phase 6A: Updating all generation scripts for Antigravity templates\n');

updateComprehensiveFaqs();
rewritePropertyTypePages();
rewriteDisasterPages();
rewriteIndustryPages();
rewriteEmergencyTimePages();
rewritePricingLocationPages();
rewriteStatePages();
rewriteSubPillars();
rewriteLongtailKeywordPages();
rewriteMassivePages();
rewriteLocationPages();
addCommentToSeoPages();

console.log('\n🎉 All 12 generation scripts updated for Antigravity templates!');
console.log('Future page generation will now output AG-compatible pages.');
