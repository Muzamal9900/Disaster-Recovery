export interface TechnicalCard {
  iconSvg: string;           // SVG string content (trusted brand assets, not user input)
  title: string;
  description: string;
}

export interface ProtocolStep {
  title: string;
  description: string;
}

export interface ServiceTheme {
  headerGradient: string;     // CSS background value for header overlay
  headerRadial?: string;      // Optional radial gradient ::after
  leadBorderColor: string;    // Left border colour on lead text
  statusColor: string;        // Status indicator colour
  pulseColor: string;         // Pulse animation colour (rgba)
  techIconColor: string;      // SVG icon colour
  techIconBg: string;         // Icon background colour
  techIconBorder: string;     // Icon border colour
}

export interface SidebarConfig {
  statusText: string;
  heading: string;
  description: string;
  ctaHref: string;
  ctaText: string;
  footerNote: string;
  trustText: string;
}

export interface ServicePageData {
  slug: string;
  breadcrumbLabel: string;
  title: string;
  leadText: string;
  theme: ServiceTheme;
  introHeading: string;
  introParagraphs: string[];
  technicalCards: TechnicalCard[];
  protocolHeading: string;
  protocolSteps: ProtocolStep[];
  sidebar: SidebarConfig;
}
