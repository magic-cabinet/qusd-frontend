import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { colors, typography } from '../../design-system/tokens'

const headerStyle: React.CSSProperties = {
  fontFamily: typography.fontFamily.mono,
  fontSize: typography.fontSize['5xl'],
  fontWeight: typography.fontWeight.bold,
  lineHeight: typography.lineHeight.tight,
  color: colors.ink,
}

// 1. Fade Up with Character Stagger
export function HeaderFadeUpStagger({ text = 'Machine Economy' }: { text?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const chars = containerRef.current.querySelectorAll('.char')

    gsap.fromTo(chars,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.03,
        ease: 'power3.out',
      }
    )
  }, [])

  return (
    <h1 ref={containerRef} style={headerStyle}>
      {text.split('').map((char, i) => (
        <span key={i} className="char inline-block" style={{ opacity: 0 }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </h1>
  )
}

// 2. Slide In with Scale
export function HeaderSlideScale({ text = 'Agent-First Design' }: { text?: string }) {
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!ref.current) return

    gsap.fromTo(ref.current,
      { opacity: 0, x: -100, scale: 0.8 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1,
        ease: 'power4.out',
      }
    )
  }, [])

  return (
    <h1 ref={ref} style={{ ...headerStyle, opacity: 0 }}>
      {text}
    </h1>
  )
}

// 3. Typewriter Effect
export function HeaderTypewriter({ text = 'Autonomous Systems' }: { text?: string }) {
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const chars = text.split('')
    ref.current.textContent = ''

    const tl = gsap.timeline()

    chars.forEach((char, i) => {
      tl.to(ref.current, {
        duration: 0.05,
        onComplete: () => {
          if (ref.current) {
            ref.current.textContent = text.slice(0, i + 1)
          }
        },
      }, i * 0.05)
    })

    // Add blinking cursor
    tl.to(ref.current, {
      duration: 0.5,
      repeat: 3,
      yoyo: true,
      onUpdate: function() {
        if (ref.current) {
          const showCursor = Math.floor(this.progress() * 2) % 2 === 0
          ref.current.textContent = text + (showCursor ? '|' : '')
        }
      },
      onComplete: () => {
        if (ref.current) ref.current.textContent = text
      }
    })
  }, [text])

  return (
    <h1 ref={ref} style={{ ...headerStyle, fontFamily: typography.fontFamily.mono }}>
      |
    </h1>
  )
}

// 4. Split Text with Rotation
export function HeaderSplitRotate({ text = 'QUSD Protocol' }: { text?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const words = containerRef.current.querySelectorAll('.word')

    gsap.fromTo(words,
      { opacity: 0, rotateX: -90, y: 50 },
      {
        opacity: 1,
        rotateX: 0,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.7)',
      }
    )
  }, [])

  return (
    <h1 ref={containerRef} style={{ ...headerStyle, perspective: '1000px' }}>
      {text.split(' ').map((word, i) => (
        <span
          key={i}
          className="word inline-block mr-4"
          style={{ opacity: 0, transformStyle: 'preserve-3d' }}
        >
          {word}
        </span>
      ))}
    </h1>
  )
}

// 5. Gradient Reveal
export function HeaderGradientReveal({ text = 'Open Source' }: { text?: string }) {
  const textRef = useRef<HTMLHeadingElement>(null)
  const maskRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!textRef.current || !maskRef.current) return

    const tl = gsap.timeline()

    tl.fromTo(maskRef.current,
      { x: '-100%' },
      { x: '100%', duration: 1.2, ease: 'power2.inOut' }
    )
    .fromTo(textRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.01 },
      0.3
    )
  }, [])

  return (
    <div style={{ position: 'relative', overflow: 'hidden', display: 'inline-block' }}>
      <h1
        ref={textRef}
        style={{
          ...headerStyle,
          opacity: 0,
          background: colors.gradient.primary,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        {text}
      </h1>
      <div
        ref={maskRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: colors.gradient.primary,
          transform: 'translateX(-100%)',
        }}
      />
    </div>
  )
}
