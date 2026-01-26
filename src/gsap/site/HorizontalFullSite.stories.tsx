import type { Meta, StoryObj } from '@storybook/react'
import { HorizontalFullSite, HorizontalCinematic } from './HorizontalFullSite'

const meta: Meta = {
  title: 'GSAP/Horizontal Full Site',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Horizontal Full Site

Frame-based horizontal scrolling site inspired by Remotion's composition approach.
Each "frame" is a full viewport panel that scrolls horizontally with GSAP ScrollTrigger.

## Concept

Instead of vertical scrolling, the entire site scrolls horizontally:
- **Frame 1**: Hero with animated coin and orbiting particles
- **Frame 2**: Problem statement with card reveals
- **Frames 3-6**: Solution steps (01-04) with alternating layouts
- **Frame 7**: Stats/metrics
- **Frame 8**: CTA and footer

## Technical Details

- Uses GSAP ScrollTrigger with \`pin: true\` for horizontal scroll
- Snap points on each frame for clean navigation
- Content animations trigger as frames enter viewport
- Parallax effects on backgrounds in cinematic variant
        `,
      },
    },
  },
}

export default meta

export const Default: StoryObj = {
  name: '1. Standard',
  render: () => <HorizontalFullSite />,
  parameters: {
    docs: {
      description: {
        story: 'Standard horizontal scroll with snap points and content reveals. 8 frames covering hero, problem, solution steps, stats, and CTA.',
      },
    },
  },
}

export const Cinematic: StoryObj = {
  name: '2. Cinematic',
  render: () => <HorizontalCinematic />,
  parameters: {
    docs: {
      description: {
        story: 'Slower, more dramatic scroll with parallax backgrounds, blur transitions, and extended scroll distance. Feels more like a video presentation.',
      },
    },
  },
}
