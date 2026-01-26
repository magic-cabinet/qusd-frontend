import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { colors, typography } from '../../design-system/tokens'
import { Logo } from '../components/Logo'

gsap.registerPlugin(ScrollTrigger)

// === METALLIC ORBITING PARTICLES ===
// Harmonious orbiting with golden/silver metallic look
interface OrbitingParticlesProps {
  containerRef: React.RefObject<HTMLDivElement>
  count?: number
  radius?: number
  particleSize?: number
  duration?: number
  reverse?: boolean
  color?: 'gold' | 'silver' | 'cyan'
  waveAmplitude?: number
}

function OrbitingParticles({
  containerRef,
  count = 8,
  radius = 140,
  particleSize = 12,
  duration = 6,
  reverse = false,
  color = 'gold',
  waveAmplitude = 20,
}: OrbitingParticlesProps) {
  const particlesRef = useRef<HTMLDivElement>(null)

  const colorMap = {
    gold: {
      base: 'linear-gradient(135deg, #D4AF37 0%, #F5D77E 30%, #B8860B 70%, #D4AF37 100%)',
      shadow: 'rgba(212, 175, 55, 0.6)',
      glow: 'rgba(245, 215, 126, 0.4)',
    },
    silver: {
      base: 'linear-gradient(135deg, #C0C0C0 0%, #E8E8E8 30%, #A0A0A0 70%, #C0C0C0 100%)',
      shadow: 'rgba(192, 192, 192, 0.6)',
      glow: 'rgba(232, 232, 232, 0.4)',
    },
    cyan: {
      base: `linear-gradient(135deg, ${colors.cyan.DEFAULT} 0%, ${colors.cyan.light} 30%, ${colors.blue.DEFAULT} 70%, ${colors.cyan.DEFAULT} 100%)`,
      shadow: `rgba(14, 204, 237, 0.6)`,
      glow: `rgba(14, 204, 237, 0.4)`,
    },
  }

  useEffect(() => {
    if (!particlesRef.current) return

    const particles = particlesRef.current.querySelectorAll('.orbit-particle')
    const direction = reverse ? -1 : 1

    const ctx = gsap.context(() => {
      particles.forEach((particle, i) => {
        const startAngle = (i / count) * Math.PI * 2
        const phaseOffset = i * 0.3 // Harmonic phase offset

        // Create smooth harmonic orbit
        gsap.to(particle, {
          duration: duration,
          repeat: -1,
          ease: 'none',
          motionPath: {
            path: Array.from({ length: 60 }, (_, j) => {
              const t = j / 60
              const angle = startAngle + t * Math.PI * 2 * direction
              const wave = Math.sin(t * Math.PI * 4 + phaseOffset) * waveAmplitude
              return {
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius * 0.35 + wave * 0.5, // Elliptical + wave
              }
            }),
            curviness: 2,
          },
        })

        // Pulsing glow
        gsap.to(particle, {
          boxShadow: `0 0 ${particleSize * 2}px ${colorMap[color].glow}, 0 0 ${particleSize}px ${colorMap[color].shadow}`,
          duration: 1 + i * 0.1,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [count, radius, duration, reverse, color, waveAmplitude, containerRef])

  return (
    <div
      ref={particlesRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="orbit-particle"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: particleSize,
            height: particleSize,
            borderRadius: '50%',
            background: colorMap[color].base,
            boxShadow: `0 0 ${particleSize}px ${colorMap[color].shadow}, inset 0 1px 2px rgba(255,255,255,0.5)`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  )
}

// === 3D CSS COIN ===
interface CoinProps {
  size?: number
  rotationY?: number
  rotationX?: number
  className?: string
}

function Coin({ size = 250, rotationY = 0, rotationX = 0, className = '' }: CoinProps) {
  const thickness = size * 0.1

  return (
    <div
      className={`coin-3d ${className}`}
      style={{
        width: size,
        height: size,
        position: 'relative',
        transformStyle: 'preserve-3d',
        transform: `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`,
      }}
    >
      {/* Front face */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: 'linear-gradient(145deg, #D4AF37 0%, #F5D77E 25%, #B8860B 50%, #8B6914 75%, #D4AF37 100%)',
          boxShadow: `
            inset 0 4px 20px rgba(255, 255, 255, 0.4),
            inset 0 -4px 20px rgba(0, 0, 0, 0.3),
            0 0 40px rgba(212, 175, 55, 0.5)
          `,
          transform: `translateZ(${thickness / 2}px)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backfaceVisibility: 'hidden',
        }}
      >
        {/* Inner ring */}
        <div
          style={{
            width: '75%',
            height: '75%',
            borderRadius: '50%',
            border: '3px solid rgba(184, 134, 11, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Logo - silver for contrast */}
          <div
            style={{
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3)) brightness(1.1)',
              transform: 'scale(0.6)',
            }}
          >
            <Logo variant="icon" color="white" size={size * 0.5} />
          </div>
        </div>
      </div>

      {/* Back face */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: 'linear-gradient(145deg, #B8860B 0%, #D4AF37 25%, #8B6914 50%, #D4AF37 75%, #B8860B 100%)',
          boxShadow: `
            inset 0 4px 20px rgba(255, 255, 255, 0.3),
            inset 0 -4px 20px rgba(0, 0, 0, 0.4)
          `,
          transform: `translateZ(${-thickness / 2}px) rotateY(180deg)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backfaceVisibility: 'hidden',
        }}
      >
        <div
          style={{
            width: '75%',
            height: '75%',
            borderRadius: '50%',
            border: '3px solid rgba(184, 134, 11, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))', transform: 'scale(0.6)' }}>
            <Logo variant="icon" color="white" size={size * 0.5} />
          </div>
        </div>
      </div>

      {/* Edge (multiple slices for 3D effect) */}
      {Array.from({ length: 60 }).map((_, i) => {
        const angle = (i / 60) * Math.PI * 2
        const x = Math.cos(angle) * (size / 2 - 2)
        const y = Math.sin(angle) * (size / 2 - 2)
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: 4,
              height: thickness,
              background: `linear-gradient(180deg, #F5D77E 0%, #B8860B 50%, #8B6914 100%)`,
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotateY(${(angle * 180) / Math.PI + 90}deg)`,
              transformOrigin: 'center center',
            }}
          />
        )
      })}
    </div>
  )
}

// === FRAME COMPONENT ===
interface FrameProps {
  children: React.ReactNode
  background?: string
  className?: string
}

function Frame({ children, background, className = '' }: FrameProps) {
  return (
    <div
      className={`coin-frame ${className}`}
      style={{
        width: '100vw',
        height: '100vh',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: background || `linear-gradient(135deg, ${colors.ink} 0%, #1a1a2e 50%, ${colors.ink} 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  )
}

// === FRAME 1: SLOW SPIN ===
function SlowSpinFrame() {
  const frameRef = useRef<HTMLDivElement>(null)
  const coinRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!frameRef.current || !coinRef.current) return

    const ctx = gsap.context(() => {
      // Continuous slow rotation
      gsap.to(coinRef.current, {
        rotateY: 360,
        duration: 10,
        repeat: -1,
        ease: 'none',
      })

      // Subtle floating
      gsap.to(coinRef.current, {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }, frameRef)

    return () => ctx.revert()
  }, [])

  return (
    <Frame className="slow-spin-frame">
      <div ref={frameRef} style={{ position: 'relative', width: 400, height: 400 }}>
        {/* Glow */}
        <div
          className="coin-glow"
          style={{
            position: 'absolute',
            inset: -60,
            background: `radial-gradient(circle, ${colors.cyan.DEFAULT}30 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
        />

        {/* Orbiting particles - outer ring */}
        <OrbitingParticles
          containerRef={frameRef}
          count={8}
          radius={180}
          particleSize={10}
          duration={8}
          color="gold"
          waveAmplitude={15}
        />

        {/* Orbiting particles - inner ring */}
        <OrbitingParticles
          containerRef={frameRef}
          count={6}
          radius={150}
          particleSize={8}
          duration={6}
          reverse
          color="silver"
          waveAmplitude={10}
        />

        {/* Coin */}
        <div
          ref={coinRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            transformStyle: 'preserve-3d',
            perspective: 1000,
          }}
        >
          <Coin size={220} />
        </div>

        {/* Label */}
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
          }}
        >
          <h3
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '24px',
              fontWeight: typography.fontWeight.bold,
              color: 'white',
              marginBottom: '8px',
            }}
          >
            Slow Spin
          </h3>
          <p style={{ fontFamily: typography.fontFamily.mono, fontSize: '14px', color: colors.gray[500] }}>
            Elegant continuous rotation
          </p>
        </div>
      </div>
    </Frame>
  )
}

// === FRAME 2: FLIP REVEAL ===
function FlipRevealFrame() {
  const frameRef = useRef<HTMLDivElement>(null)
  const coinRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!frameRef.current || !coinRef.current) return

    const ctx = gsap.context(() => {
      // Flip animation
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 })

      tl.fromTo(
        coinRef.current,
        { rotateX: 90, y: -100, opacity: 0 },
        { rotateX: 0, y: 0, opacity: 1, duration: 1.5, ease: 'back.out(1.5)' }
      )
        .to(coinRef.current, { rotateY: 180, duration: 0.8, ease: 'power2.inOut' }, '+=1')
        .to(coinRef.current, { rotateY: 360, duration: 0.8, ease: 'power2.inOut' }, '+=0.5')
        .to(coinRef.current, { rotateX: -90, y: 100, opacity: 0, duration: 1, ease: 'power2.in' }, '+=1')
    }, frameRef)

    return () => ctx.revert()
  }, [])

  return (
    <Frame className="flip-reveal-frame" background={`linear-gradient(180deg, #1a1a2e 0%, ${colors.ink} 100%)`}>
      <div ref={frameRef} style={{ position: 'relative', width: 400, height: 400 }}>
        <div
          style={{
            position: 'absolute',
            inset: -40,
            background: `radial-gradient(ellipse, ${colors.cyan.DEFAULT}25 0%, transparent 60%)`,
            filter: 'blur(50px)',
          }}
        />

        <OrbitingParticles
          containerRef={frameRef}
          count={10}
          radius={170}
          particleSize={8}
          duration={5}
          color="cyan"
          waveAmplitude={25}
        />

        <div
          ref={coinRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            transformStyle: 'preserve-3d',
            perspective: 1200,
          }}
        >
          <Coin size={200} />
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: -80,
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
          }}
        >
          <h3
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '24px',
              fontWeight: typography.fontWeight.bold,
              color: 'white',
              marginBottom: '8px',
            }}
          >
            Flip Reveal
          </h3>
          <p style={{ fontFamily: typography.fontFamily.mono, fontSize: '14px', color: colors.gray[500] }}>
            Dramatic entrance flip
          </p>
        </div>
      </div>
    </Frame>
  )
}

// === FRAME 3: ORBIT ===
function OrbitFrame() {
  const frameRef = useRef<HTMLDivElement>(null)
  const coinGroupRef = useRef<HTMLDivElement>(null)
  const coinRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!frameRef.current || !coinGroupRef.current || !coinRef.current) return

    const ctx = gsap.context(() => {
      // Camera orbits around coin (simulated by rotating container)
      gsap.to(coinGroupRef.current, {
        rotateY: 360,
        duration: 12,
        repeat: -1,
        ease: 'none',
      })

      // Subtle coin spin
      gsap.to(coinRef.current, {
        rotateY: -360,
        duration: 20,
        repeat: -1,
        ease: 'none',
      })
    }, frameRef)

    return () => ctx.revert()
  }, [])

  return (
    <Frame className="orbit-frame">
      <div ref={frameRef} style={{ position: 'relative', width: 500, height: 500 }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle, ${colors.blue.DEFAULT}20 0%, transparent 50%)`,
            filter: 'blur(60px)',
          }}
        />

        <OrbitingParticles
          containerRef={frameRef}
          count={12}
          radius={220}
          particleSize={12}
          duration={10}
          color="gold"
          waveAmplitude={30}
        />

        <OrbitingParticles
          containerRef={frameRef}
          count={8}
          radius={180}
          particleSize={10}
          duration={7}
          reverse
          color="silver"
          waveAmplitude={20}
        />

        <div
          ref={coinGroupRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            transformStyle: 'preserve-3d',
            perspective: 1000,
          }}
        >
          <div
            ref={coinRef}
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            <Coin size={180} rotationX={15} />
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: -60,
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
          }}
        >
          <h3
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '24px',
              fontWeight: typography.fontWeight.bold,
              color: 'white',
              marginBottom: '8px',
            }}
          >
            Orbit
          </h3>
          <p style={{ fontFamily: typography.fontFamily.mono, fontSize: '14px', color: colors.gray[500] }}>
            Camera orbits around coin
          </p>
        </div>
      </div>
    </Frame>
  )
}

// === FRAME 4: BOUNCE DROP ===
function BounceDropFrame() {
  const frameRef = useRef<HTMLDivElement>(null)
  const coinRef = useRef<HTMLDivElement>(null)
  const shadowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!frameRef.current || !coinRef.current || !shadowRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 })

      // Drop and bounce
      tl.fromTo(
        coinRef.current,
        { y: -300, rotateY: 0, rotateX: 30 },
        { y: 0, rotateY: 720, rotateX: 5, duration: 1.2, ease: 'bounce.out' }
      )

      // Shadow scales with height
      tl.fromTo(
        shadowRef.current,
        { scale: 0.3, opacity: 0.1 },
        { scale: 1, opacity: 0.4, duration: 1.2, ease: 'bounce.out' },
        0
      )

      // Settle spin
      tl.to(coinRef.current, { rotateY: '+=360', duration: 3, ease: 'power1.out' })

      // Rise up
      tl.to(coinRef.current, { y: -300, rotateX: 30, duration: 0.8, ease: 'power2.in' }, '+=0.5')
      tl.to(shadowRef.current, { scale: 0.3, opacity: 0.1, duration: 0.8, ease: 'power2.in' }, '-=0.8')
    }, frameRef)

    return () => ctx.revert()
  }, [])

  return (
    <Frame className="bounce-drop-frame" background={`linear-gradient(180deg, ${colors.ink} 0%, #0d1b2a 100%)`}>
      <div ref={frameRef} style={{ position: 'relative', width: 400, height: 500 }}>
        <div
          style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            height: 500,
            background: `radial-gradient(circle, ${colors.cyan.DEFAULT}20 0%, transparent 50%)`,
            filter: 'blur(50px)',
          }}
        />

        <OrbitingParticles
          containerRef={frameRef}
          count={6}
          radius={160}
          particleSize={10}
          duration={5}
          color="gold"
          waveAmplitude={20}
        />

        {/* Shadow */}
        <div
          ref={shadowRef}
          style={{
            position: 'absolute',
            bottom: 60,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 200,
            height: 40,
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(10px)',
          }}
        />

        <div
          ref={coinRef}
          style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            transformStyle: 'preserve-3d',
            perspective: 1000,
          }}
        >
          <Coin size={180} />
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: -20,
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
          }}
        >
          <h3
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '24px',
              fontWeight: typography.fontWeight.bold,
              color: 'white',
              marginBottom: '8px',
            }}
          >
            Bounce Drop
          </h3>
          <p style={{ fontFamily: typography.fontFamily.mono, fontSize: '14px', color: colors.gray[500] }}>
            Physics-based drop animation
          </p>
        </div>
      </div>
    </Frame>
  )
}

// === FRAME 5: TRIPLE STACK ===
function TripleStackFrame() {
  const frameRef = useRef<HTMLDivElement>(null)
  const coinsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!frameRef.current) return

    const ctx = gsap.context(() => {
      // Stagger drop each coin
      coinsRef.current.forEach((coin, i) => {
        if (!coin) return

        gsap.fromTo(
          coin,
          { y: -400, rotateY: 0, rotateX: 20, opacity: 0 },
          {
            y: 0,
            rotateY: 360,
            rotateX: 0,
            opacity: 1,
            duration: 1,
            delay: i * 0.3,
            ease: 'bounce.out',
            repeat: -1,
            repeatDelay: 5,
          }
        )

        // Slow continuous rotation after settling
        gsap.to(coin, {
          rotateY: '+=360',
          duration: 15 + i * 2,
          repeat: -1,
          ease: 'none',
          delay: 1.5 + i * 0.3,
        })
      })
    }, frameRef)

    return () => ctx.revert()
  }, [])

  return (
    <Frame className="triple-stack-frame">
      <div ref={frameRef} style={{ position: 'relative', width: 500, height: 500 }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse at center 60%, ${colors.cyan.DEFAULT}30 0%, transparent 50%)`,
            filter: 'blur(60px)',
          }}
        />

        <OrbitingParticles
          containerRef={frameRef}
          count={10}
          radius={220}
          particleSize={10}
          duration={9}
          color="gold"
          waveAmplitude={25}
        />

        {/* Three stacked coins */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            ref={(el) => { coinsRef.current[i] = el }}
            style={{
              position: 'absolute',
              top: `${45 + i * 8}%`,
              left: `${45 + (i - 1) * 5}%`,
              transform: 'translate(-50%, -50%)',
              transformStyle: 'preserve-3d',
              perspective: 1000,
              zIndex: 3 - i,
            }}
          >
            <Coin size={160 - i * 10} />
          </div>
        ))}

        <div
          style={{
            position: 'absolute',
            bottom: -40,
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
          }}
        >
          <h3
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '24px',
              fontWeight: typography.fontWeight.bold,
              color: 'white',
              marginBottom: '8px',
            }}
          >
            Triple Stack
          </h3>
          <p style={{ fontFamily: typography.fontFamily.mono, fontSize: '14px', color: colors.gray[500] }}>
            Staggered coin stack
          </p>
        </div>
      </div>
    </Frame>
  )
}

// === MAIN HORIZONTAL COMPOSITION ===
export function CoinCompositionsHorizontal() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!wrapperRef.current || !containerRef.current) return

    const ctx = gsap.context(() => {
      const frames = containerRef.current?.querySelectorAll('.coin-frame')
      if (!frames || frames.length === 0) return

      // Horizontal scroll
      gsap.to(frames, {
        xPercent: -100 * (frames.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          pin: true,
          scrub: 1.5,
          snap: {
            snapTo: 1 / (frames.length - 1),
            duration: { min: 0.2, max: 0.5 },
            ease: 'power2.inOut',
          },
          end: () => `+=${(frames.length - 1) * window.innerWidth}`,
        },
      })
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapperRef} style={{ overflow: 'hidden' }}>
      <div ref={containerRef} style={{ display: 'flex', width: 'fit-content' }}>
        <SlowSpinFrame />
        <FlipRevealFrame />
        <OrbitFrame />
        <BounceDropFrame />
        <TripleStackFrame />
      </div>
    </div>
  )
}

// === CINEMATIC VERSION (slower, more dramatic) ===
export function CoinCompositionsCinematic() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!wrapperRef.current || !containerRef.current) return

    const ctx = gsap.context(() => {
      const frames = containerRef.current?.querySelectorAll('.coin-frame')
      if (!frames || frames.length === 0) return

      // Slower cinematic scroll
      gsap.to(frames, {
        xPercent: -100 * (frames.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          pin: true,
          scrub: 3, // Much slower
          snap: {
            snapTo: 1 / (frames.length - 1),
            duration: { min: 0.4, max: 0.8 },
            ease: 'power3.inOut',
          },
          end: () => `+=${(frames.length - 1) * window.innerWidth * 2}`,
        },
      })

      // Fade transitions between frames
      frames.forEach((frame, i) => {
        if (i === 0) return
        gsap.fromTo(
          frame,
          { opacity: 0.3 },
          {
            opacity: 1,
            scrollTrigger: {
              trigger: frame,
              containerAnimation: gsap.getById('horizontal'),
              start: 'left 80%',
              end: 'left 20%',
              scrub: true,
            },
          }
        )
      })
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapperRef} style={{ overflow: 'hidden' }}>
      <div ref={containerRef} style={{ display: 'flex', width: 'fit-content' }}>
        <SlowSpinFrame />
        <FlipRevealFrame />
        <OrbitFrame />
        <BounceDropFrame />
        <TripleStackFrame />
      </div>
    </div>
  )
}

// === INDIVIDUAL FRAME EXPORTS ===
export { SlowSpinFrame, FlipRevealFrame, OrbitFrame, BounceDropFrame, TripleStackFrame }
