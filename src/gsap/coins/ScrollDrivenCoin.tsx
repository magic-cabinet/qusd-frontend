import { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { colors, typography } from '../../design-system/tokens'

gsap.registerPlugin(ScrollTrigger)

// === REUSE LOGO SHAPE ===
function createQUSDLogoShape(): THREE.Shape[] {
  const shapes: THREE.Shape[] = []
  const scale = 0.008
  const offsetX = -515 / 2
  const offsetY = -318 / 2

  const mainShape = new THREE.Shape()
  mainShape.moveTo((67 + offsetX) * scale, (0 + offsetY) * scale)
  mainShape.lineTo((448 + offsetX) * scale, (0 + offsetY) * scale)
  mainShape.quadraticCurveTo((480 + offsetX) * scale, (0 + offsetY) * scale, (480 + offsetX) * scale, (40 + offsetY) * scale)
  mainShape.lineTo((480 + offsetX) * scale, (278 + offsetY) * scale)
  mainShape.quadraticCurveTo((480 + offsetX) * scale, (318 + offsetY) * scale, (440 + offsetX) * scale, (318 + offsetY) * scale)
  mainShape.lineTo((75 + offsetX) * scale, (318 + offsetY) * scale)
  mainShape.quadraticCurveTo((35 + offsetX) * scale, (318 + offsetY) * scale, (35 + offsetX) * scale, (278 + offsetY) * scale)
  mainShape.lineTo((35 + offsetX) * scale, (40 + offsetY) * scale)
  mainShape.quadraticCurveTo((35 + offsetX) * scale, (0 + offsetY) * scale, (75 + offsetX) * scale, (0 + offsetY) * scale)
  mainShape.closePath()

  const hole = new THREE.Path()
  hole.moveTo((134 + offsetX) * scale, (67 + offsetY) * scale)
  hole.lineTo((381 + offsetX) * scale, (67 + offsetY) * scale)
  hole.quadraticCurveTo((400 + offsetX) * scale, (67 + offsetY) * scale, (400 + offsetX) * scale, (90 + offsetY) * scale)
  hole.lineTo((400 + offsetX) * scale, (228 + offsetY) * scale)
  hole.quadraticCurveTo((400 + offsetX) * scale, (251 + offsetY) * scale, (381 + offsetX) * scale, (251 + offsetY) * scale)
  hole.lineTo((134 + offsetX) * scale, (251 + offsetY) * scale)
  hole.quadraticCurveTo((115 + offsetX) * scale, (251 + offsetY) * scale, (115 + offsetX) * scale, (228 + offsetY) * scale)
  hole.lineTo((115 + offsetX) * scale, (90 + offsetY) * scale)
  hole.quadraticCurveTo((115 + offsetX) * scale, (67 + offsetY) * scale, (134 + offsetX) * scale, (67 + offsetY) * scale)
  hole.closePath()
  mainShape.holes.push(hole)
  shapes.push(mainShape)

  const barShape = new THREE.Shape()
  barShape.moveTo((0 + offsetX) * scale, (127 + offsetY) * scale)
  barShape.lineTo((515 + offsetX) * scale, (127 + offsetY) * scale)
  barShape.lineTo((515 + offsetX) * scale, (191 + offsetY) * scale)
  barShape.lineTo((0 + offsetX) * scale, (191 + offsetY) * scale)
  barShape.closePath()
  shapes.push(barShape)

  const tailShape = new THREE.Shape()
  tailShape.moveTo((380 + offsetX) * scale, (177 + offsetY) * scale)
  tailShape.lineTo((505 + offsetX) * scale, (252 + offsetY) * scale)
  tailShape.lineTo((505 + offsetX) * scale, (318 + offsetY) * scale)
  tailShape.lineTo((464 + offsetX) * scale, (300 + offsetY) * scale)
  tailShape.lineTo((402 + offsetX) * scale, (249 + offsetY) * scale)
  tailShape.lineTo((380 + offsetX) * scale, (239 + offsetY) * scale)
  tailShape.closePath()
  shapes.push(tailShape)

  return shapes
}

// === EXTRUDED LOGO ===
function ExtrudedLogo({ position, rotation, scale: meshScale, color }: {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
  color: string
}) {
  const shapes = useMemo(() => createQUSDLogoShape(), [])
  const extrudeSettings = useMemo(() => ({
    steps: 2, depth: 0.18, bevelEnabled: true, bevelThickness: 0.025, bevelSize: 0.02, bevelSegments: 3,
  }), [])

  return (
    <group position={position} rotation={rotation} scale={[meshScale, -meshScale, meshScale]}>
      {shapes.map((shape, i) => (
        <mesh key={i}>
          <extrudeGeometry args={[shape, extrudeSettings]} />
          <meshStandardMaterial color={color} metalness={0.9} roughness={0.15} />
        </mesh>
      ))}
    </group>
  )
}

// === SCROLL-DRIVEN ORBITING PARTICLES ===
// Progress drives the rotation instead of time
function ScrollOrbitingParticles({ orbitRadius, particleCount, progress, color = colors.cyan.DEFAULT, reverse = false }: {
  orbitRadius: number
  particleCount: number
  progress: number // 0-1 scroll progress
  color?: string
  reverse?: boolean
}) {
  const rotation = progress * Math.PI * 4 * (reverse ? -1 : 1)

  return (
    <group rotation={[0, rotation, 0]}>
      {Array.from({ length: particleCount }).map((_, i) => {
        const angle = (i / particleCount) * Math.PI * 2
        const x = Math.cos(angle) * orbitRadius
        const z = Math.sin(angle) * orbitRadius
        const y = Math.sin(angle * 2 + i + progress * Math.PI * 2) * 0.3

        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} emissive={color} emissiveIntensity={0.4} />
          </mesh>
        )
      })}
    </group>
  )
}

// === SCROLL-DRIVEN LOGO COIN ===
// All transforms driven by progress (0-1)
interface ScrollCoinProps {
  progress: number // 0-1 scroll progress
  // Transform mappings (what value at progress=1)
  rotationYEnd?: number
  rotationXEnd?: number
  scaleStart?: number
  scaleEnd?: number
  yStart?: number
  yEnd?: number
  showParticles?: boolean
}

function ScrollLogoCoin({
  progress,
  rotationYEnd = Math.PI * 4, // 2 full rotations
  rotationXEnd = 0,
  scaleStart = 0,
  scaleEnd = 1,
  yStart = 0,
  yEnd = 0,
  showParticles = true,
}: ScrollCoinProps) {
  const coinRadius = 2.0
  const coinThickness = 0.35
  const rimWidth = 0.12
  const goldColor = '#D4AF37'
  const darkGold = '#B8860B'
  const silverColor = '#C0C0C0'

  // Interpolate values based on progress
  const rotationY = progress * rotationYEnd
  const rotationX = progress * rotationXEnd
  const scale = scaleStart + progress * (scaleEnd - scaleStart)
  const y = yStart + progress * (yEnd - yStart)

  // Spring-like easing for scale (like Remotion spring)
  const easedScale = Math.min(1, scale * (1 + Math.sin(progress * Math.PI) * 0.1))

  return (
    <group scale={[easedScale, easedScale, easedScale]} position={[0, y, 0]}>
      {showParticles && (
        <>
          <ScrollOrbitingParticles orbitRadius={3.0} particleCount={8} progress={progress} color={colors.cyan.DEFAULT} />
          <ScrollOrbitingParticles orbitRadius={2.6} particleCount={6} progress={progress} color="#D4AF37" reverse />
        </>
      )}

      <group rotation={[rotationX, rotationY, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[coinRadius - rimWidth, coinRadius - rimWidth, coinThickness, 128]} />
          <meshStandardMaterial color={goldColor} metalness={0.85} roughness={0.12} />
        </mesh>

        <mesh position={[0, 0, coinThickness / 2 - 0.04]}>
          <torusGeometry args={[coinRadius - rimWidth / 2, rimWidth / 2, 16, 128]} />
          <meshStandardMaterial color={darkGold} metalness={0.9} roughness={0.1} />
        </mesh>

        <mesh position={[0, 0, -coinThickness / 2 + 0.04]}>
          <torusGeometry args={[coinRadius - rimWidth / 2, rimWidth / 2, 16, 128]} />
          <meshStandardMaterial color={darkGold} metalness={0.9} roughness={0.1} />
        </mesh>

        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[coinRadius, coinRadius, coinThickness * 0.7, 128, 1, true]} />
          <meshStandardMaterial color={darkGold} metalness={0.92} roughness={0.08} side={THREE.DoubleSide} />
        </mesh>

        <mesh position={[0, 0, coinThickness / 2 - 0.01]}>
          <torusGeometry args={[1.4, 0.03, 8, 128]} />
          <meshStandardMaterial color={darkGold} metalness={0.88} roughness={0.15} />
        </mesh>

        <mesh position={[0, 0, -coinThickness / 2 + 0.01]}>
          <torusGeometry args={[1.4, 0.03, 8, 128]} />
          <meshStandardMaterial color={darkGold} metalness={0.88} roughness={0.15} />
        </mesh>

        <ExtrudedLogo position={[0, 0, coinThickness / 2 + 0.02]} rotation={[0, 0, 0]} scale={0.55} color={silverColor} />
        <ExtrudedLogo position={[0, 0, -(coinThickness / 2 + 0.02)]} rotation={[0, Math.PI, 0]} scale={0.55} color={silverColor} />
      </group>
    </group>
  )
}

// === SCROLL-DRIVEN SCENE ===
// Wrapper that provides progress to children
interface ScrollSceneProps {
  progress: number
  children: (progress: number) => React.ReactNode
}

function ScrollScene({ progress, children }: ScrollSceneProps) {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 50 }} style={{ background: 'transparent' }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <directionalLight position={[-5, 5, 5]} intensity={1} />
      <pointLight position={[0, 0, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[3, 3, 3]} intensity={1} color="#FFD700" />
      {children(progress)}
    </Canvas>
  )
}

// === FRAME INDICATOR ===
function FrameIndicator({ progress, totalFrames }: { progress: number; totalFrames: number }) {
  const currentFrame = Math.floor(progress * totalFrames)

  return (
    <div style={{
      position: 'absolute',
      top: 30,
      right: 30,
      fontFamily: typography.fontFamily.mono,
      fontSize: '14px',
      color: colors.cyan.DEFAULT,
      background: 'rgba(0,0,0,0.5)',
      padding: '12px 20px',
      borderRadius: '8px',
      zIndex: 100,
    }}>
      <div style={{ marginBottom: 8 }}>
        Frame: <span style={{ color: 'white' }}>{currentFrame}</span> / {totalFrames}
      </div>
      <div>
        Progress: <span style={{ color: 'white' }}>{(progress * 100).toFixed(1)}%</span>
      </div>
      <div style={{
        marginTop: 8,
        height: 4,
        background: colors.gray[700],
        borderRadius: 2,
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${progress * 100}%`,
          height: '100%',
          background: colors.cyan.DEFAULT,
          transition: 'width 0.1s ease-out',
        }} />
      </div>
    </div>
  )
}

// === COMPOSITION 1: Scroll-Driven Spin ===
// Maps scroll to rotation (like Remotion frame -> rotationY)
export function ScrollDrivenSpin() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef({ value: 0 })
  const [, forceUpdate] = useState({})

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          progressRef.current.value = self.progress
          forceUpdate({})
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const progress = progressRef.current.value
  const totalFrames = 180 // Like Remotion durationInFrames

  return (
    <div ref={containerRef} style={{ height: '400vh' }}>
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        background: `radial-gradient(ellipse at center, #1a1a2e 0%, ${colors.ink} 100%)`,
      }}>
        <FrameIndicator progress={progress} totalFrames={totalFrames} />

        <ScrollScene progress={progress}>
          {(p) => (
            <ScrollLogoCoin
              progress={p}
              rotationYEnd={Math.PI * 4}
              scaleStart={0.3}
              scaleEnd={1}
              yStart={2}
              yEnd={0}
            />
          )}
        </ScrollScene>

        <div style={{
          position: 'absolute',
          bottom: 60,
          left: 0,
          right: 0,
          textAlign: 'center',
        }}>
          <h3 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '28px',
            fontWeight: typography.fontWeight.bold,
            color: 'white',
            marginBottom: 8,
          }}>
            Scroll-Driven Spin
          </h3>
          <p style={{ fontFamily: typography.fontFamily.mono, fontSize: '14px', color: colors.gray[500] }}>
            Scroll to control rotation • Frame {Math.floor(progress * totalFrames)} / {totalFrames}
          </p>
        </div>
      </div>
    </div>
  )
}

// Need useState for forceUpdate
import { useState } from 'react'

// === COMPOSITION 2: Scroll-Driven Flip ===
export function ScrollDrivenFlip() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef({ value: 0 })
  const [, forceUpdate] = useState({})

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          progressRef.current.value = self.progress
          forceUpdate({})
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const progress = progressRef.current.value
  const totalFrames = 180

  // Flip animation phases mapped to scroll
  // 0-0.3: Flip down from edge view
  // 0.3-0.6: Show front
  // 0.6-0.8: Flip to back
  // 0.8-1: Show back and flip again

  let rotationX = 0
  let rotationY = 0
  let y = 0

  if (progress < 0.3) {
    // Flip in from top
    const phase = progress / 0.3
    rotationX = (1 - phase) * Math.PI / 2
    y = (1 - phase) * 3
  } else if (progress < 0.5) {
    // Hold front
    rotationX = 0
  } else if (progress < 0.7) {
    // Flip to show back
    const phase = (progress - 0.5) / 0.2
    rotationY = phase * Math.PI
  } else {
    // Continue rotation
    const phase = (progress - 0.7) / 0.3
    rotationY = Math.PI + phase * Math.PI
  }

  return (
    <div ref={containerRef} style={{ height: '400vh' }}>
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        background: `linear-gradient(180deg, #1a1a2e 0%, ${colors.ink} 100%)`,
      }}>
        <FrameIndicator progress={progress} totalFrames={totalFrames} />

        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} />
          <directionalLight position={[-5, 5, 5]} intensity={1} />
          <pointLight position={[0, 0, 5]} intensity={1.5} />
          <pointLight position={[3, 3, 3]} intensity={1} color="#FFD700" />

          <group position={[0, y, 0]}>
            <ScrollOrbitingParticles orbitRadius={3.0} particleCount={8} progress={progress} color={colors.cyan.DEFAULT} />
            <ScrollOrbitingParticles orbitRadius={2.6} particleCount={6} progress={progress} color="#D4AF37" reverse />

            <group rotation={[rotationX, rotationY, 0]}>
              <CoinMesh />
            </group>
          </group>
        </Canvas>

        <div style={{
          position: 'absolute',
          bottom: 60,
          left: 0,
          right: 0,
          textAlign: 'center',
        }}>
          <h3 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '28px',
            fontWeight: typography.fontWeight.bold,
            color: 'white',
            marginBottom: 8,
          }}>
            Scroll-Driven Flip
          </h3>
          <p style={{ fontFamily: typography.fontFamily.mono, fontSize: '14px', color: colors.gray[500] }}>
            Scroll to flip the coin
          </p>
        </div>
      </div>
    </div>
  )
}

// === COIN MESH (extracted for reuse) ===
function CoinMesh() {
  const coinRadius = 2.0
  const coinThickness = 0.35
  const rimWidth = 0.12
  const goldColor = '#D4AF37'
  const darkGold = '#B8860B'
  const silverColor = '#C0C0C0'

  return (
    <>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[coinRadius - rimWidth, coinRadius - rimWidth, coinThickness, 128]} />
        <meshStandardMaterial color={goldColor} metalness={0.85} roughness={0.12} />
      </mesh>

      <mesh position={[0, 0, coinThickness / 2 - 0.04]}>
        <torusGeometry args={[coinRadius - rimWidth / 2, rimWidth / 2, 16, 128]} />
        <meshStandardMaterial color={darkGold} metalness={0.9} roughness={0.1} />
      </mesh>

      <mesh position={[0, 0, -coinThickness / 2 + 0.04]}>
        <torusGeometry args={[coinRadius - rimWidth / 2, rimWidth / 2, 16, 128]} />
        <meshStandardMaterial color={darkGold} metalness={0.9} roughness={0.1} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[coinRadius, coinRadius, coinThickness * 0.7, 128, 1, true]} />
        <meshStandardMaterial color={darkGold} metalness={0.92} roughness={0.08} side={THREE.DoubleSide} />
      </mesh>

      <mesh position={[0, 0, coinThickness / 2 - 0.01]}>
        <torusGeometry args={[1.4, 0.03, 8, 128]} />
        <meshStandardMaterial color={darkGold} metalness={0.88} roughness={0.15} />
      </mesh>

      <mesh position={[0, 0, -coinThickness / 2 + 0.01]}>
        <torusGeometry args={[1.4, 0.03, 8, 128]} />
        <meshStandardMaterial color={darkGold} metalness={0.88} roughness={0.15} />
      </mesh>

      <ExtrudedLogo position={[0, 0, coinThickness / 2 + 0.02]} rotation={[0, 0, 0]} scale={0.55} color={silverColor} />
      <ExtrudedLogo position={[0, 0, -(coinThickness / 2 + 0.02)]} rotation={[0, Math.PI, 0]} scale={0.55} color={silverColor} />
    </>
  )
}

// === COMPOSITION 3: Multi-Phase Timeline ===
// Complex animation with multiple phases mapped to scroll
export function ScrollDrivenTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef({ value: 0 })
  const [, forceUpdate] = useState({})

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          progressRef.current.value = self.progress
          forceUpdate({})
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const progress = progressRef.current.value
  const totalFrames = 300

  // Multi-phase animation (like Remotion sequence)
  // Phase 1 (0-0.2): Scale in + initial spin
  // Phase 2 (0.2-0.5): Continuous spin
  // Phase 3 (0.5-0.7): Rise up
  // Phase 4 (0.7-0.9): Fast spin
  // Phase 5 (0.9-1): Settle

  let scale = 1
  let rotationY = 0
  let y = 0

  if (progress < 0.2) {
    // Phase 1: Scale in
    const phase = progress / 0.2
    scale = phase
    rotationY = phase * Math.PI * 2
  } else if (progress < 0.5) {
    // Phase 2: Continuous spin
    const phase = (progress - 0.2) / 0.3
    rotationY = Math.PI * 2 + phase * Math.PI * 4
  } else if (progress < 0.7) {
    // Phase 3: Rise up
    const phase = (progress - 0.5) / 0.2
    y = phase * 1.5
    rotationY = Math.PI * 6 + phase * Math.PI * 2
  } else if (progress < 0.9) {
    // Phase 4: Fast spin at top
    const phase = (progress - 0.7) / 0.2
    y = 1.5
    rotationY = Math.PI * 8 + phase * Math.PI * 6
  } else {
    // Phase 5: Settle down
    const phase = (progress - 0.9) / 0.1
    y = 1.5 * (1 - phase)
    rotationY = Math.PI * 14 + phase * Math.PI
  }

  // Determine current phase for display
  let phaseName = ''
  if (progress < 0.2) phaseName = 'Scale In'
  else if (progress < 0.5) phaseName = 'Spin'
  else if (progress < 0.7) phaseName = 'Rise'
  else if (progress < 0.9) phaseName = 'Fast Spin'
  else phaseName = 'Settle'

  return (
    <div ref={containerRef} style={{ height: '600vh' }}>
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        background: `radial-gradient(ellipse at center, #1a1a2e 0%, ${colors.ink} 100%)`,
      }}>
        <FrameIndicator progress={progress} totalFrames={totalFrames} />

        {/* Phase indicator */}
        <div style={{
          position: 'absolute',
          top: 30,
          left: 30,
          fontFamily: typography.fontFamily.mono,
          fontSize: '14px',
          color: 'white',
          background: 'rgba(0,0,0,0.5)',
          padding: '12px 20px',
          borderRadius: '8px',
          zIndex: 100,
        }}>
          Phase: <span style={{ color: colors.cyan.DEFAULT }}>{phaseName}</span>
        </div>

        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} />
          <directionalLight position={[-5, 5, 5]} intensity={1} />
          <pointLight position={[0, 0, 5]} intensity={1.5} />
          <pointLight position={[3, 3, 3]} intensity={1} color="#FFD700" />

          <group scale={[scale, scale, scale]} position={[0, y, 0]}>
            <ScrollOrbitingParticles orbitRadius={3.0} particleCount={8} progress={progress} color={colors.cyan.DEFAULT} />
            <ScrollOrbitingParticles orbitRadius={2.6} particleCount={6} progress={progress} color="#D4AF37" reverse />

            <group rotation={[0.1, rotationY, 0]}>
              <CoinMesh />
            </group>
          </group>
        </Canvas>

        <div style={{
          position: 'absolute',
          bottom: 60,
          left: 0,
          right: 0,
          textAlign: 'center',
        }}>
          <h3 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '28px',
            fontWeight: typography.fontWeight.bold,
            color: 'white',
            marginBottom: 8,
          }}>
            Scroll-Driven Timeline
          </h3>
          <p style={{ fontFamily: typography.fontFamily.mono, fontSize: '14px', color: colors.gray[500] }}>
            Multi-phase animation controlled by scroll
          </p>
        </div>
      </div>
    </div>
  )
}

// === COMPOSITION 4: Camera Orbit ===
export function ScrollDrivenOrbit() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef({ value: 0 })
  const [, forceUpdate] = useState({})

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          progressRef.current.value = self.progress
          forceUpdate({})
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const progress = progressRef.current.value
  const totalFrames = 240

  // Camera orbits around coin
  const cameraAngle = progress * Math.PI * 2
  const cameraRadius = 8
  const cameraX = Math.sin(cameraAngle) * cameraRadius
  const cameraZ = Math.cos(cameraAngle) * cameraRadius
  const cameraY = 2 + Math.sin(progress * Math.PI * 4) * 0.5

  return (
    <div ref={containerRef} style={{ height: '500vh' }}>
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        background: `radial-gradient(ellipse at center, #1a1a2e 0%, ${colors.ink} 100%)`,
      }}>
        <FrameIndicator progress={progress} totalFrames={totalFrames} />

        <Canvas camera={{ position: [cameraX, cameraY, cameraZ], fov: 50 }}>
          <CameraUpdater position={[cameraX, cameraY, cameraZ]} />

          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} />
          <directionalLight position={[-5, 5, 5]} intensity={1} />
          <pointLight position={[0, 0, 5]} intensity={1.5} />
          <pointLight position={[3, 3, 3]} intensity={1} color="#FFD700" />

          <ScrollOrbitingParticles orbitRadius={3.0} particleCount={8} progress={progress} color={colors.cyan.DEFAULT} />
          <ScrollOrbitingParticles orbitRadius={2.6} particleCount={6} progress={progress} color="#D4AF37" reverse />

          <group rotation={[0.1, progress * Math.PI * 0.5, 0]}>
            <CoinMesh />
          </group>
        </Canvas>

        <div style={{
          position: 'absolute',
          bottom: 60,
          left: 0,
          right: 0,
          textAlign: 'center',
        }}>
          <h3 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '28px',
            fontWeight: typography.fontWeight.bold,
            color: 'white',
            marginBottom: 8,
          }}>
            Scroll-Driven Orbit
          </h3>
          <p style={{ fontFamily: typography.fontFamily.mono, fontSize: '14px', color: colors.gray[500] }}>
            Camera orbits around coin as you scroll
          </p>
        </div>
      </div>
    </div>
  )
}

// Helper to update camera position
function CameraUpdater({ position }: { position: [number, number, number] }) {
  const { camera } = useThree()

  useFrame(() => {
    camera.position.set(...position)
    camera.lookAt(0, 0, 0)
  })

  return null
}

// === EXPORTS ===
export { ScrollLogoCoin, ScrollOrbitingParticles, CoinMesh, FrameIndicator }
