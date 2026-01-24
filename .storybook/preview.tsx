import type { Preview } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import '../src/index.css'

const preview: Preview = {
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#fafaf9' },
        { name: 'dark', value: '#030812' },
        { name: 'white', value: '#ffffff' },
      ],
    },
    layout: 'padded',
    options: {
      storySort: {
        order: [
          'Design System',
          ['Introduction', 'Colors', 'Typography', 'Primitives'],
          'Components',
        ],
      },
    },
  },
  tags: ['autodocs'],
}

export default preview
