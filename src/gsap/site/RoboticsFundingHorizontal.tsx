import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { typography } from '../../design-system/tokens'
import { CoinMesh } from '../coins/ScrollDrivenCoin'

gsap.registerPlugin(ScrollTrigger)

// === GOLDEN COLOR PALETTE ===
const golden = {
  primary: '#FFD700',
  light: '#FFE55C',
  dark: '#D4AF37',
  warm: '#FFC125',
  bronze: '#CD7F32',
  accent: '#F5DEB3',
}

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

// === HORIZONTAL SCROLL HOOK ===
function useHorizontalScroll(
  containerRef: React.RefObject<HTMLDivElement | null>,
  trackRef: React.RefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return

    const ctx = gsap.context(() => {
      const panels = trackRef.current!.querySelectorAll('.h-panel')
      const totalWidth = trackRef.current!.scrollWidth - window.innerWidth

      gsap.to(trackRef.current, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })

      // Animate each panel
      panels.forEach((panel, i) => {
        gsap.fromTo(
          panel.querySelector('.panel-content'),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: panel,
              containerAnimation: gsap.getById('horizontal') as gsap.core.Tween,
              start: 'left center',
              end: 'center center',
              scrub: true,
            },
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [containerRef, trackRef])
}

// === 3D COMPONENTS ===
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
    </group>
  )
}

function GoldenRings({ progress, ringCount = 5, baseRadius = 2 }: {
  progress: number
  ringCount?: number
  baseRadius?: number
}) {
  const ringColors = [golden.primary, golden.light, golden.dark, golden.warm, golden.bronze]

  return (
    <group rotation={[0.35, 0, 0]}>
      {Array.from({ length: ringCount }).map((_, ring) => {
        const radius = baseRadius + ring * 0.8
        const particlesInRing = 16 + ring * 4
        const speed = 1 - ring * 0.12
        const color = ringColors[ring % ringColors.length]
        const zWave = Math.sin(progress * Math.PI * 4 + ring * 0.6) * 0.3

        return (
          <group key={ring} position={[0, zWave, 0]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[radius, 0.01, 8, 64]} />
              <meshBasicMaterial color={color} transparent opacity={0.35} />
            </mesh>
            {Array.from({ length: particlesInRing }).map((_, i) => {
              const angle = (i / particlesInRing) * Math.PI * 2 + progress * Math.PI * 4 * speed
              const wobble = Math.sin(angle * 3 + progress * Math.PI * 6) * 0.1
              const x = Math.cos(angle) * (radius + wobble)
              const z = Math.sin(angle) * (radius + wobble)
              const y = Math.sin(angle * 2 + progress * Math.PI * 8) * 0.15

              return (
                <GlowParticle
                  key={i}
                  position={[x, y, z]}
                  color={color}
                  size={0.035 + ring * 0.005}
                />
              )
            })}
          </group>
        )
      })}
    </group>
  )
}

function SweepCamera({ progress }: { progress: number }) {
  const { camera } = useThree()

  useFrame(() => {
    const angle = progress * Math.PI * 2
    const radius = 6 + Math.sin(progress * Math.PI * 3) * 1.5
    const height = 1 + Math.sin(progress * Math.PI * 1.5) * 1
    camera.position.set(Math.cos(angle) * radius, height, Math.sin(angle) * radius)
    camera.lookAt(0, 0, 0)
  })

  return null
}

function SpaceFog({ density = 0.02 }: { density?: number }) {
  const { scene } = useThree()
  useEffect(() => {
    scene.fog = new THREE.FogExp2('#0a0805', density)
    return () => { scene.fog = null }
  }, [scene, density])
  return null
}

// === HORIZONTAL PANEL COMPONENT ===
function HorizontalPanel({
  children,
  background = 'transparent',
  className = ''
}: {
  children: React.ReactNode
  background?: string
  className?: string
}) {
  return (
    <div
      className={`h-panel ${className}`}
      style={{
        width: '100vw',
        height: '100vh',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background,
        position: 'relative',
      }}
    >
      <div className="panel-content" style={{
        padding: '0 clamp(24px, 6vw, 80px)',
        maxWidth: '100%',
      }}>
        {children}
      </div>
    </div>
  )
}

// === MAIN EXPORT ===
export function RoboticsFundingHorizontal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const horizontalRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const heroProgress = useScrollProgress(heroRef)

  // Horizontal scroll setup
  useEffect(() => {
    if (!horizontalRef.current || !trackRef.current) return

    const ctx = gsap.context(() => {
      const totalWidth = trackRef.current!.scrollWidth - window.innerWidth

      gsap.to(trackRef.current, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: horizontalRef.current,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })
    }, horizontalRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef}>
      {/* HERO SECTION - Vertical Scroll with 3D Animation */}
      <div ref={heroRef} style={{ height: '300vh' }}>
        <div style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          background: `radial-gradient(ellipse at center, #1a1408 0%, #0a0805 100%)`,
          overflow: 'hidden',
        }}>
          <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
            <SpaceFog density={0.018} />
            <SweepCamera progress={heroProgress} />
            <ambientLight intensity={0.25} color={golden.accent} />
            <directionalLight position={[5, 10, 5]} intensity={2} color={golden.light} />
            <directionalLight position={[-5, 5, -5]} intensity={1.5} color={golden.dark} />
            <GoldenRings progress={heroProgress} ringCount={5} baseRadius={1.8} />
            <IlluminatedCoin rotation={[0.1, heroProgress * Math.PI * 4, 0]} scale={0.8} />
          </Canvas>

          {/* Vignette */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse at center, transparent 20%, rgba(10,8,5,0.8) 100%)`,
            pointerEvents: 'none',
            zIndex: 5,
          }} />

          {/* Hero Text */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
            pointerEvents: 'none',
            opacity: Math.max(0, 1 - heroProgress * 3),
            padding: '0 24px',
          }}>
            <h1 style={{
              fontFamily: typography.fontFamily.title,
              fontSize: 'clamp(36px, 10vw, 96px)',
              fontWeight: 700,
              color: golden.primary,
              textAlign: 'center',
              marginBottom: 16,
              textShadow: `0 4px 60px ${golden.dark}80`,
              letterSpacing: '-0.02em',
            }}>
              Mint the Future
            </h1>
            <p style={{
              fontFamily: typography.fontFamily.body,
              fontSize: 'clamp(16px, 4vw, 28px)',
              color: golden.accent,
              textAlign: 'center',
              opacity: 0.85,
            }}>
              Scroll to explore
            </p>
          </div>

          {/* Scroll indicator */}
          <div style={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 15,
            opacity: Math.max(0, 1 - heroProgress * 4),
          }}>
            <div style={{
              width: 24,
              height: 40,
              border: `2px solid ${golden.primary}40`,
              borderRadius: 12,
              display: 'flex',
              justifyContent: 'center',
              paddingTop: 8,
            }}>
              <div style={{
                width: 4,
                height: 8,
                background: golden.primary,
                borderRadius: 2,
                animation: 'scrollBounce 1.5s infinite',
              }} />
            </div>
          </div>
        </div>
      </div>

      {/* HORIZONTAL SCROLL SECTION */}
      <div ref={horizontalRef} style={{
        background: '#0a0805',
        overflow: 'hidden',
      }}>
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            width: 'fit-content',
          }}
        >
          {/* Panel 1: Vision */}
          <HorizontalPanel>
            <div style={{ textAlign: 'center' }}>
              <p style={{
                fontFamily: typography.fontFamily.body,
                fontSize: 'clamp(12px, 2.5vw, 16px)',
                color: golden.bronze,
                textTransform: 'uppercase',
                letterSpacing: '0.25em',
                marginBottom: 16,
              }}>
                Our Vision
              </p>
              <h2 style={{
                fontFamily: typography.fontFamily.title,
                fontSize: 'clamp(32px, 8vw, 72px)',
                fontWeight: 700,
                color: 'white',
                marginBottom: 24,
                lineHeight: 1.1,
              }}>
                Fund the<br />
                <span style={{ color: golden.primary }}>Future of Robotics</span>
              </h2>
              <p style={{
                fontFamily: typography.fontFamily.body,
                fontSize: 'clamp(14px, 3vw, 20px)',
                color: golden.accent,
                maxWidth: '60ch',
                lineHeight: 1.6,
                opacity: 0.8,
              }}>
                A decentralized platform connecting visionary builders with investors who believe in transforming tomorrow.
              </p>
            </div>
          </HorizontalPanel>

          {/* Panel 2: How It Works */}
          <HorizontalPanel>
            <div style={{ textAlign: 'center' }}>
              <p style={{
                fontFamily: typography.fontFamily.body,
                fontSize: 'clamp(12px, 2.5vw, 16px)',
                color: golden.bronze,
                textTransform: 'uppercase',
                letterSpacing: '0.25em',
                marginBottom: 24,
              }}>
                How It Works
              </p>
              <div style={{
                display: 'flex',
                gap: 'clamp(32px, 6vw, 80px)',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}>
                {[
                  { num: '01', title: 'Launch', desc: 'Submit your project' },
                  { num: '02', title: 'Fund', desc: 'Reach milestones' },
                  { num: '03', title: 'Build', desc: 'Create the future' },
                ].map((item, i) => (
                  <div key={i} style={{ textAlign: 'center', minWidth: 140 }}>
                    <span style={{
                      fontFamily: typography.fontFamily.title,
                      fontSize: 'clamp(10px, 2vw, 14px)',
                      color: golden.dark,
                      letterSpacing: '0.1em',
                    }}>
                      {item.num}
                    </span>
                    <h3 style={{
                      fontFamily: typography.fontFamily.title,
                      fontSize: 'clamp(28px, 6vw, 48px)',
                      fontWeight: 700,
                      color: i === 1 ? golden.primary : 'white',
                      margin: '8px 0',
                    }}>
                      {item.title}
                    </h3>
                    <p style={{
                      fontFamily: typography.fontFamily.body,
                      fontSize: 'clamp(12px, 2.5vw, 16px)',
                      color: golden.accent,
                      opacity: 0.7,
                    }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </HorizontalPanel>

          {/* Panel 3: Partners */}
          <HorizontalPanel>
            <div style={{ textAlign: 'center' }}>
              <p style={{
                fontFamily: typography.fontFamily.body,
                fontSize: 'clamp(12px, 2.5vw, 16px)',
                color: golden.bronze,
                textTransform: 'uppercase',
                letterSpacing: '0.25em',
                marginBottom: 16,
              }}>
                Through Our Partners
              </p>
              <h2 style={{
                fontFamily: typography.fontFamily.title,
                fontSize: 'clamp(28px, 7vw, 64px)',
                fontWeight: 700,
                color: 'white',
                marginBottom: 24,
                lineHeight: 1.2,
              }}>
                Any dream can<br />
                <span style={{ color: golden.primary }}>become reality</span>
              </h2>
              <p style={{
                fontFamily: typography.fontFamily.body,
                fontSize: 'clamp(14px, 3vw, 20px)',
                color: golden.accent,
                maxWidth: '50ch',
                lineHeight: 1.6,
                opacity: 0.8,
              }}>
                Connect with industry leaders and unlock resources to bring your vision to life.
              </p>
            </div>
          </HorizontalPanel>

          {/* Panel 4: CTA */}
          <HorizontalPanel>
            <div style={{ textAlign: 'center' }}>
              <h2 style={{
                fontFamily: typography.fontFamily.title,
                fontSize: 'clamp(32px, 8vw, 72px)',
                fontWeight: 700,
                color: golden.primary,
                marginBottom: 32,
                textShadow: `0 4px 40px ${golden.dark}60`,
              }}>
                Ready to Build?
              </h2>
              <button style={{
                fontFamily: typography.fontFamily.title,
                fontSize: 'clamp(14px, 3vw, 20px)',
                fontWeight: 600,
                color: '#0a0805',
                background: `linear-gradient(135deg, ${golden.primary} 0%, ${golden.warm} 100%)`,
                border: 'none',
                borderRadius: 8,
                padding: 'clamp(14px, 3vw, 20px) clamp(40px, 10vw, 72px)',
                cursor: 'pointer',
                boxShadow: `0 8px 40px ${golden.dark}50`,
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}>
                Get Started
              </button>
              <p style={{
                fontFamily: typography.fontFamily.body,
                fontSize: 'clamp(12px, 2.5vw, 16px)',
                color: golden.accent,
                marginTop: 24,
                opacity: 0.6,
              }}>
                Join the future of decentralized funding
              </p>
            </div>
          </HorizontalPanel>
        </div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(6px); opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}

export default RoboticsFundingHorizontal
