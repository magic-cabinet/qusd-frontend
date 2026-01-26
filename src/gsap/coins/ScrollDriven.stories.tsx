import type { Meta, StoryObj } from '@storybook/react'
import {
  ScrollDrivenSpin,
  ScrollDrivenFlip,
  ScrollDrivenTimeline,
  ScrollDrivenOrbit,
} from './ScrollDrivenCoin'

const meta: Meta = {
  title: 'GSAP/Scroll-Driven Coins',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Scroll-Driven Coin Animations

Maps Remotion's frame-based animations to scroll position. Instead of time driving the animation,
**scroll progress** (0-100%) controls every aspect of the coin's transform.

## Concept

In Remotion:
\`\`\`ts
const frame = useCurrentFrame() // 0, 1, 2, ... 180
const rotationY = interpolate(frame, [0, 180], [0, Math.PI * 4])
\`\`\`

Here with scroll:
\`\`\`ts
const progress = scrollProgress // 0.0 to 1.0
const rotationY = progress * Math.PI * 4
\`\`\`

## Features

- **Frame indicator** - Shows current "frame" and progress percentage
- **Phase indicators** - For multi-phase timelines
- **Scrub control** - Scroll up/down to scrub through animation
- **Sticky viewport** - Canvas stays fixed while you scroll

## Scroll Lengths

Each composition has different scroll lengths for different "duration" feels:
- Spin: 400vh (4 viewport heights)
- Flip: 400vh
- Timeline: 600vh (longer for more phases)
- Orbit: 500vh
        `,
      },
    },
  },
}

export default meta

export const Spin: StoryObj = {
  name: '1. Scroll-Driven Spin',
  render: () => <ScrollDrivenSpin />,
  parameters: {
    docs: {
      description: {
        story: `
Scroll controls rotation. Maps to Remotion's \`ExtrudedLogoCoin\` composition.

- **Scroll 0%**: Scale 0.3, Y position +2, rotation 0
- **Scroll 100%**: Scale 1, Y position 0, rotation 4π (2 full spins)
        `,
      },
    },
  },
}

export const Flip: StoryObj = {
  name: '2. Scroll-Driven Flip',
  render: () => <ScrollDrivenFlip />,
  parameters: {
    docs: {
      description: {
        story: `
Scroll controls flip reveal. Maps to Remotion's \`CoinFlipReveal\` composition.

**Phases:**
- **0-30%**: Flip in from edge view (rotationX)
- **30-50%**: Hold front face
- **50-70%**: Flip to show back (rotationY to π)
- **70-100%**: Complete rotation
        `,
      },
    },
  },
}

export const Timeline: StoryObj = {
  name: '3. Multi-Phase Timeline',
  render: () => <ScrollDrivenTimeline />,
  parameters: {
    docs: {
      description: {
        story: `
Complex animation with multiple phases, like a Remotion \`Sequence\`.

**Phases:**
1. **Scale In** (0-20%): Coin scales from 0 to 1 with initial spin
2. **Spin** (20-50%): Continuous rotation
3. **Rise** (50-70%): Coin rises up while spinning
4. **Fast Spin** (70-90%): Rapid rotation at peak
5. **Settle** (90-100%): Return to center
        `,
      },
    },
  },
}

export const Orbit: StoryObj = {
  name: '4. Camera Orbit',
  render: () => <ScrollDrivenOrbit />,
  parameters: {
    docs: {
      description: {
        story: `
Scroll controls camera orbit. Maps to Remotion's \`CoinOrbit\` composition.

- Camera orbits 360° around the coin
- Coin slowly rotates as camera moves
- Camera Y position oscillates for dynamic viewing angle
        `,
      },
    },
  },
}
