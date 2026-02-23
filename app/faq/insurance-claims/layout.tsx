import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Insurance Claims FAQs | Disaster Recovery Australia',
  description: 'Frequently asked questions about insurance claims for disaster damage. Learn about direct billing, claim denials, excess payments, and documentation requirements.',
  keywords: ['insurance claims FAQ', 'disaster insurance questions', 'home insurance claim help', 'insurance billing restoration', 'property damage claim Australia'],
  alternates: { canonical: 'https://disasterrecovery.com.au/faq/insurance-claims' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
