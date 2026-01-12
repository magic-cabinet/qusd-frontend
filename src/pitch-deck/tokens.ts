/**
 * QUSD Pitch Deck Design Tokens
 *
 * Style guide for presentation materials, PDFs, and pitch decks.
 * Separate from the web design system - optimized for print/presentation.
 */

// ============================================
// COLORS
// ============================================

export const colors = {
  // Primary Palette
  primary: {
    blue: '#0052CC',
    darkBlue: '#001A4D',
    white: '#FFFFFF',
    lightGray: '#F5F5F5',
  },

  // Accent Colors
  accent: {
    orange: '#FF9500',
    gold: '#FFB800',
    cyan: '#0ECCED', // From web brand
  },

  // Text Colors
  text: {
    dark: '#001A4D',
    light: '#FFFFFF',
    muted: '#666666',
    subtle: '#999999',
  },

  // Background Colors
  background: {
    slide: '#F5F5F5',
    card: '#FFFFFF',
    emphasis: '#0052CC',
    dark: '#001A4D',
  },

  // Border Colors
  border: {
    light: '#E0E0E0',
    dark: '#001A4D',
    blue: '#0052CC',
  },
} as const

// ============================================
// TYPOGRAPHY
// ============================================

export const typography = {
  fontFamily: {
    title: "'Playfair Display', Georgia, serif",
    body: "'Lato', 'Manrope', sans-serif",
    mono: "'Space Mono', monospace",
  },

  fontSize: {
    // Titles
    hero: '72pt',
    title: '54pt',
    sectionTitle: '44pt',
    subtitle: '36pt',

    // Body
    bodyLarge: '18pt',
    body: '16pt',
    bodySmall: '14pt',

    // Labels
    label: '12pt',
    small: '10pt',
  },

  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeight: {
    tight: 1.1,
    normal: 1.4,
    relaxed: 1.6,
  },

  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.05em',
    caps: '0.1em', // For all-caps text
  },
} as const

// ============================================
// SPACING (in pixels for slides)
// ============================================

export const spacing = {
  // Margins
  slideMargin: '50px',
  sectionGap: '40px',
  elementGap: '24px',

  // Padding
  cardPadding: '32px',
  badgePadding: '12px 24px',

  // Specific
  headerHeight: '80px',
  footerHeight: '60px',
} as const

// ============================================
// BORDERS & SHAPES
// ============================================

export const borders = {
  radius: {
    none: '0',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    pill: '9999px',
  },

  width: {
    thin: '1px',
    medium: '2px',
    thick: '3px',
    heavy: '4px',
  },
} as const

// ============================================
// SHADOWS
// ============================================

export const shadows = {
  card: '0 4px 12px rgba(0, 0, 0, 0.08)',
  cardHover: '0 8px 24px rgba(0, 0, 0, 0.12)',
  emphasis: '0 4px 20px rgba(0, 82, 204, 0.25)',
} as const

// ============================================
// SLIDE DIMENSIONS
// ============================================

export const slides = {
  // 16:9 aspect ratio
  width: '1920px',
  height: '1080px',

  // Scaled preview
  previewWidth: '960px',
  previewHeight: '540px',

  // Thumbnail
  thumbWidth: '320px',
  thumbHeight: '180px',
} as const

// ============================================
// COMPONENT TOKENS
// ============================================

export const components = {
  // Header bar
  header: {
    height: '80px',
    lineWidth: '4px',
    logoSize: '48px',
  },

  // Badges/Pills
  badge: {
    height: '40px',
    padding: '0 24px',
    borderRadius: borders.radius.pill,
    fontSize: typography.fontSize.label,
  },

  // Content Cards
  card: {
    padding: '32px',
    borderRadius: borders.radius.lg,
    gap: '16px',
  },

  // Timeline
  timeline: {
    dotSize: '16px',
    lineWidth: '3px',
    connectorWidth: '2px',
  },

  // Buttons
  button: {
    height: '48px',
    padding: '0 32px',
    borderRadius: borders.radius.pill,
  },

  // Grid
  grid: {
    columns: 4,
    gap: '24px',
  },
} as const

// ============================================
// DECORATIVE PATTERNS
// ============================================

export const patterns = {
  // Dot grid pattern
  dotGrid: {
    size: '4px',
    gap: '24px',
    color: colors.accent.gold,
    opacity: 0.6,
  },

  // Network lines
  network: {
    lineWidth: '1px',
    nodeSize: '8px',
    color: colors.primary.blue,
    opacity: 0.3,
  },
} as const

// ============================================
// FULL EXPORT
// ============================================

export const pitchDeckTokens = {
  colors,
  typography,
  spacing,
  borders,
  shadows,
  slides,
  components,
  patterns,
} as const

export default pitchDeckTokens
