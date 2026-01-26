import { useRef, useEffect, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { colors, typography } from '../../design-system/tokens'
import { CoinMesh, FrameIndicator } from './ScrollDrivenCoin'

gsap.registerPlugin(ScrollTrigger)

// === ATMOSPHERIC FOG COMPONENT ===
function AtmosphericFog({ color = '#1a1a2e', near = 5, far = 25, density = 0.02 }: {
  color?: string
  near?: number
  far?: number
  density?: number
}) {
  const { scene } = useThree()

  useEffect(() => {
    scene.fog = new THREE.FogExp2(color, density)
    return () => {
      scene.fog = null
    }
  }, [scene, color, density])

  return null
}

// === SUNBURST / GOD RAYS COMPONENT ===
function Sunburst({ progress, intensity = 1, color = '#FFD700', rayCount = 12 }: {
  progress: number
  intensity?: number
  color?: string
  rayCount?: number
}) {
  const groupRef = useRef<THREE.Group>(null)

  // Sunburst appears at "moment of clarity" - peak explosion
  const clarityMoment = Math.sin(progress * Math.PI) // Peaks at 0.5
  const burstIntensity = clarityMoment * intensity

  return (
    <group ref={groupRef} rotation={[0, 0, progress * Math.PI * 0.5]}>
      {/* Central glow */}
      <mesh>
        <sphereGeometry args={[0.5 + burstIntensity * 0.5, 32, 32]} />
        <meshBasicMaterial color={color} transparent opacity={burstIntensity * 0.8} />
      </mesh>

      {/* God rays */}
      {Array.from({ length: rayCount }).map((_, i) => {
        const angle = (i / rayCount) * Math.PI * 2
        const rayLength = 15 * burstIntensity
        const rayWidth = 0.15 + burstIntensity * 0.1

        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * rayLength * 0.5,
              Math.sin(angle) * rayLength * 0.5,
              0
            ]}
            rotation={[0, 0, angle]}
          >
            <planeGeometry args={[rayLength, rayWidth]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={burstIntensity * 0.4 * (1 - i / rayCount * 0.3)}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        )
      })}

      {/* Secondary rays (offset) */}
      {Array.from({ length: rayCount }).map((_, i) => {
        const angle = (i / rayCount) * Math.PI * 2 + Math.PI / rayCount
        const rayLength = 10 * burstIntensity
        const rayWidth = 0.1 + burstIntensity * 0.05

        return (
          <mesh
            key={`secondary-${i}`}
            position={[
              Math.cos(angle) * rayLength * 0.5,
              Math.sin(angle) * rayLength * 0.5,
              -0.1
            ]}
            rotation={[0, 0, angle]}
          >
            <planeGeometry args={[rayLength, rayWidth]} />
            <meshBasicMaterial
              color="#FFFFFF"
              transparent
              opacity={burstIntensity * 0.2}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        )
      })}
    </group>
  )
}

// === VOLUMETRIC SMOKE PARTICLES ===
function SmokeParticles({ progress, count = 30, color = '#888888' }: {
  progress: number
  count?: number
  color?: string
}) {
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      x: (Math.random() - 0.5) * 20,
      y: (Math.random() - 0.5) * 15,
      z: (Math.random() - 0.5) * 10 - 5,
      size: 0.5 + Math.random() * 2,
      speed: 0.2 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
    }))
  }, [count])

  return (
    <group>
      {particles.map((p, i) => {
        const drift = Math.sin(progress * Math.PI * 2 * p.speed + p.phase) * 2
        const opacity = 0.1 + Math.sin(progress * Math.PI + p.phase) * 0.05

        return (
          <mesh key={i} position={[p.x + drift, p.y + drift * 0.5, p.z]}>
            <sphereGeometry args={[p.size, 8, 8]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={opacity}
              depthWrite={false}
            />
          </mesh>
        )
      })}
    </group>
  )
}

// === CAMERA FILTER OVERLAY ===
function CameraFilter({ progress, tint = '#1a1a2e', vignetteStrength = 0.3 }: {
  progress: number
  tint?: string
  vignetteStrength?: number
}) {
  // This creates a subtle color grade/tint effect
  // The "moment of clarity" gets brighter
  const clarityMoment = Math.sin(progress * Math.PI)
  const filterOpacity = 0.15 - clarityMoment * 0.1 // Less filter at peak

  return (
    <>
      {/* Tint layer */}
      <mesh position={[0, 0, 5]}>
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial
          color={tint}
          transparent
          opacity={filterOpacity}
          depthTest={false}
        />
      </mesh>
    </>
  )
}

// === EASING FUNCTIONS ===
const easing = {
  // Explosive out
  easeOutExpo: (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
  // Bounce back
  easeOutBack: (t: number) => {
    const c1 = 1.70158
    const c3 = c1 + 1
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
  },
  // Elastic snap
  easeOutElastic: (t: number) => {
    if (t === 0 || t === 1) return t
    return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1
  },
  // Smooth acceleration
  easeInOutQuart: (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2,
  // Sharp explosion
  easeOutQuint: (t: number) => 1 - Math.pow(1 - t, 5),
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

// === TRAILING PARTICLE ===
function TrailingParticle({
  position,
  color,
  size = 0.08,
  trailLength = 5,
  emissiveIntensity = 0.6
}: {
  position: [number, number, number]
  color: string
  size?: number
  trailLength?: number
  emissiveIntensity?: number
}) {
  return (
    <group>
      <mesh position={position}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      {/* Simple trail */}
      {Array.from({ length: trailLength }).map((_, t) => {
        const fade = 1 - (t / trailLength)
        const trailSize = size * fade * 0.6
        const offset = (t + 1) * 0.15
        return (
          <mesh key={t} position={[position[0] * (1 - offset * 0.1), position[1] * (1 - offset * 0.1), position[2] * (1 - offset * 0.1)]}>
            <sphereGeometry args={[trailSize, 8, 8]} />
            <meshStandardMaterial
              color={color}
              transparent
              opacity={fade * 0.5}
              emissive={color}
              emissiveIntensity={fade * 0.4}
            />
          </mesh>
        )
      })}
    </group>
  )
}

// === EXPLODING PLANE ===
function ExplodingPlane({
  progress,
  planeIndex,
  totalPlanes,
  color,
  particleCount = 12,
  explosionPhase = 0.5,
  maxRadius = 6,
}: {
  progress: number
  planeIndex: number
  totalPlanes: number
  color: string
  particleCount?: number
  explosionPhase?: number
  maxRadius?: number
}) {
  // Plane converges then explodes
  const convergePhase = Math.min(progress / explosionPhase, 1)
  const explodePhase = Math.max((progress - explosionPhase) / (1 - explosionPhase), 0)

  // Eased phases
  const convergeEased = easing.easeInOutQuart(convergePhase)
  const explodeEased = easing.easeOutExpo(explodePhase)

  // Plane rotation based on index
  const planeRotationX = (planeIndex / totalPlanes) * Math.PI
  const planeRotationY = (planeIndex / totalPlanes) * Math.PI * 2

  return (
    <group rotation={[planeRotationX, planeRotationY + progress * Math.PI, 0]}>
      {Array.from({ length: particleCount }).map((_, i) => {
        const angle = (i / particleCount) * Math.PI * 2

        // Start far, converge to center, then explode outward
        const startRadius = maxRadius
        const convergedRadius = 0.5
        const explodedRadius = maxRadius * 1.5

        // Current radius based on phase
        let radius: number
        if (progress < explosionPhase) {
          // Converging
          radius = startRadius - (startRadius - convergedRadius) * convergeEased
        } else {
          // Exploding
          radius = convergedRadius + (explodedRadius - convergedRadius) * explodeEased
        }

        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        // Add some y variation during explosion
        const y = explodePhase > 0
          ? Math.sin(angle * 2 + planeIndex) * explodeEased * 2
          : Math.sin(angle * 3 + progress * Math.PI * 4) * 0.2

        const size = 0.08 + (explodePhase > 0 ? explodeEased * 0.04 : convergeEased * 0.02)

        return (
          <TrailingParticle
            key={i}
            position={[x, y, z]}
            color={color}
            size={size}
            trailLength={explodePhase > 0 ? 6 : 3}
            emissiveIntensity={0.5 + explodeEased * 0.5}
          />
        )
      })}
    </group>
  )
}

// === BRIGHT LIGHTING PRESETS ===
function BrightCinematicLighting() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={2.5} color="#fff5e6" />
      <directionalLight position={[-10, 5, -5]} intensity={1.2} color="#6eb5ff" />
      <spotLight position={[0, 12, 5]} intensity={2} angle={0.4} penumbra={0.5} color="#FFD700" />
      <pointLight position={[6, 0, 6]} intensity={1.5} color={colors.cyan.DEFAULT} />
      <pointLight position={[-6, 0, -6]} intensity={1.2} color="#FF6B6B" />
      <pointLight position={[0, -5, 5]} intensity={1} color="#D4AF37" />
    </>
  )
}

function ExplosiveLighting({ progress }: { progress: number }) {
  const intensity = 1 + progress * 2
  return (
    <>
      <ambientLight intensity={0.4 + progress * 0.3} />
      <directionalLight position={[8, 10, 5]} intensity={2} color="#FFFFFF" />
      {/* Replaced center point light with directional to avoid visible sphere */}
      <directionalLight position={[0, 0, 6]} intensity={intensity * 2} color="#FFD700" />
      <directionalLight position={[5, 5, 5]} intensity={intensity} color={colors.cyan.DEFAULT} />
      <directionalLight position={[-5, 5, -5]} intensity={intensity} color="#FF4500" />
      <directionalLight position={[5, -5, -5]} intensity={intensity * 0.8} color="#D4AF37" />
      <directionalLight position={[-5, -5, 5]} intensity={intensity * 0.8} color="#00FFFF" />
    </>
  )
}

function NeonExplosionLighting() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={2} color="#FFFFFF" />
      <pointLight position={[4, 4, 4]} intensity={2.5} color="#FF8C00" />
      <pointLight position={[-4, 4, -4]} intensity={2.5} color="#00FFFF" />
      <pointLight position={[0, -4, 4]} intensity={2} color="#FFFF00" />
      <pointLight position={[4, -4, -4]} intensity={1.5} color="#FF6B6B" />
    </>
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

// === VARIANT 1: Converge & Explode ===
export function ExplosionConverge() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(containerRef)

  return (
    <div ref={containerRef} style={{ height: '500vh' }}>
      <Scene
        title="Converge & Explode"
        subtitle="Planes converge then burst outward"
        background={`radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a15 100%)`}
      >
        <FrameIndicator progress={progress} totalFrames={240} />
        <Canvas camera={{ position: [0, 3, 10], fov: 50 }}>
          <ExplosiveLighting progress={progress} />
          <ExplodingPlane progress={progress} planeIndex={0} totalPlanes={4} color={colors.cyan.DEFAULT} particleCount={16} />
          <ExplodingPlane progress={progress} planeIndex={1} totalPlanes={4} color="#D4AF37" particleCount={16} />
          <ExplodingPlane progress={progress} planeIndex={2} totalPlanes={4} color="#FF6B6B" particleCount={16} />
          <ExplodingPlane progress={progress} planeIndex={3} totalPlanes={4} color="#C0C0C0" particleCount={16} />
          <group rotation={[0.1, progress * Math.PI * 4, 0]} scale={progress < 0.5 ? 1 - progress * 0.3 : 0.85 + (progress - 0.5) * 0.3}>
            <CoinMesh />
          </group>
        </Canvas>
      </Scene>
    </div>
  )
}

// === VARIANT 2: Multi-Wave Explosion ===
export function ExplosionMultiWave() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(containerRef)

  // Staggered explosions
  const wave1Progress = Math.min(progress * 2, 1)
  const wave2Progress = Math.max(Math.min((progress - 0.25) * 2, 1), 0)
  const wave3Progress = Math.max(Math.min((progress - 0.5) * 2, 1), 0)

  return (
    <div ref={containerRef} style={{ height: '600vh' }}>
      <Scene
        title="Multi-Wave Explosion"
        subtitle="Staggered waves of convergence and explosion"
        background={`radial-gradient(ellipse at center, #0a1a2e 0%, #050a15 100%)`}
      >
        <FrameIndicator progress={progress} totalFrames={300} />
        <Canvas camera={{ position: [0, 2, 12], fov: 50 }}>
          <BrightCinematicLighting />
          {/* Wave 1 - Inner */}
          <ExplodingPlane progress={wave1Progress} planeIndex={0} totalPlanes={3} color={colors.cyan.DEFAULT} particleCount={12} maxRadius={4} explosionPhase={0.4} />
          <ExplodingPlane progress={wave1Progress} planeIndex={1} totalPlanes={3} color={colors.cyan.DEFAULT} particleCount={12} maxRadius={4} explosionPhase={0.4} />
          <ExplodingPlane progress={wave1Progress} planeIndex={2} totalPlanes={3} color={colors.cyan.DEFAULT} particleCount={12} maxRadius={4} explosionPhase={0.4} />
          {/* Wave 2 - Middle */}
          <ExplodingPlane progress={wave2Progress} planeIndex={0} totalPlanes={3} color="#D4AF37" particleCount={14} maxRadius={5} explosionPhase={0.45} />
          <ExplodingPlane progress={wave2Progress} planeIndex={1} totalPlanes={3} color="#D4AF37" particleCount={14} maxRadius={5} explosionPhase={0.45} />
          <ExplodingPlane progress={wave2Progress} planeIndex={2} totalPlanes={3} color="#D4AF37" particleCount={14} maxRadius={5} explosionPhase={0.45} />
          {/* Wave 3 - Outer */}
          <ExplodingPlane progress={wave3Progress} planeIndex={0} totalPlanes={3} color="#FF6B6B" particleCount={16} maxRadius={6} explosionPhase={0.5} />
          <ExplodingPlane progress={wave3Progress} planeIndex={1} totalPlanes={3} color="#FF6B6B" particleCount={16} maxRadius={6} explosionPhase={0.5} />
          <ExplodingPlane progress={wave3Progress} planeIndex={2} totalPlanes={3} color="#FF6B6B" particleCount={16} maxRadius={6} explosionPhase={0.5} />
          <group rotation={[0.1, progress * Math.PI * 3, 0]}>
            <CoinMesh />
          </group>
        </Canvas>
      </Scene>
    </div>
  )
}

// === VARIANT 3: Elastic Snap ===
export function ExplosionElasticSnap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(containerRef)

  // Elastic easing for bouncy effect
  const elasticProgress = easing.easeOutElastic(progress)

  return (
    <div ref={containerRef} style={{ height: '500vh' }}>
      <Scene
        title="Elastic Snap"
        subtitle="Bouncy elastic explosion with snap-back"
        background={`radial-gradient(ellipse at center, #1a0a2e 0%, #0a0a1a 100%)`}
      >
        <FrameIndicator progress={progress} totalFrames={240} />
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <NeonExplosionLighting />
          {Array.from({ length: 6 }).map((_, i) => {
            const planeColors = ['#FF8C00', '#00FFFF', '#FFFF00', '#FF6B6B', colors.cyan.DEFAULT, '#D4AF37']
            return (
              <group key={i} rotation={[(i / 6) * Math.PI, (i / 6) * Math.PI * 2, 0]}>
                {Array.from({ length: 10 }).map((_, j) => {
                  const angle = (j / 10) * Math.PI * 2
                  const baseRadius = 0.5
                  const expandedRadius = 5
                  const radius = baseRadius + (expandedRadius - baseRadius) * elasticProgress
                  const x = Math.cos(angle) * radius
                  const z = Math.sin(angle) * radius
                  const y = Math.sin(angle * 2 + i) * elasticProgress * 1.5

                  return (
                    <TrailingParticle
                      key={j}
                      position={[x, y, z]}
                      color={planeColors[i]}
                      size={0.1}
                      trailLength={6}
                      emissiveIntensity={0.7}
                    />
                  )
                })}
              </group>
            )
          })}
          <group rotation={[0.1, progress * Math.PI * 6, 0]} scale={0.8 + elasticProgress * 0.4}>
            <CoinMesh />
          </group>
        </Canvas>
      </Scene>
    </div>
  )
}

// === VARIANT 4: Implosion Explosion ===
export function ExplosionImplosion() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(containerRef)

  // First half: implode, second half: explode
  const isImploding = progress < 0.5
  const implodeProgress = isImploding ? easing.easeInOutQuart(progress * 2) : 1
  const explodeProgress = !isImploding ? easing.easeOutExpo((progress - 0.5) * 2) : 0

  return (
    <div ref={containerRef} style={{ height: '500vh' }}>
      <Scene
        title="Implosion → Explosion"
        subtitle="Particles collapse then violently explode"
        background={`radial-gradient(ellipse at center, #1a1a1a 0%, #0a0a0a 100%)`}
      >
        <FrameIndicator progress={progress} totalFrames={240} />
        <Canvas camera={{ position: [0, 2, 10], fov: 50 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 10, 5]} intensity={2.5} color="#FFFFFF" />
          <directionalLight position={[0, 0, 6]} intensity={3 + explodeProgress * 4} color="#FFD700" />
          <directionalLight position={[5, 5, 5]} intensity={2} color={colors.cyan.DEFAULT} />
          <directionalLight position={[-5, 5, -5]} intensity={2} color="#FF4500" />
          <directionalLight position={[0, -5, 5]} intensity={1.5} color="#D4AF37" />

          {Array.from({ length: 80 }).map((_, i) => {
            // Random spherical distribution
            const phi = Math.acos(2 * ((i / 80) - 0.5))
            const theta = (i / 80) * Math.PI * 20

            const startRadius = 8
            const implodedRadius = 0.3
            const explodedRadius = 12

            let radius: number
            if (isImploding) {
              radius = startRadius - (startRadius - implodedRadius) * implodeProgress
            } else {
              radius = implodedRadius + (explodedRadius - implodedRadius) * explodeProgress
            }

            const x = Math.sin(phi) * Math.cos(theta) * radius
            const y = Math.sin(phi) * Math.sin(theta) * radius
            const z = Math.cos(phi) * radius

            const particleColors = [colors.cyan.DEFAULT, '#D4AF37', '#FF6B6B', '#C0C0C0']
            const color = particleColors[i % 4]

            return (
              <TrailingParticle
                key={i}
                position={[x, y, z]}
                color={color}
                size={0.06 + explodeProgress * 0.04}
                trailLength={explodeProgress > 0 ? 8 : 4}
                emissiveIntensity={0.5 + explodeProgress * 0.5}
              />
            )
          })}
          <group rotation={[0.1, progress * Math.PI * 4, 0]} scale={isImploding ? 1 - implodeProgress * 0.3 : 0.7 + explodeProgress * 0.5}>
            <CoinMesh />
          </group>
        </Canvas>
      </Scene>
    </div>
  )
}

// === VARIANT 5: Radial Burst ===
export function ExplosionRadialBurst() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(containerRef)

  const burstProgress = easing.easeOutQuint(progress)

  return (
    <div ref={containerRef} style={{ height: '500vh' }}>
      <Scene
        title="Radial Burst"
        subtitle="Sharp radial explosion from center"
        background={`radial-gradient(ellipse at center, #0a0a1e 0%, #000008 100%)`}
      >
        <FrameIndicator progress={progress} totalFrames={240} />
        <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[0, 10, 5]} intensity={2.5} color="#FFFFFF" />
          <directionalLight position={[0, 0, 6]} intensity={4} color="#FFD700" />
          <directionalLight position={[6, 0, 0]} intensity={2} color={colors.cyan.DEFAULT} />
          <directionalLight position={[-6, 0, 0]} intensity={2} color="#FF8C00" />
          <directionalLight position={[0, 6, 0]} intensity={1.5} color="#00FFFF" />
          <directionalLight position={[0, -6, 0]} intensity={1.5} color="#D4AF37" />

          {/* Radial rays */}
          {Array.from({ length: 12 }).map((_, rayIndex) => {
            const rayAngle = (rayIndex / 12) * Math.PI * 2
            const rayColors = ['#FF8C00', '#00FFFF', colors.cyan.DEFAULT, '#D4AF37', '#FF6B6B', '#FFD700']
            const color = rayColors[rayIndex % 6]

            return (
              <group key={rayIndex} rotation={[0, rayAngle, 0]}>
                {Array.from({ length: 8 }).map((_, i) => {
                  const distance = (i / 8) * 8 * burstProgress
                  const spread = Math.sin((i / 8) * Math.PI) * burstProgress * 2
                  const y = Math.sin(rayAngle * 3 + progress * Math.PI * 4) * spread

                  return (
                    <TrailingParticle
                      key={i}
                      position={[distance, y, 0]}
                      color={color}
                      size={0.1 - (i / 8) * 0.03}
                      trailLength={6}
                      emissiveIntensity={0.8 - (i / 8) * 0.3}
                    />
                  )
                })}
              </group>
            )
          })}
          <group rotation={[0.1, progress * Math.PI * 2, 0]} scale={0.8 + burstProgress * 0.3}>
            <CoinMesh />
          </group>
        </Canvas>
      </Scene>
    </div>
  )
}

// === VARIANT 6: Firework Cascade ===
export function ExplosionFireworkCascade() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(containerRef)

  // Multiple firework bursts at different times
  const burst1 = Math.max(Math.min(progress * 3, 1), 0)
  const burst2 = Math.max(Math.min((progress - 0.2) * 3, 1), 0)
  const burst3 = Math.max(Math.min((progress - 0.4) * 3, 1), 0)
  const burst4 = Math.max(Math.min((progress - 0.6) * 3, 1), 0)

  const FireworkBurst = ({ burstProgress, position, color }: { burstProgress: number; position: [number, number, number]; color: string }) => {
    const eased = easing.easeOutExpo(burstProgress)

    return (
      <group position={position}>
        {Array.from({ length: 20 }).map((_, i) => {
          const phi = Math.acos(2 * ((i / 20) - 0.5))
          const theta = (i / 20) * Math.PI * 10
          const radius = eased * 4

          const x = Math.sin(phi) * Math.cos(theta) * radius
          const y = Math.sin(phi) * Math.sin(theta) * radius - eased * 2 // Gravity effect
          const z = Math.cos(phi) * radius

          return (
            <TrailingParticle
              key={i}
              position={[x, y, z]}
              color={color}
              size={0.08 * (1 - eased * 0.5)}
              trailLength={5}
              emissiveIntensity={0.8 * (1 - eased * 0.5)}
            />
          )
        })}
      </group>
    )
  }

  return (
    <div ref={containerRef} style={{ height: '600vh' }}>
      <Scene
        title="Firework Cascade"
        subtitle="Multiple cascading firework explosions"
        background={`linear-gradient(180deg, #0a0a1e 0%, #000005 100%)`}
      >
        <FrameIndicator progress={progress} totalFrames={300} />
        <Canvas camera={{ position: [0, 0, 14], fov: 50 }}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[0, 10, 5]} intensity={2} color="#FFFFFF" />
          <directionalLight position={[0, 0, 6]} intensity={3} color="#FFD700" />

          <FireworkBurst burstProgress={burst1} position={[-3, 2, 0]} color="#FF8C00" />
          <FireworkBurst burstProgress={burst2} position={[3, 1, -2]} color="#00FFFF" />
          <FireworkBurst burstProgress={burst3} position={[0, 3, 2]} color="#FFD700" />
          <FireworkBurst burstProgress={burst4} position={[-2, -1, 1]} color="#FF6B6B" />

          <group rotation={[0.1, progress * Math.PI * 3, 0]}>
            <CoinMesh />
          </group>
        </Canvas>
      </Scene>
    </div>
  )
}

// === VARIANT 7: Shockwave ===
export function ExplosionShockwave() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(containerRef)

  // Multiple expanding rings
  const ring1 = easing.easeOutQuint(Math.min(progress * 2, 1))
  const ring2 = easing.easeOutQuint(Math.max(Math.min((progress - 0.15) * 2, 1), 0))
  const ring3 = easing.easeOutQuint(Math.max(Math.min((progress - 0.3) * 2, 1), 0))

  const ShockwaveRing = ({ ringProgress, color, yOffset = 0 }: { ringProgress: number; color: string; yOffset?: number }) => {
    const radius = ringProgress * 8
    const particleCount = 24

    return (
      <group position={[0, yOffset, 0]} rotation={[Math.PI / 2, 0, 0]}>
        {Array.from({ length: particleCount }).map((_, i) => {
          const angle = (i / particleCount) * Math.PI * 2
          const x = Math.cos(angle) * radius
          const z = Math.sin(angle) * radius
          const y = Math.sin(angle * 4) * ringProgress * 0.5

          return (
            <TrailingParticle
              key={i}
              position={[x, y, z]}
              color={color}
              size={0.12 * (1 - ringProgress * 0.4)}
              trailLength={4}
              emissiveIntensity={0.9 * (1 - ringProgress * 0.5)}
            />
          )
        })}
        {/* Ring geometry */}
        <mesh>
          <torusGeometry args={[radius, 0.03, 8, 64]} />
          <meshStandardMaterial color={color} transparent opacity={0.4 * (1 - ringProgress)} emissive={color} emissiveIntensity={0.3} />
        </mesh>
      </group>
    )
  }

  return (
    <div ref={containerRef} style={{ height: '500vh' }}>
      <Scene
        title="Shockwave"
        subtitle="Expanding shockwave rings"
        background={`radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a15 100%)`}
      >
        <FrameIndicator progress={progress} totalFrames={240} />
        <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 10, 5]} intensity={2.5} color="#FFFFFF" />
          <directionalLight position={[0, 0, 6]} intensity={4} color="#FFD700" />
          <directionalLight position={[5, 0, 5]} intensity={2} color={colors.cyan.DEFAULT} />
          <directionalLight position={[-5, 0, -5]} intensity={2} color="#FF4500" />

          <ShockwaveRing ringProgress={ring1} color={colors.cyan.DEFAULT} yOffset={0} />
          <ShockwaveRing ringProgress={ring2} color="#D4AF37" yOffset={0.5} />
          <ShockwaveRing ringProgress={ring3} color="#FF6B6B" yOffset={1} />

          <group rotation={[0.2, progress * Math.PI * 4, 0]}>
            <CoinMesh />
          </group>
        </Canvas>
      </Scene>
    </div>
  )
}

// === VARIANT 8: Spiral Explosion ===
export function ExplosionSpiral() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(containerRef)

  const spiralProgress = easing.easeOutExpo(progress)

  return (
    <div ref={containerRef} style={{ height: '500vh' }}>
      <Scene
        title="Spiral Explosion"
        subtitle="Particles spiral outward explosively"
        background={`radial-gradient(ellipse at center, #1a0a1a 0%, #0a0508 100%)`}
      >
        <FrameIndicator progress={progress} totalFrames={240} />
        <Canvas camera={{ position: [0, 3, 10], fov: 50 }}>
          <BrightCinematicLighting />

          {Array.from({ length: 60 }).map((_, i) => {
            const t = i / 60
            const spiralAngle = t * Math.PI * 8 + spiralProgress * Math.PI * 4
            const radius = spiralProgress * (2 + t * 6)
            const x = Math.cos(spiralAngle) * radius
            const z = Math.sin(spiralAngle) * radius
            const y = (t - 0.5) * spiralProgress * 4

            const colors = ['#FF8C00', '#00FFFF', '#FFD700', '#FF6B6B']

            return (
              <TrailingParticle
                key={i}
                position={[x, y, z]}
                color={colors[i % 4]}
                size={0.08}
                trailLength={6}
                emissiveIntensity={0.7}
              />
            )
          })}

          <group rotation={[0.1, progress * Math.PI * 6, 0]}>
            <CoinMesh />
          </group>
        </Canvas>
      </Scene>
    </div>
  )
}

// === VARIANT 9: Moment of Clarity ===
// Full atmospheric experience with sunburst, fog, smoke, and camera filter
export function ExplosionMomentOfClarity() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(containerRef)

  // Clarity peaks at 50% scroll
  const clarityMoment = Math.sin(progress * Math.PI)
  const preClarity = progress < 0.5
  const convergeProgress = preClarity ? easing.easeInOutQuart(progress * 2) : 1
  const explodeProgress = !preClarity ? easing.easeOutExpo((progress - 0.5) * 2) : 0

  return (
    <div ref={containerRef} style={{ height: '600vh' }}>
      <Scene
        title="Moment of Clarity"
        subtitle="Atmospheric sunburst through the smoke"
        background={`radial-gradient(ellipse at center, #0a0a15 0%, #000005 100%)`}
      >
        <FrameIndicator progress={progress} totalFrames={300} />

        {/* Vignette overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: `radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,${0.4 - clarityMoment * 0.2}) 100%)`,
          zIndex: 10,
        }} />

        {/* Warm tint filter that clears at moment of clarity */}
        <div style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: `rgba(255, 200, 100, ${0.1 - clarityMoment * 0.08})`,
          mixBlendMode: 'overlay',
          zIndex: 11,
        }} />

        {/* Bloom/glow effect at peak */}
        <div style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: `radial-gradient(ellipse at center, rgba(255, 215, 0, ${clarityMoment * 0.3}) 0%, transparent 50%)`,
          zIndex: 9,
        }} />

        <Canvas camera={{ position: [0, 2, 12], fov: 50 }}>
          <AtmosphericFog color="#1a1a2e" density={0.03 - clarityMoment * 0.015} />

          {/* Dynamic lighting that intensifies at clarity */}
          <ambientLight intensity={0.3 + clarityMoment * 0.4} />
          <directionalLight position={[0, 10, 5]} intensity={2 + clarityMoment * 2} color="#FFFFFF" />
          <directionalLight position={[0, 0, 6]} intensity={3 + clarityMoment * 5} color="#FFD700" />
          <directionalLight position={[5, 3, 5]} intensity={1.5 + clarityMoment} color={colors.cyan.DEFAULT} />
          <directionalLight position={[-5, 3, -5]} intensity={1.5 + clarityMoment} color="#FF6B6B" />
          <spotLight
            position={[0, 8, 0]}
            intensity={clarityMoment * 4}
            angle={0.6}
            penumbra={0.8}
            color="#FFD700"
          />

          {/* Smoke particles in background */}
          <SmokeParticles progress={progress} count={40} color="#555555" />

          {/* Sunburst at moment of clarity */}
          <Sunburst progress={progress} intensity={1.5} color="#FFD700" rayCount={16} />

          {/* Converging/Exploding particles */}
          {Array.from({ length: 6 }).map((_, planeIndex) => (
            <group key={planeIndex} rotation={[(planeIndex / 6) * Math.PI, (planeIndex / 6) * Math.PI * 2 + progress * Math.PI, 0]}>
              {Array.from({ length: 14 }).map((_, i) => {
                const angle = (i / 14) * Math.PI * 2
                const startRadius = 8
                const convergedRadius = 0.3
                const explodedRadius = 10

                let radius: number
                if (preClarity) {
                  radius = startRadius - (startRadius - convergedRadius) * convergeProgress
                } else {
                  radius = convergedRadius + (explodedRadius - convergedRadius) * explodeProgress
                }

                const x = Math.cos(angle) * radius
                const z = Math.sin(angle) * radius
                const y = Math.sin(angle * 2 + planeIndex) * (preClarity ? 0.3 : explodeProgress * 2)

                const particleColors = [colors.cyan.DEFAULT, '#D4AF37', '#FF6B6B', '#00FFFF', '#FF8C00', '#C0C0C0']

                return (
                  <TrailingParticle
                    key={i}
                    position={[x, y, z]}
                    color={particleColors[planeIndex]}
                    size={0.08 + clarityMoment * 0.04}
                    trailLength={explodeProgress > 0 ? 7 : 4}
                    emissiveIntensity={0.5 + clarityMoment * 0.5}
                  />
                )
              })}
            </group>
          ))}

          {/* Camera filter in 3D space */}
          <CameraFilter progress={progress} tint="#1a1a2e" vignetteStrength={0.3} />

          <group rotation={[0.1, progress * Math.PI * 3, 0]} scale={0.8 + clarityMoment * 0.4}>
            <CoinMesh />
          </group>
        </Canvas>
      </Scene>
    </div>
  )
}

// === VARIANT 10: Ethereal Dawn ===
// Soft, dreamy explosion with god rays through mist
export function ExplosionEtherealDawn() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(containerRef)

  const dawnProgress = easing.easeOutQuint(progress)
  const peakMoment = Math.sin(progress * Math.PI)

  return (
    <div ref={containerRef} style={{ height: '500vh' }}>
      <Scene
        title="Ethereal Dawn"
        subtitle="Soft light breaking through the mist"
        background={`linear-gradient(180deg, #1a1a2e 0%, #2a1a3e 50%, #1a1a2e 100%)`}
      >
        <FrameIndicator progress={progress} totalFrames={240} />

        {/* Dreamy color overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: `linear-gradient(180deg, rgba(100, 150, 255, ${0.1 * peakMoment}) 0%, rgba(255, 200, 150, ${0.15 * peakMoment}) 100%)`,
          mixBlendMode: 'soft-light',
          zIndex: 10,
        }} />

        {/* Soft glow */}
        <div style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: `radial-gradient(ellipse at 50% 30%, rgba(255, 220, 180, ${peakMoment * 0.4}) 0%, transparent 60%)`,
          zIndex: 9,
        }} />

        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <AtmosphericFog color="#2a2a4e" density={0.04 - peakMoment * 0.02} />

          {/* Soft warm lighting */}
          <ambientLight intensity={0.4 + peakMoment * 0.3} color="#ffe4c4" />
          <directionalLight position={[0, 10, 3]} intensity={1.5 + peakMoment * 2} color="#FFE4B5" />
          <directionalLight position={[0, 3, 6]} intensity={2 + peakMoment * 3} color="#FFD700" />
          <directionalLight position={[4, 2, 4]} intensity={1} color="#87CEEB" />
          <directionalLight position={[-4, 2, -4]} intensity={1} color="#FFD700" />

          {/* Mist particles */}
          <SmokeParticles progress={progress} count={50} color="#aaaacc" />

          {/* Soft sunburst */}
          <Sunburst progress={progress} intensity={0.8} color="#FFE4B5" rayCount={20} />

          {/* Ethereal floating particles */}
          {Array.from({ length: 50 }).map((_, i) => {
            const t = i / 50
            const angle = t * Math.PI * 6 + dawnProgress * Math.PI * 2
            const radius = 1 + t * 5 * dawnProgress
            const verticalAngle = t * Math.PI * 2

            const x = Math.cos(angle) * radius * Math.cos(verticalAngle * 0.3)
            const y = Math.sin(verticalAngle) * radius * 0.5 + (dawnProgress - 0.5) * 3
            const z = Math.sin(angle) * radius * Math.cos(verticalAngle * 0.3)

            const etherealColors = ['#87CEEB', '#0ECCED', '#FFE4B5', '#00c3ff', '#FFD700']

            return (
              <TrailingParticle
                key={i}
                position={[x, y, z]}
                color={etherealColors[i % 5]}
                size={0.06 + peakMoment * 0.03}
                trailLength={5}
                emissiveIntensity={0.4 + peakMoment * 0.4}
              />
            )
          })}

          <group rotation={[0.1, progress * Math.PI * 2, 0]} scale={0.9 + peakMoment * 0.2}>
            <CoinMesh />
          </group>
        </Canvas>
      </Scene>
    </div>
  )
}
