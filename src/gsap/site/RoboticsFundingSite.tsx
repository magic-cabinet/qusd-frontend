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

// === BRAND COLORS ===
const brand = {
  cyan: '#0ECCED',
  cyanLight: '#00c3ff',
  blue: '#025EC4',
  gold: '#FFD700',
  goldDark: '#D4AF37',
  orange: '#FF8C00',
  silver: '#C0C0C0',
}

// === ILLUMINATED COIN ===
function IlluminatedCoin({ rotation, scale = 1 }: { rotation: [number, number, number]; scale?: number }) {
  return (
    <group rotation={rotation} scale={scale}>
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
        <meshBasicMaterial color={color} transparent opacity={0.4} depthWrite={false} />
      </mesh>
      <mesh position={position}>
        <sphereGeometry args={[size * 4, 24, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.15} depthWrite={false} />
      </mesh>
      <mesh position={position}>
        <sphereGeometry args={[size * 7, 24, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.06} depthWrite={false} />
      </mesh>
    </group>
  )
}

// === SATURN RINGS ===
function SaturnRings({ progress, ringCount = 5, baseRadius = 2.5 }: {
  progress: number
  ringCount?: number
  baseRadius?: number
}) {
  const ringColors = [brand.cyan, brand.gold, brand.cyanLight, brand.silver, brand.blue, brand.goldDark]

  return (
    <group rotation={[0.4, 0, 0]}>
      {Array.from({ length: ringCount }).map((_, ring) => {
        const radius = baseRadius + ring * 1.0
        const particlesInRing = 18 + ring * 6
        const speed = 1 - ring * 0.12
        const color = ringColors[ring % ringColors.length]
        const zWave = Math.sin(progress * Math.PI * 4 + ring * 0.5) * 0.4

        return (
          <group key={ring} position={[0, zWave, 0]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[radius, 0.015, 8, 80]} />
              <meshBasicMaterial color={color} transparent opacity={0.3} />
            </mesh>
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
                />
              )
            })}
          </group>
        )
      })}
    </group>
  )
}

// === SATURN SWEEP CAMERA ===
function SaturnSweepCamera({ progress }: { progress: number }) {
  const { camera } = useThree()

  useFrame(() => {
    const angle = progress * Math.PI * 3
    const radius = 5 + Math.sin(progress * Math.PI * 4) * 2
    const height = 0.5 + Math.sin(progress * Math.PI * 2) * 1.5
    camera.position.set(Math.cos(angle) * radius, height, Math.sin(angle) * radius)
    camera.lookAt(Math.cos(angle + 0.5) * 2, 0, Math.sin(angle + 0.5) * 2)
  })

  return null
}

// === SPACE FOG ===
function SpaceFog({ density = 0.02, color = '#0a0a1e' }: { density?: number; color?: string }) {
  const { scene } = useThree()
  useEffect(() => {
    scene.fog = new THREE.FogExp2(color, density)
    return () => { scene.fog = null }
  }, [scene, color, density])
  return null
}

// === SECTION COMPONENTS ===

function HeroSection({ progress }: { progress: number }) {
  const localProgress = Math.min(progress * 5, 1)
  const opacity = localProgress

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
      transform: `translateY(${(1 - localProgress) * 50}px)`,
    }}>
      <h1 style={{
        fontFamily: typography.fontFamily.title,
        fontSize: '64px',
        fontWeight: 700,
        color: 'white',
        textAlign: 'center',
        marginBottom: 24,
        textShadow: '0 4px 40px rgba(0,0,0,0.8)',
      }}>
        Mint the Future of Robotics
      </h1>
      <p style={{
        fontFamily: typography.fontFamily.body,
        fontSize: '24px',
        color: colors.gray[300],
        textAlign: 'center',
        maxWidth: 700,
        lineHeight: 1.6,
        textShadow: '0 2px 20px rgba(0,0,0,0.8)',
      }}>
        The modern platform for funding breakthrough robotics projects.
        Secure the future, one milestone at a time.
      </p>
    </div>
  )
}

function FundingSection({ progress }: { progress: number }) {
  const sectionStart = 0.2
  const sectionEnd = 0.4
  const localProgress = Math.max(0, Math.min((progress - sectionStart) / (sectionEnd - sectionStart), 1))
  const opacity = localProgress > 0 && localProgress < 1 ? 1 : 0

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
      transform: `translateY(${(1 - localProgress) * 30}px)`,
    }}>
      <div style={{
        background: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(20px)',
        borderRadius: 24,
        padding: '48px 64px',
        border: `1px solid ${colors.cyan.DEFAULT}40`,
      }}>
        <h2 style={{
          fontFamily: typography.fontFamily.title,
          fontSize: '48px',
          fontWeight: 700,
          color: brand.cyan,
          textAlign: 'center',
          marginBottom: 16,
        }}>
          Reach Your Funding Goals
        </h2>
        <p style={{
          fontFamily: typography.fontFamily.body,
          fontSize: '20px',
          color: colors.gray[300],
          textAlign: 'center',
          maxWidth: 600,
          lineHeight: 1.6,
        }}>
          Built for the decentralized future.
          Set milestones, track progress, and watch your robotics vision come to life.
        </p>
      </div>
    </div>
  )
}

function PlatformSection({ progress }: { progress: number }) {
  const sectionStart = 0.4
  const sectionEnd = 0.6
  const localProgress = Math.max(0, Math.min((progress - sectionStart) / (sectionEnd - sectionStart), 1))
  const opacity = localProgress > 0 && localProgress < 1 ? 1 : 0

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
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 32,
        maxWidth: 1000,
        padding: '0 48px',
      }}>
        {[
          { title: 'Launch', desc: 'New robotics projects coming online every day' },
          { title: 'Fund', desc: 'Transparent milestone-based funding that works' },
          { title: 'Build', desc: 'Partners who make dreams reality' },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(20px)',
            borderRadius: 16,
            padding: '32px 24px',
            border: `1px solid ${brand.gold}40`,
            textAlign: 'center',
            transform: `translateY(${(1 - localProgress) * (30 + i * 20)}px)`,
            opacity: localProgress,
          }}>
            <h3 style={{
              fontFamily: typography.fontFamily.title,
              fontSize: '28px',
              fontWeight: 700,
              color: brand.gold,
              marginBottom: 12,
            }}>
              {item.title}
            </h3>
            <p style={{
              fontFamily: typography.fontFamily.body,
              fontSize: '16px',
              color: colors.gray[400],
              lineHeight: 1.5,
            }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function PartnersSection({ progress }: { progress: number }) {
  const sectionStart = 0.6
  const sectionEnd = 0.8
  const localProgress = Math.max(0, Math.min((progress - sectionStart) / (sectionEnd - sectionStart), 1))
  const opacity = localProgress > 0 && localProgress < 1 ? 1 : 0

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
    }}>
      <h2 style={{
        fontFamily: typography.fontFamily.title,
        fontSize: '42px',
        fontWeight: 700,
        color: 'white',
        textAlign: 'center',
        marginBottom: 24,
      }}>
        Through Our Partners
      </h2>
      <p style={{
        fontFamily: typography.fontFamily.body,
        fontSize: '22px',
        color: brand.cyan,
        textAlign: 'center',
        maxWidth: 600,
        lineHeight: 1.6,
        marginBottom: 48,
      }}>
        We can make any dream come true
      </p>
      <div style={{
        display: 'flex',
        gap: 48,
        opacity: localProgress,
        transform: `scale(${0.8 + localProgress * 0.2})`,
      }}>
        {['Partner 1', 'Partner 2', 'Partner 3', 'Partner 4'].map((partner, i) => (
          <div key={i} style={{
            width: 100,
            height: 100,
            borderRadius: 16,
            background: `linear-gradient(135deg, ${brand.cyan}20 0%, ${brand.gold}20 100%)`,
            border: `1px solid ${brand.cyan}40`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: typography.fontFamily.mono,
            fontSize: '12px',
            color: colors.gray[500],
          }}>
            {partner}
          </div>
        ))}
      </div>
    </div>
  )
}

function CTASection({ progress }: { progress: number }) {
  const sectionStart = 0.8
  const localProgress = Math.max(0, Math.min((progress - sectionStart) / 0.2, 1))
  const opacity = localProgress

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
    }}>
      <h2 style={{
        fontFamily: typography.fontFamily.title,
        fontSize: '52px',
        fontWeight: 700,
        color: 'white',
        textAlign: 'center',
        marginBottom: 24,
      }}>
        Ignite the Future
      </h2>
      <p style={{
        fontFamily: typography.fontFamily.body,
        fontSize: '20px',
        color: colors.gray[300],
        textAlign: 'center',
        maxWidth: 500,
        lineHeight: 1.6,
        marginBottom: 40,
      }}>
        Join the modern way of onboarding the next generation of robotics innovation.
      </p>
      <button style={{
        fontFamily: typography.fontFamily.title,
        fontSize: '18px',
        fontWeight: 600,
        color: colors.ink,
        background: `linear-gradient(135deg, ${brand.cyan} 0%, ${brand.cyanLight} 100%)`,
        border: 'none',
        borderRadius: 12,
        padding: '16px 48px',
        cursor: 'pointer',
        boxShadow: `0 8px 32px ${brand.cyan}40`,
        transform: `scale(${0.9 + localProgress * 0.1})`,
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
        background: `radial-gradient(ellipse at center, #0a0a1e 0%, #000005 100%)`,
        overflow: 'hidden',
      }}>
        {/* 3D Saturn Scene */}
        <Canvas camera={{ position: [0, 2, 8], fov: 55 }}>
          <SpaceFog density={0.018} />
          <SaturnSweepCamera progress={progress} />
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 10, 5]} intensity={2} color="#FFFFFF" />
          <directionalLight position={[-5, 5, -5]} intensity={1} color={brand.cyan} />
          <SaturnRings progress={progress} ringCount={6} baseRadius={2.2} />
          <IlluminatedCoin rotation={[0.1, progress * Math.PI * 4, 0]} scale={0.9} />
        </Canvas>

        {/* Vignette */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)`,
          pointerEvents: 'none',
          zIndex: 5,
        }} />

        {/* Lens flare */}
        <div style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: `${200 + Math.sin(progress * Math.PI) * 100}px`,
          height: `${200 + Math.sin(progress * Math.PI) * 100}px`,
          background: `radial-gradient(ellipse at center, rgba(255, 215, 0, ${Math.sin(progress * Math.PI) * 0.15}) 0%, transparent 60%)`,
          pointerEvents: 'none',
          zIndex: 4,
        }} />

        {/* Content Sections */}
        <HeroSection progress={progress} />
        <FundingSection progress={progress} />
        <PlatformSection progress={progress} />
        <PartnersSection progress={progress} />
        <CTASection progress={progress} />

        {/* Progress indicator */}
        <div style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 8,
          zIndex: 20,
        }}>
          {[0, 0.2, 0.4, 0.6, 0.8].map((threshold, i) => (
            <div key={i} style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: progress >= threshold ? brand.cyan : 'rgba(255,255,255,0.3)',
              transition: 'background 0.3s',
            }} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default RoboticsFundingSite
