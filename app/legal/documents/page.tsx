'use client';

import Link from 'next/link';
import { AgLegalPageTemplate } from '@/components/antigravity';

export default function LegalDocumentsPage() {
  return (
    <AgLegalPageTemplate
      title="Legal Document Library"
      category="Documents"
      description="Legal documents and agreements for documents"
    />
  );
}
