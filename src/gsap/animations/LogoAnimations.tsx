import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { Logo } from '../components/Logo'
import type { LogoVariant, LogoColor } from '../components/Logo'
import { colors } from '../../design-system/tokens'

// 1. Logo Spin In
export function LogoSpinIn({
  variant = 'icon',
  color = 'cyan',
  size = 120,
}: {
  variant?: LogoVariant
  color?: LogoColor
  size?: number
}) {
  const ref = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!ref.current) return

    gsap.fromTo(ref.current,
      { opacity: 0, rotation: -180, scale: 0 },
      {
        opacity: 1,
        rotation: 0,
        scale: 1,
        duration: 1.2,
        ease: 'back.out(1.7)',
      }
    )
  }, [])

  return <Logo ref={ref} variant={variant} color={color} size={size} style={{ opacity: 0 }} />
}

// 2. Logo Bounce In
export function LogoBounceIn({
  variant = 'icon',
  color = 'cyan',
  size = 120,
}: {
  variant?: LogoVariant
  color?: LogoColor
  size?: number
}) {
  const ref = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!ref.current) return

    gsap.fromTo(ref.current,
      { opacity: 0, y: -100, scale: 0.5 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'bounce.out',
      }
    )
  }, [])

  return <Logo ref={ref} variant={variant} color={color} size={size} style={{ opacity: 0 }} />
}

// 3. Logo Pulse Glow
export function LogoPulseGlow({
  variant = 'icon',
  color = 'cyan',
  size = 120,
}: {
  variant?: LogoVariant
  color?: LogoColor
  size?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!logoRef.current || !glowRef.current) return

    const tl = gsap.timeline()

    // Initial reveal
    tl.fromTo(logoRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
    )
    .fromTo(glowRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 0.5, scale: 1, duration: 0.8, ease: 'power2.out' },
      0.2
    )

    // Continuous pulse
    gsap.to(glowRef.current, {
      scale: 1.2,
      opacity: 0.3,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1,
    })
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          width: size * 1.5,
          height: size * 1.5,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.cyan.DEFAULT}40 0%, transparent 70%)`,
          opacity: 0,
        }}
      />
      <Logo ref={logoRef} variant={variant} color={color} size={size} style={{ opacity: 0, position: 'relative', zIndex: 1 }} />
    </div>
  )
}

// 4. Logo Morphing Float
export function LogoFloat({
  variant = 'icon',
  color = 'cyan',
  size = 120,
}: {
  variant?: LogoVariant
  color?: LogoColor
  size?: number
}) {
  const ref = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!ref.current) return

    // Initial reveal
    gsap.fromTo(ref.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    )

    // Continuous float
    gsap.to(ref.current, {
      y: -15,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 0.8,
    })
  }, [])

  return <Logo ref={ref} variant={variant} color={color} size={size} style={{ opacity: 0 }} />
}

// 5. Logo 3D Flip
export function LogoFlip3D({
  variant = 'icon',
  color = 'cyan',
  size = 120,
}: {
  variant?: LogoVariant
  color?: LogoColor
  size?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!logoRef.current) return

    gsap.fromTo(logoRef.current,
      { opacity: 0, rotateY: -180, scale: 0.5 },
      {
        opacity: 1,
        rotateY: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
      }
    )
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        perspective: '1000px',
        display: 'inline-block',
      }}
    >
      <Logo
        ref={logoRef}
        variant={variant}
        color={color}
        size={size}
        style={{
          opacity: 0,
          transformStyle: 'preserve-3d',
        }}
      />
    </div>
  )
}

// 6. Logo with Text Reveal
export function LogoWithTagline({
  variant = 'horizontal',
  color = 'dark',
  size = 200,
}: {
  variant?: LogoVariant
  color?: LogoColor
  size?: number
}) {
  const logoRef = useRef<HTMLImageElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!logoRef.current || !taglineRef.current || !lineRef.current) return

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(logoRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8 }
    )
    .fromTo(lineRef.current,
      { scaleX: 0, transformOrigin: 'left' },
      { scaleX: 1, duration: 0.6 },
      0.4
    )
    .fromTo(taglineRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      0.7
    )
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Logo ref={logoRef} variant={variant} color={color} size={size} style={{ opacity: 0 }} />
      <div
        ref={lineRef}
        style={{
          height: '2px',
          background: colors.gradient.primary,
          transform: 'scaleX(0)',
          width: size,
        }}
      />
      <div
        ref={taglineRef}
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '16px',
          color: colors.gray[500],
          opacity: 0,
        }}
      >
        The stablecoin agents use
      </div>
    </div>
  )
}

// 7. Logo Grid Stagger
export function LogoGridStagger() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const items = containerRef.current.querySelectorAll('.logo-item')

    gsap.fromTo(items,
      { opacity: 0, scale: 0, rotation: -45 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.5,
        stagger: {
          each: 0.1,
          grid: [2, 3],
          from: 'center',
        },
        ease: 'back.out(1.7)',
      }
    )
  }, [])

  const variants: { variant: LogoVariant; color: LogoColor }[] = [
    { variant: 'icon', color: 'cyan' },
    { variant: 'icon', color: 'blue' },
    { variant: 'icon', color: 'dark' },
    { variant: 'icon', color: 'white' },
    { variant: 'icon', color: 'cream' },
    { variant: 'icon', color: 'black' },
  ]

  return (
    <div
      ref={containerRef}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '24px',
      }}
    >
      {variants.map(({ variant, color }, i) => (
        <div
          key={i}
          className="logo-item"
          style={{
            padding: '32px',
            background: color === 'white' || color === 'cream' ? colors.ink : colors.paper,
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0,
            border: `1px solid ${colors.gray[200]}`,
          }}
        >
          <Logo variant={variant} color={color} size={60} />
        </div>
      ))}
    </div>
  )
}

// 8. Logo Particle Burst (decorative particles around logo)
export function LogoParticleBurst({
  variant = 'icon',
  color = 'cyan',
  size = 120,
}: {
  variant?: LogoVariant
  color?: LogoColor
  size?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!containerRef.current || !logoRef.current) return
    const particles = containerRef.current.querySelectorAll('.particle')

    const tl = gsap.timeline()

    // Logo entrance
    tl.fromTo(logoRef.current,
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
    )

    // Particles burst out
    particles.forEach((particle, i) => {
      const angle = (i / particles.length) * Math.PI * 2
      const distance = 80 + Math.random() * 40

      tl.fromTo(particle,
        { opacity: 0, x: 0, y: 0, scale: 0 },
        {
          opacity: 1,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        0.3 + i * 0.05
      )
    })

    // Particles fade out
    tl.to(particles, {
      opacity: 0,
      scale: 0,
      duration: 0.5,
      stagger: 0.02,
      delay: 0.5,
    })
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size * 3,
        height: size * 3,
      }}
    >
      {/* Particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            position: 'absolute',
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: i % 2 === 0 ? colors.cyan.DEFAULT : colors.blue.DEFAULT,
            opacity: 0,
          }}
        />
      ))}
      <Logo ref={logoRef} variant={variant} color={color} size={size} style={{ opacity: 0 }} />
    </div>
  )
}
