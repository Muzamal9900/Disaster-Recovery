'use client';

import { FEATURE_FLAGS } from '@/lib/feature-flags';
import { AntigravityNavbar } from './AntigravityNavbar';
import { AntigravityFooter } from './AntigravityFooter';

interface AgPageWrapperProps {
  children: React.ReactNode;
  /** Hide navbar/footer (e.g. for portal pages with custom chrome) */
  hideChrome?: boolean;
}

/**
 * AgPageWrapper — Standard wrapper for all Antigravity pages.
 *
 * When the feature flag is ON: renders AG navbar + content + footer.
 * When OFF: renders children only (old chrome comes from layout.tsx).
 */
export function AgPageWrapper({ children, hideChrome = false }: AgPageWrapperProps) {
  if (!FEATURE_FLAGS.ANTIGRAVITY_UI) {
    return <>{children}</>;
  }

  if (hideChrome) {
    return <>{children}</>;
  }

  return (
    <>
      <AntigravityNavbar />
      <div className="ag-page-content">
        {children}
      </div>
      <AntigravityFooter />
    </>
  );
}
