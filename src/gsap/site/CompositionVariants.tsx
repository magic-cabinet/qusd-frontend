import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { colors, typography } from '../../design-system/tokens'
import { Logo } from '../components/Logo'

gsap.registerPlugin(ScrollTrigger)

// ============================================================
// SVG ICONS - Replace emojis with clean vector graphics
// ============================================================

function IconBolt({ size = 32, color = colors.cyan.DEFAULT }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}

function IconGlobe({ size = 32, color = colors.cyan.DEFAULT }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function IconLock({ size = 32, color = colors.cyan.DEFAULT }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

function IconChart({ size = 32, color = colors.cyan.DEFAULT }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  )
}

function IconCpu({ size = 32, color = colors.cyan.DEFAULT }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  )
}

function IconCoins({ size = 32, color = colors.cyan.DEFAULT }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <line x1="7" y1="6" x2="7.01" y2="6" />
      <line x1="16" y1="12" x2="16.01" y2="12" />
    </svg>
  )
}

function IconTarget({ size = 32, color = colors.cyan.DEFAULT }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
}

function IconDollar({ size = 32, color = colors.cyan.DEFAULT }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}

function IconWorld({ size = 32, color = colors.cyan.DEFAULT }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      <path d="M12 2v20" />
    </svg>
  )
}

function IconRobot({ size = 32, color = colors.cyan.DEFAULT }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <line x1="8" y1="16" x2="8" y2="16" />
      <line x1="16" y1="16" x2="16" y2="16" />
      <circle cx="8" cy="16" r="1" fill={color} />
      <circle cx="16" cy="16" r="1" fill={color} />
    </svg>
  )
}

// ============================================================
// COMPOSITION 1: CINEMATIC
// Deep parallax, slow reveals, layered depth, scrub animations
// ============================================================

function CinematicHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const layer1Ref = useRef<HTMLDivElement>(null)
  const layer2Ref = useRef<HTMLDivElement>(null)
  const layer3Ref = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Parallax layers on scroll
      gsap.to(layer1Ref.current, {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to(layer2Ref.current, {
        y: -200,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to(layer3Ref.current, {
        y: -50,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Text entrance
      const tl = gsap.timeline({ delay: 0.5 })

      const h1 = textRef.current?.querySelector('h1')
      const p = textRef.current?.querySelector('p')
      const links = textRef.current?.querySelectorAll('a')

      if (h1) {
        tl.fromTo(h1,
          { opacity: 0, y: 100, filter: 'blur(20px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power4.out' }
        )
      }
      if (p) {
        tl.fromTo(p,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
          '-=0.8'
        )
      }
      if (links && links.length > 0) {
        tl.fromTo(links,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
          '-=0.5'
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: '150vh',
        background: colors.ink,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Parallax layers */}
      <div
        ref={layer1Ref}
        style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '300px',
          height: '300px',
          background: `radial-gradient(circle, ${colors.cyan.DEFAULT}20 0%, transparent 70%)`,
          borderRadius: '50%',
        }}
      />
      <div
        ref={layer2Ref}
        style={{
          position: 'absolute',
          top: '30%',
          right: '10%',
          width: '400px',
          height: '400px',
          background: `radial-gradient(circle, ${colors.blue.DEFAULT}15 0%, transparent 70%)`,
          borderRadius: '50%',
        }}
      />
      <div
        ref={layer3Ref}
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '20%',
          width: '200px',
          height: '200px',
          background: `radial-gradient(circle, ${colors.cyan.light}25 0%, transparent 70%)`,
          borderRadius: '50%',
        }}
      />

      {/* Grid lines */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.1 }}>
        {[...Array(20)].map((_, i) => (
          <line key={`v${i}`} x1={`${i * 5}%`} y1="0" x2={`${i * 5}%`} y2="100%" stroke={colors.gray[600]} strokeWidth="1" />
        ))}
        {[...Array(20)].map((_, i) => (
          <line key={`h${i}`} x1="0" y1={`${i * 5}%`} x2="100%" y2={`${i * 5}%`} stroke={colors.gray[600]} strokeWidth="1" />
        ))}
      </svg>

      <div
        ref={textRef}
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '48px 24px',
          textAlign: 'center',
        }}
      >
        <h1 style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 'clamp(48px, 10vw, 96px)',
          fontWeight: typography.fontWeight.bold,
          color: 'white',
          lineHeight: 1,
          marginBottom: '32px',
          opacity: 0,
        }}>
          Build the<br />
          <span style={{ color: colors.cyan.DEFAULT }}>machine age</span>
        </h1>

        <p style={{
          fontSize: typography.fontSize.xl,
          color: colors.gray[400],
          maxWidth: '500px',
          lineHeight: typography.lineHeight.relaxed,
          marginBottom: '48px',
          opacity: 0,
        }}>
          Fund robotics. Get funded. In currency that doesn't gamble with your runway.
        </p>

        <div style={{ display: 'flex', gap: '16px', opacity: 0 }}>
          <a href="#" style={{
            padding: '18px 36px',
            background: colors.cyan.DEFAULT,
            color: colors.ink,
            fontFamily: typography.fontFamily.mono,
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.bold,
            borderRadius: '4px',
            textDecoration: 'none',
          }}>
            Launch App
          </a>
          <a href="#" style={{
            padding: '18px 36px',
            background: 'transparent',
            color: 'white',
            fontFamily: typography.fontFamily.mono,
            fontSize: typography.fontSize.sm,
            border: `1px solid ${colors.gray[700]}`,
            borderRadius: '4px',
            textDecoration: 'none',
          }}>
            Watch Demo
          </a>
        </div>
      </div>
    </section>
  )
}

function CinematicFeatures() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.feature-card')
      if (cards) {
        cards.forEach((card, i) => {
          // Scrub-based reveal
          gsap.fromTo(card,
            {
              opacity: 0,
              y: 150,
              rotateX: 15,
              transformPerspective: 1000,
            },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                end: 'top 50%',
                scrub: 1,
              },
            }
          )

          // Parallax movement after reveal
          gsap.to(card, {
            y: -30 * (i + 1),
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          })
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const features = [
    { num: '01', title: 'Stable by design', desc: 'Dollar-pegged. Always. Your $100K stays $100K.' },
    { num: '02', title: 'Borderless', desc: 'Tokyo to Toronto in seconds. No SWIFT. No waiting.' },
    { num: '03', title: 'Machine-native', desc: 'APIs your robots can call. No wallet popups.' },
    { num: '04', title: 'Transparent', desc: 'Real-time reserves. Audited. On-chain proof.' },
  ]

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '200px 24px',
        background: colors.paper,
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '14px',
          fontWeight: typography.fontWeight.bold,
          color: colors.blue.DEFAULT,
          letterSpacing: typography.letterSpacing.widest,
          textTransform: 'uppercase',
          marginBottom: '64px',
        }}>
          Why QUSD
        </h2>

        <div ref={cardsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }}>
          {features.map((f, i) => (
            <div
              key={i}
              className="feature-card"
              style={{
                padding: '48px',
                background: 'white',
                borderRadius: '24px',
                border: `1px solid ${colors.gray[200]}`,
                opacity: 0,
              }}
            >
              <span style={{
                fontFamily: typography.fontFamily.mono,
                fontSize: '48px',
                fontWeight: typography.fontWeight.bold,
                color: colors.gray[200],
                display: 'block',
                marginBottom: '24px',
              }}>
                {f.num}
              </span>
              <h3 style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '24px',
                fontWeight: typography.fontWeight.bold,
                color: colors.ink,
                marginBottom: '16px',
              }}>
                {f.title}
              </h3>
              <p style={{
                fontSize: typography.fontSize.lg,
                color: colors.gray[500],
                lineHeight: typography.lineHeight.relaxed,
              }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CinematicCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 1,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '200px 24px',
        background: colors.ink,
      }}
    >
      <div
        ref={contentRef}
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center',
          opacity: 0,
        }}
      >
        <Logo variant="icon" color="cyan" size={80} />
        <h2 style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '48px',
          fontWeight: typography.fontWeight.bold,
          color: 'white',
          margin: '48px 0 24px',
        }}>
          The future is funded.
        </h2>
        <p style={{
          fontSize: typography.fontSize.xl,
          color: colors.gray[400],
          marginBottom: '48px',
        }}>
          Join the builders making machines work.
        </p>
        <a href="#" style={{
          padding: '20px 48px',
          background: colors.cyan.DEFAULT,
          color: colors.ink,
          fontFamily: typography.fontFamily.mono,
          fontSize: typography.fontSize.base,
          fontWeight: typography.fontWeight.bold,
          borderRadius: '4px',
          textDecoration: 'none',
          display: 'inline-block',
        }}>
          Get Started
        </a>
      </div>
    </section>
  )
}

export function CompositionCinematic() {
  return (
    <div>
      <CinematicHero />
      <CinematicFeatures />
      <CinematicCTA />
    </div>
  )
}

// ============================================================
// COMPOSITION 2: MINIMAL
// Clean reveals, line draws, typography focus, whitespace
// ============================================================

function MinimalHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })

      // Horizontal line draws
      tl.fromTo(lineRef.current,
        { scaleX: 0, transformOrigin: 'left' },
        { scaleX: 1, duration: 1.2, ease: 'power2.inOut' }
      )

      // Text reveals with mask
      const words = textRef.current?.querySelectorAll('.word')
      if (words && words.length > 0) {
        tl.fromTo(words,
          { y: '100%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
          '-=0.6'
        )
      }

      // Subtitle
      const subtitle = textRef.current?.querySelector('.subtitle')
      if (subtitle) {
        tl.fromTo(subtitle,
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          '-=0.4'
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        background: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px 48px',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div
          ref={lineRef}
          style={{
            height: '1px',
            background: colors.ink,
            marginBottom: '48px',
            transform: 'scaleX(0)',
          }}
        />

        <div ref={textRef}>
          <h1 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 'clamp(36px, 6vw, 64px)',
            fontWeight: typography.fontWeight.bold,
            color: colors.ink,
            lineHeight: 1.2,
            marginBottom: '32px',
            overflow: 'hidden',
          }}>
            <span className="word" style={{ display: 'inline-block' }}>Stable</span>{' '}
            <span className="word" style={{ display: 'inline-block' }}>money</span>{' '}
            <span className="word" style={{ display: 'inline-block' }}>for</span>
            <br />
            <span className="word" style={{ display: 'inline-block', color: colors.blue.DEFAULT }}>unstable</span>{' '}
            <span className="word" style={{ display: 'inline-block', color: colors.blue.DEFAULT }}>times.</span>
          </h1>

          <p
            className="subtitle"
            style={{
              fontFamily: typography.fontFamily.mono,
              fontSize: typography.fontSize.sm,
              color: colors.gray[500],
              maxWidth: '400px',
              lineHeight: typography.lineHeight.relaxed,
              opacity: 0,
            }}
          >
            Fund robotics projects globally. Receive funding without volatility.
            QUSD — programmable dollars for the machine economy.
          </p>
        </div>
      </div>
    </section>
  )
}

function MinimalProcess() {
  const sectionRef = useRef<HTMLElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const steps = stepsRef.current?.querySelectorAll('.step')
      if (steps) {
        steps.forEach((step) => {
          const line = step.querySelector('.step-line')
          const num = step.querySelector('.step-num')
          const text = step.querySelector('.step-text')

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: step,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          })

          if (line) {
            tl.fromTo(line,
              { scaleX: 0, transformOrigin: 'left' },
              { scaleX: 1, duration: 0.6, ease: 'power2.out' }
            )
          }
          if (num) {
            tl.fromTo(num,
              { opacity: 0, x: -20 },
              { opacity: 1, x: 0, duration: 0.4 },
              '-=0.3'
            )
          }
          if (text) {
            tl.fromTo(text,
              { opacity: 0 },
              { opacity: 1, duration: 0.5 },
              '-=0.2'
            )
          }
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const steps = [
    { num: '01', text: 'Connect your wallet or create an agent account' },
    { num: '02', text: 'Deposit USD via bank transfer or card' },
    { num: '03', text: 'Receive QUSD 1:1 — no slippage, no fees' },
    { num: '04', text: 'Send anywhere, anytime, to anyone' },
  ]

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '120px 48px',
        background: colors.paper,
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <span style={{
          fontFamily: typography.fontFamily.mono,
          fontSize: typography.fontSize.xs,
          color: colors.gray[400],
          letterSpacing: typography.letterSpacing.widest,
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: '64px',
        }}>
          Process
        </span>

        <div ref={stepsRef} style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {steps.map((step, i) => (
            <div key={i} className="step">
              <div
                className="step-line"
                style={{
                  height: '1px',
                  background: colors.gray[300],
                  marginBottom: '24px',
                  transform: 'scaleX(0)',
                }}
              />
              <div style={{ display: 'flex', gap: '32px', alignItems: 'baseline' }}>
                <span
                  className="step-num"
                  style={{
                    fontFamily: typography.fontFamily.mono,
                    fontSize: typography.fontSize.sm,
                    color: colors.gray[400],
                    opacity: 0,
                  }}
                >
                  {step.num}
                </span>
                <p
                  className="step-text"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: '24px',
                    color: colors.ink,
                    opacity: 0,
                  }}
                >
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function MinimalFooter() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!footerRef.current) return

    const ctx = gsap.context(() => {
      const footerItems = footerRef.current?.querySelectorAll('.footer-item')
      if (footerItems && footerItems.length > 0) {
        gsap.fromTo(footerItems,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={footerRef}
      style={{
        padding: '80px 48px',
        background: 'white',
        borderTop: `1px solid ${colors.gray[200]}`,
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="footer-item" style={{ opacity: 0 }}>
          <Logo variant="horizontal" color="dark" size={100} />
        </div>
        <span className="footer-item" style={{
          fontFamily: typography.fontFamily.mono,
          fontSize: typography.fontSize.xs,
          color: colors.gray[400],
          opacity: 0,
        }}>
          Programmable money.
        </span>
      </div>
    </footer>
  )
}

export function CompositionMinimal() {
  return (
    <div>
      <MinimalHero />
      <MinimalProcess />
      <MinimalFooter />
    </div>
  )
}

// ============================================================
// COMPOSITION 3: ENERGETIC
// Bouncy easing, fast staggers, color pops, dynamic motion
// ============================================================

function EnergeticHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const elementsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Logo bounce in
      const logo = elementsRef.current?.querySelector('.logo')
      if (logo) {
        tl.fromTo(logo,
          { scale: 0, rotation: -180 },
          { scale: 1, rotation: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' }
        )
      }

      // Title words bounce
      const words = elementsRef.current?.querySelectorAll('.title-word')
      if (words && words.length > 0) {
        tl.fromTo(words,
          { y: 100, opacity: 0, scale: 0.5 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: 'back.out(2)' },
          '-=0.3'
        )
      }

      // Badges pop in
      const badges = elementsRef.current?.querySelectorAll('.badge')
      if (badges && badges.length > 0) {
        tl.fromTo(badges,
          { scale: 0, rotation: -20 },
          { scale: 1, rotation: 0, duration: 0.4, stagger: 0.05, ease: 'back.out(3)' },
          '-=0.2'
        )
      }

      // CTA slide up
      const cta = elementsRef.current?.querySelector('.cta')
      if (cta) {
        tl.fromTo(cta,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
          '-=0.2'
        )
      }

      // Floating shapes
      const shapes = elementsRef.current?.querySelectorAll('.floating-shape')
      if (shapes && shapes.length > 0) {
        shapes.forEach((shape, i) => {
          gsap.to(shape, {
            y: `${(i % 2 === 0 ? -1 : 1) * 20}`,
            rotation: (i % 2 === 0 ? 10 : -10),
            duration: 2 + i * 0.3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          })
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${colors.cyan.DEFAULT} 0%, ${colors.blue.DEFAULT} 100%)`,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
      }}
    >
      {/* Floating shapes */}
      <div className="floating-shape" style={{ position: 'absolute', top: '10%', left: '10%', width: '80px', height: '80px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px' }} />
      <div className="floating-shape" style={{ position: 'absolute', top: '60%', left: '5%', width: '60px', height: '60px', background: 'rgba(255,255,255,0.15)', borderRadius: '50%' }} />
      <div className="floating-shape" style={{ position: 'absolute', top: '20%', right: '15%', width: '100px', height: '100px', background: 'rgba(255,255,255,0.08)', borderRadius: '30px' }} />
      <div className="floating-shape" style={{ position: 'absolute', bottom: '15%', right: '10%', width: '70px', height: '70px', background: 'rgba(255,255,255,0.12)', borderRadius: '50%' }} />

      <div ref={elementsRef} style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div className="logo" style={{ marginBottom: '32px', display: 'inline-block' }}>
          <Logo variant="icon" color="white" size={80} />
        </div>

        <h1 style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 'clamp(40px, 8vw, 80px)',
          fontWeight: typography.fontWeight.bold,
          color: 'white',
          lineHeight: 1.1,
          marginBottom: '24px',
        }}>
          <span className="title-word" style={{ display: 'inline-block', opacity: 0 }}>Money</span>{' '}
          <span className="title-word" style={{ display: 'inline-block', opacity: 0 }}>that</span>
          <br />
          <span className="title-word" style={{ display: 'inline-block', opacity: 0 }}>actually</span>{' '}
          <span className="title-word" style={{ display: 'inline-block', opacity: 0 }}>works.</span>
        </h1>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
          {['Stable', 'Fast', 'Global', 'Open'].map((label) => (
            <span
              key={label}
              className="badge"
              style={{
                padding: '8px 20px',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontFamily: typography.fontFamily.mono,
                fontSize: typography.fontSize.sm,
                borderRadius: '100px',
                transform: 'scale(0)',
              }}
            >
              {label}
            </span>
          ))}
        </div>

        <div className="cta" style={{ opacity: 0 }}>
          <a href="#" style={{
            padding: '18px 48px',
            background: 'white',
            color: colors.blue.DEFAULT,
            fontFamily: typography.fontFamily.mono,
            fontSize: typography.fontSize.base,
            fontWeight: typography.fontWeight.bold,
            borderRadius: '100px',
            textDecoration: 'none',
            display: 'inline-block',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          }}>
            Start Building
          </a>
        </div>
      </div>
    </section>
  )
}

function EnergeticStats() {
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const stats = statsRef.current?.querySelectorAll('.stat')
      if (stats) {
        stats.forEach((stat, i) => {
          gsap.fromTo(stat,
            { y: 80, opacity: 0, scale: 0.8 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: 'back.out(2)',
              scrollTrigger: {
                trigger: stat,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
              delay: i * 0.1,
            }
          )

          // Hover effect
          const el = stat as HTMLElement
          el.addEventListener('mouseenter', () => {
            gsap.to(stat, { scale: 1.05, y: -5, duration: 0.3, ease: 'power2.out' })
          })
          el.addEventListener('mouseleave', () => {
            gsap.to(stat, { scale: 1, y: 0, duration: 0.3, ease: 'power2.out' })
          })
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const stats = [
    { value: '$0', label: 'Fees', color: colors.cyan.DEFAULT },
    { value: '47+', label: 'Countries', color: colors.blue.DEFAULT },
    { value: '<1s', label: 'Settlement', color: colors.cyan.light },
    { value: '100%', label: 'Backed', color: colors.blue.light },
  ]

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '100px 24px',
        background: 'white',
      }}
    >
      <div
        ref={statsRef}
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px',
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            className="stat"
            style={{
              padding: '40px 24px',
              background: colors.paper,
              borderRadius: '24px',
              textAlign: 'center',
              cursor: 'pointer',
              opacity: 0,
            }}
          >
            <div style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '48px',
              fontWeight: typography.fontWeight.bold,
              color: stat.color,
              marginBottom: '8px',
            }}>
              {stat.value}
            </div>
            <div style={{
              fontFamily: typography.fontFamily.mono,
              fontSize: typography.fontSize.sm,
              color: colors.gray[500],
              textTransform: 'uppercase',
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function EnergeticCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(boxRef.current,
        { y: 100, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'elastic.out(1, 0.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '100px 24px',
        background: colors.paper,
      }}
    >
      <div
        ref={boxRef}
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '64px',
          background: `linear-gradient(135deg, ${colors.cyan.DEFAULT} 0%, ${colors.blue.DEFAULT} 100%)`,
          borderRadius: '32px',
          textAlign: 'center',
          opacity: 0,
        }}
      >
        <h2 style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '36px',
          fontWeight: typography.fontWeight.bold,
          color: 'white',
          marginBottom: '16px',
        }}>
          Ready to build?
        </h2>
        <p style={{
          fontSize: typography.fontSize.lg,
          color: 'rgba(255,255,255,0.8)',
          marginBottom: '32px',
        }}>
          Join thousands funding the future of robotics.
        </p>
        <a href="#" style={{
          padding: '16px 40px',
          background: 'white',
          color: colors.blue.DEFAULT,
          fontFamily: typography.fontFamily.mono,
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.bold,
          borderRadius: '100px',
          textDecoration: 'none',
          display: 'inline-block',
        }}>
          Get Started Free
        </a>
      </div>
    </section>
  )
}

export function CompositionEnergetic() {
  return (
    <div>
      <EnergeticHero />
      <EnergeticStats />
      <EnergeticCTA />
    </div>
  )
}

// ============================================================
// COMPOSITION 4: HEXAGONAL
// Hex grid patterns, layered parallax, tech aesthetic
// ============================================================

function HexPattern({ size = 60, opacity = 0.1, className = '' }: { size?: number; opacity?: number; className?: string }) {
  const hexPoints = (cx: number, cy: number, r: number) => {
    const points = []
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 2
      points.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`)
    }
    return points.join(' ')
  }

  const cols = 15
  const rows = 12
  const hexWidth = size * Math.sqrt(3)
  const hexHeight = size * 2

  return (
    <svg
      className={className}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      viewBox={`0 0 ${cols * hexWidth} ${rows * hexHeight * 0.75}`}
      preserveAspectRatio="xMidYMid slice"
    >
      {[...Array(rows)].map((_, row) =>
        [...Array(cols)].map((_, col) => {
          const x = col * hexWidth + (row % 2 === 0 ? 0 : hexWidth / 2)
          const y = row * hexHeight * 0.75
          return (
            <polygon
              key={`${row}-${col}`}
              points={hexPoints(x, y, size * 0.9)}
              fill="none"
              stroke={colors.cyan.DEFAULT}
              strokeWidth="1"
              opacity={opacity}
            />
          )
        })
      )}
    </svg>
  )
}

function HexHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const layer1Ref = useRef<HTMLDivElement>(null)
  const layer2Ref = useRef<HTMLDivElement>(null)
  const layer3Ref = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Parallax hex layers
      gsap.to(layer1Ref.current, {
        y: -150,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to(layer2Ref.current, {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to(layer3Ref.current, {
        y: -200,
        rotation: 5,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Content animations
      const tl = gsap.timeline({ delay: 0.3 })

      // Hexagon logo container
      const hexLogo = contentRef.current?.querySelector('.hex-logo')
      if (hexLogo) {
        tl.fromTo(hexLogo,
          { scale: 0, rotation: -60 },
          { scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.7)' }
        )
      }

      // Title
      const chars = contentRef.current?.querySelectorAll('.hex-char')
      if (chars && chars.length > 0) {
        tl.fromTo(chars,
          { opacity: 0, y: 40, rotateY: -90 },
          { opacity: 1, y: 0, rotateY: 0, duration: 0.5, stagger: 0.03, ease: 'power3.out' },
          '-=0.3'
        )
      }

      // Subtitle
      const hexSubtitle = contentRef.current?.querySelector('.hex-subtitle')
      if (hexSubtitle) {
        tl.fromTo(hexSubtitle,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.2'
        )
      }

      // Hex badges
      const badges = contentRef.current?.querySelectorAll('.hex-badge')
      if (badges && badges.length > 0) {
        tl.fromTo(badges,
          { opacity: 0, scale: 0, rotation: -30 },
          { opacity: 1, scale: 1, rotation: 0, duration: 0.4, stagger: 0.08, ease: 'back.out(2)' },
          '-=0.3'
        )
      }

      // CTA
      const hexCta = contentRef.current?.querySelector('.hex-cta')
      if (hexCta) {
        tl.fromTo(hexCta,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.2'
        )
      }

      // Continuous hex rotation on layers
      gsap.to(layer3Ref.current, {
        rotation: '+=360',
        duration: 120,
        repeat: -1,
        ease: 'none',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span
        key={i}
        className="hex-char"
        style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal', opacity: 0 }}
      >
        {char}
      </span>
    ))
  }

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: '150vh',
        background: colors.ink,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Hex layer 1 - background */}
      <div ref={layer1Ref} style={{ position: 'absolute', inset: '-20%', opacity: 0.05 }}>
        <HexPattern size={80} opacity={1} />
      </div>

      {/* Hex layer 2 - mid */}
      <div ref={layer2Ref} style={{ position: 'absolute', inset: '-10%', opacity: 0.1 }}>
        <HexPattern size={50} opacity={1} />
      </div>

      {/* Hex layer 3 - foreground glow */}
      <div ref={layer3Ref} style={{ position: 'absolute', top: '-50%', left: '-25%', width: '150%', height: '150%', opacity: 0.15 }}>
        <HexPattern size={120} opacity={1} />
      </div>

      {/* Glow spots */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '30%',
        width: '400px',
        height: '400px',
        background: `radial-gradient(circle, ${colors.cyan.DEFAULT}30 0%, transparent 70%)`,
        borderRadius: '50%',
        filter: 'blur(60px)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '30%',
        right: '20%',
        width: '300px',
        height: '300px',
        background: `radial-gradient(circle, ${colors.blue.DEFAULT}25 0%, transparent 70%)`,
        borderRadius: '50%',
        filter: 'blur(40px)',
      }} />

      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '48px 24px',
          textAlign: 'center',
        }}
      >
        {/* Hexagon logo container */}
        <div
          className="hex-logo"
          style={{
            width: '120px',
            height: '120px',
            background: `linear-gradient(135deg, ${colors.cyan.DEFAULT} 0%, ${colors.blue.DEFAULT} 100%)`,
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '48px',
            transform: 'scale(0)',
          }}
        >
          <Logo variant="icon" color="white" size={60} />
        </div>

        <h1 style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 'clamp(40px, 8vw, 72px)',
          fontWeight: typography.fontWeight.bold,
          color: 'white',
          lineHeight: 1.1,
          marginBottom: '24px',
          perspective: '1000px',
        }}>
          {splitText('Infrastructure')}
          <br />
          <span style={{ color: colors.cyan.DEFAULT }}>
            {splitText('for builders.')}
          </span>
        </h1>

        <p
          className="hex-subtitle"
          style={{
            fontSize: typography.fontSize.lg,
            color: colors.gray[400],
            maxWidth: '500px',
            lineHeight: typography.lineHeight.relaxed,
            marginBottom: '40px',
            opacity: 0,
          }}
        >
          Programmable stablecoin rails for robotics funding.
          Global. Instant. Stable.
        </p>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '48px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {['Multi-chain', 'Open Source', 'Audited', 'MIT License'].map((label) => (
            <div
              key={label}
              className="hex-badge"
              style={{
                padding: '10px 20px',
                background: 'rgba(14, 204, 237, 0.1)',
                border: `1px solid ${colors.cyan.DEFAULT}40`,
                color: colors.cyan.DEFAULT,
                fontFamily: typography.fontFamily.mono,
                fontSize: typography.fontSize.xs,
                clipPath: 'polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)',
                opacity: 0,
              }}
            >
              {label}
            </div>
          ))}
        </div>

        <div className="hex-cta" style={{ display: 'flex', gap: '16px', opacity: 0 }}>
          <a href="#" style={{
            padding: '16px 32px',
            background: colors.cyan.DEFAULT,
            color: colors.ink,
            fontFamily: typography.fontFamily.mono,
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.bold,
            borderRadius: '4px',
            textDecoration: 'none',
          }}>
            Start Building
          </a>
          <a href="#" style={{
            padding: '16px 32px',
            background: 'transparent',
            color: 'white',
            fontFamily: typography.fontFamily.mono,
            fontSize: typography.fontSize.sm,
            border: `1px solid ${colors.gray[700]}`,
            borderRadius: '4px',
            textDecoration: 'none',
          }}>
            Read Docs
          </a>
        </div>
      </div>
    </section>
  )
}

function HexFeatures() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const hexes = gridRef.current?.querySelectorAll('.feature-hex')
      if (hexes) {
        hexes.forEach((hex, i) => {
          gsap.fromTo(hex,
            { opacity: 0, scale: 0, rotation: -30 },
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 0.6,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: hex,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
              delay: i * 0.1,
            }
          )
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const features = [
    { icon: 'bolt', title: 'Instant', desc: 'Settle in seconds, not days' },
    { icon: 'globe', title: 'Global', desc: '47+ countries supported' },
    { icon: 'lock', title: 'Secure', desc: 'Audited smart contracts' },
    { icon: 'chart', title: 'Transparent', desc: 'Real-time reserve proof' },
    { icon: 'cpu', title: 'Programmable', desc: 'Built for automation' },
    { icon: 'coins', title: 'Zero fees', desc: 'No transfer costs' },
  ]

  const renderIcon = (iconName: string) => {
    const iconProps = { size: 32, color: colors.cyan.DEFAULT }
    switch (iconName) {
      case 'bolt': return <IconBolt {...iconProps} />
      case 'globe': return <IconGlobe {...iconProps} />
      case 'lock': return <IconLock {...iconProps} />
      case 'chart': return <IconChart {...iconProps} />
      case 'cpu': return <IconCpu {...iconProps} />
      case 'coins': return <IconCoins {...iconProps} />
      default: return null
    }
  }

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '120px 24px',
        background: colors.paper,
        position: 'relative',
      }}
    >
      {/* Faint hex background */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03 }}>
        <HexPattern size={40} opacity={1} />
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <h2 style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '36px',
          fontWeight: typography.fontWeight.bold,
          color: colors.ink,
          textAlign: 'center',
          marginBottom: '64px',
        }}>
          Why <span style={{ color: colors.cyan.DEFAULT }}>QUSD</span>
        </h2>

        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}
        >
          {features.map((f, i) => (
            <div
              key={i}
              className="feature-hex"
              style={{
                padding: '40px 24px',
                background: 'white',
                textAlign: 'center',
                clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                opacity: 0,
              }}
            >
              <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>{renderIcon(f.icon)}</div>
              <h3 style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: typography.fontSize.lg,
                fontWeight: typography.fontWeight.bold,
                color: colors.ink,
                marginBottom: '8px',
              }}>
                {f.title}
              </h3>
              <p style={{
                fontSize: typography.fontSize.sm,
                color: colors.gray[500],
              }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HexCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const hexRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(hexRef.current,
        { opacity: 0, scale: 0.8, rotation: -15 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Slow rotation
      gsap.to(hexRef.current, {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: 'none',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '150px 24px',
        background: colors.ink,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Large rotating hex background */}
      <div
        ref={hexRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '800px',
          height: '800px',
          transform: 'translate(-50%, -50%)',
          opacity: 0,
        }}
      >
        <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
          <polygon
            points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
            fill="none"
            stroke={colors.cyan.DEFAULT}
            strokeWidth="0.5"
            opacity="0.2"
          />
          <polygon
            points="50,15 85,32.5 85,67.5 50,85 15,67.5 15,32.5"
            fill="none"
            stroke={colors.blue.DEFAULT}
            strokeWidth="0.5"
            opacity="0.15"
          />
          <polygon
            points="50,25 75,37.5 75,62.5 50,75 25,62.5 25,37.5"
            fill="none"
            stroke={colors.cyan.DEFAULT}
            strokeWidth="0.5"
            opacity="0.1"
          />
        </svg>
      </div>

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <Logo variant="icon" color="cyan" size={60} />
        <h2 style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '40px',
          fontWeight: typography.fontWeight.bold,
          color: 'white',
          margin: '32px 0 16px',
        }}>
          Join the network.
        </h2>
        <p style={{
          fontSize: typography.fontSize.lg,
          color: colors.gray[400],
          marginBottom: '40px',
        }}>
          Build on stable infrastructure.
        </p>
        <a href="#" style={{
          padding: '18px 48px',
          background: colors.cyan.DEFAULT,
          color: colors.ink,
          fontFamily: typography.fontFamily.mono,
          fontSize: typography.fontSize.base,
          fontWeight: typography.fontWeight.bold,
          borderRadius: '4px',
          textDecoration: 'none',
          display: 'inline-block',
        }}>
          Get Started
        </a>
      </div>
    </section>
  )
}

export function CompositionHexagonal() {
  return (
    <div>
      <HexHero />
      <HexFeatures />
      <HexCTA />
    </div>
  )
}

// ============================================================
// COMPOSITION 5: CINEMATIC + HORIZONTAL + LOGO
// The best of cinematic parallax, horizontal scroll, floating logo
// ============================================================

function CinematicHorizontalHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const layer1Ref = useRef<HTMLDivElement>(null)
  const layer2Ref = useRef<HTMLDivElement>(null)
  const layer3Ref = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Parallax layers on scroll
      gsap.to(layer1Ref.current, {
        y: -120,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to(layer2Ref.current, {
        y: -220,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to(layer3Ref.current, {
        y: -60,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Entry timeline
      const tl = gsap.timeline({ delay: 0.3 })

      // Logo entrance with elastic bounce
      tl.fromTo(logoRef.current,
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 1, ease: 'elastic.out(1, 0.5)' }
      )

      // Text reveal with blur
      const h1 = textRef.current?.querySelector('h1')
      const p = textRef.current?.querySelector('p')
      const links = textRef.current?.querySelectorAll('a')

      if (h1) {
        tl.fromTo(h1,
          { opacity: 0, y: 100, filter: 'blur(20px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power4.out' },
          '-=0.5'
        )
      }
      if (p) {
        tl.fromTo(p,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        )
      }
      if (links && links.length > 0) {
        tl.fromTo(links,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out' },
          '-=0.4'
        )
      }

      // Continuous logo glow pulse
      gsap.to(logoRef.current, {
        filter: 'drop-shadow(0 0 40px rgba(14, 204, 237, 0.6))',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.5,
      })

      // Floating logo motion
      gsap.to(logoRef.current, {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: '150vh',
        background: colors.ink,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Parallax gradient layers */}
      <div
        ref={layer1Ref}
        style={{
          position: 'absolute',
          top: '5%',
          left: '10%',
          width: '350px',
          height: '350px',
          background: `radial-gradient(circle, ${colors.cyan.DEFAULT}25 0%, transparent 70%)`,
          borderRadius: '50%',
          filter: 'blur(40px)',
        }}
      />
      <div
        ref={layer2Ref}
        style={{
          position: 'absolute',
          top: '25%',
          right: '5%',
          width: '500px',
          height: '500px',
          background: `radial-gradient(circle, ${colors.blue.DEFAULT}20 0%, transparent 70%)`,
          borderRadius: '50%',
          filter: 'blur(60px)',
        }}
      />
      <div
        ref={layer3Ref}
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '25%',
          width: '250px',
          height: '250px',
          background: `radial-gradient(circle, ${colors.cyan.light}30 0%, transparent 70%)`,
          borderRadius: '50%',
          filter: 'blur(30px)',
        }}
      />

      {/* Subtle grid */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.06 }}>
        {[...Array(25)].map((_, i) => (
          <line key={`v${i}`} x1={`${i * 4}%`} y1="0" x2={`${i * 4}%`} y2="100%" stroke={colors.cyan.DEFAULT} strokeWidth="1" />
        ))}
        {[...Array(25)].map((_, i) => (
          <line key={`h${i}`} x1="0" y1={`${i * 4}%`} x2="100%" y2={`${i * 4}%`} stroke={colors.cyan.DEFAULT} strokeWidth="1" />
        ))}
      </svg>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '48px 24px',
          textAlign: 'center',
        }}
      >
        {/* Floating logo */}
        <div
          ref={logoRef}
          style={{
            marginBottom: '48px',
            filter: 'drop-shadow(0 0 20px rgba(14, 204, 237, 0.3))',
            transform: 'scale(0)',
          }}
        >
          <Logo variant="icon" color="cyan" size={100} />
        </div>

        <div ref={textRef}>
          <h1 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 'clamp(44px, 9vw, 88px)',
            fontWeight: typography.fontWeight.bold,
            color: 'white',
            lineHeight: 1.05,
            marginBottom: '32px',
            opacity: 0,
          }}>
            Build the<br />
            <span style={{ color: colors.cyan.DEFAULT }}>machine age</span>
          </h1>

          <p style={{
            fontSize: typography.fontSize.xl,
            color: colors.gray[400],
            maxWidth: '550px',
            lineHeight: typography.lineHeight.relaxed,
            marginBottom: '48px',
            margin: '0 auto 48px',
            opacity: 0,
          }}>
            Fund robotics. Get funded. In currency that doesn't gamble with your runway.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#" style={{
              padding: '18px 40px',
              background: colors.cyan.DEFAULT,
              color: colors.ink,
              fontFamily: typography.fontFamily.mono,
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.bold,
              borderRadius: '4px',
              textDecoration: 'none',
              opacity: 0,
            }}>
              Launch App
            </a>
            <a href="#" style={{
              padding: '18px 40px',
              background: 'transparent',
              color: 'white',
              fontFamily: typography.fontFamily.mono,
              fontSize: typography.fontSize.sm,
              border: `1px solid ${colors.gray[600]}`,
              borderRadius: '4px',
              textDecoration: 'none',
              opacity: 0,
            }}>
              Watch Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function CinematicHorizontalScroll() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return

    const ctx = gsap.context(() => {
      const panels = containerRef.current?.querySelectorAll('.ch-panel')
      if (!panels || panels.length === 0) return

      // Main horizontal scroll
      const scrollTween = gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 0.8,
          snap: 1 / (panels.length - 1),
          end: () => `+=${(containerRef.current?.scrollWidth || 1000) * 1.2}`,
        },
      })

      // Animate each panel's content with parallax effect
      panels.forEach((panel, i) => {
        const num = panel.querySelector('.panel-num')
        const title = panel.querySelector('.panel-title')
        const desc = panel.querySelector('.panel-desc')
        const icon = panel.querySelector('.panel-icon')

        if (i > 0) {
          // Scrub-reveal for panels 2-4
          if (num) {
            gsap.fromTo(num,
              { opacity: 0, x: 100 },
              {
                opacity: 0.2,
                x: 0,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: scrollTween,
                  start: 'left 80%',
                  end: 'left 40%',
                  scrub: true,
                },
              }
            )
          }
          if (title) {
            gsap.fromTo(title,
              { opacity: 0, y: 60, filter: 'blur(10px)' },
              {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: scrollTween,
                  start: 'left 70%',
                  end: 'left 30%',
                  scrub: true,
                },
              }
            )
          }
          if (desc) {
            gsap.fromTo(desc,
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: scrollTween,
                  start: 'left 60%',
                  end: 'left 25%',
                  scrub: true,
                },
              }
            )
          }
          if (icon) {
            gsap.fromTo(icon,
              { scale: 0.5, rotation: -20 },
              {
                scale: 1,
                rotation: 0,
                ease: 'back.out(1.5)',
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: scrollTween,
                  start: 'left 75%',
                  end: 'left 35%',
                  scrub: true,
                },
              }
            )
          }
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const panels = [
    {
      num: '01',
      title: 'Set a goal',
      desc: 'Define your milestone. $10K for a prototype. $100K for production. Clear targets.',
      icon: 'target',
      color: colors.cyan.DEFAULT,
    },
    {
      num: '02',
      title: 'Fund in QUSD',
      desc: 'Backers contribute stable dollars. No volatility. What you raise is what you have.',
      icon: 'dollar',
      color: colors.blue.DEFAULT,
    },
    {
      num: '03',
      title: 'Build anywhere',
      desc: 'Your team in Tokyo. Your factory in Shenzhen. Same money. Instant settlement.',
      icon: 'world',
      color: colors.cyan.light,
    },
    {
      num: '04',
      title: 'Machines transact',
      desc: 'Your robots buy parts. Pay for compute. Settle invoices. No human in the loop.',
      icon: 'robot',
      color: colors.blue.light,
    },
  ]

  const renderPanelIcon = (iconName: string, color: string) => {
    const iconProps = { size: 48, color }
    switch (iconName) {
      case 'target': return <IconTarget {...iconProps} />
      case 'dollar': return <IconDollar {...iconProps} />
      case 'world': return <IconWorld {...iconProps} />
      case 'robot': return <IconRobot {...iconProps} />
      default: return null
    }
  }

  return (
    <section
      ref={sectionRef}
      style={{
        height: '100vh',
        background: colors.ink,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Subtle background gradient */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '800px',
        background: `radial-gradient(circle, ${colors.cyan.DEFAULT}10 0%, transparent 70%)`,
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />

      <div
        ref={containerRef}
        style={{
          display: 'flex',
          height: '100%',
          width: `${panels.length * 100}vw`,
        }}
      >
        {panels.map((panel, i) => (
          <div
            key={i}
            className="ch-panel"
            style={{
              width: '100vw',
              height: '100%',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '48px',
              position: 'relative',
            }}
          >
            <div style={{ maxWidth: '650px', textAlign: 'center' }}>
              <div
                className="panel-icon"
                style={{
                  marginBottom: '24px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                {renderPanelIcon(panel.icon, panel.color)}
              </div>
              <span
                className="panel-num"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '80px',
                  fontWeight: typography.fontWeight.bold,
                  color: panel.color,
                  display: 'block',
                  marginBottom: '16px',
                  opacity: i === 0 ? 0.2 : 0,
                }}
              >
                {panel.num}
              </span>
              <h3
                className="panel-title"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '44px',
                  fontWeight: typography.fontWeight.bold,
                  color: 'white',
                  marginBottom: '24px',
                  opacity: i === 0 ? 1 : 0,
                }}
              >
                {panel.title}
              </h3>
              <p
                className="panel-desc"
                style={{
                  fontSize: typography.fontSize.xl,
                  color: colors.gray[400],
                  lineHeight: typography.lineHeight.relaxed,
                  opacity: i === 0 ? 1 : 0,
                }}
              >
                {panel.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Progress dots */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '12px',
      }}>
        {panels.map((panel, i) => (
          <div
            key={i}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: i === 0 ? panel.color : colors.gray[700],
            }}
          />
        ))}
      </div>
    </section>
  )
}

function CinematicFeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.cf-card')
      if (cards) {
        cards.forEach((card, i) => {
          gsap.fromTo(card,
            {
              opacity: 0,
              y: 120,
              rotateX: 10,
              transformPerspective: 1200,
            },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                end: 'top 55%',
                scrub: 1,
              },
            }
          )

          // Subtle parallax on scroll
          gsap.to(card, {
            y: -25 * (i + 1),
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          })
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const features = [
    { num: '01', title: 'Stable by design', desc: 'Dollar-pegged. Always. Your $100K stays $100K.', icon: 'lock' },
    { num: '02', title: 'Borderless', desc: 'Tokyo to Toronto in seconds. No SWIFT. No waiting.', icon: 'globe' },
    { num: '03', title: 'Machine-native', desc: 'APIs your robots can call. No wallet popups.', icon: 'bolt' },
    { num: '04', title: 'Transparent', desc: 'Real-time reserves. Audited. On-chain proof.', icon: 'chart' },
  ]

  const renderFeatureIcon = (iconName: string) => {
    const iconProps = { size: 80, color: colors.gray[200] }
    switch (iconName) {
      case 'lock': return <IconLock {...iconProps} />
      case 'globe': return <IconGlobe {...iconProps} />
      case 'bolt': return <IconBolt {...iconProps} />
      case 'chart': return <IconChart {...iconProps} />
      default: return null
    }
  }

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '180px 24px',
        background: colors.paper,
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '14px',
          fontWeight: typography.fontWeight.bold,
          color: colors.cyan.DEFAULT,
          letterSpacing: typography.letterSpacing.widest,
          textTransform: 'uppercase',
          marginBottom: '16px',
        }}>
          Why QUSD
        </h2>
        <p style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '36px',
          fontWeight: typography.fontWeight.bold,
          color: colors.ink,
          marginBottom: '80px',
          maxWidth: '600px',
        }}>
          Infrastructure for the machine economy.
        </p>

        <div ref={cardsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }}>
          {features.map((f, i) => (
            <div
              key={i}
              className="cf-card"
              style={{
                padding: '48px',
                background: 'white',
                borderRadius: '24px',
                border: `1px solid ${colors.gray[200]}`,
                opacity: 0,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                opacity: 0.08,
              }}>
                {renderFeatureIcon(f.icon)}
              </div>
              <span style={{
                fontFamily: typography.fontFamily.mono,
                fontSize: '56px',
                fontWeight: typography.fontWeight.bold,
                color: colors.gray[200],
                display: 'block',
                marginBottom: '20px',
              }}>
                {f.num}
              </span>
              <h3 style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '26px',
                fontWeight: typography.fontWeight.bold,
                color: colors.ink,
                marginBottom: '14px',
              }}>
                {f.title}
              </h3>
              <p style={{
                fontSize: typography.fontSize.lg,
                color: colors.gray[500],
                lineHeight: typography.lineHeight.relaxed,
              }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CinematicLogoCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Content reveal
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Logo animations
      gsap.fromTo(logoRef.current,
        { scale: 0, rotation: -180 },
        {
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: 'elastic.out(1, 0.6)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Continuous glow
      gsap.to(logoRef.current, {
        filter: 'drop-shadow(0 0 50px rgba(14, 204, 237, 0.7))',
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1,
      })

      // Floating
      gsap.to(logoRef.current, {
        y: -20,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '200px 24px',
        background: colors.ink,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background gradients */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '400px',
        height: '400px',
        background: `radial-gradient(circle, ${colors.cyan.DEFAULT}15 0%, transparent 70%)`,
        borderRadius: '50%',
        filter: 'blur(60px)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '15%',
        width: '350px',
        height: '350px',
        background: `radial-gradient(circle, ${colors.blue.DEFAULT}15 0%, transparent 70%)`,
        borderRadius: '50%',
        filter: 'blur(50px)',
      }} />

      <div
        ref={contentRef}
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
          opacity: 0,
        }}
      >
        <div
          ref={logoRef}
          style={{
            marginBottom: '48px',
            display: 'inline-block',
            filter: 'drop-shadow(0 0 30px rgba(14, 204, 237, 0.4))',
            transform: 'scale(0)',
          }}
        >
          <Logo variant="icon" color="cyan" size={90} />
        </div>

        <h2 style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '52px',
          fontWeight: typography.fontWeight.bold,
          color: 'white',
          marginBottom: '24px',
          lineHeight: 1.1,
        }}>
          The future is funded.
        </h2>
        <p style={{
          fontSize: typography.fontSize.xl,
          color: colors.gray[400],
          marginBottom: '48px',
          lineHeight: typography.lineHeight.relaxed,
        }}>
          Join the builders making machines work.
        </p>
        <a href="#" style={{
          padding: '20px 56px',
          background: colors.cyan.DEFAULT,
          color: colors.ink,
          fontFamily: typography.fontFamily.mono,
          fontSize: typography.fontSize.base,
          fontWeight: typography.fontWeight.bold,
          borderRadius: '4px',
          textDecoration: 'none',
          display: 'inline-block',
          boxShadow: `0 0 30px ${colors.cyan.DEFAULT}40`,
        }}>
          Get Started
        </a>
      </div>
    </section>
  )
}

function CinematicFooter() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!footerRef.current) return

    const ctx = gsap.context(() => {
      const items = footerRef.current?.querySelectorAll('.footer-el')
      if (items && items.length > 0) {
        gsap.fromTo(items,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={footerRef}
      style={{
        padding: '60px 24px',
        background: colors.ink,
        borderTop: `1px solid ${colors.gray[800]}`,
      }}
    >
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div className="footer-el" style={{ opacity: 0 }}>
          <Logo variant="horizontal" color="white" size={120} />
        </div>
        <span className="footer-el" style={{
          fontFamily: typography.fontFamily.mono,
          fontSize: typography.fontSize.xs,
          color: colors.gray[500],
          opacity: 0,
        }}>
          Stable money for the machine age.
        </span>
      </div>
    </footer>
  )
}

export function CompositionCinematicHorizontal() {
  return (
    <div>
      <CinematicHorizontalHero />
      <CinematicHorizontalScroll />
      <CinematicFeaturesSection />
      <CinematicLogoCTA />
      <CinematicFooter />
    </div>
  )
}
