import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Water Damage FAQs | Disaster Recovery Australia',
  description: 'Frequently asked questions about water damage restoration in Australia. Learn about water categories, drying timelines, insurance coverage, and when to call a professional.',
  keywords: ['water damage FAQ', 'water damage restoration questions', 'flood damage help', 'water extraction FAQ', 'water damage insurance Australia'],
  alternates: { canonical: 'https://disasterrecovery.com.au/faq/water-damage' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
