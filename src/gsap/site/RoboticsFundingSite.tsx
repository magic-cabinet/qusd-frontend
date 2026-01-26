import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { colors, typography } from '../../design-system/tokens'
import { CoinMesh } from '../coins/ScrollDrivenCoin'

gsap.registerPlugin(ScrollTrigger)

// === SCROLL PROGRESS HOOK ===
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

// === GOLDEN COLOR PALETTE ===
const golden = {
  primary: '#FFD700',
  light: '#FFE55C',
  dark: '#D4AF37',
  warm: '#FFC125',
  bronze: '#CD7F32',
  accent: '#F5DEB3',
}

// === ILLUMINATED COIN ===
function IlluminatedCoin({ rotation, scale = 1 }: { rotation: [number, number, number]; scale?: number }) {
  return (
    <group rotation={rotation} scale={scale}>
      <directionalLight position={[4, 0, 2]} intensity={3.5} color={golden.primary} />
      <directionalLight position={[-4, 0, -2]} intensity={3} color={golden.warm} />
      <directionalLight position={[0, 4, 2]} intensity={2.5} color="#FFFFFF" />
      <directionalLight position={[0, -4, -2]} intensity={2} color={golden.dark} />
      <directionalLight position={[2, 2, 4]} intensity={3} color={golden.light} />
      <directionalLight position={[-2, -2, -4]} intensity={2} color={golden.bronze} />
      <CoinMesh />
    </group>
  )
}

// === SMOOTH GLOW PARTICLE ===
function GlowParticle({ position, color, size = 0.06 }: {
  position: [number, number, number]
  color: string
  size?: number
}) {
  return (
    <group>
      <mesh position={position}>
        <sphereGeometry args={[size * 1.5, 24, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.45} depthWrite={false} />
      </mesh>
      <mesh position={position}>
        <sphereGeometry args={[size * 4, 24, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.18} depthWrite={false} />
      </mesh>
      <mesh position={position}>
        <sphereGeometry args={[size * 7, 24, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.08} depthWrite={false} />
      </mesh>
    </group>
  )
}

// === GOLDEN SATURN RINGS ===
function GoldenRings({ progress, ringCount = 6, baseRadius = 2.2 }: {
  progress: number
  ringCount?: number
  baseRadius?: number
}) {
  const ringColors = [golden.primary, golden.light, golden.dark, golden.warm, golden.bronze, golden.accent]

  return (
    <group rotation={[0.35, 0, 0]}>
      {Array.from({ length: ringCount }).map((_, ring) => {
        const radius = baseRadius + ring * 0.9
        const particlesInRing = 20 + ring * 5
        const speed = 1 - ring * 0.1
        const color = ringColors[ring % ringColors.length]
        const zWave = Math.sin(progress * Math.PI * 4 + ring * 0.6) * 0.35

        return (
          <group key={ring} position={[0, zWave, 0]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[radius, 0.012, 8, 80]} />
              <meshBasicMaterial color={color} transparent opacity={0.4} />
            </mesh>
            {Array.from({ length: particlesInRing }).map((_, i) => {
              const angle = (i / particlesInRing) * Math.PI * 2 + progress * Math.PI * 4 * speed
              const wobble = Math.sin(angle * 3 + progress * Math.PI * 6) * 0.12
              const x = Math.cos(angle) * (radius + wobble)
              const z = Math.sin(angle) * (radius + wobble)
              const y = Math.sin(angle * 2 + progress * Math.PI * 8) * 0.2

              return (
                <GlowParticle
                  key={i}
                  position={[x, y, z]}
                  color={color}
                  size={0.04 + ring * 0.006}
                />
              )
            })}
          </group>
        )
      })}
    </group>
  )
}

// === SWEEP CAMERA ===
function SweepCamera({ progress }: { progress: number }) {
  const { camera } = useThree()

  useFrame(() => {
    const angle = progress * Math.PI * 3
    const radius = 5 + Math.sin(progress * Math.PI * 4) * 1.5
    const height = 0.8 + Math.sin(progress * Math.PI * 2) * 1.2
    camera.position.set(Math.cos(angle) * radius, height, Math.sin(angle) * radius)
    camera.lookAt(Math.cos(angle + 0.4) * 1.5, 0, Math.sin(angle + 0.4) * 1.5)
  })

  return null
}

// === SPACE FOG ===
function SpaceFog({ density = 0.025 }: { density?: number }) {
  const { scene } = useThree()
  useEffect(() => {
    scene.fog = new THREE.FogExp2('#0a0805', density)
    return () => { scene.fog = null }
  }, [scene, density])
  return null
}

// === MINIMAL TEXT SECTIONS (Mobile-friendly) ===

function HeroSection({ progress }: { progress: number }) {
  const opacity = Math.min(progress * 6, 1) * (progress < 0.15 ? 1 : Math.max(0, 1 - (progress - 0.15) * 8))

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
      pointerEvents: 'none',
      opacity,
      padding: '0 24px',
    }}>
      <h1 style={{
        fontFamily: typography.fontFamily.title,
        fontSize: 'clamp(32px, 8vw, 72px)',
        fontWeight: 700,
        color: golden.primary,
        textAlign: 'center',
        marginBottom: 16,
        textShadow: `0 4px 40px ${golden.dark}80`,
        letterSpacing: '-0.02em',
      }}>
        Mint the Future
      </h1>
      <p style={{
        fontFamily: typography.fontFamily.body,
        fontSize: 'clamp(16px, 4vw, 24px)',
        color: golden.accent,
        textAlign: 'center',
        maxWidth: '90vw',
        lineHeight: 1.5,
        opacity: 0.9,
      }}>
        The platform for funding robotics innovation
      </p>
    </div>
  )
}

function FundingSection({ progress }: { progress: number }) {
  const start = 0.15
  const end = 0.35
  const visible = progress > start && progress < end
  const localProgress = (progress - start) / (end - start)
  const opacity = visible ? Math.sin(localProgress * Math.PI) : 0

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
      pointerEvents: 'none',
      opacity,
      padding: '0 24px',
    }}>
      <h2 style={{
        fontFamily: typography.fontFamily.title,
        fontSize: 'clamp(28px, 6vw, 56px)',
        fontWeight: 700,
        color: 'white',
        textAlign: 'center',
        marginBottom: 16,
      }}>
        Reach Your Goals
      </h2>
      <p style={{
        fontFamily: typography.fontFamily.body,
        fontSize: 'clamp(14px, 3.5vw, 20px)',
        color: golden.light,
        textAlign: 'center',
        maxWidth: '80vw',
        lineHeight: 1.6,
      }}>
        Transparent milestone-based funding.<br />
        Track progress. Build the future.
      </p>
    </div>
  )
}

function PlatformSection({ progress }: { progress: number }) {
  const start = 0.35
  const end = 0.55
  const visible = progress > start && progress < end
  const localProgress = (progress - start) / (end - start)
  const opacity = visible ? Math.sin(localProgress * Math.PI) : 0

  const items = [
    { word: 'Launch', delay: 0 },
    { word: 'Fund', delay: 0.1 },
    { word: 'Build', delay: 0.2 },
  ]

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
      pointerEvents: 'none',
      opacity,
      padding: '0 24px',
    }}>
      <div style={{
        display: 'flex',
        gap: 'clamp(24px, 8vw, 64px)',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        {items.map((item, i) => (
          <span key={i} style={{
            fontFamily: typography.fontFamily.title,
            fontSize: 'clamp(36px, 10vw, 80px)',
            fontWeight: 700,
            color: i === 1 ? golden.primary : 'white',
            opacity: Math.max(0, localProgress - item.delay) * 2,
            transform: `translateY(${(1 - Math.min(1, (localProgress - item.delay) * 3)) * 30}px)`,
          }}>
            {item.word}
          </span>
        ))}
      </div>
    </div>
  )
}

function PartnersSection({ progress }: { progress: number }) {
  const start = 0.55
  const end = 0.75
  const visible = progress > start && progress < end
  const localProgress = (progress - start) / (end - start)
  const opacity = visible ? Math.sin(localProgress * Math.PI) : 0

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
      pointerEvents: 'none',
      opacity,
      padding: '0 24px',
    }}>
      <p style={{
        fontFamily: typography.fontFamily.body,
        fontSize: 'clamp(14px, 3vw, 18px)',
        color: golden.accent,
        textAlign: 'center',
        marginBottom: 12,
        textTransform: 'uppercase',
        letterSpacing: '0.2em',
      }}>
        Through our partners
      </p>
      <h2 style={{
        fontFamily: typography.fontFamily.title,
        fontSize: 'clamp(24px, 6vw, 48px)',
        fontWeight: 700,
        color: 'white',
        textAlign: 'center',
        lineHeight: 1.2,
      }}>
        Any dream can become reality
      </h2>
    </div>
  )
}

function CTASection({ progress }: { progress: number }) {
  const start = 0.75
  const visible = progress > start
  const localProgress = Math.min((progress - start) / 0.2, 1)
  const opacity = visible ? localProgress : 0

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
      pointerEvents: opacity > 0.5 ? 'auto' : 'none',
      opacity,
      padding: '0 24px',
    }}>
      <h2 style={{
        fontFamily: typography.fontFamily.title,
        fontSize: 'clamp(28px, 7vw, 56px)',
        fontWeight: 700,
        color: golden.primary,
        textAlign: 'center',
        marginBottom: 24,
      }}>
        Ignite the Future
      </h2>
      <button style={{
        fontFamily: typography.fontFamily.title,
        fontSize: 'clamp(14px, 3vw, 18px)',
        fontWeight: 600,
        color: '#0a0805',
        background: `linear-gradient(135deg, ${golden.primary} 0%, ${golden.warm} 100%)`,
        border: 'none',
        borderRadius: 8,
        padding: 'clamp(12px, 3vw, 18px) clamp(32px, 8vw, 56px)',
        cursor: 'pointer',
        boxShadow: `0 8px 32px ${golden.dark}60`,
      }}>
        Get Started
      </button>
    </div>
  )
}

// === MAIN EXPORT ===
export function RoboticsFundingSite() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(containerRef)

  return (
    <div ref={containerRef} style={{ height: '500vh' }}>
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        background: `radial-gradient(ellipse at center, #1a1408 0%, #0a0805 100%)`,
        overflow: 'hidden',
      }}>
        {/* 3D Golden Saturn Scene */}
        <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
          <SpaceFog density={0.02} />
          <SweepCamera progress={progress} />
          <ambientLight intensity={0.3} color={golden.accent} />
          <directionalLight position={[5, 10, 5]} intensity={2} color={golden.light} />
          <directionalLight position={[-5, 5, -5]} intensity={1.5} color={golden.dark} />
          <GoldenRings progress={progress} ringCount={6} baseRadius={2} />
          <IlluminatedCoin rotation={[0.1, progress * Math.PI * 4, 0]} scale={0.85} />
        </Canvas>

        {/* Golden vignette */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at center, transparent 20%, rgba(10,8,5,0.7) 100%)`,
          pointerEvents: 'none',
          zIndex: 5,
        }} />

        {/* Golden lens flare */}
        <div style={{
          position: 'absolute',
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: `${150 + Math.sin(progress * Math.PI) * 80}px`,
          height: `${150 + Math.sin(progress * Math.PI) * 80}px`,
          background: `radial-gradient(ellipse at center, ${golden.primary}${Math.floor(Math.sin(progress * Math.PI) * 25).toString(16).padStart(2, '0')} 0%, transparent 60%)`,
          pointerEvents: 'none',
          zIndex: 4,
        }} />

        {/* Content Sections */}
        <HeroSection progress={progress} />
        <FundingSection progress={progress} />
        <PlatformSection progress={progress} />
        <PartnersSection progress={progress} />
        <CTASection progress={progress} />

        {/* Progress dots */}
        <div style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 8,
          zIndex: 20,
        }}>
          {[0, 0.2, 0.4, 0.6, 0.8].map((threshold, i) => (
            <div key={i} style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: progress >= threshold ? golden.primary : 'rgba(255,255,255,0.2)',
              transition: 'background 0.3s',
            }} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default RoboticsFundingSite
