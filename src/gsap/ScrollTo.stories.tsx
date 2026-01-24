import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import {
  ScrollToSection,
  ScrollToPosition,
  ScrollToAutoplay,
} from './plugins'
import { colors } from '../design-system/tokens'

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
        Reset
      </button>
      <div key={key}>{children}</div>
    </div>
  )
}

export default {
  title: 'GSAP/Plugins/ScrollTo',
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'light' },
  },
} satisfies Meta

type Story = StoryObj

export const Section: Story = {
  name: 'Scroll to Section',
  render: () => (
    <AnimationWrapper>
      <ScrollToSection />
    </AnimationWrapper>
  ),
}

export const Position: Story = {
  name: 'Scroll to Position',
  render: () => (
    <AnimationWrapper>
      <ScrollToPosition />
    </AnimationWrapper>
  ),
}

export const Autoplay: Story = {
  name: 'Auto-Scroll Tour',
  render: () => (
    <AnimationWrapper>
      <ScrollToAutoplay />
    </AnimationWrapper>
  ),
}
