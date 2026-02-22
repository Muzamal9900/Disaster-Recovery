import type { ReactNode } from 'react';

interface ProTipProps {
  title?: string;
  variant?: 'tip' | 'warning' | 'legal';
  children: ReactNode;
}

const VARIANT_CONFIG = {
  tip: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
    ),
    defaultTitle: 'Pro Tip',
    borderColour: '#2563eb',
    bgColour: '#eff6ff',
    iconColour: '#2563eb',
  },
  warning: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
    ),
    defaultTitle: 'Important Warning',
    borderColour: '#dc2626',
    bgColour: '#fef2f2',
    iconColour: '#dc2626',
  },
  legal: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m17 2-4 4-4-4"/><path d="M12 6v16"/><path d="M3 10h18"/><path d="M5 14h2"/><path d="M17 14h2"/><path d="M7 18h2"/><path d="M15 18h2"/></svg>
    ),
    defaultTitle: 'Legal Requirement',
    borderColour: '#7c3aed',
    bgColour: '#f5f3ff',
    iconColour: '#7c3aed',
  },
} as const;

export function ProTip({ title, variant = 'tip', children }: ProTipProps) {
  const config = VARIANT_CONFIG[variant];

  return (
    <div
      role="note"
      style={{
        display: 'flex',
        gap: '0.75rem',
        padding: '1rem 1.25rem',
        margin: '1.5rem 0',
        borderLeft: `4px solid ${config.borderColour}`,
        background: config.bgColour,
        borderRadius: '0 0.5rem 0.5rem 0',
        fontSize: '0.9375rem',
        lineHeight: 1.6,
      }}
    >
      <span style={{ color: config.iconColour, flexShrink: 0, marginTop: '2px' }}>
        {config.icon}
      </span>
      <div>
        <strong style={{ display: 'block', marginBottom: '0.25rem', color: config.iconColour }}>
          {title || config.defaultTitle}
        </strong>
        {children}
      </div>
    </div>
  );
}
