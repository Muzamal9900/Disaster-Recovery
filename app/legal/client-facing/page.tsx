'use client';

import Link from 'next/link';
import { AgLegalPageTemplate } from '@/components/antigravity';

export default function ClientFacingDocumentsPage() {
  return (
    <AgLegalPageTemplate
      title="Client-Facing Documents"
      category="Client Facing"
      description="Legal documents and agreements for client facing"
    />
  );
}
