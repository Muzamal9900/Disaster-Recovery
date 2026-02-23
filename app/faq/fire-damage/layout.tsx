import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fire Damage FAQs | Disaster Recovery Australia',
  description: 'Frequently asked questions about fire and smoke damage restoration. Learn about safety after fires, smoke odour removal, salvageable items, and insurance claims.',
  keywords: ['fire damage FAQ', 'smoke damage questions', 'fire restoration help', 'fire damage insurance', 'smoke removal Australia'],
  alternates: { canonical: 'https://disasterrecovery.com.au/faq/fire-damage' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
