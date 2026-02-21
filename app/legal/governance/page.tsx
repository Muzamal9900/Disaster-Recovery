'use client';

import Link from 'next/link';
import { AgLegalPageTemplate } from '@/components/antigravity';

export default function GovernanceDocumentsPage() {
  return (
    <AgLegalPageTemplate
      title="Governance Documents"
      category="Governance"
      description="Legal documents and agreements for governance"
    />
  );
}
