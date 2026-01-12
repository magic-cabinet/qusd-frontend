/**
 * QUSD Theme Variations
 *
 * Three distinct visual directions for brand exploration.
 * Use Storybook to preview and compare these variations.
 */

export interface ThemeVariation {
  name: string
  description: string
  colors: {
    primary: string
    primaryLight: string
    secondary: string
    accent: string
    success: string
    background: {
      main: string
      card: string
      dark: string
    }
    text: {
      primary: string
      secondary: string
      muted: string
      inverse: string
    }
    border: string
    gradient: string
  }
  typography: {
    headingFont: string
    bodyFont: string
  }
  style: {
    borderRadius: string
    cardStyle: 'sharp' | 'rounded' | 'pill'
    contrast: 'high' | 'medium' | 'soft'
  }
  logos: {
    light: string  // For dark backgrounds
    dark: string   // For light backgrounds
    icon: string   // Icon only
  }
}

// ============================================
// VARIATION 1: CURRENT (Technical Cyan)
// ============================================
export const technicalCyan: ThemeVariation = {
  name: 'Technical Cyan',
  description: 'Current brand - Technical precision with cyan/blue gradient. Clean, modern, crypto-native.',
  colors: {
    primary: '#0ECCED',
    primaryLight: '#00c3ff',
    secondary: '#025EC4',
    accent: '#00ff88',
    success: '#00ff88',
    background: {
      main: '#fafaf9',
      card: '#ffffff',
      dark: '#030812',
    },
    text: {
      primary: '#0a0a0a',
      secondary: '#737373',
      muted: '#a3a3a3',
      inverse: '#ffffff',
    },
    border: '#e5e5e5',
    gradient: '#0052CC',
  },
  typography: {
    headingFont: "'Space Mono', monospace",
    bodyFont: "'DM Sans', sans-serif",
  },
  style: {
    borderRadius: '24px',
    cardStyle: 'rounded',
    contrast: 'medium',
  },
  logos: {
    light: '/logos/QUSD_LOGO_0ECCED.svg',
    dark: '/logos/QUSD_LOGO_030812.svg',
    icon: '/logos/QUSD_ICON_0ECCED.svg',
  },
}

// ============================================
// VARIATION 2: WARM FINANCE
// ============================================
export const warmFinance: ThemeVariation = {
  name: 'Warm Finance',
  description: 'Approachable and trustworthy. Amber/gold tones evoke stability and value. More traditional finance feel.',
  colors: {
    primary: '#F59E0B',
    primaryLight: '#FBBF24',
    secondary: '#B45309',
    accent: '#10B981',
    success: '#10B981',
    background: {
      main: '#FFFBEB',
      card: '#ffffff',
      dark: '#1C1917',
    },
    text: {
      primary: '#1C1917',
      secondary: '#57534E',
      muted: '#A8A29E',
      inverse: '#ffffff',
    },
    border: '#E7E5E4',
    gradient: '#F59E0B',
  },
  typography: {
    headingFont: "'Playfair Display', Georgia, serif",
    bodyFont: "'Inter', sans-serif",
  },
  style: {
    borderRadius: '16px',
    cardStyle: 'rounded',
    contrast: 'soft',
  },
  logos: {
    light: '/logos/QUSD_LOGO_FFFAF1.svg',
    dark: '/logos/QUSD_LOGO_030812.svg',
    icon: '/logos/QUSD_ICON_FFFAF1.svg',
  },
}

// ============================================
// VARIATION 3: MONOCHROME MINIMAL
// ============================================
export const monochromeMinimal: ThemeVariation = {
  name: 'Monochrome Minimal',
  description: 'Ultra-minimal black and white with single accent. Maximum contrast, pure technical aesthetic.',
  colors: {
    primary: '#000000',
    primaryLight: '#333333',
    secondary: '#000000',
    accent: '#3B82F6',
    success: '#22C55E',
    background: {
      main: '#ffffff',
      card: '#ffffff',
      dark: '#000000',
    },
    text: {
      primary: '#000000',
      secondary: '#525252',
      muted: '#9CA3AF',
      inverse: '#ffffff',
    },
    border: '#E5E7EB',
    gradient: '#000000',
  },
  typography: {
    headingFont: "'Space Grotesk', sans-serif",
    bodyFont: "'Inter', sans-serif",
  },
  style: {
    borderRadius: '8px',
    cardStyle: 'sharp',
    contrast: 'high',
  },
  logos: {
    light: '/logos/QUSD_LOGO_FFFAF1.svg',
    dark: '/logos/QUSD_LOGO_030812.svg',
    icon: '/logos/QUSD_ICON_BLACK.svg',
  },
}

// ============================================
// VARIATION 4: EDITORIAL SERIF
// ============================================
export const editorialSerif: ThemeVariation = {
  name: 'Editorial Serif',
  description: 'Sophisticated editorial style. Playfair Display headlines with Lato body. High-end publication feel.',
  colors: {
    primary: '#0ECCED',
    primaryLight: '#00c3ff',
    secondary: '#025EC4',
    accent: '#00ff88',
    success: '#00ff88',
    background: {
      main: '#fafaf9',
      card: '#ffffff',
      dark: '#030812',
    },
    text: {
      primary: '#0a0a0a',
      secondary: '#737373',
      muted: '#a3a3a3',
      inverse: '#ffffff',
    },
    border: '#e5e5e5',
    gradient: '#0052CC',
  },
  typography: {
    headingFont: "'Playfair Display', Georgia, serif",
    bodyFont: "'Lato', sans-serif",
  },
  style: {
    borderRadius: '16px',
    cardStyle: 'rounded',
    contrast: 'medium',
  },
  logos: {
    light: '/logos/QUSD_LOGO_0ECCED.svg',
    dark: '/logos/QUSD_LOGO_025EC4.svg',
    icon: '/logos/QUSD_ICON_025EC4.svg',
  },
}

// ============================================
// VARIATION 5: SWISS CLEAN
// ============================================
export const swissClean: ThemeVariation = {
  name: 'Swiss Clean',
  description: 'International typographic style. Helvetica-inspired clarity with sharp geometric forms.',
  colors: {
    primary: '#0ECCED',
    primaryLight: '#00c3ff',
    secondary: '#025EC4',
    accent: '#00ff88',
    success: '#00ff88',
    background: {
      main: '#fafaf9',
      card: '#ffffff',
      dark: '#030812',
    },
    text: {
      primary: '#0a0a0a',
      secondary: '#737373',
      muted: '#a3a3a3',
      inverse: '#ffffff',
    },
    border: '#e5e5e5',
    gradient: '#0052CC',
  },
  typography: {
    headingFont: "'Inter', sans-serif",
    bodyFont: "'Inter', sans-serif",
  },
  style: {
    borderRadius: '4px',
    cardStyle: 'sharp',
    contrast: 'high',
  },
  logos: {
    light: '/logos/QUSD_LOGO_0ECCED.svg',
    dark: '/logos/QUSD_LOGO_030812.svg',
    icon: '/logos/QUSD_ICON_030812.svg',
  },
}

// ============================================
// VARIATION 6: HUMANIST WARM
// ============================================
export const humanistWarm: ThemeVariation = {
  name: 'Humanist Warm',
  description: 'Friendly and approachable. Rounded forms with humanist typefaces. Inviting and trustworthy.',
  colors: {
    primary: '#0ECCED',
    primaryLight: '#00c3ff',
    secondary: '#025EC4',
    accent: '#00ff88',
    success: '#00ff88',
    background: {
      main: '#fafaf9',
      card: '#ffffff',
      dark: '#030812',
    },
    text: {
      primary: '#0a0a0a',
      secondary: '#737373',
      muted: '#a3a3a3',
      inverse: '#ffffff',
    },
    border: '#e5e5e5',
    gradient: '#0052CC',
  },
  typography: {
    headingFont: "'Source Sans Pro', sans-serif",
    bodyFont: "'Source Sans Pro', sans-serif",
  },
  style: {
    borderRadius: '32px',
    cardStyle: 'pill',
    contrast: 'soft',
  },
  logos: {
    light: '/logos/QUSD_LOGO_0ECCED.svg',
    dark: '/logos/QUSD_LOGO_025EC4.svg',
    icon: '/logos/QUSD_ICON_0ECCED.svg',
  },
}

// ============================================
// VARIATION 7: BRUTALIST CODE
// ============================================
export const brutalistCode: ThemeVariation = {
  name: 'Brutalist Code',
  description: 'Raw developer aesthetic. All monospace, sharp corners, high contrast. Terminal-inspired.',
  colors: {
    primary: '#0ECCED',
    primaryLight: '#00c3ff',
    secondary: '#025EC4',
    accent: '#00ff88',
    success: '#00ff88',
    background: {
      main: '#fafaf9',
      card: '#ffffff',
      dark: '#030812',
    },
    text: {
      primary: '#0a0a0a',
      secondary: '#737373',
      muted: '#a3a3a3',
      inverse: '#ffffff',
    },
    border: '#e5e5e5',
    gradient: '#0052CC',
  },
  typography: {
    headingFont: "'JetBrains Mono', monospace",
    bodyFont: "'JetBrains Mono', monospace",
  },
  style: {
    borderRadius: '0px',
    cardStyle: 'sharp',
    contrast: 'high',
  },
  logos: {
    light: '/logos/QUSD_LOGO_0ECCED.svg',
    dark: '/logos/QUSD_LOGO_030812.svg',
    icon: '/logos/QUSD_ICON_030812.svg',
  },
}

// ============================================
// VARIATION 8: MODERN GEOMETRIC
// ============================================
export const modernGeometric: ThemeVariation = {
  name: 'Modern Geometric',
  description: 'Contemporary geometric style. Poppins headlines with clean proportions. Bold and confident.',
  colors: {
    primary: '#0ECCED',
    primaryLight: '#00c3ff',
    secondary: '#025EC4',
    accent: '#00ff88',
    success: '#00ff88',
    background: {
      main: '#fafaf9',
      card: '#ffffff',
      dark: '#030812',
    },
    text: {
      primary: '#0a0a0a',
      secondary: '#737373',
      muted: '#a3a3a3',
      inverse: '#ffffff',
    },
    border: '#e5e5e5',
    gradient: '#0052CC',
  },
  typography: {
    headingFont: "'Poppins', sans-serif",
    bodyFont: "'Poppins', sans-serif",
  },
  style: {
    borderRadius: '12px',
    cardStyle: 'rounded',
    contrast: 'medium',
  },
  logos: {
    light: '/logos/QUSD_LOGO_0ECCED.svg',
    dark: '/logos/QUSD_LOGO_025EC4.svg',
    icon: '/logos/QUSD_ICON_025EC4.svg',
  },
}

// ============================================
// ALL VARIATIONS
// ============================================
export const themes = {
  technicalCyan,
  warmFinance,
  monochromeMinimal,
  editorialSerif,
  swissClean,
  humanistWarm,
  brutalistCode,
  modernGeometric,
} as const

export type ThemeName = keyof typeof themes

export default themes
