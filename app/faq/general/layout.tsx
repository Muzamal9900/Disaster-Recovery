import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'General FAQs | Disaster Recovery Australia',
  description: 'General frequently asked questions about disaster recovery services in Australia. Learn how our system works, pricing, IICRC certification, and the claims process.',
  keywords: ['disaster recovery FAQ', 'restoration service questions', 'IICRC certified FAQ', 'disaster recovery cost', 'property restoration Australia'],
  alternates: { canonical: 'https://disasterrecovery.com.au/faq/general' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
