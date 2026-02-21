import type { ContentSection } from '@/components/antigravity';

interface CostSectionParams {
  city: string;
  serviceType: string;
}

const SERVICE_LABELS: Record<string, string> = {
  'water-damage': 'Water Damage Restoration',
  'fire-damage': 'Fire Damage Restoration',
  'mould-removal': 'Mould Remediation',
  'flood-restoration': 'Flood Restoration',
  'storm-damage': 'Storm Damage Repair',
};

const PRICE_RANGES: Record<string, { small: string; medium: string; large: string }> = {
  'water-damage': { small: '$2,500 – $5,000', medium: '$5,000 – $15,000', large: '$15,000 – $50,000+' },
  'fire-damage': { small: '$5,000 – $10,000', medium: '$10,000 – $35,000', large: '$35,000 – $100,000+' },
  'mould-removal': { small: '$1,500 – $4,000', medium: '$4,000 – $12,000', large: '$12,000 – $30,000+' },
  'flood-restoration': { small: '$3,000 – $7,000', medium: '$7,000 – $20,000', large: '$20,000 – $60,000+' },
  'storm-damage': { small: '$2,000 – $6,000', medium: '$6,000 – $18,000', large: '$18,000 – $45,000+' },
};

const COST_FACTORS: Record<string, string[]> = {
  'water-damage': [
    'Category of water (clean, grey, or black water)',
    'Total area affected in square metres',
    'Duration of water exposure before remediation begins',
    'Type of materials affected (carpet, hardwood, plasterboard)',
    'Whether structural drying or demolition is required',
  ],
  'fire-damage': [
    'Extent of fire, smoke, and soot damage',
    'Structural integrity and demolition requirements',
    'Smoke odour penetration into materials',
    'Contents restoration vs replacement',
    'Hazardous materials (asbestos) requiring specialist removal',
  ],
  'mould-removal': [
    'Total area of mould contamination',
    'Species of mould (some require specialist protocols)',
    'Accessibility of affected areas (wall cavities, roof spaces)',
    'Underlying moisture source identification and repair',
    'Air quality testing and clearance requirements',
  ],
  'flood-restoration': [
    'Contamination level of floodwater (Category 1–3)',
    'Depth and duration of water inundation',
    'Number of rooms and floors affected',
    'Structural damage to foundations, walls, and flooring',
    'Electrical, plumbing, and HVAC system damage',
  ],
  'storm-damage': [
    'Type of storm damage (wind, hail, rain ingress, debris)',
    'Roof and structural integrity assessment results',
    'Water ingress extent and secondary damage',
    'Emergency board-up and tarping requirements',
    'Tree or debris removal from the property',
  ],
};

export function getCostSections({ city, serviceType }: CostSectionParams): ContentSection[] {
  const serviceLabel = SERVICE_LABELS[serviceType] ?? serviceType.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const prices = PRICE_RANGES[serviceType] ?? PRICE_RANGES['water-damage'];
  const factors = COST_FACTORS[serviceType] ?? COST_FACTORS['water-damage'];

  return [
    {
      heading: `${serviceLabel} Costs in ${city}`,
      body: (
        <>
          <p>
            Understanding {serviceLabel.toLowerCase()} costs in {city} helps you make informed
            decisions during a stressful time. While every situation is unique, the pricing
            information below gives you a realistic guide to what professional restoration typically
            costs in the {city} area.
          </p>
          <p>
            As insurance-approved providers, our {city} contractors direct-bill your insurer for
            covered events — meaning you typically pay nothing out of pocket beyond your policy
            excess. For non-insured work, we provide free, no-obligation quotes before any work
            begins.
          </p>
          <p>
            All pricing includes GST, and our contractors do not charge call-out fees for emergency
            assessments in the {city} metropolitan area.
          </p>
        </>
      ),
    },
    {
      heading: `Typical ${serviceLabel} Price Ranges — ${city}`,
      background: 'light',
      body: (
        <>
          <p>The following price ranges represent typical {serviceLabel.toLowerCase()} costs in {city} based on job size:</p>
          <ul>
            <li><strong>Small job (single room / limited area):</strong> {prices.small}</li>
            <li><strong>Medium job (multiple rooms / moderate damage):</strong> {prices.medium}</li>
            <li><strong>Large job (entire property / severe damage):</strong> {prices.large}</li>
          </ul>
          <p>
            These are indicative ranges only. Every property is different, and your actual cost will
            depend on the specific factors outlined below. Our {city} team provides a detailed,
            written quote after the initial assessment — before any chargeable work begins.
          </p>
        </>
      ),
    },
    {
      heading: 'Factors That Affect Your Cost',
      body: (
        <>
          <p>
            Several key factors influence the final cost of {serviceLabel.toLowerCase()} in {city}.
            Understanding these helps you assess quotes and set realistic expectations:
          </p>
          <ol>
            {factors.map((factor, i) => (
              <li key={i}><strong>{factor.split('(')[0].trim()}</strong>{factor.includes('(') ? ` (${factor.split('(')[1]}` : ''}</li>
            ))}
          </ol>
          <p>
            Speed of response is often the single biggest factor in total cost. Properties where
            restoration begins within the first 24 hours typically see 40–60% lower total costs
            compared to delayed responses, as secondary damage (mould, structural degradation) is
            prevented.
          </p>
        </>
      ),
    },
    {
      heading: 'Insurance Coverage and Direct Billing',
      background: 'light',
      body: (
        <>
          <p>
            Most home and commercial insurance policies in Australia cover {serviceLabel.toLowerCase()} when
            caused by sudden, accidental events. Our {city} contractors are approved providers for
            all major insurers, which means:
          </p>
          <ul>
            <li><strong>No upfront payments</strong> — We bill your insurer directly for approved claims.</li>
            <li><strong>Claims management</strong> — We handle all documentation, photos, and insurer communication.</li>
            <li><strong>Policy excess only</strong> — You typically pay only your policy excess amount.</li>
            <li><strong>Scope agreement</strong> — We agree the scope of works with your insurer before starting, so there are no surprise bills.</li>
          </ul>
          <p>
            If you are unsure whether your situation is covered, our team can review your policy
            details during the initial assessment and advise you before any commitment.
          </p>
        </>
      ),
    },
    {
      heading: `${serviceLabel} Cost FAQ — ${city}`,
      body: (
        <>
          <h3>How much does {serviceLabel.toLowerCase()} cost in {city}?</h3>
          <p>
            Costs range from {prices.small} for a small, contained job to {prices.large} for
            severe damage across an entire property. Most insured residential claims fall in the
            {prices.medium} range.
          </p>
          <h3>Will my insurance cover this?</h3>
          <p>
            Most home insurance policies cover {serviceLabel.toLowerCase()} from sudden events
            (storms, burst pipes, accidental fires). Gradual damage from maintenance neglect is
            usually excluded. We can check your policy at no cost.
          </p>
          <h3>Do you charge for quotes in {city}?</h3>
          <p>
            No. We provide free emergency assessments and written quotes in the {city} area.
            There is no obligation and no call-out fee.
          </p>
          <h3>Can I get a payment plan?</h3>
          <p>
            Yes. For non-insured work, we offer flexible payment plans on jobs over $2,500.
            Speak to your {city} project manager for details.
          </p>
        </>
      ),
    },
  ];
}
