import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text } from './Text'

const meta = {
  title: 'Design System/Primitives/Text',
  component: Text,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'light' },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'body', 'body-sm', 'annotation', 'code'],
      description: 'Typography variant',
    },
    color: {
      control: 'select',
      options: ['default', 'muted', 'primary', 'success', 'white'],
      description: 'Text color',
    },
    gradient: {
      control: 'boolean',
      description: 'Apply brand gradient',
    },
  },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const Heading1: Story = {
  args: {
    variant: 'h1',
    children: 'Machine Economy',
  },
}

export const Heading2: Story = {
  args: {
    variant: 'h2',
    children: 'Technical Specifications',
  },
}

export const Heading3: Story = {
  args: {
    variant: 'h3',
    children: 'How It Works',
  },
}

export const Heading4: Story = {
  args: {
    variant: 'h4',
    children: 'Gasless Transactions',
  },
}

export const Body: Story = {
  args: {
    variant: 'body',
    children: 'QUSD is a machine-native stablecoin designed from the ground up for the autonomous economy—enabling seamless, instant, and verifiable transactions between AI agents, robotics systems, and IoT devices.',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
}

export const BodySmall: Story = {
  args: {
    variant: 'body-sm',
    color: 'muted',
    children: 'Users pay with QUSD, facilitators cover gas fees. Zero friction through EIP-2612 permit signatures.',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '400px' }}>
        <Story />
      </div>
    ),
  ],
}

export const Annotation: Story = {
  args: {
    variant: 'annotation',
    children: 'Protocol v1.0 • Status: Active',
  },
}

export const Code: Story = {
  args: {
    variant: 'code',
    children: 'const payment = await x402.createPayment()',
  },
}

export const GradientText: Story = {
  args: {
    variant: 'h2',
    gradient: true,
    children: 'Powered by QUSD',
  },
}

export const AllHeadings: Story = {
  render: () => (
    <div className="space-y-6">
      <Text variant="h1">Heading 1 — 72px</Text>
      <Text variant="h2">Heading 2 — 48px</Text>
      <Text variant="h3">Heading 3 — 30px</Text>
      <Text variant="h4">Heading 4 — 20px</Text>
    </div>
  ),
}

export const TextColors: Story = {
  render: () => (
    <div className="space-y-2">
      <Text variant="body" color="default">Default — Primary text color</Text>
      <Text variant="body" color="muted">Muted — Secondary text color</Text>
      <Text variant="body" color="primary">Primary — Brand cyan color</Text>
      <Text variant="body" color="success">Success — Positive states</Text>
      <div className="p-4 rounded-xl bg-[#0a0a0a]">
        <Text variant="body" color="white">White — For dark backgrounds</Text>
      </div>
    </div>
  ),
}

export const HeroExample: Story = {
  render: () => (
    <div className="space-y-4">
      <Text variant="h1">
        <span style={{ color: '#a3a3a3', fontWeight: 400 }}>The</span>
        <br />
        Machine
        <br />
        <span style={{ position: 'relative', display: 'inline-block' }}>
          Economy
          <span style={{
            position: 'absolute',
            bottom: '-4px',
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(135deg, #0ECCED, #025EC4)',
            borderRadius: '2px'
          }} />
        </span>
      </Text>
      <Text variant="body" color="muted" style={{ maxWidth: '500px' }}>
        Infrastructure for autonomous transactions between AI agents, robotics, and IoT systems.
      </Text>
    </div>
  ),
}
