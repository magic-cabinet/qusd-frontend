import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { colors, typography } from '../../design-system/tokens'
import { Logo } from '../components/Logo'

gsap.registerPlugin(ScrollTrigger)

// Data
const tokenAllocation = [
  { label: 'Public Sale', value: 30, color: colors.blue.DEFAULT },
  { label: 'Treasury', value: 25, color: colors.cyan.DEFAULT },
  { label: 'Team', value: 20, color: colors.blue.dark },
  { label: 'Ecosystem', value: 15, color: colors.blue.light },
  { label: 'Liquidity', value: 10, color: '#043780' },
]

const reserveComposition = [
  { label: 'US Treasuries', value: 65, color: colors.blue.DEFAULT },
  { label: 'Bank Deposits', value: 25, color: colors.cyan.DEFAULT },
  { label: 'Overnight Repo', value: 10, color: colors.blue.dark },
]

const revenueDistribution = [
  { label: 'Liquidity Operations', value: 60, color: colors.blue.DEFAULT },
  { label: 'Operations', value: 25, color: colors.cyan.DEFAULT },
  { label: 'QGOV Stakers', value: 15, color: colors.blue.dark },
]

const protocols = [
  { name: 'NANDA', desc: 'Discovery', color: colors.blue.DEFAULT },
  { name: 'MCP', desc: 'Tools', color: colors.cyan.DEFAULT },
  { name: 'A2A', desc: 'Comms', color: colors.blue.dark },
  { name: 'UCP', desc: 'Commerce', color: colors.blue.light },
  { name: 'AP2', desc: 'Payments', color: '#043780' },
  { name: 'QROS', desc: 'Robotics', color: '#FF9500' },
  { name: 'QUSD', desc: 'Settlement', color: colors.blue.DEFAULT, highlight: true },
]

const roadmap = [
  { phase: '1', title: 'Foundation', status: 'active', items: ['Entity setup', 'Banking', 'Contracts', 'Audits'] },
  { phase: '2', title: 'Launch', status: 'upcoming', items: ['Ethereum', 'QGOV sale', 'Liquidity', 'KYB'] },
  { phase: '3', title: 'Expansion', status: 'upcoming', items: ['Solana', 'Monad', 'QUBIT', 'SDK'] },
  { phase: '4', title: 'Scale', status: 'upcoming', items: ['JPYC', 'EURC', 'Robotics', 'Enterprise'] },
]

export function GSAPWhitepaper() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const tokenSectionRef = useRef<HTMLDivElement>(null)
  const reserveSectionRef = useRef<HTMLDivElement>(null)
  const protocolSectionRef = useRef<HTMLDivElement>(null)
  const roadmapSectionRef = useRef<HTMLDivElement>(null)
  const ctaSectionRef = useRef<HTMLDivElement>(null)
  const splinesRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // Hero entrance timeline
      const heroTl = gsap.timeline()

      // Spline paths draw
      const paths = splinesRef.current?.querySelectorAll('path')
      if (paths) {
        paths.forEach((path, i) => {
          const length = path.getTotalLength?.() || 200
          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
          })
          heroTl.to(path, {
            strokeDashoffset: 0,
            duration: 1.5,
            ease: 'power2.out',
          }, i * 0.15)
        })
      }

      // Logo spin in
      heroTl.fromTo(logoRef.current,
        { opacity: 0, scale: 0, rotation: -180 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.7)' },
        0.3
      )

      // Title chars
      const titleChars = titleRef.current?.querySelectorAll('.char')
      if (titleChars) {
        heroTl.fromTo(titleChars,
          { opacity: 0, y: 30, rotateX: -60 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.6, stagger: 0.03, ease: 'back.out(1.7)' },
          0.5
        )
      }

      // Subtitle
      heroTl.fromTo(subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        0.8
      )

      // Logo pulse
      gsap.to(logoRef.current, {
        filter: 'drop-shadow(0 0 25px rgba(14, 204, 237, 0.4))',
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.5,
      })

      // Token Economics Section
      const tokenTitle = tokenSectionRef.current?.querySelector('.section-title')
      const tokenBars = tokenSectionRef.current?.querySelectorAll('.token-bar')
      const statCards = tokenSectionRef.current?.querySelectorAll('.stat-card')

      const tokenTl = gsap.timeline({
        scrollTrigger: {
          trigger: tokenSectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })

      if (tokenTitle) {
        tokenTl.fromTo(tokenTitle,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.5 }
        )
      }
      if (tokenBars && tokenBars.length > 0) {
        tokenTl.fromTo(tokenBars,
          { scaleX: 0, transformOrigin: 'left' },
          { scaleX: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' },
          '-=0.2'
        )
      }
      if (statCards && statCards.length > 0) {
        tokenTl.fromTo(statCards,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
          '-=0.5'
        )
      }

      // Reserve & Revenue Section
      const reserveTitle = reserveSectionRef.current?.querySelector('.section-title')
      const donutSegments = reserveSectionRef.current?.querySelectorAll('.donut-segment')
      const revenueBars = reserveSectionRef.current?.querySelectorAll('.revenue-bar')

      const reserveTl = gsap.timeline({
        scrollTrigger: {
          trigger: reserveSectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })

      if (reserveTitle) {
        reserveTl.fromTo(reserveTitle,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.5 }
        )
      }
      if (donutSegments && donutSegments.length > 0) {
        reserveTl.fromTo(donutSegments,
          { strokeDasharray: '0 1000' },
          {
            strokeDasharray: (i: number) => {
              const segment = reserveComposition[i]
              const circumference = 2 * Math.PI * 35
              const segmentLength = (segment.value / 100) * circumference
              return `${segmentLength} ${circumference - segmentLength}`
            },
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
          },
          '-=0.2'
        )
      }
      if (revenueBars && revenueBars.length > 0) {
        reserveTl.fromTo(revenueBars,
          { scaleX: 0, transformOrigin: 'left' },
          { scaleX: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
          '-=0.5'
        )
      }

      // Protocol Stack Section
      const protocolTitle = protocolSectionRef.current?.querySelector('.section-title')
      const protocolBoxes = protocolSectionRef.current?.querySelectorAll('.protocol-box')
      const arrows = protocolSectionRef.current?.querySelectorAll('.arrow')

      const protocolTl = gsap.timeline({
        scrollTrigger: {
          trigger: protocolSectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })

      if (protocolTitle) {
        protocolTl.fromTo(protocolTitle,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.5 }
        )
      }
      if (protocolBoxes && protocolBoxes.length > 0) {
        protocolTl.fromTo(protocolBoxes,
          { opacity: 0, scale: 0.8, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'back.out(1.7)' },
          '-=0.2'
        )
      }
      if (arrows && arrows.length > 0) {
        protocolTl.fromTo(arrows,
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 0.2, stagger: 0.05 },
          '-=0.3'
        )
      }

      // Roadmap Section
      const roadmapTitle = roadmapSectionRef.current?.querySelector('.section-title')
      const roadmapPhases = roadmapSectionRef.current?.querySelectorAll('.roadmap-phase')

      const roadmapTl = gsap.timeline({
        scrollTrigger: {
          trigger: roadmapSectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })

      if (roadmapTitle) {
        roadmapTl.fromTo(roadmapTitle,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.5 }
        )
      }
      if (roadmapPhases && roadmapPhases.length > 0) {
        roadmapTl.fromTo(roadmapPhases,
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.15, ease: 'power3.out' },
          '-=0.2'
        )
      }

      // CTA Section
      const ctaLinks = ctaSectionRef.current?.querySelectorAll('a')

      const ctaTl = gsap.timeline({
        scrollTrigger: {
          trigger: ctaSectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      if (ctaSectionRef.current) {
        ctaTl.fromTo(ctaSectionRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6 }
        )
      }
      if (ctaLinks && ctaLinks.length > 0) {
        ctaTl.fromTo(ctaLinks,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.3, stagger: 0.1 },
          '-=0.3'
        )
      }

    }, containerRef)

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
    <div ref={containerRef} style={{ background: colors.paper, minHeight: '100vh' }}>
      {/* Hero Section */}
      <div
        ref={heroRef}
        style={{
          position: 'relative',
          minHeight: '50vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          padding: '80px 24px',
        }}
      >
        {/* Parametric splines background */}
        <svg
          ref={splinesRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {[0, 1, 2, 3, 4].map((i) => {
            const points: string[] = []
            for (let j = 0; j <= 50; j++) {
              const x = (j / 50) * 100
              const y = (20 + i * 15) + 8 * Math.sin((j / 50) * Math.PI * (2 + i * 0.5) + i * 0.5)
              points.push(`${j === 0 ? 'M' : 'L'} ${x} ${y}`)
            }
            return (
              <path
                key={i}
                d={points.join(' ')}
                fill="none"
                stroke={i % 2 === 0 ? colors.blue.DEFAULT : colors.cyan.DEFAULT}
                strokeWidth="0.15"
                opacity="0.3"
              />
            )
          })}
        </svg>

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '800px' }}>
          <div ref={logoRef} style={{ marginBottom: '24px', opacity: 0 }}>
            <Logo variant="icon" color="cyan" size={60} />
          </div>

          <span style={{
            fontFamily: typography.fontFamily.mono,
            fontSize: typography.fontSize.xs,
            color: colors.blue.DEFAULT,
            letterSpacing: typography.letterSpacing.widest,
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '16px',
          }}>
            Protocol Documentation
          </span>

          <h1
            ref={titleRef}
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '48px',
              fontWeight: typography.fontWeight.bold,
              color: colors.ink,
              marginBottom: '16px',
              perspective: '1000px',
            }}
          >
            {splitText('QUSD Protocol')}
          </h1>

          <p
            ref={subtitleRef}
            style={{
              fontSize: typography.fontSize.lg,
              color: colors.gray[500],
              maxWidth: '500px',
              margin: '0 auto',
              opacity: 0,
            }}
          >
            Programmable Settlement Infrastructure for the Agent Economy
          </p>

          <div style={{
            fontFamily: typography.fontFamily.mono,
            fontSize: typography.fontSize.xs,
            color: colors.gray[400],
            marginTop: '24px',
          }}>
            v1.0 - January 2026
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px 80px' }}>
        {/* Token Economics */}
        <div
          ref={tokenSectionRef}
          style={{
            background: 'white',
            border: `1px solid ${colors.gray[200]}`,
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '24px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2
              className="section-title"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '24px',
                fontWeight: typography.fontWeight.bold,
                color: colors.ink,
                opacity: 0,
              }}
            >
              Token Economics
            </h2>
            <div style={{ display: 'flex', gap: '32px' }}>
              {[
                { label: 'TOTAL SUPPLY', value: '1B QGOV' },
                { label: 'RAISE', value: '$12.5M', color: colors.blue.DEFAULT },
                { label: 'FDV', value: '$50M', color: colors.blue.DEFAULT },
              ].map((stat) => (
                <div key={stat.label} className="stat-card" style={{ textAlign: 'right', opacity: 0 }}>
                  <div style={{ fontFamily: typography.fontFamily.mono, fontSize: typography.fontSize.xs, color: colors.gray[400] }}>
                    {stat.label}
                  </div>
                  <div style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontWeight: typography.fontWeight.bold,
                    color: stat.color || colors.ink,
                  }}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Allocation bar */}
          <div style={{ height: '32px', borderRadius: '16px', overflow: 'hidden', display: 'flex', marginBottom: '12px' }}>
            {tokenAllocation.map((item) => (
              <div
                key={item.label}
                className="token-bar"
                style={{
                  width: `${item.value}%`,
                  background: item.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ color: 'white', fontSize: '10px', fontWeight: 'bold' }}>{item.value}%</span>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {tokenAllocation.map((item) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }} />
                <span style={{ fontSize: '10px', color: colors.gray[500] }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reserve & Revenue */}
        <div
          ref={reserveSectionRef}
          style={{
            background: 'white',
            border: `1px solid ${colors.gray[200]}`,
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '24px',
          }}
        >
          <h2
            className="section-title"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '24px',
              fontWeight: typography.fontWeight.bold,
              color: colors.ink,
              marginBottom: '24px',
              opacity: 0,
            }}
          >
            Reserve & Revenue
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '40px', alignItems: 'start' }}>
            {/* Donut chart */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: typography.fontFamily.mono, fontSize: typography.fontSize.xs, color: colors.gray[400], marginBottom: '12px' }}>
                RESERVES
              </div>
              <svg viewBox="0 0 100 100" style={{ width: '150px', height: '150px' }}>
                {(() => {
                  let offset = 0
                  return reserveComposition.map((segment) => {
                    const rotation = (offset / 100) * 360 - 90
                    offset += segment.value
                    return (
                      <circle
                        key={segment.label}
                        className="donut-segment"
                        cx="50"
                        cy="50"
                        r="35"
                        fill="none"
                        stroke={segment.color}
                        strokeWidth="10"
                        transform={`rotate(${rotation} 50 50)`}
                      />
                    )
                  })
                })()}
                <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '14px', fontWeight: 'bold', fill: colors.ink }}>
                  1:1
                </text>
              </svg>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '8px' }}>
                {reserveComposition.map((item) => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: item.color }} />
                    <span style={{ fontSize: '9px', color: colors.gray[500] }}>{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue bars */}
            <div>
              <div style={{ fontFamily: typography.fontFamily.mono, fontSize: typography.fontSize.xs, color: colors.gray[400], marginBottom: '12px' }}>
                REVENUE SPLIT
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {revenueDistribution.map((item) => (
                  <div key={item.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: typography.fontSize.xs, color: colors.gray[500] }}>{item.label}</span>
                      <span style={{ fontFamily: typography.fontFamily.mono, fontSize: typography.fontSize.xs, fontWeight: 'bold' }}>{item.value}%</span>
                    </div>
                    <div style={{ height: '8px', background: colors.gray[200], borderRadius: '4px', overflow: 'hidden' }}>
                      <div
                        className="revenue-bar"
                        style={{
                          width: `${item.value}%`,
                          height: '100%',
                          background: item.color,
                          borderRadius: '4px',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Protocol Stack */}
        <div
          ref={protocolSectionRef}
          style={{
            background: 'white',
            border: `1px solid ${colors.gray[200]}`,
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '24px',
          }}
        >
          <h2
            className="section-title"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '24px',
              fontWeight: typography.fontWeight.bold,
              color: colors.ink,
              marginBottom: '24px',
              opacity: 0,
            }}
          >
            Protocol Stack
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {protocols.map((p, i, arr) => (
              <div key={p.name} style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  className="protocol-box"
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: `2px solid ${p.highlight ? colors.blue.DEFAULT : p.color}`,
                    background: p.highlight ? colors.blue.DEFAULT : 'white',
                    textAlign: 'center',
                    minWidth: '70px',
                    opacity: 0,
                  }}
                >
                  <div style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: typography.fontSize.xs,
                    fontWeight: typography.fontWeight.bold,
                    color: p.highlight ? 'white' : p.color,
                  }}>
                    {p.name}
                  </div>
                  <div style={{
                    fontSize: '9px',
                    color: p.highlight ? 'rgba(255,255,255,0.7)' : colors.gray[400],
                  }}>
                    {p.desc}
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <span className="arrow" style={{ margin: '0 4px', color: colors.gray[300], opacity: 0 }}>→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Roadmap */}
        <div
          ref={roadmapSectionRef}
          style={{
            background: 'white',
            border: `1px solid ${colors.gray[200]}`,
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '24px',
          }}
        >
          <h2
            className="section-title"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '24px',
              fontWeight: typography.fontWeight.bold,
              color: colors.ink,
              marginBottom: '24px',
              opacity: 0,
            }}
          >
            Roadmap
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {roadmap.map((phase) => (
              <div
                key={phase.phase}
                className="roadmap-phase"
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  background: phase.status === 'active' ? colors.blue.DEFAULT : colors.paper,
                  opacity: 0,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: typography.fontSize.lg,
                    fontWeight: typography.fontWeight.bold,
                    color: phase.status === 'active' ? 'white' : colors.blue.DEFAULT,
                  }}>
                    {phase.phase}
                  </span>
                  <span style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: typography.fontSize.sm,
                    fontWeight: typography.fontWeight.bold,
                    color: phase.status === 'active' ? 'white' : colors.ink,
                  }}>
                    {phase.title}
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {phase.items.map((item) => (
                    <div
                      key={item}
                      style={{
                        fontSize: '10px',
                        color: phase.status === 'active' ? 'rgba(255,255,255,0.8)' : colors.gray[500],
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          ref={ctaSectionRef}
          style={{
            textAlign: 'center',
            padding: '48px 0',
            borderTop: `1px solid ${colors.gray[200]}`,
            opacity: 0,
          }}
        >
          <div style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '28px',
            fontWeight: typography.fontWeight.bold,
            color: colors.ink,
            marginBottom: '12px',
          }}>
            Ready to Build?
          </div>
          <p style={{
            fontSize: typography.fontSize.base,
            color: colors.gray[500],
            marginBottom: '24px',
            maxWidth: '400px',
            margin: '0 auto 24px',
          }}>
            QUSD provides programmable settlement infrastructure for the next generation of autonomous systems.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <a
              href="#"
              style={{
                padding: '12px 24px',
                background: colors.ink,
                color: 'white',
                fontFamily: typography.fontFamily.mono,
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.medium,
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              GitHub
            </a>
            <a
              href="#"
              style={{
                padding: '12px 24px',
                background: 'transparent',
                color: colors.ink,
                fontFamily: typography.fontFamily.mono,
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.medium,
                borderRadius: '8px',
                border: `1px solid ${colors.gray[200]}`,
                textDecoration: 'none',
              }}
            >
              Documentation
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
