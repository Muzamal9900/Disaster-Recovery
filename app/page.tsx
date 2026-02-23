import { Metadata } from 'next';
import HomePage from './HomePageClient';

export const metadata: Metadata = {
  title: 'Disaster Recovery Australia | 24/7 Emergency Restoration Services',
  description: 'Australia\'s #1 digital disaster recovery platform. Connect with IICRC-certified restoration contractors 24/7. Water damage, fire damage, mould remediation, storm recovery. 60-minute response nationwide.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au',
  },
  openGraph: {
    title: 'Disaster Recovery Australia | 24/7 Emergency Restoration Services',
    description: 'Australia\'s #1 digital disaster recovery platform. IICRC-certified contractors, 60-minute response, 100% online.',
    type: 'website',
    url: 'https://disasterrecovery.com.au',
  },
};

export default function HomePageWrapper() {
  return <HomePage />;
}
