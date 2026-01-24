import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import {
  HeroEntrance,
  HorizontalSlide,
  StackedCards,
  SplitReveal,
  TimelineSequence,
  HeroWithLogo,
  BrandShowcase,
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
  title: 'GSAP/Compositions',
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'white' },
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

export const Hero: Story = {
  name: 'Hero Entrance (Vertical)',
  render: () => <HeroEntrance />,
}

export const Horizontal: Story = {
  name: 'Horizontal Slide',
  render: () => <HorizontalSlide />,
}

export const Cards: Story = {
  name: 'Stacked Cards (Dark)',
  render: () => <StackedCards />,
}

export const Split: Story = {
  name: 'Split Reveal',
  render: () => <SplitReveal />,
}

export const Timeline: Story = {
  name: 'Timeline Sequence',
  render: () => <TimelineSequence />,
}

export const HeroLogo: Story = {
  name: 'Hero with Logo (Dark)',
  render: () => <HeroWithLogo />,
}

export const Brand: Story = {
  name: 'Brand Showcase',
  render: () => <BrandShowcase />,
}

export const AllCompositions: Story = {
  name: 'All Compositions',
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
        <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          <div>
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px',
              color: colors.gray[400],
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              display: 'block',
              marginBottom: '16px',
            }}>
              01 — Hero Entrance (Vertical Cascade)
            </span>
            <HeroEntrance />
          </div>
          <div>
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px',
              color: colors.gray[400],
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              display: 'block',
              marginBottom: '16px',
            }}>
              02 — Horizontal Slide
            </span>
            <HorizontalSlide />
          </div>
          <div>
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px',
              color: colors.gray[400],
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              display: 'block',
              marginBottom: '16px',
            }}>
              03 — Stacked Cards (Dark Theme)
            </span>
            <StackedCards />
          </div>
          <div>
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px',
              color: colors.gray[400],
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              display: 'block',
              marginBottom: '16px',
            }}>
              04 — Split Reveal
            </span>
            <SplitReveal />
          </div>
          <div>
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px',
              color: colors.gray[400],
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              display: 'block',
              marginBottom: '16px',
            }}>
              05 — Timeline Sequence
            </span>
            <TimelineSequence />
          </div>
          <div>
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px',
              color: colors.gray[400],
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              display: 'block',
              marginBottom: '16px',
            }}>
              06 — Hero with Logo (Dark)
            </span>
            <HeroWithLogo />
          </div>
          <div>
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px',
              color: colors.gray[400],
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              display: 'block',
              marginBottom: '16px',
            }}>
              07 — Brand Showcase
            </span>
            <BrandShowcase />
          </div>
        </div>
      </div>
    )
  },
  decorators: [],
}
