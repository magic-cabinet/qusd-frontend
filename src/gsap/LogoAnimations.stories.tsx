import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import {
  LogoSpinIn,
  LogoBounceIn,
  LogoPulseGlow,
  LogoFloat,
  LogoFlip3D,
  LogoWithTagline,
  LogoGridStagger,
  LogoParticleBurst,
} from './animations'
import { Logo } from './components'
import { colors } from '../design-system/tokens'

// Wrapper to reset animation on replay
function AnimationWrapper({ children }: { children: React.ReactNode }) {
  const [key, setKey] = useState(0)

  return (
    <div>
      <button
        onClick={() => setKey(k => k + 1)}
        style={{
          marginBottom: '24px',
          padding: '8px 16px',
          background: colors.ink,
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontFamily: "'Space Mono', monospace",
          fontSize: '12px',
          cursor: 'pointer',
        }}
      >
        Replay Animation
      </button>
      <div key={key} style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
        {children}
      </div>
    </div>
  )
}

const meta = {
  title: 'GSAP/Logo',
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'light' },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <AnimationWrapper>
        <Story />
      </AnimationWrapper>
    ),
  ],
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const SpinIn: Story = {
  name: 'Spin In',
  render: () => <LogoSpinIn size={120} />,
}

export const BounceIn: Story = {
  name: 'Bounce In',
  render: () => <LogoBounceIn size={120} />,
}

export const PulseGlow: Story = {
  name: 'Pulse Glow',
  render: () => <LogoPulseGlow size={120} />,
}

export const Float: Story = {
  name: 'Float',
  render: () => <LogoFloat size={120} />,
}

export const Flip3D: Story = {
  name: '3D Flip',
  render: () => <LogoFlip3D size={120} />,
}

export const WithTagline: Story = {
  name: 'With Tagline',
  render: () => <LogoWithTagline variant="horizontal" color="dark" size={250} />,
}

export const GridStagger: Story = {
  name: 'Grid Stagger',
  render: () => <LogoGridStagger />,
}

export const ParticleBurst: Story = {
  name: 'Particle Burst',
  render: () => <LogoParticleBurst size={100} />,
}

export const AllLogoAnimations: Story = {
  name: 'All Logo Animations',
  render: () => {
    const [key, setKey] = useState(0)
    return (
      <div>
        <button
          onClick={() => setKey(k => k + 1)}
          style={{
            marginBottom: '32px',
            padding: '8px 16px',
            background: colors.ink,
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontFamily: "'Space Mono', monospace",
            fontSize: '12px',
            cursor: 'pointer',
          }}
        >
          Replay All
        </button>
        <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
          <div>
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px',
              color: colors.gray[400],
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              display: 'block',
              marginBottom: '24px',
            }}>
              01 — Spin In
            </span>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <LogoSpinIn size={100} />
            </div>
          </div>
          <div>
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px',
              color: colors.gray[400],
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              display: 'block',
              marginBottom: '24px',
            }}>
              02 — Bounce In
            </span>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <LogoBounceIn size={100} />
            </div>
          </div>
          <div>
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px',
              color: colors.gray[400],
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              display: 'block',
              marginBottom: '24px',
            }}>
              03 — Pulse Glow
            </span>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <LogoPulseGlow size={100} />
            </div>
          </div>
          <div>
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px',
              color: colors.gray[400],
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              display: 'block',
              marginBottom: '24px',
            }}>
              04 — Float
            </span>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <LogoFloat size={100} />
            </div>
          </div>
          <div>
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px',
              color: colors.gray[400],
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              display: 'block',
              marginBottom: '24px',
            }}>
              05 — 3D Flip
            </span>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <LogoFlip3D size={100} />
            </div>
          </div>
          <div>
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px',
              color: colors.gray[400],
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              display: 'block',
              marginBottom: '24px',
            }}>
              06 — With Tagline
            </span>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <LogoWithTagline variant="horizontal" color="dark" size={220} />
            </div>
          </div>
          <div>
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px',
              color: colors.gray[400],
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              display: 'block',
              marginBottom: '24px',
            }}>
              07 — Grid Stagger
            </span>
            <LogoGridStagger />
          </div>
          <div>
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px',
              color: colors.gray[400],
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              display: 'block',
              marginBottom: '24px',
            }}>
              08 — Particle Burst
            </span>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <LogoParticleBurst size={80} />
            </div>
          </div>
        </div>
      </div>
    )
  },
  decorators: [],
}

// Static logo showcase (no animation)
export const LogoVariants: Story = {
  name: 'Logo Component (Static)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
      <div>
        <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: '14px', marginBottom: '16px' }}>Icons</h3>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{ padding: '24px', background: colors.paper, borderRadius: '12px', border: `1px solid ${colors.gray[200]}` }}>
            <Logo variant="icon" color="cyan" size={60} />
          </div>
          <div style={{ padding: '24px', background: colors.paper, borderRadius: '12px', border: `1px solid ${colors.gray[200]}` }}>
            <Logo variant="icon" color="blue" size={60} />
          </div>
          <div style={{ padding: '24px', background: colors.paper, borderRadius: '12px', border: `1px solid ${colors.gray[200]}` }}>
            <Logo variant="icon" color="dark" size={60} />
          </div>
          <div style={{ padding: '24px', background: colors.ink, borderRadius: '12px' }}>
            <Logo variant="icon" color="white" size={60} />
          </div>
        </div>
      </div>
      <div>
        <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: '14px', marginBottom: '16px' }}>Horizontal</h3>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{ padding: '24px', background: colors.paper, borderRadius: '12px', border: `1px solid ${colors.gray[200]}` }}>
            <Logo variant="horizontal" color="cyan" size={150} />
          </div>
          <div style={{ padding: '24px', background: colors.paper, borderRadius: '12px', border: `1px solid ${colors.gray[200]}` }}>
            <Logo variant="horizontal" color="dark" size={150} />
          </div>
        </div>
      </div>
      <div>
        <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: '14px', marginBottom: '16px' }}>Vertical</h3>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{ padding: '24px', background: colors.paper, borderRadius: '12px', border: `1px solid ${colors.gray[200]}` }}>
            <Logo variant="vertical" color="cyan" size={100} />
          </div>
          <div style={{ padding: '24px', background: colors.paper, borderRadius: '12px', border: `1px solid ${colors.gray[200]}` }}>
            <Logo variant="vertical" color="dark" size={100} />
          </div>
        </div>
      </div>
    </div>
  ),
  decorators: [],
}
