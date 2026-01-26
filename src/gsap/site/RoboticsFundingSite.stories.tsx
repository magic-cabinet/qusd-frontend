import type { Meta, StoryObj } from '@storybook/react'
import { RoboticsFundingSite } from './RoboticsFundingSite'

const meta: Meta = {
  title: 'GSAP/Robotics Funding Site',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Robotics Funding Site

A full-page scroll experience combining Saturn Sweep 3D animations with compelling messaging about funding the future of robotics.

## Features
- **Saturn Sweep Camera** - Sweeping camera through orbital rings
- **Scroll-driven Sections** - Content fades in/out as you scroll
- **Milestone Funding** - Decentralized goal-based funding
- **Partner Network** - Building the future together

## Messaging Themes
- Mint the future of robotics
- Modern way of gathering funds
- Reach your funding goals
- Platform for new projects coming online
- Partners who make dreams reality
        `,
      },
    },
  },
}

export default meta

export const Default: StoryObj = {
  name: 'Full Site Experience',
  render: () => <RoboticsFundingSite />,
}
