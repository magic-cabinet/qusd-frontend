import React, { forwardRef } from 'react'
import { colors, typography } from '../tokens'

export type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'body-sm' | 'annotation' | 'code'
export type TextColor = 'default' | 'muted' | 'primary' | 'success' | 'white'

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TextVariant
  color?: TextColor
  as?: keyof React.JSX.IntrinsicElements
  gradient?: boolean
}

const variantConfig: Record<
  TextVariant,
  { fontSize: string; fontWeight: number; fontFamily: string; lineHeight: number; letterSpacing: string }
> = {
  h1: {
    fontSize: typography.fontSize['7xl'],
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.mono,
    lineHeight: typography.lineHeight.tight,
    letterSpacing: typography.letterSpacing.tight,
  },
  h2: {
    fontSize: typography.fontSize['5xl'],
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.mono,
    lineHeight: typography.lineHeight.tight,
    letterSpacing: typography.letterSpacing.tight,
  },
  h3: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.mono,
    lineHeight: typography.lineHeight.snug,
    letterSpacing: typography.letterSpacing.normal,
  },
  h4: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.mono,
    lineHeight: typography.lineHeight.snug,
    letterSpacing: typography.letterSpacing.normal,
  },
  body: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.normal,
    fontFamily: typography.fontFamily.body,
    lineHeight: typography.lineHeight.relaxed,
    letterSpacing: typography.letterSpacing.normal,
  },
  'body-sm': {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.normal,
    fontFamily: typography.fontFamily.body,
    lineHeight: typography.lineHeight.relaxed,
    letterSpacing: typography.letterSpacing.normal,
  },
  annotation: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.normal,
    fontFamily: typography.fontFamily.mono,
    lineHeight: typography.lineHeight.normal,
    letterSpacing: typography.letterSpacing.wide,
  },
  code: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.normal,
    fontFamily: typography.fontFamily.mono,
    lineHeight: typography.lineHeight.normal,
    letterSpacing: typography.letterSpacing.normal,
  },
}

const colorStyles: Record<TextColor, string> = {
  default: colors.ink,
  muted: colors.gray[500],
  primary: colors.cyan.DEFAULT,
  success: colors.success,
  white: 'white',
}

const defaultTags: Record<TextVariant, keyof React.JSX.IntrinsicElements> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  body: 'p',
  'body-sm': 'p',
  annotation: 'span',
  code: 'code',
}

export const Text = forwardRef<HTMLElement, TextProps>(
  ({ variant = 'body', color = 'default', as, gradient = false, children, className = '', style, ...props }, ref) => {
    const config = variantConfig[variant]
    const Tag = as || defaultTags[variant]

    const textStyle: React.CSSProperties = {
      fontSize: config.fontSize,
      fontWeight: config.fontWeight,
      fontFamily: config.fontFamily,
      lineHeight: config.lineHeight,
      letterSpacing: config.letterSpacing,
      color: gradient ? 'transparent' : colorStyles[color],
      textTransform: variant === 'annotation' ? 'uppercase' : undefined,
      ...(gradient && {
        background: colors.gradient.primary,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
      }),
      ...style,
    }

    return (
      // @ts-ignore - dynamic tag
      <Tag ref={ref} className={className} style={textStyle} {...props}>
        {children}
      </Tag>
    )
  }
)

Text.displayName = 'Text'

export default Text
