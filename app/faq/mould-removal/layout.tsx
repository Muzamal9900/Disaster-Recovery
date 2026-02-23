import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mould Removal FAQs | Disaster Recovery Australia',
  description: 'Frequently asked questions about mould removal and remediation in Australia. Learn about health risks, DIY vs professional removal, costs, and prevention strategies.',
  keywords: ['mould removal FAQ', 'mould remediation questions', 'black mould help', 'mould removal cost', 'mould prevention Australia'],
  alternates: { canonical: 'https://disasterrecovery.com.au/faq/mould-removal' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
