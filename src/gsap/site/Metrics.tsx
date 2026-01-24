import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { colors, typography } from '../../design-system/tokens'
import { Logo } from '../components/Logo'

gsap.registerPlugin(ScrollTrigger)

export function GSAPMetrics() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const linkRef = useRef<HTMLAnchorElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const circuitRef = useRef<SVGSVGElement>(null)

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

      // Circuit lines draw
      const circuitPaths = circuitRef.current?.querySelectorAll('.circuit-path')
      if (circuitPaths) {
        circuitPaths.forEach((path) => {
          const length = (path as SVGPathElement).getTotalLength?.() || 100
          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
          })
        })

        tl.to(circuitPaths, {
          strokeDashoffset: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power2.out',
        })
      }

      // Logo entrance
      tl.fromTo(logoRef.current,
        { opacity: 0, scale: 0, rotation: -90 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.7)' },
        0.3
      )

      // Heading
      .fromTo(headingRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        0.5
      )

      // Content paragraphs
      const paragraphs = contentRef.current?.querySelectorAll('p')
      if (paragraphs) {
        tl.fromTo(paragraphs,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'power3.out' },
          '-=0.3'
        )
      }

      // Link
      tl.fromTo(linkRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4 },
        '-=0.2'
      )

      // Continuous logo glow pulse
      gsap.to(logoRef.current, {
        filter: 'drop-shadow(0 0 20px rgba(14, 204, 237, 0.5))',
        duration: 1.5,
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
        padding: '96px 0',
        background: colors.ink,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Circuit background decoration */}
      <svg
        ref={circuitRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
        viewBox="0 0 1200 400"
        preserveAspectRatio="xMidYMid slice"
      >
        <path className="circuit-path" d="M 0 100 L 100 100 L 150 150 L 250 150" stroke={colors.gray[800]} strokeWidth="1" fill="none" />
        <path className="circuit-path" d="M 0 200 L 80 200 L 120 240 L 200 240" stroke={colors.cyan.DEFAULT} strokeWidth="1" fill="none" opacity="0.3" />
        <path className="circuit-path" d="M 0 300 L 150 300 L 180 270 L 280 270" stroke={colors.gray[800]} strokeWidth="1" fill="none" />
        <path className="circuit-path" d="M 1200 80 L 1100 80 L 1050 130 L 950 130" stroke={colors.gray[800]} strokeWidth="1" fill="none" />
        <path className="circuit-path" d="M 1200 180 L 1080 180 L 1040 220 L 920 220" stroke={colors.blue.DEFAULT} strokeWidth="1" fill="none" opacity="0.3" />
        <path className="circuit-path" d="M 1200 280 L 1120 280 L 1080 240 L 1000 240" stroke={colors.gray[800]} strokeWidth="1" fill="none" />
      </svg>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', gap: '64px', alignItems: 'flex-start' }}>
          {/* Logo */}
          <div
            ref={logoRef}
            style={{ flexShrink: 0, opacity: 0 }}
          >
            <Logo variant="icon" color="cyan" size={80} />
          </div>

          {/* Content */}
          <div>
            <h2
              ref={headingRef}
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '36px',
                fontWeight: typography.fontWeight.bold,
                color: 'white',
                marginBottom: '32px',
                opacity: 0,
              }}
            >
              Open source
            </h2>

            <div ref={contentRef} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <p style={{
                fontSize: typography.fontSize.lg,
                lineHeight: typography.lineHeight.relaxed,
                color: colors.gray[400],
                maxWidth: '600px',
                opacity: 0,
              }}>
                QUSD is open source software. MIT licensed. Fork it, run it, contribute to it.
              </p>

              <p style={{
                fontSize: typography.fontSize.lg,
                lineHeight: typography.lineHeight.relaxed,
                color: colors.gray[400],
                maxWidth: '600px',
                opacity: 0,
              }}>
                No token launch. No governance theater. Just code that works.
              </p>
            </div>

            <div style={{
              marginTop: '48px',
              paddingTop: '32px',
              borderTop: `1px solid ${colors.dark.border}`,
            }}>
              <a
                ref={linkRef}
                href="#"
                style={{
                  fontFamily: typography.fontFamily.mono,
                  fontSize: typography.fontSize.sm,
                  color: 'white',
                  textDecoration: 'none',
                  opacity: 0,
                }}
              >
                Star on GitHub →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
