import type { Meta, StoryObj } from '@storybook/react-vite'
import Metrics from './Metrics'

const meta = {
  title: 'Components/Metrics',
  component: Metrics,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Metrics>

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
