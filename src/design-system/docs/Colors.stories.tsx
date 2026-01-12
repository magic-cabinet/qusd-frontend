import type { Meta, StoryObj } from '@storybook/react-vite'
import { colors } from '../tokens'

const ColorSwatch = ({ name, value, subtitle }: { name: string; value: string; subtitle?: string }) => (
  <div className="flex items-center gap-4 p-3 rounded-xl border border-[#e5e5e5]">
    <div
      className="w-12 h-12 rounded-lg border border-[#e5e5e5]"
      style={{ backgroundColor: value }}
    />
    <div>
      <div className="font-['Space_Mono'] text-sm font-bold">{name}</div>
      {subtitle && <div className="text-xs text-[#737373]">{subtitle}</div>}
      <div className="font-['Space_Mono'] text-xs text-[#a3a3a3]">{value}</div>
    </div>
  </div>
)

const ColorSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-8">
    <h3 className="font-['Space_Mono'] text-lg font-bold mb-4">{title}</h3>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {children}
    </div>
  </div>
)

const ColorsPage = () => (
  <div className="p-6 max-w-4xl">
    <h1 className="font-['Space_Mono'] text-4xl font-bold mb-2">Colors</h1>
    <p className="text-[#737373] mb-8">
      The QUSD color palette is designed for technical clarity and brand recognition.
    </p>

    <ColorSection title="Primary Brand">
      <ColorSwatch name="Cyan" value={colors.cyan.DEFAULT} subtitle="Primary accent" />
      <ColorSwatch name="Cyan Light" value={colors.cyan.light} />
      <ColorSwatch name="Blue" value={colors.blue.DEFAULT} subtitle="Secondary accent" />
      <ColorSwatch name="Blue Light" value={colors.blue.light} />
    </ColorSection>

    <div className="mb-8">
      <h3 className="font-['Space_Mono'] text-lg font-bold mb-4">Gradient</h3>
      <div
        className="h-20 rounded-2xl mb-2"
        style={{ background: colors.gradient.primary }}
      />
      <code className="font-['Space_Mono'] text-xs text-[#737373]">
        {colors.gradient.primary}
      </code>
    </div>

    <ColorSection title="Neutrals">
      <ColorSwatch name="Ink" value={colors.ink} subtitle="Primary text" />
      <ColorSwatch name="Paper" value={colors.paper} subtitle="Light backgrounds" />
      <ColorSwatch name="Dark" value={colors.dark.DEFAULT} subtitle="Dark mode base" />
      <ColorSwatch name="Dark Surface" value={colors.dark.surface} />
    </ColorSection>

    <ColorSection title="Gray Scale">
      <ColorSwatch name="Gray 50" value={colors.gray[50]} />
      <ColorSwatch name="Gray 100" value={colors.gray[100]} />
      <ColorSwatch name="Gray 200" value={colors.gray[200]} />
      <ColorSwatch name="Gray 300" value={colors.gray[300]} />
      <ColorSwatch name="Gray 400" value={colors.gray[400]} />
      <ColorSwatch name="Gray 500" value={colors.gray[500]} />
      <ColorSwatch name="Gray 600" value={colors.gray[600]} />
      <ColorSwatch name="Gray 700" value={colors.gray[700]} />
      <ColorSwatch name="Gray 800" value={colors.gray[800]} />
      <ColorSwatch name="Gray 900" value={colors.gray[900]} />
    </ColorSection>

    <ColorSection title="Semantic">
      <ColorSwatch name="Success" value={colors.success} subtitle="Positive states" />
      <ColorSwatch name="Warning" value={colors.warning} subtitle="Caution states" />
      <ColorSwatch name="Error" value={colors.error} subtitle="Error states" />
    </ColorSection>
  </div>
)

const meta = {
  title: 'Design System/Colors',
  component: ColorsPage,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'white' },
  },
} satisfies Meta<typeof ColorsPage>

export default meta
type Story = StoryObj<typeof meta>

export const AllColors: Story = {}
