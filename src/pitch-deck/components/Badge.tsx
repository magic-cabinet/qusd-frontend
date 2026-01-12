import { forwardRef } from 'react'
import { colors, typography, borders, components } from '../tokens'

export type BadgeVariant = 'blue' | 'white' | 'outlined' | 'dark'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  arrow?: boolean
}

const variantStyles: Record<BadgeVariant, { bg: string; text: string; border?: string }> = {
  blue: { bg: colors.primary.blue, text: colors.text.light },
  white: { bg: colors.primary.white, text: colors.text.dark, border: colors.border.light },
  outlined: { bg: 'transparent', text: colors.primary.blue, border: colors.primary.blue },
  dark: { bg: colors.primary.darkBlue, text: colors.text.light },
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'blue', arrow = false, children, className = '', style, ...props }, ref) => {
    const styles = variantStyles[variant]

    return (
      <span
        ref={ref}
        className={`inline-flex items-center gap-2 ${className}`}
        style={{
          height: components.badge.height,
          padding: components.badge.padding,
          backgroundColor: styles.bg,
          color: styles.text,
          border: styles.border ? `2px solid ${styles.border}` : 'none',
          borderRadius: borders.radius.pill,
          fontFamily: typography.fontFamily.body,
          fontSize: typography.fontSize.label,
          fontWeight: typography.fontWeight.semibold,
          whiteSpace: 'nowrap',
          ...style,
        }}
        {...props}
      >
        {children}
        {arrow && <span>→</span>}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export default Badge
