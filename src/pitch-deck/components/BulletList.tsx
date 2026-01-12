import { forwardRef } from 'react'
import { colors, typography } from '../tokens'

export interface BulletListProps extends React.HTMLAttributes<HTMLUListElement> {
  items: string[]
  variant?: 'default' | 'check' | 'arrow' | 'number'
  light?: boolean
}

const bulletIcons = {
  default: '•',
  check: '✓',
  arrow: '→',
  number: null, // Will use index
}

export const BulletList = forwardRef<HTMLUListElement, BulletListProps>(
  ({ items, variant = 'default', light = false, className = '', style, ...props }, ref) => {
    const textColor = light ? colors.text.light : colors.text.dark
    const bulletColor = light ? colors.accent.cyan : colors.primary.blue

    return (
      <ul
        ref={ref}
        className={className}
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          ...style,
        }}
        {...props}
      >
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-3"
            style={{
              fontFamily: typography.fontFamily.body,
              fontSize: '14px',
              lineHeight: typography.lineHeight.relaxed,
              color: textColor,
              marginBottom: '12px',
            }}
          >
            <span
              style={{
                color: bulletColor,
                fontWeight: typography.fontWeight.bold,
                flexShrink: 0,
                width: variant === 'number' ? '24px' : 'auto',
              }}
            >
              {variant === 'number' ? `${index + 1}.` : bulletIcons[variant]}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    )
  }
)

BulletList.displayName = 'BulletList'

export default BulletList
