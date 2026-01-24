import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { colors, typography } from '../../design-system/tokens'
import { Logo } from '../components/Logo'

gsap.registerPlugin(ScrollTrigger)

export function GSAPFooter() {
  const footerRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!footerRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      // Logo
      tl.fromTo(logoRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' }
      )

      // Tagline
      .fromTo(taglineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
        '-=0.3'
      )

      // Divider line
      .fromTo(dividerRef.current,
        { scaleX: 0, transformOrigin: 'center' },
        { scaleX: 1, duration: 0.6, ease: 'power2.inOut' },
        '-=0.2'
      )

      // Bottom content
      .fromTo(bottomRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        '-=0.2'
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={footerRef}
      style={{
        padding: '80px 0 32px',
        background: 'white',
        borderTop: `1px solid ${colors.gray[200]}`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glows */}
      <div style={{
        position: 'absolute',
        bottom: '-100px',
        left: '25%',
        width: '400px',
        height: '250px',
        background: `radial-gradient(ellipse, ${colors.cyan.DEFAULT}15 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '-50px',
        width: '300px',
        height: '200px',
        background: `radial-gradient(ellipse, ${colors.blue.DEFAULT}10 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          {/* Logo */}
          <div ref={logoRef} style={{ marginBottom: '24px', opacity: 0 }}>
            <Logo variant="horizontal" color="dark" size={160} />
          </div>

          <p
            ref={taglineRef}
            style={{
              color: colors.gray[500],
              fontSize: typography.fontSize.sm,
              lineHeight: typography.lineHeight.relaxed,
              marginBottom: '32px',
              maxWidth: '400px',
              opacity: 0,
            }}
          >
            The financial layer for the machine economy.
          </p>

          {/* Divider */}
          <div
            ref={dividerRef}
            style={{
              width: '100%',
              height: '1px',
              background: colors.gray[200],
              marginBottom: '24px',
              transform: 'scaleX(0)',
            }}
          />

          {/* Bottom bar */}
          <div
            ref={bottomRef}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              opacity: 0,
            }}
          >
            <span style={{
              fontFamily: typography.fontFamily.mono,
              fontSize: typography.fontSize.xs,
              color: colors.gray[400],
              letterSpacing: typography.letterSpacing.wide,
              textTransform: 'uppercase',
            }}>
              © {new Date().getFullYear()} QUSD Protocol. All rights reserved.
            </span>
            <span style={{
              fontFamily: typography.fontFamily.mono,
              fontSize: typography.fontSize.xs,
              color: colors.gray[400],
              letterSpacing: typography.letterSpacing.wide,
              textTransform: 'uppercase',
            }}>
              Machine-Native <span style={{ color: colors.blue.DEFAULT }}>Stablecoin</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
