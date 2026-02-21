'use client';

import Link from 'next/link';
import { AgLegalPageTemplate } from '@/components/antigravity';

export default function NonCompeteAgreementsPage() {
  return (
    <AgLegalPageTemplate
      title="Non-Compete Agreements"
      category="Non Compete"
      description="Legal documents and agreements for non compete"
    />
  );
}
