/**
 * Adapts theme variations to pitch deck tokens
 */

import { type ThemeVariation } from '../themes/variations'
import { typography as baseTypography, spacing, borders, shadows, slides, components, patterns } from './tokens'

export function createPitchDeckTheme(theme: ThemeVariation) {
  return {
    colors: {
      primary: {
        blue: theme.colors.primary,
        darkBlue: theme.colors.background.dark,
        white: '#FFFFFF',
        lightGray: theme.colors.background.main,
      },
      accent: {
        orange: theme.colors.accent,
        gold: theme.colors.accent,
        cyan: theme.colors.primaryLight,
      },
      text: {
        dark: theme.colors.text.primary,
        light: theme.colors.text.inverse,
        muted: theme.colors.text.secondary,
        subtle: theme.colors.text.muted,
      },
      background: {
        slide: theme.colors.background.main,
        card: theme.colors.background.card,
        emphasis: theme.colors.primary,
        dark: theme.colors.background.dark,
      },
      border: {
        light: theme.colors.border,
        dark: theme.colors.text.primary,
        blue: theme.colors.primary,
      },
    },
    typography: {
      ...baseTypography,
      fontFamily: {
        title: theme.typography.headingFont,
        body: theme.typography.bodyFont,
        mono: "'Space Mono', monospace",
      },
    },
    spacing,
    borders: {
      ...borders,
      radius: {
        ...borders.radius,
        lg: theme.style.borderRadius,
      },
    },
    shadows,
    slides,
    components,
    patterns,
    // Theme metadata
    meta: {
      name: theme.name,
      description: theme.description,
      cardStyle: theme.style.cardStyle,
      contrast: theme.style.contrast,
    },
  } as const
}

export type PitchDeckTheme = ReturnType<typeof createPitchDeckTheme>
