import { forwardRef } from 'react'
import { colors, typography } from '../tokens'

export type TitleSize = 'hero' | 'title' | 'section' | 'subtitle'

export interface SlideTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  size?: TitleSize
  underline?: boolean
  caps?: boolean
  light?: boolean
}

const sizeStyles: Record<TitleSize, { fontSize: string; fontFamily: string }> = {
  hero: { fontSize: '48px', fontFamily: typography.fontFamily.title },
  title: { fontSize: '36px', fontFamily: typography.fontFamily.title },
  section: { fontSize: '28px', fontFamily: typography.fontFamily.title },
  subtitle: { fontSize: '18px', fontFamily: typography.fontFamily.body },
}

export const SlideTitle = forwardRef<HTMLHeadingElement, SlideTitleProps>(
  (
    {
      size = 'title',
      underline = false,
      caps = false,
      light = false,
      children,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const styles = sizeStyles[size]

    return (
      <h2
        ref={ref}
        className={`relative ${className}`}
        style={{
          fontFamily: styles.fontFamily,
          fontSize: styles.fontSize,
          fontWeight: typography.fontWeight.bold,
          lineHeight: typography.lineHeight.tight,
          textTransform: caps ? 'uppercase' : undefined,
          letterSpacing: caps ? typography.letterSpacing.caps : typography.letterSpacing.tight,
          color: light ? colors.text.light : colors.text.dark,
          margin: 0,
          marginBottom: underline ? '16px' : '8px',
          paddingBottom: underline ? '12px' : 0,
          ...style,
        }}
        {...props}
      >
        {children}
        {underline && (
          <span
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '60px',
              height: '4px',
              backgroundColor: colors.primary.blue,
              borderRadius: '2px',
            }}
          />
        )}
      </h2>
    )
  }
)

SlideTitle.displayName = 'SlideTitle'

export default SlideTitle
