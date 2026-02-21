'use client';

import Link from 'next/link';
import { AgLegalPageTemplate } from '@/components/antigravity';

export default function LegalDocumentsHub() {
  return (
    <AgLegalPageTemplate
      title="Legal Document Center"
      category="Legal"
      description="Legal documents and agreements for legal"
    />
  );
}
