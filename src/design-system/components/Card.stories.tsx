import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card } from './Card'
import { Text } from './Text'
import { Badge } from './Badge'
import { Button } from './Button'

const meta = {
  title: 'Design System/Primitives/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'light' },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outlined', 'dark'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Padding size',
    },
    hoverable: {
      control: 'boolean',
      description: 'Enable hover lift effect',
    },
    glowOnHover: {
      control: 'boolean',
      description: 'Show glow effect on hover',
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div>
        <Text variant="h4">Card Title</Text>
        <Text variant="body" color="muted">
          Card content goes here.
        </Text>
      </div>
    ),
  },
}

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: (
      <div>
        <Text variant="h4">Elevated Card</Text>
        <Text variant="body" color="muted">
          Has a subtle shadow for depth.
        </Text>
      </div>
    ),
  },
}

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: (
      <div>
        <Text variant="h4">Outlined Card</Text>
        <Text variant="body" color="muted">
          Uses paper background with border.
        </Text>
      </div>
    ),
  },
}

export const Dark: Story = {
  args: {
    variant: 'dark',
    children: (
      <div>
        <Text variant="h4" color="white">Dark Card</Text>
        <Text variant="body" style={{ color: '#a3a3a3' }}>
          For dark sections of the page.
        </Text>
      </div>
    ),
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

export const Hoverable: Story = {
  args: {
    hoverable: true,
    glowOnHover: true,
    children: (
      <div>
        <Text variant="h4">Interactive Card</Text>
        <Text variant="body" color="muted">
          Hover to see the lift and glow effect.
        </Text>
      </div>
    ),
  },
}

export const FeatureCard: Story = {
  render: () => (
    <Card hoverable glowOnHover style={{ maxWidth: '320px' }}>
      <div className="flex items-center justify-between mb-4">
        <span className="w-12 h-12 border border-[#e5e5e5] flex items-center justify-center font-['Space_Mono'] text-sm rounded-xl">
          F01
        </span>
        <Badge variant="outline">01/04</Badge>
      </div>
      <Text variant="h4" style={{ marginBottom: '8px' }}>Gasless Transactions</Text>
      <Text variant="body-sm" color="muted" style={{ marginBottom: '16px' }}>
        Users pay with QUSD, facilitators cover gas fees. Zero friction through EIP-2612 permit signatures.
      </Text>
      <div className="flex gap-2">
        <Badge size="sm">0 wei gas</Badge>
        <Badge size="sm">Permit sigs</Badge>
        <Badge size="sm">Meta-tx</Badge>
      </div>
    </Card>
  ),
}

export const MetricCard: Story = {
  render: () => (
    <Card variant="dark" style={{ maxWidth: '280px' }}>
      <div className="flex items-center justify-between mb-4">
        <Text variant="annotation" style={{ color: '#737373' }}>M01</Text>
        <Text variant="annotation" style={{ color: '#737373' }}>USD</Text>
      </div>
      <Text variant="h2" color="white" style={{ marginBottom: '8px' }}>50M</Text>
      <Text variant="annotation" style={{ color: '#a3a3a3' }}>Total Value Locked</Text>
    </Card>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

export const CTACard: Story = {
  render: () => (
    <Card style={{ maxWidth: '500px' }}>
      <div className="flex items-center justify-between">
        <div>
          <Text variant="h4" style={{ marginBottom: '4px' }}>Ready to integrate?</Text>
          <Text variant="body-sm" color="muted">Join the autonomous economy today.</Text>
        </div>
        <Button variant="primary" rightIcon="→">Get Started</Button>
      </div>
    </Card>
  ),
}
