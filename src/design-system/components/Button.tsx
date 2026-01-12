import { motion, type HTMLMotionProps } from 'framer-motion'
import { forwardRef } from 'react'
import { colors, typography, components, shadows, transitions } from '../tokens'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'size'> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-gradient-to-r from-[${colors.cyan.DEFAULT}] to-[${colors.blue.DEFAULT}]
    text-white
    hover:shadow-lg hover:shadow-[${colors.cyan.DEFAULT}]/25
  `,
  secondary: `
    bg-[${colors.ink}]
    text-white
    hover:bg-[${colors.gray[800]}]
  `,
  outline: `
    bg-transparent
    border border-[${colors.ink}]
    text-[${colors.ink}]
    hover:bg-[${colors.ink}]
    hover:text-white
  `,
  ghost: `
    bg-transparent
    text-[${colors.ink}]
    hover:bg-[${colors.gray[100]}]
  `,
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-4 text-xs gap-1.5',
  md: 'h-10 px-5 text-sm gap-2',
  lg: 'h-12 px-8 text-sm gap-3',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center
      font-semibold
      rounded-full
      transition-all duration-200
      disabled:opacity-50 disabled:cursor-not-allowed
      ${fullWidth ? 'w-full' : ''}
    `

    return (
      <motion.button
        ref={ref}
        whileHover={disabled || isLoading ? undefined : { scale: 1.02 }}
        whileTap={disabled || isLoading ? undefined : { scale: 0.98 }}
        className={`${baseStyles} ${sizeStyles[size]} ${className}`}
        disabled={disabled || isLoading}
        style={{
          background: variant === 'primary' ? '#0052CC' : undefined,
          backgroundColor:
            variant === 'secondary'
              ? colors.ink
              : variant === 'ghost'
                ? 'transparent'
                : undefined,
          color: variant === 'primary' || variant === 'secondary' ? 'white' : colors.ink,
          border: variant === 'outline' ? `1px solid ${colors.ink}` : 'none',
        }}
        {...props}
      >
        {isLoading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export default Button
