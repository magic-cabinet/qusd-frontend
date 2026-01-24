import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import {
  BodyLineReveal,
  BodyFadeBlur,
  BodyWordStagger,
  BodySlideMask,
  BodyHighlightWave,
} from './animations'
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
      <div key={key}>{children}</div>
    </div>
  )
}

const meta = {
  title: 'GSAP/Body Text',
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

const sampleText = 'QUSD is a machine-native stablecoin designed from the ground up for the autonomous economy—enabling seamless, instant, and verifiable transactions between AI agents, robotics systems, and IoT devices.'

export const LineReveal: Story = {
  render: () => <BodyLineReveal text={sampleText} />,
}

export const FadeBlur: Story = {
  render: () => <BodyFadeBlur text={sampleText} />,
}

export const WordStagger: Story = {
  render: () => <BodyWordStagger text={sampleText} />,
}

export const SlideMask: Story = {
  render: () => <BodySlideMask text={sampleText} />,
}

export const HighlightWave: Story = {
  render: () => <BodyHighlightWave text={sampleText} />,
}

export const AllBodyVariants: Story = {
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
        <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
          <div>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', color: colors.gray[400], textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              01 — Line Reveal
            </span>
            <div style={{ marginTop: '12px' }}>
              <BodyLineReveal text={sampleText} />
            </div>
          </div>
          <div>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', color: colors.gray[400], textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              02 — Fade Blur
            </span>
            <div style={{ marginTop: '12px' }}>
              <BodyFadeBlur text={sampleText} />
            </div>
          </div>
          <div>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', color: colors.gray[400], textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              03 — Word Stagger
            </span>
            <div style={{ marginTop: '12px' }}>
              <BodyWordStagger text={sampleText} />
            </div>
          </div>
          <div>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', color: colors.gray[400], textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              04 — Slide Mask
            </span>
            <div style={{ marginTop: '12px' }}>
              <BodySlideMask text={sampleText} />
            </div>
          </div>
          <div>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', color: colors.gray[400], textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              05 — Highlight Wave
            </span>
            <div style={{ marginTop: '12px' }}>
              <BodyHighlightWave text={sampleText} />
            </div>
          </div>
        </div>
      </div>
    )
  },
  decorators: [],
}
