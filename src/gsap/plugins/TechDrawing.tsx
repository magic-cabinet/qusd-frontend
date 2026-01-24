import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { colors, typography } from '../../design-system/tokens'

// Anime-style tech/computer setup drawing animation
export function TechSetupDraw() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const paths = svgRef.current.querySelectorAll('.draw-path')
    const fills = svgRef.current.querySelectorAll('.fill-element')
    const glows = svgRef.current.querySelectorAll('.glow-element')
    const text = svgRef.current.querySelectorAll('.text-element')

    // Setup all paths
    paths.forEach((path) => {
      const length = (path as SVGPathElement).getTotalLength?.() || 1000
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      })
    })

    // Hide fills and glows initially
    gsap.set(fills, { opacity: 0 })
    gsap.set(glows, { opacity: 0 })
    gsap.set(text, { opacity: 0 })

    const tl = gsap.timeline({ delay: 0.3 })

    // Draw desk first
    tl.to('.desk-line', {
      strokeDashoffset: 0,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.1,
    })

    // Draw monitor outline
    .to('.monitor-outline', {
      strokeDashoffset: 0,
      duration: 1,
      ease: 'power2.inOut',
    }, '-=0.3')

    // Draw monitor details
    .to('.monitor-detail', {
      strokeDashoffset: 0,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.05,
    }, '-=0.4')

    // Fill monitor screen
    .to('.screen-fill', {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
    })

    // Draw screen content (code lines)
    .to('.code-line', {
      strokeDashoffset: 0,
      duration: 0.3,
      ease: 'none',
      stagger: 0.08,
    }, '-=0.2')

    // Draw keyboard
    .to('.keyboard-outline', {
      strokeDashoffset: 0,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.5')

    .to('.keyboard-key', {
      strokeDashoffset: 0,
      duration: 0.02,
      ease: 'none',
      stagger: 0.015,
    })

    // Draw mouse
    .to('.mouse-path', {
      strokeDashoffset: 0,
      duration: 0.4,
      ease: 'power2.out',
      stagger: 0.1,
    }, '-=0.3')

    // Draw circuit lines
    .to('.circuit-line', {
      strokeDashoffset: 0,
      duration: 0.4,
      ease: 'none',
      stagger: 0.05,
    }, '-=0.2')

    // Circuit nodes appear
    .to('.circuit-node', {
      opacity: 1,
      scale: 1,
      duration: 0.2,
      ease: 'back.out(1.7)',
      stagger: 0.03,
    }, '-=0.2')

    // Draw decorative elements
    .to('.deco-element', {
      strokeDashoffset: 0,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.1,
    }, '-=0.3')

    // Glows fade in
    .to('.glow-element', {
      opacity: 0.6,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.1,
    }, '-=0.5')

    // Text appears
    .to('.text-element', {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
    }, '-=0.3')

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div style={{
      padding: '40px',
      background: colors.ink,
      borderRadius: '24px',
    }}>
      <svg
        ref={svgRef}
        width="600"
        height="400"
        viewBox="0 0 600 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background glow effects */}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors.cyan.DEFAULT} stopOpacity="0.2"/>
            <stop offset="100%" stopColor={colors.blue.DEFAULT} stopOpacity="0.1"/>
          </linearGradient>
        </defs>

        {/* Desk */}
        <path
          className="draw-path desk-line"
          d="M 50 320 L 550 320"
          stroke={colors.gray[600]}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          className="draw-path desk-line"
          d="M 80 320 L 80 380"
          stroke={colors.gray[600]}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          className="draw-path desk-line"
          d="M 520 320 L 520 380"
          stroke={colors.gray[600]}
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Monitor */}
        <rect
          className="draw-path monitor-outline"
          x="150"
          y="80"
          width="300"
          height="200"
          rx="8"
          stroke={colors.gray[400]}
          strokeWidth="3"
          fill="none"
        />

        {/* Monitor stand */}
        <path
          className="draw-path monitor-detail"
          d="M 280 280 L 280 310 L 320 310 L 320 280"
          stroke={colors.gray[500]}
          strokeWidth="3"
          fill="none"
        />
        <path
          className="draw-path monitor-detail"
          d="M 250 310 L 350 310"
          stroke={colors.gray[500]}
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Screen fill */}
        <rect
          className="fill-element screen-fill"
          x="160"
          y="90"
          width="280"
          height="180"
          rx="4"
          fill="url(#screenGrad)"
        />

        {/* Screen bezel detail */}
        <path
          className="draw-path monitor-detail"
          d="M 160 90 L 440 90 L 440 270 L 160 270 Z"
          stroke={colors.gray[700]}
          strokeWidth="1"
          fill="none"
        />

        {/* Code lines on screen */}
        <path className="draw-path code-line" d="M 180 115 L 280 115" stroke={colors.cyan.DEFAULT} strokeWidth="2" strokeLinecap="round"/>
        <path className="draw-path code-line" d="M 180 135 L 320 135" stroke={colors.gray[500]} strokeWidth="2" strokeLinecap="round"/>
        <path className="draw-path code-line" d="M 200 155 L 350 155" stroke={colors.blue.DEFAULT} strokeWidth="2" strokeLinecap="round"/>
        <path className="draw-path code-line" d="M 200 175 L 300 175" stroke={colors.gray[500]} strokeWidth="2" strokeLinecap="round"/>
        <path className="draw-path code-line" d="M 200 195 L 380 195" stroke={colors.cyan.DEFAULT} strokeWidth="2" strokeLinecap="round"/>
        <path className="draw-path code-line" d="M 180 215 L 260 215" stroke={colors.gray[500]} strokeWidth="2" strokeLinecap="round"/>
        <path className="draw-path code-line" d="M 180 235 L 340 235" stroke={colors.blue.DEFAULT} strokeWidth="2" strokeLinecap="round"/>
        <path className="draw-path code-line" d="M 180 255 L 220 255" stroke={colors.success} strokeWidth="2" strokeLinecap="round"/>

        {/* Keyboard */}
        <rect
          className="draw-path keyboard-outline"
          x="180"
          y="340"
          width="200"
          height="50"
          rx="4"
          stroke={colors.gray[500]}
          strokeWidth="2"
          fill="none"
        />

        {/* Keyboard keys - row 1 */}
        {[...Array(12)].map((_, i) => (
          <rect
            key={`key-1-${i}`}
            className="draw-path keyboard-key"
            x={190 + i * 15}
            y="348"
            width="12"
            height="10"
            rx="2"
            stroke={colors.gray[600]}
            strokeWidth="1"
            fill="none"
          />
        ))}
        {/* Keyboard keys - row 2 */}
        {[...Array(11)].map((_, i) => (
          <rect
            key={`key-2-${i}`}
            className="draw-path keyboard-key"
            x={195 + i * 15}
            y="362"
            width="12"
            height="10"
            rx="2"
            stroke={colors.gray[600]}
            strokeWidth="1"
            fill="none"
          />
        ))}
        {/* Keyboard keys - row 3 (spacebar) */}
        <rect
          className="draw-path keyboard-key"
          x="220"
          y="376"
          width="80"
          height="8"
          rx="2"
          stroke={colors.gray[600]}
          strokeWidth="1"
          fill="none"
        />

        {/* Mouse */}
        <ellipse
          className="draw-path mouse-path"
          cx="450"
          cy="360"
          rx="25"
          ry="35"
          stroke={colors.gray[500]}
          strokeWidth="2"
          fill="none"
        />
        <path
          className="draw-path mouse-path"
          d="M 450 330 L 450 350"
          stroke={colors.gray[600]}
          strokeWidth="1"
        />
        <line
          className="draw-path mouse-path"
          x1="425"
          y1="360"
          x2="475"
          y2="360"
          stroke={colors.gray[700]}
          strokeWidth="1"
        />

        {/* Circuit board decorations - left side */}
        <path
          className="draw-path circuit-line"
          d="M 30 150 L 60 150 L 60 200 L 90 200"
          stroke={colors.cyan.DEFAULT}
          strokeWidth="1.5"
          fill="none"
          filter="url(#glow)"
        />
        <path
          className="draw-path circuit-line"
          d="M 30 180 L 50 180 L 50 230 L 70 230"
          stroke={colors.blue.DEFAULT}
          strokeWidth="1.5"
          fill="none"
        />
        <path
          className="draw-path circuit-line"
          d="M 30 210 L 40 210 L 40 260 L 80 260"
          stroke={colors.cyan.DEFAULT}
          strokeWidth="1.5"
          fill="none"
        />

        {/* Circuit nodes */}
        <circle className="fill-element circuit-node" cx="90" cy="200" r="4" fill={colors.cyan.DEFAULT} filter="url(#glow)"/>
        <circle className="fill-element circuit-node" cx="70" cy="230" r="3" fill={colors.blue.DEFAULT}/>
        <circle className="fill-element circuit-node" cx="80" cy="260" r="4" fill={colors.cyan.DEFAULT} filter="url(#glow)"/>
        <circle className="fill-element circuit-node" cx="60" cy="150" r="3" fill={colors.cyan.DEFAULT}/>

        {/* Circuit board decorations - right side */}
        <path
          className="draw-path circuit-line"
          d="M 570 140 L 530 140 L 530 180 L 500 180"
          stroke={colors.blue.DEFAULT}
          strokeWidth="1.5"
          fill="none"
        />
        <path
          className="draw-path circuit-line"
          d="M 570 170 L 540 170 L 540 220 L 510 220"
          stroke={colors.cyan.DEFAULT}
          strokeWidth="1.5"
          fill="none"
          filter="url(#glow)"
        />
        <path
          className="draw-path circuit-line"
          d="M 570 200 L 550 200 L 550 250 L 520 250"
          stroke={colors.blue.DEFAULT}
          strokeWidth="1.5"
          fill="none"
        />

        {/* Circuit nodes - right */}
        <circle className="fill-element circuit-node" cx="500" cy="180" r="3" fill={colors.blue.DEFAULT}/>
        <circle className="fill-element circuit-node" cx="510" cy="220" r="4" fill={colors.cyan.DEFAULT} filter="url(#glow)"/>
        <circle className="fill-element circuit-node" cx="520" cy="250" r="3" fill={colors.blue.DEFAULT}/>

        {/* Decorative brackets/chips */}
        <path
          className="draw-path deco-element"
          d="M 40 100 L 40 80 L 70 80 L 70 100"
          stroke={colors.gray[600]}
          strokeWidth="2"
          fill="none"
        />
        <rect
          className="draw-path deco-element"
          x="45"
          y="85"
          width="20"
          height="10"
          stroke={colors.cyan.DEFAULT}
          strokeWidth="1"
          fill="none"
        />

        <path
          className="draw-path deco-element"
          d="M 530 80 L 530 100 L 560 100 L 560 80"
          stroke={colors.gray[600]}
          strokeWidth="2"
          fill="none"
        />
        <rect
          className="draw-path deco-element"
          x="535"
          y="85"
          width="20"
          height="10"
          stroke={colors.blue.DEFAULT}
          strokeWidth="1"
          fill="none"
        />

        {/* Data flow lines at top */}
        <path
          className="draw-path deco-element"
          d="M 200 40 L 250 40 L 270 60 L 330 60 L 350 40 L 400 40"
          stroke={colors.cyan.DEFAULT}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          filter="url(#glow)"
        />

        {/* Coffee mug (cute detail) */}
        <path
          className="draw-path deco-element"
          d="M 500 290 L 500 315 Q 500 325 510 325 L 540 325 Q 550 325 550 315 L 550 290"
          stroke={colors.gray[500]}
          strokeWidth="2"
          fill="none"
        />
        <path
          className="draw-path deco-element"
          d="M 550 295 Q 565 295 565 307 Q 565 320 550 320"
          stroke={colors.gray[500]}
          strokeWidth="2"
          fill="none"
        />
        {/* Steam */}
        <path
          className="draw-path deco-element"
          d="M 515 280 Q 520 270 515 260"
          stroke={colors.gray[600]}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          className="draw-path deco-element"
          d="M 530 282 Q 535 272 530 262"
          stroke={colors.gray[600]}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Ambient glow behind monitor */}
        <ellipse
          className="glow-element"
          cx="300"
          cy="180"
          rx="180"
          ry="120"
          fill={colors.cyan.DEFAULT}
          opacity="0"
          style={{ filter: 'blur(60px)' }}
        />

        {/* Small indicator lights */}
        <circle className="glow-element" cx="435" cy="275" r="3" fill={colors.success}/>
        <circle className="glow-element" cx="165" cy="275" r="2" fill={colors.cyan.DEFAULT}/>

        {/* Terminal text */}
        <text
          className="text-element"
          x="300"
          y="30"
          textAnchor="middle"
          fill={colors.gray[500]}
          fontSize="12"
          fontFamily="Space Mono, monospace"
        >
          $ npm run dev
        </text>
      </svg>
    </div>
  )
}

// Simpler circuit board drawing
export function CircuitBoardDraw() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const paths = svgRef.current.querySelectorAll('.trace')
    const nodes = svgRef.current.querySelectorAll('.node')
    const chips = svgRef.current.querySelectorAll('.chip')

    // Setup traces
    paths.forEach((path) => {
      const length = (path as SVGPathElement).getTotalLength?.() || 100
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      })
    })

    gsap.set(nodes, { scale: 0, transformOrigin: 'center' })
    gsap.set(chips, { opacity: 0, scale: 0.8 })

    const tl = gsap.timeline({ delay: 0.2 })

    // Draw all traces
    tl.to('.trace', {
      strokeDashoffset: 0,
      duration: 0.4,
      ease: 'none',
      stagger: 0.05,
    })

    // Pop in nodes
    .to('.node', {
      scale: 1,
      duration: 0.2,
      ease: 'back.out(2)',
      stagger: 0.02,
    }, '-=0.5')

    // Fade in chips
    .to('.chip', {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
      stagger: 0.1,
    }, '-=0.3')

    return () => {
      tl.kill()
    }
  }, [])

  // Generate random-ish circuit paths
  const traces = [
    'M 50 50 L 100 50 L 100 100 L 150 100',
    'M 50 80 L 80 80 L 80 150 L 120 150',
    'M 50 110 L 70 110 L 70 200 L 130 200',
    'M 150 100 L 200 100 L 200 50 L 280 50',
    'M 150 100 L 200 100 L 200 150 L 280 150',
    'M 130 200 L 200 200 L 200 250 L 280 250',
    'M 280 50 L 350 50 L 350 100 L 400 100',
    'M 280 150 L 320 150 L 320 100 L 400 100',
    'M 280 250 L 350 250 L 350 200 L 400 200',
    'M 400 100 L 450 100 L 450 50 L 500 50',
    'M 400 100 L 450 100 L 450 150 L 500 150',
    'M 400 200 L 450 200 L 450 250 L 500 250',
    'M 500 50 L 550 50',
    'M 500 150 L 550 150',
    'M 500 250 L 550 250',
  ]

  const nodes = [
    { x: 100, y: 50 }, { x: 100, y: 100 }, { x: 150, y: 100 },
    { x: 80, y: 80 }, { x: 80, y: 150 }, { x: 120, y: 150 },
    { x: 70, y: 200 }, { x: 130, y: 200 },
    { x: 200, y: 50 }, { x: 200, y: 100 }, { x: 280, y: 50 },
    { x: 200, y: 150 }, { x: 280, y: 150 },
    { x: 200, y: 200 }, { x: 200, y: 250 }, { x: 280, y: 250 },
    { x: 350, y: 50 }, { x: 350, y: 100 }, { x: 400, y: 100 },
    { x: 320, y: 150 }, { x: 320, y: 100 },
    { x: 350, y: 250 }, { x: 350, y: 200 }, { x: 400, y: 200 },
    { x: 450, y: 50 }, { x: 450, y: 100 }, { x: 500, y: 50 },
    { x: 450, y: 150 }, { x: 500, y: 150 },
    { x: 450, y: 200 }, { x: 450, y: 250 }, { x: 500, y: 250 },
  ]

  return (
    <div style={{
      padding: '40px',
      background: colors.dark.surface,
      borderRadius: '24px',
    }}>
      <svg
        ref={svgRef}
        width="600"
        height="300"
        viewBox="0 0 600 300"
        fill="none"
      >
        <defs>
          <filter id="trace-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Circuit traces */}
        {traces.map((d, i) => (
          <path
            key={i}
            className="trace"
            d={d}
            stroke={i % 2 === 0 ? colors.cyan.DEFAULT : colors.blue.DEFAULT}
            strokeWidth="2"
            fill="none"
            filter="url(#trace-glow)"
          />
        ))}

        {/* Junction nodes */}
        {nodes.map((node, i) => (
          <circle
            key={i}
            className="node"
            cx={node.x}
            cy={node.y}
            r={i % 3 === 0 ? 5 : 3}
            fill={i % 2 === 0 ? colors.cyan.DEFAULT : colors.blue.DEFAULT}
          />
        ))}

        {/* Chip components */}
        <g className="chip">
          <rect x="140" y="85" width="30" height="30" rx="2" fill={colors.gray[800]} stroke={colors.gray[600]} strokeWidth="1"/>
          <text x="155" y="105" textAnchor="middle" fill={colors.cyan.DEFAULT} fontSize="8" fontFamily="Space Mono">IC</text>
        </g>

        <g className="chip">
          <rect x="385" y="85" width="30" height="30" rx="2" fill={colors.gray[800]} stroke={colors.gray[600]} strokeWidth="1"/>
          <text x="400" y="105" textAnchor="middle" fill={colors.blue.DEFAULT} fontSize="8" fontFamily="Space Mono">CPU</text>
        </g>

        <g className="chip">
          <rect x="265" y="135" width="30" height="30" rx="2" fill={colors.gray[800]} stroke={colors.gray[600]} strokeWidth="1"/>
          <text x="280" y="155" textAnchor="middle" fill={colors.cyan.DEFAULT} fontSize="8" fontFamily="Space Mono">Q</text>
        </g>
      </svg>
    </div>
  )
}

// Blockchain/network map drawing
export function NetworkMapDraw() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const connections = svgRef.current.querySelectorAll('.connection')
    const nodes = svgRef.current.querySelectorAll('.map-node')
    const labels = svgRef.current.querySelectorAll('.node-label')
    const pulses = svgRef.current.querySelectorAll('.pulse')

    // Setup connections
    connections.forEach((path) => {
      const length = (path as SVGPathElement).getTotalLength?.() || 100
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      })
    })

    gsap.set(nodes, { scale: 0, transformOrigin: 'center' })
    gsap.set(labels, { opacity: 0 })
    gsap.set(pulses, { scale: 0, opacity: 0 })

    const tl = gsap.timeline({ delay: 0.3 })

    // Draw connections from center
    tl.to('.connection', {
      strokeDashoffset: 0,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.1,
    })

    // Pop in nodes
    .to('.map-node', {
      scale: 1,
      duration: 0.4,
      ease: 'back.out(1.7)',
      stagger: 0.08,
    }, '-=0.5')

    // Show labels
    .to('.node-label', {
      opacity: 1,
      duration: 0.3,
      stagger: 0.05,
    }, '-=0.2')

    // Pulse effects (continuous)
    .to('.pulse', {
      scale: 2,
      opacity: 0.5,
      duration: 1,
      ease: 'power2.out',
      stagger: 0.2,
      repeat: -1,
      yoyo: true,
    }, '-=0.5')

    return () => {
      tl.kill()
    }
  }, [])

  const centerX = 300
  const centerY = 150
  const radius = 120

  const satellites = [
    { angle: 0, label: 'ETH', color: colors.gray[400] },
    { angle: 60, label: 'BASE', color: colors.blue.DEFAULT },
    { angle: 120, label: 'ARB', color: colors.blue.light },
    { angle: 180, label: 'SOL', color: colors.success },
    { angle: 240, label: 'MATIC', color: colors.cyan.light },
    { angle: 300, label: 'OP', color: colors.error },
  ]

  return (
    <div style={{
      padding: '40px',
      background: colors.ink,
      borderRadius: '24px',
    }}>
      <svg
        ref={svgRef}
        width="600"
        height="300"
        viewBox="0 0 600 300"
        fill="none"
      >
        <defs>
          <filter id="node-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Connections to center */}
        {satellites.map((sat, i) => {
          const x = centerX + radius * Math.cos((sat.angle * Math.PI) / 180)
          const y = centerY + radius * Math.sin((sat.angle * Math.PI) / 180)
          return (
            <line
              key={i}
              className="connection"
              x1={centerX}
              y1={centerY}
              x2={x}
              y2={y}
              stroke={colors.gray[700]}
              strokeWidth="2"
            />
          )
        })}

        {/* Satellite nodes */}
        {satellites.map((sat, i) => {
          const x = centerX + radius * Math.cos((sat.angle * Math.PI) / 180)
          const y = centerY + radius * Math.sin((sat.angle * Math.PI) / 180)
          return (
            <g key={i}>
              <circle
                className="map-node"
                cx={x}
                cy={y}
                r="25"
                fill={colors.dark.surface}
                stroke={sat.color}
                strokeWidth="2"
              />
              <text
                className="node-label"
                x={x}
                y={y + 4}
                textAnchor="middle"
                fill={sat.color}
                fontSize="10"
                fontFamily="Space Mono, monospace"
                fontWeight="bold"
              >
                {sat.label}
              </text>
            </g>
          )
        })}

        {/* Center node (QUSD) */}
        <circle
          className="pulse"
          cx={centerX}
          cy={centerY}
          r="40"
          fill={colors.cyan.DEFAULT}
          opacity="0"
        />
        <circle
          className="map-node"
          cx={centerX}
          cy={centerY}
          r="40"
          fill={colors.cyan.DEFAULT}
          filter="url(#node-glow)"
        />
        <text
          className="node-label"
          x={centerX}
          y={centerY + 5}
          textAnchor="middle"
          fill="white"
          fontSize="14"
          fontFamily="Space Mono, monospace"
          fontWeight="bold"
        >
          QUSD
        </text>

        {/* Data flow indicators */}
        {satellites.map((sat, i) => {
          const x = centerX + (radius * 0.5) * Math.cos((sat.angle * Math.PI) / 180)
          const y = centerY + (radius * 0.5) * Math.sin((sat.angle * Math.PI) / 180)
          return (
            <circle
              key={`pulse-${i}`}
              className="pulse"
              cx={x}
              cy={y}
              r="4"
              fill={colors.cyan.DEFAULT}
            />
          )
        })}
      </svg>

      <p style={{
        textAlign: 'center',
        marginTop: '20px',
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.sm,
        color: colors.gray[500],
      }}>
        Multi-chain network topology
      </p>
    </div>
  )
}
