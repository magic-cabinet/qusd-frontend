import { motion, type HTMLMotionProps } from 'framer-motion'
import { forwardRef } from 'react'
import { colors, borders, shadows } from '../tokens'

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'dark'
export type CardSize = 'sm' | 'md' | 'lg'

export interface CardProps extends HTMLMotionProps<'div'> {
  variant?: CardVariant
  size?: CardSize
  hoverable?: boolean
  glowOnHover?: boolean
}

const variantStyles: Record<CardVariant, { bg: string; border: string }> = {
  default: {
    bg: 'white',
    border: colors.gray[200],
  },
  elevated: {
    bg: 'white',
    border: 'transparent',
  },
  outlined: {
    bg: colors.paper,
    border: colors.gray[200],
  },
  dark: {
    bg: colors.dark.surface,
    border: colors.dark.border,
  },
}

const sizeStyles: Record<CardSize, string> = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      size = 'md',
      hoverable = false,
      glowOnHover = false,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const styles = variantStyles[variant]

    return (
      <motion.div
        ref={ref}
        whileHover={
          hoverable
            ? {
                y: -2,
                boxShadow: glowOnHover ? shadows.glow.cyan : shadows.lg,
              }
            : undefined
        }
        className={`
          rounded-2xl
          overflow-hidden
          relative
          transition-all duration-200
          ${sizeStyles[size]}
          ${hoverable ? 'cursor-pointer' : ''}
          ${className}
        `}
        style={{
          backgroundColor: styles.bg,
          border: `1px solid ${styles.border}`,
          boxShadow: variant === 'elevated' ? shadows.md : 'none',
        }}
        {...props}
      >
        {glowOnHover && (
          <div
            className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-2xl pointer-events-none"
            style={{ background: colors.gradient.glow.cyan }}
          />
        )}
        <div className="relative">{children}</div>
      </motion.div>
    )
  }
)

Card.displayName = 'Card'

export default Card
