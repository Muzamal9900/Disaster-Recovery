import { Metadata } from 'next';
import { Scale } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Local vs National Companies | Comparison Guide | Make the Right Choice',
  description: 'Compare local vs national companies. Pros, cons, costs, and expert recommendations to help you decide.' };

export default function LocalvsNationalCompaniesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #581C87 0%, #7E22CE 100%)',
        icon: <Scale className="h-12 w-12" />,
        title: 'Local vs National Companies',
        subtitle: 'Make an Informed Decision',
      }}
      cta={{ text: 'Get Expert Advice', href: '/contact' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Compare', href: '/compare' },
        { label: 'Local vs National Companies' },
      ]}
    />
  );
}
