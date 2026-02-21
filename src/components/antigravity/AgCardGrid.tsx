import type { ReactNode } from 'react';

interface AgCardGridProps {
  children: ReactNode;
  /** Minimum card width before wrapping (default: 300px) */
  minWidth?: string;
  /** Gap between cards (default: 1.5rem) */
  gap?: string;
  /** Maximum number of columns */
  maxColumns?: number;
}

/**
 * AgCardGrid — Responsive card grid layout using CSS Grid auto-fit.
 * Cards automatically flow into as many columns as fit the container.
 */
export function AgCardGrid({
  children,
  minWidth = '300px',
  gap = '1.5rem',
  maxColumns,
}: AgCardGridProps) {
  const gridTemplate = maxColumns
    ? `repeat(${maxColumns}, 1fr)`
    : `repeat(auto-fit, minmax(${minWidth}, 1fr))`;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: gridTemplate,
        gap,
      }}
    >
      {children}
    </div>
  );
}
