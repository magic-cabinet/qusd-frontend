import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  FlipGridToList,
  FlipCardExpand,
  FlipShuffle,
  FlipLogoMove,
  FlipFilter,
} from './plugins'

export default {
  title: 'GSAP/Plugins/Flip',
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'light' },
  },
} satisfies Meta

type Story = StoryObj

export const GridToList: Story = {
  name: 'Grid ↔ List Toggle',
  render: () => <FlipGridToList />,
}

export const CardExpand: Story = {
  name: 'Card Expand/Collapse',
  render: () => <FlipCardExpand />,
}

export const Shuffle: Story = {
  name: 'Shuffle Animation',
  render: () => <FlipShuffle />,
}

export const LogoMove: Story = {
  name: 'Logo Position Change',
  render: () => <FlipLogoMove />,
}

export const Filter: Story = {
  name: 'Filter Animation',
  render: () => <FlipFilter />,
}
