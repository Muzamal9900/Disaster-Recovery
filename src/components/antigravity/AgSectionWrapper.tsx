import type { ReactNode } from 'react';

interface AgSectionWrapperProps {
  children: ReactNode;
  /** Optional section id for anchor linking */
  id?: string;
  /** Background colour or style override */
  background?: string;
  /** Extra CSS class names */
  className?: string;
  /** Reduce vertical padding */
  compact?: boolean;
}

/**
 * AgSectionWrapper — Standard section spacing and container for AG pages.
 * Provides consistent vertical rhythm between content blocks.
 */
export function AgSectionWrapper({
  children,
  id,
  background,
  className = '',
  compact = false,
}: AgSectionWrapperProps) {
  return (
    <section
      id={id}
      className={className}
      style={{
        padding: compact ? '3rem 1.5rem' : '5rem 1.5rem',
        background: background || undefined,
      }}
    >
      <div className="ag-container">
        {children}
      </div>
    </section>
  );
}
