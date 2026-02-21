const fs = require('fs');
const path = require('path');

// Emergency time-based scenarios
const emergencyTimeScenarios = [
  {
    slug: 'after-hours-emergency',
    name: 'After Hours Emergency Service',
    timeframe: '5PM - 9AM Weekdays',
    surcharge: '$500',
    description: '24/7 emergency response when disaster strikes outside business hours',
    keywords: ['after hours emergency', 'night time disaster recovery', 'evening emergency service'],
    urgencyLevel: 'Critical',
    responseTime: '30 minutes'
  },
  {
    slug: 'weekend-emergency',
    name: 'Weekend Emergency Response',
    timeframe: 'Saturday & Sunday',
    surcharge: '$750',
    description: 'Immediate weekend disaster recovery when you need it most',
    keywords: ['weekend emergency', 'saturday disaster recovery', 'sunday emergency service'],
    urgencyLevel: 'Critical',
    responseTime: '30 minutes'
  },
  {
    slug: 'public-holiday-emergency',
    name: 'Public Holiday Emergency',
    timeframe: 'All Public Holidays',
    surcharge: '$1000',
    description: 'Holiday disaster response when other services are closed',
    keywords: ['public holiday emergency', 'christmas emergency', 'easter disaster recovery'],
    urgencyLevel: 'Critical',
    responseTime: '45 minutes'
  },
  {
    slug: 'midnight-emergency',
    name: 'Midnight Emergency Response',
    timeframe: '12AM - 6AM',
    surcharge: '$750',
    description: 'Middle of the night disaster recovery services',
    keywords: ['midnight emergency', 'late night disaster', '3am emergency service'],
    urgencyLevel: 'Extreme',
    responseTime: '45 minutes'
  },
  {
    slug: 'christmas-emergency',
    name: 'Christmas Day Emergency',
    timeframe: 'December 25th',
    surcharge: '$1500',
    description: 'Christmas Day disaster recovery - we never close',
    keywords: ['christmas emergency', 'december 25 disaster', 'xmas day recovery'],
    urgencyLevel: 'Extreme',
    responseTime: '60 minutes'
  },
  {
    slug: 'new-year-emergency',
    name: 'New Year Emergency Service',
    timeframe: 'December 31st - January 1st',
    surcharge: '$1500',
    description: 'New Year disaster response when others are celebrating',
    keywords: ['new year emergency', 'nye disaster recovery', 'january 1 emergency'],
    urgencyLevel: 'Extreme',
    responseTime: '60 minutes'
  },
  {
    slug: 'early-morning-emergency',
    name: 'Early Morning Emergency',
    timeframe: '4AM - 7AM',
    surcharge: '$500',
    description: 'Dawn disaster recovery before the day begins',
    keywords: ['early morning emergency', 'dawn disaster', '5am emergency service'],
    urgencyLevel: 'High',
    responseTime: '30 minutes'
  },
  {
    slug: 'sunday-night-emergency',
    name: 'Sunday Night Emergency',
    timeframe: 'Sunday 6PM - Monday 6AM',
    surcharge: '$750',
    description: 'Sunday night disaster recovery before the work week',
    keywords: ['sunday night emergency', 'sunday evening disaster', 'pre-monday emergency'],
    urgencyLevel: 'High',
    responseTime: '30 minutes'
  }
];

// Generate emergency time pages using AgContentPageTemplate
emergencyTimeScenarios.forEach(scenario => {
  const safeName = scenario.name.replace(/[\s-]+/g, '');
  const pageContent = `import { Metadata } from 'next';
import { Clock } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: '${scenario.name} | ${scenario.timeframe} | $2200 Minimum + ${scenario.surcharge} Surcharge',
  description: '${scenario.description}. ${scenario.responseTime} response time. Available ${scenario.timeframe}. Insurance approved.',
  keywords: ${JSON.stringify(scenario.keywords)}
};

export default function ${safeName}Page() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        icon: <Clock className="h-12 w-12" />,
        title: '${scenario.name}',
        subtitle: '${scenario.description}. ${scenario.responseTime} response time.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim/start' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Emergency', href: '/emergency' },
        { label: '${scenario.name}' },
      ]}
    />
  );
}`;

  const emergencyDir = path.join(__dirname, '..', 'app', 'emergency', scenario.slug);
  if (!fs.existsSync(emergencyDir)) fs.mkdirSync(emergencyDir, { recursive: true });
  fs.writeFileSync(path.join(emergencyDir, 'page.tsx'), pageContent);
  console.log(`✅ Created ${scenario.name} page (AG)`);
});

// Create emergency index page
const indexContent = `import { Metadata } from 'next';
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
}`;

const dir = path.join(__dirname, '..', 'app', 'emergency');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'page.tsx'), indexContent);

console.log('\n✅ All emergency time pages generated with Antigravity templates!');
