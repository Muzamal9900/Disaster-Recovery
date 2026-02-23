import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal Documents | Disaster Recovery Australia',
  description: 'Legal documents, policies, and compliance information for Disaster Recovery Australia. Contractor agreements, service terms, privacy policies, and regulatory compliance.',
  keywords: ['disaster recovery legal', 'contractor agreements', 'service terms', 'privacy policy', 'compliance documents Australia'],
  alternates: { canonical: 'https://disasterrecovery.com.au/legal' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
