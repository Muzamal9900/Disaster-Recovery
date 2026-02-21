'use client';

import Link from 'next/link';
import { AgLegalPageTemplate } from '@/components/antigravity';

export default function TermsofServicePage() {
  return (
    <AgLegalPageTemplate
      title="Terms of Service"
      category="Terms Of Service"
      description="Legal documents and agreements for terms of service"
    />
  );
}
