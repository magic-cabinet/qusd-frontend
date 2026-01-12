import { forwardRef } from 'react'
import { colors, typography, borders, shadows, components } from '../tokens'

export type CardVariant = 'white' | 'blue' | 'dark' | 'outlined'

export interface ContentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  title?: string
  icon?: React.ReactNode
}

const variantStyles: Record<CardVariant, { bg: string; text: string; border?: string }> = {
  white: { bg: colors.background.card, text: colors.text.dark, border: colors.border.light },
  blue: { bg: colors.primary.blue, text: colors.text.light },
  dark: { bg: colors.primary.darkBlue, text: colors.text.light },
  outlined: { bg: 'transparent', text: colors.text.dark, border: colors.border.dark },
}

export const ContentCard = forwardRef<HTMLDivElement, ContentCardProps>(
  ({ variant = 'white', title, icon, children, className = '', style, ...props }, ref) => {
    const styles = variantStyles[variant]

    return (
      <div
        ref={ref}
        className={className}
        style={{
          backgroundColor: styles.bg,
          color: styles.text,
          padding: components.card.padding,
          borderRadius: borders.radius.lg,
          border: styles.border ? `2px solid ${styles.border}` : 'none',
          boxShadow: variant === 'white' ? shadows.card : 'none',
          ...style,
        }}
        {...props}
      >
        {(title || icon) && (
          <div
            className="flex items-center gap-3"
            style={{ marginBottom: '16px' }}
          >
            {icon && (
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: borders.radius.md,
                  backgroundColor: variant === 'white' ? colors.primary.blue : 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: colors.text.light,
                  fontSize: '18px',
                }}
              >
                {icon}
              </div>
            )}
            {title && (
              <h3
                style={{
                  fontFamily: typography.fontFamily.body,
                  fontSize: '18px',
                  fontWeight: typography.fontWeight.bold,
                  margin: 0,
                }}
              >
                {title}
              </h3>
            )}
          </div>
        )}
        <div
          style={{
            fontFamily: typography.fontFamily.body,
            fontSize: '14px',
            lineHeight: typography.lineHeight.relaxed,
          }}
        >
          {children}
        </div>
      </div>
    )
  }
)

ContentCard.displayName = 'ContentCard'

export default ContentCard
