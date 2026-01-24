import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { colors, typography } from '../../design-system/tokens'
import { Logo } from '../components/Logo'

// Register plugin
gsap.registerPlugin(ScrollToPlugin)

// 1. Smooth scroll to section
export function ScrollToSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollTo = (index: number) => {
    if (!containerRef.current) return

    const sections = containerRef.current.querySelectorAll('.section')
    const target = sections[index]

    if (target) {
      gsap.to(containerRef.current, {
        duration: 1,
        scrollTo: { y: target, offsetY: 20 },
        ease: 'power3.inOut',
      })
    }
  }

  const sections = [
    { title: 'Introduction', color: colors.paper },
    { title: 'How It Works', color: colors.gray[100] },
    { title: 'Features', color: colors.paper },
    { title: 'Get Started', color: colors.ink },
  ]

  return (
    <div style={{ display: 'flex', gap: '24px' }}>
      {/* Navigation */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: 'fit-content',
        padding: '20px',
        background: 'white',
        borderRadius: '12px',
        border: `1px solid ${colors.gray[200]}`,
      }}>
        <span style={{
          fontFamily: typography.fontFamily.mono,
          fontSize: typography.fontSize.xs,
          color: colors.gray[400],
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          display: 'block',
          marginBottom: '16px',
        }}>
          Navigate
        </span>
        {sections.map((section, i) => (
          <button
            key={section.title}
            onClick={() => scrollTo(i)}
            style={{
              display: 'block',
              width: '100%',
              padding: '10px 16px',
              background: 'transparent',
              border: 'none',
              textAlign: 'left',
              fontFamily: typography.fontFamily.mono,
              fontSize: typography.fontSize.sm,
              color: colors.ink,
              cursor: 'pointer',
              borderRadius: '6px',
              marginBottom: '4px',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = colors.gray[100])}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            {section.title}
          </button>
        ))}
      </div>

      {/* Scrollable content */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          height: '500px',
          overflow: 'auto',
          borderRadius: '16px',
          border: `1px solid ${colors.gray[200]}`,
        }}
      >
        {sections.map((section, i) => (
          <div
            key={section.title}
            className="section"
            style={{
              minHeight: '400px',
              padding: '60px',
              background: section.color,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <span style={{
              fontFamily: typography.fontFamily.mono,
              fontSize: typography.fontSize.xs,
              color: section.color === colors.ink ? colors.cyan.DEFAULT : colors.gray[400],
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}>
              0{i + 1}
            </span>
            <h2 style={{
              fontFamily: typography.fontFamily.mono,
              fontSize: typography.fontSize['4xl'],
              fontWeight: typography.fontWeight.bold,
              color: section.color === colors.ink ? 'white' : colors.ink,
              marginTop: '8px',
            }}>
              {section.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  )
}

// 2. Scroll to specific position
export function ScrollToPosition() {
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollToPosition = (position: 'top' | 'middle' | 'bottom') => {
    if (!containerRef.current) return

    const scrollHeight = containerRef.current.scrollHeight - containerRef.current.clientHeight
    const positions = {
      top: 0,
      middle: scrollHeight / 2,
      bottom: scrollHeight,
    }

    gsap.to(containerRef.current, {
      duration: 1.2,
      scrollTo: { y: positions[position] },
      ease: 'power2.inOut',
    })
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        {(['top', 'middle', 'bottom'] as const).map((pos) => (
          <button
            key={pos}
            onClick={() => scrollToPosition(pos)}
            style={{
              padding: '10px 20px',
              background: colors.ink,
              color: 'white',
              fontFamily: typography.fontFamily.mono,
              fontSize: typography.fontSize.xs,
              textTransform: 'uppercase',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            {pos}
          </button>
        ))}
      </div>

      <div
        ref={containerRef}
        style={{
          height: '400px',
          overflow: 'auto',
          background: `linear-gradient(180deg, ${colors.cyan.DEFAULT} 0%, ${colors.blue.DEFAULT} 50%, ${colors.ink} 100%)`,
          borderRadius: '16px',
          padding: '40px',
        }}
      >
        <div style={{ height: '1200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ textAlign: 'center' }}>
            <Logo variant="icon" color="white" size={60} />
            <p style={{ color: 'white', fontFamily: typography.fontFamily.mono, marginTop: '12px' }}>Top</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Logo variant="icon" color="white" size={80} />
            <p style={{ color: 'white', fontFamily: typography.fontFamily.mono, marginTop: '12px' }}>Middle</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Logo variant="icon" color="white" size={60} />
            <p style={{ color: 'white', fontFamily: typography.fontFamily.mono, marginTop: '12px' }}>Bottom</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// 3. Auto-scroll showcase
export function ScrollToAutoplay() {
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  const startAutoScroll = () => {
    if (!containerRef.current) return

    // Kill existing timeline
    if (timelineRef.current) {
      timelineRef.current.kill()
    }

    const sections = containerRef.current.querySelectorAll('.auto-section')

    timelineRef.current = gsap.timeline()

    sections.forEach((section, i) => {
      if (i > 0) {
        timelineRef.current!.to(containerRef.current, {
          duration: 1,
          scrollTo: { y: section, offsetY: 0 },
          ease: 'power2.inOut',
          delay: 1.5,
        })
      }
    })
  }

  const stopAutoScroll = () => {
    if (timelineRef.current) {
      timelineRef.current.kill()
    }
  }

  const features = [
    { icon: '🚀', title: 'Fast', desc: 'Sub-second finality' },
    { icon: '🔒', title: 'Secure', desc: 'Audited smart contracts' },
    { icon: '🌐', title: 'Global', desc: 'Multi-chain support' },
    { icon: '💡', title: 'Smart', desc: 'Agent-first design' },
  ]

  return (
    <div>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <button
          onClick={startAutoScroll}
          style={{
            padding: '10px 20px',
            background: colors.cyan.DEFAULT,
            color: 'white',
            fontFamily: typography.fontFamily.mono,
            fontSize: typography.fontSize.sm,
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Start Tour
        </button>
        <button
          onClick={stopAutoScroll}
          style={{
            padding: '10px 20px',
            background: colors.gray[200],
            color: colors.ink,
            fontFamily: typography.fontFamily.mono,
            fontSize: typography.fontSize.sm,
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Stop
        </button>
      </div>

      <div
        ref={containerRef}
        style={{
          height: '300px',
          overflow: 'auto',
          borderRadius: '16px',
          border: `1px solid ${colors.gray[200]}`,
        }}
      >
        {features.map((feature, i) => (
          <div
            key={feature.title}
            className="auto-section"
            style={{
              height: '300px',
              padding: '60px',
              background: i % 2 === 0 ? colors.paper : colors.gray[100],
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <span style={{ fontSize: '48px', marginBottom: '16px' }}>{feature.icon}</span>
            <h3 style={{
              fontFamily: typography.fontFamily.mono,
              fontSize: typography.fontSize['3xl'],
              fontWeight: typography.fontWeight.bold,
            }}>
              {feature.title}
            </h3>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: typography.fontSize.lg,
              color: colors.gray[500],
              marginTop: '8px',
            }}>
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
