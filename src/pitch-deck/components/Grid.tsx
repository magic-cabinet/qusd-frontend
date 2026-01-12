import { forwardRef } from 'react'
import { components } from '../tokens'

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg'
}

const gapSizes = {
  sm: '16px',
  md: '24px',
  lg: '32px',
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ columns = 2, gap = 'md', children, className = '', style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={className}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: gapSizes[gap],
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Grid.displayName = 'Grid'

export default Grid
