import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { colors, typography } from '../../design-system/tokens'

gsap.registerPlugin(ScrollTrigger)

export function GSAPFeatures() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const linkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Feature items with highlight animation
      const features = featuresRef.current?.querySelectorAll('.feature-item')
      if (features) {
        features.forEach((feature, i) => {
          const highlight = feature.querySelector('.highlight')

          gsap.fromTo(feature,
            { opacity: 0, x: -30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: feature,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
              delay: i * 0.1,
            }
          )

          // Highlight underline animation
          if (highlight) {
            gsap.fromTo(highlight,
              { width: '0%' },
              {
                width: '100%',
                duration: 0.6,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: feature,
                  start: 'top 80%',
                  toggleActions: 'play none none reverse',
                },
                delay: 0.3 + i * 0.1,
              }
            )
          }
        })
      }

      // Link animation
      gsap.fromTo(linkRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: linkRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const features = [
    { highlight: 'No gas tokens.', text: 'Machines pay fees in QUSD. No ETH management, no failed transactions.' },
    { highlight: 'Identity built in.', text: 'Agents have verifiable identity at the protocol level. Know who you\'re transacting with.' },
    { highlight: 'Programmable limits.', text: 'Set spending caps, approved counterparties, and safety rules that the protocol enforces.' },
    { highlight: 'Multi-chain.', text: 'Native on Ethereum, Base, Arbitrum, Solana. Move value where you need it.' },
  ]

  return (
    <section
      ref={sectionRef}
      id="features"
      style={{
        padding: '96px 0',
        background: colors.paper,
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
            marginBottom: '48px',
            opacity: 0,
          }}
        >
          How it works
        </h2>

        <div ref={featuresRef} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {features.map((feature, i) => (
            <div
              key={i}
              className="feature-item"
              style={{
                fontSize: typography.fontSize.lg,
                lineHeight: typography.lineHeight.relaxed,
                color: colors.gray[500],
                opacity: 0,
              }}
            >
              <span style={{ position: 'relative', display: 'inline' }}>
                <span style={{
                  color: colors.ink,
                  fontWeight: typography.fontWeight.medium,
                }}>
                  {feature.highlight}
                </span>
                <span
                  className="highlight"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: '2px',
                    width: '0%',
                    background: colors.cyan.DEFAULT,
                  }}
                />
              </span>
              {' '}
              <span className="text">{feature.text}</span>
            </div>
          ))}
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
            Read the docs →
          </a>
        </div>
      </div>
    </section>
  )
}
