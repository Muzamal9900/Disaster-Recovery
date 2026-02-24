/**
 * AntigravityTrustBanner — Infinite CSS marquee of insurer logos
 * Converted from TrustBanner.astro — Server Component
 */

const insurers = ['NRMA Insurance', 'RACV', 'AAMI', 'Suncorp', 'Allianz', 'QBE'];

export function AntigravityTrustBanner() {
  return (
    <div className="ag-trust-banner-wrapper">
      <div className="ag-container">
        <p className="ag-trust-label">
          Trusted by property owners for claims documentation &amp; fast response:
        </p>
      </div>

      <div className="ag-marquee-container">
        <div className="ag-marquee-track">
          {/* Doubled for seamless infinite loop */}
          {[...insurers, ...insurers].map((name, i) => (
            <div key={i} className="ag-logo-item">
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
