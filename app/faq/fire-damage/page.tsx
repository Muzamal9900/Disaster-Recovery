'use client';

import { AgFAQPageTemplate } from '@/components/antigravity';

const faqs = [
  {
    "question": "Is it safe to enter after a fire?",
    "answer": "Never enter until fire services declare it safe and structural integrity is confirmed. Dangers include structural collapse, toxic fumes, electrical hazards, and contaminated air. Wait for professional assessment."
  },
  {
    "question": "How do you remove smoke smell?",
    "answer": "Complete odour removal requires: Thermal fogging, ozone treatment, hydroxyl generators, HEPA air filtration, sealing affected surfaces, and sometimes removing porous materials. DIY methods only mask odours temporarily."
  },
  {
    "question": "What can be saved after fire damage?",
    "answer": "Many items can be restored: Metal and glass items, some electronics after professional cleaning, hard non-porous surfaces, some clothing and textiles. Items usually unsalvageable: Food, medicines, cosmetics, heavily charred materials."
  },
  {
    "question": "How long does fire restoration take?",
    "answer": "Minor smoke damage: 3-7 days. Moderate fire damage: 2-4 weeks. Major structural damage: 2-6 months. Timeline includes assessment, cleaning, repairs, and reconstruction as needed."
  },
  {
    "question": "Will insurance cover all fire damage?",
    "answer": "Most policies cover fire damage comprehensively including structure, contents, additional living expenses, and smoke damage. Coverage limits and deductibles apply. Document everything for claims."
  }
];

export default function FireSmokeDamageFAQsPage() {
  return (
    <AgFAQPageTemplate
      category="Fire Damage"
      title="Fire & Smoke Damage FAQs"
      subtitle="Everything about fire damage restoration"
      faqs={faqs.map(f => ({ question: f.question, answer: f.answer }))}
    />
  );
}
