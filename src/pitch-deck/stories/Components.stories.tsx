import type { Meta, StoryObj } from '@storybook/react-vite'
import { Slide } from '../components/Slide'
import { SlideTitle } from '../components/SlideTitle'
import { ContentCard } from '../components/ContentCard'
import { Badge } from '../components/Badge'
import { Timeline } from '../components/Timeline'
import { Grid } from '../components/Grid'
import { BulletList } from '../components/BulletList'

// Badge Stories
const BadgeShowcase = () => (
  <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Badge variant="blue">Primary Badge</Badge>
      <Badge variant="white">White Badge</Badge>
      <Badge variant="outlined">Outlined Badge</Badge>
      <Badge variant="dark">Dark Badge</Badge>
    </div>
    <div style={{ display: 'flex', gap: '12px' }}>
      <Badge variant="blue" arrow>With Arrow</Badge>
      <Badge variant="outlined" arrow>CTA Badge</Badge>
    </div>
  </div>
)

export const Badges: StoryObj = {
  render: () => <BadgeShowcase />,
}

// Card Stories
const CardShowcase = () => (
  <div style={{ padding: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', maxWidth: '800px' }}>
    <ContentCard variant="white" title="White Card" icon="📊">
      Default card style with shadow and border. Great for content on light backgrounds.
    </ContentCard>
    <ContentCard variant="blue" title="Blue Card" icon="🔒">
      Primary emphasis card. White text on blue background for key points.
    </ContentCard>
    <ContentCard variant="dark" title="Dark Card" icon="⚡">
      Dark blue card for high contrast sections and dark-themed slides.
    </ContentCard>
    <ContentCard variant="outlined" title="Outlined Card" icon="🎯">
      Minimal style with just a border. Good for secondary content.
    </ContentCard>
  </div>
)

export const Cards: StoryObj = {
  render: () => <CardShowcase />,
}

// Timeline Stories
const TimelineShowcase = () => (
  <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '48px', maxWidth: '800px' }}>
    <div>
      <h3 style={{ marginBottom: '24px', fontWeight: 600 }}>Horizontal Timeline</h3>
      <Timeline
        direction="horizontal"
        items={[
          { year: 'Q1 2025', label: 'Protocol Launch', description: 'Mainnet deployment', active: true },
          { year: 'Q2 2025', label: 'Agent SDK', description: 'Developer tools' },
          { year: 'Q3 2025', label: 'Multi-Chain', description: 'Cross-chain expansion' },
          { year: 'Q4 2025', label: 'Enterprise', description: 'B2B integrations' },
        ]}
      />
    </div>
    <div>
      <h3 style={{ marginBottom: '24px', fontWeight: 600 }}>Vertical Timeline</h3>
      <Timeline
        direction="vertical"
        items={[
          { year: '2024', label: 'Research & Development', description: 'Protocol design and testing', active: true },
          { year: '2025', label: 'Public Launch', description: 'Mainnet and token generation' },
          { year: '2026', label: 'Scale', description: 'Global adoption push' },
        ]}
      />
    </div>
  </div>
)

export const Timelines: StoryObj = {
  render: () => <TimelineShowcase />,
}

// Grid Stories
const GridShowcase = () => (
  <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
    <div>
      <h3 style={{ marginBottom: '16px', fontWeight: 600 }}>2 Column Grid</h3>
      <Grid columns={2} gap="md">
        <ContentCard variant="blue" title="Feature 1">Gasless transactions</ContentCard>
        <ContentCard variant="blue" title="Feature 2">Agent-native design</ContentCard>
      </Grid>
    </div>
    <div>
      <h3 style={{ marginBottom: '16px', fontWeight: 600 }}>4 Column Grid</h3>
      <Grid columns={4} gap="sm">
        <ContentCard variant="white" title="01">Item</ContentCard>
        <ContentCard variant="white" title="02">Item</ContentCard>
        <ContentCard variant="white" title="03">Item</ContentCard>
        <ContentCard variant="white" title="04">Item</ContentCard>
      </Grid>
    </div>
  </div>
)

export const Grids: StoryObj = {
  render: () => <GridShowcase />,
}

// Bullet List Stories
const BulletListShowcase = () => (
  <div style={{ padding: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', maxWidth: '800px' }}>
    <div>
      <h4 style={{ marginBottom: '16px', fontWeight: 600 }}>Default Bullets</h4>
      <BulletList
        variant="default"
        items={[
          'Gasless transactions via EIP-2612',
          'Multi-chain native deployment',
          'Agent identity verification',
        ]}
      />
    </div>
    <div>
      <h4 style={{ marginBottom: '16px', fontWeight: 600 }}>Check Marks</h4>
      <BulletList
        variant="check"
        items={[
          'SOC 2 Type II Certified',
          'Audited by Trail of Bits',
          'Bug bounty program active',
        ]}
      />
    </div>
    <div>
      <h4 style={{ marginBottom: '16px', fontWeight: 600 }}>Arrows</h4>
      <BulletList
        variant="arrow"
        items={[
          'Sign payment intent',
          'Submit to facilitator',
          'Receive confirmation',
        ]}
      />
    </div>
    <div>
      <h4 style={{ marginBottom: '16px', fontWeight: 600 }}>Numbered</h4>
      <BulletList
        variant="number"
        items={[
          'Connect wallet',
          'Approve QUSD spend',
          'Execute transaction',
        ]}
      />
    </div>
  </div>
)

export const BulletLists: StoryObj = {
  render: () => <BulletListShowcase />,
}

// Titles Stories
const TitleShowcase = () => (
  <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <SlideTitle size="hero">Hero Title</SlideTitle>
    <SlideTitle size="title" underline>Section Title with Underline</SlideTitle>
    <SlideTitle size="section">Subsection Title</SlideTitle>
    <SlideTitle size="subtitle">Subtitle Text</SlideTitle>
    <SlideTitle size="title" caps>ALL CAPS TITLE</SlideTitle>
  </div>
)

export const Titles: StoryObj = {
  render: () => <TitleShowcase />,
}

const meta = {
  title: 'Pitch Deck/Components',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'light' },
  },
} satisfies Meta

export default meta
