import { forwardRef } from 'react'

export type LogoVariant = 'icon' | 'horizontal' | 'vertical' | 'wordmark' | 'lockup'
export type LogoColor = 'cyan' | 'blue' | 'dark' | 'white' | 'cream' | 'black'

const logoFiles: Record<LogoVariant, Partial<Record<LogoColor, string>>> = {
  icon: {
    cyan: '/logos/QUSD_ICON_0ECCED.svg',
    blue: '/logos/QUSD_ICON_025EC4.svg',
    dark: '/logos/QUSD_ICON_030812.svg',
    white: '/logos/QUSD_ICON_WHITE.svg',
    cream: '/logos/QUSD_ICON_FFFAF1.svg',
    black: '/logos/QUSD_ICON_BLACK.svg',
  },
  horizontal: {
    cyan: '/logos/QUSD_LOGO_0ECCED.svg',
    blue: '/logos/QUSD_LOGO_025EC4.svg',
    dark: '/logos/QUSD_LOGO_030812.svg',
    cream: '/logos/QUSD_LOGO_FFFAF1.svg',
  },
  vertical: {
    cyan: '/logos/QUSD_LOGO_V_0ECCED.svg',
    blue: '/logos/QUSD_LOGO_V_025EC4.svg',
    dark: '/logos/QUSD_LOGO_V_030812.svg',
    cream: '/logos/QUSD_LOGO_V_FFFAF1.svg',
  },
  wordmark: {
    cyan: '/logos/WORDMARK_0ECCED.svg',
    blue: '/logos/WORDMARK_025EC4.svg',
    dark: '/logos/WORDMARK_030812.svg',
    cream: '/logos/WORDMARK_FFFAF1.svg',
  },
  lockup: {
    cyan: '/logos/QUSD_WORKMARK&ICON_HORIZONTAL_0ECCED.svg',
    blue: '/logos/QUSD_WORKMARK&ICON_HORIZONTAL_025EC4.svg',
    white: '/logos/QUSD_WORKMARK&ICON_HORIZONTAL_WHITE.svg',
    black: '/logos/QUSD_WORKMARK&ICON_HORIZONTAL_BLACK.svg',
  },
}

export interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  variant?: LogoVariant
  color?: LogoColor
  size?: number | string
}

export const Logo = forwardRef<HTMLImageElement, LogoProps>(
  ({ variant = 'icon', color = 'cyan', size = 80, style, ...props }, ref) => {
    const file = logoFiles[variant][color] || logoFiles[variant].cyan || logoFiles.icon.cyan

    return (
      <img
        ref={ref}
        src={file}
        alt={`QUSD ${variant} logo`}
        style={{
          width: typeof size === 'number' ? `${size}px` : size,
          height: 'auto',
          ...style,
        }}
        {...props}
      />
    )
  }
)

Logo.displayName = 'Logo'

export default Logo
