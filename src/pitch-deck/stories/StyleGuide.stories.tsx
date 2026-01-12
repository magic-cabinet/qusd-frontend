import type { Meta, StoryObj } from '@storybook/react-vite'
import { colors, typography, borders } from '../tokens'

const ColorSwatch = ({ name, value }: { name: string; value: string }) => (
  <div className="flex items-center gap-3">
    <div
      style={{
        width: '48px',
        height: '48px',
        backgroundColor: value,
        borderRadius: '8px',
        border: value === '#FFFFFF' ? '1px solid #E0E0E0' : 'none',
      }}
    />
    <div>
      <div style={{ fontFamily: typography.fontFamily.body, fontWeight: 600, fontSize: '14px' }}>
        {name}
      </div>
      <div style={{ fontFamily: typography.fontFamily.mono, fontSize: '12px', color: '#666' }}>
        {value}
      </div>
    </div>
  </div>
)

const StyleGuidePage = () => (
  <div style={{ padding: '32px', maxWidth: '1200px', fontFamily: typography.fontFamily.body }}>
    <h1 style={{ fontFamily: typography.fontFamily.title, fontSize: '48px', marginBottom: '8px' }}>
      Pitch Deck Style Guide
    </h1>
    <p style={{ color: '#666', marginBottom: '48px' }}>
      Complete visual reference for QUSD presentation materials
    </p>

    {/* Colors */}
    <section style={{ marginBottom: '48px' }}>
      <h2 style={{ fontFamily: typography.fontFamily.title, fontSize: '28px', marginBottom: '24px' }}>
        Color Palette
      </h2>

      <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: '#666' }}>Primary</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        <ColorSwatch name="Primary Blue" value={colors.primary.blue} />
        <ColorSwatch name="Dark Blue" value={colors.primary.darkBlue} />
        <ColorSwatch name="White" value={colors.primary.white} />
        <ColorSwatch name="Light Gray" value={colors.primary.lightGray} />
      </div>

      <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: '#666' }}>Accent</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <ColorSwatch name="Orange" value={colors.accent.orange} />
        <ColorSwatch name="Gold" value={colors.accent.gold} />
        <ColorSwatch name="Cyan" value={colors.accent.cyan} />
      </div>
    </section>

    {/* Typography */}
    <section style={{ marginBottom: '48px' }}>
      <h2 style={{ fontFamily: typography.fontFamily.title, fontSize: '28px', marginBottom: '24px' }}>
        Typography
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
        <div style={{ padding: '24px', backgroundColor: '#F5F5F5', borderRadius: '16px' }}>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Title Font
          </div>
          <div style={{ fontFamily: typography.fontFamily.title, fontSize: '32px', fontWeight: 700 }}>
            Playfair Display
          </div>
          <div style={{ fontFamily: typography.fontFamily.title, fontSize: '24px', marginTop: '8px' }}>
            The Financial Operating System
          </div>
        </div>

        <div style={{ padding: '24px', backgroundColor: '#F5F5F5', borderRadius: '16px' }}>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Body Font
          </div>
          <div style={{ fontFamily: typography.fontFamily.body, fontSize: '32px', fontWeight: 700 }}>
            Lato / Manrope
          </div>
          <div style={{ fontFamily: typography.fontFamily.body, fontSize: '16px', marginTop: '8px', lineHeight: 1.6 }}>
            Clean, professional sans-serif for body text and UI elements.
          </div>
        </div>
      </div>

      <div style={{ marginTop: '32px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: '#666' }}>Type Scale</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontFamily: typography.fontFamily.title, fontSize: '48px', fontWeight: 700 }}>Hero Title — 72pt</div>
          <div style={{ fontFamily: typography.fontFamily.title, fontSize: '36px', fontWeight: 700 }}>Section Title — 44pt</div>
          <div style={{ fontFamily: typography.fontFamily.title, fontSize: '28px', fontWeight: 700 }}>Subtitle — 36pt</div>
          <div style={{ fontFamily: typography.fontFamily.body, fontSize: '18px' }}>Body Large — 18pt</div>
          <div style={{ fontFamily: typography.fontFamily.body, fontSize: '14px' }}>Body — 14pt</div>
          <div style={{ fontFamily: typography.fontFamily.body, fontSize: '12px', color: '#666' }}>Label — 12pt</div>
        </div>
      </div>
    </section>

    {/* Shapes */}
    <section style={{ marginBottom: '48px' }}>
      <h2 style={{ fontFamily: typography.fontFamily.title, fontSize: '28px', marginBottom: '24px' }}>
        Shapes & Borders
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '100%', height: '80px', backgroundColor: colors.primary.blue, borderRadius: borders.radius.lg, marginBottom: '8px' }} />
          <div style={{ fontSize: '12px', color: '#666' }}>Card (24px radius)</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '100%', height: '40px', backgroundColor: colors.primary.blue, borderRadius: borders.radius.pill, marginBottom: '8px' }} />
          <div style={{ fontSize: '12px', color: '#666' }}>Badge (pill)</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', backgroundColor: colors.primary.blue, borderRadius: '50%', margin: '0 auto 8px' }} />
          <div style={{ fontSize: '12px', color: '#666' }}>Circle (timeline)</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '100%', height: '4px', backgroundColor: colors.primary.blue, marginTop: '38px', marginBottom: '8px' }} />
          <div style={{ fontSize: '12px', color: '#666' }}>Line (4px)</div>
        </div>
      </div>
    </section>

    {/* Decorative */}
    <section>
      <h2 style={{ fontFamily: typography.fontFamily.title, fontSize: '28px', marginBottom: '24px' }}>
        Decorative Elements
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div style={{ padding: '32px', backgroundColor: colors.primary.darkBlue, borderRadius: '16px', position: 'relative', overflow: 'hidden' }}>
          {/* Dot pattern */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(${colors.accent.gold} 2px, transparent 2px)`,
            backgroundSize: '24px 24px',
            opacity: 0.3,
          }} />
          <div style={{ position: 'relative', color: 'white', fontFamily: typography.fontFamily.body }}>
            <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Dot Pattern</div>
            <div style={{ fontSize: '12px', opacity: 0.7 }}>Gold dots on dark background for emphasis</div>
          </div>
        </div>

        <div style={{ padding: '32px', backgroundColor: '#F5F5F5', borderRadius: '16px', position: 'relative' }}>
          {/* Network pattern hint */}
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '60px',
            height: '60px',
            border: `2px solid ${colors.primary.blue}`,
            borderRadius: '50%',
            opacity: 0.2,
          }} />
          <div style={{ position: 'relative', fontFamily: typography.fontFamily.body }}>
            <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Network Graphics</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Connected nodes for tech/AI themes</div>
          </div>
        </div>
      </div>
    </section>
  </div>
)

const meta = {
  title: 'Pitch Deck/Style Guide',
  component: StyleGuidePage,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'white' },
  },
} satisfies Meta<typeof StyleGuidePage>

export default meta
type Story = StoryObj<typeof meta>

export const Complete: Story = {}
