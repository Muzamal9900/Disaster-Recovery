import type { ContentSection } from '@/components/antigravity';

interface CertificationSectionParams {
  certName: string;
  body: string;
}

export function getCertificationSections({ certName, body: certDescription }: CertificationSectionParams): ContentSection[] {
  return [
    {
      heading: `What ${certName} Means for Your Restoration`,
      body: (
        <>
          <p>
            {certDescription ? `${certDescription} ` : ''}When you choose a disaster recovery
            provider with {certName} credentials, you are choosing a team that has met rigorous
            professional standards for training, equipment, and quality of work.
          </p>
          <p>
            {certName} certification is not just a badge — it represents ongoing commitment to
            professional development, adherence to industry best practices, and accountability
            to national and international standards. For you as a property owner, this translates
            to better outcomes, fewer complications, and confidence that the restoration has been
            done properly.
          </p>
          <p>
            All contractors in our network hold current {certName} certification and maintain it
            through continuous professional development. This is verified annually as part of our
            quality assurance program.
          </p>
        </>
      ),
    },
    {
      heading: `${certName} — Requirements and Standards`,
      background: 'light',
      body: (
        <>
          <p>
            Achieving and maintaining {certName} certification requires meeting demanding professional
            standards across several areas:
          </p>
          <ul>
            <li><strong>Formal training</strong> — Technicians must complete accredited training courses covering theory, practical application, and assessment in their area of specialisation.</li>
            <li><strong>Practical experience</strong> — A minimum number of supervised restoration hours are required before certification is granted, ensuring real-world competence.</li>
            <li><strong>Ongoing education</strong> — Certified professionals must complete continuing education requirements to maintain their credentials, staying current with evolving standards and technologies.</li>
            <li><strong>Code of ethics</strong> — Certified practitioners commit to professional conduct, honest communication, and quality workmanship in every engagement.</li>
            <li><strong>Compliance audits</strong> — Certification bodies may conduct periodic audits to verify that certified professionals continue to meet required standards.</li>
          </ul>
        </>
      ),
    },
    {
      heading: 'Why Certification Matters for Your Property',
      body: (
        <>
          <p>
            Hiring uncertified or underqualified restoration contractors is one of the most common
            and costly mistakes property owners make after a disaster. Here is why {certName}
            certification matters:
          </p>
          <ul>
            <li><strong>Insurance acceptance</strong> — Major insurers require restoration to be performed by certified professionals. Uncertified work may void your claim or result in disputes.</li>
            <li><strong>Quality assurance</strong> — Certified contractors follow documented procedures and quality benchmarks, reducing the risk of incomplete restoration or recurring problems.</li>
            <li><strong>Health and safety</strong> — Disaster restoration can involve hazardous materials, contaminated water, and structural risks. Certified technicians are trained to manage these safely.</li>
            <li><strong>Correct methodology</strong> — Different damage types require specific restoration protocols. Certified professionals know which methods to apply and when.</li>
            <li><strong>Accountability</strong> — Certification provides a recourse pathway if work does not meet standards, through the certifying body&apos;s complaints and review process.</li>
          </ul>
        </>
      ),
    },
    {
      heading: 'Our Team\'s Credentials',
      background: 'light',
      body: (
        <>
          <p>
            Every contractor in our nationwide network maintains current {certName} certification
            along with additional credentials relevant to their service area:
          </p>
          <ul>
            <li><strong>IICRC certification</strong> — The international gold standard for restoration, cleaning, and inspection. Our technicians hold certifications in water damage restoration (WRT), fire and smoke restoration (FSRT), and mould remediation.</li>
            <li><strong>WorkSafe licences</strong> — Current state-specific workplace health and safety licences and registrations.</li>
            <li><strong>Asbestos awareness</strong> — All technicians complete asbestos identification and management training, with specialist removal licences held by senior team members.</li>
            <li><strong>First aid and CPR</strong> — Current first aid certification for all field technicians.</li>
            <li><strong>Police clearances</strong> — All contractors hold current national police checks, essential for work in residential, healthcare, and educational settings.</li>
          </ul>
        </>
      ),
    },
    {
      heading: `${certName} FAQ`,
      body: (
        <>
          <h3>How do I verify that a contractor holds {certName} certification?</h3>
          <p>
            You can ask to see the contractor&apos;s certification card or certificate. All our
            network contractors provide proof of certification on request, and we verify credentials
            annually as part of our quality assurance process.
          </p>
          <h3>Does my insurer require certified contractors?</h3>
          <p>
            Most major Australian insurers require or strongly prefer certified restoration
            professionals. Using uncertified contractors may result in claim disputes or voided
            coverage. Our approved-provider status with all major insurers confirms we meet their
            certification requirements.
          </p>
          <h3>What happens if the certification has lapsed?</h3>
          <p>
            We do not allow contractors with lapsed certifications to work on our projects. Our
            system tracks certification expiry dates and automatically flags contractors who need
            to renew before being assigned new jobs.
          </p>
        </>
      ),
    },
  ];
}
