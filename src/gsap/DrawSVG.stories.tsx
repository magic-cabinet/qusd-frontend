import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import {
  DrawSVGLogo,
  DrawSVGNetwork,
  DrawSVGProgress,
  DrawSVGSignature,
  DrawSVGCheckmark,
  DrawSVGBlockchain,
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
        Replay Animation
      </button>
      <div key={key}>{children}</div>
    </div>
  )
}

export default {
  title: 'GSAP/Plugins/DrawSVG',
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'light' },
    docs: {
      description: {
        component: `
**Note:** DrawSVG is a premium GSAP Club plugin.

These demos simulate the effect using \`stroke-dasharray\` / \`stroke-dashoffset\`
which GSAP can animate natively. For production with the actual DrawSVG plugin,
consider a [Club GreenSock membership](https://gsap.com/pricing/).
        `,
      },
    },
  },
} satisfies Meta

type Story = StoryObj

export const Logo: Story = {
  name: 'Logo Draw',
  render: () => (
    <AnimationWrapper>
      <DrawSVGLogo />
    </AnimationWrapper>
  ),
}

export const Network: Story = {
  name: 'Network Animation',
  render: () => (
    <AnimationWrapper>
      <DrawSVGNetwork />
    </AnimationWrapper>
  ),
}

export const Progress: Story = {
  name: 'Progress Circle',
  render: () => (
    <AnimationWrapper>
      <DrawSVGProgress />
    </AnimationWrapper>
  ),
}

export const Signature: Story = {
  name: 'Signature/Handwriting',
  render: () => (
    <AnimationWrapper>
      <DrawSVGSignature />
    </AnimationWrapper>
  ),
}

export const Checkmark: Story = {
  name: 'Success Checkmark',
  render: () => (
    <AnimationWrapper>
      <DrawSVGCheckmark />
    </AnimationWrapper>
  ),
}

export const Blockchain: Story = {
  name: 'Blockchain Links',
  render: () => (
    <AnimationWrapper>
      <DrawSVGBlockchain />
    </AnimationWrapper>
  ),
}
