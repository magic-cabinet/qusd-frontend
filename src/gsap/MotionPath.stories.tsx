import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import {
  MotionPathCircle,
  MotionPathBezier,
  MotionPathStagger,
  MotionPathOrbit,
  MotionPathNetwork,
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
        Reset Animation
      </button>
      <div key={key}>{children}</div>
    </div>
  )
}

export default {
  title: 'GSAP/Plugins/MotionPath',
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'light' },
  },
} satisfies Meta

type Story = StoryObj

export const Circle: Story = {
  name: 'Circular Path',
  render: () => (
    <AnimationWrapper>
      <MotionPathCircle />
    </AnimationWrapper>
  ),
}

export const Bezier: Story = {
  name: 'Bezier Curve',
  render: () => (
    <AnimationWrapper>
      <MotionPathBezier />
    </AnimationWrapper>
  ),
}

export const Stagger: Story = {
  name: 'Staggered Elements',
  render: () => (
    <AnimationWrapper>
      <MotionPathStagger />
    </AnimationWrapper>
  ),
}

export const Orbit: Story = {
  name: 'Orbit with Trail',
  render: () => (
    <AnimationWrapper>
      <MotionPathOrbit />
    </AnimationWrapper>
  ),
}

export const Network: Story = {
  name: 'Network Visualization',
  render: () => (
    <AnimationWrapper>
      <MotionPathNetwork />
    </AnimationWrapper>
  ),
}
