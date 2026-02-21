'use client';

import Link from 'next/link';
import { AgLegalPageTemplate } from '@/components/antigravity';

export default function FinancialPaymentDocumentsPage() {
  return (
    <AgLegalPageTemplate
      title="Financial & Payment Documents"
      category="Financial Payment"
      description="Legal documents and agreements for financial payment"
    />
  );
}
