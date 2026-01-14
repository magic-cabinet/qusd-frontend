import type { Meta, StoryObj } from '@storybook/react-vite'
import { Slide } from '../components/Slide'
import { SlideTitle } from '../components/SlideTitle'
import { ContentCard } from '../components/ContentCard'
import { Badge } from '../components/Badge'
import { Timeline } from '../components/Timeline'
import { Grid } from '../components/Grid'
import { colors, typography } from '../tokens'

// Title Slide
const TitleSlide = () => (
  <Slide variant="default" showHeader={true}>
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', paddingTop: '40px' }}>
      <div style={{ maxWidth: '600px' }}>
        <img src="/qusd-logo-lockup-dark.svg" alt="QUSD" style={{ height: '48px', marginBottom: '32px' }} />

        <h1 style={{
          fontFamily: typography.fontFamily.title,
          fontSize: '42px',
          fontWeight: 700,
          lineHeight: 1.1,
          color: colors.text.dark,
          marginBottom: '24px',
        }}>
          The Financial Operating System for Intelligent Machines
        </h1>

        <p style={{
          fontFamily: typography.fontFamily.body,
          fontSize: '16px',
          color: colors.text.muted,
          marginBottom: '32px',
          lineHeight: 1.6,
        }}>
          Infrastructure for autonomous transactions between AI agents, robotics, and IoT systems.
        </p>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Badge variant="blue">Series A</Badge>
          <Badge variant="outlined">2025</Badge>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: '24px', right: '50px' }}>
        <Badge variant="white">contact@qusd.io</Badge>
      </div>
    </div>
  </Slide>
)

// Problem Slide
const ProblemSlide = () => (
  <Slide variant="default" showHeader={true}>
    <SlideTitle size="title" underline>The Problem</SlideTitle>
    <p style={{
      fontFamily: typography.fontFamily.body,
      fontSize: '14px',
      color: colors.text.muted,
      marginBottom: '32px',
    }}>
      Current payment infrastructure wasn't built for machines
    </p>

    <Grid columns={2} gap="lg">
      <ContentCard variant="white" title="Gas Fees" icon="⛽">
        Every transaction requires ETH for gas, creating friction for autonomous systems that can't manage multiple tokens.
      </ContentCard>
      <ContentCard variant="white" title="Identity" icon="🔐">
        No native support for machine identity verification. DIDs and agent credentials aren't first-class citizens.
      </ContentCard>
      <ContentCard variant="white" title="Speed" icon="⏱️">
        Block confirmation times are too slow for real-time machine-to-machine commerce.
      </ContentCard>
      <ContentCard variant="white" title="Fragmentation" icon="🔗">
        Different chains, different tokens, different standards. No unified layer for the machine economy.
      </ContentCard>
    </Grid>
  </Slide>
)

// Solution Slide
const SolutionSlide = () => (
  <Slide variant="dark" showHeader={true}>
    <SlideTitle size="title" underline light>Our Solution</SlideTitle>
    <p style={{
      fontFamily: typography.fontFamily.body,
      fontSize: '14px',
      color: 'rgba(255,255,255,0.6)',
      marginBottom: '32px',
    }}>
      A machine-native stablecoin built for the autonomous economy
    </p>

    <Grid columns={2} gap="lg">
      <div>
        <ContentCard variant="blue" title="Gasless Transactions">
          Users pay with QUSD only. Facilitators handle gas via EIP-2612 permit signatures.
        </ContentCard>
        <div style={{ height: '24px' }} />
        <ContentCard variant="blue" title="Agent-Native Design">
          Built-in DID verification, programmable policies, and machine identity at the protocol level.
        </ContentCard>
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: '24px',
        padding: '32px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: typography.fontFamily.title,
            fontSize: '72px',
            fontWeight: 700,
            background: `linear-gradient(135deg, ${colors.accent.cyan}, ${colors.primary.blue})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            $1
          </div>
          <div style={{
            fontFamily: typography.fontFamily.mono,
            fontSize: '12px',
            color: 'rgba(255,255,255,0.6)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}>
            USD Peg
          </div>
        </div>
      </div>
    </Grid>
  </Slide>
)

// Roadmap Slide
const RoadmapSlide = () => (
  <Slide variant="default" showHeader={true}>
    <SlideTitle size="title" underline>Roadmap</SlideTitle>
    <p style={{
      fontFamily: typography.fontFamily.body,
      fontSize: '14px',
      color: colors.text.muted,
      marginBottom: '48px',
    }}>
      Our path to becoming the standard for machine payments
    </p>

    <Timeline
      direction="horizontal"
      items={[
        { year: 'Q1 2025', label: 'Mainnet Launch', description: 'Protocol deployment on Ethereum & Base', active: true },
        { year: 'Q2 2025', label: 'Agent SDK', description: 'Developer tools & documentation' },
        { year: 'Q3 2025', label: 'Multi-Chain', description: 'Solana & Arbitrum expansion' },
        { year: 'Q4 2025', label: 'Enterprise', description: 'B2B partnerships & integrations' },
      ]}
    />

    <div style={{ marginTop: '48px' }}>
      <Grid columns={4} gap="md">
        <ContentCard variant="blue">
          <div style={{ fontSize: '32px', fontWeight: 700, marginBottom: '4px' }}>$50M</div>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>TVL Target</div>
        </ContentCard>
        <ContentCard variant="blue">
          <div style={{ fontSize: '32px', fontWeight: 700, marginBottom: '4px' }}>100K</div>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>Active Agents</div>
        </ContentCard>
        <ContentCard variant="blue">
          <div style={{ fontSize: '32px', fontWeight: 700, marginBottom: '4px' }}>4+</div>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>Chains</div>
        </ContentCard>
        <ContentCard variant="blue">
          <div style={{ fontSize: '32px', fontWeight: 700, marginBottom: '4px' }}>50+</div>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>Integrations</div>
        </ContentCard>
      </Grid>
    </div>
  </Slide>
)

// Team Slide
const TeamSlide = () => (
  <Slide variant="default" showHeader={true}>
    <SlideTitle size="title" underline>Team</SlideTitle>
    <p style={{
      fontFamily: typography.fontFamily.body,
      fontSize: '14px',
      color: colors.text.muted,
      marginBottom: '32px',
    }}>
      Experienced builders from leading crypto and AI companies
    </p>

    <Grid columns={3} gap="lg">
      {[
        { name: 'Alex Chen', role: 'CEO', bg: 'Ex-Coinbase, Stanford CS' },
        { name: 'Sarah Kim', role: 'CTO', bg: 'Ex-OpenAI, MIT PhD' },
        { name: 'Marcus Johnson', role: 'CPO', bg: 'Ex-Stripe, Product Lead' },
      ].map((person) => (
        <ContentCard key={person.name} variant="white">
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: colors.primary.blue,
            marginBottom: '16px',
          }} />
          <div style={{ fontWeight: 700, fontSize: '18px', marginBottom: '4px' }}>{person.name}</div>
          <Badge variant="outlined" style={{ marginBottom: '8px' }}>{person.role}</Badge>
          <div style={{ fontSize: '13px', color: colors.text.muted }}>{person.bg}</div>
        </ContentCard>
      ))}
    </Grid>
  </Slide>
)

// Ask Slide
const AskSlide = () => (
  <Slide variant="dark" showHeader={true}>
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', textAlign: 'center', paddingTop: '20px' }}>
      <SlideTitle size="hero" light>$15M Series A</SlideTitle>
      <p style={{
        fontFamily: typography.fontFamily.body,
        fontSize: '18px',
        color: 'rgba(255,255,255,0.7)',
        marginBottom: '48px',
        maxWidth: '500px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        Building the financial infrastructure for the autonomous economy
      </p>

      <Grid columns={3} gap="lg" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: typography.fontFamily.title, fontSize: '36px', fontWeight: 700, color: 'white' }}>40%</div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>Engineering</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: typography.fontFamily.title, fontSize: '36px', fontWeight: 700, color: 'white' }}>30%</div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>Growth</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: typography.fontFamily.title, fontSize: '36px', fontWeight: 700, color: 'white' }}>30%</div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>Operations</div>
        </div>
      </Grid>

      <div style={{ marginTop: '48px' }}>
        <Badge variant="blue" arrow>Schedule a Call</Badge>
      </div>
    </div>
  </Slide>
)

const meta = {
  title: 'Pitch Deck/Example Slides',
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
  },
} satisfies Meta

export default meta

export const Title: StoryObj = {
  render: () => <TitleSlide />,
}

export const Problem: StoryObj = {
  render: () => <ProblemSlide />,
}

export const Solution: StoryObj = {
  render: () => <SolutionSlide />,
}

export const Roadmap: StoryObj = {
  render: () => <RoadmapSlide />,
}

export const Team: StoryObj = {
  render: () => <TeamSlide />,
}

export const Ask: StoryObj = {
  render: () => <AskSlide />,
}
