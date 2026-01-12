import { forwardRef } from 'react'
import { colors, typography, borders, components } from '../tokens'

export interface TimelineItem {
  year?: string
  label: string
  description?: string
  active?: boolean
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TimelineItem[]
  direction?: 'horizontal' | 'vertical'
  light?: boolean
}

export const Timeline = forwardRef<HTMLDivElement, TimelineProps>(
  ({ items, direction = 'horizontal', light = false, className = '', style, ...props }, ref) => {
    const textColor = light ? colors.text.light : colors.text.dark
    const mutedColor = light ? 'rgba(255,255,255,0.6)' : colors.text.muted

    if (direction === 'horizontal') {
      return (
        <div
          ref={ref}
          className={`flex items-start ${className}`}
          style={{ gap: '8px', ...style }}
          {...props}
        >
          {items.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              {/* Dot and line */}
              <div className="flex items-center w-full">
                {index > 0 && (
                  <div
                    style={{
                      flex: 1,
                      height: components.timeline.lineWidth,
                      backgroundColor: colors.primary.blue,
                    }}
                  />
                )}
                <div
                  style={{
                    width: components.timeline.dotSize,
                    height: components.timeline.dotSize,
                    borderRadius: '50%',
                    backgroundColor: item.active ? colors.primary.blue : colors.border.light,
                    border: item.active ? 'none' : `2px solid ${colors.primary.blue}`,
                    flexShrink: 0,
                  }}
                />
                {index < items.length - 1 && (
                  <div
                    style={{
                      flex: 1,
                      height: components.timeline.lineWidth,
                      backgroundColor: colors.primary.blue,
                    }}
                  />
                )}
              </div>

              {/* Content */}
              <div className="text-center mt-3">
                {item.year && (
                  <div
                    style={{
                      fontFamily: typography.fontFamily.mono,
                      fontSize: '12px',
                      fontWeight: typography.fontWeight.bold,
                      color: colors.primary.blue,
                      marginBottom: '4px',
                    }}
                  >
                    {item.year}
                  </div>
                )}
                <div
                  style={{
                    fontFamily: typography.fontFamily.body,
                    fontSize: '14px',
                    fontWeight: typography.fontWeight.semibold,
                    color: textColor,
                  }}
                >
                  {item.label}
                </div>
                {item.description && (
                  <div
                    style={{
                      fontFamily: typography.fontFamily.body,
                      fontSize: '12px',
                      color: mutedColor,
                      marginTop: '4px',
                    }}
                  >
                    {item.description}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )
    }

    // Vertical timeline
    return (
      <div
        ref={ref}
        className={`flex flex-col ${className}`}
        style={{ gap: '0', ...style }}
        {...props}
      >
        {items.map((item, index) => (
          <div key={index} className="flex gap-4">
            {/* Dot and line */}
            <div className="flex flex-col items-center">
              <div
                style={{
                  width: components.timeline.dotSize,
                  height: components.timeline.dotSize,
                  borderRadius: '50%',
                  backgroundColor: item.active ? colors.primary.blue : colors.border.light,
                  border: item.active ? 'none' : `2px solid ${colors.primary.blue}`,
                  flexShrink: 0,
                }}
              />
              {index < items.length - 1 && (
                <div
                  style={{
                    width: components.timeline.lineWidth,
                    flex: 1,
                    minHeight: '40px',
                    backgroundColor: colors.primary.blue,
                  }}
                />
              )}
            </div>

            {/* Content */}
            <div style={{ paddingBottom: '24px' }}>
              {item.year && (
                <div
                  style={{
                    fontFamily: typography.fontFamily.mono,
                    fontSize: '12px',
                    fontWeight: typography.fontWeight.bold,
                    color: colors.primary.blue,
                    marginBottom: '4px',
                  }}
                >
                  {item.year}
                </div>
              )}
              <div
                style={{
                  fontFamily: typography.fontFamily.body,
                  fontSize: '16px',
                  fontWeight: typography.fontWeight.semibold,
                  color: textColor,
                }}
              >
                {item.label}
              </div>
              {item.description && (
                <div
                  style={{
                    fontFamily: typography.fontFamily.body,
                    fontSize: '14px',
                    color: mutedColor,
                    marginTop: '4px',
                  }}
                >
                  {item.description}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }
)

Timeline.displayName = 'Timeline'

export default Timeline
