'use client';

import Link from 'next/link';
import { AgLegalPageTemplate } from '@/components/antigravity';

export default function SoftwareLicenseAgreementsPage() {
  return (
    <AgLegalPageTemplate
      title="Software License Agreements"
      category="Software License"
      description="Legal documents and agreements for software license"
    />
  );
}
