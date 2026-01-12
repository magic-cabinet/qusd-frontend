import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './Badge'

const meta = {
  title: 'Design System/Primitives/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'light' },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'outline'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Badge size',
    },
    dot: {
      control: 'boolean',
      description: 'Show status dot',
    },
    pulse: {
      control: 'boolean',
      description: 'Animate the status dot',
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'ERC-20',
    variant: 'default',
  },
}

export const Primary: Story = {
  args: {
    children: 'X402 Protocol',
    variant: 'primary',
  },
}

export const Success: Story = {
  args: {
    children: 'Active',
    variant: 'success',
    dot: true,
    pulse: true,
  },
}

export const Warning: Story = {
  args: {
    children: 'Pending',
    variant: 'warning',
    dot: true,
  },
}

export const Outline: Story = {
  args: {
    children: 'Mainnet',
    variant: 'outline',
    dot: true,
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
}

export const ProtocolBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="primary">X402</Badge>
      <Badge variant="primary">EIP-2612</Badge>
      <Badge variant="outline">ERC-20</Badge>
      <Badge variant="outline">DID</Badge>
      <Badge variant="outline">Multi-Chain</Badge>
    </div>
  ),
}

export const StatusIndicators: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <Badge variant="success" dot pulse>Mainnet Live</Badge>
        <Badge variant="warning" dot>Testnet</Badge>
        <Badge variant="outline" dot>Offline</Badge>
      </div>
    </div>
  ),
}
