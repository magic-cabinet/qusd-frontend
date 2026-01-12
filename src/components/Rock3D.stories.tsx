import type { Meta, StoryObj } from '@storybook/react-vite'
import Rock3D, { Rock3DCityscape } from './Rock3D'

const meta = {
  title: 'Components/Rock3D',
  component: Rock3D,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'cityscape', 'floating', 'hero', 'minimal'],
    },
    environmentPreset: {
      control: 'select',
      options: ['sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'],
    },
    autoRotate: { control: 'boolean' },
    rotationSpeed: { control: { type: 'range', min: 0.1, max: 2, step: 0.1 } },
    showShadow: { control: 'boolean' },
    interactive: { control: 'boolean' },
  },
} satisfies Meta<typeof Rock3D>

export default meta
type Story = StoryObj<typeof meta>

// Default floating variant
export const Default: Story = {
  args: {
    variant: 'default',
    autoRotate: true,
    rotationSpeed: 0.3,
    showShadow: true,
    environmentPreset: 'city',
    interactive: true,
  },
  render: (args) => (
    <div className="h-screen bg-[#fafaf9]">
      <Rock3D {...args} className="w-full h-full" />
    </div>
  ),
}

// Floating variant with gentle motion
export const Floating: Story = {
  args: {
    variant: 'floating',
    autoRotate: true,
    rotationSpeed: 0.2,
    showShadow: true,
    environmentPreset: 'studio',
    interactive: true,
  },
  render: (args) => (
    <div className="h-screen bg-gradient-to-b from-[#030812] to-[#020764]">
      <Rock3D {...args} className="w-full h-full" />
    </div>
  ),
}

// Hero variant - prominent display
export const Hero: Story = {
  args: {
    variant: 'hero',
    autoRotate: true,
    rotationSpeed: 0.15,
    showShadow: true,
    environmentPreset: 'city',
    interactive: true,
  },
  render: (args) => (
    <div className="h-screen bg-[#fafaf9] flex items-center justify-center">
      <div className="w-[600px] h-[600px]">
        <Rock3D {...args} className="w-full h-full" />
      </div>
    </div>
  ),
}

// Minimal variant - small display
export const Minimal: Story = {
  args: {
    variant: 'minimal',
    autoRotate: true,
    rotationSpeed: 0.5,
    showShadow: false,
    environmentPreset: 'studio',
    interactive: false,
  },
  render: (args) => (
    <div className="h-screen bg-white flex items-center justify-center">
      <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-[#e5e5e5]">
        <Rock3D {...args} className="w-full h-full" />
      </div>
    </div>
  ),
}

// Immersive cityscape - like being in a city made of rocks
export const CityscapeImmersive: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <div className="h-screen w-full">
      <Rock3DCityscape className="w-full h-full" />
      {/* Overlay UI elements */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8">
        <div>
          <h1 className="font-['Orbitron'] text-5xl font-bold text-white mb-2">
            QUSD
          </h1>
          <p className="font-['Roboto'] text-white/60 text-lg">
            The foundation of autonomous finance
          </p>
        </div>
        <div className="text-center">
          <div className="font-['Space_Mono'] text-8xl font-bold text-white/90 mb-2">
            $1
          </div>
          <div className="font-['Roboto'] text-[#0ECCED] uppercase tracking-widest text-sm">
            USD PEG
          </div>
        </div>
      </div>
    </div>
  ),
}

// Dark mode presentation
export const DarkMode: Story = {
  args: {
    variant: 'hero',
    autoRotate: true,
    rotationSpeed: 0.2,
    showShadow: true,
    environmentPreset: 'night',
    interactive: true,
  },
  render: (args) => (
    <div className="h-screen bg-[#030812] relative">
      <Rock3D {...args} className="w-full h-full" />
      {/* Glow effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(14, 204, 237, 0.1) 0%, transparent 50%)',
        }}
      />
    </div>
  ),
}

// Sunset presentation
export const Sunset: Story = {
  args: {
    variant: 'hero',
    autoRotate: true,
    rotationSpeed: 0.1,
    showShadow: true,
    environmentPreset: 'sunset',
    interactive: true,
  },
  render: (args) => (
    <div className="h-screen bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      <Rock3D {...args} className="w-full h-full" />
    </div>
  ),
}

// Grid of variants comparison
export const AllVariants: Story = {
  render: () => (
    <div className="min-h-screen bg-[#030812] p-8">
      <h1 className="font-['Orbitron'] text-3xl font-bold text-white mb-8">
        Rock3D Variants
      </h1>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
        {(['default', 'floating', 'hero', 'minimal'] as const).map((variant) => (
          <div key={variant} className="aspect-square bg-[#0a0a1a] rounded-2xl overflow-hidden relative">
            <Rock3D
              variant={variant}
              className="w-full h-full"
              autoRotate={true}
              rotationSpeed={0.3}
              showShadow={variant !== 'minimal'}
              environmentPreset="city"
              interactive={false}
            />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="font-['Space_Mono'] text-xs text-[#0ECCED] uppercase tracking-wider bg-black/50 px-3 py-1 rounded-full">
                {variant}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
}

// In context - showing how it appears in WhatIsQUSD
export const InContext: Story = {
  render: () => (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-md mx-auto">
        <h2 className="font-['Orbitron'] text-2xl font-bold text-[#030812] mb-6 text-center">
          As seen in WhatIsQUSD section
        </h2>
        <div className="aspect-square relative">
          {/* Outer glow ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(14, 204, 237, 0.1) 0%, transparent 70%)',
            }}
          />
          {/* Rock container */}
          <div className="absolute inset-[15%] rounded-full overflow-hidden"
            style={{
              border: '2px solid transparent',
              background: 'linear-gradient(#fafaf9, #fafaf9) padding-box, linear-gradient(135deg, #0ECCED, #025EC4) border-box',
            }}
          >
            <Rock3D
              variant="floating"
              className="w-full h-full"
              autoRotate={true}
              rotationSpeed={0.2}
              showShadow={false}
              environmentPreset="city"
              interactive={true}
            />
          </div>
          {/* Label */}
          <div className="absolute bottom-[20%] left-0 right-0 text-center">
            <span className="font-['Space_Mono'] text-xs text-[#737373] uppercase tracking-wider">
              USD PEG
            </span>
          </div>
        </div>
      </div>
    </div>
  ),
}

// Extreme zoom - you're inside the rock structure
export const ExtremeZoom: Story = {
  render: () => (
    <div className="h-screen w-full relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #030812 0%, #020764 30%, #043780 60%, #025EC4 100%)',
        }}
      />
      <div className="absolute inset-0">
        <Rock3D
          variant="cityscape"
          className="w-full h-full"
          autoRotate={true}
          rotationSpeed={0.05}
          showShadow={false}
          environmentPreset="night"
          interactive={true}
        />
      </div>
      {/* Atmospheric overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at bottom, rgba(14, 204, 237, 0.2) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(0deg, rgba(3, 8, 18, 0.8) 0%, transparent 30%, transparent 70%, rgba(3, 8, 18, 0.5) 100%)',
        }}
      />
      {/* UI overlay */}
      <div className="absolute inset-0 pointer-events-none flex items-end justify-center pb-16">
        <div className="text-center">
          <div className="font-['Orbitron'] text-6xl md:text-8xl font-bold text-white mb-4 drop-shadow-2xl">
            QUSD
          </div>
          <div className="font-['Roboto'] text-[#0ECCED] uppercase tracking-[0.3em] text-sm">
            Building the foundations of autonomous finance
          </div>
        </div>
      </div>
    </div>
  ),
}
