import type { Meta, StoryObj } from '@storybook/react'
import {
  ExplosionConverge,
  ExplosionMultiWave,
  ExplosionElasticSnap,
  ExplosionImplosion,
  ExplosionRadialBurst,
  ExplosionFireworkCascade,
  ExplosionShockwave,
  ExplosionSpiral,
  ExplosionMomentOfClarity,
  ExplosionEtherealDawn,
} from './ExplosionVariants'

const meta: Meta = {
  title: 'GSAP/Explosion Variants',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Explosion & Convergence Variants

10 dramatic explosion effects with planes that converge and explode with easing.

## Features

- **Easing Functions** - Multiple easing types for different explosion feels
  - \`easeOutExpo\` - Sharp explosive expansion
  - \`easeOutBack\` - Bouncy overshoot
  - \`easeOutElastic\` - Springy snap-back
  - \`easeInOutQuart\` - Smooth acceleration/deceleration
  - \`easeOutQuint\` - Sharp initial burst

- **Atmospheric Effects**
  - Volumetric fog for depth
  - Smoke particles for light diffusion
  - Sunburst god rays at peak moments
  - Camera color grading filters
  - Vignette overlays

- **Convergence Patterns**
  - Planes converge from multiple angles
  - Particles implode to center
  - Moment of clarity at peak

- **Explosion Patterns**
  - Radial burst
  - Shockwave rings
  - Spiral expansion
  - Firework cascades

## Easing Comparison

| Easing | Feel | Best For |
|--------|------|----------|
| **Expo** | Sharp, explosive | Initial burst |
| **Back** | Overshoot, bouncy | Playful effects |
| **Elastic** | Springy, snappy | Energetic moments |
| **Quart** | Smooth, cinematic | Convergence |
| **Quint** | Sharp start, smooth end | Radial effects |

## Atmospheric Elements

| Element | Purpose |
|---------|---------|
| **Fog** | Depth, light scattering |
| **Smoke** | Volumetric light effect |
| **Sunburst** | Moment of clarity |
| **Vignette** | Focus, drama |
| **Color Grade** | Mood, atmosphere |
        `,
      },
    },
  },
}

export default meta

export const ConvergeExplode: StoryObj = {
  name: '1. Converge & Explode',
  render: () => <ExplosionConverge />,
  parameters: {
    docs: {
      description: {
        story: 'Four planes of particles converge to the center, then burst outward with exponential easing.',
      },
    },
  },
}

export const MultiWave: StoryObj = {
  name: '2. Multi-Wave Explosion',
  render: () => <ExplosionMultiWave />,
  parameters: {
    docs: {
      description: {
        story: 'Three staggered waves of particles converge and explode in sequence, creating cascading effect.',
      },
    },
  },
}

export const ElasticSnap: StoryObj = {
  name: '3. Elastic Snap',
  render: () => <ExplosionElasticSnap />,
  parameters: {
    docs: {
      description: {
        story: 'Bouncy elastic expansion with spring-like snap. Particles overshoot and settle.',
      },
    },
  },
}

export const Implosion: StoryObj = {
  name: '4. Implosion → Explosion',
  render: () => <ExplosionImplosion />,
  parameters: {
    docs: {
      description: {
        story: '80 particles collapse to center in first half, then violently explode outward in second half.',
      },
    },
  },
}

export const RadialBurst: StoryObj = {
  name: '5. Radial Burst',
  render: () => <ExplosionRadialBurst />,
  parameters: {
    docs: {
      description: {
        story: 'Sharp radial rays shoot out from center with quint easing for dramatic burst.',
      },
    },
  },
}

export const FireworkCascade: StoryObj = {
  name: '6. Firework Cascade',
  render: () => <ExplosionFireworkCascade />,
  parameters: {
    docs: {
      description: {
        story: 'Multiple firework bursts at different positions and times, with gravity effect.',
      },
    },
  },
}

export const Shockwave: StoryObj = {
  name: '7. Shockwave',
  render: () => <ExplosionShockwave />,
  parameters: {
    docs: {
      description: {
        story: 'Expanding shockwave rings ripple outward from the center with particles riding the wave.',
      },
    },
  },
}

export const SpiralExplosion: StoryObj = {
  name: '8. Spiral Explosion',
  render: () => <ExplosionSpiral />,
  parameters: {
    docs: {
      description: {
        story: '60 particles spiral outward in a helical explosion pattern.',
      },
    },
  },
}

export const MomentOfClarity: StoryObj = {
  name: '9. Moment of Clarity',
  render: () => <ExplosionMomentOfClarity />,
  parameters: {
    docs: {
      description: {
        story: 'Full atmospheric experience with sunburst god rays, volumetric fog, smoke particles, and camera color grading. The "moment of clarity" peaks at 50% scroll with maximum light and minimum fog.',
      },
    },
  },
}

export const EtherealDawn: StoryObj = {
  name: '10. Ethereal Dawn',
  render: () => <ExplosionEtherealDawn />,
  parameters: {
    docs: {
      description: {
        story: 'Soft, dreamy explosion with gentle god rays breaking through pastel mist. Romantic, ethereal atmosphere.',
      },
    },
  },
}
