import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { colors, typography } from '../../design-system/tokens'

const bodyStyle: React.CSSProperties = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.normal,
  lineHeight: typography.lineHeight.relaxed,
  color: colors.gray[500],
  maxWidth: '600px',
}

const defaultText = 'QUSD is a machine-native stablecoin designed from the ground up for the autonomous economy—enabling seamless, instant, and verifiable transactions between AI agents, robotics systems, and IoT devices.'

// 1. Line by Line Reveal
export function BodyLineReveal({ text = defaultText }: { text?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const lines = containerRef.current.querySelectorAll('.line')

    gsap.fromTo(lines,
      { opacity: 0, y: 30, clipPath: 'inset(0 0 100% 0)' },
      {
        opacity: 1,
        y: 0,
        clipPath: 'inset(0 0 0% 0)',
        duration: 0.7,
        stagger: 0.2,
        ease: 'power3.out',
      }
    )
  }, [])

  // Split into ~3-4 lines
  const words = text.split(' ')
  const wordsPerLine = Math.ceil(words.length / 3)
  const lines = []
  for (let i = 0; i < words.length; i += wordsPerLine) {
    lines.push(words.slice(i, i + wordsPerLine).join(' '))
  }

  return (
    <div ref={containerRef} style={bodyStyle}>
      {lines.map((line, i) => (
        <div key={i} className="line" style={{ opacity: 0 }}>
          {line}
        </div>
      ))}
    </div>
  )
}

// 2. Fade In with Blur
export function BodyFadeBlur({ text = defaultText }: { text?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!ref.current) return

    gsap.fromTo(ref.current,
      { opacity: 0, filter: 'blur(20px)', y: 20 },
      {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        duration: 1.2,
        ease: 'power2.out',
      }
    )
  }, [])

  return (
    <p ref={ref} style={{ ...bodyStyle, opacity: 0 }}>
      {text}
    </p>
  )
}

// 3. Word by Word Stagger
export function BodyWordStagger({ text = defaultText }: { text?: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const words = containerRef.current.querySelectorAll('.word')

    gsap.fromTo(words,
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.02,
        ease: 'power2.out',
      }
    )
  }, [])

  return (
    <p ref={containerRef} style={bodyStyle}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="word inline-block mr-[0.3em]" style={{ opacity: 0 }}>
          {word}
        </span>
      ))}
    </p>
  )
}

// 4. Slide Up with Mask
export function BodySlideMask({ text = defaultText }: { text?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return

    gsap.fromTo(textRef.current,
      { y: '100%' },
      {
        y: '0%',
        duration: 1,
        ease: 'power3.out',
      }
    )
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        overflow: 'hidden',
        maxWidth: '600px',
      }}
    >
      <p ref={textRef} style={{ ...bodyStyle, transform: 'translateY(100%)' }}>
        {text}
      </p>
    </div>
  )
}

// 5. Highlight Wave
export function BodyHighlightWave({ text = defaultText }: { text?: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const words = containerRef.current.querySelectorAll('.word')

    // Initial fade in
    gsap.fromTo(words,
      { opacity: 0.3 },
      {
        opacity: 1,
        duration: 0.3,
        stagger: 0.02,
        ease: 'power1.out',
      }
    )

    // Highlight wave effect
    gsap.to(words, {
      color: colors.cyan.DEFAULT,
      duration: 0.15,
      stagger: {
        each: 0.02,
        repeat: -1,
        yoyo: true,
      },
      ease: 'power1.inOut',
      delay: 0.8,
    })
  }, [])

  return (
    <p ref={containerRef} style={bodyStyle}>
      {text.split(' ').map((word, i) => (
        <span
          key={i}
          className="word inline-block mr-[0.3em]"
          style={{ opacity: 0.3, transition: 'color 0.15s' }}
        >
          {word}
        </span>
      ))}
    </p>
  )
}
