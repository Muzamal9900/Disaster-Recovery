/**
 * AntigravityBrandEquipment — Showcases branded equipment across 5-card grid
 * Converted from BrandEquipment.astro
 */

import Image from 'next/image';
import { AntigravityBrandLogo } from './AntigravityBrandLogo';

const equipment = [
  {
    image: '/images/antigravity/gear-deviceMockups.png',
    alt: 'Disaster Recovery Command Apps on Devices',
    title: 'Command Ecosystem',
    description: 'Seamlessly integrated technology for claims management across iPads, mobiles, and laptops.',
  },
  {
    image: '/images/antigravity/gear-ppe.png',
    alt: 'Hazmat suits, Boots, Helmets',
    title: 'Safety & PPE',
    description: 'Rigorous safety standards, helmets, and hazmat gear deployed confidently on every disastrous site.',
  },
  {
    image: '/images/antigravity/gear-fieldEssentials.png',
    alt: 'Flashlights, Umbrella, Powerbank',
    title: 'Field Essentials',
    description: 'Prepared for any environment or storm with our branded, battle-tested deployment kits.',
  },
  {
    image: '/images/antigravity/gear-golfAndHydration.png',
    alt: 'Golf tools and hydration',
    title: 'Executive Partners',
    description: 'Quality flows through down to the finer details for our corporate associates and clientele.',
  },
  {
    image: '/images/antigravity/gear-sprayerBusinessCards.png',
    alt: 'Business cards, Caution tape, Sprayer',
    title: 'Chemical & Remediation Assets',
    description: 'From caution tape to branded negative air machines, every asset serves to protect our clients.',
  },
];

export function AntigravityBrandEquipment() {
  return (
    <section className="ag-equipment-section ag-container">
      <div className="ag-section-header">
        <div className="ag-badge-pulse-blue">Operational Excellence</div>
        <h2>Every Detail Matters</h2>
        <p>
          From the uniforms of our on-site technicians to the heavy machinery we deploy,
          the{' '}
          <AntigravityBrandLogo width="120px" className="ag-inline-logo" />
          {' '}brand is ubiquitous. It represents swift action, safety, and a resilient
          future everywhere we operate.
        </p>
      </div>

      <div className="ag-equipment-grid">
        {equipment.map((item, i) => (
          <div key={i} className="ag-equipment-card">
            <div className="ag-img-wrapper">
              <Image
                src={item.image}
                alt={item.alt}
                width={600}
                height={340}
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
