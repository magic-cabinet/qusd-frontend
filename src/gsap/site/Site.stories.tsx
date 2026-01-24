import type { Meta, StoryObj } from '@storybook/react'
import { CompositionVertical, CompositionWithHorizontal } from './Composition'
import { CompositionCinematic, CompositionMinimal, CompositionEnergetic, CompositionHexagonal, CompositionCinematicHorizontal } from './CompositionVariants'
import { GSAPHero } from './Hero'
import { GSAPFeatures } from './Features'
import { GSAPHowItWorks } from './HowItWorks'
import { GSAPMetrics } from './Metrics'
import { GSAPChains } from './Chains'
import { GSAPFooter } from './Footer'
import { GSAPWhitepaper } from './Whitepaper'

const meta: Meta = {
  title: 'GSAP/Site',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

// === MAIN COMPOSITIONS ===

export const VerticalOnly: StoryObj = {
  name: '1. Vertical (Original)',
  render: () => <CompositionVertical />,
  parameters: {
    docs: {
      description: {
        story: 'Original vertical scroll composition. Clean scroll-triggered reveals with network visualization.',
      },
    },
  },
}

export const Cinematic: StoryObj = {
  name: '2. Cinematic',
  render: () => <CompositionCinematic />,
  parameters: {
    docs: {
      description: {
        story: 'Deep parallax layers, slow scrub animations, cinematic reveals with blur effects. Heavy atmospheric feel.',
      },
    },
  },
}

export const Minimal: StoryObj = {
  name: '3. Minimal',
  render: () => <CompositionMinimal />,
  parameters: {
    docs: {
      description: {
        story: 'Typography-focused with line draws, clean word reveals, and lots of whitespace. Elegant and restrained.',
      },
    },
  },
}

export const Energetic: StoryObj = {
  name: '4. Energetic',
  render: () => <CompositionEnergetic />,
  parameters: {
    docs: {
      description: {
        story: 'Bouncy elastic animations, fast staggers, gradient hero, floating shapes. Dynamic and playful.',
      },
    },
  },
}

export const Hexagonal: StoryObj = {
  name: '5. Hexagonal',
  render: () => <CompositionHexagonal />,
  parameters: {
    docs: {
      description: {
        story: 'Tech-aesthetic with hexagonal grid patterns, multi-layer parallax, and rotating hex elements.',
      },
    },
  },
}

export const WithHorizontalScroll: StoryObj = {
  name: '6. With Horizontal Section',
  render: () => <CompositionWithHorizontal />,
  parameters: {
    docs: {
      description: {
        story: 'Original composition plus a horizontal scroll "How It Works" section.',
      },
    },
  },
}

export const CinematicHorizontal: StoryObj = {
  name: '7. Cinematic + Horizontal + Logo (Best)',
  render: () => <CompositionCinematicHorizontal />,
  parameters: {
    docs: {
      description: {
        story: 'The ultimate mix: cinematic parallax with blur reveals, horizontal scroll "How It Works", and floating glowing logo throughout. Deep atmospheric feel with scrub animations.',
      },
    },
  },
}

// === INDIVIDUAL SECTIONS (OLD) ===

export const LegacyHero: StoryObj = {
  name: 'Legacy: Hero',
  render: () => <GSAPHero />,
  parameters: {
    docs: {
      description: {
        story: 'Original hero section with character-by-character heading animation.',
      },
    },
  },
}

export const LegacyFeatures: StoryObj = {
  name: 'Legacy: Features',
  render: () => <GSAPFeatures />,
  parameters: {
    docs: {
      description: {
        story: 'Original features section with highlight underline animations.',
      },
    },
  },
}

export const LegacyHowItWorks: StoryObj = {
  name: 'Legacy: How It Works',
  render: () => <GSAPHowItWorks />,
  parameters: {
    docs: {
      description: {
        story: 'Original code block section with typewriter effect.',
      },
    },
  },
}

export const LegacyMetrics: StoryObj = {
  name: 'Legacy: Metrics',
  render: () => <GSAPMetrics />,
  parameters: {
    docs: {
      description: {
        story: 'Original open source section with circuit background.',
      },
    },
  },
}

export const LegacyChains: StoryObj = {
  name: 'Legacy: Chains',
  render: () => <GSAPChains />,
  parameters: {
    docs: {
      description: {
        story: 'Original chains section with network visualization.',
      },
    },
  },
}

export const LegacyFooter: StoryObj = {
  name: 'Legacy: Footer',
  render: () => <GSAPFooter />,
  parameters: {
    docs: {
      description: {
        story: 'Original footer with logo animation.',
      },
    },
  },
}

// === WHITEPAPER ===

export const Whitepaper: StoryObj = {
  render: () => <GSAPWhitepaper />,
  parameters: {
    docs: {
      description: {
        story: 'Whitepaper page with token economics, reserve composition, and roadmap.',
      },
    },
  },
}
