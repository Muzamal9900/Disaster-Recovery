'use client';

import { AgFAQPageTemplate } from '@/components/antigravity';

const faqs = [
  {
    "question": "What should I do first in an emergency?",
    "answer": "Ensure safety first - evacuate if necessary. Turn off water/electricity if safe. Document damage with photos. Submit our online form immediately. Do not attempt major cleanup yourself."
  },
  {
    "question": "Are services available 24/7?",
    "answer": "Yes, our online system and contractor network operate 24/7/365 including weekends and holidays. After-hours surcharges may apply but are insurance covered."
  },
  {
    "question": "What's the difference between emergency and scheduled service?",
    "answer": "Emergency service: Immediate response for active damage, 30-60 minute response, prevents secondary damage. Scheduled service: For non-urgent repairs, planned within 1-3 days, often lower cost."
  },
  {
    "question": "How do I choose between multiple contractor quotes?",
    "answer": "Consider: Response time, specific experience with your damage type, customer reviews, included services, warranty offered. All our contractors meet minimum standards, so choose based on your specific needs."
  },
  {
    "question": "What areas do you service?",
    "answer": "We cover all of Australia through our certified contractor network. Major cities have multiple contractors. Regional and remote areas are serviced through extended radius partnerships."
  }
];

export default function EmergencyResponseFAQsPage() {
  return (
    <AgFAQPageTemplate
      category="Emergency Response"
      title="Emergency Response FAQs"
      subtitle="Everything about emergency response restoration"
      faqs={faqs.map(f => ({ question: f.question, answer: f.answer }))}
    />
  );
}
