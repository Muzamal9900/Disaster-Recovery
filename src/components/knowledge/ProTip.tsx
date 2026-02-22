import type { ReactNode } from 'react';
import { Lightbulb, AlertTriangle, Scale } from 'lucide-react';

interface ProTipProps {
  title?: string;
  variant?: 'tip' | 'warning' | 'legal';
  children: ReactNode;
}

const VARIANT_CONFIG = {
  tip: {
    icon: Lightbulb,
    defaultTitle: 'Pro Tip',
    borderColour: '#2563eb',
    bgColour: '#eff6ff',
    iconColour: '#2563eb',
  },
  warning: {
    icon: AlertTriangle,
    defaultTitle: 'Important Warning',
    borderColour: '#dc2626',
    bgColour: '#fef2f2',
    iconColour: '#dc2626',
  },
  legal: {
    icon: Scale,
    defaultTitle: 'Legal Requirement',
    borderColour: '#7c3aed',
    bgColour: '#f5f3ff',
    iconColour: '#7c3aed',
  },
} as const;

export function ProTip({ title, variant = 'tip', children }: ProTipProps) {
  const config = VARIANT_CONFIG[variant];
  const Icon = config.icon;

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
        <Icon size={20} />
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
