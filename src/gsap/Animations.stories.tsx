import type { Meta, StoryObj } from '@storybook/react-vite'
import { useEffect, useState } from 'react'
import {
  HeaderFadeUpStagger,
  HeaderSlideScale,
  HeaderTypewriter,
  HeaderSplitRotate,
  HeaderGradientReveal,
  BodyLineReveal,
  BodyFadeBlur,
  BodyWordStagger,
  BodySlideMask,
  BodyHighlightWave,
  HeroEntrance,
  HorizontalSlide,
  StackedCards,
  SplitReveal,
  TimelineSequence,
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

// ============================================
// HEADER ANIMATIONS
// ============================================

const headerMeta = {
  title: 'GSAP/Headers',
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

export default headerMeta

type HeaderStory = StoryObj<typeof headerMeta>

export const FadeUpStagger: HeaderStory = {
  render: () => <HeaderFadeUpStagger text="Machine Economy" />,
}

export const SlideScale: HeaderStory = {
  render: () => <HeaderSlideScale text="Agent-First Design" />,
}

export const Typewriter: HeaderStory = {
  render: () => <HeaderTypewriter text="Autonomous Systems" />,
}

export const SplitRotate: HeaderStory = {
  render: () => <HeaderSplitRotate text="QUSD Protocol" />,
}

export const GradientReveal: HeaderStory = {
  render: () => <HeaderGradientReveal text="Open Source" />,
}

export const AllHeaders: HeaderStory = {
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
              01 — Fade Up Stagger
            </span>
            <div style={{ marginTop: '12px' }}>
              <HeaderFadeUpStagger text="Machine Economy" />
            </div>
          </div>
          <div>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', color: colors.gray[400], textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              02 — Slide Scale
            </span>
            <div style={{ marginTop: '12px' }}>
              <HeaderSlideScale text="Agent-First Design" />
            </div>
          </div>
          <div>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', color: colors.gray[400], textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              03 — Typewriter
            </span>
            <div style={{ marginTop: '12px' }}>
              <HeaderTypewriter text="Autonomous Systems" />
            </div>
          </div>
          <div>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', color: colors.gray[400], textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              04 — Split Rotate
            </span>
            <div style={{ marginTop: '12px' }}>
              <HeaderSplitRotate text="QUSD Protocol" />
            </div>
          </div>
          <div>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', color: colors.gray[400], textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              05 — Gradient Reveal
            </span>
            <div style={{ marginTop: '12px' }}>
              <HeaderGradientReveal text="Open Source" />
            </div>
          </div>
        </div>
      </div>
    )
  },
  decorators: [], // Remove default decorator for this one
}
