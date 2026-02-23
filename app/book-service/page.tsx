import { Metadata } from 'next';
import BookServicePage from './BookServiceClient';

export const metadata: Metadata = {
  title: 'Book Restoration Service | Disaster Recovery Australia',
  description: 'Book professional disaster restoration services online. Water damage, fire, mould, and storm repair. Certified contractors, insurance-approved.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/book-service',
  },
  openGraph: {
    title: 'Book Restoration Service | Disaster Recovery Australia',
    description: 'Book professional disaster restoration services online. Certified contractors, insurance-approved.',
    type: 'website',
  },
};

export default function BookServicePageWrapper() {
  return <BookServicePage />;
}
