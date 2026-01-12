/**
 * QUSD Design System Tokens
 *
 * This is the single source of truth for all design decisions.
 * Import these tokens in components instead of hardcoding values.
 *
 * Based on Brand Guidelines 2025
 */

// ============================================
// COLORS
// ============================================

export const colors = {
  // Primary Brand
  cyan: {
    DEFAULT: '#0ECCED',
    light: '#00c3ff',
    dark: '#0BB8D9',
  },
  blue: {
    DEFAULT: '#025EC4',
    light: '#0370E0',
    dark: '#024A9C',
  },

  // Neutrals - Light Mode
  ink: '#0a0a0a',
  paper: '#fafaf9',

  // Neutrals - Dark Mode
  dark: {
    DEFAULT: '#030812',
    surface: '#111111',
    border: '#262626',
  },

  // Grays
  gray: {
    50: '#fafaf9',
    100: '#f5f5f4',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },

  // Semantic
  success: '#00ff88',
  warning: '#ffbd2e',
  error: '#ff5f56',

  // Gradient definitions
  gradient: {
    primary: 'linear-gradient(135deg, #0ECCED 0%, #025EC4 100%)',
    primaryHover: 'linear-gradient(135deg, #00c3ff 0%, #0370E0 100%)',
    glow: {
      cyan: 'linear-gradient(135deg, #0ECCED 0%, #025EC4 100%)',
      blue: 'linear-gradient(135deg, #0055ff 0%, #025EC4 100%)',
    },
  },
} as const

// ============================================
// TYPOGRAPHY
// ============================================

export const typography = {
  fontFamily: {
    mono: "'Space Mono', monospace",
    sans: "'DM Sans', system-ui, sans-serif",
  },

  fontSize: {
    xs: '10px',
    sm: '12px',
    base: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
    '6xl': '60px',
    '7xl': '72px',
    '8xl': '96px',
  },

  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeight: {
    tight: 0.9,
    snug: 1.1,
    normal: 1.5,
    relaxed: 1.625,
  },

  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.05em',
    wider: '0.1em',
    widest: '0.3em',
  },
} as const

// ============================================
// SPACING
// ============================================

export const spacing = {
  px: '1px',
  0: '0',
  0.5: '2px',
  1: '4px',
  1.5: '6px',
  2: '8px',
  2.5: '10px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  11: '44px',
  12: '48px',
  14: '56px',
  16: '64px',
  20: '80px',
  24: '96px',
  28: '112px',
  32: '128px',
} as const

// ============================================
// BORDERS
// ============================================

export const borders = {
  radius: {
    none: '0',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '24px',
    full: '9999px',
  },

  width: {
    0: '0',
    1: '1px',
    2: '2px',
    4: '4px',
  },
} as const

// ============================================
// SHADOWS
// ============================================

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',

  // Brand glow shadows
  glow: {
    cyan: '0 0 20px rgba(14, 204, 237, 0.25)',
    cyanLg: '0 0 40px rgba(14, 204, 237, 0.35)',
    blue: '0 0 20px rgba(2, 94, 196, 0.25)',
  },
} as const

// ============================================
// TRANSITIONS
// ============================================

export const transitions = {
  duration: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '500ms',
  },

  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
} as const

// ============================================
// Z-INDEX
// ============================================

export const zIndex = {
  hide: -1,
  base: 0,
  raised: 10,
  dropdown: 20,
  sticky: 30,
  overlay: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
} as const

// ============================================
// BREAKPOINTS
// ============================================

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

// ============================================
// COMPONENT TOKENS
// ============================================

export const components = {
  button: {
    height: {
      sm: '32px',
      md: '40px',
      lg: '48px',
    },
    padding: {
      sm: '12px 16px',
      md: '12px 20px',
      lg: '16px 32px',
    },
    fontSize: {
      sm: typography.fontSize.xs,
      md: typography.fontSize.sm,
      lg: typography.fontSize.base,
    },
  },

  card: {
    padding: {
      sm: spacing[4],
      md: spacing[6],
      lg: spacing[8],
    },
    borderRadius: borders.radius['2xl'],
  },

  badge: {
    height: {
      sm: '20px',
      md: '24px',
      lg: '28px',
    },
    padding: {
      sm: '4px 8px',
      md: '4px 12px',
      lg: '6px 16px',
    },
  },

  input: {
    height: {
      sm: '32px',
      md: '40px',
      lg: '48px',
    },
    padding: '12px 16px',
    borderRadius: borders.radius.xl,
  },

  navbar: {
    height: '72px',
    mobileHeight: '60px',
  },
} as const

// ============================================
// ANIMATION PRESETS (for Framer Motion)
// ============================================

export const motion = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  },

  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 },
  },

  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.2 },
  },

  slideInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.4 },
  },

  slideInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.4 },
  },

  stagger: {
    container: {
      animate: { transition: { staggerChildren: 0.1 } },
    },
    item: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
    },
  },

  hover: {
    scale: { scale: 1.02 },
    lift: { y: -2 },
    glow: { boxShadow: shadows.glow.cyan },
  },

  tap: {
    scale: { scale: 0.98 },
  },
} as const

// ============================================
// FULL TOKEN EXPORT
// ============================================

export const tokens = {
  colors,
  typography,
  spacing,
  borders,
  shadows,
  transitions,
  zIndex,
  breakpoints,
  components,
  motion,
} as const

export default tokens
