import type { Meta, StoryObj } from '@storybook/react-vite'
import { typography } from '../tokens'

const TypeScale = () => (
  <div className="space-y-6">
    {Object.entries(typography.fontSize).reverse().map(([name, size]) => (
      <div key={name} className="flex items-baseline gap-4 border-b border-[#e5e5e5] pb-4">
        <span className="font-['Space_Mono'] text-xs text-[#a3a3a3] w-12">{name}</span>
        <span className="font-['Space_Mono'] text-xs text-[#a3a3a3] w-16">{size}</span>
        <span style={{ fontSize: size, fontFamily: typography.fontFamily.mono, fontWeight: 700 }}>
          QUSD Protocol
        </span>
      </div>
    ))}
  </div>
)

const TypographyPage = () => (
  <div className="p-6 max-w-4xl">
    <h1 className="font-['Space_Mono'] text-4xl font-bold mb-2">Typography</h1>
    <p className="text-[#737373] mb-8">
      QUSD uses a dual-typeface system that balances technical precision with readability.
    </p>

    <section className="mb-12">
      <h2 className="font-['Space_Mono'] text-2xl font-bold mb-6">Typefaces</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 border border-[#e5e5e5] rounded-2xl">
          <h3 className="font-['Space_Mono'] text-lg font-bold mb-2">Space Mono</h3>
          <p className="text-sm text-[#737373] mb-4">Headlines, technical elements, annotations, buttons</p>
          <div style={{ fontFamily: typography.fontFamily.mono }}>
            <div className="text-3xl font-bold mb-2">Bold 700</div>
            <div className="text-2xl">Regular 400</div>
          </div>
        </div>

        <div className="p-6 border border-[#e5e5e5] rounded-2xl">
          <h3 className="font-['Space_Mono'] text-lg font-bold mb-2">DM Sans</h3>
          <p className="text-sm text-[#737373] mb-4">Body text, descriptions, UI labels</p>
          <div style={{ fontFamily: typography.fontFamily.sans }}>
            <div className="text-3xl font-bold mb-2">Bold 700</div>
            <div className="text-2xl">Regular 400</div>
          </div>
        </div>
      </div>
    </section>

    <section className="mb-12">
      <h2 className="font-['Space_Mono'] text-2xl font-bold mb-6">Type Scale</h2>
      <TypeScale />
    </section>

    <section className="mb-12">
      <h2 className="font-['Space_Mono'] text-2xl font-bold mb-6">Examples</h2>

      <div className="space-y-8">
        <div>
          <span className="annotation mb-2 block">Heading</span>
          <h1 style={{
            fontFamily: typography.fontFamily.mono,
            fontSize: typography.fontSize['7xl'],
            fontWeight: 700,
            lineHeight: typography.lineHeight.tight
          }}>
            Machine Economy
          </h1>
        </div>

        <div>
          <span className="annotation mb-2 block">Body Text</span>
          <p style={{
            fontFamily: typography.fontFamily.sans,
            fontSize: typography.fontSize.md,
            lineHeight: typography.lineHeight.relaxed,
            color: '#737373',
            maxWidth: '600px'
          }}>
            QUSD is a machine-native stablecoin designed from the ground up for the autonomous
            economy—enabling seamless, instant, and verifiable transactions between AI agents,
            robotics systems, and IoT devices.
          </p>
        </div>

        <div>
          <span className="annotation mb-2 block">Annotation</span>
          <span style={{
            fontFamily: typography.fontFamily.mono,
            fontSize: typography.fontSize.xs,
            letterSpacing: typography.letterSpacing.wide,
            textTransform: 'uppercase',
            color: '#737373'
          }}>
            Protocol v1.0 • Status: Active • Network: Mainnet
          </span>
        </div>
      </div>
    </section>
  </div>
)

const meta = {
  title: 'Design System/Typography',
  component: TypographyPage,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'white' },
  },
} satisfies Meta<typeof TypographyPage>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {}
