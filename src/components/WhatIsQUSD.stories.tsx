import type { Meta, StoryObj } from '@storybook/react-vite'
import WhatIsQUSD from './WhatIsQUSD'

const meta = {
  title: 'Components/WhatIsQUSD',
  component: WhatIsQUSD,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'light' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof WhatIsQUSD>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}

export const TabletView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
}
