import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import {
  // ScrollTrigger
  ScrollTriggerBasic,
  ScrollTriggerScrub,
  ScrollTriggerPin,
  ScrollTriggerHorizontal,
  ScrollTriggerParallax,
  // MotionPath
  MotionPathCircle,
  MotionPathBezier,
  MotionPathStagger,
  MotionPathOrbit,
  MotionPathNetwork,
  // Flip
  FlipGridToList,
  FlipCardExpand,
  FlipShuffle,
  FlipLogoMove,
  FlipFilter,
  // ScrollTo
  ScrollToSection,
  ScrollToPosition,
  ScrollToAutoplay,
  // DrawSVG (simulated)
  DrawSVGLogo,
  DrawSVGNetwork,
  DrawSVGProgress,
  DrawSVGSignature,
  DrawSVGCheckmark,
  DrawSVGBlockchain,
} from './plugins'
import { colors } from '../design-system/tokens'

// Wrapper to reset animation
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
        Reset Animation
      </button>
      <div key={key}>{children}</div>
    </div>
  )
}

// ============================================
// SCROLL TRIGGER
// ============================================

export default {
  title: 'GSAP/Plugins/ScrollTrigger',
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'light' },
  },
} satisfies Meta

type Story = StoryObj

export const Basic: Story = {
  name: 'Basic Scroll Trigger',
  render: () => (
    <AnimationWrapper>
      <ScrollTriggerBasic />
    </AnimationWrapper>
  ),
}

export const Scrub: Story = {
  name: 'Scrub (Scroll-Linked)',
  render: () => (
    <AnimationWrapper>
      <ScrollTriggerScrub />
    </AnimationWrapper>
  ),
}

export const Pin: Story = {
  name: 'Pin Element',
  render: () => (
    <AnimationWrapper>
      <ScrollTriggerPin />
    </AnimationWrapper>
  ),
}

export const Horizontal: Story = {
  name: 'Horizontal Scroll',
  render: () => (
    <AnimationWrapper>
      <ScrollTriggerHorizontal />
    </AnimationWrapper>
  ),
}

export const Parallax: Story = {
  name: 'Parallax Layers',
  render: () => (
    <AnimationWrapper>
      <ScrollTriggerParallax />
    </AnimationWrapper>
  ),
}
