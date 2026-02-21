'use client';

import { FEATURE_FLAGS } from '@/lib/feature-flags';

/**
 * AntigravityLayoutGuard
 *
 * When the Antigravity UI feature flag is ON, this hides the wrapped children
 * (existing header/footer/nav) for ALL pages. Antigravity pages render their
 * own navbar and footer via AgPageWrapper or direct template usage.
 *
 * When ANTIGRAVITY_UI is OFF, the old chrome (UltraModernHeader, MobileNav,
 * Breadcrumb, UltraModernFooter, MobileFAB, MobileEmergencyCTA) renders
 * normally — providing an instant rollback path.
 */

export function AntigravityLayoutGuard({ children }: { children: React.ReactNode }) {
  if (FEATURE_FLAGS.ANTIGRAVITY_UI) {
    return null;
  }

  return <>{children}</>;
}
