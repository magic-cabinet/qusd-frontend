import type { Meta, StoryObj } from '@storybook/react'
import {
  CoinCompositionsHorizontal,
  CoinCompositionsCinematic,
  SlowSpinFrame,
  FlipRevealFrame,
  OrbitFrame,
  BounceDropFrame,
  TripleStackFrame,
} from './CoinCompositions'

const meta: Meta = {
  title: 'GSAP/Coin Compositions',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Coin Compositions

CSS 3D coin animations inspired by Remotion compositions, controlled with GSAP and horizontal scroll.

## Features

- **CSS 3D Coin**: Realistic gold coin with front/back faces and edge detail
- **Metallic Orbiting Particles**: Harmonious gold/silver/cyan particles with wave motion
- **Scroll-Controlled**: Horizontal scrub navigation between frames
- **5 Animation Frames**: SlowSpin, FlipReveal, Orbit, BounceDrop, TripleStack

## Technical Details

- Pure CSS 3D transforms (no WebGL/Three.js)
- GSAP ScrollTrigger with snap points
- Harmonic particle orbits with phase offsets
- Metallic gradients and glow effects
        `,
      },
    },
  },
}

export default meta

// === FULL HORIZONTAL COMPOSITIONS ===

export const Horizontal: StoryObj = {
  name: '1. Horizontal Scroll',
  render: () => <CoinCompositionsHorizontal />,
  parameters: {
    docs: {
      description: {
        story: 'All 5 coin frames in horizontal scroll with snap points. Scroll down to navigate between frames.',
      },
    },
  },
}

export const Cinematic: StoryObj = {
  name: '2. Cinematic Scroll',
  render: () => <CoinCompositionsCinematic />,
  parameters: {
    docs: {
      description: {
        story: 'Slower, more dramatic scroll with fade transitions between frames. Extended scroll distance for cinematic feel.',
      },
    },
  },
}

// === INDIVIDUAL FRAMES ===

export const SlowSpin: StoryObj = {
  name: 'Frame: Slow Spin',
  render: () => (
    <div style={{ height: '100vh' }}>
      <SlowSpinFrame />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Elegant continuous rotation with dual-ring orbiting particles (gold outer, silver inner).',
      },
    },
  },
}

export const FlipReveal: StoryObj = {
  name: 'Frame: Flip Reveal',
  render: () => (
    <div style={{ height: '100vh' }}>
      <FlipRevealFrame />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dramatic entrance flip animation with cyan orbiting particles.',
      },
    },
  },
}

export const Orbit: StoryObj = {
  name: 'Frame: Orbit',
  render: () => (
    <div style={{ height: '100vh' }}>
      <OrbitFrame />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Simulated camera orbit around stationary coin. Dual particle rings with larger radius.',
      },
    },
  },
}

export const BounceDrop: StoryObj = {
  name: 'Frame: Bounce Drop',
  render: () => (
    <div style={{ height: '100vh' }}>
      <BounceDropFrame />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Physics-based drop with bounce easing and dynamic shadow scaling.',
      },
    },
  },
}

export const TripleStack: StoryObj = {
  name: 'Frame: Triple Stack',
  render: () => (
    <div style={{ height: '100vh' }}>
      <TripleStackFrame />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Three coins dropping and stacking with staggered timing.',
      },
    },
  },
}
