import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import {
  TechSetupDraw,
  CircuitBoardDraw,
  NetworkMapDraw,
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
  title: 'GSAP/Tech Drawing',
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
  },
} satisfies Meta

type Story = StoryObj

export const ComputerSetup: Story = {
  name: 'Computer Setup (Anime Style)',
  render: () => (
    <AnimationWrapper>
      <TechSetupDraw />
    </AnimationWrapper>
  ),
}

export const CircuitBoard: Story = {
  name: 'Circuit Board',
  render: () => (
    <AnimationWrapper>
      <CircuitBoardDraw />
    </AnimationWrapper>
  ),
}

export const NetworkMap: Story = {
  name: 'Blockchain Network Map',
  render: () => (
    <AnimationWrapper>
      <NetworkMapDraw />
    </AnimationWrapper>
  ),
}

export const AllTechDrawings: Story = {
  name: 'All Tech Drawings',
  render: () => {
    const [key, setKey] = useState(0)
    return (
      <div>
        <button
          onClick={() => setKey(k => k + 1)}
          style={{
            marginBottom: '32px',
            padding: '8px 16px',
            background: colors.cyan.DEFAULT,
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
              01 — Computer Setup
            </span>
            <TechSetupDraw />
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
              02 — Circuit Board
            </span>
            <CircuitBoardDraw />
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
              03 — Network Map
            </span>
            <NetworkMapDraw />
          </div>
        </div>
      </div>
    )
  },
  decorators: [],
}
