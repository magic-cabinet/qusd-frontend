import type { Meta, StoryObj } from '@storybook/react'
import {
  CoinSlowSpin,
  CoinFlipReveal,
  CoinOrbit,
  CoinBounceDrop,
  CoinTripleStack,
  CoinShowcaseHorizontal,
  LogoCoin,
  CoinCanvas,
} from './ThreeJSCoin'

const meta: Meta = {
  title: 'GSAP/Coins',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# 3D Coin Compositions

Three.js coins with extruded QUSD logo, matching the Remotion video compositions.
Now usable in Storybook with GSAP scroll control.

## Features

- **Real Three.js 3D** - Proper WebGL rendering with metallic materials
- **Extruded Logo** - QUSD logo traced from SVG and extruded onto coin faces
- **Orbiting Particles** - Cyan and gold spheres with smooth rotation
- **GSAP Animations** - Flip, bounce, stack with timeline control
- **Horizontal Scroll** - Navigate between scenes with scroll

## Based on Remotion

These are the same coin designs from \`src/remotion/compositions/ExtrudedLogoCoin.tsx\`,
adapted to work with @react-three/fiber for Storybook.
        `,
      },
    },
  },
}

export default meta

// === HORIZONTAL SHOWCASE ===

export const Showcase: StoryObj = {
  name: '1. Horizontal Showcase',
  render: () => <CoinShowcaseHorizontal />,
  parameters: {
    docs: {
      description: {
        story: 'All 5 coin animations in horizontal scroll. Scroll down to navigate.',
      },
    },
  },
}

// === INDIVIDUAL ANIMATIONS ===

export const SlowSpin: StoryObj = {
  name: 'Animation: Slow Spin',
  render: () => (
    <div style={{ height: '100vh' }}>
      <CoinSlowSpin />
    </div>
  ),
}

export const FlipReveal: StoryObj = {
  name: 'Animation: Flip Reveal',
  render: () => (
    <div style={{ height: '100vh' }}>
      <CoinFlipReveal />
    </div>
  ),
}

export const Orbit: StoryObj = {
  name: 'Animation: Orbit (Interactive)',
  render: () => (
    <div style={{ height: '100vh' }}>
      <CoinOrbit />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Drag to rotate the camera around the coin.',
      },
    },
  },
}

export const BounceDrop: StoryObj = {
  name: 'Animation: Bounce Drop',
  render: () => (
    <div style={{ height: '100vh' }}>
      <CoinBounceDrop />
    </div>
  ),
}

export const TripleStack: StoryObj = {
  name: 'Animation: Triple Stack',
  render: () => (
    <div style={{ height: '100vh' }}>
      <CoinTripleStack />
    </div>
  ),
}

// === STATIC COMPONENT ===

export const StaticCoin: StoryObj = {
  name: 'Component: Static Coin',
  render: () => (
    <div style={{ height: '100vh' }}>
      <CoinCanvas cameraPosition={[0, 2, 8]} showControls>
        <LogoCoin autoRotate={false} rotationX={0.3} rotationY={0.5} />
      </CoinCanvas>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Static coin with orbit controls. Drag to view from any angle.',
      },
    },
  },
}
