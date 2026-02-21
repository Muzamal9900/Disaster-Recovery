'use client';

import Link from 'next/link';
import { AgLegalPageTemplate } from '@/components/antigravity';

export default function APITermsofUsePage() {
  return (
    <AgLegalPageTemplate
      title="API Terms of Use"
      category="Api Terms"
      description="Legal documents and agreements for api terms"
    />
  );
}
