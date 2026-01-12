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
    gradient: 'linear-gradient(135deg, #0ECCED 0%, #025EC4 100%)',
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
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #B45309 100%)',
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
    gradient: 'linear-gradient(135deg, #000000 0%, #333333 100%)',
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
}

// ============================================
// ALL VARIATIONS
// ============================================
export const themes = {
  technicalCyan,
  warmFinance,
  monochromeMinimal,
} as const

export type ThemeName = keyof typeof themes

export default themes
