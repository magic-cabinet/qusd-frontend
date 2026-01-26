import type { Meta, StoryObj } from '@storybook/react'
import { RoboticsFundingHorizontal } from './RoboticsFundingHorizontal'

const meta: Meta = {
  title: 'GSAP/Robotics Funding Horizontal',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Robotics Funding - Horizontal Scroll

A cinematic scroll experience combining vertical 3D animation with horizontal panel navigation.

## Features
- **Hero Section** - Vertical scroll with Saturn Sweep 3D animation
- **Horizontal Panels** - Swipe through content sections
- **Golden Theme** - Warm, premium color palette
- **Mobile Responsive** - Adapts to all screen sizes

## Sections
1. Hero - "Mint the Future" with 3D coin animation
2. Vision - Fund the Future of Robotics
3. How It Works - Launch, Fund, Build
4. Partners - Making dreams reality
5. CTA - Get Started
        `,
      },
    },
  },
}

export default meta

export const Default: StoryObj = {
  name: 'Horizontal Scroll Experience',
  render: () => <RoboticsFundingHorizontal />,
}
