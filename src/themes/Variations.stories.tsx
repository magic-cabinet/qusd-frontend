import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemePreview } from './ThemePreview'
import { technicalCyan, warmFinance, monochromeMinimal, type ThemeVariation } from './variations'

const ThemeCard = ({ theme, active }: { theme: ThemeVariation; active?: boolean }) => (
  <div
    style={{
      padding: '24px',
      backgroundColor: active ? theme.colors.background.main : '#f5f5f5',
      borderRadius: '16px',
      border: active ? `3px solid ${theme.colors.primary}` : '1px solid #e5e5e5',
    }}
  >
    {/* Color swatches */}
    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
      <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: theme.colors.gradient }} />
      <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: theme.colors.accent }} />
      <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: theme.colors.background.dark }} />
    </div>
    <h3 style={{ fontFamily: theme.typography.headingFont, fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
      {theme.name}
    </h3>
    <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.5 }}>{theme.description}</p>
  </div>
)

const ComparisonPage = () => (
  <div style={{ padding: '32px', maxWidth: '1200px', fontFamily: "'DM Sans', sans-serif" }}>
    <h1 style={{ fontFamily: "'Space Mono', monospace", fontSize: '36px', fontWeight: 700, marginBottom: '8px' }}>
      Theme Variations
    </h1>
    <p style={{ color: '#666', marginBottom: '32px' }}>
      Explore different visual directions for the QUSD brand
    </p>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '48px' }}>
      <ThemeCard theme={technicalCyan} active />
      <ThemeCard theme={warmFinance} />
      <ThemeCard theme={monochromeMinimal} />
    </div>

    <div style={{ backgroundColor: '#f5f5f5', padding: '24px', borderRadius: '16px' }}>
      <h2 style={{ fontFamily: "'Space Mono', monospace", fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>
        How to use these variations
      </h2>
      <ol style={{ fontSize: '14px', color: '#666', lineHeight: 1.8, paddingLeft: '20px' }}>
        <li>View each full theme preview in the sidebar under "Theme Variations"</li>
        <li>Compare how colors, typography, and spacing work together</li>
        <li>Consider which direction best fits QUSD's brand positioning</li>
        <li>Use this as a starting point for further refinement</li>
      </ol>
    </div>
  </div>
)

const meta = {
  title: 'Theme Variations',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'white' },
  },
} satisfies Meta

export default meta

export const Overview: StoryObj = {
  render: () => <ComparisonPage />,
}

export const TechnicalCyan: StoryObj = {
  name: '1. Technical Cyan (Current)',
  render: () => <ThemePreview theme={technicalCyan} />,
}

export const WarmFinance: StoryObj = {
  name: '2. Warm Finance',
  render: () => <ThemePreview theme={warmFinance} />,
}

export const MonochromeMinimal: StoryObj = {
  name: '3. Monochrome Minimal',
  render: () => <ThemePreview theme={monochromeMinimal} />,
}
