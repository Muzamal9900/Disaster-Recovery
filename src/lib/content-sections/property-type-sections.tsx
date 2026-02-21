import type { ContentSection } from '@/components/antigravity';

interface PropertyTypeSectionParams {
  propertyType: string;
  description: string;
}

export function getPropertyTypeSections({ propertyType, description }: PropertyTypeSectionParams): ContentSection[] {
  return [
    {
      heading: `${propertyType} Disaster Recovery Specialists`,
      body: (
        <>
          <p>
            {description ? `${description} ` : ''}Our network of certified restoration professionals
            specialise in disaster recovery for {propertyType.toLowerCase()} properties, understanding
            the unique structural, regulatory, and operational challenges these buildings present.
          </p>
          <p>
            From water damage and fire restoration to mould remediation and storm repair, our
            contractors carry the specific equipment and certifications required for
            {propertyType.toLowerCase()} environments. Every job follows Australian Standards
            and industry best practice protocols.
          </p>
          <p>
            As approved providers for all major insurers, we handle the entire claims process —
            direct-billing your insurer so there are no upfront costs for covered events. Our
            project managers coordinate with building managers, body corporates, tenants, and
            insurers to minimise disruption and downtime.
          </p>
        </>
      ),
    },
    {
      heading: `Common Disaster Scenarios for ${propertyType} Properties`,
      background: 'light',
      body: (
        <>
          <p>
            {propertyType} properties face specific disaster risks that require specialist knowledge
            and equipment. The most common scenarios our teams respond to include:
          </p>
          <ul>
            <li><strong>Water damage</strong> — Burst pipes, roof leaks, appliance failures, and rising damp. Multi-level properties risk cascading water damage across floors.</li>
            <li><strong>Fire and smoke damage</strong> — Kitchen fires, electrical faults, and external fire exposure. Smoke can penetrate throughout a building even from a localised fire.</li>
            <li><strong>Mould contamination</strong> — Often following undetected water leaks or poor ventilation, mould can spread rapidly through wall cavities and HVAC systems.</li>
            <li><strong>Storm and flood damage</strong> — Roof damage, broken windows, water ingress, and structural impact from severe weather events.</li>
          </ul>
          <p>
            Each scenario requires a tailored approach for {propertyType.toLowerCase()} properties,
            accounting for building materials, access constraints, occupancy requirements, and
            compliance obligations.
          </p>
        </>
      ),
    },
    {
      heading: `Our Approach to ${propertyType} Restoration`,
      body: (
        <>
          <p>
            Restoring {propertyType.toLowerCase()} properties requires a different approach to
            standard residential restoration. Our methodology addresses the specific needs of
            these properties:
          </p>
          <ol>
            <li><strong>Rapid assessment with minimal disruption</strong> — We work around occupants and operations wherever possible, using containment barriers and negative air pressure to isolate affected areas.</li>
            <li><strong>Compliance-first restoration</strong> — All work meets Australian Standards, local building codes, and industry-specific regulations. We provide full documentation for compliance records.</li>
            <li><strong>Stakeholder coordination</strong> — Our project managers liaise with building managers, body corporates, tenants, insurers, and council where required.</li>
            <li><strong>Specialist equipment</strong> — We deploy commercial-grade dehumidifiers, air scrubbers, thermal imaging, and moisture mapping equipment sized for {propertyType.toLowerCase()} applications.</li>
            <li><strong>Quality assurance</strong> — Every job includes post-restoration moisture readings, air quality testing, and a detailed completion report.</li>
          </ol>
        </>
      ),
    },
    {
      heading: 'Compliance and Building Requirements',
      background: 'light',
      body: (
        <>
          <p>
            {propertyType} properties are subject to specific regulatory and compliance requirements
            during disaster restoration. Our teams are trained and certified to meet these
            obligations:
          </p>
          <ul>
            <li><strong>Building Code of Australia (BCA)</strong> — All structural repairs meet current BCA requirements for {propertyType.toLowerCase()} classifications.</li>
            <li><strong>WorkSafe and WHS compliance</strong> — Our contractors maintain current work health and safety certifications and follow safe work method statements for every job.</li>
            <li><strong>Asbestos awareness</strong> — For properties built before 1990, our teams are trained in asbestos identification and management under relevant state regulations.</li>
            <li><strong>Strata and body corporate requirements</strong> — We understand the approval processes, common property vs lot owner responsibilities, and insurance arrangements for strata-titled properties.</li>
            <li><strong>Industry-specific compliance</strong> — Where applicable, we meet sector-specific requirements such as healthcare facility standards, food safety regulations, or heritage conservation guidelines.</li>
          </ul>
        </>
      ),
    },
    {
      heading: `${propertyType} Disaster Recovery FAQ`,
      body: (
        <>
          <h3>Do you specialise in {propertyType.toLowerCase()} properties?</h3>
          <p>
            Yes. Our contractor network includes specialists experienced in {propertyType.toLowerCase()}
            disaster recovery, with the certifications, equipment, and project management expertise
            these properties require.
          </p>
          <h3>Can you work around building occupants?</h3>
          <p>
            Wherever safe and practical, we use containment and isolation techniques to minimise
            disruption. For situations requiring evacuation, we coordinate with building management
            and provide realistic timelines for re-entry.
          </p>
          <h3>How do you handle insurance for {propertyType.toLowerCase()} properties?</h3>
          <p>
            We work with all major Australian insurers and understand the specific claims processes
            for {propertyType.toLowerCase()} properties, including strata insurance, landlord
            policies, and commercial cover. We direct-bill insurers so there are no upfront costs.
          </p>
          <h3>What certifications do your contractors hold?</h3>
          <p>
            All contractors are IICRC-certified with current WorkSafe licences. Depending on the
            job, our teams also hold asbestos removal licences, confined space certifications, and
            working at heights qualifications.
          </p>
        </>
      ),
    },
  ];
}
