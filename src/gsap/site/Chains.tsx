import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { colors, typography } from '../../design-system/tokens'

gsap.registerPlugin(ScrollTrigger)

export function GSAPChains() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const chainsRef = useRef<HTMLDivElement>(null)
  const networkRef = useRef<SVGSVGElement>(null)

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

      // Heading
      tl.fromTo(headingRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      )

      // Description
      .fromTo(descRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
        '-=0.3'
      )

      // Network lines draw
      const networkLines = networkRef.current?.querySelectorAll('.network-line')
      if (networkLines) {
        networkLines.forEach((line) => {
          const length = (line as SVGLineElement).getTotalLength?.() || 100
          gsap.set(line, {
            strokeDasharray: length,
            strokeDashoffset: length,
          })
        })

        tl.to(networkLines, {
          strokeDashoffset: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        }, '-=0.2')
      }

      // Chain badges
      const chains = chainsRef.current?.querySelectorAll('.chain-badge')
      if (chains) {
        tl.fromTo(chains,
          { opacity: 0, scale: 0.8, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: 'back.out(1.7)',
          },
          '-=0.4'
        )
      }

      // Hover animations for badges
      const chainBadges = chainsRef.current?.querySelectorAll('.chain-badge')
      chainBadges?.forEach((badge) => {
        badge.addEventListener('mouseenter', () => {
          gsap.to(badge, {
            scale: 1.05,
            boxShadow: `0 8px 30px ${colors.cyan.DEFAULT}30`,
            borderColor: colors.cyan.DEFAULT,
            duration: 0.3,
            ease: 'power2.out',
          })
        })
        badge.addEventListener('mouseleave', () => {
          gsap.to(badge, {
            scale: 1,
            boxShadow: 'none',
            borderColor: colors.gray[200],
            duration: 0.3,
            ease: 'power2.out',
          })
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const chains = [
    { name: 'Ethereum', color: '#627EEA' },
    { name: 'Base', color: '#0052FF' },
    { name: 'Arbitrum', color: '#28A0F0' },
    { name: 'Solana', color: '#00FFA3' },
  ]

  return (
    <section
      ref={sectionRef}
      id="ecosystem"
      style={{
        padding: '96px 0',
        background: colors.paper,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Network visualization background */}
      <svg
        ref={networkRef}
        style={{
          position: 'absolute',
          top: '50%',
          right: '5%',
          transform: 'translateY(-50%)',
          width: '300px',
          height: '300px',
          opacity: 0.3,
        }}
        viewBox="0 0 300 300"
      >
        {/* Center node */}
        <circle cx="150" cy="150" r="8" fill={colors.cyan.DEFAULT} />

        {/* Lines to outer nodes */}
        <line className="network-line" x1="150" y1="150" x2="80" y2="80" stroke={colors.gray[300]} strokeWidth="1" />
        <line className="network-line" x1="150" y1="150" x2="220" y2="80" stroke={colors.gray[300]} strokeWidth="1" />
        <line className="network-line" x1="150" y1="150" x2="80" y2="220" stroke={colors.gray[300]} strokeWidth="1" />
        <line className="network-line" x1="150" y1="150" x2="220" y2="220" stroke={colors.gray[300]} strokeWidth="1" />

        {/* Outer nodes */}
        <circle cx="80" cy="80" r="6" fill={colors.gray[400]} />
        <circle cx="220" cy="80" r="6" fill={colors.gray[400]} />
        <circle cx="80" cy="220" r="6" fill={colors.gray[400]} />
        <circle cx="220" cy="220" r="6" fill={colors.gray[400]} />
      </svg>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        <h2
          ref={headingRef}
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '36px',
            fontWeight: typography.fontWeight.bold,
            color: colors.ink,
            marginBottom: '16px',
            opacity: 0,
          }}
        >
          Chains
        </h2>

        <p
          ref={descRef}
          style={{
            fontSize: typography.fontSize.lg,
            color: colors.gray[500],
            marginBottom: '32px',
            maxWidth: '500px',
            opacity: 0,
          }}
        >
          Native deployments, not bridges. Same contract interface everywhere.
        </p>

        <div
          ref={chainsRef}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          {chains.map((chain) => (
            <div
              key={chain.name}
              className="chain-badge"
              style={{
                padding: '12px 24px',
                background: 'white',
                border: `1px solid ${colors.gray[200]}`,
                borderRadius: '8px',
                fontFamily: typography.fontFamily.mono,
                fontSize: typography.fontSize.sm,
                color: colors.ink,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                opacity: 0,
              }}
            >
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: chain.color,
              }} />
              {chain.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
