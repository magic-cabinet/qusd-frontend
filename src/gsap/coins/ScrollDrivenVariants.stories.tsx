import type { Meta, StoryObj } from '@storybook/react'
import {
  ScrollCinematicSpiral,
  ScrollNeonFigure8,
  ScrollGoldenHelix,
  ScrollCoolBlueRings,
  ScrollDramaticStarburst,
  ScrollRainbowCascade,
  ScrollDualHelix,
  ScrollGalaxySwirl,
  ScrollGalaxyChaosDive,
  ScrollAtomicOrbital,
  ScrollParticleStorm,
  ScrollSaturnSwim,
  ScrollSpiralDive,
  ScrollRingDive,
} from './ScrollDrivenVariants'

const meta: Meta = {
  title: 'GSAP/Scroll-Driven Variants',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Scroll-Driven Coin Variants

13 unique variations with trailing lights, attractor physics, and swimming camera work.

## Features

- **Trailing Lights** - Each particle leaves a fading trail behind it
- **Attractor Physics** - Particles are pulled by moving attractor points
- **Z-Depth Motion** - Particles move through 3D space, not just in 2D planes
- **Swimming Camera** - Camera dives through rings like swimming through Saturn's rings

## Lighting Presets

| Preset | Description |
|--------|-------------|
| **Cinematic** | Film-like key/fill/rim setup with warm tones |
| **Neon** | Vibrant magenta/cyan/yellow point lights |
| **Golden Hour** | Warm sunset tones with orange accents |
| **Cool Blue** | Icy blue tones with cyan highlights |
| **Dramatic** | High contrast spotlight with colored accents |
| **Rainbow** | Color-shifting lights based on scroll progress |

## Orbital Patterns

| Pattern | Description |
|---------|-------------|
| **Spiral** | Particles spiral in/out with progress |
| **Figure-8** | Lemniscate infinity pattern |
| **Helix** | 3D DNA-like double helix |
| **Pulsing Rings** | Concentric rings with wave motion |
| **Starburst** | Particles shoot out and return |
| **Galaxy Arms** | Spiral galaxy arm pattern |
| **Atomic** | Electron cloud orbital visualization |
| **Particle Storm** | Chaotic energy field |
| **Saturn Rings** | Swimming through concentric rings |

## Camera Modes

| Mode | Description |
|------|-------------|
| **Saturn** | Swoops around and through Saturn-like rings |
| **Spiral** | Spirals down through particle layers |
| **Dive** | Straight dive with wobble through rings |
        `,
      },
    },
  },
}

export default meta

export const CinematicSpiral: StoryObj = {
  name: '1. Cinematic Spiral',
  render: () => <ScrollCinematicSpiral />,
  parameters: {
    docs: {
      description: {
        story: 'Film-like key/fill/rim lighting with spiral particle orbits that expand and contract.',
      },
    },
  },
}

export const NeonFigure8: StoryObj = {
  name: '2. Neon Figure-8',
  render: () => <ScrollNeonFigure8 />,
  parameters: {
    docs: {
      description: {
        story: 'Vibrant magenta/cyan neon lights with particles following infinity (∞) pattern.',
      },
    },
  },
}

export const GoldenHelix: StoryObj = {
  name: '3. Golden Hour Helix',
  render: () => <ScrollGoldenHelix />,
  parameters: {
    docs: {
      description: {
        story: 'Warm sunset lighting with DNA double-helix particle pattern.',
      },
    },
  },
}

export const CoolBlueRings: StoryObj = {
  name: '4. Cool Blue Rings',
  render: () => <ScrollCoolBlueRings />,
  parameters: {
    docs: {
      description: {
        story: 'Icy blue lighting with 4 concentric pulsing particle rings.',
      },
    },
  },
}

export const DramaticStarburst: StoryObj = {
  name: '5. Dramatic Starburst',
  render: () => <ScrollDramaticStarburst />,
  parameters: {
    docs: {
      description: {
        story: 'High contrast theatrical lighting with explosive starburst particles.',
      },
    },
  },
}

export const RainbowCascade: StoryObj = {
  name: '6. Rainbow Cascade',
  render: () => <ScrollRainbowCascade />,
  parameters: {
    docs: {
      description: {
        story: 'Lights and particles shift through rainbow colors as you scroll.',
      },
    },
  },
}

export const DualHelix: StoryObj = {
  name: '7. Dual Helix',
  render: () => <ScrollDualHelix />,
  parameters: {
    docs: {
      description: {
        story: 'Double DNA strand pattern with offset cyan and gold helices.',
      },
    },
  },
}

export const GalaxySwirl: StoryObj = {
  name: '8. Galaxy Swirl',
  render: () => <ScrollGalaxySwirl />,
  parameters: {
    docs: {
      description: {
        story: 'Three spiral galaxy arms rotating around the central coin.',
      },
    },
  },
}

export const GalaxyChaosDive: StoryObj = {
  name: '8b. Galaxy Chaos Dive',
  render: () => <ScrollGalaxyChaosDive />,
  parameters: {
    docs: {
      description: {
        story: 'Camera sweeps dramatically through 5 dense galaxy arms with nebula dust clouds. Spiral inward then outward through the cosmic chaos.',
      },
    },
  },
}

export const AtomicOrbital: StoryObj = {
  name: '9. Atomic Orbital',
  render: () => <ScrollAtomicOrbital />,
  parameters: {
    docs: {
      description: {
        story: 'Electron cloud visualization with 3 intersecting orbital planes.',
      },
    },
  },
}

export const ParticleStorm: StoryObj = {
  name: '10. Particle Storm',
  render: () => <ScrollParticleStorm />,
  parameters: {
    docs: {
      description: {
        story: 'Chaotic 60-particle energy field with dramatic lighting and trailing effects.',
      },
    },
  },
}

export const SaturnSwim: StoryObj = {
  name: '11. Saturn Swim',
  render: () => <ScrollSaturnSwim />,
  parameters: {
    docs: {
      description: {
        story: 'Swimming camera dives through Saturn-like concentric rings. Camera swoops around and through the ring system.',
      },
    },
  },
}

export const SpiralDive: StoryObj = {
  name: '12. Spiral Dive',
  render: () => <ScrollSpiralDive />,
  parameters: {
    docs: {
      description: {
        story: 'Spiral camera descent through layers of neon particle clouds. Like diving down a cosmic drain.',
      },
    },
  },
}

export const RingDive: StoryObj = {
  name: '13. Ring Dive',
  render: () => <ScrollRingDive />,
  parameters: {
    docs: {
      description: {
        story: 'Straight plunge through pulsing concentric rings with cool blue lighting.',
      },
    },
  },
}
