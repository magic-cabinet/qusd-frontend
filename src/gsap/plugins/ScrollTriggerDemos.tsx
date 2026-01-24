import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { colors, typography } from '../../design-system/tokens'
import { Logo } from '../components/Logo'

// Register plugin
gsap.registerPlugin(ScrollTrigger)

const sectionStyle: React.CSSProperties = {
  minHeight: '100vh',
  padding: '80px 60px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
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

// 1. Basic Scroll Trigger - Elements animate when scrolled into view
export function ScrollTriggerBasic() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const sections = containerRef.current.querySelectorAll('.scroll-section')

    sections.forEach((section) => {
      const content = section.querySelector('.content')

      gsap.fromTo(content,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  const sections = [
    { title: 'Machine Economy', body: 'QUSD powers the autonomous future.', bg: colors.paper },
    { title: 'Agent-First', body: 'Built for AI agents, not retrofitted.', bg: colors.gray[100] },
    { title: 'Multi-Chain', body: 'One interface, every blockchain.', bg: colors.paper },
    { title: 'Open Source', body: 'MIT licensed. Fully transparent.', bg: colors.gray[100] },
  ]

  return (
    <div ref={containerRef} style={{ overflowY: 'auto', height: '600px' }}>
      {sections.map((section, i) => (
        <div
          key={i}
          className="scroll-section"
          style={{ ...sectionStyle, background: section.bg, minHeight: '500px' }}
        >
          <div className="content" style={{ opacity: 0 }}>
            <h2 style={headerStyle}>{section.title}</h2>
            <p style={bodyStyle}>{section.body}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// 2. Scrub Animation - Animation progress tied to scroll position
export function ScrollTriggerScrub() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!containerRef.current || !progressRef.current || !logoRef.current) return

    // Progress bar
    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    })

    // Logo rotation tied to scroll
    gsap.to(logoRef.current, {
      rotation: 360,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <div style={{ position: 'relative' }}>
      {/* Progress bar */}
      <div
        ref={progressRef}
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: colors.gradient.primary,
          transformOrigin: 'left',
          transform: 'scaleX(0)',
          zIndex: 100,
        }}
      />

      <div ref={containerRef} style={{ overflowY: 'auto', height: '600px' }}>
        <div style={{ height: '200vh', padding: '60px', background: colors.paper }}>
          <div style={{ position: 'sticky', top: '40%', textAlign: 'center' }}>
            <Logo ref={logoRef} variant="icon" color="cyan" size={150} />
            <p style={{ ...bodyStyle, marginTop: '24px', textAlign: 'center', maxWidth: 'none' }}>
              Scroll to rotate the logo (scrub animation)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// 3. Pin Animation - Element stays fixed while content scrolls
export function ScrollTriggerPin() {
  const containerRef = useRef<HTMLDivElement>(null)
  const pinnedRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !pinnedRef.current) return

    const cards = containerRef.current.querySelectorAll('.card')

    // Pin the left side
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      pin: pinnedRef.current,
      pinSpacing: false,
    })

    // Animate cards as they come into view
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: card,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  const features = [
    { num: '01', title: 'Instant Settlement', desc: 'Sub-second finality for machine-speed transactions.' },
    { num: '02', title: 'Zero Gas Abstraction', desc: 'Pay fees in QUSD, not native tokens.' },
    { num: '03', title: 'Programmable Money', desc: 'Smart contract native from day one.' },
    { num: '04', title: 'Cross-Chain Bridge', desc: 'Move value seamlessly across networks.' },
  ]

  return (
    <div ref={containerRef} style={{ display: 'flex', height: '600px', overflow: 'auto' }}>
      {/* Pinned left section */}
      <div
        ref={pinnedRef}
        style={{
          width: '40%',
          height: '100%',
          background: colors.ink,
          padding: '60px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Logo variant="icon" color="cyan" size={80} style={{ marginBottom: '32px' }} />
        <h2 style={{ ...headerStyle, color: 'white', fontSize: typography.fontSize['4xl'] }}>
          Why QUSD?
        </h2>
        <p style={{ ...bodyStyle, color: colors.gray[400], marginTop: '16px' }}>
          Scroll to discover the features that make QUSD the choice for autonomous systems.
        </p>
      </div>

      {/* Scrolling right section */}
      <div style={{ width: '60%', padding: '60px', background: colors.paper }}>
        {features.map((feature) => (
          <div
            key={feature.num}
            className="card"
            style={{
              padding: '40px',
              background: 'white',
              borderRadius: '16px',
              marginBottom: '24px',
              border: `1px solid ${colors.gray[200]}`,
              opacity: 0,
            }}
          >
            <span style={{
              fontFamily: typography.fontFamily.mono,
              fontSize: typography.fontSize.xs,
              color: colors.cyan.DEFAULT,
              letterSpacing: '0.1em',
            }}>
              {feature.num}
            </span>
            <h3 style={{
              fontFamily: typography.fontFamily.mono,
              fontSize: typography.fontSize.xl,
              fontWeight: typography.fontWeight.bold,
              marginTop: '8px',
              marginBottom: '8px',
            }}>
              {feature.title}
            </h3>
            <p style={{ ...bodyStyle, fontSize: typography.fontSize.base }}>
              {feature.desc}
            </p>
          </div>
        ))}
        <div style={{ height: '200px' }} />
      </div>
    </div>
  )
}

// 4. Horizontal Scroll - Convert vertical scroll to horizontal movement
export function ScrollTriggerHorizontal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !scrollRef.current) return

    const sections = scrollRef.current.querySelectorAll('.h-section')
    const totalWidth = (sections.length - 1) * 100

    gsap.to(scrollRef.current, {
      x: () => `-${totalWidth}vw`,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${totalWidth}%`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  const panels = [
    { title: 'Connect', icon: '01', color: colors.cyan.DEFAULT },
    { title: 'Fund', icon: '02', color: colors.blue.DEFAULT },
    { title: 'Transact', icon: '03', color: colors.cyan.DEFAULT },
    { title: 'Scale', icon: '04', color: colors.blue.DEFAULT },
  ]

  return (
    <div ref={containerRef} style={{ height: '600px', overflow: 'auto' }}>
      <div style={{ height: '300vh' }}>
        <div
          ref={scrollRef}
          style={{
            display: 'flex',
            width: `${panels.length * 100}vw`,
            height: '100vh',
            position: 'sticky',
            top: 0,
          }}
        >
          {panels.map((panel, i) => (
            <div
              key={i}
              className="h-section"
              style={{
                width: '100vw',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                background: i % 2 === 0 ? colors.paper : colors.gray[100],
              }}
            >
              <span style={{
                fontFamily: typography.fontFamily.mono,
                fontSize: typography.fontSize['8xl'],
                fontWeight: typography.fontWeight.bold,
                color: panel.color,
                opacity: 0.2,
              }}>
                {panel.icon}
              </span>
              <h2 style={{ ...headerStyle, marginTop: '-40px' }}>{panel.title}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 5. Parallax Layers - Elements move at different speeds
export function ScrollTriggerParallax() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const layers = containerRef.current.querySelectorAll('.parallax-layer')

    layers.forEach((layer, i) => {
      const speed = (i + 1) * 0.2

      gsap.to(layer, {
        y: () => -speed * 300,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        height: '600px',
        overflow: 'auto',
        position: 'relative',
      }}
    >
      <div style={{ height: '200vh', position: 'relative' }}>
        {/* Background layer - slowest */}
        <div
          className="parallax-layer"
          style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: `${colors.cyan.DEFAULT}20`,
          }}
        />
        <div
          className="parallax-layer"
          style={{
            position: 'absolute',
            top: '40%',
            right: '15%',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: `${colors.blue.DEFAULT}15`,
          }}
        />

        {/* Middle layer */}
        <div
          className="parallax-layer"
          style={{
            position: 'absolute',
            top: '30%',
            left: '30%',
          }}
        >
          <Logo variant="icon" color="cyan" size={100} style={{ opacity: 0.5 }} />
        </div>

        {/* Foreground layer - fastest */}
        <div
          className="parallax-layer"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
          }}
        >
          <Logo variant="icon" color="cyan" size={120} />
          <h2 style={{ ...headerStyle, marginTop: '24px' }}>QUSD</h2>
          <p style={{ ...bodyStyle, marginTop: '8px' }}>Scroll for parallax</p>
        </div>
      </div>
    </div>
  )
}
