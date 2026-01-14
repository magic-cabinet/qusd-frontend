import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: [
    // Design System docs first
    '../src/design-system/docs/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/design-system/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    // Pitch Deck
    '../src/pitch-deck/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    // Theme Variations
    '../src/themes/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    // Whitepaper
    '../src/whitepaper/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    // Page components
    '../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@chromatic-com/storybook',
  ],
  framework: '@storybook/react-vite',
  viteFinal: async (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': resolve(__dirname, '../src'),
        },
      },
    });
  },
  docs: {},
};

export default config;