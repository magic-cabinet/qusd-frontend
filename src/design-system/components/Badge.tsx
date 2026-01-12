import { motion, type HTMLMotionProps } from 'framer-motion'
import { forwardRef } from 'react'
import { colors, typography } from '../tokens'

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'outline'
export type BadgeSize = 'sm' | 'md' | 'lg'

export interface BadgeProps extends HTMLMotionProps<'span'> {
  variant?: BadgeVariant
  size?: BadgeSize
  dot?: boolean
  pulse?: boolean
  icon?: React.ReactNode
}

const variantStyles: Record<BadgeVariant, { bg: string; text: string; border?: string }> = {
  default: {
    bg: colors.gray[100],
    text: colors.gray[500],
  },
  primary: {
    bg: `linear-gradient(135deg, ${colors.cyan.DEFAULT}15, ${colors.blue.DEFAULT}15)`,
    text: colors.cyan.DEFAULT,
    border: colors.cyan.DEFAULT,
  },
  success: {
    bg: `${colors.success}15`,
    text: colors.success,
  },
  warning: {
    bg: `${colors.warning}20`,
    text: colors.warning,
  },
  outline: {
    bg: 'transparent',
    text: colors.gray[500],
    border: colors.gray[200],
  },
}

const sizeStyles: Record<BadgeSize, { height: string; padding: string; fontSize: string }> = {
  sm: { height: '20px', padding: '0 8px', fontSize: '9px' },
  md: { height: '24px', padding: '0 12px', fontSize: '10px' },
  lg: { height: '28px', padding: '0 16px', fontSize: '11px' },
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'default',
      size = 'md',
      dot = false,
      pulse = false,
      icon,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const styles = variantStyles[variant]
    const sizeStyle = sizeStyles[size]

    return (
      <motion.span
        ref={ref}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`
          inline-flex items-center gap-1.5
          font-['Space_Mono'] uppercase tracking-wide
          rounded-full
          ${className}
        `}
        style={{
          height: sizeStyle.height,
          padding: sizeStyle.padding,
          fontSize: sizeStyle.fontSize,
          background: styles.bg,
          color: styles.text,
          border: styles.border ? `1px solid ${styles.border}` : 'none',
        }}
        {...props}
      >
        {dot && (
          <span
            className={`w-1.5 h-1.5 rounded-full ${pulse ? 'animate-pulse' : ''}`}
            style={{ backgroundColor: styles.text }}
          />
        )}
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </motion.span>
    )
  }
)

Badge.displayName = 'Badge'

export default Badge
