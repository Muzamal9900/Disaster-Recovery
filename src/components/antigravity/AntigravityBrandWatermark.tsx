/**
 * AntigravityBrandWatermark — Fixed-position 60vw watermark overlay
 * Converted from BrandWatermark.astro
 */

import { AntigravityBrandLogo } from './AntigravityBrandLogo';

export function AntigravityBrandWatermark() {
  return (
    <div className="ag-global-watermark" aria-hidden="true">
      <AntigravityBrandLogo width="100%" height="auto" />
    </div>
  );
}
