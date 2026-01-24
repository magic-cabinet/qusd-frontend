import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { colors, typography, shadows } from '../../design-system/tokens'
import { Logo } from '../components/Logo'

// Shared styles
const containerStyle: React.CSSProperties = {
  background: colors.paper,
  minHeight: '500px',
  padding: '80px 60px',
  borderRadius: '24px',
  position: 'relative',
  overflow: 'hidden',
}

const headerStyle: React.CSSProperties = {
  fontFamily: typography.fontFamily.mono,
  fontSize: typography.fontSize['5xl'],
  fontWeight: typography.fontWeight.bold,
  lineHeight: typography.lineHeight.tight,
  color: colors.ink,
}

const bodyStyle: React.CSSProperties = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: typography.fontSize.lg,
  lineHeight: typography.lineHeight.relaxed,
  color: colors.gray[500],
  maxWidth: '500px',
}

const annotationStyle: React.CSSProperties = {
  fontFamily: typography.fontFamily.mono,
  fontSize: typography.fontSize.xs,
  letterSpacing: typography.letterSpacing.wide,
  textTransform: 'uppercase' as const,
  color: colors.gray[400],
}

// 1. Hero Entrance - Vertical cascade
export function HeroEntrance() {
  const annotationRef = useRef<HTMLSpanElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const accentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(accentRef.current,
      { scaleX: 0, transformOrigin: 'left' },
      { scaleX: 1, duration: 0.8 }
    )
    .fromTo(annotationRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5 },
      0.2
    )
    .fromTo(headingRef.current,
      { opacity: 0, y: 60, clipPath: 'inset(100% 0 0 0)' },
      { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 0.8 },
      0.4
    )
    .fromTo(bodyRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6 },
      0.7
    )
    .fromTo(ctaRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5 },
      0.9
    )
  }, [])

  return (
    <div style={containerStyle}>
      <div
        ref={accentRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '4px',
          height: '100%',
          background: colors.gradient.primary,
          transform: 'scaleX(0)',
        }}
      />

      <span ref={annotationRef} style={{ ...annotationStyle, opacity: 0, display: 'block', marginBottom: '24px' }}>
        Protocol v1.0
      </span>

      <h1 ref={headingRef} style={{ ...headerStyle, opacity: 0, marginBottom: '24px' }}>
        The stablecoin
        <br />
        <span style={{ color: colors.blue.DEFAULT }}>agents use</span>
      </h1>

      <p ref={bodyRef} style={{ ...bodyStyle, opacity: 0, marginBottom: '32px' }}>
        QUSD lets autonomous systems hold and spend dollars. AI agents, robots,
        IoT—anything that needs to pay without human approval.
      </p>

      <div ref={ctaRef} style={{ opacity: 0, display: 'flex', gap: '16px' }}>
        <button
          style={{
            padding: '12px 24px',
            background: colors.ink,
            color: 'white',
            fontFamily: typography.fontFamily.mono,
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.medium,
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Get Started
        </button>
        <button
          style={{
            padding: '12px 24px',
            background: 'transparent',
            color: colors.ink,
            fontFamily: typography.fontFamily.mono,
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.medium,
            borderRadius: '8px',
            border: `1px solid ${colors.gray[200]}`,
            cursor: 'pointer',
          }}
        >
          Documentation
        </button>
      </div>
    </div>
  )
}

// 2. Horizontal Slide - Elements slide in from sides
export function HorizontalSlide() {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(dividerRef.current,
      { scaleY: 0, transformOrigin: 'top' },
      { scaleY: 1, duration: 0.8 }
    )
    .fromTo(leftRef.current,
      { opacity: 0, x: -80 },
      { opacity: 1, x: 0, duration: 0.8 },
      0.3
    )
    .fromTo(rightRef.current,
      { opacity: 0, x: 80 },
      { opacity: 1, x: 0, duration: 0.8 },
      0.3
    )
  }, [])

  return (
    <div style={{ ...containerStyle, display: 'flex', alignItems: 'center', gap: '60px' }}>
      <div ref={leftRef} style={{ flex: 1, opacity: 0 }}>
        <span style={{ ...annotationStyle, display: 'block', marginBottom: '16px' }}>
          Multi-Chain Native
        </span>
        <h2 style={{ ...headerStyle, fontSize: typography.fontSize['4xl'], marginBottom: '16px' }}>
          One interface.
          <br />
          Every chain.
        </h2>
      </div>

      <div
        ref={dividerRef}
        style={{
          width: '1px',
          height: '200px',
          background: colors.gray[200],
          transform: 'scaleY(0)',
        }}
      />

      <div ref={rightRef} style={{ flex: 1, opacity: 0 }}>
        <p style={bodyStyle}>
          Deploy on Ethereum, Base, Arbitrum, or Solana. Same API, same behavior,
          seamless cross-chain operations for your autonomous systems.
        </p>
        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
          {['ETH', 'BASE', 'ARB', 'SOL'].map((chain, i) => (
            <span
              key={chain}
              style={{
                padding: '8px 16px',
                background: colors.gray[100],
                borderRadius: '6px',
                fontFamily: typography.fontFamily.mono,
                fontSize: typography.fontSize.xs,
                color: colors.gray[600],
              }}
            >
              {chain}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// 3. Stacked Cards - Vertical with staggered cards
export function StackedCards() {
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll('.card')
    if (!cards) return

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(headerRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6 }
    )
    .fromTo(cards,
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
      },
      0.3
    )
  }, [])

  const features = [
    { num: '01', title: 'Open Source', desc: 'MIT licensed. Audit the code, fork it, run your own.' },
    { num: '02', title: 'Agent-First', desc: 'Built for autonomous systems, not retrofitted wallets.' },
    { num: '03', title: 'Instant Settlement', desc: 'Sub-second finality for machine-speed transactions.' },
  ]

  return (
    <div style={{ ...containerStyle, background: colors.ink }}>
      <div ref={headerRef} style={{ opacity: 0, marginBottom: '48px' }}>
        <span style={{ ...annotationStyle, color: colors.cyan.DEFAULT, display: 'block', marginBottom: '16px' }}>
          Why QUSD
        </span>
        <h2 style={{ ...headerStyle, color: 'white', fontSize: typography.fontSize['4xl'] }}>
          Built different.
        </h2>
      </div>

      <div ref={cardsRef} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {features.map((feature) => (
          <div
            key={feature.num}
            className="card"
            style={{
              padding: '24px',
              background: colors.dark.surface,
              borderRadius: '16px',
              border: `1px solid ${colors.dark.border}`,
              opacity: 0,
            }}
          >
            <span style={{ ...annotationStyle, color: colors.gray[500], display: 'block', marginBottom: '8px' }}>
              {feature.num}
            </span>
            <h3 style={{
              fontFamily: typography.fontFamily.mono,
              fontSize: typography.fontSize.lg,
              fontWeight: typography.fontWeight.bold,
              color: 'white',
              marginBottom: '8px',
            }}>
              {feature.title}
            </h3>
            <p style={{ ...bodyStyle, fontSize: typography.fontSize.sm, color: colors.gray[400] }}>
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

// 4. Split Reveal - Horizontal with image placeholder
export function SplitReveal() {
  const textRef = useRef<HTMLDivElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(lineRef.current,
      { scaleX: 0, transformOrigin: 'center' },
      { scaleX: 1, duration: 0.6 }
    )
    .fromTo(textRef.current?.querySelectorAll('.animate') || [],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
      0.2
    )
    .fromTo(visualRef.current,
      { opacity: 0, scale: 0.9, filter: 'blur(10px)' },
      { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.8 },
      0.4
    )
  }, [])

  return (
    <div style={{ ...containerStyle, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
      <div ref={textRef}>
        <span className="animate" style={{ ...annotationStyle, opacity: 0, display: 'block', marginBottom: '16px' }}>
          How It Works
        </span>
        <h2 className="animate" style={{ ...headerStyle, fontSize: typography.fontSize['4xl'], opacity: 0, marginBottom: '20px' }}>
          Seamless
          <br />
          integration
        </h2>
        <p className="animate" style={{ ...bodyStyle, opacity: 0 }}>
          Connect your autonomous systems to QUSD in minutes. Our SDK handles
          the complexity so your agents can focus on their tasks.
        </p>
        <div
          ref={lineRef}
          style={{
            marginTop: '32px',
            height: '2px',
            background: colors.gradient.primary,
            transform: 'scaleX(0)',
          }}
        />
      </div>

      <div
        ref={visualRef}
        style={{
          aspectRatio: '1',
          background: `linear-gradient(135deg, ${colors.gray[100]} 0%, ${colors.gray[200]} 100%)`,
          borderRadius: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0,
          boxShadow: shadows.lg,
        }}
      >
        <Logo variant="icon" color="cyan" size={140} />
      </div>
    </div>
  )
}

// 5. Timeline Sequence - Vertical scroll-like animation
export function TimelineSequence() {
  const itemsRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const items = itemsRef.current?.querySelectorAll('.timeline-item')
    const dots = itemsRef.current?.querySelectorAll('.dot')
    if (!items || !dots) return

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(lineRef.current,
      { scaleY: 0, transformOrigin: 'top' },
      { scaleY: 1, duration: 1.2 }
    )

    items.forEach((item, i) => {
      tl.fromTo(dots[i],
        { scale: 0 },
        { scale: 1, duration: 0.3 },
        0.3 + i * 0.3
      )
      .fromTo(item,
        { opacity: 0, x: i % 2 === 0 ? -30 : 30 },
        { opacity: 1, x: 0, duration: 0.5 },
        0.4 + i * 0.3
      )
    })
  }, [])

  const steps = [
    { title: 'Connect', desc: 'Link your agent to the QUSD network' },
    { title: 'Fund', desc: 'Load QUSD into your agent wallet' },
    { title: 'Transact', desc: 'Execute payments autonomously' },
    { title: 'Scale', desc: 'Grow your machine economy' },
  ]

  return (
    <div style={{ ...containerStyle, paddingLeft: '100px' }}>
      <div style={{ position: 'relative' }} ref={itemsRef}>
        <div
          ref={lineRef}
          style={{
            position: 'absolute',
            left: '11px',
            top: 0,
            bottom: 0,
            width: '2px',
            background: colors.gray[200],
            transform: 'scaleY(0)',
          }}
        />

        {steps.map((step, i) => (
          <div
            key={step.title}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '32px',
              marginBottom: i < steps.length - 1 ? '48px' : 0,
            }}
          >
            <div
              className="dot"
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: colors.gradient.primary,
                flexShrink: 0,
                transform: 'scale(0)',
              }}
            />
            <div className="timeline-item" style={{ opacity: 0 }}>
              <h3 style={{
                fontFamily: typography.fontFamily.mono,
                fontSize: typography.fontSize.xl,
                fontWeight: typography.fontWeight.bold,
                color: colors.ink,
                marginBottom: '8px',
              }}>
                {step.title}
              </h3>
              <p style={{ ...bodyStyle, fontSize: typography.fontSize.base }}>
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// 6. Hero with Logo - Centered logo with text reveal
export function HeroWithLogo() {
  const logoRef = useRef<HTMLImageElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subheadingRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Logo entrance with glow
    tl.fromTo(glowRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 0.4, scale: 1, duration: 1 }
    )
    .fromTo(logoRef.current,
      { opacity: 0, scale: 0, rotation: -180 },
      { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: 'back.out(1.7)' },
      0.2
    )
    .fromTo(headingRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6 },
      0.8
    )
    .fromTo(subheadingRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5 },
      1
    )
    .fromTo(ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4 },
      1.2
    )

    // Continuous glow pulse
    gsap.to(glowRef.current, {
      scale: 1.3,
      opacity: 0.2,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1.5,
    })
  }, [])

  return (
    <div style={{
      ...containerStyle,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      background: colors.ink,
      minHeight: '600px',
    }}>
      {/* Logo with glow */}
      <div style={{ position: 'relative', marginBottom: '48px' }}>
        <div
          ref={glowRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${colors.cyan.DEFAULT}50 0%, transparent 70%)`,
            opacity: 0,
          }}
        />
        <Logo
          ref={logoRef}
          variant="icon"
          color="cyan"
          size={160}
          style={{ opacity: 0, position: 'relative', zIndex: 1 }}
        />
      </div>

      <h1
        ref={headingRef}
        style={{
          ...headerStyle,
          color: 'white',
          fontSize: typography.fontSize['6xl'],
          marginBottom: '16px',
          opacity: 0,
        }}
      >
        QUSD
      </h1>

      <p
        ref={subheadingRef}
        style={{
          ...bodyStyle,
          color: colors.gray[400],
          fontSize: typography.fontSize.xl,
          maxWidth: '500px',
          marginBottom: '32px',
          opacity: 0,
        }}
      >
        The stablecoin built for the autonomous economy
      </p>

      <div ref={ctaRef} style={{ opacity: 0, display: 'flex', gap: '16px' }}>
        <button
          style={{
            padding: '14px 28px',
            background: colors.gradient.primary,
            color: 'white',
            fontFamily: typography.fontFamily.mono,
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.bold,
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Launch App
        </button>
        <button
          style={{
            padding: '14px 28px',
            background: 'transparent',
            color: 'white',
            fontFamily: typography.fontFamily.mono,
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.medium,
            borderRadius: '8px',
            border: `1px solid ${colors.gray[700]}`,
            cursor: 'pointer',
          }}
        >
          Learn More
        </button>
      </div>
    </div>
  )
}

// 7. Brand Showcase - Horizontal logo variants
export function BrandShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const items = containerRef.current.querySelectorAll('.brand-item')

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6 }
    )
    .fromTo(items,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.15,
      },
      0.3
    )
  }, [])

  return (
    <div style={containerStyle}>
      <div ref={titleRef} style={{ opacity: 0, marginBottom: '48px' }}>
        <span style={{ ...annotationStyle, display: 'block', marginBottom: '12px' }}>
          Brand Assets
        </span>
        <h2 style={{ ...headerStyle, fontSize: typography.fontSize['4xl'] }}>
          Logo System
        </h2>
      </div>

      <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Horizontal logos */}
        <div
          className="brand-item"
          style={{
            padding: '40px',
            background: 'white',
            borderRadius: '16px',
            border: `1px solid ${colors.gray[200]}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0,
          }}
        >
          <Logo variant="horizontal" color="dark" size={280} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div
            className="brand-item"
            style={{
              padding: '40px',
              background: colors.ink,
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0,
            }}
          >
            <Logo variant="horizontal" color="cream" size={200} />
          </div>
          <div
            className="brand-item"
            style={{
              padding: '40px',
              background: 'white',
              borderRadius: '16px',
              border: `1px solid ${colors.gray[200]}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0,
            }}
          >
            <Logo variant="horizontal" color="cyan" size={200} />
          </div>
        </div>

        {/* Icon row */}
        <div
          className="brand-item"
          style={{
            padding: '32px',
            background: `linear-gradient(135deg, ${colors.gray[50]} 0%, ${colors.gray[100]} 100%)`,
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            opacity: 0,
          }}
        >
          <Logo variant="icon" color="cyan" size={60} />
          <Logo variant="icon" color="blue" size={60} />
          <Logo variant="icon" color="dark" size={60} />
          <div style={{ padding: '12px', background: colors.ink, borderRadius: '12px' }}>
            <Logo variant="icon" color="white" size={60} />
          </div>
        </div>
      </div>
    </div>
  )
}
