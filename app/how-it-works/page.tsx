import { Metadata } from 'next';
import { FileText } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'How It Works | Disaster Recovery Australia',
  description: 'Learn how Disaster Recovery connects you with certified restoration professionals. Lodge a claim, get assessed, matched with a contractor, and restored — all with insurance support.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/how-it-works',
  },
};

export default function HowItWorksPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 50%, #0F2942 100%)',
        icon: <FileText className="h-12 w-12" />,
        title: 'How It Works',
        subtitle: 'From Damage to Restoration in 4 Simple Steps',
      }}
      cta={{ text: 'Lodge a Claim', href: '/claim/start' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'How It Works' },
      ]}
      stats={[
        { label: 'Response Time', value: '< 60 min' },
        { label: 'Certified Network', value: 'IICRC' },
        { label: 'Coverage', value: 'Australia Wide' },
        { label: 'Available', value: '24/7' },
      ]}
      sections={[
        {
          heading: 'Step 1: Lodge Your Claim',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>Submit your property damage details through our online form — available 24 hours a day, 7 days a week. Provide information about the type of damage, your property location, and any insurance details you have on hand.</p>
              <p>Our platform accepts all damage types including water, fire, storm, mould, flood, biohazard, and sewage. Whether it is a residential home or a commercial building, we handle it all.</p>
            </div>
          ),
        },
        {
          heading: 'Step 2: Rapid Assessment',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>Once your claim is submitted, our system immediately matches you with a certified contractor in your area. <strong>A qualified restoration professional will contact you within 60 minutes</strong> to discuss your situation and schedule an on-site inspection.</p>
              <p>The contractor conducts a thorough assessment, documents all damage with photos and moisture readings, and prepares a detailed scope of works.</p>
            </div>
          ),
          background: 'light',
        },
        {
          heading: 'Step 3: Contractor Matched',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>You are matched with an IICRC-certified local restoration professional from our vetted network. All contractors in the NRP network meet strict industry standards and carry comprehensive insurance.</p>
              <p>Your contractor handles all communication directly with you — scheduling inspections, performing emergency make-safe works, and coordinating the full restoration process.</p>
            </div>
          ),
        },
        {
          heading: 'Step 4: Restoration Complete',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>Your assigned contractor completes the full restoration to pre-loss condition. This includes emergency make-safe works, structural drying, repairs, and final sign-off.</p>
              <p>Throughout the process, your contractor assists with insurance liaison — documenting everything, communicating with your insurer, and ensuring your claim is handled professionally from start to finish.</p>
            </div>
          ),
          background: 'light',
        },
        {
          heading: 'Why Choose Disaster Recovery?',
          body: (
            <div className="prose prose-lg max-w-none">
              <ul>
                <li><strong>Australia-wide coverage</strong> — certified contractors in every state and territory</li>
                <li><strong>24/7 availability</strong> — submit your claim any time, day or night</li>
                <li><strong>IICRC-certified network</strong> — every contractor meets the highest industry standards</li>
                <li><strong>Insurance approved</strong> — we work with all major Australian insurers</li>
                <li><strong>60-minute response guarantee</strong> — a contractor will call you within the hour</li>
              </ul>
            </div>
          ),
          background: 'dark',
        },
      ]}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
