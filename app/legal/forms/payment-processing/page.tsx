'use client';

import Link from 'next/link';
import { AgLegalPageTemplate } from '@/components/antigravity';

export default function PaymentProcessingTermsPage() {
  return (
    <AgLegalPageTemplate
      title="Payment Processing Terms"
      category="Payment Processing"
      description="Legal documents and agreements for payment processing"
    />
  );
}
