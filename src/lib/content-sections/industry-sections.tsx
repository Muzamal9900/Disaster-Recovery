import type { ContentSection } from '@/components/antigravity';

interface IndustrySectionParams {
  industryName: string;
  context: string;
}

export function getIndustrySections({ industryName, context }: IndustrySectionParams): ContentSection[] {
  return [
    {
      heading: `Disaster Recovery for ${industryName}`,
      body: (
        <>
          <p>
            {context ? `${context} ` : ''}Disaster events in {industryName.toLowerCase()} settings
            require specialist knowledge, rapid response, and an understanding of the unique
            operational, regulatory, and safety requirements of this sector.
          </p>
          <p>
            Our contractor network includes restoration professionals experienced in
            {industryName.toLowerCase()} environments, equipped with the certifications, equipment,
            and project management expertise these settings demand. We understand that downtime in
            {industryName.toLowerCase()} can have cascading consequences — lost revenue, regulatory
            non-compliance, safety risks, and reputational damage.
          </p>
          <p>
            We work with all major Australian insurers and provide 24/7 emergency response with
            direct billing for covered events. Our project managers coordinate with your operations
            team to minimise business disruption while ensuring thorough, compliant restoration.
          </p>
        </>
      ),
    },
    {
      heading: `Common Disaster Risks in ${industryName}`,
      background: 'light',
      body: (
        <>
          <p>
            {industryName} businesses and facilities face specific disaster risks that require
            tailored response and restoration approaches:
          </p>
          <ul>
            <li><strong>Water damage</strong> — Burst pipes, sprinkler activations, roof leaks, and plumbing failures can damage equipment, stock, documents, and infrastructure critical to {industryName.toLowerCase()} operations.</li>
            <li><strong>Fire and smoke damage</strong> — Electrical faults, equipment fires, and external fire exposure can compromise operations and create hazardous conditions requiring specialist cleanup.</li>
            <li><strong>Mould contamination</strong> — Undetected moisture from leaks or poor ventilation can lead to mould growth that affects air quality, compliance, and occupant health.</li>
            <li><strong>Storm and flood damage</strong> — Severe weather can damage buildings, equipment, and stock while disrupting critical services and operations.</li>
            <li><strong>Biohazard and contamination</strong> — Depending on the {industryName.toLowerCase()} setting, incidents may involve biological, chemical, or other hazardous materials requiring specialist decontamination.</li>
          </ul>
        </>
      ),
    },
    {
      heading: 'Minimising Downtime and Business Impact',
      body: (
        <>
          <p>
            We understand that every hour of downtime in {industryName.toLowerCase()} costs money,
            affects customers, and can create compliance issues. Our approach is designed to minimise
            business impact:
          </p>
          <ol>
            <li><strong>Rapid response (24/7)</strong> — Emergency teams deployed within 60 minutes, carrying equipment for immediate stabilisation to prevent escalating damage.</li>
            <li><strong>Phased restoration</strong> — Where possible, we restore areas in phases so you can resume partial operations while remaining work continues.</li>
            <li><strong>After-hours scheduling</strong> — For non-emergency restoration, we can schedule work during off-peak hours to minimise disruption to your operations.</li>
            <li><strong>Dedicated project management</strong> — A single point of contact coordinates all tradespeople, insurers, and stakeholders, keeping your team informed without demanding their time.</li>
            <li><strong>Business continuity planning</strong> — We work with your team to identify critical areas and equipment, prioritising their restoration to get essential operations back online first.</li>
          </ol>
        </>
      ),
    },
    {
      heading: 'Industry Compliance and Regulations',
      background: 'light',
      body: (
        <>
          <p>
            Disaster restoration in {industryName.toLowerCase()} settings must comply with
            sector-specific regulations in addition to standard building codes and work health
            and safety requirements:
          </p>
          <ul>
            <li><strong>Building Code of Australia (BCA)</strong> — All structural repairs meet current BCA requirements for the applicable building classification.</li>
            <li><strong>Work Health and Safety (WHS)</strong> — Our contractors maintain current WHS certifications and follow documented safe work method statements for every job.</li>
            <li><strong>Industry-specific standards</strong> — We understand and comply with sector-specific regulations including hygiene standards, environmental requirements, and operational safety protocols.</li>
            <li><strong>Documentation and audit trails</strong> — We provide comprehensive documentation for compliance records, including before/after photos, test results, and certification of completion.</li>
            <li><strong>Hazardous materials management</strong> — Licensed handling and disposal of asbestos, contaminated materials, and other hazardous substances in accordance with state and federal regulations.</li>
          </ul>
        </>
      ),
    },
    {
      heading: `${industryName} Disaster Recovery FAQ`,
      body: (
        <>
          <h3>Do you have experience with {industryName.toLowerCase()} properties?</h3>
          <p>
            Yes. Our contractor network includes professionals experienced in {industryName.toLowerCase()}
            disaster recovery, with the specific certifications, equipment, and operational
            understanding these environments require.
          </p>
          <h3>Can you work around our operating hours?</h3>
          <p>
            Absolutely. For non-emergency restoration, we schedule work during your off-peak hours
            or outside business hours. For emergencies, we respond immediately and work with your
            operations team to minimise disruption.
          </p>
          <h3>How do you handle {industryName.toLowerCase()} compliance requirements?</h3>
          <p>
            Our project managers are briefed on sector-specific compliance requirements before work
            begins. We provide all necessary documentation, testing, and certification to support
            your compliance obligations.
          </p>
          <h3>Do you offer ongoing maintenance or monitoring?</h3>
          <p>
            Yes. After restoration, we can provide scheduled inspections, preventative maintenance,
            and monitoring services to reduce future disaster risk and support your facility
            management program.
          </p>
        </>
      ),
    },
  ];
}
