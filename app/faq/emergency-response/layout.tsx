import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Emergency Response FAQs | Disaster Recovery Australia',
  description: 'Frequently asked questions about emergency disaster response. Learn what to do first, 24/7 availability, response times, and emergency vs scheduled services.',
  keywords: ['emergency response FAQ', 'disaster emergency help', '24/7 emergency restoration', 'emergency response time', 'disaster recovery Australia'],
  alternates: { canonical: 'https://disasterrecovery.com.au/faq/emergency-response' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
