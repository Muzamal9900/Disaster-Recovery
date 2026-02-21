import type { ContentSection } from '@/components/antigravity';

interface InsuranceSectionParams {
  insurerName: string;
  insurerSlug: string;
}

export function getInsuranceSections({ insurerName, insurerSlug }: InsuranceSectionParams): ContentSection[] {
  return [
    {
      heading: `${insurerName} Insurance Claims — How We Help`,
      body: (
        <>
          <p>
            When disaster strikes and you need to make a claim with {insurerName}, we make the
            process as smooth as possible. As an approved restoration provider, we work directly
            with {insurerName} to manage your claim from start to finish — so you can focus on
            getting your life back to normal.
          </p>
          <p>
            Our relationship with {insurerName} means we understand their claims process, required
            documentation, and scope-of-works approval procedures. This experience translates to
            faster claim approvals, fewer delays, and a better outcome for you.
          </p>
          <p>
            Most importantly, we direct-bill {insurerName} for all approved works. You pay only
            your policy excess — no upfront costs, no surprise invoices, no financial stress during
            an already difficult time.
          </p>
        </>
      ),
    },
    {
      heading: `The ${insurerName} Claims Process — Step by Step`,
      background: 'light',
      body: (
        <>
          <p>
            Filing a disaster recovery claim with {insurerName} follows a straightforward process
            when you have an approved provider managing it for you:
          </p>
          <ol>
            <li><strong>Contact us for emergency response</strong> — Call or submit an online form. We dispatch a local team immediately while simultaneously notifying {insurerName} of the incident.</li>
            <li><strong>On-site assessment and documentation</strong> — Our technician documents all damage with photos, moisture readings, and a detailed scope of works for {insurerName}&apos;s review.</li>
            <li><strong>Scope approval from {insurerName}</strong> — We submit our scope and costings directly to {insurerName}. As an approved provider, our quotes are typically approved within 24–48 hours.</li>
            <li><strong>Professional restoration</strong> — Once approved, we begin restoration using certified technicians and industrial-grade equipment. We keep both you and {insurerName} updated throughout.</li>
            <li><strong>Completion and sign-off</strong> — We conduct a final inspection, provide completion documentation to {insurerName}, and hand your property back in pre-loss condition.</li>
          </ol>
        </>
      ),
    },
    {
      heading: `What ${insurerName} Typically Covers`,
      body: (
        <>
          <p>
            While every {insurerName} policy differs, most home and commercial policies cover
            restoration for the following sudden, accidental events:
          </p>
          <ul>
            <li><strong>Water damage</strong> — Burst pipes, leaking appliances, roof leaks from storms, and accidental overflow.</li>
            <li><strong>Fire and smoke damage</strong> — Kitchen fires, electrical fires, bushfire ember attack, and associated smoke/soot damage.</li>
            <li><strong>Storm damage</strong> — Wind damage, hail damage, fallen trees, and rain water ingress.</li>
            <li><strong>Flood damage</strong> — Depending on your policy level and whether flood cover is included.</li>
            <li><strong>Impact damage</strong> — Vehicle impact, falling objects, and vandalism (with some policy variations).</li>
          </ul>
          <p>
            Common exclusions across most {insurerName} policies include gradual damage from lack
            of maintenance, pre-existing mould, wear and tear, and damage from unapproved
            renovations. If you are unsure about your coverage, our team can review your
            {insurerName} policy at no cost.
          </p>
        </>
      ),
    },
    {
      heading: 'Direct Billing — No Upfront Costs',
      background: 'light',
      body: (
        <>
          <p>
            One of the biggest advantages of using an approved provider for your {insurerName}
            claim is our direct billing arrangement. Here is how it works:
          </p>
          <ul>
            <li><strong>We bill {insurerName} directly</strong> — All approved restoration costs are invoiced to {insurerName}, not to you.</li>
            <li><strong>You pay your excess only</strong> — The only out-of-pocket cost is your policy excess, which you pay directly to {insurerName} as part of the standard claims process.</li>
            <li><strong>No financial surprises</strong> — Because we agree the scope of works with {insurerName} before starting, the approved amount covers all necessary restoration.</li>
            <li><strong>Contents claims included</strong> — Where applicable, we also assist with contents restoration or replacement claims through {insurerName}.</li>
          </ul>
          <p>
            This direct billing model removes the financial burden during what is often a stressful
            and disruptive event. You never need to pay thousands upfront and wait for reimbursement.
          </p>
        </>
      ),
    },
    {
      heading: `${insurerName} Claims FAQ`,
      body: (
        <>
          <h3>How do I start a claim with {insurerName}?</h3>
          <p>
            Contact us first for emergency response. We will lodge the claim with {insurerName} on
            your behalf during the initial assessment. Alternatively, you can contact {insurerName}
            directly and nominate us as your preferred restoration provider.
          </p>
          <h3>How long does a {insurerName} claim take?</h3>
          <p>
            Scope approval typically takes 24–48 hours for straightforward claims. Complex or
            large-scale claims may take 3–5 business days. Restoration timelines depend on the type
            and severity of damage.
          </p>
          <h3>What documentation do I need for my {insurerName} claim?</h3>
          <p>
            We handle the documentation for you — including photos, moisture readings, scope of
            works, and progress reports. You will need your {insurerName} policy number and may
            need to sign an authority for us to act on your behalf.
          </p>
          <h3>Can I choose my own restorer with {insurerName}?</h3>
          <p>
            Yes. Under Australian consumer law, you have the right to choose your own restoration
            provider. As an approved provider, nominating us often results in faster approvals and
            a smoother process with {insurerName}.
          </p>
        </>
      ),
    },
  ];
}
