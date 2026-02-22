import type { LucideIcon } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */

type AgIconVariant =
  | 'hero'            // Glass container for hero sections (72×72, blur bg, white icon)
  | 'glass'           // .ag-icon-glass (56×56, bento cards)
  | 'step'            // .ag-step-icon (64×64, circular)
  | 'tech'            // .ag-tech-icon (48×48, themed border)
  | 'feature'         // .ag-card-feature-icon (48×48, rounded)
  | 'inline'          // No container, 20px, AG blue colour
  | 'inline-success'  // No container, 18px, green
  | 'inline-danger';  // No container, 18px, emergency red

interface AgIconProps {
  variant: AgIconVariant;
  /** Lucide component reference (not an instance) */
  icon: LucideIcon;
  /** Override container class */
  className?: string;
  /** Override icon colour */
  color?: string;
  /** Override background (container variants only) */
  bg?: string;
  /** Override border colour (tech variant) */
  borderColor?: string;
  /** Override icon size in px */
  size?: number;
}

/* -------------------------------------------------------------------------- */
/* Variant config                                                              */
/* -------------------------------------------------------------------------- */

const VARIANT_DEFAULTS: Record<
  AgIconVariant,
  { containerClass: string | null; size: number; color: string }
> = {
  hero:           { containerClass: 'ag-icon-hero',         size: 48, color: 'rgba(255,255,255,0.9)' },
  glass:          { containerClass: 'ag-icon-glass',        size: 28, color: 'var(--ag-secondary-blue)' },
  step:           { containerClass: 'ag-step-icon',         size: 32, color: 'var(--ag-secondary-blue)' },
  tech:           { containerClass: 'ag-tech-icon',         size: 28, color: 'currentColor' },
  feature:        { containerClass: 'ag-card-feature-icon', size: 24, color: 'var(--ag-secondary-blue)' },
  inline:         { containerClass: null,                   size: 20, color: 'var(--ag-secondary-blue)' },
  'inline-success': { containerClass: null,                 size: 18, color: '#16a34a' },
  'inline-danger':  { containerClass: null,                 size: 18, color: 'var(--ag-emergency-red)' },
};

/* Inline variants use a lightweight <span> wrapper */
const INLINE_CLASSES: Record<string, string> = {
  inline:           'ag-icon-inline',
  'inline-success': 'ag-icon-inline-success',
  'inline-danger':  'ag-icon-inline-danger',
};

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

export function AgIcon({
  variant,
  icon: Icon,
  className,
  color,
  bg,
  borderColor,
  size,
}: AgIconProps) {
  const defaults = VARIANT_DEFAULTS[variant];
  const iconSize = size ?? defaults.size;
  const iconColor = color ?? defaults.color;

  // Inline variants: render a <span> wrapper
  if (!defaults.containerClass) {
    const inlineClass = INLINE_CLASSES[variant] ?? '';
    return (
      <span className={className ?? inlineClass}>
        <Icon size={iconSize} color={iconColor} />
      </span>
    );
  }

  // Container variants: render a <div> with the design-system class
  const containerStyle: React.CSSProperties = {};
  if (bg) containerStyle.background = bg;
  if (borderColor) containerStyle.borderColor = borderColor;

  return (
    <div
      className={className ?? defaults.containerClass}
      style={Object.keys(containerStyle).length > 0 ? containerStyle : undefined}
    >
      <Icon size={iconSize} color={iconColor} />
    </div>
  );
}
