import { useRef, useEffect, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { colors, typography } from '../../design-system/tokens'
import { CoinMesh, FrameIndicator } from './ScrollDrivenCoin'

gsap.registerPlugin(ScrollTrigger)

// === TRAILING PARTICLE COMPONENT ===
// Renders a particle with a fading trail behind it
// High emissive values for self-illumination
function TrailingParticle({
  position,
  color,
  size = 0.08,
  trailLength = 6,
  progress,
  index = 0,
  emissiveBoost = 1
}: {
  position: [number, number, number]
  color: string
  size?: number
  trailLength?: number
  progress: number
  index?: number
  emissiveBoost?: number
}) {
  const trailPositions = useMemo(() => {
    // Generate trail positions based on motion direction
    const trail: [number, number, number][] = []
    const [x, y, z] = position

    for (let t = 0; t < trailLength; t++) {
      const trailProgress = progress - (t * 0.015)
      // Offset trail backwards along the motion path
      const offsetAngle = (index / 12) * Math.PI * 2 + trailProgress * Math.PI * 6
      const radius = Math.sqrt(x * x + z * z)
      const trailX = Math.cos(offsetAngle - t * 0.15) * radius * (1 - t * 0.02)
      const trailZ = Math.sin(offsetAngle - t * 0.15) * radius * (1 - t * 0.02)
      const trailY = y * (1 - t * 0.1)
      trail.push([trailX, trailY, trailZ])
    }
    return trail
  }, [position, progress, index, trailLength])

  // Base emissive intensity - high for self-illumination
  const baseEmissive = 2.5 * emissiveBoost

  return (
    <group>
      {/* Main particle - highly emissive */}
      <mesh position={position}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial
          color={color}
          metalness={0.3}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={baseEmissive}
          toneMapped={false}
        />
      </mesh>
      {/* Outer glow */}
      <mesh position={position}>
        <sphereGeometry args={[size * 1.8, 12, 12]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.25}
          depthWrite={false}
        />
      </mesh>
      {/* Trail particles */}
      {trailPositions.map((pos, t) => {
        const fade = 1 - (t / trailLength)
        const trailSize = size * fade * 0.7
        return (
          <mesh key={t} position={pos}>
            <sphereGeometry args={[trailSize, 8, 8]} />
            <meshStandardMaterial
              color={color}
              transparent
              opacity={fade * 0.7}
              emissive={color}
              emissiveIntensity={fade * baseEmissive * 0.6}
              toneMapped={false}
            />
          </mesh>
        )
      })}
    </group>
  )
}

// === ATTRACTOR HELPERS ===
// Applies attractor force to particle positions
function applyAttractor(
  x: number, y: number, z: number,
  attractorX: number, attractorY: number, attractorZ: number,
  strength: number = 0.3
): [number, number, number] {
  const dx = attractorX - x
  const dy = attractorY - y
  const dz = attractorZ - z
  const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
  const force = strength / (dist + 1)
  return [
    x + dx * force,
    y + dy * force,
    z + dz * force
  ]
}

// === ADVANCED ORBITAL PATTERNS WITH TRAILS ===

// Spiral orbit with trails and z-depth
function SpiralOrbit({ progress, count = 12, baseRadius = 3, color = colors.cyan.DEFAULT, zDepth = 2 }: {
  progress: number
  count?: number
  baseRadius?: number
  color?: string
  zDepth?: number
}) {
  // Attractor that moves in 3D space
  const attractorX = Math.sin(progress * Math.PI * 4) * 2
  const attractorY = Math.cos(progress * Math.PI * 3) * 1.5
  const attractorZ = Math.sin(progress * Math.PI * 5) * zDepth

  return (
    <group>
      {Array.from({ length: count }).map((_, i) => {
        const baseAngle = (i / count) * Math.PI * 2
        const spiralFactor = 1 + Math.sin(progress * Math.PI * 2 + i * 0.5) * 0.3
        const radius = baseRadius * spiralFactor
        const angle = baseAngle + progress * Math.PI * 6
        let x = Math.cos(angle) * radius
        let z = Math.sin(angle) * radius
        // Enhanced z-depth motion
        let y = Math.sin(angle * 3 + progress * Math.PI * 4) * 0.5 +
                Math.cos(i * 0.7 + progress * Math.PI * 2) * zDepth * 0.4

        // Apply attractor influence
        ;[x, y, z] = applyAttractor(x, y, z, attractorX, attractorY, attractorZ, 0.25)

        return (
          <TrailingParticle
            key={i}
            position={[x, y, z]}
            color={color}
            size={0.08 + Math.sin(progress * Math.PI + i) * 0.03}
            trailLength={5}
            progress={progress}
            index={i}
          />
        )
      })}
    </group>
  )
}

// Figure-8 orbit with trails and z-depth
function Figure8Orbit({ progress, count = 8, scale = 2.5, color = colors.cyan.DEFAULT, zDepth = 2.5 }: {
  progress: number
  count?: number
  scale?: number
  color?: string
  zDepth?: number
}) {
  // Attractor orbits in a different pattern
  const attractorX = Math.cos(progress * Math.PI * 6) * 1.5
  const attractorY = Math.sin(progress * Math.PI * 4) * zDepth * 0.5
  const attractorZ = Math.sin(progress * Math.PI * 5) * 2

  return (
    <group>
      {Array.from({ length: count }).map((_, i) => {
        const t = ((i / count) + progress * 2) * Math.PI * 2
        // Lemniscate of Bernoulli (figure-8)
        const denom = 1 + Math.sin(t) ** 2
        let x = (scale * Math.cos(t)) / denom
        let z = (scale * Math.sin(t) * Math.cos(t)) / denom
        // Enhanced z-depth - particles sweep through higher planes
        let y = Math.sin(t * 2 + progress * Math.PI * 4) * zDepth * 0.6 +
                Math.cos(i * 0.8 + progress * Math.PI * 3) * zDepth * 0.3

        // Apply attractor
        ;[x, y, z] = applyAttractor(x, y, z, attractorX, attractorY, attractorZ, 0.2)

        return (
          <TrailingParticle
            key={i}
            position={[x, y, z]}
            color={color}
            size={0.1}
            trailLength={6}
            progress={progress}
            index={i}
          />
        )
      })}
    </group>
  )
}

// Helix orbit with trails and enhanced z-depth
function HelixOrbit({ progress, count = 16, radius = 2.8, height = 2, color = colors.cyan.DEFAULT, zDepth = 3 }: {
  progress: number
  count?: number
  radius?: number
  height?: number
  color?: string
  zDepth?: number
}) {
  // Central attractor that pulses
  const attractorStrength = 0.15 + Math.sin(progress * Math.PI * 4) * 0.1
  const attractorY = Math.sin(progress * Math.PI * 2) * zDepth * 0.3

  return (
    <group>
      {Array.from({ length: count }).map((_, i) => {
        const t = (i / count) + progress * 3
        const angle = t * Math.PI * 4
        let x = Math.cos(angle) * radius
        let z = Math.sin(angle) * radius
        // Extended vertical motion through z-planes
        let y = (t % 1 - 0.5) * height +
                Math.sin(angle * 2 + progress * Math.PI * 6) * zDepth * 0.4

        // Apply attractor to center
        ;[x, y, z] = applyAttractor(x, y, z, 0, attractorY, 0, attractorStrength)

        return (
          <TrailingParticle
            key={i}
            position={[x, y, z]}
            color={color}
            size={0.07}
            trailLength={7}
            progress={progress}
            index={i}
          />
        )
      })}
    </group>
  )
}

// Pulsing rings with trails and z-depth
function PulsingRings({ progress, ringCount = 3, particlesPerRing = 8, baseRadius = 2, color = colors.cyan.DEFAULT, zDepth = 2.5 }: {
  progress: number
  ringCount?: number
  particlesPerRing?: number
  baseRadius?: number
  color?: string
  zDepth?: number
}) {
  return (
    <group>
      {Array.from({ length: ringCount }).map((_, ring) => {
        const ringProgress = (progress + ring * 0.2) % 1
        const radius = baseRadius + ring * 0.6 + Math.sin(ringProgress * Math.PI * 2) * 0.3
        const rotation = progress * Math.PI * (4 - ring)
        // Each ring oscillates in different z-planes
        const ringZOffset = Math.sin(progress * Math.PI * 4 + ring * Math.PI * 0.5) * zDepth * 0.3
        const ringColor = ring === 0 ? color : ring === 1 ? '#D4AF37' : '#C0C0C0'

        return (
          <group key={ring} rotation={[ring * 0.3, rotation, 0]} position={[0, ringZOffset, 0]}>
            {Array.from({ length: particlesPerRing }).map((_, i) => {
              const angle = (i / particlesPerRing) * Math.PI * 2
              let x = Math.cos(angle) * radius
              let z = Math.sin(angle) * radius
              // Individual particle z-motion
              let y = Math.sin(angle * 2 + progress * Math.PI * 6 + ring) * zDepth * 0.2

              // Attractor pulls toward ring center with wave
              const attractorStrength = Math.sin(progress * Math.PI * 3 + i * 0.5) * 0.15
              ;[x, y, z] = applyAttractor(x, y, z, 0, ringZOffset, 0, attractorStrength)

              return (
                <TrailingParticle
                  key={i}
                  position={[x, y, z]}
                  color={ringColor}
                  size={0.06 + ring * 0.02}
                  trailLength={5}
                  progress={progress}
                  index={ring * particlesPerRing + i}
                />
              )
            })}
          </group>
        )
      })}
    </group>
  )
}

// Starburst with trails and z-depth - particles shoot out in 3D
function StarburstOrbit({ progress, count = 16, maxRadius = 4, color = colors.cyan.DEFAULT, zDepth = 3 }: {
  progress: number
  count?: number
  maxRadius?: number
  color?: string
  zDepth?: number
}) {
  // Pulsing attractor at center
  const attractorPulse = Math.sin(progress * Math.PI * 8) * 0.3

  return (
    <group>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2
        const verticalAngle = (i % 4) * Math.PI * 0.15 - Math.PI * 0.2
        const burstPhase = (progress * 2 + i / count) % 1
        const radius = burstPhase < 0.5
          ? burstPhase * 2 * maxRadius
          : (1 - burstPhase) * 2 * maxRadius
        let x = Math.cos(angle) * radius * Math.cos(verticalAngle)
        let z = Math.sin(angle) * radius * Math.cos(verticalAngle)
        // 3D starburst - particles shoot up/down as well
        let y = Math.sin(burstPhase * Math.PI) * zDepth * 0.5 +
                Math.sin(verticalAngle) * radius * 0.5

        // Attractor pulls back toward center
        ;[x, y, z] = applyAttractor(x, y, z, 0, 0, 0, attractorPulse)

        const emissiveIntensity = 0.8 * (1 - radius / maxRadius)

        return (
          <TrailingParticle
            key={i}
            position={[x, y, z]}
            color={color}
            size={0.08}
            trailLength={8}
            progress={progress}
            index={i}
          />
        )
      })}
    </group>
  )
}

// === LIGHTING PRESETS ===

function CinematicLighting() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#fff5e6" />
      <directionalLight position={[-10, 5, -5]} intensity={0.8} color="#6eb5ff" />
      <spotLight position={[0, 10, 0]} intensity={1.5} angle={0.3} penumbra={0.5} color="#FFD700" />
      <pointLight position={[5, 0, 5]} intensity={1} color={colors.cyan.DEFAULT} />
      <pointLight position={[-5, 0, -5]} intensity={0.8} color="#FF6B6B" />
    </>
  )
}

function NeonLighting() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[3, 3, 3]} intensity={2} color="#FF8C00" />
      <pointLight position={[-3, 3, -3]} intensity={2} color="#00FFFF" />
      <pointLight position={[0, -3, 3]} intensity={1.5} color="#FFFF00" />
      <spotLight position={[0, 5, 0]} intensity={1} angle={0.5} penumbra={0.3} color="#FFFFFF" />
    </>
  )
}

function GoldenHourLighting() {
  return (
    <>
      <ambientLight intensity={0.4} color="#FFF8E7" />
      <directionalLight position={[5, 3, 2]} intensity={2.5} color="#FFB347" />
      <directionalLight position={[-5, 5, -2]} intensity={0.5} color="#87CEEB" />
      <pointLight position={[0, 0, 5]} intensity={1} color="#FFD700" />
      <pointLight position={[3, -2, 3]} intensity={0.8} color="#FF8C00" />
    </>
  )
}

function CoolBlueLighting() {
  return (
    <>
      <ambientLight intensity={0.3} color="#E6F3FF" />
      <directionalLight position={[5, 8, 5]} intensity={1.5} color="#FFFFFF" />
      <directionalLight position={[-5, 5, -5]} intensity={1} color="#4169E1" />
      <pointLight position={[0, 0, 6]} intensity={2} color={colors.cyan.DEFAULT} />
      <pointLight position={[-3, 3, 3]} intensity={1} color="#00CED1" />
      <pointLight position={[3, -3, 3]} intensity={0.8} color="#1E90FF" />
    </>
  )
}

function DramaticLighting() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <spotLight position={[0, 10, 5]} intensity={3} angle={0.2} penumbra={0.8} color="#FFFFFF" />
      <pointLight position={[5, 0, 0]} intensity={1.5} color="#FF4500" />
      <pointLight position={[-5, 0, 0]} intensity={1.5} color="#4169E1" />
      <pointLight position={[0, -5, 5]} intensity={0.5} color="#FFD700" />
    </>
  )
}

function RainbowLighting({ progress }: { progress: number }) {
  const hue = progress * 360
  const color1 = `hsl(${hue}, 100%, 50%)`
  const color2 = `hsl(${(hue + 120) % 360}, 100%, 50%)`
  const color3 = `hsl(${(hue + 240) % 360}, 100%, 50%)`

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[4, 4, 4]} intensity={1.5} color={color1} />
      <pointLight position={[-4, 4, -4]} intensity={1.5} color={color2} />
      <pointLight position={[0, -4, 4]} intensity={1.5} color={color3} />
      <directionalLight position={[0, 5, 5]} intensity={1} color="#FFFFFF" />
    </>
  )
}

// === SCROLL HOOK ===
function useScrollProgress(containerRef: React.RefObject<HTMLDivElement | null>) {
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
  }, [containerRef])

  return progressRef.current.value
}

// === SWIMMING CAMERA - dives through rings like Saturn ===
function SwimmingCamera({ progress, mode = 'saturn' }: { progress: number; mode?: 'saturn' | 'spiral' | 'dive' }) {
  const { camera } = useThree()

  useFrame(() => {
    if (mode === 'saturn') {
      // Camera swoops through Saturn-like rings
      const angle = progress * Math.PI * 2
      const radius = 6 + Math.sin(progress * Math.PI * 4) * 3
      const height = Math.sin(progress * Math.PI * 2) * 4 - progress * 2 + 2

      camera.position.x = Math.cos(angle) * radius
      camera.position.y = height
      camera.position.z = Math.sin(angle) * radius
      camera.lookAt(0, 0, 0)
    } else if (mode === 'spiral') {
      // Spiral dive through layers
      const spiralAngle = progress * Math.PI * 6
      const spiralRadius = 8 - progress * 5
      const height = 5 - progress * 8

      camera.position.x = Math.cos(spiralAngle) * spiralRadius
      camera.position.y = height
      camera.position.z = Math.sin(spiralAngle) * spiralRadius
      camera.lookAt(0, -progress * 2, 0)
    } else if (mode === 'dive') {
      // Straight dive through the rings
      const wobbleX = Math.sin(progress * Math.PI * 8) * 2
      const wobbleZ = Math.cos(progress * Math.PI * 6) * 2

      camera.position.x = wobbleX
      camera.position.y = 8 - progress * 12
      camera.position.z = 6 + wobbleZ - progress * 4
      camera.lookAt(wobbleX * 0.3, -2, wobbleZ * 0.3)
    }
  })

  return null
}

// === SATURN RINGS - concentric rings for swimming through ===
function SaturnRings({ progress, ringCount = 5, baseRadius = 3, color = colors.cyan.DEFAULT }: {
  progress: number
  ringCount?: number
  baseRadius?: number
  color?: string
}) {
  return (
    <group rotation={[Math.PI * 0.4, 0, 0]}>
      {Array.from({ length: ringCount }).map((_, ring) => {
        const radius = baseRadius + ring * 1.2
        const particlesInRing = 20 + ring * 8
        const ringSpeed = 1 - ring * 0.15
        const ringColor = ring % 2 === 0 ? color : '#D4AF37'
        // Each ring has slight z-offset for depth
        const ringZ = Math.sin(progress * Math.PI * 4 + ring) * 0.5

        return (
          <group key={ring} position={[0, ringZ, 0]}>
            {/* Ring orbit path */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[radius, 0.02, 8, 100]} />
              <meshStandardMaterial color={ringColor} transparent opacity={0.2} />
            </mesh>
            {/* Particles in ring */}
            {Array.from({ length: particlesInRing }).map((_, i) => {
              const angle = (i / particlesInRing) * Math.PI * 2 + progress * Math.PI * 4 * ringSpeed
              const wobble = Math.sin(angle * 3 + progress * Math.PI * 8) * 0.2
              const x = Math.cos(angle) * (radius + wobble)
              const z = Math.sin(angle) * (radius + wobble)
              const y = Math.sin(angle * 2 + progress * Math.PI * 6) * 0.3

              return (
                <TrailingParticle
                  key={i}
                  position={[x, y, z]}
                  color={ringColor}
                  size={0.05 + ring * 0.01}
                  trailLength={4}
                  progress={progress}
                  index={ring * particlesInRing + i}
                />
              )
            })}
          </group>
        )
      })}
    </group>
  )
}

// === SCENE WRAPPER ===
function Scene({ title, subtitle, children, background }: {
  title: string
  subtitle: string
  children: React.ReactNode
  background?: string
}) {
  return (
    <div style={{
      position: 'sticky',
      top: 0,
      height: '100vh',
      background: background || `radial-gradient(ellipse at center, #1a1a2e 0%, ${colors.ink} 100%)`,
    }}>
      {children}
      <div style={{ position: 'absolute', bottom: 60, left: 0, right: 0, textAlign: 'center' }}>
        <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '28px', fontWeight: typography.fontWeight.bold, color: 'white', marginBottom: 8 }}>{title}</h3>
        <p style={{ fontFamily: typography.fontFamily.mono, fontSize: '14px', color: colors.gray[500] }}>{subtitle}</p>
      </div>
    </div>
  )
}

// === VARIANT 1: Cinematic Spiral ===
export function ScrollCinematicSpiral() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(containerRef)

  return (
    <div ref={containerRef} style={{ height: '400vh' }}>
      <Scene title="Cinematic Spiral" subtitle="Spiral orbits with film-like lighting">
        <FrameIndicator progress={progress} totalFrames={180} />
        <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
          <CinematicLighting />
          <SpiralOrbit progress={progress} count={16} baseRadius={3} color={colors.cyan.DEFAULT} />
          <SpiralOrbit progress={progress} count={12} baseRadius={2.5} color="#D4AF37" />
          <group rotation={[0.1, progress * Math.PI * 4, 0]}>
            <CoinMesh />
          </group>
        </Canvas>
      </Scene>
    </div>
  )
}

// === VARIANT 2: Neon Figure-8 ===
export function ScrollNeonFigure8() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(containerRef)

  return (
    <div ref={containerRef} style={{ height: '400vh' }}>
      <Scene title="Neon Figure-8" subtitle="Infinity pattern with neon lights" background={`radial-gradient(ellipse at center, #1a0a2e 0%, #0a0a1a 100%)`}>
        <FrameIndicator progress={progress} totalFrames={180} />
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <NeonLighting />
          <Figure8Orbit progress={progress} count={12} scale={3} color="#FF8C00" />
          <Figure8Orbit progress={progress} count={8} scale={2.5} color="#00FFFF" />
          <group rotation={[0.05, progress * Math.PI * 3, 0]}>
            <CoinMesh />
          </group>
        </Canvas>
      </Scene>
    </div>
  )
}

// === VARIANT 3: Golden Hour Helix ===
export function ScrollGoldenHelix() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(containerRef)

  return (
    <div ref={containerRef} style={{ height: '400vh' }}>
      <Scene title="Golden Hour Helix" subtitle="DNA helix with warm sunset lighting" background={`linear-gradient(180deg, #2a1a0a 0%, #1a1a2e 100%)`}>
        <FrameIndicator progress={progress} totalFrames={180} />
        <Canvas camera={{ position: [0, 0, 9], fov: 45 }}>
          <GoldenHourLighting />
          <HelixOrbit progress={progress} count={20} radius={3} height={3} color="#FFD700" />
          <HelixOrbit progress={progress * 0.8} count={16} radius={2.5} height={2.5} color="#FF8C00" />
          <group rotation={[0.15, progress * Math.PI * 2, 0]}>
            <CoinMesh />
          </group>
        </Canvas>
      </Scene>
    </div>
  )
}

// === VARIANT 4: Cool Blue Rings ===
export function ScrollCoolBlueRings() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(containerRef)

  return (
    <div ref={containerRef} style={{ height: '400vh' }}>
      <Scene title="Cool Blue Rings" subtitle="Pulsing concentric rings with icy lighting" background={`radial-gradient(ellipse at center, #0a1a2e 0%, #050a15 100%)`}>
        <FrameIndicator progress={progress} totalFrames={180} />
        <Canvas camera={{ position: [0, 3, 7], fov: 50 }}>
          <CoolBlueLighting />
          <PulsingRings progress={progress} ringCount={4} particlesPerRing={10} baseRadius={2.2} color={colors.cyan.DEFAULT} />
          <group rotation={[0.2, progress * Math.PI * 3, 0]}>
            <CoinMesh />
          </group>
        </Canvas>
      </Scene>
    </div>
  )
}

// === VARIANT 5: Dramatic Starburst ===
export function ScrollDramaticStarburst() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(containerRef)

  return (
    <div ref={containerRef} style={{ height: '400vh' }}>
      <Scene title="Dramatic Starburst" subtitle="Explosive particles with theatrical lighting" background={`radial-gradient(ellipse at center, #1a0a0a 0%, #0a0a0a 100%)`}>
        <FrameIndicator progress={progress} totalFrames={180} />
        <Canvas camera={{ position: [0, 0, 9], fov: 50 }}>
          <DramaticLighting />
          <StarburstOrbit progress={progress} count={24} maxRadius={5} color="#FF4500" />
          <StarburstOrbit progress={progress * 1.3} count={16} maxRadius={4} color="#FFD700" />
          <group rotation={[0.1, progress * Math.PI * 5, 0]}>
            <CoinMesh />
          </group>
        </Canvas>
      </Scene>
    </div>
  )
}

// === VARIANT 6: Rainbow Cascade ===
export function ScrollRainbowCascade() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(containerRef)

  return (
    <div ref={containerRef} style={{ height: '400vh' }}>
      <Scene title="Rainbow Cascade" subtitle="Color-shifting lights and orbits" background={`radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a15 100%)`}>
        <FrameIndicator progress={progress} totalFrames={180} />
        <Canvas camera={{ position: [0, 1, 8], fov: 50 }}>
          <RainbowLighting progress={progress} />
          <SpiralOrbit progress={progress} count={10} baseRadius={3.2} color={`hsl(${progress * 360}, 100%, 50%)`} />
          <SpiralOrbit progress={progress * 1.2} count={8} baseRadius={2.6} color={`hsl(${(progress * 360 + 180) % 360}, 100%, 50%)`} />
          <group rotation={[0.1, progress * Math.PI * 4, 0]}>
            <CoinMesh />
          </group>
        </Canvas>
      </Scene>
    </div>
  )
}

// === VARIANT 7: Dual Helix ===
export function ScrollDualHelix() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(containerRef)

  return (
    <div ref={containerRef} style={{ height: '500vh' }}>
      <Scene title="Dual Helix" subtitle="Double DNA strand pattern">
        <FrameIndicator progress={progress} totalFrames={240} />
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <CinematicLighting />
          <HelixOrbit progress={progress} count={24} radius={3} height={4} color={colors.cyan.DEFAULT} />
          <HelixOrbit progress={progress + 0.5} count={24} radius={3} height={4} color="#D4AF37" />
          <group rotation={[0, progress * Math.PI * 2, 0]}>
            <CoinMesh />
          </group>
        </Canvas>
      </Scene>
    </div>
  )
}

// === VARIANT 8: Galaxy Swirl ===
export function ScrollGalaxySwirl() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(containerRef)

  // Galaxy arm particles with trails and z-depth
  const GalaxyArm = ({ armOffset, color, armIndex }: { armOffset: number; color: string; armIndex: number }) => (
    <group rotation={[0.3, 0, 0]}>
      {Array.from({ length: 30 }).map((_, i) => {
        const t = i / 30
        const angle = t * Math.PI * 3 + armOffset + progress * Math.PI * 4
        const radius = 1 + t * 3
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        // Add z-depth motion
        const y = Math.sin(angle * 2 + progress * Math.PI * 6) * 0.8 * t

        return (
          <TrailingParticle
            key={i}
            position={[x, y, z]}
            color={color}
            size={0.04 + t * 0.04}
            trailLength={5}
            progress={progress}
            index={armIndex * 30 + i}
          />
        )
      })}
    </group>
  )

  return (
    <div ref={containerRef} style={{ height: '500vh' }}>
      <Scene title="Galaxy Swirl" subtitle="Spiral galaxy arms" background={`radial-gradient(ellipse at center, #0a0a1e 0%, #000005 100%)`}>
        <FrameIndicator progress={progress} totalFrames={240} />
        <Canvas camera={{ position: [0, 5, 8], fov: 50 }}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[0, 0, 6]} intensity={3} color="#FFD700" />
          <directionalLight position={[5, 5, 5]} intensity={1.5} color={colors.cyan.DEFAULT} />
          <directionalLight position={[0, 8, 5]} intensity={1.5} color="#FFFFFF" />
          <GalaxyArm armOffset={0} color={colors.cyan.DEFAULT} armIndex={0} />
          <GalaxyArm armOffset={Math.PI * 0.66} color="#D4AF37" armIndex={1} />
          <GalaxyArm armOffset={Math.PI * 1.33} color="#C0C0C0" armIndex={2} />
          <group rotation={[0, progress * Math.PI * 2, 0]} position={[0, 0, 0]}>
            <CoinMesh />
          </group>
        </Canvas>
      </Scene>
    </div>
  )
}

// === VARIANT 8b: Galaxy Chaos Dive ===
// Camera sweeps through the galaxy arms
function GalaxyChaosCamera({ progress }: { progress: number }) {
  const { camera } = useThree()

  useFrame(() => {
    // Dramatic sweep through the galaxy
    const phase = progress * Math.PI * 2

    // Spiral inward then outward
    const spiralRadius = 4 + Math.sin(progress * Math.PI) * 3
    const height = Math.cos(progress * Math.PI * 3) * 4 + 2
    const angle = progress * Math.PI * 4

    // Camera position spirals through the galaxy arms
    camera.position.x = Math.cos(angle) * spiralRadius
    camera.position.y = height
    camera.position.z = Math.sin(angle) * spiralRadius + 5

    // Look slightly ahead of center for dynamic feel
    const lookAheadAngle = angle + 0.3
    const lookAtX = Math.cos(lookAheadAngle) * 1
    const lookAtZ = Math.sin(lookAheadAngle) * 1
    camera.lookAt(lookAtX, 0, lookAtZ)
  })

  return null
}

export function ScrollGalaxyChaosDive() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(containerRef)

  // Denser galaxy arms with more particles - highly emissive
  const DenseGalaxyArm = ({ armOffset, color, armIndex }: { armOffset: number; color: string; armIndex: number }) => (
    <group rotation={[0.4, 0, 0]}>
      {Array.from({ length: 50 }).map((_, i) => {
        const t = i / 50
        const angle = t * Math.PI * 4 + armOffset + progress * Math.PI * 6
        const radius = 0.5 + t * 5
        const spread = Math.sin(t * Math.PI) * 0.8
        const x = Math.cos(angle) * radius + (Math.random() - 0.5) * spread
        const z = Math.sin(angle) * radius + (Math.random() - 0.5) * spread
        const y = Math.sin(angle * 3 + progress * Math.PI * 8) * t * 1.5

        return (
          <TrailingParticle
            key={i}
            position={[x, y, z]}
            color={color}
            size={0.03 + t * 0.05}
            trailLength={6}
            progress={progress}
            index={armIndex * 50 + i}
            emissiveBoost={1.5}
          />
        )
      })}
    </group>
  )

  // Nebula dust clouds - highly emissive
  const NebulaDust = ({ color, count = 20 }: { color: string; count?: number }) => (
    <group>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2 + progress * Math.PI * 2
        const radius = 2 + Math.sin(i * 0.5 + progress * Math.PI * 4) * 2
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const y = Math.sin(angle * 2 + i * 0.3) * 1.5
        const dustSize = 0.15 + Math.sin(progress * Math.PI * 4 + i) * 0.05

        return (
          <group key={i}>
            {/* Core */}
            <mesh position={[x, y, z]}>
              <sphereGeometry args={[dustSize, 8, 8]} />
              <meshStandardMaterial
                color={color}
                transparent
                opacity={0.5 + Math.sin(progress * Math.PI * 2 + i) * 0.2}
                emissive={color}
                emissiveIntensity={2}
                toneMapped={false}
              />
            </mesh>
            {/* Glow */}
            <mesh position={[x, y, z]}>
              <sphereGeometry args={[dustSize * 2.5, 8, 8]} />
              <meshBasicMaterial
                color={color}
                transparent
                opacity={0.15}
                depthWrite={false}
              />
            </mesh>
          </group>
        )
      })}
    </group>
  )

  return (
    <div ref={containerRef} style={{ height: '700vh' }}>
      <Scene
        title="Galaxy Chaos Dive"
        subtitle="Sweep through the cosmic spiral"
        background={`radial-gradient(ellipse at center, #0a0515 0%, #000003 100%)`}
      >
        <FrameIndicator progress={progress} totalFrames={360} />

        {/* Subtle star field overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.02) 0%, transparent 30%),
                       radial-gradient(ellipse at 70% 80%, rgba(100,150,255,0.03) 0%, transparent 40%)`,
          pointerEvents: 'none',
          zIndex: 5,
        }} />

        <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
          <GalaxyChaosCamera progress={progress} />

          {/* Core glow - directional lights to avoid visible spheres */}
          <ambientLight intensity={0.2} />
          <directionalLight position={[0, 0, 8]} intensity={5} color="#FFD700" />
          <directionalLight position={[0, 3, 6]} intensity={3} color="#FF6B00" />

          {/* Rim lights */}
          <directionalLight position={[6, 3, 6]} intensity={2} color={colors.cyan.DEFAULT} />
          <directionalLight position={[-6, 3, -6]} intensity={2} color="#D4AF37" />
          <directionalLight position={[0, 6, 0]} intensity={1.5} color="#FF6B6B" />
          <directionalLight position={[0, 10, 5]} intensity={1.5} color="#FFFFFF" />

          {/* 5 Galaxy arms for dense effect */}
          <DenseGalaxyArm armOffset={0} color={colors.cyan.DEFAULT} armIndex={0} />
          <DenseGalaxyArm armOffset={Math.PI * 0.4} color="#D4AF37" armIndex={1} />
          <DenseGalaxyArm armOffset={Math.PI * 0.8} color="#FF6B6B" armIndex={2} />
          <DenseGalaxyArm armOffset={Math.PI * 1.2} color="#C0C0C0" armIndex={3} />
          <DenseGalaxyArm armOffset={Math.PI * 1.6} color="#0ECCED" armIndex={4} />

          {/* Nebula dust between arms */}
          <NebulaDust color="#4169E1" count={25} />
          <NebulaDust color="#0ECCED" count={20} />

          {/* Central aura ONLY - no solid sphere, just large soft glows */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[4, 16, 16]} />
            <meshBasicMaterial color="#FFD700" transparent opacity={0.08} depthWrite={false} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[6, 16, 16]} />
            <meshBasicMaterial color="#FF8C00" transparent opacity={0.04} depthWrite={false} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[9, 12, 12]} />
            <meshBasicMaterial color={colors.cyan.DEFAULT} transparent opacity={0.02} depthWrite={false} />
          </mesh>

          <group rotation={[0.2, progress * Math.PI * 3, 0]}>
            <CoinMesh />
          </group>
        </Canvas>
      </Scene>
    </div>
  )
}

// === VARIANT 9: Atomic Orbital ===
export function ScrollAtomicOrbital() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(containerRef)

  // Electron-like orbits with trails
  const ElectronOrbit = ({ tilt, color, speed = 1, orbitIndex }: { tilt: number; color: string; speed?: number; orbitIndex: number }) => (
    <group rotation={[tilt, 0, tilt * 0.5]}>
      {Array.from({ length: 3 }).map((_, i) => {
        const angle = (i / 3) * Math.PI * 2 + progress * Math.PI * 4 * speed
        const x = Math.cos(angle) * 3
        const z = Math.sin(angle) * 3
        // Z-depth wobble
        const y = Math.sin(angle * 3 + progress * Math.PI * 8) * 0.4

        return (
          <TrailingParticle
            key={i}
            position={[x, y, z]}
            color={color}
            size={0.15}
            trailLength={8}
            progress={progress}
            index={orbitIndex * 3 + i}
          />
        )
      })}
      {/* Orbit ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3, 0.02, 16, 100]} />
        <meshStandardMaterial color={color} transparent opacity={0.3} />
      </mesh>
    </group>
  )

  return (
    <div ref={containerRef} style={{ height: '400vh' }}>
      <Scene title="Atomic Orbital" subtitle="Electron cloud visualization">
        <FrameIndicator progress={progress} totalFrames={180} />
        <Canvas camera={{ position: [0, 3, 8], fov: 50 }}>
          <CoolBlueLighting />
          <ElectronOrbit tilt={0} color={colors.cyan.DEFAULT} speed={1} orbitIndex={0} />
          <ElectronOrbit tilt={Math.PI / 3} color="#D4AF37" speed={1.3} orbitIndex={1} />
          <ElectronOrbit tilt={-Math.PI / 3} color="#FF6B6B" speed={0.8} orbitIndex={2} />
          <group rotation={[0.1, progress * Math.PI * 2, 0]}>
            <CoinMesh />
          </group>
        </Canvas>
      </Scene>
    </div>
  )
}

// === VARIANT 10: Particle Storm ===
export function ScrollParticleStorm() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(containerRef)

  // Chaotic particle field with trails
  const particles = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      baseX: (Math.random() - 0.5) * 8,
      baseY: (Math.random() - 0.5) * 6,
      baseZ: (Math.random() - 0.5) * 8,
      speed: 0.5 + Math.random() * 1.5,
      phase: Math.random() * Math.PI * 2,
      size: 0.05 + Math.random() * 0.08,
      color: ['#0ECCED', '#D4AF37', '#C0C0C0', '#FF6B6B'][Math.floor(Math.random() * 4)],
    }))
  }, [])

  return (
    <div ref={containerRef} style={{ height: '500vh' }}>
      <Scene title="Particle Storm" subtitle="Chaotic energy field" background={`radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a15 100%)`}>
        <FrameIndicator progress={progress} totalFrames={240} />
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          {/* Brighter lighting for coin visibility */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 8, 5]} intensity={2.5} color="#FFFFFF" />
          <directionalLight position={[-5, 5, -5]} intensity={1.2} color="#6eb5ff" />
          <spotLight position={[0, 10, 5]} intensity={2} angle={0.4} penumbra={0.5} color="#FFD700" />
          <pointLight position={[6, 0, 0]} intensity={1.5} color="#FF4500" />
          <pointLight position={[-6, 0, 0]} intensity={1.5} color={colors.cyan.DEFAULT} />
          <pointLight position={[0, 0, 6]} intensity={1.5} color="#D4AF37" />
          <group>
            {particles.map((p) => {
              const t = progress * p.speed + p.phase
              const x = p.baseX + Math.sin(t * 3) * 1.5
              const y = p.baseY + Math.cos(t * 2) * 1
              const z = p.baseZ + Math.sin(t * 2.5) * 1.5

              return (
                <TrailingParticle
                  key={p.id}
                  position={[x, y, z]}
                  color={p.color}
                  size={p.size}
                  trailLength={4}
                  progress={progress}
                  index={p.id}
                />
              )
            })}
          </group>
          <group rotation={[0.1, progress * Math.PI * 6, progress * 0.5]}>
            <CoinMesh />
          </group>
        </Canvas>
      </Scene>
    </div>
  )
}

// === VARIANT 11: Saturn Swim ===
export function ScrollSaturnSwim() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(containerRef)

  return (
    <div ref={containerRef} style={{ height: '600vh' }}>
      <Scene
        title="Saturn Swim"
        subtitle="Dive through the rings"
        background={`radial-gradient(ellipse at center, #0a0a1e 0%, #000008 100%)`}
      >
        <FrameIndicator progress={progress} totalFrames={300} />
        <Canvas camera={{ position: [0, 5, 8], fov: 60 }}>
          <SwimmingCamera progress={progress} mode="saturn" />
          <ambientLight intensity={0.3} />
          <directionalLight position={[0, 0, 6]} intensity={3} color="#FFD700" />
          <directionalLight position={[5, 3, 5]} intensity={1.5} color={colors.cyan.DEFAULT} />
          <directionalLight position={[-5, -3, -5]} intensity={1} color="#D4AF37" />
          <directionalLight position={[0, 10, 5]} intensity={1} color="#FFFFFF" />
          <SaturnRings progress={progress} ringCount={6} baseRadius={2} color={colors.cyan.DEFAULT} />
          <group rotation={[0.2, progress * Math.PI * 2, 0]}>
            <CoinMesh />
          </group>
        </Canvas>
      </Scene>
    </div>
  )
}

// === VARIANT 12: Spiral Dive ===
export function ScrollSpiralDive() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(containerRef)

  return (
    <div ref={containerRef} style={{ height: '600vh' }}>
      <Scene
        title="Spiral Dive"
        subtitle="Spiral descent through particle clouds"
        background={`radial-gradient(ellipse at center, #1a0a2e 0%, #050008 100%)`}
      >
        <FrameIndicator progress={progress} totalFrames={300} />
        <Canvas camera={{ position: [0, 5, 8], fov: 55 }}>
          <SwimmingCamera progress={progress} mode="spiral" />
          <NeonLighting />
          <SpiralOrbit progress={progress} count={20} baseRadius={4} color="#FF8C00" zDepth={3} />
          <SpiralOrbit progress={progress * 0.8} count={16} baseRadius={3} color="#00FFFF" zDepth={2.5} />
          <SpiralOrbit progress={progress * 1.2} count={12} baseRadius={2} color="#FFFF00" zDepth={2} />
          <group rotation={[0.1, progress * Math.PI * 3, 0]}>
            <CoinMesh />
          </group>
        </Canvas>
      </Scene>
    </div>
  )
}

// === VARIANT 13: Ring Dive ===
export function ScrollRingDive() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(containerRef)

  return (
    <div ref={containerRef} style={{ height: '600vh' }}>
      <Scene
        title="Ring Dive"
        subtitle="Plunge through concentric rings"
        background={`radial-gradient(ellipse at center, #0a1a2e 0%, #000510 100%)`}
      >
        <FrameIndicator progress={progress} totalFrames={300} />
        <Canvas camera={{ position: [0, 8, 6], fov: 50 }}>
          <SwimmingCamera progress={progress} mode="dive" />
          <CoolBlueLighting />
          <PulsingRings progress={progress} ringCount={5} particlesPerRing={12} baseRadius={2.5} color={colors.cyan.DEFAULT} zDepth={3} />
          <group rotation={[0.15, progress * Math.PI * 4, 0]}>
            <CoinMesh />
          </group>
        </Canvas>
      </Scene>
    </div>
  )
}
