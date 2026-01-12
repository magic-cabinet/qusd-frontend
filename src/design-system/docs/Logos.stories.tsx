import type { Meta, StoryObj } from '@storybook/react-vite'

const logos = {
  icons: [
    { name: 'Icon - Blue', file: '/logos/QUSD_ICON_025EC4.svg', bg: 'light' },
    { name: 'Icon - Cyan', file: '/logos/QUSD_ICON_0ECCED.svg', bg: 'light' },
    { name: 'Icon - Dark', file: '/logos/QUSD_ICON_030812.svg', bg: 'light' },
    { name: 'Icon - White', file: '/logos/QUSD_ICON_WHITE.svg', bg: 'dark' },
    { name: 'Icon - Cream', file: '/logos/QUSD_ICON_FFFAF1.svg', bg: 'dark' },
    { name: 'Icon - Black', file: '/logos/QUSD_ICON_BLACK.svg', bg: 'light' },
  ],
  horizontal: [
    { name: 'Horizontal - Blue', file: '/logos/QUSD_LOGO_025EC4.svg', bg: 'light' },
    { name: 'Horizontal - Cyan', file: '/logos/QUSD_LOGO_0ECCED.svg', bg: 'light' },
    { name: 'Horizontal - Dark', file: '/logos/QUSD_LOGO_030812.svg', bg: 'light' },
    { name: 'Horizontal - Cream', file: '/logos/QUSD_LOGO_FFFAF1.svg', bg: 'dark' },
  ],
  vertical: [
    { name: 'Vertical - Blue', file: '/logos/QUSD_LOGO_V_025EC4.svg', bg: 'light' },
    { name: 'Vertical - Cyan', file: '/logos/QUSD_LOGO_V_0ECCED.svg', bg: 'light' },
    { name: 'Vertical - Dark', file: '/logos/QUSD_LOGO_V_030812.svg', bg: 'light' },
    { name: 'Vertical - Cream', file: '/logos/QUSD_LOGO_V_FFFAF1.svg', bg: 'dark' },
  ],
  wordmarks: [
    { name: 'Wordmark - Blue', file: '/logos/WORDMARK_025EC4.svg', bg: 'light' },
    { name: 'Wordmark - Cyan', file: '/logos/WORDMARK_0ECCED.svg', bg: 'light' },
    { name: 'Wordmark - Dark', file: '/logos/WORDMARK_030812.svg', bg: 'light' },
    { name: 'Wordmark - Cream', file: '/logos/WORDMARK_FFFAF1.svg', bg: 'dark' },
  ],
  lockups: [
    { name: 'Lockup H - Blue', file: '/logos/QUSD_WORKMARK&ICON_HORIZONTAL_025EC4.svg', bg: 'light' },
    { name: 'Lockup H - Cyan', file: '/logos/QUSD_WORKMARK&ICON_HORIZONTAL_0ECCED.svg', bg: 'light' },
    { name: 'Lockup H - White', file: '/logos/QUSD_WORKMARK&ICON_HORIZONTAL_WHITE.svg', bg: 'dark' },
    { name: 'Lockup H - Black', file: '/logos/QUSD_WORKMARK&ICON_HORIZONTAL_BLACK.svg', bg: 'light' },
  ],
}

const LogoCard = ({ name, file, bg }: { name: string; file: string; bg: 'light' | 'dark' }) => (
  <div
    style={{
      padding: '24px',
      backgroundColor: bg === 'dark' ? '#030812' : '#ffffff',
      borderRadius: '16px',
      border: '1px solid #e5e5e5',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px',
    }}
  >
    <div style={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img src={file} alt={name} style={{ maxHeight: '60px', maxWidth: '100%' }} />
    </div>
    <span style={{ fontSize: '11px', color: '#737373', fontFamily: "'Space Mono', monospace" }}>{name}</span>
  </div>
)

const LogosPage = () => (
  <div style={{ padding: '32px', maxWidth: '1200px', fontFamily: "'DM Sans', sans-serif" }}>
    <h1 style={{ fontFamily: "'Space Mono', monospace", fontSize: '36px', fontWeight: 700, marginBottom: '8px' }}>
      Logo Assets
    </h1>
    <p style={{ color: '#737373', marginBottom: '48px' }}>
      Complete logo library from the QUSD brand kit
    </p>

    {/* Icons */}
    <section style={{ marginBottom: '48px' }}>
      <h2 style={{ fontFamily: "'Space Mono', monospace", fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>
        Icons
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px' }}>
        {logos.icons.map((logo) => (
          <LogoCard key={logo.file} {...logo} />
        ))}
      </div>
    </section>

    {/* Horizontal */}
    <section style={{ marginBottom: '48px' }}>
      <h2 style={{ fontFamily: "'Space Mono', monospace", fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>
        Horizontal (V2)
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {logos.horizontal.map((logo) => (
          <LogoCard key={logo.file} {...logo} />
        ))}
      </div>
    </section>

    {/* Vertical */}
    <section style={{ marginBottom: '48px' }}>
      <h2 style={{ fontFamily: "'Space Mono', monospace", fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>
        Vertical (V2)
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {logos.vertical.map((logo) => (
          <LogoCard key={logo.file} {...logo} />
        ))}
      </div>
    </section>

    {/* Wordmarks */}
    <section style={{ marginBottom: '48px' }}>
      <h2 style={{ fontFamily: "'Space Mono', monospace", fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>
        Wordmarks
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {logos.wordmarks.map((logo) => (
          <LogoCard key={logo.file} {...logo} />
        ))}
      </div>
    </section>

    {/* Lockups */}
    <section style={{ marginBottom: '48px' }}>
      <h2 style={{ fontFamily: "'Space Mono', monospace", fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>
        Lockups (Icon + Wordmark)
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {logos.lockups.map((logo) => (
          <LogoCard key={logo.file} {...logo} />
        ))}
      </div>
    </section>

    {/* Color Reference */}
    <section>
      <h2 style={{ fontFamily: "'Space Mono', monospace", fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>
        Color Reference
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
        {[
          { name: 'Cyan', hex: '#0ECCED' },
          { name: 'Blue', hex: '#025EC4' },
          { name: 'Dark Blue', hex: '#020764' },
          { name: 'Navy', hex: '#043780' },
          { name: 'Dark', hex: '#030812' },
        ].map((color) => (
          <div key={color.hex} style={{ textAlign: 'center' }}>
            <div style={{
              width: '100%',
              height: '60px',
              backgroundColor: color.hex,
              borderRadius: '12px',
              marginBottom: '8px',
            }} />
            <div style={{ fontSize: '12px', fontWeight: 600 }}>{color.name}</div>
            <div style={{ fontSize: '11px', color: '#737373', fontFamily: "'Space Mono', monospace" }}>{color.hex}</div>
          </div>
        ))}
      </div>
    </section>
  </div>
)

const meta = {
  title: 'Design System/Logos',
  component: LogosPage,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'light' },
  },
} satisfies Meta<typeof LogosPage>

export default meta
type Story = StoryObj<typeof meta>

export const AllLogos: Story = {}
