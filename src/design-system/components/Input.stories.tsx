import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './Input'

const meta = {
  title: 'Design System/Primitives/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'light' },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Input size',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
    hint: {
      control: 'text',
      description: 'Hint text',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable input',
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter value...',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
}

export const WithLabel: Story = {
  args: {
    label: 'Wallet Address',
    placeholder: '0x...',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
}

export const WithHint: Story = {
  args: {
    label: 'Amount',
    placeholder: '0.00',
    hint: 'Enter amount in QUSD',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
}

export const WithError: Story = {
  args: {
    label: 'Amount',
    placeholder: '0.00',
    defaultValue: '-50',
    error: 'Amount must be positive',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
}

export const Disabled: Story = {
  args: {
    label: 'Locked Field',
    value: 'Cannot edit',
    disabled: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4" style={{ width: '320px' }}>
      <Input size="sm" placeholder="Small input" />
      <Input size="md" placeholder="Medium input" />
      <Input size="lg" placeholder="Large input" />
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4" style={{ width: '320px' }}>
      <Input
        label="Search"
        placeholder="Search transactions..."
        leftIcon={<span>🔍</span>}
      />
      <Input
        label="Amount"
        placeholder="0.00"
        rightIcon={<span style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px' }}>QUSD</span>}
      />
    </div>
  ),
}

export const FormExample: Story = {
  render: () => (
    <div className="space-y-4" style={{ width: '400px' }}>
      <Input
        label="Recipient Address"
        placeholder="0x..."
        hint="Enter the wallet address to send QUSD"
      />
      <Input
        label="Amount"
        placeholder="0.00"
        rightIcon={<span style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px' }}>QUSD</span>}
      />
      <Input
        label="Memo (Optional)"
        placeholder="Add a note..."
      />
    </div>
  ),
}
