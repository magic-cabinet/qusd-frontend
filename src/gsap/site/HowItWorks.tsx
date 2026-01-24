import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { colors, typography } from '../../design-system/tokens'

gsap.registerPlugin(ScrollTrigger)

export function GSAPHowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const codeBlockRef = useRef<HTMLDivElement>(null)
  const linkRef = useRef<HTMLAnchorElement>(null)

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

      // Code block container
      .fromTo(codeBlockRef.current,
        { opacity: 0, y: 40, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.2'
      )

      // Terminal dots
      const dots = codeBlockRef.current?.querySelectorAll('.terminal-dot')
      if (dots) {
        tl.fromTo(dots,
          { scale: 0 },
          { scale: 1, duration: 0.3, stagger: 0.1, ease: 'back.out(1.7)' },
          '-=0.4'
        )
      }

      // Code lines - typewriter effect
      const codeLines = codeBlockRef.current?.querySelectorAll('.code-line')
      if (codeLines) {
        codeLines.forEach((line, i) => {
          tl.fromTo(line,
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' },
            `-=${i === 0 ? 0 : 0.2}`
          )
        })
      }

      // Blinking cursor
      const cursor = codeBlockRef.current?.querySelector('.cursor')
      if (cursor) {
        gsap.to(cursor, {
          opacity: 0,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'steps(1)',
        })
      }

      // Link
      tl.fromTo(linkRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4 },
        '-=0.3'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const codeContent = [
    { text: 'npm install @qusd/sdk', color: colors.gray[400] },
    { text: '', color: 'transparent' },
    { text: "import { QUSD } from '@qusd/sdk'", color: colors.cyan.DEFAULT },
    { text: '', color: 'transparent' },
    { text: 'const qusd = new QUSD()', color: colors.gray[300] },
    { text: '', color: 'transparent' },
    { text: '// Send payment', color: colors.gray[600] },
    { text: 'await qusd.send({', color: colors.gray[300] },
    { text: "  to: '0x...',", color: colors.blue.light },
    { text: "  amount: '100'", color: colors.success },
    { text: '})', color: colors.gray[300] },
  ]

  return (
    <section
      ref={sectionRef}
      id="docs"
      style={{
        padding: '96px 0',
        background: 'white',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
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
          Get started
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
          Install the SDK and start transacting.
        </p>

        {/* Code block */}
        <div
          ref={codeBlockRef}
          style={{
            background: colors.ink,
            borderRadius: '16px',
            overflow: 'hidden',
            opacity: 0,
          }}
        >
          {/* Terminal header */}
          <div style={{
            padding: '12px 16px',
            borderBottom: `1px solid ${colors.dark.border}`,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <div className="terminal-dot" style={{ width: '12px', height: '12px', borderRadius: '50%', background: colors.error }} />
            <div className="terminal-dot" style={{ width: '12px', height: '12px', borderRadius: '50%', background: colors.warning }} />
            <div className="terminal-dot" style={{ width: '12px', height: '12px', borderRadius: '50%', background: colors.success }} />
          </div>

          {/* Code content */}
          <div style={{
            padding: '24px',
            fontFamily: typography.fontFamily.mono,
            fontSize: typography.fontSize.sm,
            lineHeight: 1.8,
          }}>
            {codeContent.map((line, i) => (
              <div
                key={i}
                className="code-line"
                style={{
                  color: line.color,
                  minHeight: '24px',
                  opacity: 0,
                }}
              >
                {line.text}
              </div>
            ))}
            <span className="cursor" style={{
              display: 'inline-block',
              width: '8px',
              height: '16px',
              background: colors.cyan.DEFAULT,
              marginLeft: '4px',
            }} />
          </div>
        </div>

        <div style={{
          marginTop: '48px',
          paddingTop: '32px',
          borderTop: `1px solid ${colors.gray[200]}`,
        }}>
          <a
            ref={linkRef}
            href="#"
            style={{
              fontFamily: typography.fontFamily.mono,
              fontSize: typography.fontSize.sm,
              color: colors.ink,
              textDecoration: 'none',
              opacity: 0,
            }}
          >
            Full documentation →
          </a>
        </div>
      </div>
    </section>
  )
}
