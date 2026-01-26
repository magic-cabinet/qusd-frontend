import type { Meta, StoryObj } from '@storybook/react'
import {
  FilterCyanOrbit,
  FilterGoldDive,
  FilterBlueSweep,
  FilterCyanSpiral,
  FilterGoldChase,
  FilterDualTone,
  FilterHeavyDust,
  FilterBrightFlare,
  FilterDeepBlue,
  FilterCinematic,
} from './CameraFilterVariants'

const meta: Meta = {
  title: 'GSAP/Camera Filter Variants',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Camera Filter Variants

10 variants with camera substrate filters that follow the camera FOV.

## Brand Colors Only
- Cyan: #0ECCED, #00c3ff, #0BB8D9
- Blue: #025EC4, #0370E0
- Gold: #FFD700, #D4AF37
- Orange: #FF8C00
- Silver: #C0C0C0

## Filter Components
- **Tint Layer** - Color overlay in camera FOV
- **Vignette Ring** - Dark edges for focus
- **Dust Particles** - Floating particles in frame
- **Lens Flare** - Central glow at peak moments

## Camera Modes
- Orbit, Dive, Sweep, Spiral, Chase
        `,
      },
    },
  },
}

export default meta

export const CyanOrbit: StoryObj = {
  name: '1. Cyan Orbit',
  render: () => <FilterCyanOrbit />,
}

export const GoldDive: StoryObj = {
  name: '2. Gold Dive',
  render: () => <FilterGoldDive />,
}

export const BlueSweep: StoryObj = {
  name: '3. Blue Sweep',
  render: () => <FilterBlueSweep />,
}

export const CyanSpiral: StoryObj = {
  name: '4. Cyan Spiral',
  render: () => <FilterCyanSpiral />,
}

export const GoldChase: StoryObj = {
  name: '5. Gold Chase',
  render: () => <FilterGoldChase />,
}

export const DualTone: StoryObj = {
  name: '6. Dual Tone',
  render: () => <FilterDualTone />,
}

export const HeavyDust: StoryObj = {
  name: '7. Heavy Dust',
  render: () => <FilterHeavyDust />,
}

export const BrightFlare: StoryObj = {
  name: '8. Bright Flare',
  render: () => <FilterBrightFlare />,
}

export const DeepBlue: StoryObj = {
  name: '9. Deep Blue',
  render: () => <FilterDeepBlue />,
}

export const Cinematic: StoryObj = {
  name: '10. Cinematic',
  render: () => <FilterCinematic />,
}
