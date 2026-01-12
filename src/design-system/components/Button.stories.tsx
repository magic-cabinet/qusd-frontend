import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'

const meta = {
  title: 'Design System/Primitives/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'light' },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    isLoading: {
      control: 'boolean',
      description: 'Show loading spinner',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable interactions',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Expand to full container width',
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Start Building',
    variant: 'primary',
    size: 'md',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Learn More',
    variant: 'secondary',
    size: 'md',
  },
}

export const Outline: Story = {
  args: {
    children: 'Read Documentation',
    variant: 'outline',
    size: 'md',
  },
}

export const Ghost: Story = {
  args: {
    children: 'Cancel',
    variant: 'ghost',
    size: 'md',
  },
}

export const WithArrow: Story = {
  args: {
    children: 'Launch App',
    variant: 'primary',
    rightIcon: '→',
  },
}

export const Loading: Story = {
  args: {
    children: 'Processing',
    variant: 'primary',
    isLoading: true,
  },
}

export const Disabled: Story = {
  args: {
    children: 'Unavailable',
    variant: 'primary',
    disabled: true,
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
      <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0a0a0a]">
        <Button variant="primary">Primary</Button>
        <Button variant="outline" style={{ borderColor: 'white', color: 'white' }}>Outline</Button>
      </div>
    </div>
  ),
}
