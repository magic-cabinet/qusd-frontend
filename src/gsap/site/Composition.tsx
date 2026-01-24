import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { colors, typography } from '../../design-system/tokens'
import { Logo } from '../components/Logo'

gsap.registerPlugin(ScrollTrigger)

// === HERO SECTION ===
function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subheadRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const circuitRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Draw circuit lines
      const paths = circuitRef.current?.querySelectorAll('.circuit-path')
      if (paths) {
        paths.forEach((path) => {
          const length = (path as SVGPathElement).getTotalLength?.() || 200
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
        })
        tl.to(paths, { strokeDashoffset: 0, duration: 1.2, stagger: 0.1, ease: 'power2.out' })
      }

      // Logo
      tl.fromTo(logoRef.current,
        { opacity: 0, scale: 0, rotation: -180 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.7)' },
        0.3
      )

      // Heading chars
      const chars = headingRef.current?.querySelectorAll('.char')
      if (chars) {
        tl.fromTo(chars,
          { opacity: 0, y: 60, rotateX: -90 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.7, stagger: 0.025, ease: 'back.out(1.5)' },
          0.5
        )
      }

      // Subhead
      tl.fromTo(subheadRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        1.2
      )

      // CTA
      const buttons = ctaRef.current?.querySelectorAll('a')
      if (buttons) {
        tl.fromTo(buttons,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
          1.4
        )
      }

      // Continuous logo glow
      gsap.to(logoRef.current, {
        filter: 'drop-shadow(0 0 30px rgba(14, 204, 237, 0.5))',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

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

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        background: colors.ink,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        padding: '80px 24px',
      }}
    >
      {/* Circuit background */}
      <svg
        ref={circuitRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <path className="circuit-path" d="M 0 200 L 150 200 L 180 230 L 300 230" stroke={colors.cyan.DEFAULT} strokeWidth="1" fill="none" opacity="0.3" />
        <path className="circuit-path" d="M 0 400 L 100 400 L 130 370 L 250 370" stroke={colors.blue.DEFAULT} strokeWidth="1" fill="none" opacity="0.2" />
        <path className="circuit-path" d="M 0 600 L 200 600 L 230 630 L 350 630" stroke={colors.cyan.DEFAULT} strokeWidth="1" fill="none" opacity="0.3" />
        <path className="circuit-path" d="M 1200 150 L 1050 150 L 1020 180 L 900 180" stroke={colors.blue.DEFAULT} strokeWidth="1" fill="none" opacity="0.2" />
        <path className="circuit-path" d="M 1200 350 L 1100 350 L 1070 320 L 950 320" stroke={colors.cyan.DEFAULT} strokeWidth="1" fill="none" opacity="0.3" />
        <path className="circuit-path" d="M 1200 550 L 1000 550 L 970 580 L 850 580" stroke={colors.blue.DEFAULT} strokeWidth="1" fill="none" opacity="0.2" />
        {/* Circuit nodes */}
        <circle cx="300" cy="230" r="4" fill={colors.cyan.DEFAULT} opacity="0.5" />
        <circle cx="250" cy="370" r="3" fill={colors.blue.DEFAULT} opacity="0.4" />
        <circle cx="350" cy="630" r="4" fill={colors.cyan.DEFAULT} opacity="0.5" />
        <circle cx="900" cy="180" r="3" fill={colors.blue.DEFAULT} opacity="0.4" />
        <circle cx="950" cy="320" r="4" fill={colors.cyan.DEFAULT} opacity="0.5" />
        <circle cx="850" cy="580" r="3" fill={colors.blue.DEFAULT} opacity="0.4" />
      </svg>

      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div ref={logoRef} style={{ marginBottom: '48px', opacity: 0 }}>
          <Logo variant="icon" color="cyan" size={80} />
        </div>

        <h1
          ref={headingRef}
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 'clamp(40px, 8vw, 72px)',
            fontWeight: typography.fontWeight.bold,
            lineHeight: 1.1,
            color: 'white',
            marginBottom: '32px',
            perspective: '1000px',
          }}
        >
          {splitText('Fund machines.')}
          <br />
          <span style={{ color: colors.cyan.DEFAULT }}>
            {splitText('In real money.')}
          </span>
        </h1>

        <p
          ref={subheadRef}
          style={{
            fontSize: typography.fontSize.xl,
            lineHeight: typography.lineHeight.relaxed,
            color: colors.gray[400],
            maxWidth: '600px',
            margin: '0 auto 40px',
            opacity: 0,
          }}
        >
          Back robotics projects from anywhere. Contributors set goals,
          you fund them in dollars that stay dollars. No speculation. Just progress.
        </p>

        <div ref={ctaRef} style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="#projects"
            style={{
              padding: '16px 32px',
              background: colors.cyan.DEFAULT,
              color: colors.ink,
              fontFamily: typography.fontFamily.mono,
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.bold,
              borderRadius: '8px',
              textDecoration: 'none',
              opacity: 0,
            }}
          >
            Browse Projects
          </a>
          <a
            href="#how"
            style={{
              padding: '16px 32px',
              background: 'transparent',
              color: 'white',
              fontFamily: typography.fontFamily.mono,
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.medium,
              borderRadius: '8px',
              border: `1px solid ${colors.gray[700]}`,
              textDecoration: 'none',
              opacity: 0,
            }}
          >
            How It Works
          </a>
        </div>
      </div>
    </section>
  )
}

// === PROBLEM SECTION ===
function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const items = contentRef.current?.querySelectorAll('.problem-item')
      if (items) {
        items.forEach((item, i) => {
          gsap.fromTo(item,
            { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const problems = [
    {
      title: 'Volatility kills funding',
      desc: 'You raise $50K. Market moves. Now it\'s $30K. The project fails before it starts.',
    },
    {
      title: 'Global talent, local banking',
      desc: 'Engineers in 40 countries. Wire fees eat 8%. Someone waits 3 weeks for a check.',
    },
    {
      title: 'Machines can\'t hold wallets',
      desc: 'Your robot needs to buy parts. It can\'t click "approve" on a MetaMask popup.',
    },
  ]

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '120px 24px',
        background: colors.paper,
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <span style={{
          fontFamily: typography.fontFamily.mono,
          fontSize: typography.fontSize.xs,
          color: colors.blue.DEFAULT,
          letterSpacing: typography.letterSpacing.widest,
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: '16px',
        }}>
          The Problem
        </span>

        <h2 style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '36px',
          fontWeight: typography.fontWeight.bold,
          color: colors.ink,
          marginBottom: '64px',
        }}>
          Crypto promised global money.<br />
          It delivered casino chips.
        </h2>

        <div ref={contentRef} style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {problems.map((problem, i) => (
            <div
              key={i}
              className="problem-item"
              style={{
                padding: '32px',
                background: 'white',
                borderRadius: '16px',
                border: `1px solid ${colors.gray[200]}`,
                opacity: 0,
              }}
            >
              <h3 style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: typography.fontSize.xl,
                fontWeight: typography.fontWeight.bold,
                color: colors.ink,
                marginBottom: '12px',
              }}>
                {problem.title}
              </h3>
              <p style={{
                fontSize: typography.fontSize.lg,
                color: colors.gray[500],
                lineHeight: typography.lineHeight.relaxed,
              }}>
                {problem.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// === HORIZONTAL SCROLL SECTION ===
function HorizontalSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return

    const ctx = gsap.context(() => {
      const panels = containerRef.current?.querySelectorAll('.h-panel')
      if (!panels || panels.length === 0) return

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => `+=${containerRef.current?.scrollWidth || 1000}`,
        },
      })

      // Animate each panel's content as it comes into view
      panels.forEach((panel) => {
        const content = panel.querySelector('.panel-content')
        if (content) {
          gsap.fromTo(content,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              scrollTrigger: {
                trigger: panel,
                containerAnimation: gsap.getById('horizontal'),
                start: 'left center',
                toggleActions: 'play none none reverse',
              },
            }
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const panels = [
    {
      title: 'Set a goal',
      desc: 'Define your milestone. $10K for a prototype. $100K for production tooling. Clear targets.',
      icon: '01',
      color: colors.cyan.DEFAULT,
    },
    {
      title: 'Fund in QUSD',
      desc: 'Backers contribute stable dollars. No volatility. What you raise is what you have.',
      icon: '02',
      color: colors.blue.DEFAULT,
    },
    {
      title: 'Build anywhere',
      desc: 'Your team in Tokyo. Your factory in Shenzhen. Your contributors everywhere. Same money.',
      icon: '03',
      color: colors.cyan.light,
    },
    {
      title: 'Machines transact',
      desc: 'Your robots buy parts. Pay for compute. Settle invoices. No human in the loop.',
      icon: '04',
      color: colors.blue.light,
    },
  ]

  return (
    <section
      ref={sectionRef}
      style={{
        height: '100vh',
        background: colors.ink,
        overflow: 'hidden',
      }}
    >
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
            className="h-panel"
            style={{
              width: '100vw',
              height: '100%',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '48px',
            }}
          >
            <div
              className="panel-content"
              style={{
                maxWidth: '600px',
                textAlign: 'center',
                opacity: i === 0 ? 1 : 0,
              }}
            >
              <span style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '72px',
                fontWeight: typography.fontWeight.bold,
                color: panel.color,
                display: 'block',
                marginBottom: '24px',
                opacity: 0.3,
              }}>
                {panel.icon}
              </span>
              <h3 style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '40px',
                fontWeight: typography.fontWeight.bold,
                color: 'white',
                marginBottom: '24px',
              }}>
                {panel.title}
              </h3>
              <p style={{
                fontSize: typography.fontSize.xl,
                color: colors.gray[400],
                lineHeight: typography.lineHeight.relaxed,
              }}>
                {panel.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// === NETWORK VISUALIZATION ===
function NetworkSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      })

      // Draw connections
      const connections = svgRef.current?.querySelectorAll('.net-line')
      if (connections) {
        connections.forEach((line) => {
          const length = (line as SVGLineElement).getTotalLength?.() || 100
          gsap.set(line, { strokeDasharray: length, strokeDashoffset: length })
        })
        tl.to(connections, { strokeDashoffset: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' })
      }

      // Pop in nodes
      const nodes = svgRef.current?.querySelectorAll('.net-node')
      if (nodes) {
        tl.fromTo(nodes,
          { scale: 0, transformOrigin: 'center' },
          { scale: 1, duration: 0.4, stagger: 0.08, ease: 'back.out(1.7)' },
          '-=0.5'
        )
      }

      // Text
      const textItems = textRef.current?.querySelectorAll('.net-text')
      if (textItems) {
        tl.fromTo(textItems,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.1 },
          '-=0.3'
        )
      }

      // Pulse animation
      gsap.to('.center-pulse', {
        scale: 1.2,
        opacity: 0.3,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const nodes = [
    { x: 150, y: 100, label: 'Tokyo', size: 20 },
    { x: 100, y: 250, label: 'Berlin', size: 18 },
    { x: 200, y: 350, label: 'Lagos', size: 16 },
    { x: 350, y: 100, label: 'SF', size: 22 },
    { x: 400, y: 300, label: 'Seoul', size: 20 },
    { x: 250, y: 200, label: 'QUSD', size: 35, center: true },
  ]

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '120px 24px',
        background: colors.paper,
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
        <svg
          ref={svgRef}
          viewBox="0 0 500 450"
          style={{ width: '100%', height: 'auto' }}
        >
          <defs>
            <filter id="net-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Connections to center */}
          {nodes.filter(n => !n.center).map((node, i) => (
            <line
              key={`line-${i}`}
              className="net-line"
              x1={250}
              y1={200}
              x2={node.x}
              y2={node.y}
              stroke={colors.gray[300]}
              strokeWidth="2"
            />
          ))}

          {/* Center pulse */}
          <circle className="center-pulse" cx={250} cy={200} r={40} fill={colors.cyan.DEFAULT} opacity="0.2" />

          {/* Nodes */}
          {nodes.map((node, i) => (
            <g key={i} className="net-node">
              <circle
                cx={node.x}
                cy={node.y}
                r={node.size}
                fill={node.center ? colors.cyan.DEFAULT : 'white'}
                stroke={node.center ? colors.cyan.DEFAULT : colors.gray[300]}
                strokeWidth="2"
                filter={node.center ? 'url(#net-glow)' : undefined}
              />
              <text
                x={node.x}
                y={node.y + 4}
                textAnchor="middle"
                fill={node.center ? 'white' : colors.ink}
                fontSize={node.center ? '12' : '9'}
                fontFamily="Space Mono, monospace"
                fontWeight="bold"
              >
                {node.label}
              </text>
            </g>
          ))}
        </svg>

        <div ref={textRef}>
          <span className="net-text" style={{
            fontFamily: typography.fontFamily.mono,
            fontSize: typography.fontSize.xs,
            color: colors.blue.DEFAULT,
            letterSpacing: typography.letterSpacing.widest,
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '16px',
            opacity: 0,
          }}>
            Global by default
          </span>

          <h2 className="net-text" style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '36px',
            fontWeight: typography.fontWeight.bold,
            color: colors.ink,
            marginBottom: '24px',
            opacity: 0,
          }}>
            One protocol.<br />Every timezone.
          </h2>

          <p className="net-text" style={{
            fontSize: typography.fontSize.lg,
            color: colors.gray[500],
            lineHeight: typography.lineHeight.relaxed,
            marginBottom: '24px',
            opacity: 0,
          }}>
            A roboticist in Nairobi. A backer in New York. A factory in Guangzhou.
            Same rails. Same settlement. No intermediaries taking cuts.
          </p>

          <p className="net-text" style={{
            fontSize: typography.fontSize.lg,
            color: colors.gray[500],
            lineHeight: typography.lineHeight.relaxed,
            opacity: 0,
          }}>
            QUSD moves across borders like email. Because that's what money should do.
          </p>
        </div>
      </div>
    </section>
  )
}

// === STATS SECTION ===
function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const stats = statsRef.current?.querySelectorAll('.stat-item')
      if (stats) {
        stats.forEach((stat) => {
          const num = stat.querySelector('.stat-num')
          const label = stat.querySelector('.stat-label')

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: stat,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          })

          tl.fromTo(stat,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.5 }
          )

          if (num) {
            const target = parseInt(num.getAttribute('data-value') || '0', 10)
            tl.fromTo({ val: 0 },
              { val: 0 },
              {
                val: target,
                duration: 1.5,
                ease: 'power2.out',
                onUpdate: function() {
                  const current = Math.round(this.targets()[0].val)
                  if (num.textContent !== null) {
                    const suffix = num.getAttribute('data-suffix') || ''
                    const prefix = num.getAttribute('data-prefix') || ''
                    num.textContent = prefix + current.toLocaleString() + suffix
                  }
                },
              },
              '-=0.3'
            )
          }

          if (label) {
            tl.fromTo(label,
              { opacity: 0 },
              { opacity: 1, duration: 0.3 },
              '-=1'
            )
          }
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const stats = [
    { value: 0, prefix: '$', suffix: '', label: 'Transaction fees', display: '0' },
    { value: 47, prefix: '', suffix: '+', label: 'Countries supported', display: '47+' },
    { value: 100, prefix: '', suffix: '%', label: 'Open source', display: '100%' },
    { value: 1, prefix: '', suffix: ':1', label: 'Dollar backed', display: '1:1' },
  ]

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '80px 24px',
        background: colors.ink,
      }}
    >
      <div
        ref={statsRef}
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '32px',
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            className="stat-item"
            style={{ textAlign: 'center', opacity: 0 }}
          >
            <div
              className="stat-num"
              data-value={stat.value}
              data-prefix={stat.prefix}
              data-suffix={stat.suffix}
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '48px',
                fontWeight: typography.fontWeight.bold,
                color: colors.cyan.DEFAULT,
                marginBottom: '8px',
              }}
            >
              {stat.prefix}0{stat.suffix}
            </div>
            <div
              className="stat-label"
              style={{
                fontFamily: typography.fontFamily.mono,
                fontSize: typography.fontSize.sm,
                color: colors.gray[400],
                textTransform: 'uppercase',
                letterSpacing: typography.letterSpacing.wide,
                opacity: 0,
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// === CTA SECTION ===
function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 60 },
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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '120px 24px',
        background: colors.paper,
      }}
    >
      <div
        ref={contentRef}
        style={{
          maxWidth: '700px',
          margin: '0 auto',
          textAlign: 'center',
          opacity: 0,
        }}
      >
        <Logo variant="icon" color="cyan" size={60} />

        <h2 style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '40px',
          fontWeight: typography.fontWeight.bold,
          color: colors.ink,
          margin: '32px 0 24px',
        }}>
          The future gets built by people who fund it.
        </h2>

        <p style={{
          fontSize: typography.fontSize.lg,
          color: colors.gray[500],
          lineHeight: typography.lineHeight.relaxed,
          marginBottom: '40px',
        }}>
          Whether you're raising for a robot arm or backing the next breakthrough,
          stable money makes it possible.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="#"
            style={{
              padding: '16px 32px',
              background: colors.ink,
              color: 'white',
              fontFamily: typography.fontFamily.mono,
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.bold,
              borderRadius: '8px',
              textDecoration: 'none',
            }}
          >
            Start a Project
          </a>
          <a
            href="#"
            style={{
              padding: '16px 32px',
              background: 'transparent',
              color: colors.ink,
              fontFamily: typography.fontFamily.mono,
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.medium,
              borderRadius: '8px',
              border: `1px solid ${colors.gray[300]}`,
              textDecoration: 'none',
            }}
          >
            Read the Docs
          </a>
        </div>
      </div>
    </section>
  )
}

// === FOOTER ===
function FooterSection() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!footerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(footerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={footerRef}
      style={{
        padding: '48px 24px',
        background: colors.ink,
        borderTop: `1px solid ${colors.dark.border}`,
        opacity: 0,
      }}
    >
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Logo variant="horizontal" color="white" size={120} />

        <span style={{
          fontFamily: typography.fontFamily.mono,
          fontSize: typography.fontSize.xs,
          color: colors.gray[500],
        }}>
          Stable money for unstable times.
        </span>
      </div>
    </footer>
  )
}

// === MAIN COMPOSITION ===
export function CompositionVertical() {
  return (
    <div style={{ background: colors.paper }}>
      <HeroSection />
      <ProblemSection />
      <NetworkSection />
      <StatsSection />
      <CTASection />
      <FooterSection />
    </div>
  )
}

export function CompositionWithHorizontal() {
  return (
    <div style={{ background: colors.paper }}>
      <HeroSection />
      <ProblemSection />
      <HorizontalSection />
      <NetworkSection />
      <StatsSection />
      <CTASection />
      <FooterSection />
    </div>
  )
}

export function FullComposition() {
  return <CompositionWithHorizontal />
}
