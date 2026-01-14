import type { Meta, StoryObj } from '@storybook/react-vite'

const IntroductionPage = () => (
  <div className="p-6 max-w-4xl">
    <div className="mb-8">
      <img src="/qusd-logo-lockup-dark.svg" alt="QUSD" className="h-12 mb-6" />
      <h1 className="font-['Space_Mono'] text-4xl font-bold mb-2">QUSD Design System</h1>
      <p className="text-lg text-[#737373]">
        The foundation for building consistent, high-quality interfaces for the machine economy.
      </p>
    </div>

    <section className="mb-12">
      <h2 className="font-['Space_Mono'] text-2xl font-bold mb-4">Philosophy</h2>
      <p className="text-[#737373] mb-6">
        The QUSD design language reflects our core identity: <strong className="text-[#0a0a0a]">precision</strong>,
        <strong className="text-[#0a0a0a]"> transparency</strong>, and
        <strong className="text-[#0a0a0a]"> technical sophistication</strong>.
        We build for autonomous systems that demand clarity and reliability.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {[
          { title: 'Technical Clarity', desc: 'Every element communicates function. No decoration without purpose.' },
          { title: 'Machine-Native', desc: 'Interfaces designed for both human and agent interaction.' },
          { title: 'Systematic Consistency', desc: 'Tokens and patterns that scale predictably.' },
          { title: 'Accessible by Default', desc: 'Readable, focusable, and navigable for everyone.' },
        ].map((principle) => (
          <div key={principle.title} className="p-4 border border-[#e5e5e5] rounded-2xl">
            <h3 className="font-['Space_Mono'] font-bold mb-1">{principle.title}</h3>
            <p className="text-sm text-[#737373]">{principle.desc}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="mb-12">
      <h2 className="font-['Space_Mono'] text-2xl font-bold mb-4">Quick Start</h2>
      <div className="bg-[#0a0a0a] rounded-2xl p-6 overflow-x-auto">
        <pre className="font-['Space_Mono'] text-sm text-[#e5e5e5]">
{`import { Button, Card, Text, tokens } from '@/design-system'

function Example() {
  return (
    <Card variant="default" hoverable>
      <Text variant="h3">Hello QUSD</Text>
      <Text variant="body" color="muted">
        Building the machine economy.
      </Text>
      <Button variant="primary">Get Started</Button>
    </Card>
  )
}`}
        </pre>
      </div>
    </section>

    <section className="mb-12">
      <h2 className="font-['Space_Mono'] text-2xl font-bold mb-4">Structure</h2>
      <div className="bg-[#fafaf9] rounded-2xl p-6 border border-[#e5e5e5]">
        <pre className="font-['Space_Mono'] text-sm text-[#737373]">
{`src/design-system/
├── tokens.ts          # Design tokens (colors, typography, spacing)
├── components/        # Primitive components
│   ├── Button.tsx
│   ├── Badge.tsx
│   ├── Card.tsx
│   ├── Text.tsx
│   └── Input.tsx
├── docs/              # Documentation (stories)
└── index.ts           # Public exports`}
        </pre>
      </div>
    </section>

    <section>
      <h2 className="font-['Space_Mono'] text-2xl font-bold mb-4">Brand Guidelines Integration</h2>
      <p className="text-[#737373] mb-4">
        This system is built on the <strong className="text-[#0a0a0a]">QUSD Brand Guidelines 2025</strong>, incorporating:
      </p>
      <ul className="space-y-2 text-[#737373]">
        <li className="flex items-center gap-2">
          <span className="w-6 h-6 bg-gradient-to-r from-[#0ECCED] to-[#025EC4] rounded-full flex items-center justify-center text-white text-xs">1</span>
          <span><strong className="text-[#0a0a0a]">B1 Overview</strong> — Core identity and vision</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="w-6 h-6 bg-gradient-to-r from-[#0ECCED] to-[#025EC4] rounded-full flex items-center justify-center text-white text-xs">2</span>
          <span><strong className="text-[#0a0a0a]">B2 Identity Profiles</strong> — Logo usage and variations</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="w-6 h-6 bg-gradient-to-r from-[#0ECCED] to-[#025EC4] rounded-full flex items-center justify-center text-white text-xs">3</span>
          <span><strong className="text-[#0a0a0a]">B3 Typography</strong> — Space Mono + DM Sans type system</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="w-6 h-6 bg-gradient-to-r from-[#0ECCED] to-[#025EC4] rounded-full flex items-center justify-center text-white text-xs">4</span>
          <span><strong className="text-[#0a0a0a]">B4 Design Replication</strong> — Patterns and visual elements</span>
        </li>
      </ul>
    </section>
  </div>
)

const meta = {
  title: 'Design System/Introduction',
  component: IntroductionPage,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'white' },
  },
} satisfies Meta<typeof IntroductionPage>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {}
