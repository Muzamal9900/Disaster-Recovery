import type { ContentSection } from '@/components/antigravity';

interface TechnologySectionParams {
  techType: string;
  feature: string;
}

export function getTechnologySections({ techType, feature }: TechnologySectionParams): ContentSection[] {
  return [
    {
      heading: `How ${techType} Enhances Disaster Restoration`,
      body: (
        <>
          <p>
            {feature ? `${feature} ` : ''}{techType} technology represents a significant advancement
            in professional disaster restoration, enabling faster detection, more thorough treatment,
            and better outcomes for property owners across Australia.
          </p>
          <p>
            Our contractor network deploys {techType.toLowerCase()} technology on applicable jobs,
            using it to identify hidden damage, optimise restoration processes, and verify that
            treatment meets Australian Standards before sign-off. This technology is part of our
            standard service — there are no additional charges for equipment deployment.
          </p>
          <p>
            The result is faster restoration times, more thorough treatment, and greater confidence
            that all damage has been identified and properly addressed — reducing the risk of
            recurring problems and secondary damage after restoration is complete.
          </p>
        </>
      ),
    },
    {
      heading: `How ${techType} Technology Works`,
      background: 'light',
      body: (
        <>
          <p>
            {techType} technology works by leveraging advanced sensing, processing, or treatment
            capabilities that exceed what is possible through visual inspection or manual methods
            alone:
          </p>
          <ul>
            <li><strong>Detection</strong> — Identifies damage, moisture, contamination, or structural issues that are invisible to the naked eye, often within walls, ceilings, and floor cavities.</li>
            <li><strong>Measurement</strong> — Provides precise, quantifiable data that allows technicians to make evidence-based decisions about treatment methods and duration.</li>
            <li><strong>Treatment optimisation</strong> — Enables targeted application of restoration resources, directing effort where it is most needed and avoiding unnecessary work in unaffected areas.</li>
            <li><strong>Verification</strong> — Provides objective proof that restoration targets have been met, supporting insurance documentation and quality assurance sign-off.</li>
          </ul>
          <p>
            Our technicians are trained and certified in the operation of {techType.toLowerCase()}
            equipment, ensuring accurate deployment and reliable results on every job.
          </p>
        </>
      ),
    },
    {
      heading: `Benefits of ${techType} in Restoration`,
      body: (
        <>
          <p>
            Incorporating {techType.toLowerCase()} technology into the restoration process delivers
            measurable benefits for property owners:
          </p>
          <ul>
            <li><strong>Faster restoration</strong> — Precise identification of affected areas means restoration efforts are targeted and efficient, reducing overall project duration.</li>
            <li><strong>More thorough results</strong> — Hidden damage is identified and treated, reducing the risk of recurring problems, mould growth, or structural degradation months after restoration.</li>
            <li><strong>Better insurance outcomes</strong> — Comprehensive documentation with equipment readings strengthens insurance claims and provides clear evidence of the restoration scope.</li>
            <li><strong>Cost efficiency</strong> — Targeted treatment avoids unnecessary demolition or replacement of unaffected materials, reducing total project cost.</li>
            <li><strong>Peace of mind</strong> — Objective verification data provides confidence that restoration is genuinely complete, not just visually acceptable.</li>
          </ul>
        </>
      ),
    },
    {
      heading: 'Real-World Applications',
      background: 'light',
      body: (
        <>
          <p>
            Our contractors deploy {techType.toLowerCase()} technology across a range of disaster
            recovery scenarios in Australia:
          </p>
          <ul>
            <li><strong>Water damage restoration</strong> — Mapping moisture migration through walls, floors, and ceilings to ensure complete drying and prevent hidden mould growth.</li>
            <li><strong>Fire and smoke assessment</strong> — Identifying the extent of heat damage, smoke penetration, and structural compromise beyond what is visible on the surface.</li>
            <li><strong>Mould investigation</strong> — Locating hidden moisture sources feeding mould colonies, even behind walls, under floors, and within HVAC systems.</li>
            <li><strong>Post-restoration verification</strong> — Confirming that all areas meet drying targets, air quality standards, and restoration benchmarks before sign-off.</li>
          </ul>
          <p>
            In each application, {techType.toLowerCase()} technology improves the accuracy, speed,
            and quality of the restoration outcome.
          </p>
        </>
      ),
    },
    {
      heading: `${techType} Technology FAQ`,
      body: (
        <>
          <h3>Is {techType.toLowerCase()} technology standard on every job?</h3>
          <p>
            Our technicians assess each situation and deploy the appropriate technology for the best
            outcome. {techType} equipment is used whenever it can improve detection, treatment, or
            verification quality — which includes the majority of professional restoration jobs.
          </p>
          <h3>Does {techType.toLowerCase()} technology cost extra?</h3>
          <p>
            No. Equipment deployment is included in the overall restoration scope. For insured
            events, it is covered as part of the approved claim. There are no separate equipment
            hire charges.
          </p>
          <h3>How do I know the results are reliable?</h3>
          <p>
            All equipment is professionally calibrated and operated by certified technicians.
            Results are documented and included in your restoration report, providing verifiable
            evidence for insurance and quality assurance purposes.
          </p>
        </>
      ),
    },
  ];
}
