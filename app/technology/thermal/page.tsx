import { Metadata } from 'next';
import { Cpu } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Certified Thermal Imaging Analysis | Level 1/2 Thermography | Disaster Recovery',
  description: 'Professional thermography services by certified Level 1/2 technicians. Electrical hot spot analysis, building envelope assessment, and quantitative thermal reporting. Only ~15 certified specialists nationally.',
  keywords: 'certified thermal imaging, Level 1 thermography, electrical hot spot detection, building envelope analysis, quantitative thermal analysis, thermography certification',
  openGraph: {
    title: 'Certified Thermal Imaging Analysis | Disaster Recovery',
    description: 'Beyond basic moisture detection - certified thermography analysis by qualified specialists.',
    images: ['/images/thermal-technology.jpg'] } };

export default function ThermalImagingPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0C4A6E 0%, #0369A1 100%)',
        icon: <Cpu className="h-12 w-12" />,
        title: 'Certified Thermal Analysis',
        subtitle: 'Beyond basic moisture detection - professional thermography by certified specialists. Only ~15 contractors nationally hold Level 1/2 Thermography certification for electrical analysis and building envelope assessment.',
      }}
      cta={{ text: 'See Our Technology', href: '/services' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Technology', href: '/technology' },
        { label: 'Certified Thermal Analysis' },
      ]}
    />
  );
}
