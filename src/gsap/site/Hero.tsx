import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { colors, typography } from '../../design-system/tokens'
import { Logo } from '../components/Logo'

gsap.registerPlugin(ScrollTrigger)

export function GSAPHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Glow animation
      tl.fromTo(glowRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 0.3, scale: 1, duration: 1.5 }
      )

      // Logo entrance
      .fromTo(logoRef.current,
        { opacity: 0, scale: 0, rotation: -180 },
        { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: 'back.out(1.7)' },
        0.2
      )

      // Label fade in
      .fromTo(labelRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6 },
        0.4
      )

      // Heading - character by character
      const headingChars = headingRef.current?.querySelectorAll('.char')
      if (headingChars) {
        tl.fromTo(headingChars,
          { opacity: 0, y: 50, rotateX: -90 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.02,
            ease: 'back.out(1.7)',
          },
          0.5
        )
      }

      // Body text
      tl.fromTo(bodyRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        1
      )

      // CTA buttons
      const buttons = ctaRef.current?.querySelectorAll('a')
      if (buttons) {
        tl.fromTo(buttons,
          { opacity: 0, y: 20, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            stagger: 0.1,
          },
          1.2
        )
      }

      // Feature cards
      const cards = cardsRef.current?.querySelectorAll('.feature-card')
      if (cards) {
        tl.fromTo(cards,
          { opacity: 0, x: 50, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.15,
          },
          1
        )
      }

      // Continuous glow pulse
      gsap.to(glowRef.current, {
        scale: 1.2,
        opacity: 0.15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // Floating logo animation
      gsap.to(logoRef.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2,
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Split text into characters
  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span
        key={i}
        className="char"
        style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
      >
        {char}
      </span>
    ))
  }

  const features = [
    { num: '01', title: 'Open source', desc: 'MIT licensed. Audit the code, fork it, run your own.' },
    { num: '02', title: 'Multi-chain native', desc: 'Ethereum, Base, Arbitrum, Solana. Same interface everywhere.' },
    { num: '03', title: 'Agent-first design', desc: 'Built for autonomous systems. Not a human wallet retrofitted.' },
  ]

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: colors.paper,
        overflow: 'hidden',
        padding: '120px 0 80px',
      }}
    >
      {/* Background glow */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: '600px',
          height: '400px',
          background: `radial-gradient(ellipse, ${colors.cyan.DEFAULT}40 0%, transparent 70%)`,
          opacity: 0,
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        {/* Floating logo top right */}
        <div
          ref={logoRef}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            opacity: 0,
          }}
        >
          <Logo variant="icon" color="cyan" size={100} />
        </div>

        {/* Label */}
        <span
          ref={labelRef}
          style={{
            display: 'block',
            fontFamily: typography.fontFamily.mono,
            fontSize: typography.fontSize.xs,
            color: colors.blue.DEFAULT,
            letterSpacing: typography.letterSpacing.widest,
            textTransform: 'uppercase',
            marginBottom: '48px',
            opacity: 0,
          }}
        >
          Open Source Stablecoin
        </span>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }}>
          {/* Left column */}
          <div>
            <h1
              ref={headingRef}
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '72px',
                fontWeight: typography.fontWeight.bold,
                lineHeight: 1.05,
                color: colors.ink,
                marginBottom: '32px',
                perspective: '1000px',
              }}
            >
              {splitText('The stablecoin')}
              <br />
              <span style={{ color: colors.blue.DEFAULT }}>
                {splitText('agents use')}
              </span>
            </h1>

            <p
              ref={bodyRef}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: typography.fontSize.lg,
                lineHeight: typography.lineHeight.relaxed,
                color: colors.gray[500],
                marginBottom: '32px',
                maxWidth: '500px',
                opacity: 0,
              }}
            >
              QUSD lets autonomous systems hold and spend dollars.
              AI agents, robots, IoT—anything that needs to pay for something
              without a human clicking approve.
            </p>

            <div ref={ctaRef} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a
                href="#"
                style={{
                  padding: '14px 28px',
                  background: colors.ink,
                  color: 'white',
                  fontFamily: typography.fontFamily.mono,
                  fontSize: typography.fontSize.sm,
                  fontWeight: typography.fontWeight.medium,
                  borderRadius: '8px',
                  textDecoration: 'none',
                  opacity: 0,
                }}
              >
                GitHub
              </a>
              <a
                href="#"
                style={{
                  padding: '14px 28px',
                  background: 'transparent',
                  color: colors.ink,
                  fontFamily: typography.fontFamily.mono,
                  fontSize: typography.fontSize.sm,
                  fontWeight: typography.fontWeight.medium,
                  borderRadius: '8px',
                  border: `1px solid ${colors.gray[200]}`,
                  textDecoration: 'none',
                  opacity: 0,
                }}
              >
                Whitepaper
              </a>
              <a
                href="#"
                style={{
                  padding: '14px 28px',
                  background: 'transparent',
                  color: colors.ink,
                  fontFamily: typography.fontFamily.mono,
                  fontSize: typography.fontSize.sm,
                  fontWeight: typography.fontWeight.medium,
                  borderRadius: '8px',
                  border: `1px solid ${colors.gray[200]}`,
                  textDecoration: 'none',
                  opacity: 0,
                }}
              >
                Documentation
              </a>
            </div>
          </div>

          {/* Right column - Feature cards */}
          <div ref={cardsRef} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {features.map((feature) => (
              <div
                key={feature.num}
                className="feature-card"
                style={{
                  padding: '24px',
                  background: 'white',
                  borderRadius: '16px',
                  border: `1px solid ${colors.gray[200]}`,
                  opacity: 0,
                }}
              >
                <span style={{
                  fontFamily: typography.fontFamily.mono,
                  fontSize: typography.fontSize.xs,
                  color: colors.gray[400],
                  display: 'block',
                  marginBottom: '12px',
                }}>
                  {feature.num}
                </span>
                <h3 style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: typography.fontSize.base,
                  fontWeight: typography.fontWeight.medium,
                  color: colors.ink,
                  marginBottom: '8px',
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: typography.fontSize.sm,
                  color: colors.gray[500],
                  lineHeight: typography.lineHeight.relaxed,
                }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
