import { forwardRef } from 'react'
import { colors, typography, spacing, slides, components } from '../tokens'

export type SlideVariant = 'default' | 'dark' | 'title' | 'section'

export interface SlideProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SlideVariant
  showHeader?: boolean
  showFooter?: boolean
  slideNumber?: number
  totalSlides?: number
}

const variantStyles: Record<SlideVariant, { bg: string; text: string }> = {
  default: { bg: colors.background.slide, text: colors.text.dark },
  dark: { bg: colors.primary.darkBlue, text: colors.text.light },
  title: { bg: colors.primary.white, text: colors.text.dark },
  section: { bg: colors.primary.blue, text: colors.text.light },
}

export const Slide = forwardRef<HTMLDivElement, SlideProps>(
  (
    {
      variant = 'default',
      showHeader = true,
      showFooter = false,
      slideNumber,
      totalSlides,
      children,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const styles = variantStyles[variant]

    return (
      <div
        ref={ref}
        className={`relative overflow-hidden ${className}`}
        style={{
          width: slides.previewWidth,
          height: slides.previewHeight,
          backgroundColor: styles.bg,
          color: styles.text,
          fontFamily: typography.fontFamily.body,
          ...style,
        }}
        {...props}
      >
        {/* Header Line */}
        {showHeader && (
          <div
            className="absolute top-0 left-0 right-0 flex items-center justify-between"
            style={{ height: components.header.height, padding: `0 ${spacing.slideMargin}` }}
          >
            {/* Blue accent line */}
            <div
              className="absolute top-0 left-0 right-0"
              style={{
                height: components.header.lineWidth,
                backgroundColor: colors.primary.blue,
              }}
            />

            {/* Logo placeholder */}
            <div className="flex items-center gap-3 mt-4">
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: colors.primary.blue,
                }}
              />
              <span
                style={{
                  fontFamily: typography.fontFamily.mono,
                  fontWeight: typography.fontWeight.bold,
                  fontSize: '14px',
                  color: variant === 'dark' || variant === 'section' ? colors.text.light : colors.primary.blue,
                }}
              >
                QUSD
              </span>
            </div>

            {/* Navigation dots */}
            <div className="flex items-center gap-2 mt-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: i === 1 ? colors.primary.blue : colors.border.light,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Content Area */}
        <div
          className="relative"
          style={{
            padding: spacing.slideMargin,
            paddingTop: showHeader ? components.header.height : spacing.slideMargin,
            paddingBottom: showFooter ? components.footer?.height || '60px' : spacing.slideMargin,
            height: '100%',
            boxSizing: 'border-box',
          }}
        >
          {children}
        </div>

        {/* Footer */}
        {showFooter && slideNumber && (
          <div
            className="absolute bottom-0 left-0 right-0 flex items-center justify-between"
            style={{
              height: '60px',
              padding: `0 ${spacing.slideMargin}`,
              borderTop: `1px solid ${variant === 'dark' ? 'rgba(255,255,255,0.1)' : colors.border.light}`,
            }}
          >
            <span style={{ fontSize: '12px', opacity: 0.6 }}>QUSD Pitch Deck 2025</span>
            <span style={{ fontSize: '12px', opacity: 0.6 }}>
              {slideNumber} / {totalSlides}
            </span>
          </div>
        )}
      </div>
    )
  }
)

Slide.displayName = 'Slide'

export default Slide
