import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { colors, typography } from '../../design-system/tokens'
import { Logo } from '../components/Logo'

// Register plugin
gsap.registerPlugin(MotionPathPlugin)

// 1. Logo following a circular path
export function MotionPathCircle() {
  const logoRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (!logoRef.current || !pathRef.current) return

    // Set initial position
    gsap.set(logoRef.current, {
      xPercent: -50,
      yPercent: -50,
    })

    gsap.to(logoRef.current, {
      duration: 5,
      repeat: -1,
      ease: 'none',
      motionPath: {
        path: pathRef.current,
        align: pathRef.current,
        alignOrigin: [0.5, 0.5],
        autoRotate: false,
      },
    })

    return () => {
      gsap.killTweensOf(logoRef.current)
    }
  }, [])

  // Circle as a path (cx=200, cy=200, r=150)
  const circlePath = "M 200,50 A 150,150 0 1,1 199.99,50"

  return (
    <div style={{
      position: 'relative',
      width: '400px',
      height: '400px',
      margin: '0 auto',
    }}>
      <svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <path
          ref={pathRef}
          d={circlePath}
          fill="none"
          stroke={colors.gray[200]}
          strokeWidth="2"
          strokeDasharray="8 8"
        />
      </svg>
      <div
        ref={logoRef}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <Logo variant="icon" color="cyan" size={50} />
      </div>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
      }}>
        <span style={{
          fontFamily: typography.fontFamily.mono,
          fontSize: typography.fontSize['3xl'],
          fontWeight: typography.fontWeight.bold,
          color: colors.ink,
        }}>
          QUSD
        </span>
      </div>
    </div>
  )
}

// 2. Logo following a custom bezier path
export function MotionPathBezier() {
  const logoRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (!logoRef.current || !pathRef.current) return

    gsap.set(logoRef.current, {
      xPercent: -50,
      yPercent: -50,
    })

    gsap.to(logoRef.current, {
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      motionPath: {
        path: pathRef.current,
        align: pathRef.current,
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
      },
    })

    return () => {
      gsap.killTweensOf(logoRef.current)
    }
  }, [])

  return (
    <div style={{
      position: 'relative',
      width: '500px',
      height: '300px',
      margin: '0 auto',
    }}>
      <svg
        width="500"
        height="300"
        viewBox="0 0 500 300"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <path
          ref={pathRef}
          d="M 50 150 Q 150 50 250 150 Q 350 250 450 150"
          fill="none"
          stroke={colors.cyan.DEFAULT}
          strokeWidth="2"
          strokeDasharray="8 8"
        />
      </svg>
      <div
        ref={logoRef}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <Logo variant="icon" color="cyan" size={40} />
      </div>
    </div>
  )
}

// 3. Multiple elements following the same path with offset
export function MotionPathStagger() {
  const containerRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (!containerRef.current || !pathRef.current) return

    const dots = containerRef.current.querySelectorAll('.dot')
    const path = pathRef.current

    dots.forEach((dot, i) => {
      gsap.set(dot, {
        xPercent: -50,
        yPercent: -50,
      })

      gsap.to(dot, {
        duration: 6,
        repeat: -1,
        ease: 'none',
        motionPath: {
          path: path,
          align: path,
          alignOrigin: [0.5, 0.5],
          start: i / dots.length,
          end: 1 + (i / dots.length),
        },
      })
    })

    return () => {
      dots.forEach(dot => gsap.killTweensOf(dot))
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '500px',
        height: '300px',
        margin: '0 auto',
      }}
    >
      <svg
        width="500"
        height="300"
        viewBox="0 0 500 300"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <path
          ref={pathRef}
          d="M 50 150 C 100 50 150 50 200 150 C 250 250 300 250 350 150 C 400 50 450 50 450 150"
          fill="none"
          stroke={colors.gray[200]}
          strokeWidth="2"
        />
      </svg>
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="dot"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            background: i % 2 === 0 ? colors.cyan.DEFAULT : colors.blue.DEFAULT,
          }}
        />
      ))}
    </div>
  )
}

// 4. Logo orbiting with trail effect
export function MotionPathOrbit() {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !logoRef.current) return

    const centerX = 150
    const centerY = 150
    const radius = 100

    // Position logo at center initially
    gsap.set(logoRef.current, {
      x: centerX,
      y: centerY - radius,
      xPercent: -50,
      yPercent: -50,
    })

    // Orbit path as coordinates
    const orbitPath = [
      { x: centerX, y: centerY - radius },
      { x: centerX + radius, y: centerY },
      { x: centerX, y: centerY + radius },
      { x: centerX - radius, y: centerY },
      { x: centerX, y: centerY - radius },
    ]

    gsap.to(logoRef.current, {
      duration: 4,
      repeat: -1,
      ease: 'none',
      motionPath: {
        path: orbitPath,
        curviness: 1.5,
        type: 'cubic',
      },
    })

    // Trail dots
    const trails = containerRef.current.querySelectorAll('.trail')
    trails.forEach((trail, i) => {
      gsap.set(trail, {
        x: centerX,
        y: centerY - radius,
        xPercent: -50,
        yPercent: -50,
      })

      gsap.to(trail, {
        duration: 4,
        repeat: -1,
        ease: 'none',
        motionPath: {
          path: orbitPath,
          curviness: 1.5,
          type: 'cubic',
        },
        delay: (i + 1) * 0.08,
      })
    })

    return () => {
      gsap.killTweensOf(logoRef.current)
      trails.forEach(t => gsap.killTweensOf(t))
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '300px',
        height: '300px',
        margin: '0 auto',
      }}
    >
      {/* Center logo */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}>
        <Logo variant="icon" color="dark" size={60} />
      </div>

      {/* Trail dots */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="trail"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 12 - i * 2,
            height: 12 - i * 2,
            borderRadius: '50%',
            background: colors.cyan.DEFAULT,
            opacity: 0.6 - i * 0.1,
          }}
        />
      ))}

      {/* Orbiting logo */}
      <div
        ref={logoRef}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <Logo variant="icon" color="cyan" size={40} />
      </div>
    </div>
  )
}

// 5. Animated network/blockchain visualization
export function MotionPathNetwork() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const packets = containerRef.current.querySelectorAll('.packet')
    const paths = containerRef.current.querySelectorAll('.network-path')

    packets.forEach((packet, i) => {
      gsap.set(packet, {
        xPercent: -50,
        yPercent: -50,
      })

      const pathIndex = i % paths.length
      const path = paths[pathIndex] as SVGPathElement

      gsap.to(packet, {
        duration: 1.5 + Math.random() * 0.5,
        repeat: -1,
        ease: 'none',
        motionPath: {
          path: path,
          align: path,
          alignOrigin: [0.5, 0.5],
        },
        delay: i * 0.4,
      })
    })

    return () => {
      packets.forEach(p => gsap.killTweensOf(p))
    }
  }, [])

  const nodes = [
    { x: 80, y: 80, label: 'ETH' },
    { x: 320, y: 80, label: 'BASE' },
    { x: 80, y: 220, label: 'ARB' },
    { x: 320, y: 220, label: 'SOL' },
    { x: 200, y: 150, label: 'QUSD', main: true },
  ]

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '400px',
        height: '300px',
        margin: '0 auto',
        background: colors.ink,
        borderRadius: '24px',
      }}
    >
      <svg
        width="400"
        height="300"
        viewBox="0 0 400 300"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        {/* Network paths - lines from outer nodes to center */}
        <path className="network-path" d="M 80 80 L 200 150" stroke={colors.gray[700]} strokeWidth="2" fill="none" />
        <path className="network-path" d="M 320 80 L 200 150" stroke={colors.gray[700]} strokeWidth="2" fill="none" />
        <path className="network-path" d="M 80 220 L 200 150" stroke={colors.gray[700]} strokeWidth="2" fill="none" />
        <path className="network-path" d="M 320 220 L 200 150" stroke={colors.gray[700]} strokeWidth="2" fill="none" />
      </svg>

      {/* Data packets */}
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="packet"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: colors.cyan.DEFAULT,
            boxShadow: `0 0 10px ${colors.cyan.DEFAULT}`,
          }}
        />
      ))}

      {/* Nodes */}
      {nodes.map((node) => (
        <div
          key={node.label}
          style={{
            position: 'absolute',
            left: node.x,
            top: node.y,
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            zIndex: 10,
          }}
        >
          <div style={{
            width: node.main ? 60 : 40,
            height: node.main ? 60 : 40,
            borderRadius: '50%',
            background: node.main ? colors.cyan.DEFAULT : colors.dark.surface,
            border: `2px solid ${node.main ? colors.cyan.DEFAULT : colors.gray[700]}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{
              fontFamily: typography.fontFamily.mono,
              fontSize: node.main ? typography.fontSize.sm : typography.fontSize.xs,
              fontWeight: typography.fontWeight.bold,
              color: 'white',
            }}>
              {node.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
