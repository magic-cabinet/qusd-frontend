import { useRef, useEffect, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { colors, typography } from '../../design-system/tokens'
import { CoinMesh, FrameIndicator } from './ScrollDrivenCoin'

gsap.registerPlugin(ScrollTrigger)

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

// === HIGHLY ILLUMINATED COIN ===
// Wrapper that adds directional lights around the coin (no point lights to avoid sphere artifacts)
function IlluminatedCoin({ rotation, scale = 1 }: { rotation: [number, number, number]; scale?: number }) {
  return (
    <group rotation={rotation} scale={scale}>
      {/* Directional lights that illuminate from all angles - no spheres */}
      <directionalLight position={[4, 0, 2]} intensity={3} color="#FFD700" />
      <directionalLight position={[-4, 0, -2]} intensity={3} color={colors.cyan.DEFAULT} />
      <directionalLight position={[0, 4, 2]} intensity={2.5} color="#FFFFFF" />
      <directionalLight position={[0, -4, -2]} intensity={2} color="#D4AF37" />
      <directionalLight position={[2, 2, 4]} intensity={3} color="#FFFFFF" />
      <directionalLight position={[-2, -2, -4]} intensity={2} color="#FFD700" />
      <CoinMesh />
    </group>
  )
}

// === EMISSIVE TRAILING PARTICLE ===
// Only transparent auras - no solid core that creates visible spheres
function GlowParticle({
  position,
  color,
  size = 0.08,
  trailLength = 5,
}: {
  position: [number, number, number]
  color: string
  size?: number
  trailLength?: number
}) {
  return (
    <group>
      {/* Inner aura - semi-transparent, no solid core */}
      <mesh position={position}>
        <sphereGeometry args={[size * 1.5, 24, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} depthWrite={false} />
      </mesh>
      {/* Middle aura */}
      <mesh position={position}>
        <sphereGeometry args={[size * 4, 24, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.12} depthWrite={false} />
      </mesh>
      {/* Outer aura - large soft glow */}
      <mesh position={position}>
        <sphereGeometry args={[size * 7, 24, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.05} depthWrite={false} />
      </mesh>
      {/* Trail - also transparent only */}
      {Array.from({ length: trailLength }).map((_, t) => {
        const fade = 1 - t / trailLength
        const offset = (t + 1) * 0.12
        return (
          <mesh key={t} position={[
            position[0] * (1 - offset),
            position[1] * (1 - offset),
            position[2] * (1 - offset)
          ]}>
            <sphereGeometry args={[size * fade * 2, 16, 16]} />
            <meshBasicMaterial color={color} transparent opacity={fade * 0.2} depthWrite={false} />
          </mesh>
        )
      })}
    </group>
  )
}

// === BRAND COLOR PALETTE ===
const brandColors = {
  cyan: colors.cyan.DEFAULT,      // #0ECCED
  cyanLight: colors.cyan.light,   // #00c3ff
  cyanDark: colors.cyan.dark,     // #0BB8D9
  blue: colors.blue.DEFAULT,      // #025EC4
  blueLight: colors.blue.light,   // #0370E0
  gold: '#FFD700',
  goldDark: '#D4AF37',
  orange: '#FF8C00',
  silver: '#C0C0C0',
  white: '#FFFFFF',
}

// === SATURN RINGS ===
function SaturnRings({ progress, ringCount = 5, baseRadius = 2.5, tilt = 0.4 }: {
  progress: number
  ringCount?: number
  baseRadius?: number
  tilt?: number
}) {
  // Brand colors only - cyan, gold, blue, silver
  const ringColors = [brandColors.cyan, brandColors.gold, brandColors.cyanLight, brandColors.silver, brandColors.blue, brandColors.goldDark]

  return (
    <group rotation={[tilt, 0, 0]}>
      {Array.from({ length: ringCount }).map((_, ring) => {
        const radius = baseRadius + ring * 1.0
        const particlesInRing = 18 + ring * 6
        const speed = 1 - ring * 0.12
        const color = ringColors[ring % ringColors.length]
        const zWave = Math.sin(progress * Math.PI * 4 + ring * 0.5) * 0.4

        return (
          <group key={ring} position={[0, zWave, 0]}>
            {/* Ring path */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[radius, 0.015, 8, 80]} />
              <meshBasicMaterial color={color} transparent opacity={0.3} />
            </mesh>
            {/* Particles */}
            {Array.from({ length: particlesInRing }).map((_, i) => {
              const angle = (i / particlesInRing) * Math.PI * 2 + progress * Math.PI * 4 * speed
              const wobble = Math.sin(angle * 3 + progress * Math.PI * 6) * 0.15
              const x = Math.cos(angle) * (radius + wobble)
              const z = Math.sin(angle) * (radius + wobble)
              const y = Math.sin(angle * 2 + progress * Math.PI * 8) * 0.25

              return (
                <GlowParticle
                  key={i}
                  position={[x, y, z]}
                  color={color}
                  size={0.045 + ring * 0.008}
                  trailLength={4}
                />
              )
            })}
          </group>
        )
      })}
    </group>
  )
}

// === CAMERA MODES ===
function SaturnCamera({ progress, mode = 'orbit' }: { progress: number; mode?: 'orbit' | 'dive' | 'sweep' | 'spiral' | 'chase' }) {
  const { camera } = useThree()

  useFrame(() => {
    if (mode === 'orbit') {
      // Classic orbit around
      const angle = progress * Math.PI * 2
      const radius = 8 + Math.sin(progress * Math.PI * 3) * 2
      const height = Math.sin(progress * Math.PI * 2) * 3 + 2
      camera.position.set(Math.cos(angle) * radius, height, Math.sin(angle) * radius)
      camera.lookAt(0, 0, 0)
    } else if (mode === 'dive') {
      // Dive through rings
      const wobbleX = Math.sin(progress * Math.PI * 6) * 1.5
      const wobbleZ = Math.cos(progress * Math.PI * 5) * 1.5
      camera.position.set(wobbleX, 6 - progress * 10, 8 + wobbleZ - progress * 6)
      camera.lookAt(wobbleX * 0.2, -1, wobbleZ * 0.2)
    } else if (mode === 'sweep') {
      // Low sweeping pass
      const angle = progress * Math.PI * 3
      const radius = 5 + Math.sin(progress * Math.PI * 4) * 2
      const height = 0.5 + Math.sin(progress * Math.PI * 2) * 1.5
      camera.position.set(Math.cos(angle) * radius, height, Math.sin(angle) * radius)
      camera.lookAt(Math.cos(angle + 0.5) * 2, 0, Math.sin(angle + 0.5) * 2)
    } else if (mode === 'spiral') {
      // Spiral in and out
      const spiralAngle = progress * Math.PI * 6
      const spiralRadius = 4 + Math.sin(progress * Math.PI) * 4
      const height = Math.cos(progress * Math.PI * 3) * 3 + 3
      camera.position.set(Math.cos(spiralAngle) * spiralRadius, height, Math.sin(spiralAngle) * spiralRadius)
      camera.lookAt(0, 0, 0)
    } else if (mode === 'chase') {
      // Chase a point on the rings
      const chaseAngle = progress * Math.PI * 4
      const chaseRadius = 3.5
      const targetX = Math.cos(chaseAngle) * chaseRadius
      const targetZ = Math.sin(chaseAngle) * chaseRadius
      const camAngle = chaseAngle - 0.5
      camera.position.set(Math.cos(camAngle) * 6, 2 + Math.sin(progress * Math.PI * 3), Math.sin(camAngle) * 6)
      camera.lookAt(targetX, 0, targetZ)
    }
  })

  return null
}

// === ATMOSPHERIC FOG ===
function SpaceFog({ density = 0.02, color = '#0a0a1e' }: { density?: number; color?: string }) {
  const { scene } = useThree()
  useEffect(() => {
    scene.fog = new THREE.FogExp2(color, density)
    return () => { scene.fog = null }
  }, [scene, color, density])
  return null
}

// === CAMERA SUBSTRATE / CONE FILTER ===
// A filter that follows the camera and applies effects to the field of view
export function CameraSubstrate({
  progress,
  tint = '#0ECCED',
  intensity = 0.1,
  vignetteStrength = 0.3,
  dustParticles = 20,
  enableDust = true,
  enableTint = true,
  enableVignette = true,
}: {
  progress: number
  tint?: string
  intensity?: number
  vignetteStrength?: number
  dustParticles?: number
  enableDust?: boolean
  enableTint?: boolean
  enableVignette?: boolean
}) {
  const { camera } = useThree()
  const groupRef = useRef<THREE.Group>(null)

  // Dust particles floating in front of camera
  const dustPositions = useMemo(() => {
    return Array.from({ length: dustParticles }).map(() => ({
      x: (Math.random() - 0.5) * 4,
      y: (Math.random() - 0.5) * 3,
      z: -2 - Math.random() * 3,
      size: 0.01 + Math.random() * 0.02,
      speed: 0.5 + Math.random(),
    }))
  }, [dustParticles])

  useFrame(() => {
    if (groupRef.current) {
      // Make the substrate follow the camera
      groupRef.current.position.copy(camera.position)
      groupRef.current.quaternion.copy(camera.quaternion)
    }
  })

  return (
    <group ref={groupRef}>
      {/* Tint layer - cone shaped in FOV */}
      {enableTint && (
        <mesh position={[0, 0, -5]}>
          <planeGeometry args={[20, 15]} />
          <meshBasicMaterial
            color={tint}
            transparent
            opacity={intensity * (0.8 + Math.sin(progress * Math.PI) * 0.2)}
            depthTest={false}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Vignette cone */}
      {enableVignette && (
        <mesh position={[0, 0, -4]}>
          <ringGeometry args={[6, 12, 32]} />
          <meshBasicMaterial
            color="#000000"
            transparent
            opacity={vignetteStrength}
            depthTest={false}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Dust particles in FOV */}
      {enableDust && dustPositions.map((dust, i) => {
        const drift = Math.sin(progress * Math.PI * 2 * dust.speed + i) * 0.5
        return (
          <mesh key={i} position={[dust.x + drift, dust.y + drift * 0.3, dust.z]}>
            <sphereGeometry args={[dust.size, 16, 16]} />
            <meshBasicMaterial
              color="#FFFFFF"
              transparent
              opacity={0.3 + Math.sin(progress * Math.PI * 4 + i) * 0.2}
            />
          </mesh>
        )
      })}

      {/* Lens flare elements */}
      <mesh position={[0, 0, -6]}>
        <circleGeometry args={[0.5 + Math.sin(progress * Math.PI) * 0.3, 32]} />
        <meshBasicMaterial
          color={tint}
          transparent
          opacity={Math.sin(progress * Math.PI) * 0.15}
          depthTest={false}
        />
      </mesh>
    </group>
  )
}

// === SCENE WRAPPER WITH FILTERS ===
function SaturnScene({ title, subtitle, children, progress, filter = 'none' }: {
  title: string
  subtitle: string
  children: React.ReactNode
  progress: number
  filter?: 'none' | 'warm' | 'cool' | 'cyan' | 'golden' | 'blue'
}) {
  const filters = {
    none: {},
    warm: { background: `rgba(255, 180, 100, ${0.08 + progress * 0.04})`, blend: 'overlay' },
    cool: { background: `rgba(14, 204, 237, ${0.1 + Math.sin(progress * Math.PI) * 0.05})`, blend: 'soft-light' },
    cyan: { background: `rgba(0, 195, 255, ${0.08})`, blend: 'screen' },
    golden: { background: `rgba(255, 215, 0, ${0.1 + Math.sin(progress * Math.PI) * 0.08})`, blend: 'overlay' },
    blue: { background: `rgba(2, 94, 196, ${0.1 - Math.sin(progress * Math.PI) * 0.04})`, blend: 'soft-light' },
  }

  const f = filters[filter] as { background?: string; blend?: string }

  return (
    <div style={{
      position: 'sticky',
      top: 0,
      height: '100vh',
      background: `radial-gradient(ellipse at center, #0a0a1e 0%, #000005 100%)`,
    }}>
      {children}

      {/* Vignette */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)`,
        pointerEvents: 'none',
        zIndex: 10,
      }} />

      {/* Color filter */}
      {filter !== 'none' && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: f.background,
          mixBlendMode: f.blend as any,
          pointerEvents: 'none',
          zIndex: 11,
        }} />
      )}

      {/* Lens flare at peak */}
      <div style={{
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: `${200 + Math.sin(progress * Math.PI) * 150}px`,
        height: `${200 + Math.sin(progress * Math.PI) * 150}px`,
        background: `radial-gradient(ellipse at center, rgba(255, 215, 0, ${Math.sin(progress * Math.PI) * 0.2}) 0%, transparent 60%)`,
        pointerEvents: 'none',
        zIndex: 9,
      }} />

      <div style={{ position: 'absolute', bottom: 60, left: 0, right: 0, textAlign: 'center', zIndex: 20 }}>
        <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '28px', fontWeight: 700, color: 'white', marginBottom: 8, textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}>{title}</h3>
        <p style={{ fontFamily: typography.fontFamily.mono, fontSize: '14px', color: colors.gray[400] }}>{subtitle}</p>
      </div>
    </div>
  )
}

// === BRIGHT SCENE LIGHTING ===
// Uses directional lights instead of point lights at origin to avoid sphere artifacts with fog
function BrightSceneLighting({ intensity = 1 }: { intensity?: number }) {
  return (
    <>
      <ambientLight intensity={0.4 * intensity} />
      <directionalLight position={[5, 10, 5]} intensity={2.5 * intensity} color="#FFFFFF" />
      <directionalLight position={[-5, 5, -5]} intensity={1 * intensity} color="#6eb5ff" />
      {/* Replaced center point light with directional to avoid visible sphere */}
      <directionalLight position={[0, 0, 5]} intensity={3 * intensity} color="#FFD700" />
      <directionalLight position={[0, 5, 0]} intensity={2 * intensity} color="#FFFFFF" />
      <spotLight position={[0, 8, 8]} intensity={3 * intensity} angle={0.5} penumbra={0.5} color="#FFFFFF" />
    </>
  )
}

// ============================================
// SATURN VARIANTS
// ============================================

// === 1. Saturn Classic ===
export function SaturnClassic() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(containerRef)

  return (
    <div ref={containerRef} style={{ height: '500vh' }}>
      <SaturnScene title="Saturn Classic" subtitle="Orbital view of the rings" progress={progress} filter="warm">
        <FrameIndicator progress={progress} totalFrames={240} />
        <Canvas camera={{ position: [0, 5, 10], fov: 55 }}>
          <SpaceFog density={0.015} />
          <SaturnCamera progress={progress} mode="orbit" />
          <BrightSceneLighting intensity={1.2} />
          <SaturnRings progress={progress} ringCount={6} baseRadius={2.2} />
          <IlluminatedCoin rotation={[0.2, progress * Math.PI * 2, 0]} scale={1} />
        </Canvas>
      </SaturnScene>
    </div>
  )
}

// === 2. Saturn Dive ===
export function SaturnDive() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(containerRef)

  return (
    <div ref={containerRef} style={{ height: '600vh' }}>
      <SaturnScene title="Saturn Dive" subtitle="Plunge through the ring system" progress={progress} filter="cool">
        <FrameIndicator progress={progress} totalFrames={300} />
        <Canvas camera={{ position: [0, 6, 10], fov: 60 }}>
          <SpaceFog density={0.02} color="#050515" />
          <SaturnCamera progress={progress} mode="dive" />
          <BrightSceneLighting intensity={1.5} />
          <SaturnRings progress={progress} ringCount={7} baseRadius={2} tilt={0.5} />
          <IlluminatedCoin rotation={[0.15, progress * Math.PI * 3, 0]} scale={1.1} />
        </Canvas>
      </SaturnScene>
    </div>
  )
}

// === 3. Saturn Sweep ===
export function SaturnSweep() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(containerRef)

  return (
    <div ref={containerRef} style={{ height: '500vh' }}>
      <SaturnScene title="Saturn Sweep" subtitle="Low sweeping pass through the rings" progress={progress} filter="golden">
        <FrameIndicator progress={progress} totalFrames={240} />
        <Canvas camera={{ position: [5, 1, 5], fov: 65 }}>
          <SpaceFog density={0.018} color="#0a0508" />
          <SaturnCamera progress={progress} mode="sweep" />
          <BrightSceneLighting intensity={1.3} />
          <SaturnRings progress={progress} ringCount={5} baseRadius={2.5} tilt={0.3} />
          <IlluminatedCoin rotation={[0.1, progress * Math.PI * 4, 0]} scale={0.9} />
        </Canvas>
      </SaturnScene>
    </div>
  )
}

// === 4. Saturn Spiral ===
export function SaturnSpiral() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(containerRef)

  return (
    <div ref={containerRef} style={{ height: '600vh' }}>
      <SaturnScene title="Saturn Spiral" subtitle="Spiral in and out of the rings" progress={progress} filter="cyan">
        <FrameIndicator progress={progress} totalFrames={300} />
        <Canvas camera={{ position: [0, 5, 8], fov: 55 }}>
          <SpaceFog density={0.025} color="#0a0015" />
          <SaturnCamera progress={progress} mode="spiral" />
          <BrightSceneLighting intensity={1.4} />
          {/* Extra neon lights */}
          <pointLight position={[5, 0, 5]} intensity={3} color="#0ECCED" distance={10} />
          <pointLight position={[-5, 0, -5]} intensity={3} color="#00FFFF" distance={10} />
          <SaturnRings progress={progress} ringCount={6} baseRadius={2.3} tilt={0.45} />
          <IlluminatedCoin rotation={[0.2, progress * Math.PI * 5, 0]} scale={1} />
        </Canvas>
      </SaturnScene>
    </div>
  )
}

// === 5. Saturn Chase ===
export function SaturnChase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(containerRef)

  return (
    <div ref={containerRef} style={{ height: '500vh' }}>
      <SaturnScene title="Saturn Chase" subtitle="Chase a point along the rings" progress={progress} filter="warm">
        <FrameIndicator progress={progress} totalFrames={240} />
        <Canvas camera={{ position: [6, 2, 6], fov: 50 }}>
          <SpaceFog density={0.012} />
          <SaturnCamera progress={progress} mode="chase" />
          <BrightSceneLighting intensity={1.2} />
          <SaturnRings progress={progress} ringCount={5} baseRadius={2.5} tilt={0.35} />
          <IlluminatedCoin rotation={[0.15, progress * Math.PI * 3, 0]} scale={1} />
        </Canvas>
      </SaturnScene>
    </div>
  )
}

// === 6. Saturn Storm ===
export function SaturnStorm() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(containerRef)

  // Extra chaos particles
  const stormParticles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      angle: Math.random() * Math.PI * 2,
      radius: 1.5 + Math.random() * 4,
      speed: 0.5 + Math.random(),
      yOffset: (Math.random() - 0.5) * 3,
      color: ['#FF8C00', '#FFD700', colors.cyan.DEFAULT, '#0370E0'][i % 4],
      size: 0.04 + Math.random() * 0.04,
    }))
  }, [])

  return (
    <div ref={containerRef} style={{ height: '600vh' }}>
      <SaturnScene title="Saturn Storm" subtitle="Chaotic particle storm" progress={progress} filter="blue">
        <FrameIndicator progress={progress} totalFrames={300} />
        <Canvas camera={{ position: [0, 4, 9], fov: 60 }}>
          <SpaceFog density={0.03} color="#0a0a20" />
          <SaturnCamera progress={progress} mode="spiral" />
          <BrightSceneLighting intensity={1.6} />

          <SaturnRings progress={progress} ringCount={5} baseRadius={2.2} tilt={0.4} />

          {/* Storm particles */}
          {stormParticles.map((p, i) => {
            const angle = p.angle + progress * Math.PI * 4 * p.speed
            const chaos = Math.sin(progress * Math.PI * 8 + i) * 0.5
            const x = Math.cos(angle) * (p.radius + chaos)
            const z = Math.sin(angle) * (p.radius + chaos)
            const y = p.yOffset + Math.sin(angle * 2 + progress * Math.PI * 6) * 1

            return (
              <GlowParticle
                key={i}
                position={[x, y, z]}
                color={p.color}
                size={p.size}
              />
            )
          })}

          <IlluminatedCoin rotation={[0.2, progress * Math.PI * 4, progress * 0.3]} scale={1} />
        </Canvas>
      </SaturnScene>
    </div>
  )
}

// === 7. Saturn Ethereal ===
export function SaturnEthereal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(containerRef)
  const peakMoment = Math.sin(progress * Math.PI)

  return (
    <div ref={containerRef} style={{ height: '500vh' }}>
      <SaturnScene title="Saturn Ethereal" subtitle="Dreamy ethereal atmosphere" progress={progress} filter="blue">
        <FrameIndicator progress={progress} totalFrames={240} />

        {/* Extra bloom at peak */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at center, rgba(200, 180, 255, ${peakMoment * 0.15}) 0%, transparent 50%)`,
          pointerEvents: 'none',
          zIndex: 8,
        }} />

        <Canvas camera={{ position: [0, 3, 10], fov: 50 }}>
          <SpaceFog density={0.035 - peakMoment * 0.015} color="#1a1a2e" />
          <SaturnCamera progress={progress} mode="orbit" />

          {/* Ethereal lighting - directional lights to avoid sphere artifacts */}
          <ambientLight intensity={0.5 + peakMoment * 0.3} color="#00c3ff" />
          <directionalLight position={[5, 10, 5]} intensity={2 + peakMoment} color="#FFE4E1" />
          <directionalLight position={[0, 0, 6]} intensity={3 + peakMoment * 2} color="#FFD700" />
          <directionalLight position={[4, 2, 4]} intensity={2} color="#0BB8D9" />
          <directionalLight position={[-4, 2, -4]} intensity={2} color="#87CEEB" />

          <SaturnRings progress={progress} ringCount={6} baseRadius={2.3} tilt={0.35} />
          <IlluminatedCoin rotation={[0.15, progress * Math.PI * 2, 0]} scale={1 + peakMoment * 0.15} />
        </Canvas>
      </SaturnScene>
    </div>
  )
}

// === 8. Saturn Neon ===
export function SaturnNeon() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(containerRef)

  return (
    <div ref={containerRef} style={{ height: '500vh' }}>
      <SaturnScene title="Saturn Neon" subtitle="Vibrant neon ring system" progress={progress} filter="cyan">
        <FrameIndicator progress={progress} totalFrames={240} />
        <Canvas camera={{ position: [0, 4, 9], fov: 55 }}>
          <SpaceFog density={0.02} color="#0a0015" />
          <SaturnCamera progress={progress} mode="sweep" />

          {/* Neon lighting - directional lights to avoid sphere artifacts */}
          <ambientLight intensity={0.3} />
          <directionalLight position={[0, 10, 5]} intensity={2} color="#FFFFFF" />
          <directionalLight position={[5, 3, 5]} intensity={4} color="#0ECCED" />
          <directionalLight position={[-5, 3, -5]} intensity={4} color="#00FFFF" />
          <directionalLight position={[0, -3, 5]} intensity={3} color="#FFD700" />
          <directionalLight position={[0, 0, 6]} intensity={4} color="#0ECCED" />

          <SaturnRings progress={progress} ringCount={6} baseRadius={2.2} tilt={0.4} />
          <IlluminatedCoin rotation={[0.2, progress * Math.PI * 3, 0]} scale={1} />
        </Canvas>
      </SaturnScene>
    </div>
  )
}

// === 9. Saturn Golden Hour ===
export function SaturnGoldenHour() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(containerRef)

  return (
    <div ref={containerRef} style={{ height: '500vh' }}>
      <SaturnScene title="Saturn Golden Hour" subtitle="Warm sunset over the rings" progress={progress} filter="golden">
        <FrameIndicator progress={progress} totalFrames={240} />
        <Canvas camera={{ position: [0, 3, 10], fov: 50 }}>
          <SpaceFog density={0.015} color="#1a0a05" />
          <SaturnCamera progress={progress} mode="orbit" />

          {/* Golden lighting - directional lights to avoid sphere artifacts */}
          <ambientLight intensity={0.4} color="#FFF5E6" />
          <directionalLight position={[8, 5, 2]} intensity={3} color="#FFB347" />
          <directionalLight position={[-5, 8, -3]} intensity={1} color="#87CEEB" />
          <directionalLight position={[0, 0, 6]} intensity={4} color="#FFD700" />
          <directionalLight position={[5, 0, 5]} intensity={2} color="#FF8C00" />
          <spotLight position={[0, 10, 0]} intensity={2} angle={0.6} penumbra={0.8} color="#FFD700" />

          <SaturnRings progress={progress} ringCount={6} baseRadius={2.3} tilt={0.35} />
          <IlluminatedCoin rotation={[0.15, progress * Math.PI * 2, 0]} scale={1} />
        </Canvas>
      </SaturnScene>
    </div>
  )
}

// === 10. Saturn Chaos Dive ===
export function SaturnChaosDive() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(containerRef)

  return (
    <div ref={containerRef} style={{ height: '700vh' }}>
      <SaturnScene title="Saturn Chaos Dive" subtitle="Ultimate ring dive experience" progress={progress} filter="cool">
        <FrameIndicator progress={progress} totalFrames={360} />
        <Canvas camera={{ position: [0, 8, 10], fov: 65 }}>
          <SpaceFog density={0.025} color="#050510" />
          <SaturnCamera progress={progress} mode="dive" />
          <BrightSceneLighting intensity={1.8} />

          {/* Extra dramatic lights */}
          <pointLight position={[6, 0, 6]} intensity={3} color="#FF4500" distance={12} />
          <pointLight position={[-6, 0, -6]} intensity={3} color="#4169E1" distance={12} />

          {/* Dense ring system */}
          <SaturnRings progress={progress} ringCount={8} baseRadius={1.8} tilt={0.55} />

          <IlluminatedCoin rotation={[0.2 + progress * 0.3, progress * Math.PI * 4, 0]} scale={1.2} />
        </Canvas>
      </SaturnScene>
    </div>
  )
}
