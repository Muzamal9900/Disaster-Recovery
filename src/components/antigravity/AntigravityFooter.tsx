/**
 * AntigravityFooter — 4-column grid footer with brand, company, services, locations
 * Converted from Footer.astro — all links use Next.js Link
 */

import Link from 'next/link';

export function AntigravityFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="ag-site-footer">
      <div className="ag-container ag-footer-grid">
        {/* Brand column */}
        <div className="ag-footer-brand">
          <div className="ag-logo-mark">
            <svg
              viewBox="0 0 80 32"
              className="ag-heartbeat-svg"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 2 18 h 8 l 4 -10 l 7 20 l 6 -26 l 4 16 h 5"
                fill="none"
                stroke="var(--ag-emergency-red)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="36" cy="18" r="2.5" fill="var(--ag-emergency-red)" />
              <text x="40" y="26" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="24" fill="var(--ag-emergency-red)">D</text>
              <text x="58" y="26" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="24" fill="#a0aab2">R</text>
            </svg>
          </div>
          <p className="ag-brand-desc">
            Rapid Response. Resilient Future. Connecting property owners with certified
            restoration professionals across Australia and New Zealand.
          </p>
          <div className="ag-footer-badges">
            <span className="ag-badge">IICRC Certified</span>
            <span className="ag-badge">Insurance Approved</span>
          </div>
        </div>

        {/* Company column */}
        <div className="ag-footer-nav">
          <h4>Company</h4>
          <Link href="/about">About NRPG</Link>
          <Link href="/how-it-works">How It Works</Link>
          <Link href="/blog">Blog &amp; Resources</Link>
          <Link href="/contact">Contact Us</Link>
        </div>

        {/* Services column */}
        <div className="ag-footer-nav">
          <h4>Services</h4>
          <Link href="/services/water-damage-restoration">Water Damage</Link>
          <Link href="/services/fire-damage-restoration">Fire &amp; Smoke</Link>
          <Link href="/services/storm-damage-restoration">Storm Damage</Link>
          <Link href="/services/mould-remediation">Mould Remediation</Link>
          <Link href="/services/biohazard-cleaning">Biohazard Cleanup</Link>
        </div>

        {/* Locations column */}
        <div className="ag-footer-nav">
          <h4>Major Locations</h4>
          <Link href="/locations/sydney">Sydney</Link>
          <Link href="/locations/melbourne">Melbourne</Link>
          <Link href="/locations/brisbane">Brisbane</Link>
          <Link href="/locations/perth">Perth</Link>
          <Link href="/locations/auckland">Auckland</Link>
        </div>
      </div>

      <div className="ag-footer-bottom ag-container">
        <div className="ag-copyright">
          &copy; {currentYear} Disaster Recovery Australia. All rights reserved.
          Powered by National Recovery Platform Group (NRPG).
        </div>
        <div className="ag-legal-links">
          <Link href="/terms">Terms of Service</Link>
          <Link href="/privacy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
