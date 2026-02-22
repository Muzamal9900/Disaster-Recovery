'use client';

/**
 * AntigravityQuickAssessment — Bento grid with mouse-tracking glow effect
 * Converted from QuickAssessment.astro
 *
 * Each card navigates to /claim/start?service={type}&urgency=emergency
 */

import { useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface AssessmentCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconAlt: string;
  wide?: boolean;
}

const cards: AssessmentCard[] = [
  {
    id: 'water',
    title: 'Water & Flood Extraction',
    description: 'Category 1-3 water mitigation, structural drying, and advanced dehumidification.',
    icon: '/images/antigravity/logo_3d_water.webp',
    iconAlt: 'Water Emergency',
    wide: true,
  },
  {
    id: 'fire',
    title: 'Fire & Smoke',
    description: 'Soot removal, thermal fogging, and odour neutralization.',
    icon: '/images/antigravity/logo_3d_fire.webp',
    iconAlt: 'Fire Emergency',
  },
  {
    id: 'mould',
    title: 'Mould Remediation',
    description: 'Air scrubbing, containment, and ATP testing protocols.',
    icon: '/images/antigravity/logo_3d_mould.webp',
    iconAlt: 'Mould Emergency',
  },
  {
    id: 'storm',
    title: 'Storm Response',
    description: 'Make-safe tarping, debris removal, and weather proofing.',
    icon: '/images/antigravity/logo_3d_storm.webp',
    iconAlt: 'Storm Emergency',
  },
  {
    id: 'biohazard',
    title: 'Biohazard & Forensic',
    description: 'Discreet, compliant decontamination and trauma scene recovery operations.',
    icon: '/images/antigravity/logo_3d_trauma.webp',
    iconAlt: 'Biohazard Emergency',
    wide: true,
  },
];

export function AntigravityQuickAssessment() {
  const router = useRouter();
  const cardRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    const card = cardRefs.current.get(id);
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  }, []);

  const handleCardClick = (serviceId: string) => {
    router.push(`/claim/start?service=${serviceId}&urgency=emergency`);
  };

  return (
    <section className="ag-assessment-section ag-container">
      <div className="ag-assessment-header">
        <div className="ag-badge-pulse">Live Network Connection</div>
        <h2>Emergency Rapid Assessment</h2>
        <p style={{ color: 'var(--ag-text-muted)', fontSize: '1.125rem', maxWidth: 600, margin: 0 }}>
          Select your emergency to initiate your $2750 automated connection to
          certified specialists across ANZ.
        </p>
      </div>

      <div className="ag-bento-grid">
        {cards.map((card) => (
          <button
            key={card.id}
            ref={(el) => { if (el) cardRefs.current.set(card.id, el); }}
            className={`ag-bento-card ag-bento-${card.id} ${card.wide ? 'ag-bento-wide' : ''}`}
            onMouseMove={(e) => handleMouseMove(e, card.id)}
            onClick={() => handleCardClick(card.id)}
            type="button"
          >
            <div className="ag-icon-glass ag-icon-glass-premium">
              <Image
                src={card.icon}
                alt={card.iconAlt}
                width={64}
                height={64}
                className="ag-custom-icon"
                draggable={false}
              />
            </div>
            <div className="ag-card-content">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
            <div className="ag-hover-glow" />
          </button>
        ))}
      </div>
    </section>
  );
}
