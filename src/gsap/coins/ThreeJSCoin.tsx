import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { colors, typography } from '../../design-system/tokens'

// Import the coin components from Remotion (reuse, don't rewrite)
// We need to recreate just the mesh components since Remotion uses different imports
import { useMemo } from 'react'

gsap.registerPlugin(ScrollTrigger)

// === REUSE LOGO SHAPE FROM REMOTION ===
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

// === EXTRUDED LOGO (same as Remotion) ===
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

// === ORBITING PARTICLES (same as Remotion but with useFrame) ===
function OrbitingParticles({ orbitRadius, particleCount, rotationSpeed, color = colors.cyan.DEFAULT, reverse = false }: {
  orbitRadius: number
  particleCount: number
  rotationSpeed: number
  color?: string
  reverse?: boolean
}) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * rotationSpeed * (reverse ? -1 : 1)
    }
  })

  return (
    <group ref={groupRef}>
      {Array.from({ length: particleCount }).map((_, i) => {
        const angle = (i / particleCount) * Math.PI * 2
        const x = Math.cos(angle) * orbitRadius
        const z = Math.sin(angle) * orbitRadius
        const y = Math.sin(angle * 2 + i) * 0.3

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

// === LOGO COIN (same structure as Remotion LogoCoin) ===
function LogoCoin({ rotationY = 0, rotationX = 0, coinScale = 1, showParticles = true, autoRotate = true, rotationSpeed = 0.3 }: {
  rotationY?: number
  rotationX?: number
  coinScale?: number
  showParticles?: boolean
  autoRotate?: boolean
  rotationSpeed?: number
}) {
  const coinRef = useRef<THREE.Group>(null)

  const coinRadius = 2.0
  const coinThickness = 0.35
  const rimWidth = 0.12
  const goldColor = '#D4AF37'
  const darkGold = '#B8860B'
  const silverColor = '#C0C0C0'

  useFrame((_, delta) => {
    if (autoRotate && coinRef.current) {
      coinRef.current.rotation.y += delta * rotationSpeed
    }
  })

  return (
    <group scale={[coinScale, coinScale, coinScale]}>
      {showParticles && (
        <>
          <OrbitingParticles orbitRadius={3.0} particleCount={8} rotationSpeed={0.5} color={colors.cyan.DEFAULT} />
          <OrbitingParticles orbitRadius={2.6} particleCount={6} rotationSpeed={0.7} color="#D4AF37" reverse />
        </>
      )}

      <group ref={coinRef} rotation={[rotationX, rotationY, 0]}>
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

// === CANVAS WRAPPER ===
function CoinCanvas({ children, cameraPosition = [0, 0, 8] as [number, number, number], showControls = false }: {
  children: React.ReactNode
  cameraPosition?: [number, number, number]
  showControls?: boolean
}) {
  return (
    <div style={{ width: '100%', height: '100%', background: colors.ink }}>
      <Canvas camera={{ position: cameraPosition, fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <directionalLight position={[-5, 5, 5]} intensity={1} />
        <pointLight position={[0, 0, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[3, 3, 3]} intensity={1} color="#FFD700" />
        {children}
        {showControls && <OrbitControls enableZoom={false} />}
      </Canvas>
    </div>
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
    <div className="threejs-scene" style={{
      width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column',
      background: background || `radial-gradient(ellipse at center, #1a1a2e 0%, ${colors.ink} 100%)`,
      position: 'relative', flexShrink: 0,
    }}>
      <div style={{ width: '100%', height: '100%' }}>{children}</div>
      <div style={{ position: 'absolute', bottom: 60, left: 0, right: 0, textAlign: 'center', zIndex: 10 }}>
        <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '28px', fontWeight: typography.fontWeight.bold, color: 'white', marginBottom: '8px' }}>{title}</h3>
        <p style={{ fontFamily: typography.fontFamily.mono, fontSize: '14px', color: colors.gray[500] }}>{subtitle}</p>
      </div>
    </div>
  )
}

// === ANIMATIONS ===

export function CoinSlowSpin() {
  return (
    <Scene title="Slow Spin" subtitle="Elegant continuous rotation">
      <CoinCanvas><LogoCoin autoRotate rotationSpeed={0.3} /></CoinCanvas>
    </Scene>
  )
}

export function CoinFlipReveal() {
  const CoinWithAnimation = () => {
    const coinRef = useRef<THREE.Group>(null)
    const [started, setStarted] = useState(false)

    useEffect(() => {
      if (!coinRef.current || started) return
      setStarted(true)
      const coin = coinRef.current
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 })
      tl.set(coin.rotation, { x: Math.PI / 2 }).set(coin.position, { y: 3 })
        .to(coin.position, { y: 0, duration: 1.2, ease: 'back.out(1.2)' })
        .to(coin.rotation, { x: 0.1, duration: 1.2, ease: 'back.out(1.2)' }, 0)
        .to(coin.rotation, { y: Math.PI, duration: 0.6, ease: 'power2.inOut' }, '+=0.8')
        .to(coin.rotation, { y: Math.PI * 2, duration: 0.6, ease: 'power2.inOut' }, '+=0.5')
        .to(coin.position, { y: 3, duration: 0.8, ease: 'power2.in' }, '+=1')
      return () => { tl.kill() }
    }, [started])

    return <group ref={coinRef}><LogoCoin autoRotate={false} showParticles /></group>
  }

  return (
    <Scene title="Flip Reveal" subtitle="Dramatic entrance">
      <CoinCanvas><CoinWithAnimation /></CoinCanvas>
    </Scene>
  )
}

export function CoinOrbit() {
  return (
    <Scene title="Orbit" subtitle="Drag to rotate">
      <CoinCanvas showControls><LogoCoin autoRotate rotationSpeed={0.1} rotationX={0.2} /></CoinCanvas>
    </Scene>
  )
}

export function CoinBounceDrop() {
  const CoinWithAnimation = () => {
    const coinRef = useRef<THREE.Group>(null)
    const [started, setStarted] = useState(false)

    useEffect(() => {
      if (!coinRef.current || started) return
      setStarted(true)
      const coin = coinRef.current
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 })
      tl.set(coin.position, { y: 5 }).set(coin.rotation, { y: 0, x: 0.4 })
        .to(coin.position, { y: 0, duration: 1.2, ease: 'bounce.out' })
        .to(coin.rotation, { y: Math.PI * 4, x: 0.05, duration: 1.2, ease: 'bounce.out' }, 0)
        .to(coin.rotation, { y: '+=6.28', duration: 3, ease: 'power2.out' })
        .to(coin.position, { y: 5, duration: 0.7, ease: 'power2.in' }, '+=0.5')
      return () => { tl.kill() }
    }, [started])

    return <group ref={coinRef}><LogoCoin autoRotate={false} showParticles /></group>
  }

  return (
    <Scene title="Bounce Drop" subtitle="Physics animation">
      <CoinCanvas cameraPosition={[0, 1, 9]}><CoinWithAnimation /></CoinCanvas>
    </Scene>
  )
}

export function CoinTripleStack() {
  const StackedCoins = () => {
    const refs = [useRef<THREE.Group>(null), useRef<THREE.Group>(null), useRef<THREE.Group>(null)]
    const [started, setStarted] = useState(false)

    useEffect(() => {
      if (refs.some(r => !r.current) || started) return
      setStarted(true)
      const positions = [0, 0.4, 0.8]
      refs.forEach((ref, i) => {
        const coin = ref.current!
        gsap.set(coin.position, { y: 6 })
        gsap.to(coin.position, { y: positions[i], duration: 1, delay: i * 0.25, ease: 'bounce.out', repeat: -1, repeatDelay: 5 })
        gsap.to(coin.rotation, { y: Math.PI * 2, duration: 1, delay: i * 0.25, ease: 'bounce.out', repeat: -1, repeatDelay: 5 })
        gsap.to(coin.rotation, { y: '+=6.28', duration: 15, repeat: -1, ease: 'none', delay: 1.5 })
      })
    }, [started])

    return (
      <>
        {refs.map((ref, i) => (
          <group key={i} ref={ref}><LogoCoin autoRotate={false} showParticles={false} coinScale={0.9 - i * 0.05} /></group>
        ))}
        <OrbitingParticles orbitRadius={3.5} particleCount={10} rotationSpeed={0.4} />
      </>
    )
  }

  return (
    <Scene title="Triple Stack" subtitle="Staggered stack">
      <CoinCanvas cameraPosition={[0, 1.5, 9]}><StackedCoins /></CoinCanvas>
    </Scene>
  )
}

// === HORIZONTAL SCROLL ===
export function CoinShowcaseHorizontal() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!wrapperRef.current || !containerRef.current) return
    const ctx = gsap.context(() => {
      const scenes = containerRef.current?.querySelectorAll('.threejs-scene')
      if (!scenes?.length) return
      gsap.to(scenes, {
        xPercent: -100 * (scenes.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          pin: true,
          scrub: 1.5,
          snap: { snapTo: 1 / (scenes.length - 1), duration: { min: 0.2, max: 0.6 }, ease: 'power2.inOut' },
          end: () => `+=${(scenes.length - 1) * window.innerWidth}`,
        },
      })
    }, wrapperRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapperRef} style={{ overflow: 'hidden' }}>
      <div ref={containerRef} style={{ display: 'flex', width: 'fit-content' }}>
        <CoinSlowSpin />
        <CoinFlipReveal />
        <CoinOrbit />
        <CoinBounceDrop />
        <CoinTripleStack />
      </div>
    </div>
  )
}

export { LogoCoin, CoinCanvas, OrbitingParticles }
