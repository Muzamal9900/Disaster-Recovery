import type { ContentSection } from '@/components/antigravity';

interface DisasterSectionParams {
  disasterType: string;
  description: string;
}

export function getDisasterSections({ disasterType, description }: DisasterSectionParams): ContentSection[] {
  return [
    {
      heading: `${disasterType} Recovery and Restoration`,
      body: (
        <>
          <p>
            {description ? `${description} ` : ''}Our network of certified restoration professionals
            provides comprehensive {disasterType.toLowerCase()} recovery services across Australia,
            from emergency stabilisation through to full property restoration.
          </p>
          <p>
            {disasterType} events can cause devastating damage to homes and businesses, often
            requiring specialist equipment, training, and expertise that goes beyond standard
            building repair. Our contractors are IICRC-certified and experienced in the specific
            restoration protocols required after {disasterType.toLowerCase()} events.
          </p>
          <p>
            We respond 24/7, work with all major Australian insurers, and direct-bill for covered
            events — meaning you pay only your policy excess. Our teams deploy Australia-wide,
            including to regional and remote areas affected by {disasterType.toLowerCase()} events.
          </p>
        </>
      ),
    },
    {
      heading: `Assessing ${disasterType} Damage`,
      background: 'light',
      body: (
        <>
          <p>
            After a {disasterType.toLowerCase()} event, thorough damage assessment is critical. Our
            technicians use professional equipment to identify all damage — including hidden issues
            that can cause long-term problems if left unaddressed:
          </p>
          <ul>
            <li><strong>Structural assessment</strong> — Checking foundations, load-bearing walls, roof structures, and framing for compromise or instability.</li>
            <li><strong>Moisture mapping</strong> — Using thermal imaging and moisture meters to identify water penetration in walls, floors, and cavities that is not visible on the surface.</li>
            <li><strong>Contamination testing</strong> — Assessing for hazardous materials, contaminated water, or biological hazards that require specialist remediation protocols.</li>
            <li><strong>Electrical and mechanical</strong> — Evaluating electrical systems, plumbing, HVAC, and mechanical infrastructure for damage or safety risks.</li>
            <li><strong>Contents assessment</strong> — Documenting damage to personal property and contents for insurance claim purposes and restoration or replacement decisions.</li>
          </ul>
          <p>
            This comprehensive assessment forms the basis of the restoration scope of works and
            insurance claim documentation.
          </p>
        </>
      ),
    },
    {
      heading: `The ${disasterType} Recovery Process`,
      body: (
        <>
          <p>
            Our {disasterType.toLowerCase()} recovery process follows a structured approach designed
            to restore your property efficiently while meeting all Australian Standards and insurer
            requirements:
          </p>
          <ol>
            <li><strong>Emergency response and stabilisation</strong> — Securing the property, preventing further damage, and ensuring safety. This may include board-up, tarping, water extraction, or debris removal.</li>
            <li><strong>Detailed assessment and scope</strong> — Comprehensive damage documentation, insurance notification, and development of a restoration plan with timeline and costings.</li>
            <li><strong>Hazard management</strong> — Removal or containment of any hazardous materials, contamination, or safety risks before restoration begins.</li>
            <li><strong>Restoration and reconstruction</strong> — Professional restoration of all affected areas to pre-loss condition, using appropriate materials, methods, and equipment.</li>
            <li><strong>Quality verification and handover</strong> — Final inspection, air quality testing, moisture verification, and documentation before handing back the property.</li>
          </ol>
        </>
      ),
    },
    {
      heading: 'Prevention and Future Protection',
      background: 'light',
      body: (
        <>
          <p>
            While {disasterType.toLowerCase()} events cannot always be prevented, there are steps
            property owners can take to reduce risk and improve resilience:
          </p>
          <ul>
            <li><strong>Review your insurance cover</strong> — Ensure your policy covers {disasterType.toLowerCase()} events and that your sum insured reflects current rebuilding costs. Many Australians are underinsured.</li>
            <li><strong>Maintain your property</strong> — Regular maintenance of roofing, gutters, drainage, and structural elements reduces vulnerability to disaster damage.</li>
            <li><strong>Create an emergency plan</strong> — Know your evacuation routes, keep important documents in a fire-safe location, and have an emergency kit prepared.</li>
            <li><strong>Consider mitigation upgrades</strong> — Depending on your location and risk profile, upgrades such as cyclone-rated roofing, flood barriers, or fire-resistant landscaping can significantly reduce damage potential.</li>
            <li><strong>Know your local risks</strong> — Understanding the specific {disasterType.toLowerCase()} risks for your area helps you prepare and respond appropriately when events occur.</li>
          </ul>
        </>
      ),
    },
    {
      heading: `${disasterType} Recovery FAQ`,
      body: (
        <>
          <h3>How quickly can you respond after a {disasterType.toLowerCase()} event?</h3>
          <p>
            We deploy emergency teams within 60 minutes to metropolitan areas and as quickly as
            possible to regional and remote locations. For major {disasterType.toLowerCase()} events
            affecting wide areas, we coordinate multiple teams from across our national network.
          </p>
          <h3>Will my insurance cover {disasterType.toLowerCase()} damage?</h3>
          <p>
            Most comprehensive home and commercial insurance policies cover {disasterType.toLowerCase()}
            damage, though specific coverage depends on your policy type and inclusions. We can
            review your policy and advise on coverage during the initial assessment.
          </p>
          <h3>How long does {disasterType.toLowerCase()} restoration take?</h3>
          <p>
            Restoration timelines vary based on damage severity. Minor damage may be restored in
            1–2 weeks, moderate damage in 2–6 weeks, and severe damage may require several months
            of reconstruction. We provide a detailed timeline during the assessment phase.
          </p>
          <h3>Is it safe to stay in my property after {disasterType.toLowerCase()} damage?</h3>
          <p>
            This depends on the extent of damage. Our technicians perform a safety assessment as
            part of the emergency response and will advise you on whether temporary relocation is
            necessary. Safety is always the first priority.
          </p>
        </>
      ),
    },
  ];
}
