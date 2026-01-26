import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { colors, typography } from '../../design-system/tokens'
import { Logo } from '../components/Logo'

gsap.registerPlugin(ScrollTrigger)

// Frame-based panel component - inspired by Remotion's frame concept
interface FrameProps {
  children: React.ReactNode
  background?: string
  className?: string
}

function Frame({ children, background = colors.ink, className = '' }: FrameProps) {
  return (
    <div
      className={`h-frame ${className}`}
      style={{
        width: '100vw',
        height: '100vh',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  )
}

// === FRAME 1: Hero with Coin Animation ===
function HeroFrame() {
  const contentRef = useRef<HTMLDivElement>(null)
  const coinRef = useRef<HTMLDivElement>(null)
  const orbitRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Coin rotation
      gsap.to(coinRef.current, {
        rotateY: 360,
        duration: 8,
        repeat: -1,
        ease: 'none',
      })

      // Orbit particles
      const particles = orbitRef.current?.querySelectorAll('.orbit-particle')
      particles?.forEach((particle, i) => {
        const angle = (i / (particles.length)) * Math.PI * 2
        const radius = 120
        gsap.to(particle, {
          motionPath: {
            path: [
              { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius * 0.3 },
              { x: Math.cos(angle + Math.PI) * radius, y: Math.sin(angle + Math.PI) * radius * 0.3 },
              { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius * 0.3 },
            ],
            curviness: 1,
          },
          duration: 4 + i * 0.5,
          repeat: -1,
          ease: 'none',
        })
      })

      // Pulsing glow
      gsap.to('.coin-glow', {
        opacity: 0.8,
        scale: 1.2,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }, contentRef)

    return () => ctx.revert()
  }, [])

  return (
    <Frame background={`linear-gradient(135deg, ${colors.ink} 0%, #1a1a2e 100%)`}>
      <div ref={contentRef} style={{ display: 'flex', alignItems: 'center', gap: '120px', padding: '0 80px' }}>
        {/* Coin visualization */}
        <div style={{ position: 'relative', width: 300, height: 300 }}>
          {/* Glow */}
          <div
            className="coin-glow"
            style={{
              position: 'absolute',
              inset: -40,
              background: `radial-gradient(circle, ${colors.cyan.DEFAULT}40 0%, transparent 70%)`,
              borderRadius: '50%',
              filter: 'blur(30px)',
            }}
          />

          {/* Orbit particles */}
          <div ref={orbitRef} style={{ position: 'absolute', inset: 0 }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="orbit-particle"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: colors.cyan.DEFAULT,
                  boxShadow: `0 0 10px ${colors.cyan.DEFAULT}`,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            ))}
          </div>

          {/* Coin */}
          <div
            ref={coinRef}
            style={{
              position: 'absolute',
              inset: 40,
              borderRadius: '50%',
              background: `linear-gradient(135deg, #D4AF37 0%, #B8860B 50%, #D4AF37 100%)`,
              boxShadow: `
                0 0 60px rgba(212, 175, 55, 0.4),
                inset 0 2px 20px rgba(255, 255, 255, 0.3),
                inset 0 -2px 20px rgba(0, 0, 0, 0.3)
              `,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transformStyle: 'preserve-3d',
              perspective: 1000,
            }}
          >
            <Logo variant="icon" color="white" size={100} />
          </div>
        </div>

        {/* Text content */}
        <div style={{ maxWidth: 500 }}>
          <h1
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '56px',
              fontWeight: typography.fontWeight.bold,
              lineHeight: 1.1,
              color: 'white',
              marginBottom: '24px',
            }}
          >
            Fund machines.
            <br />
            <span style={{ color: colors.cyan.DEFAULT }}>In real money.</span>
          </h1>

          <p
            style={{
              fontSize: typography.fontSize.xl,
              lineHeight: typography.lineHeight.relaxed,
              color: colors.gray[400],
              marginBottom: '32px',
            }}
          >
            QUSD: Stable digital dollars for the autonomous economy.
            No volatility. No borders. No waiting.
          </p>

          <div style={{ display: 'flex', gap: '16px' }}>
            <button
              style={{
                padding: '16px 32px',
                background: colors.cyan.DEFAULT,
                color: colors.ink,
                fontFamily: typography.fontFamily.mono,
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.bold,
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Get Started
            </button>
            <button
              style={{
                padding: '16px 32px',
                background: 'transparent',
                color: 'white',
                fontFamily: typography.fontFamily.mono,
                fontSize: typography.fontSize.sm,
                border: `1px solid ${colors.gray[600]}`,
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span style={{ fontFamily: typography.fontFamily.mono, fontSize: '12px', color: colors.gray[500] }}>
          SCROLL
        </span>
        <div
          style={{
            width: 24,
            height: 40,
            border: `2px solid ${colors.gray[600]}`,
            borderRadius: 12,
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 8,
          }}
        >
          <div
            className="scroll-dot"
            style={{
              width: 4,
              height: 8,
              background: colors.cyan.DEFAULT,
              borderRadius: 2,
            }}
          />
        </div>
      </div>
    </Frame>
  )
}

// === FRAME 2: Problem Statement ===
function ProblemFrame() {
  return (
    <Frame background={colors.paper}>
      <div style={{ maxWidth: 800, textAlign: 'center', padding: '0 40px' }}>
        <span
          style={{
            fontFamily: typography.fontFamily.mono,
            fontSize: typography.fontSize.xs,
            color: colors.blue.DEFAULT,
            letterSpacing: typography.letterSpacing.widest,
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '24px',
          }}
        >
          The Problem
        </span>

        <h2
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '48px',
            fontWeight: typography.fontWeight.bold,
            color: colors.ink,
            marginBottom: '48px',
            lineHeight: 1.2,
          }}
        >
          Crypto promised global money.
          <br />
          It delivered casino chips.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
          {[
            { icon: '📉', title: 'Volatility', desc: 'Raise $50K. Market dips. Now you have $30K.' },
            { icon: '🌍', title: 'Borders', desc: 'Wire fees. 3-week delays. 8% gone to middlemen.' },
            { icon: '🤖', title: 'Automation', desc: "Machines can't click 'approve' on a wallet popup." },
          ].map((item, i) => (
            <div
              key={i}
              className="problem-card"
              style={{
                padding: '32px',
                background: 'white',
                borderRadius: '16px',
                border: `1px solid ${colors.gray[200]}`,
              }}
            >
              <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>{item.icon}</span>
              <h3
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: typography.fontSize.lg,
                  fontWeight: typography.fontWeight.bold,
                  color: colors.ink,
                  marginBottom: '8px',
                }}
              >
                {item.title}
              </h3>
              <p style={{ fontSize: typography.fontSize.base, color: colors.gray[500] }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  )
}

// === FRAME 3: Solution - Step 1 ===
function SolutionFrame1() {
  return (
    <Frame background={colors.ink}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '80px', padding: '0 80px', maxWidth: 1200 }}>
        <div style={{ flex: 1 }}>
          <span
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '120px',
              fontWeight: typography.fontWeight.bold,
              color: colors.cyan.DEFAULT,
              opacity: 0.2,
              display: 'block',
              lineHeight: 1,
            }}
          >
            01
          </span>
          <h2
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '48px',
              fontWeight: typography.fontWeight.bold,
              color: 'white',
              marginTop: '-40px',
              marginBottom: '24px',
            }}
          >
            Set a goal
          </h2>
          <p
            style={{
              fontSize: typography.fontSize.xl,
              color: colors.gray[400],
              lineHeight: typography.lineHeight.relaxed,
            }}
          >
            Define your milestone. $10K for a prototype. $100K for production tooling. Clear targets that backers can
            trust.
          </p>
        </div>

        <div
          style={{
            flex: 1,
            height: 400,
            background: `linear-gradient(135deg, ${colors.cyan.DEFAULT}10 0%, ${colors.blue.DEFAULT}10 100%)`,
            borderRadius: '24px',
            border: `1px solid ${colors.cyan.DEFAULT}30`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '72px',
                fontWeight: typography.fontWeight.bold,
                color: colors.cyan.DEFAULT,
              }}
            >
              $50,000
            </div>
            <div
              style={{
                fontFamily: typography.fontFamily.mono,
                fontSize: typography.fontSize.sm,
                color: colors.gray[400],
                textTransform: 'uppercase',
                letterSpacing: typography.letterSpacing.widest,
              }}
            >
              Funding Goal
            </div>
            <div
              style={{
                marginTop: '24px',
                height: '8px',
                width: '200px',
                background: colors.gray[800],
                borderRadius: '4px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: '65%',
                  height: '100%',
                  background: `linear-gradient(90deg, ${colors.cyan.DEFAULT}, ${colors.blue.DEFAULT})`,
                  borderRadius: '4px',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Frame>
  )
}

// === FRAME 4: Solution - Step 2 ===
function SolutionFrame2() {
  return (
    <Frame background={`linear-gradient(180deg, ${colors.ink} 0%, #0d1b2a 100%)`}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '80px', padding: '0 80px', maxWidth: 1200 }}>
        <div
          style={{
            flex: 1,
            height: 400,
            background: `linear-gradient(135deg, ${colors.blue.DEFAULT}10 0%, ${colors.cyan.DEFAULT}10 100%)`,
            borderRadius: '24px',
            border: `1px solid ${colors.blue.DEFAULT}30`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Animated coins */}
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="falling-coin"
              style={{
                position: 'absolute',
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: `linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)`,
                boxShadow: '0 4px 20px rgba(212, 175, 55, 0.4)',
                left: `${30 + i * 20}%`,
                top: '20%',
              }}
            />
          ))}
          <div
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '36px',
              fontWeight: typography.fontWeight.bold,
              color: 'white',
              textAlign: 'center',
              zIndex: 1,
            }}
          >
            $1 = 1 QUSD
            <br />
            <span style={{ fontSize: typography.fontSize.lg, color: colors.gray[400], fontWeight: 'normal' }}>
              Always. Forever.
            </span>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <span
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '120px',
              fontWeight: typography.fontWeight.bold,
              color: colors.blue.DEFAULT,
              opacity: 0.2,
              display: 'block',
              lineHeight: 1,
            }}
          >
            02
          </span>
          <h2
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '48px',
              fontWeight: typography.fontWeight.bold,
              color: 'white',
              marginTop: '-40px',
              marginBottom: '24px',
            }}
          >
            Fund in QUSD
          </h2>
          <p
            style={{
              fontSize: typography.fontSize.xl,
              color: colors.gray[400],
              lineHeight: typography.lineHeight.relaxed,
            }}
          >
            Backers contribute stable dollars. No volatility. What you raise is what you have. No surprises.
          </p>
        </div>
      </div>
    </Frame>
  )
}

// === FRAME 5: Solution - Step 3 ===
function SolutionFrame3() {
  return (
    <Frame background={colors.ink}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '80px', padding: '0 80px', maxWidth: 1200 }}>
        <div style={{ flex: 1 }}>
          <span
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '120px',
              fontWeight: typography.fontWeight.bold,
              color: colors.cyan.light,
              opacity: 0.2,
              display: 'block',
              lineHeight: 1,
            }}
          >
            03
          </span>
          <h2
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '48px',
              fontWeight: typography.fontWeight.bold,
              color: 'white',
              marginTop: '-40px',
              marginBottom: '24px',
            }}
          >
            Build anywhere
          </h2>
          <p
            style={{
              fontSize: typography.fontSize.xl,
              color: colors.gray[400],
              lineHeight: typography.lineHeight.relaxed,
            }}
          >
            Your team in Tokyo. Your factory in Shenzhen. Your contributors everywhere. Same money. Same speed.
          </p>
        </div>

        {/* Globe visualization */}
        <div
          style={{
            flex: 1,
            height: 400,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 300,
              height: 300,
              borderRadius: '50%',
              border: `2px solid ${colors.cyan.DEFAULT}30`,
              position: 'relative',
            }}
          >
            {/* Connection lines */}
            <svg
              style={{ position: 'absolute', inset: -50, width: 400, height: 400 }}
              viewBox="0 0 400 400"
            >
              <circle cx="200" cy="200" r="150" fill="none" stroke={colors.cyan.DEFAULT} strokeWidth="1" opacity="0.2" />
              <circle cx="200" cy="200" r="100" fill="none" stroke={colors.blue.DEFAULT} strokeWidth="1" opacity="0.15" />

              {/* City dots */}
              <circle cx="120" cy="140" r="8" fill={colors.cyan.DEFAULT} />
              <circle cx="280" cy="160" r="8" fill={colors.cyan.DEFAULT} />
              <circle cx="200" cy="280" r="8" fill={colors.cyan.DEFAULT} />
              <circle cx="320" cy="240" r="8" fill={colors.cyan.DEFAULT} />
              <circle cx="80" cy="220" r="8" fill={colors.cyan.DEFAULT} />

              {/* Connection lines */}
              <line x1="120" y1="140" x2="200" y2="200" stroke={colors.cyan.DEFAULT} strokeWidth="1" opacity="0.5" />
              <line x1="280" y1="160" x2="200" y2="200" stroke={colors.cyan.DEFAULT} strokeWidth="1" opacity="0.5" />
              <line x1="200" y1="280" x2="200" y2="200" stroke={colors.cyan.DEFAULT} strokeWidth="1" opacity="0.5" />
              <line x1="320" y1="240" x2="200" y2="200" stroke={colors.cyan.DEFAULT} strokeWidth="1" opacity="0.5" />
              <line x1="80" y1="220" x2="200" y2="200" stroke={colors.cyan.DEFAULT} strokeWidth="1" opacity="0.5" />

              {/* Center QUSD node */}
              <circle cx="200" cy="200" r="20" fill={colors.cyan.DEFAULT} />
            </svg>
          </div>
        </div>
      </div>
    </Frame>
  )
}

// === FRAME 6: Solution - Step 4 ===
function SolutionFrame4() {
  return (
    <Frame background={`linear-gradient(180deg, #0d1b2a 0%, ${colors.ink} 100%)`}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '80px', padding: '0 80px', maxWidth: 1200 }}>
        {/* Robot visualization */}
        <div
          style={{
            flex: 1,
            height: 400,
            background: `linear-gradient(135deg, ${colors.blue.light}10 0%, ${colors.cyan.DEFAULT}05 100%)`,
            borderRadius: '24px',
            border: `1px solid ${colors.blue.light}30`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '80px', marginBottom: '16px' }}>🤖</div>
            <div
              style={{
                fontFamily: typography.fontFamily.mono,
                fontSize: typography.fontSize.sm,
                color: colors.cyan.DEFAULT,
                background: `${colors.cyan.DEFAULT}20`,
                padding: '8px 16px',
                borderRadius: '8px',
                display: 'inline-block',
              }}
            >
              Executing transaction...
            </div>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <span
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '120px',
              fontWeight: typography.fontWeight.bold,
              color: colors.blue.light,
              opacity: 0.2,
              display: 'block',
              lineHeight: 1,
            }}
          >
            04
          </span>
          <h2
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '48px',
              fontWeight: typography.fontWeight.bold,
              color: 'white',
              marginTop: '-40px',
              marginBottom: '24px',
            }}
          >
            Machines transact
          </h2>
          <p
            style={{
              fontSize: typography.fontSize.xl,
              color: colors.gray[400],
              lineHeight: typography.lineHeight.relaxed,
            }}
          >
            Your robots buy parts. Pay for compute. Settle invoices. Autonomous payments for autonomous machines.
          </p>
        </div>
      </div>
    </Frame>
  )
}

// === FRAME 7: Stats ===
function StatsFrame() {
  return (
    <Frame background={colors.paper}>
      <div style={{ maxWidth: 1000, width: '100%', padding: '0 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span
            style={{
              fontFamily: typography.fontFamily.mono,
              fontSize: typography.fontSize.xs,
              color: colors.blue.DEFAULT,
              letterSpacing: typography.letterSpacing.widest,
              textTransform: 'uppercase',
            }}
          >
            By the numbers
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '48px' }}>
          {[
            { value: '$0', label: 'Transaction Fees' },
            { value: '47+', label: 'Countries' },
            { value: '100%', label: 'Open Source' },
            { value: '1:1', label: 'Dollar Backed' },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '56px',
                  fontWeight: typography.fontWeight.bold,
                  color: colors.cyan.DEFAULT,
                  marginBottom: '8px',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: typography.fontFamily.mono,
                  fontSize: typography.fontSize.sm,
                  color: colors.gray[500],
                  textTransform: 'uppercase',
                  letterSpacing: typography.letterSpacing.wide,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  )
}

// === FRAME 8: CTA ===
function CTAFrame() {
  return (
    <Frame background={colors.ink}>
      <div style={{ textAlign: 'center', maxWidth: 700, padding: '0 40px' }}>
        <Logo variant="icon" color="cyan" size={80} />

        <h2
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '48px',
            fontWeight: typography.fontWeight.bold,
            color: 'white',
            margin: '40px 0 24px',
            lineHeight: 1.2,
          }}
        >
          The future gets built
          <br />
          by people who fund it.
        </h2>

        <p
          style={{
            fontSize: typography.fontSize.xl,
            color: colors.gray[400],
            lineHeight: typography.lineHeight.relaxed,
            marginBottom: '40px',
          }}
        >
          Whether you're raising for a robot arm or backing the next breakthrough, stable money makes it possible.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button
            style={{
              padding: '20px 40px',
              background: colors.cyan.DEFAULT,
              color: colors.ink,
              fontFamily: typography.fontFamily.mono,
              fontSize: typography.fontSize.base,
              fontWeight: typography.fontWeight.bold,
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Start a Project
          </button>
          <button
            style={{
              padding: '20px 40px',
              background: 'transparent',
              color: 'white',
              fontFamily: typography.fontFamily.mono,
              fontSize: typography.fontSize.base,
              border: `1px solid ${colors.gray[600]}`,
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Read the Docs
          </button>
        </div>

        <div
          style={{
            marginTop: '80px',
            fontFamily: typography.fontFamily.mono,
            fontSize: typography.fontSize.xs,
            color: colors.gray[600],
          }}
        >
          Stable money for unstable times.
        </div>
      </div>
    </Frame>
  )
}

// === MAIN HORIZONTAL COMPOSITION ===
export function HorizontalFullSite() {
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !wrapperRef.current) return

    const ctx = gsap.context(() => {
      const frames = containerRef.current?.querySelectorAll('.h-frame')
      if (!frames || frames.length === 0) return

      // Main horizontal scroll
      const scrollTween = gsap.to(frames, {
        xPercent: -100 * (frames.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (frames.length - 1),
          end: () => `+=${(frames.length - 1) * window.innerWidth}`,
        },
      })

      // Animate content as frames come into view
      frames.forEach((frame, i) => {
        if (i === 0) return // Skip first frame

        const content = frame.querySelectorAll('h2, p, .problem-card, button')
        gsap.fromTo(
          content,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            scrollTrigger: {
              trigger: frame,
              containerAnimation: scrollTween,
              start: 'left 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })

      // Scroll dot animation
      gsap.to('.scroll-dot', {
        y: 16,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapperRef} style={{ overflow: 'hidden' }}>
      <div
        ref={containerRef}
        style={{
          display: 'flex',
          width: 'fit-content',
        }}
      >
        <HeroFrame />
        <ProblemFrame />
        <SolutionFrame1 />
        <SolutionFrame2 />
        <SolutionFrame3 />
        <SolutionFrame4 />
        <StatsFrame />
        <CTAFrame />
      </div>
    </div>
  )
}

// === VARIANT: Cinematic (slower scrub, more effects) ===
export function HorizontalCinematic() {
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !wrapperRef.current) return

    const ctx = gsap.context(() => {
      const frames = containerRef.current?.querySelectorAll('.h-frame')
      if (!frames || frames.length === 0) return

      // Slower cinematic scroll
      const scrollTween = gsap.to(frames, {
        xPercent: -100 * (frames.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          pin: true,
          scrub: 2, // Slower scrub
          snap: {
            snapTo: 1 / (frames.length - 1),
            duration: { min: 0.3, max: 0.6 },
            ease: 'power2.inOut',
          },
          end: () => `+=${(frames.length - 1) * window.innerWidth * 1.5}`,
        },
      })

      // Parallax backgrounds
      frames.forEach((frame) => {
        const bg = frame.querySelector('.frame-bg')
        if (bg) {
          gsap.to(bg, {
            x: '-20%',
            ease: 'none',
            scrollTrigger: {
              trigger: frame,
              containerAnimation: scrollTween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          })
        }
      })

      // Fade and scale content
      frames.forEach((frame, i) => {
        if (i === 0) return

        const content = frame.querySelector('.frame-content')
        if (content) {
          gsap.fromTo(
            content,
            { opacity: 0, scale: 0.9, filter: 'blur(10px)' },
            {
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: frame,
                containerAnimation: scrollTween,
                start: 'left 70%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        }
      })
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapperRef} style={{ overflow: 'hidden' }}>
      <div
        ref={containerRef}
        style={{
          display: 'flex',
          width: 'fit-content',
        }}
      >
        <HeroFrame />
        <ProblemFrame />
        <SolutionFrame1 />
        <SolutionFrame2 />
        <SolutionFrame3 />
        <SolutionFrame4 />
        <StatsFrame />
        <CTAFrame />
      </div>
    </div>
  )
}
