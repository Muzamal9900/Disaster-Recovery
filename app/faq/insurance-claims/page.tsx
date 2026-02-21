'use client';

import { AgFAQPageTemplate } from '@/components/antigravity';

const faqs = [
  {
    "question": "How does direct insurance billing work?",
    "answer": "Our contractors invoice your insurance company directly. You pay nothing upfront except your excess. We assist with all documentation, photos, and reports required for your claim."
  },
  {
    "question": "What if my claim is denied?",
    "answer": "We can help appeal denials by providing additional documentation, expert reports, and clarification. Many initial denials are overturned with proper supporting evidence."
  },
  {
    "question": "Do I need multiple quotes for insurance?",
    "answer": "Most insurers accept our contractors' quotes immediately due to their certification and reputation. Our online system provides multiple quotes automatically for comparison."
  },
  {
    "question": "What documentation do I need?",
    "answer": "Keep your policy number, claim number, photos of damage, and any correspondence. Our contractors handle technical documentation, moisture readings, and restoration reports."
  },
  {
    "question": "How long do insurance claims take?",
    "answer": "Emergency mitigation starts immediately. Initial approval usually within 24-48 hours. Full claim settlement varies from 1-4 weeks depending on damage extent and insurer."
  }
];

export default function InsuranceClaimsFAQsPage() {
  return (
    <AgFAQPageTemplate
      category="Insurance Claims"
      title="Insurance Claims FAQs"
      subtitle="Everything about insurance claims restoration"
      faqs={faqs.map(f => ({ question: f.question, answer: f.answer }))}
    />
  );
}
