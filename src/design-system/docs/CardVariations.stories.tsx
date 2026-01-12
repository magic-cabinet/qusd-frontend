import type { Meta, StoryObj } from '@storybook/react-vite'

// Official brand colors from the style guide
const brand = {
  colors: {
    dark: '#030812',
    navy: '#020764',
    cyan: '#0ECCED',
    blue: '#043780',
    royalBlue: '#025EC4',
    white: '#FFFFFF',
    cream: '#FFFAF1',
  },
  fonts: {
    heading: "'Orbitron', sans-serif",
    body: "'Roboto', sans-serif",
  },
}

// Card Variation 1: Clean Minimal
const CardMinimal = ({ title, description, code }: { title: string; description: string; code: string }) => (
  <div style={{
    padding: '32px',
    backgroundColor: brand.colors.white,
    borderRadius: '24px',
    border: `1px solid #e5e5e5`,
    maxWidth: '320px',
  }}>
    <div style={{
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      border: '1px solid #e5e5e5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: brand.fonts.heading,
      fontSize: '12px',
      color: '#737373',
      marginBottom: '20px',
    }}>
      {code}
    </div>
    <h3 style={{
      fontFamily: brand.fonts.heading,
      fontSize: '18px',
      fontWeight: 700,
      color: brand.colors.dark,
      marginBottom: '12px',
    }}>
      {title}
    </h3>
    <p style={{
      fontFamily: brand.fonts.body,
      fontSize: '14px',
      lineHeight: 1.6,
      color: '#737373',
      margin: 0,
    }}>
      {description}
    </p>
  </div>
)

// Card Variation 2: Gradient Border
const CardGradientBorder = ({ title, description, code }: { title: string; description: string; code: string }) => (
  <div style={{
    padding: '2px',
    background: `linear-gradient(135deg, ${brand.colors.cyan}, ${brand.colors.royalBlue})`,
    borderRadius: '24px',
    maxWidth: '320px',
  }}>
    <div style={{
      padding: '30px',
      backgroundColor: brand.colors.white,
      borderRadius: '22px',
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        background: `linear-gradient(135deg, ${brand.colors.cyan}, ${brand.colors.royalBlue})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: brand.fonts.heading,
        fontSize: '12px',
        color: brand.colors.white,
        marginBottom: '20px',
      }}>
        {code}
      </div>
      <h3 style={{
        fontFamily: brand.fonts.heading,
        fontSize: '18px',
        fontWeight: 700,
        color: brand.colors.dark,
        marginBottom: '12px',
      }}>
        {title}
      </h3>
      <p style={{
        fontFamily: brand.fonts.body,
        fontSize: '14px',
        lineHeight: 1.6,
        color: '#737373',
        margin: 0,
      }}>
        {description}
      </p>
    </div>
  </div>
)

// Card Variation 3: Dark Mode
const CardDark = ({ title, description, code }: { title: string; description: string; code: string }) => (
  <div style={{
    padding: '32px',
    backgroundColor: brand.colors.dark,
    borderRadius: '24px',
    border: '1px solid #1a1a2e',
    maxWidth: '320px',
  }}>
    <div style={{
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      background: `linear-gradient(135deg, ${brand.colors.cyan}, ${brand.colors.royalBlue})`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: brand.fonts.heading,
      fontSize: '12px',
      color: brand.colors.white,
      marginBottom: '20px',
    }}>
      {code}
    </div>
    <h3 style={{
      fontFamily: brand.fonts.heading,
      fontSize: '18px',
      fontWeight: 700,
      color: brand.colors.white,
      marginBottom: '12px',
    }}>
      {title}
    </h3>
    <p style={{
      fontFamily: brand.fonts.body,
      fontSize: '14px',
      lineHeight: 1.6,
      color: 'rgba(255,255,255,0.6)',
      margin: 0,
    }}>
      {description}
    </p>
  </div>
)

// Card Variation 4: Full Gradient
const CardFullGradient = ({ title, description, code }: { title: string; description: string; code: string }) => (
  <div style={{
    padding: '32px',
    background: `linear-gradient(135deg, ${brand.colors.cyan}, ${brand.colors.royalBlue})`,
    borderRadius: '24px',
    maxWidth: '320px',
  }}>
    <div style={{
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      backgroundColor: 'rgba(255,255,255,0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: brand.fonts.heading,
      fontSize: '12px',
      color: brand.colors.white,
      marginBottom: '20px',
    }}>
      {code}
    </div>
    <h3 style={{
      fontFamily: brand.fonts.heading,
      fontSize: '18px',
      fontWeight: 700,
      color: brand.colors.white,
      marginBottom: '12px',
    }}>
      {title}
    </h3>
    <p style={{
      fontFamily: brand.fonts.body,
      fontSize: '14px',
      lineHeight: 1.6,
      color: 'rgba(255,255,255,0.85)',
      margin: 0,
    }}>
      {description}
    </p>
  </div>
)

// Card Variation 5: Navy with Cyan Accent
const CardNavy = ({ title, description, code }: { title: string; description: string; code: string }) => (
  <div style={{
    padding: '32px',
    backgroundColor: brand.colors.navy,
    borderRadius: '24px',
    borderLeft: `4px solid ${brand.colors.cyan}`,
    maxWidth: '320px',
  }}>
    <div style={{
      fontFamily: brand.fonts.heading,
      fontSize: '11px',
      color: brand.colors.cyan,
      marginBottom: '16px',
      letterSpacing: '0.1em',
    }}>
      {code}
    </div>
    <h3 style={{
      fontFamily: brand.fonts.heading,
      fontSize: '18px',
      fontWeight: 700,
      color: brand.colors.white,
      marginBottom: '12px',
    }}>
      {title}
    </h3>
    <p style={{
      fontFamily: brand.fonts.body,
      fontSize: '14px',
      lineHeight: 1.6,
      color: 'rgba(255,255,255,0.6)',
      margin: 0,
    }}>
      {description}
    </p>
  </div>
)

// Card Variation 6: Glass Effect
const CardGlass = ({ title, description, code }: { title: string; description: string; code: string }) => (
  <div style={{
    padding: '32px',
    background: 'rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    border: '1px solid rgba(255,255,255,0.2)',
    maxWidth: '320px',
  }}>
    <div style={{
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      border: `2px solid ${brand.colors.cyan}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: brand.fonts.heading,
      fontSize: '12px',
      color: brand.colors.cyan,
      marginBottom: '20px',
    }}>
      {code}
    </div>
    <h3 style={{
      fontFamily: brand.fonts.heading,
      fontSize: '18px',
      fontWeight: 700,
      color: brand.colors.white,
      marginBottom: '12px',
    }}>
      {title}
    </h3>
    <p style={{
      fontFamily: brand.fonts.body,
      fontSize: '14px',
      lineHeight: 1.6,
      color: 'rgba(255,255,255,0.7)',
      margin: 0,
    }}>
      {description}
    </p>
  </div>
)

const sampleData = {
  title: 'Gasless Transactions',
  description: 'Users pay with QUSD, facilitators cover gas fees. Zero friction through EIP-2612.',
  code: 'F01',
}

const CardVariationsPage = () => (
  <div style={{ padding: '32px', fontFamily: brand.fonts.body }}>
    {/* Load Orbitron font */}
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />

    <h1 style={{ fontFamily: brand.fonts.heading, fontSize: '36px', fontWeight: 700, marginBottom: '8px', color: brand.colors.dark }}>
      Card Variations
    </h1>
    <p style={{ color: '#737373', marginBottom: '48px' }}>
      Different card styles using the official QUSD brand (Orbitron + Roboto)
    </p>

    {/* Light Background Cards */}
    <section style={{ marginBottom: '64px' }}>
      <h2 style={{ fontFamily: brand.fonts.heading, fontSize: '18px', marginBottom: '24px', color: brand.colors.dark }}>
        Light Background
      </h2>
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        <div>
          <CardMinimal {...sampleData} />
          <div style={{ fontSize: '12px', color: '#737373', marginTop: '12px', textAlign: 'center' }}>Minimal</div>
        </div>
        <div>
          <CardGradientBorder {...sampleData} />
          <div style={{ fontSize: '12px', color: '#737373', marginTop: '12px', textAlign: 'center' }}>Gradient Border</div>
        </div>
      </div>
    </section>

    {/* Dark Background Cards */}
    <section style={{ padding: '48px', backgroundColor: brand.colors.dark, borderRadius: '24px', marginBottom: '64px' }}>
      <h2 style={{ fontFamily: brand.fonts.heading, fontSize: '18px', marginBottom: '24px', color: brand.colors.white }}>
        Dark Background
      </h2>
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        <div>
          <CardDark {...sampleData} />
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '12px', textAlign: 'center' }}>Dark</div>
        </div>
        <div>
          <CardFullGradient {...sampleData} />
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '12px', textAlign: 'center' }}>Full Gradient</div>
        </div>
        <div>
          <CardNavy {...sampleData} />
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '12px', textAlign: 'center' }}>Navy + Accent</div>
        </div>
        <div>
          <CardGlass {...sampleData} />
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '12px', textAlign: 'center' }}>Glass</div>
        </div>
      </div>
    </section>

    {/* Grid Layout Example */}
    <section>
      <h2 style={{ fontFamily: brand.fonts.heading, fontSize: '18px', marginBottom: '24px', color: brand.colors.dark }}>
        Grid Layout (4 Features)
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        <CardMinimal title="Gasless" description="Zero gas fees for users" code="01" />
        <CardMinimal title="Agent-Native" description="Built for AI systems" code="02" />
        <CardMinimal title="Programmable" description="Policy engine built-in" code="03" />
        <CardMinimal title="Multi-Chain" description="4+ chains supported" code="04" />
      </div>
    </section>
  </div>
)

const meta = {
  title: 'Design System/Card Variations',
  component: CardVariationsPage,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'light' },
  },
} satisfies Meta<typeof CardVariationsPage>

export default meta
type Story = StoryObj<typeof meta>

export const AllVariations: Story = {}
