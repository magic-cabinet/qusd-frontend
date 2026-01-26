import type { Meta, StoryObj } from '@storybook/react'
import {
  SaturnClassic,
  SaturnDive,
  SaturnSweep,
  SaturnSpiral,
  SaturnChase,
  SaturnStorm,
  SaturnEthereal,
  SaturnNeon,
  SaturnGoldenHour,
  SaturnChaosDive,
} from './SaturnVariants'

const meta: Meta = {
  title: 'GSAP/Saturn Variants',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Saturn Ring Variants

10 variations of the Saturn ring swim effect with different camera modes, lighting, and filters.

## Key Features

- **Illuminated Coin** - Coin has dedicated rim lights that follow it, ensuring visibility from any camera angle
- **Glowing Particles** - High emissive values with outer glow halos
- **Atmospheric Fog** - Depth and light scattering
- **Color Filters** - Warm, cool, neon, golden, ethereal overlays
- **Vignette + Lens Flare** - Cinematic feel

## Camera Modes

| Mode | Description |
|------|-------------|
| **Orbit** | Classic orbital view around the rings |
| **Dive** | Plunge through the ring system from above |
| **Sweep** | Low sweeping pass close to the rings |
| **Spiral** | Spiral in and out of the ring system |
| **Chase** | Chase a point moving along the rings |

## Filter Types

| Filter | Feel |
|--------|------|
| **Warm** | Orange/amber overlay for sunset feel |
| **Cool** | Blue tint for icy space atmosphere |
| **Neon** | Magenta/cyan for synthwave vibe |
| **Golden** | Rich gold for luxury feel |
| **Ethereal** | Soft purple/lavender for dreamy mood |

## Coin Illumination

The coin wrapper includes 6 point lights:
- Front/back key lights
- Left/right rim lights (gold and cyan)
- Top/bottom fill lights

This ensures the coin catches light from every angle as the camera moves.
        `,
      },
    },
  },
}

export default meta

export const Classic: StoryObj = {
  name: '1. Saturn Classic',
  render: () => <SaturnClassic />,
  parameters: {
    docs: {
      description: {
        story: 'Classic orbital view with 6 rings and warm filter. The definitive Saturn experience.',
      },
    },
  },
}

export const Dive: StoryObj = {
  name: '2. Saturn Dive',
  render: () => <SaturnDive />,
  parameters: {
    docs: {
      description: {
        story: 'Dramatic plunge through 7 rings from above with cool blue filter.',
      },
    },
  },
}

export const Sweep: StoryObj = {
  name: '3. Saturn Sweep',
  render: () => <SaturnSweep />,
  parameters: {
    docs: {
      description: {
        story: 'Low sweeping pass close to the ring plane with golden filter.',
      },
    },
  },
}

export const Spiral: StoryObj = {
  name: '4. Saturn Spiral',
  render: () => <SaturnSpiral />,
  parameters: {
    docs: {
      description: {
        story: 'Spiral in and out of the rings with neon lighting and filter.',
      },
    },
  },
}

export const Chase: StoryObj = {
  name: '5. Saturn Chase',
  render: () => <SaturnChase />,
  parameters: {
    docs: {
      description: {
        story: 'Camera chases a moving point along the rings with warm filter.',
      },
    },
  },
}

export const Storm: StoryObj = {
  name: '6. Saturn Storm',
  render: () => <SaturnStorm />,
  parameters: {
    docs: {
      description: {
        story: 'Chaotic particle storm around the rings with ethereal filter.',
      },
    },
  },
}

export const Ethereal: StoryObj = {
  name: '7. Saturn Ethereal',
  render: () => <SaturnEthereal />,
  parameters: {
    docs: {
      description: {
        story: 'Dreamy atmosphere with fog that clears at peak moment. Soft lavender tones.',
      },
    },
  },
}

export const Neon: StoryObj = {
  name: '8. Saturn Neon',
  render: () => <SaturnNeon />,
  parameters: {
    docs: {
      description: {
        story: 'Vibrant magenta/cyan neon lighting with synthwave aesthetics.',
      },
    },
  },
}

export const GoldenHour: StoryObj = {
  name: '9. Saturn Golden Hour',
  render: () => <SaturnGoldenHour />,
  parameters: {
    docs: {
      description: {
        story: 'Warm sunset lighting over the rings. Rich golden tones.',
      },
    },
  },
}

export const ChaosDive: StoryObj = {
  name: '10. Saturn Chaos Dive',
  render: () => <SaturnChaosDive />,
  parameters: {
    docs: {
      description: {
        story: 'Ultimate experience - 8 dense rings, dramatic dive camera, intense lighting.',
      },
    },
  },
}
