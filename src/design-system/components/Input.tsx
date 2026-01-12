import { motion, type HTMLMotionProps } from 'framer-motion'
import { forwardRef, useState } from 'react'
import { colors, typography, borders, shadows } from '../tokens'

export type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps extends Omit<HTMLMotionProps<'input'>, 'size'> {
  size?: InputSize
  label?: string
  error?: string
  hint?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const sizeStyles: Record<InputSize, { height: string; fontSize: string; padding: string }> = {
  sm: { height: '32px', fontSize: '12px', padding: '0 12px' },
  md: { height: '40px', fontSize: '14px', padding: '0 16px' },
  lg: { height: '48px', fontSize: '14px', padding: '0 20px' },
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      className = '',
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false)
    const sizeStyle = sizeStyles[size]

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      onBlur?.(e)
    }

    return (
      <div className={`flex flex-col gap-1.5 ${className}`}>
        {label && (
          <label
            className="font-['Space_Mono'] text-[10px] uppercase tracking-wide"
            style={{ color: colors.gray[500] }}
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <span
              className="absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: colors.gray[400] }}
            >
              {leftIcon}
            </span>
          )}

          <motion.input
            ref={ref}
            animate={{
              borderColor: error
                ? colors.error
                : isFocused
                  ? colors.cyan.DEFAULT
                  : colors.gray[200],
              boxShadow: isFocused ? shadows.glow.cyan : 'none',
            }}
            transition={{ duration: 0.15 }}
            className="w-full rounded-xl outline-none transition-colors"
            style={{
              height: sizeStyle.height,
              padding: sizeStyle.padding,
              paddingLeft: leftIcon ? '44px' : sizeStyle.padding.split(' ')[1],
              paddingRight: rightIcon ? '44px' : sizeStyle.padding.split(' ')[1],
              fontSize: sizeStyle.fontSize,
              fontFamily: typography.fontFamily.sans,
              backgroundColor: colors.paper,
              border: `1px solid ${colors.gray[200]}`,
              color: colors.ink,
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />

          {rightIcon && (
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2"
              style={{ color: colors.gray[400] }}
            >
              {rightIcon}
            </span>
          )}
        </div>

        {(error || hint) && (
          <span
            className="font-['Space_Mono'] text-[10px]"
            style={{ color: error ? colors.error : colors.gray[400] }}
          >
            {error || hint}
          </span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
