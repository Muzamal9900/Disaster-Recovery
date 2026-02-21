import type { ReactNode } from 'react';
import Link from 'next/link';

export interface AgHeroBreadcrumb {
  label: string;
  href?: string;
}

export interface AgHeroProps {
  /** CSS gradient or solid colour for the header background */
  gradient?: string;
  /** Optional radial overlay on top of gradient */
  radialOverlay?: string;
  /** Icon element (Lucide React icon, SVG, etc.) rendered above the title */
  icon?: ReactNode;
  /** Primary heading — supports string or JSX for gradient text spans */
  title: ReactNode;
  /** Subtitle text below the heading */
  subtitle?: string;
  /** CTA button config */
  cta?: { text: string; href: string };
  /** Secondary CTA */
  secondaryCta?: { text: string; href: string };
  /** Breadcrumb trail */
  breadcrumbs?: AgHeroBreadcrumb[];
  /** Compact hero (less padding) for inner pages */
  compact?: boolean;
}

/**
 * AgHeroSection — Configurable hero block for any Antigravity page.
 * Supports gradient backgrounds, icons, breadcrumbs, and CTAs.
 */
export function AgHeroSection({
  gradient = 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
  radialOverlay,
  icon,
  title,
  subtitle,
  cta,
  secondaryCta,
  breadcrumbs,
  compact = false,
}: AgHeroProps) {
  return (
    <header
      className="ag-service-header"
      style={{ padding: compact ? '5rem 0 3rem' : undefined }}
    >
      <div className="ag-header-overlay" style={{ background: gradient }}>
        {radialOverlay && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: radialOverlay }} />
        )}
      </div>

      <div className="ag-container ag-header-content" style={{ maxWidth: '900px' }}>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="ag-breadcrumb-nav-dark" aria-label="Breadcrumb">
            <ol className="ag-breadcrumb-list">
              {breadcrumbs.map((crumb, i) => (
                <li key={i} className="ag-breadcrumb-item">
                  {i > 0 && <span className="ag-breadcrumb-separator">/</span>}
                  {crumb.href ? (
                    <Link href={crumb.href}>{crumb.label}</Link>
                  ) : (
                    <span className="ag-breadcrumb-current">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {icon && (
          <div className="ag-slide-up-1" style={{ marginBottom: '1rem', color: 'rgba(255,255,255,0.9)' }}>
            {icon}
          </div>
        )}

        <h1 className="ag-slide-up-2" style={{ color: '#fff', marginBottom: subtitle ? '1rem' : 0 }}>
          {title}
        </h1>

        {subtitle && (
          <p className="ag-hero-subtext ag-slide-up-3">{subtitle}</p>
        )}

        {(cta || secondaryCta) && (
          <div className="ag-hero-actions ag-slide-up-4">
            {cta && (
              <Link href={cta.href} className="ag-btn-primary-glow">
                {cta.text}
              </Link>
            )}
            {secondaryCta && (
              <Link href={secondaryCta.href} className="ag-btn-glass">
                {secondaryCta.text}
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
