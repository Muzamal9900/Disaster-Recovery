const fs = require('fs');
const path = require('path');

// Comprehensive longtail keywords for disaster recovery
const longtailKeywords = {
  // Question-based longtail keywords (High intent)
  questions: [
    {
      keyword: 'how much does water damage restoration cost in australia',
      slug: 'how-much-water-damage-restoration-cost',
      title: 'Water Damage Restoration Cost Guide Australia 2024',
      category: 'cost-guides'
    },
    {
      keyword: 'how long does fire damage restoration take',
      slug: 'how-long-fire-damage-restoration',
      title: 'Fire Damage Restoration Timeline: What to Expect',
      category: 'guides'
    },
    {
      keyword: 'what to do immediately after flood damage',
      slug: 'what-to-do-after-flood-damage',
      title: 'Immediate Steps After Flood Damage: Emergency Guide',
      category: 'emergency-guides'
    },
    {
      keyword: 'is mould removal covered by insurance in australia',
      slug: 'mould-removal-insurance-coverage',
      title: 'Is Mould Removal Covered by Insurance in Australia?',
      category: 'insurance-guides'
    },
    {
      keyword: 'who to call for emergency water damage',
      slug: 'who-to-call-water-damage-emergency',
      title: 'Emergency Water Damage: Who to Call First',
      category: 'emergency-guides'
    },
    {
      keyword: 'when to call professional disaster restoration',
      slug: 'when-to-call-disaster-restoration',
      title: 'When to Call Professional Disaster Restoration Services',
      category: 'guides'
    },
    {
      keyword: 'why hire iicrc certified restoration company',
      slug: 'why-hire-iicrc-certified',
      title: 'Why IICRC Certification Matters for Restoration',
      category: 'certifications'
    },
    {
      keyword: 'where to find 24 hour emergency restoration',
      slug: 'find-24-hour-emergency-restoration',
      title: '24 Hour Emergency Restoration Services Near You',
      category: 'emergency'
    },
    {
      keyword: 'which restoration company is best in australia',
      slug: 'best-restoration-company-australia',
      title: 'Best Restoration Companies in Australia: How to Choose',
      category: 'guides'
    },
    {
      keyword: 'what does disaster recovery service include',
      slug: 'what-disaster-recovery-includes',
      title: 'What\'s Included in Disaster Recovery Services',
      category: 'services'
    }
  ],

  // Specific scenario longtail keywords
  scenarios: [
    {
      keyword: 'burst pipe water damage ceiling repair cost',
      slug: 'burst-pipe-ceiling-repair-cost',
      title: 'Burst Pipe Ceiling Damage: Repair Costs & Process',
      category: 'water-damage'
    },
    {
      keyword: 'storm damage roof leak emergency repair',
      slug: 'storm-damage-roof-leak-repair',
      title: 'Emergency Storm Damage Roof Leak Repairs',
      category: 'storm-damage'
    },
    {
      keyword: 'sewage backup cleanup health risks',
      slug: 'sewage-backup-health-risks',
      title: 'Sewage Backup: Health Risks & Safe Cleanup',
      category: 'biohazard'
    },
    {
      keyword: 'black mould removal bathroom ceiling',
      slug: 'black-mould-bathroom-ceiling',
      title: 'Black Mould on Bathroom Ceiling: Removal Guide',
      category: 'mould'
    },
    {
      keyword: 'flood damage hardwood floor restoration',
      slug: 'flood-damage-hardwood-floors',
      title: 'Restoring Flood Damaged Hardwood Floors',
      category: 'flood-damage'
    },
    {
      keyword: 'smoke damage cleaning after house fire',
      slug: 'smoke-damage-cleaning-guide',
      title: 'Smoke Damage Cleaning After House Fire',
      category: 'fire-damage'
    },
    {
      keyword: 'category 3 water damage insurance claim',
      slug: 'category-3-water-damage-insurance',
      title: 'Category 3 Water Damage: Insurance Claims Guide',
      category: 'insurance'
    },
    {
      keyword: 'contents pack out storage restoration',
      slug: 'contents-pack-out-storage',
      title: 'Contents Pack Out & Storage During Restoration',
      category: 'services'
    },
    {
      keyword: 'emergency board up services after storm',
      slug: 'emergency-board-up-storm-damage',
      title: 'Emergency Board Up Services After Storm Damage',
      category: 'emergency'
    },
    {
      keyword: 'structural drying equipment rental cost',
      slug: 'structural-drying-equipment-cost',
      title: 'Structural Drying Equipment: Rental vs Professional Service',
      category: 'equipment'
    }
  ],

  // Location + service longtail keywords
  locationService: [
    {
      keyword: 'emergency water extraction sydney cbd after hours',
      slug: 'sydney-cbd-emergency-water-extraction',
      title: 'Sydney CBD Emergency Water Extraction - 24/7 Service',
      category: 'locations/sydney'
    },
    {
      keyword: 'melbourne apartment flood damage restoration',
      slug: 'melbourne-apartment-flood-restoration',
      title: 'Melbourne Apartment Flood Damage Restoration',
      category: 'locations/melbourne'
    },
    {
      keyword: 'brisbane commercial water damage restoration',
      slug: 'brisbane-commercial-water-damage',
      title: 'Brisbane Commercial Water Damage Restoration',
      category: 'locations/brisbane'
    },
    {
      keyword: 'perth storm damage emergency response team',
      slug: 'perth-storm-damage-emergency',
      title: 'Perth Storm Damage Emergency Response',
      category: 'locations/perth'
    },
    {
      keyword: 'adelaide mould remediation rental property',
      slug: 'adelaide-rental-mould-remediation',
      title: 'Adelaide Rental Property Mould Remediation',
      category: 'locations/adelaide'
    },
    {
      keyword: 'gold coast high rise water damage',
      slug: 'gold-coast-high-rise-water-damage',
      title: 'Gold Coast High Rise Water Damage Specialists',
      category: 'locations/gold-coast'
    },
    {
      keyword: 'canberra government building restoration',
      slug: 'canberra-government-restoration',
      title: 'Canberra Government Building Restoration Services',
      category: 'locations/canberra'
    },
    {
      keyword: 'newcastle industrial flood recovery services',
      slug: 'newcastle-industrial-flood-recovery',
      title: 'Newcastle Industrial Flood Recovery Services',
      category: 'locations/newcastle'
    },
    {
      keyword: 'sunshine coast hotel water damage restoration',
      slug: 'sunshine-coast-hotel-restoration',
      title: 'Sunshine Coast Hotel Water Damage Restoration',
      category: 'locations/sunshine-coast'
    },
    {
      keyword: 'wollongong coastal property storm damage',
      slug: 'wollongong-coastal-storm-damage',
      title: 'Wollongong Coastal Property Storm Damage Repair',
      category: 'locations/wollongong'
    }
  ],

  // Insurance-specific longtail keywords
  insurance: [
    {
      keyword: 'how to document water damage for insurance claim',
      slug: 'document-water-damage-insurance',
      title: 'Documenting Water Damage for Insurance Claims',
      category: 'insurance'
    },
    {
      keyword: 'insurance approved restoration contractors australia',
      slug: 'insurance-approved-contractors',
      title: 'Insurance Approved Restoration Contractors',
      category: 'insurance'
    },
    {
      keyword: 'make safe services insurance coverage',
      slug: 'make-safe-insurance-coverage',
      title: 'Make Safe Services: What Insurance Covers',
      category: 'insurance'
    },
    {
      keyword: 'loss assessor vs restoration contractor',
      slug: 'loss-assessor-vs-contractor',
      title: 'Loss Assessor vs Restoration Contractor: Roles Explained',
      category: 'insurance'
    },
    {
      keyword: 'insurance claim water damage depreciation',
      slug: 'insurance-depreciation-water-damage',
      title: 'Understanding Depreciation in Water Damage Claims',
      category: 'insurance'
    }
  ],

  // Commercial-specific longtail keywords
  commercial: [
    {
      keyword: 'office building water damage business interruption',
      slug: 'office-water-damage-business-interruption',
      title: 'Office Water Damage: Minimizing Business Interruption',
      category: 'commercial'
    },
    {
      keyword: 'restaurant kitchen fire damage restoration',
      slug: 'restaurant-fire-damage-restoration',
      title: 'Restaurant Kitchen Fire Damage Restoration',
      category: 'commercial'
    },
    {
      keyword: 'retail store flood damage inventory recovery',
      slug: 'retail-flood-inventory-recovery',
      title: 'Retail Store Flood: Inventory Recovery Process',
      category: 'commercial'
    },
    {
      keyword: 'warehouse roof leak damage restoration',
      slug: 'warehouse-roof-leak-restoration',
      title: 'Warehouse Roof Leak Damage Restoration',
      category: 'commercial'
    },
    {
      keyword: 'data centre water damage recovery',
      slug: 'data-centre-water-damage',
      title: 'Data Centre Water Damage Recovery Services',
      category: 'commercial'
    }
  ],

  // Emergency-specific longtail keywords
  emergency: [
    {
      keyword: 'middle of night flooding emergency help',
      slug: 'middle-night-flooding-emergency',
      title: 'Middle of Night Flooding: Emergency Response',
      category: 'emergency'
    },
    {
      keyword: 'weekend public holiday emergency restoration',
      slug: 'weekend-public-holiday-emergency',
      title: 'Weekend & Public Holiday Emergency Restoration',
      category: 'emergency'
    },
    {
      keyword: 'christmas day water damage emergency',
      slug: 'christmas-emergency-water-damage',
      title: 'Christmas Day Water Damage Emergency Services',
      category: 'emergency'
    },
    {
      keyword: 'new years eve disaster recovery services',
      slug: 'new-years-eve-disaster-recovery',
      title: 'New Year\'s Eve Disaster Recovery Services',
      category: 'emergency'
    },
    {
      keyword: 'easter long weekend emergency restoration',
      slug: 'easter-weekend-emergency-restoration',
      title: 'Easter Long Weekend Emergency Restoration',
      category: 'emergency'
    }
  ]
};

// Page template using AgGuidePageTemplate
const createLongtailPage = (keyword, slug, title, category) => {
  const safeName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
  return `import { Metadata } from 'next';
import { FileText } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: '${title} | Disaster Recovery',
  description: 'Expert answers and solutions for "${keyword}". IICRC certified professionals available 24/7 nationwide.',
  keywords: '${keyword}, disaster recovery, restoration services, Australia',
};

export default function ${safeName}Page() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)',
        icon: <FileText className="h-12 w-12" />,
        title: '${title}',
        subtitle: 'Expert solutions and answers for "${keyword}".',
      }}
      cta={{ text: 'Get Immediate Help', href: '/claim/start' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: '${title}' },
      ]}
    />
  );
}`;
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
    console.log(`✅ Created: ${category}/${slug} (AG)`);
  });

  console.log(`\n✨ Longtail keyword page generation complete!`);
  console.log(`📄 Total pages created: ${pagesCreated}`);
}

generateLongtailPages();
