import { Metadata } from 'next';
import { Cpu } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';



export default function TechnologyAIPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0C4A6E 0%, #0369A1 100%)',
        icon: <Cpu className="h-12 w-12" />,
        title: 'AI-Powered Restoration',
        
      }}
      cta={{ text: 'See Our Technology', href: '/services' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Technology', href: '/technology' },
        { label: 'AI-Powered Restoration' },
      ]}
    />
  );
}
