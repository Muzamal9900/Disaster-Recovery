'use client';

import Link from 'next/link';
import { AgLegalPageTemplate } from '@/components/antigravity';

export default function NonDisclosurePage() {
  return (
    <AgLegalPageTemplate
      title="Non Disclosure Documents"
      category="Non Disclosure"
      description="Legal documents and agreements for non disclosure"
    />
  );
}
