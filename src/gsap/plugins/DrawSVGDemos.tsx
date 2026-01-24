import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { colors, typography } from '../../design-system/tokens'

/**
 * Note: DrawSVG is a premium GSAP Club plugin.
 * These demos simulate the effect using stroke-dasharray/stroke-dashoffset
 * which GSAP can animate natively. For production, consider Club GreenSock membership.
 */

// Helper to get path length
const getPathLength = (path: SVGPathElement | SVGCircleElement | SVGRectElement): number => {
  if ('getTotalLength' in path) {
    return path.getTotalLength()
  }
  return 0
}

// 1. Logo Outline Draw
export function DrawSVGLogo() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const paths = svgRef.current.querySelectorAll('path, circle, rect')

    paths.forEach((path) => {
      const length = getPathLength(path as SVGPathElement)
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      })
    })

    gsap.to(paths, {
      strokeDashoffset: 0,
      duration: 2,
      stagger: 0.2,
      ease: 'power2.inOut',
    })
  }, [])

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <svg
        ref={svgRef}
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer circle */}
        <circle
          cx="100"
          cy="100"
          r="90"
          stroke={colors.cyan.DEFAULT}
          strokeWidth="4"
          fill="none"
        />
        {/* Q letter path */}
        <path
          d="M 60 70 L 60 130 L 100 130 L 100 100 L 140 100 L 140 70 L 60 70"
          stroke={colors.blue.DEFAULT}
          strokeWidth="4"
          fill="none"
          strokeLinejoin="round"
        />
        {/* Q tail */}
        <path
          d="M 110 120 L 150 160"
          stroke={colors.cyan.DEFAULT}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      <p style={{
        marginTop: '24px',
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.sm,
        color: colors.gray[500],
      }}>
        SVG path drawing animation
      </p>
    </div>
  )
}

// 2. Network Connection Draw
export function DrawSVGNetwork() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const lines = svgRef.current.querySelectorAll('.network-line')
    const nodes = svgRef.current.querySelectorAll('.network-node')

    // Setup lines
    lines.forEach((line) => {
      const length = getPathLength(line as SVGPathElement)
      gsap.set(line, {
        strokeDasharray: length,
        strokeDashoffset: length,
      })
    })

    // Setup nodes
    gsap.set(nodes, { scale: 0, transformOrigin: 'center' })

    // Animate
    const tl = gsap.timeline()

    tl.to(lines, {
      strokeDashoffset: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power2.out',
    })
    .to(nodes, {
      scale: 1,
      duration: 0.4,
      stagger: 0.1,
      ease: 'back.out(1.7)',
    }, '-=0.5')
  }, [])

  return (
    <div style={{
      padding: '40px',
      background: colors.ink,
      borderRadius: '24px',
      textAlign: 'center',
    }}>
      <svg
        ref={svgRef}
        width="400"
        height="250"
        viewBox="0 0 400 250"
        fill="none"
      >
        {/* Network lines */}
        <line className="network-line" x1="50" y1="125" x2="150" y2="50" stroke={colors.cyan.DEFAULT} strokeWidth="2" />
        <line className="network-line" x1="50" y1="125" x2="150" y2="200" stroke={colors.cyan.DEFAULT} strokeWidth="2" />
        <line className="network-line" x1="150" y1="50" x2="250" y2="125" stroke={colors.cyan.DEFAULT} strokeWidth="2" />
        <line className="network-line" x1="150" y1="200" x2="250" y2="125" stroke={colors.cyan.DEFAULT} strokeWidth="2" />
        <line className="network-line" x1="250" y1="125" x2="350" y2="50" stroke={colors.blue.DEFAULT} strokeWidth="2" />
        <line className="network-line" x1="250" y1="125" x2="350" y2="200" stroke={colors.blue.DEFAULT} strokeWidth="2" />

        {/* Nodes */}
        <circle className="network-node" cx="50" cy="125" r="15" fill={colors.cyan.DEFAULT} />
        <circle className="network-node" cx="150" cy="50" r="12" fill={colors.gray[700]} stroke={colors.cyan.DEFAULT} strokeWidth="2" />
        <circle className="network-node" cx="150" cy="200" r="12" fill={colors.gray[700]} stroke={colors.cyan.DEFAULT} strokeWidth="2" />
        <circle className="network-node" cx="250" cy="125" r="20" fill={colors.gradient.primary} stroke={colors.cyan.DEFAULT} strokeWidth="3" />
        <circle className="network-node" cx="350" cy="50" r="12" fill={colors.gray[700]} stroke={colors.blue.DEFAULT} strokeWidth="2" />
        <circle className="network-node" cx="350" cy="200" r="12" fill={colors.gray[700]} stroke={colors.blue.DEFAULT} strokeWidth="2" />

        {/* Labels */}
        <text x="250" y="130" fill="white" fontSize="12" fontFamily="Space Mono" textAnchor="middle">QUSD</text>
      </svg>
    </div>
  )
}

// 3. Progress/Loading Animation
export function DrawSVGProgress() {
  const circleRef = useRef<SVGCircleElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!circleRef.current || !textRef.current) return

    const circumference = 2 * Math.PI * 80

    gsap.set(circleRef.current, {
      strokeDasharray: circumference,
      strokeDashoffset: circumference,
      rotation: -90,
      transformOrigin: 'center',
    })

    gsap.to(circleRef.current, {
      strokeDashoffset: 0,
      duration: 3,
      ease: 'power2.inOut',
      repeat: -1,
      yoyo: true,
    })

    // Animate percentage text
    gsap.to({ val: 0 }, {
      val: 100,
      duration: 3,
      ease: 'power2.inOut',
      repeat: -1,
      yoyo: true,
      onUpdate: function() {
        if (textRef.current) {
          textRef.current.textContent = `${Math.round(this.targets()[0].val)}%`
        }
      },
    })
  }, [])

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <div style={{ position: 'relative', width: '200px', height: '200px', margin: '0 auto' }}>
        <svg width="200" height="200" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke={colors.gray[200]}
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            ref={circleRef}
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke={colors.cyan.DEFAULT}
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}>
          <span
            ref={textRef}
            style={{
              fontFamily: typography.fontFamily.mono,
              fontSize: typography.fontSize['3xl'],
              fontWeight: typography.fontWeight.bold,
              color: colors.ink,
            }}
          >
            0%
          </span>
        </div>
      </div>
    </div>
  )
}

// 4. Signature/Handwriting Effect
export function DrawSVGSignature() {
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (!pathRef.current) return

    const length = pathRef.current.getTotalLength()

    gsap.set(pathRef.current, {
      strokeDasharray: length,
      strokeDashoffset: length,
    })

    gsap.to(pathRef.current, {
      strokeDashoffset: 0,
      duration: 2.5,
      ease: 'none',
    })
  }, [])

  return (
    <div style={{
      padding: '40px',
      background: colors.paper,
      borderRadius: '24px',
      textAlign: 'center',
    }}>
      <svg width="300" height="100" viewBox="0 0 300 100">
        <path
          ref={pathRef}
          d="M 20 70 Q 40 20 60 70 Q 80 90 100 50 L 120 50 Q 140 50 140 70 Q 140 90 120 90 L 160 70 Q 180 50 200 70 Q 220 90 240 50 L 280 50"
          fill="none"
          stroke={colors.ink}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p style={{
        marginTop: '16px',
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.xs,
        color: colors.gray[400],
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
      }}>
        Signature animation
      </p>
    </div>
  )
}

// 5. Checkmark/Success Animation
export function DrawSVGCheckmark() {
  const circleRef = useRef<SVGCircleElement>(null)
  const checkRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (!circleRef.current || !checkRef.current) return

    const circleLength = 2 * Math.PI * 45
    const checkLength = checkRef.current.getTotalLength()

    gsap.set(circleRef.current, {
      strokeDasharray: circleLength,
      strokeDashoffset: circleLength,
    })

    gsap.set(checkRef.current, {
      strokeDasharray: checkLength,
      strokeDashoffset: checkLength,
    })

    const tl = gsap.timeline({ delay: 0.3 })

    tl.to(circleRef.current, {
      strokeDashoffset: 0,
      duration: 0.8,
      ease: 'power2.out',
    })
    .to(checkRef.current, {
      strokeDashoffset: 0,
      duration: 0.5,
      ease: 'power2.out',
    }, '-=0.2')
  }, [])

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle
          ref={circleRef}
          cx="60"
          cy="60"
          r="45"
          fill="none"
          stroke={colors.success}
          strokeWidth="4"
        />
        <path
          ref={checkRef}
          d="M 35 60 L 52 77 L 85 44"
          fill="none"
          stroke={colors.success}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p style={{
        marginTop: '16px',
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.bold,
        color: colors.success,
      }}>
        Transaction Complete
      </p>
    </div>
  )
}

// 6. Blockchain/Chain Links Animation
export function DrawSVGBlockchain() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const blocks = svgRef.current.querySelectorAll('.block')
    const links = svgRef.current.querySelectorAll('.link')

    // Setup blocks
    gsap.set(blocks, { scale: 0, transformOrigin: 'center' })

    // Setup links
    links.forEach((link) => {
      const length = (link as SVGLineElement).getTotalLength?.() || 60
      gsap.set(link, {
        strokeDasharray: length,
        strokeDashoffset: length,
      })
    })

    const tl = gsap.timeline()

    // Animate blocks appearing
    blocks.forEach((block, i) => {
      tl.to(block, {
        scale: 1,
        duration: 0.4,
        ease: 'back.out(1.7)',
      }, i * 0.3)

      // Animate link after block
      if (links[i]) {
        tl.to(links[i], {
          strokeDashoffset: 0,
          duration: 0.3,
          ease: 'power2.out',
        }, i * 0.3 + 0.2)
      }
    })
  }, [])

  return (
    <div style={{
      padding: '40px',
      background: colors.ink,
      borderRadius: '24px',
      textAlign: 'center',
    }}>
      <svg ref={svgRef} width="400" height="100" viewBox="0 0 400 100">
        {/* Blocks */}
        <rect className="block" x="20" y="30" width="60" height="40" rx="8" fill={colors.cyan.DEFAULT} />
        <rect className="block" x="120" y="30" width="60" height="40" rx="8" fill={colors.blue.DEFAULT} />
        <rect className="block" x="220" y="30" width="60" height="40" rx="8" fill={colors.cyan.DEFAULT} />
        <rect className="block" x="320" y="30" width="60" height="40" rx="8" fill={colors.blue.DEFAULT} />

        {/* Links */}
        <line className="link" x1="80" y1="50" x2="120" y2="50" stroke={colors.gray[500]} strokeWidth="3" />
        <line className="link" x1="180" y1="50" x2="220" y2="50" stroke={colors.gray[500]} strokeWidth="3" />
        <line className="link" x1="280" y1="50" x2="320" y2="50" stroke={colors.gray[500]} strokeWidth="3" />

        {/* Block numbers */}
        <text x="50" y="55" fill="white" fontSize="12" fontFamily="Space Mono" textAnchor="middle">#1</text>
        <text x="150" y="55" fill="white" fontSize="12" fontFamily="Space Mono" textAnchor="middle">#2</text>
        <text x="250" y="55" fill="white" fontSize="12" fontFamily="Space Mono" textAnchor="middle">#3</text>
        <text x="350" y="55" fill="white" fontSize="12" fontFamily="Space Mono" textAnchor="middle">#4</text>
      </svg>
    </div>
  )
}
