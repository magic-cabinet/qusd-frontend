import { useRef, useEffect, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { colors, typography } from '../../design-system/tokens'
import { CoinMesh, FrameIndicator } from './ScrollDrivenCoin'

gsap.registerPlugin(ScrollTrigger)

// Brand colors only
const brand = {
  cyan: '#0ECCED',
  cyanLight: '#00c3ff',
  cyanDark: '#0BB8D9',
  blue: '#025EC4',
  blueLight: '#0370E0',
  gold: '#FFD700',
  goldDark: '#D4AF37',
  orange: '#FF8C00',
  silver: '#C0C0C0',
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

// === ILLUMINATED COIN ===
// Lights placed FAR from coin to avoid visible sphere artifacts with fog
function IlluminatedCoin({ rotation, scale = 1 }: { rotation: [number, number, number]; scale?: number }) {
  return (
    <group rotation={rotation} scale={scale}>
      {/* Directional lights instead of point lights - no visible spheres */}
      <directionalLight position={[4, 0, 2]} intensity={3} color={brand.gold} />
      <directionalLight position={[-4, 0, -2]} intensity={3} color={brand.cyan} />
      <directionalLight position={[0, 4, 2]} intensity={2.5} color="#FFFFFF" />
      <directionalLight position={[0, -4, -2]} intensity={2} color={brand.goldDark} />
      <directionalLight position={[2, 2, 4]} intensity={3} color="#FFFFFF" />
      <directionalLight position={[-2, -2, -4]} intensity={2} color={brand.gold} />
      <CoinMesh />
    </group>
  )
}

// === GLOW PARTICLE ===
// ONLY aura - no solid spheres at all
function GlowParticle({ position, color, size = 0.06 }: {
  position: [number, number, number]
  color: string
  size?: number
}) {
  return (
    <group>
      {/* Inner aura - very transparent */}
      <mesh position={position}>
        <sphereGeometry args={[size * 1.5, 24, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} depthWrite={false} />
      </mesh>
      {/* Large outer aura */}
      <mesh position={position}>
        <sphereGeometry args={[size * 4, 24, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.12} depthWrite={false} />
      </mesh>
      {/* Extra large soft glow */}
      <mesh position={position}>
        <sphereGeometry args={[size * 7, 24, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.05} depthWrite={false} />
      </mesh>
    </group>
  )
}

// === CAMERA FILTER SUBSTRATE ===
// Follows camera, applies FOV effects
function CameraFilter({
  progress,
  tint = brand.cyan,
  tintOpacity = 0.08,
  vignetteOpacity = 0.4,
  dustCount = 15,
  flareSize = 0.5,
  enableDust = true,
  enableFlare = true,
}: {
  progress: number
  tint?: string
  tintOpacity?: number
  vignetteOpacity?: number
  dustCount?: number
  flareSize?: number
  enableDust?: boolean
  enableFlare?: boolean
}) {
  const { camera } = useThree()
  const groupRef = useRef<THREE.Group>(null)

  const dust = useMemo(() => Array.from({ length: dustCount }).map(() => ({
    x: (Math.random() - 0.5) * 5,
    y: (Math.random() - 0.5) * 4,
    z: -3 - Math.random() * 2,
    size: 0.008 + Math.random() * 0.015,
    speed: 0.3 + Math.random() * 0.7,
  })), [dustCount])

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.copy(camera.position)
      groupRef.current.quaternion.copy(camera.quaternion)
    }
  })

  const peak = Math.sin(progress * Math.PI)

  return (
    <group ref={groupRef}>
      {/* Color tint */}
      <mesh position={[0, 0, -6]}>
        <planeGeometry args={[25, 20]} />
        <meshBasicMaterial color={tint} transparent opacity={tintOpacity * (0.7 + peak * 0.3)} depthTest={false} depthWrite={false} />
      </mesh>

      {/* Vignette ring */}
      <mesh position={[0, 0, -5]}>
        <ringGeometry args={[5, 15, 32]} />
        <meshBasicMaterial color="#000000" transparent opacity={vignetteOpacity} depthTest={false} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>

      {/* Dust particles */}
      {enableDust && dust.map((d, i) => {
        const drift = Math.sin(progress * Math.PI * 2 * d.speed + i) * 0.4
        return (
          <mesh key={i} position={[d.x + drift, d.y + drift * 0.2, d.z]}>
            <sphereGeometry args={[d.size, 16, 16]} />
            <meshBasicMaterial color="#FFFFFF" transparent opacity={0.25 + peak * 0.15} />
          </mesh>
        )
      })}

      {/* Lens flare */}
      {enableFlare && (
        <mesh position={[0, 0, -7]}>
          <circleGeometry args={[flareSize + peak * 0.4, 32]} />
          <meshBasicMaterial color={tint} transparent opacity={peak * 0.12} depthTest={false} />
        </mesh>
      )}
    </group>
  )
}

// === RINGS ===
function Rings({ progress, count = 5, baseRadius = 2.2 }: { progress: number; count?: number; baseRadius?: number }) {
  const ringColors = [brand.cyan, brand.gold, brand.cyanLight, brand.silver, brand.blue, brand.goldDark]
  return (
    <group rotation={[0.4, 0, 0]}>
      {Array.from({ length: count }).map((_, ring) => {
        const radius = baseRadius + ring * 0.9
        const particles = 16 + ring * 4
        const speed = 1 - ring * 0.1
        const color = ringColors[ring % ringColors.length]
        return (
          <group key={ring} position={[0, Math.sin(progress * Math.PI * 4 + ring) * 0.3, 0]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[radius, 0.012, 8, 64]} />
              <meshBasicMaterial color={color} transparent opacity={0.25} />
            </mesh>
            {Array.from({ length: particles }).map((_, i) => {
              const angle = (i / particles) * Math.PI * 2 + progress * Math.PI * 4 * speed
              const x = Math.cos(angle) * radius
              const z = Math.sin(angle) * radius
              const y = Math.sin(angle * 2 + progress * Math.PI * 6) * 0.2
              return <GlowParticle key={i} position={[x, y, z]} color={color} size={0.04 + ring * 0.006} />
            })}
          </group>
        )
      })}
    </group>
  )
}

// === CAMERA MODES ===
function DynamicCamera({ progress, mode }: { progress: number; mode: string }) {
  const { camera } = useThree()
  useFrame(() => {
    const angle = progress * Math.PI * 2
    if (mode === 'orbit') {
      camera.position.set(Math.cos(angle) * 9, 3 + Math.sin(progress * Math.PI * 2) * 2, Math.sin(angle) * 9)
    } else if (mode === 'dive') {
      camera.position.set(Math.sin(progress * Math.PI * 4) * 2, 7 - progress * 12, 8 - progress * 4)
    } else if (mode === 'sweep') {
      const r = 6 + Math.sin(progress * Math.PI * 3) * 2
      camera.position.set(Math.cos(angle * 1.5) * r, 1 + Math.sin(progress * Math.PI) * 1.5, Math.sin(angle * 1.5) * r)
    } else if (mode === 'spiral') {
      const r = 5 + Math.sin(progress * Math.PI) * 3
      camera.position.set(Math.cos(progress * Math.PI * 5) * r, Math.cos(progress * Math.PI * 2) * 3 + 3, Math.sin(progress * Math.PI * 5) * r)
    } else if (mode === 'chase') {
      const target = progress * Math.PI * 3
      camera.position.set(Math.cos(target - 0.5) * 7, 2, Math.sin(target - 0.5) * 7)
    }
    camera.lookAt(0, 0, 0)
  })
  return null
}

// === FOG ===
function Fog({ color = '#0a0a1e', density = 0.018 }: { color?: string; density?: number }) {
  const { scene } = useThree()
  useEffect(() => {
    scene.fog = new THREE.FogExp2(color, density)
    return () => { scene.fog = null }
  }, [scene, color, density])
  return null
}

// === SCENE ===
function Scene({ title, subtitle, children, progress }: {
  title: string; subtitle: string; children: React.ReactNode; progress: number
}) {
  const peak = Math.sin(progress * Math.PI)
  return (
    <div style={{ position: 'sticky', top: 0, height: '100vh', background: 'radial-gradient(ellipse at center, #0a0a1e 0%, #000005 100%)' }}>
      {children}
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.5) 100%)`, pointerEvents: 'none', zIndex: 10 }} />
      {/* Soft aura - no visible sphere edge */}
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 45%, rgba(255,215,0,${peak * 0.06}) 0%, rgba(255,215,0,${peak * 0.03}) 30%, transparent 60%)`, pointerEvents: 'none', zIndex: 9 }} />
      <div style={{ position: 'absolute', bottom: 50, left: 0, right: 0, textAlign: 'center', zIndex: 20 }}>
        <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '26px', fontWeight: 700, color: 'white', marginBottom: 6, textShadow: '0 2px 15px rgba(0,0,0,0.8)' }}>{title}</h3>
        <p style={{ fontFamily: typography.fontFamily.mono, fontSize: '13px', color: colors.gray[400] }}>{subtitle}</p>
      </div>
    </div>
  )
}

// === LIGHTING ===
function Lighting({ boost = 1 }: { boost?: number }) {
  return (
    <>
      <ambientLight intensity={0.5 * boost} />
      <directionalLight position={[5, 10, 5]} intensity={3 * boost} color="#FFFFFF" />
      <directionalLight position={[-5, 5, -5]} intensity={1.5 * boost} color={brand.cyanLight} />
      <directionalLight position={[0, -5, 5]} intensity={1 * boost} color={brand.gold} />
      <spotLight position={[0, 8, 6]} intensity={3.5 * boost} angle={0.5} penumbra={0.5} color="#FFFFFF" />
      <spotLight position={[0, -3, 8]} intensity={2 * boost} angle={0.6} penumbra={0.8} color={brand.gold} />
    </>
  )
}

// ============================================
// 10 CAMERA FILTER VARIANTS
// ============================================

export function FilterCyanOrbit() {
  const ref = useRef<HTMLDivElement>(null)
  const p = useScrollProgress(ref)
  return (
    <div ref={ref} style={{ height: '500vh' }}>
      <Scene title="Cyan Orbit" subtitle="Cyan tint with orbital camera" progress={p}>
        <FrameIndicator progress={p} totalFrames={240} />
        <Canvas camera={{ position: [0, 4, 10], fov: 55 }}>
          <Fog />
          <DynamicCamera progress={p} mode="orbit" />
          <Lighting boost={1.2} />
          <CameraFilter progress={p} tint={brand.cyan} tintOpacity={0.1} />
          <Rings progress={p} count={6} />
          <IlluminatedCoin rotation={[0.2, p * Math.PI * 2, 0]} />
        </Canvas>
      </Scene>
    </div>
  )
}

export function FilterGoldDive() {
  const ref = useRef<HTMLDivElement>(null)
  const p = useScrollProgress(ref)
  return (
    <div ref={ref} style={{ height: '600vh' }}>
      <Scene title="Gold Dive" subtitle="Golden tint diving through rings" progress={p}>
        <FrameIndicator progress={p} totalFrames={300} />
        <Canvas camera={{ position: [0, 6, 10], fov: 60 }}>
          <Fog density={0.022} />
          <DynamicCamera progress={p} mode="dive" />
          <Lighting boost={1.4} />
          <CameraFilter progress={p} tint={brand.gold} tintOpacity={0.12} dustCount={20} />
          <Rings progress={p} count={7} baseRadius={2} />
          <IlluminatedCoin rotation={[0.15, p * Math.PI * 3, 0]} scale={1.1} />
        </Canvas>
      </Scene>
    </div>
  )
}

export function FilterBlueSweep() {
  const ref = useRef<HTMLDivElement>(null)
  const p = useScrollProgress(ref)
  return (
    <div ref={ref} style={{ height: '500vh' }}>
      <Scene title="Blue Sweep" subtitle="Deep blue low sweep" progress={p}>
        <FrameIndicator progress={p} totalFrames={240} />
        <Canvas camera={{ position: [5, 1, 5], fov: 65 }}>
          <Fog color="#050510" />
          <DynamicCamera progress={p} mode="sweep" />
          <Lighting boost={1.3} />
          <CameraFilter progress={p} tint={brand.blue} tintOpacity={0.1} flareSize={0.6} />
          <Rings progress={p} count={5} baseRadius={2.5} />
          <IlluminatedCoin rotation={[0.1, p * Math.PI * 4, 0]} scale={0.95} />
        </Canvas>
      </Scene>
    </div>
  )
}

export function FilterCyanSpiral() {
  const ref = useRef<HTMLDivElement>(null)
  const p = useScrollProgress(ref)
  return (
    <div ref={ref} style={{ height: '600vh' }}>
      <Scene title="Cyan Spiral" subtitle="Spiral with bright cyan filter" progress={p}>
        <FrameIndicator progress={p} totalFrames={300} />
        <Canvas camera={{ position: [0, 4, 9], fov: 55 }}>
          <Fog density={0.025} />
          <DynamicCamera progress={p} mode="spiral" />
          <Lighting boost={1.5} />
          <pointLight position={[5, 0, 5]} intensity={3} color={brand.cyan} distance={10} />
          <pointLight position={[-5, 0, -5]} intensity={3} color={brand.cyanLight} distance={10} />
          <CameraFilter progress={p} tint={brand.cyanLight} tintOpacity={0.09} dustCount={25} />
          <Rings progress={p} count={6} />
          <IlluminatedCoin rotation={[0.2, p * Math.PI * 5, 0]} />
        </Canvas>
      </Scene>
    </div>
  )
}

export function FilterGoldChase() {
  const ref = useRef<HTMLDivElement>(null)
  const p = useScrollProgress(ref)
  return (
    <div ref={ref} style={{ height: '500vh' }}>
      <Scene title="Gold Chase" subtitle="Chase camera with warm gold" progress={p}>
        <FrameIndicator progress={p} totalFrames={240} />
        <Canvas camera={{ position: [7, 2, 7], fov: 50 }}>
          <Fog density={0.015} />
          <DynamicCamera progress={p} mode="chase" />
          <Lighting boost={1.3} />
          <CameraFilter progress={p} tint={brand.goldDark} tintOpacity={0.11} vignetteOpacity={0.35} />
          <Rings progress={p} count={5} baseRadius={2.3} />
          <IlluminatedCoin rotation={[0.15, p * Math.PI * 3, 0]} />
        </Canvas>
      </Scene>
    </div>
  )
}

export function FilterDualTone() {
  const ref = useRef<HTMLDivElement>(null)
  const p = useScrollProgress(ref)
  // Alternate between cyan and gold based on progress
  const tint = p < 0.5 ? brand.cyan : brand.gold
  return (
    <div ref={ref} style={{ height: '600vh' }}>
      <Scene title="Dual Tone" subtitle="Cyan to gold transition" progress={p}>
        <FrameIndicator progress={p} totalFrames={300} />
        <Canvas camera={{ position: [0, 4, 10], fov: 55 }}>
          <Fog />
          <DynamicCamera progress={p} mode="orbit" />
          <Lighting boost={1.4} />
          <CameraFilter progress={p} tint={tint} tintOpacity={0.12} dustCount={18} />
          <Rings progress={p} count={6} />
          <IlluminatedCoin rotation={[0.2, p * Math.PI * 3, 0]} />
        </Canvas>
      </Scene>
    </div>
  )
}

export function FilterHeavyDust() {
  const ref = useRef<HTMLDivElement>(null)
  const p = useScrollProgress(ref)
  return (
    <div ref={ref} style={{ height: '500vh' }}>
      <Scene title="Heavy Dust" subtitle="Dense dust particles in frame" progress={p}>
        <FrameIndicator progress={p} totalFrames={240} />
        <Canvas camera={{ position: [0, 3, 9], fov: 58 }}>
          <Fog density={0.03} />
          <DynamicCamera progress={p} mode="sweep" />
          <Lighting boost={1.6} />
          <CameraFilter progress={p} tint={brand.silver} tintOpacity={0.06} dustCount={40} flareSize={0.4} />
          <Rings progress={p} count={5} />
          <IlluminatedCoin rotation={[0.15, p * Math.PI * 4, 0]} />
        </Canvas>
      </Scene>
    </div>
  )
}

export function FilterBrightFlare() {
  const ref = useRef<HTMLDivElement>(null)
  const p = useScrollProgress(ref)
  return (
    <div ref={ref} style={{ height: '500vh' }}>
      <Scene title="Bright Flare" subtitle="Large lens flare at peak" progress={p}>
        <FrameIndicator progress={p} totalFrames={240} />
        <Canvas camera={{ position: [0, 4, 10], fov: 55 }}>
          <Fog density={0.012} />
          <DynamicCamera progress={p} mode="orbit" />
          <Lighting boost={1.5} />
          <CameraFilter progress={p} tint={brand.gold} tintOpacity={0.08} dustCount={10} flareSize={1.2} />
          <Rings progress={p} count={6} />
          <IlluminatedCoin rotation={[0.2, p * Math.PI * 2, 0]} scale={1.05} />
        </Canvas>
      </Scene>
    </div>
  )
}

export function FilterDeepBlue() {
  const ref = useRef<HTMLDivElement>(null)
  const p = useScrollProgress(ref)
  return (
    <div ref={ref} style={{ height: '600vh' }}>
      <Scene title="Deep Blue" subtitle="Deep blue atmosphere dive" progress={p}>
        <FrameIndicator progress={p} totalFrames={300} />
        <Canvas camera={{ position: [0, 6, 9], fov: 60 }}>
          <Fog color="#030820" density={0.028} />
          <DynamicCamera progress={p} mode="dive" />
          <Lighting boost={1.4} />
          <pointLight position={[4, 2, 4]} intensity={2} color={brand.blue} distance={10} />
          <pointLight position={[-4, 2, -4]} intensity={2} color={brand.blueLight} distance={10} />
          <CameraFilter progress={p} tint={brand.blue} tintOpacity={0.14} vignetteOpacity={0.45} />
          <Rings progress={p} count={7} baseRadius={2} />
          <IlluminatedCoin rotation={[0.15, p * Math.PI * 3, 0]} scale={1.1} />
        </Canvas>
      </Scene>
    </div>
  )
}

export function FilterCinematic() {
  const ref = useRef<HTMLDivElement>(null)
  const p = useScrollProgress(ref)
  return (
    <div ref={ref} style={{ height: '600vh' }}>
      <Scene title="Cinematic" subtitle="Film-like color grade" progress={p}>
        <FrameIndicator progress={p} totalFrames={300} />
        <Canvas camera={{ position: [0, 4, 10], fov: 50 }}>
          <Fog density={0.02} />
          <DynamicCamera progress={p} mode="spiral" />
          <Lighting boost={1.5} />
          <pointLight position={[6, 0, 0]} intensity={2} color={brand.orange} distance={10} />
          <pointLight position={[-6, 0, 0]} intensity={2} color={brand.cyan} distance={10} />
          <CameraFilter progress={p} tint={brand.goldDark} tintOpacity={0.1} vignetteOpacity={0.5} dustCount={12} flareSize={0.7} />
          <Rings progress={p} count={6} />
          <IlluminatedCoin rotation={[0.2, p * Math.PI * 4, 0]} />
        </Canvas>
      </Scene>
    </div>
  )
}
