import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion'
import { ThreeCanvas } from '@remotion/three'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { colors } from '../../design-system/tokens'

// QUSD Logo paths converted to Three.js shapes
// Based on the SVG viewBox 0 0 515 318, scaled and centered

function createQUSDLogoShape(): THREE.Shape[] {
  const shapes: THREE.Shape[] = []
  const scale = 0.008 // Scale down from SVG coordinates
  const offsetX = -515 / 2 // Center horizontally
  const offsetY = -318 / 2 // Center vertically

  // Main rounded rectangle (outer)
  const outerShape = new THREE.Shape()

  // Simplified Q shape - outer rounded rect
  const outerPath = [
    { x: 368.661, y: 0 },
    { x: 146.339, y: 0 },
  ]

  // Create the main "Q" letterform shape
  const mainShape = new THREE.Shape()

  // Outer rounded rectangle
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

  // Inner hole (makes it a "Q" shape)
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

  // Horizontal bar through the middle
  const barShape = new THREE.Shape()
  barShape.moveTo((0 + offsetX) * scale, (127 + offsetY) * scale)
  barShape.lineTo((515 + offsetX) * scale, (127 + offsetY) * scale)
  barShape.lineTo((515 + offsetX) * scale, (191 + offsetY) * scale)
  barShape.lineTo((0 + offsetX) * scale, (191 + offsetY) * scale)
  barShape.closePath()
  shapes.push(barShape)

  // Diagonal tail (the Q tail going down-right)
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

// Extruded Logo Mesh
const ExtrudedLogo: React.FC<{
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
  color: string
}> = ({ position, rotation, scale: meshScale, color }) => {
  const shapes = useMemo(() => createQUSDLogoShape(), [])

  const extrudeSettings = useMemo(() => ({
    steps: 2,
    depth: 0.18,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.02,
    bevelSegments: 3,
  }), [])

  return (
    <group position={position} rotation={rotation} scale={[meshScale, -meshScale, meshScale]}>
      {shapes.map((shape, i) => (
        <mesh key={i}>
          <extrudeGeometry args={[shape, extrudeSettings]} />
          <meshStandardMaterial
            color={color}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>
      ))}
    </group>
  )
}

// Orbiting particles around coin
const OrbitingParticles: React.FC<{
  orbitRadius: number
  particleCount: number
  rotationSpeed: number
  frame: number
}> = ({ orbitRadius, particleCount, rotationSpeed, frame }) => {
  return (
    <group>
      {Array.from({ length: particleCount }).map((_, i) => {
        const baseAngle = (i / particleCount) * Math.PI * 2
        const angle = baseAngle + frame * rotationSpeed
        const x = Math.cos(angle) * orbitRadius
        const z = Math.sin(angle) * orbitRadius
        const y = Math.sin(angle * 2 + i) * 0.3 // Slight wave motion

        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color={colors.cyan.DEFAULT}
              metalness={0.7}
              roughness={0.2}
              emissive={colors.cyan.DEFAULT}
              emissiveIntensity={0.5}
            />
          </mesh>
        )
      })}
    </group>
  )
}

// Reeded edge component - creates the grooved edge like real coins
// Coin faces are in XY plane, edge wraps around at radius in XY, spanning Z
const ReededEdge: React.FC<{ radius: number; thickness: number; color: string }> = ({
  radius,
  thickness,
  color
}) => {
  const reedCount = 120 // Number of reeds around the edge

  return (
    <group>
      {Array.from({ length: reedCount }).map((_, i) => {
        const angle = (i / reedCount) * Math.PI * 2
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius

        return (
          <mesh key={i} position={[x, y, 0]} rotation={[Math.PI / 2, 0, angle]}>
            <boxGeometry args={[0.02, thickness * 0.9, 0.04]} />
            <meshStandardMaterial
              color={color}
              metalness={0.95}
              roughness={0.08}
            />
          </mesh>
        )
      })}
    </group>
  )
}

// Realistic coin with proper coin anatomy
const LogoCoin: React.FC<{
  rotationY: number
  rotationX: number
  scale: number
  frame?: number
}> = ({ rotationY, rotationX, scale, frame = 0 }) => {
  // Proper coin proportions - thicker and more substantial
  const coinRadius = 2.0
  const coinThickness = 0.35
  const rimHeight = 0.08
  const rimWidth = 0.12

  // Rich gold color
  const goldColor = "#D4AF37"
  const darkGold = "#B8860B"
  // Bright silver for logo contrast
  const silverColor = "#C0C0C0"

  return (
    <group scale={[scale, scale, scale]}>
      {/* Orbiting particles - outer ring */}
      <OrbitingParticles
        orbitRadius={3.0}
        particleCount={8}
        rotationSpeed={0.03}
        frame={frame}
      />

      {/* Orbiting particles - inner ring, opposite direction */}
      <OrbitingParticles
        orbitRadius={2.6}
        particleCount={6}
        rotationSpeed={-0.04}
        frame={frame}
      />

      {/* The coin itself */}
      <group rotation={[rotationX, rotationY, 0]}>
        {/* Main coin body */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[coinRadius - rimWidth, coinRadius - rimWidth, coinThickness, 128]} />
          <meshStandardMaterial
            color={goldColor}
            metalness={0.85}
            roughness={0.12}
          />
        </mesh>

        {/* Raised rim - front (torus lies flat in XY, position along Z) */}
        <mesh position={[0, 0, coinThickness / 2 - rimHeight / 2]}>
          <torusGeometry args={[coinRadius - rimWidth / 2, rimWidth / 2, 16, 128]} />
          <meshStandardMaterial
            color={darkGold}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Raised rim - back */}
        <mesh position={[0, 0, -coinThickness / 2 + rimHeight / 2]}>
          <torusGeometry args={[coinRadius - rimWidth / 2, rimWidth / 2, 16, 128]} />
          <meshStandardMaterial
            color={darkGold}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Outer edge band */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[coinRadius, coinRadius, coinThickness * 0.7, 128, 1, true]} />
          <meshStandardMaterial
            color={darkGold}
            metalness={0.92}
            roughness={0.08}
            side={2} // DoubleSide
          />
        </mesh>

        {/* Reeded edge */}
        <ReededEdge radius={coinRadius + 0.01} thickness={coinThickness * 0.7} color={goldColor} />

        {/* Inner decorative ring - front */}
        <mesh position={[0, 0, coinThickness / 2 - 0.01]}>
          <torusGeometry args={[1.4, 0.03, 8, 128]} />
          <meshStandardMaterial
            color={darkGold}
            metalness={0.88}
            roughness={0.15}
          />
        </mesh>

        {/* Inner decorative ring - back */}
        <mesh position={[0, 0, -coinThickness / 2 + 0.01]}>
          <torusGeometry args={[1.4, 0.03, 8, 128]} />
          <meshStandardMaterial
            color={darkGold}
            metalness={0.88}
            roughness={0.15}
          />
        </mesh>

        {/* Embossed logo on front - more prominent */}
        <ExtrudedLogo
          position={[0, 0, coinThickness / 2 + 0.02]}
          rotation={[0, 0, 0]}
          scale={0.55}
          color={silverColor}
        />

        {/* Embossed logo on back */}
        <ExtrudedLogo
          position={[0, 0, -(coinThickness / 2 + 0.02)]}
          rotation={[0, Math.PI, 0]}
          scale={0.55}
          color={silverColor}
        />
      </group>
    </group>
  )
}

export const ExtrudedLogoCoin: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps, durationInFrames } = useVideoConfig()

  // Smooth continuous rotation
  const rotationY = interpolate(frame, [0, durationInFrames], [0, Math.PI * 3])

  // Very subtle wobble - keep face toward camera
  const rotationX = interpolate(
    Math.sin(frame * 0.04),
    [-1, 1],
    [-0.05, 0.05]
  )

  // Scale entrance
  const scale = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.7, stiffness: 90 },
  })

  // Floating motion
  const floatY = Math.sin(frame * 0.06) * 0.2

  // Glow pulse
  const glowIntensity = interpolate(
    Math.sin(frame * 0.08),
    [-1, 1],
    [0.4, 0.7]
  )

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: `linear-gradient(135deg, #0d1b2a 0%, #1b263b 50%, #0d1b2a 100%)`,
      }}
    >
      {/* Bright animated background glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          height: 800,
          background: `radial-gradient(circle, ${colors.cyan.DEFAULT}50 0%, ${colors.blue.DEFAULT}20 40%, transparent 60%)`,
          borderRadius: '50%',
          filter: 'blur(60px)',
          opacity: glowIntensity,
        }}
      />

      {/* Secondary glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          right: '20%',
          width: 400,
          height: 400,
          background: `radial-gradient(circle, #FFD70040 0%, transparent 60%)`,
          borderRadius: '50%',
          filter: 'blur(50px)',
        }}
      />

      {/* Left glow */}
      <div
        style={{
          position: 'absolute',
          top: '60%',
          left: '15%',
          width: 350,
          height: 350,
          background: `radial-gradient(circle, ${colors.cyan.DEFAULT}30 0%, transparent 60%)`,
          borderRadius: '50%',
          filter: 'blur(40px)',
        }}
      />

      <ThreeCanvas
        width={1920}
        height={1080}
        camera={{ position: [0, 0, 7], fov: 50 }}
      >
        {/* Much brighter lighting setup */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <directionalLight position={[-5, 5, 5]} intensity={1.5} />
        <directionalLight position={[0, -5, 5]} intensity={1} />
        <pointLight position={[0, 0, 5]} intensity={2} color="#ffffff" />
        <pointLight position={[3, 3, 3]} intensity={1.5} color="#FFD700" />
        <pointLight position={[-3, -3, 3]} intensity={1} color="#0ECCED" />

        <group position={[0, floatY, 0]}>
          <LogoCoin
            rotationY={rotationY}
            rotationX={rotationX}
            scale={scale}
            frame={frame}
          />
        </group>
      </ThreeCanvas>
    </div>
  )
}

// Hero shot - dramatic angle
export const ExtrudedLogoCoinHero: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps, durationInFrames } = useVideoConfig()

  // Camera zoom effect via scale
  const zoomScale = interpolate(frame, [0, 60], [0.6, 1], {
    extrapolateRight: 'clamp',
  })

  // Slow majestic rotation
  const rotationY = interpolate(frame, [0, durationInFrames], [0, Math.PI * 2])

  // Minimal tilt - keep face toward camera
  const rotationX = interpolate(frame, [0, 60], [0.15, 0.05], {
    extrapolateRight: 'clamp',
  })

  const scale = spring({
    frame,
    fps,
    config: { damping: 20, mass: 1, stiffness: 60 },
  })

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: `linear-gradient(135deg, #0d1b2a 0%, #1b263b 40%, #0d1b2a 100%)`,
      }}
    >
      {/* Bright cinematic glow */}
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 1000,
          height: 700,
          background: `radial-gradient(ellipse, ${colors.cyan.DEFAULT}50 0%, ${colors.blue.DEFAULT}25 35%, transparent 55%)`,
          filter: 'blur(70px)',
        }}
      />

      {/* Gold accent glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          right: '25%',
          width: 400,
          height: 400,
          background: `radial-gradient(circle, #FFD70050 0%, transparent 55%)`,
          filter: 'blur(50px)',
        }}
      />

      <ThreeCanvas
        width={1920}
        height={1080}
        camera={{ position: [0, 2, 6], fov: 55 }}
      >
        {/* Bright cinematic lighting */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[8, 8, 5]} intensity={2.5} />
        <directionalLight position={[-8, 5, 5]} intensity={1.8} />
        <directionalLight position={[0, -5, 8]} intensity={1.2} />
        <spotLight position={[0, 5, 5]} intensity={2} angle={0.5} penumbra={0.3} color="#FFD700" />
        <pointLight position={[4, 0, 4]} intensity={1.5} color="#0ECCED" />
        <pointLight position={[-4, 0, 4]} intensity={1.5} color="#FFD700" />

        <group scale={[zoomScale, zoomScale, zoomScale]}>
          <LogoCoin
            rotationY={rotationY}
            rotationX={rotationX}
            scale={scale}
            frame={frame}
          />
        </group>
      </ThreeCanvas>

      {/* Bottom gradient fade */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 200,
          background: `linear-gradient(transparent, ${colors.ink})`,
        }}
      />
    </div>
  )
}

// ============================================================
// VARIATION 2: Slow Spin - Elegant product shot
// ============================================================
export const CoinSlowSpin: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps, durationInFrames } = useVideoConfig()

  const rotationY = interpolate(frame, [0, durationInFrames], [0, Math.PI * 2])
  const rotationX = 0.08 // Minimal tilt - face toward camera

  const scale = spring({
    frame,
    fps,
    config: { damping: 20, mass: 1, stiffness: 50 },
  })

  return (
    <div style={{ width: '100%', height: '100%', background: '#0a0a0a' }}>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 600,
          background: `radial-gradient(circle, ${colors.cyan.DEFAULT}40 0%, transparent 50%)`,
          filter: 'blur(80px)',
        }}
      />

      <ThreeCanvas width={1920} height={1080} camera={{ position: [0, 1, 6], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={2.5} />
        <directionalLight position={[-5, 5, 5]} intensity={1.5} />
        <pointLight position={[0, 0, 5]} intensity={2} color="#ffffff" />
        <spotLight position={[0, 5, 3]} intensity={2} angle={0.6} penumbra={0.3} color="#FFD700" />

        <LogoCoin rotationY={rotationY} rotationX={rotationX} scale={scale} frame={frame} />
      </ThreeCanvas>
    </div>
  )
}

// ============================================================
// VARIATION 3: Flip Reveal - Coin flips to reveal logo
// ============================================================
export const CoinFlipReveal: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Dramatic flip animation
  const flipProgress = spring({
    frame: frame - 20,
    fps,
    config: { damping: 15, mass: 0.8, stiffness: 80 },
  })

  const rotationX = interpolate(flipProgress, [0, 1], [Math.PI / 2, 0.05])
  const rotationY = interpolate(frame, [0, 180], [0, Math.PI * 0.5])

  const scale = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.6, stiffness: 100 },
  })

  const floatY = Math.sin(frame * 0.05) * 0.15

  return (
    <div style={{ width: '100%', height: '100%', background: `linear-gradient(180deg, #1a1a2e 0%, #0d0d1a 100%)` }}>
      <div
        style={{
          position: 'absolute',
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          height: 500,
          background: `radial-gradient(ellipse, ${colors.cyan.DEFAULT}35 0%, transparent 55%)`,
          filter: 'blur(70px)',
        }}
      />

      <ThreeCanvas width={1920} height={1080} camera={{ position: [0, 0, 7], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={2.2} />
        <directionalLight position={[-5, 3, 5]} intensity={1.5} />
        <pointLight position={[0, 3, 4]} intensity={1.8} color="#FFD700" />
        <pointLight position={[0, -2, 3]} intensity={1} color="#0ECCED" />

        <group position={[0, floatY, 0]}>
          <LogoCoin rotationY={rotationY} rotationX={rotationX} scale={scale} frame={frame} />
        </group>
      </ThreeCanvas>
    </div>
  )
}

// ============================================================
// VARIATION 4: Orbit - Camera orbits around coin
// ============================================================
export const CoinOrbit: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps, durationInFrames } = useVideoConfig()

  // Camera orbits while coin stays still
  const cameraAngle = interpolate(frame, [0, durationInFrames], [0, Math.PI * 2])
  const cameraX = Math.sin(cameraAngle) * 6
  const cameraZ = Math.cos(cameraAngle) * 6
  const cameraY = 2 + Math.sin(frame * 0.03) * 0.5

  const scale = spring({
    frame,
    fps,
    config: { damping: 18, mass: 0.8, stiffness: 70 },
  })

  // Slow coin rotation
  const coinRotation = frame * 0.01

  return (
    <div style={{ width: '100%', height: '100%', background: colors.ink }}>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 700,
          height: 700,
          background: `radial-gradient(circle, ${colors.blue.DEFAULT}30 0%, ${colors.cyan.DEFAULT}15 40%, transparent 60%)`,
          filter: 'blur(60px)',
        }}
      />

      <ThreeCanvas
        width={1920}
        height={1080}
        camera={{ position: [cameraX, cameraY, cameraZ], fov: 50 }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={2} />
        <directionalLight position={[-5, 5, -5]} intensity={1.5} />
        <pointLight position={[0, 4, 0]} intensity={2} color="#FFD700" />
        <pointLight position={[0, -3, 0]} intensity={1} color="#0ECCED" />

        <LogoCoin rotationY={coinRotation} rotationX={0.05} scale={scale} frame={frame} />
      </ThreeCanvas>
    </div>
  )
}

// ============================================================
// VARIATION 5: Bounce Drop - Coin drops and bounces
// ============================================================
export const CoinBounceDrop: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Bounce physics
  const dropY = spring({
    frame: frame - 15,
    fps,
    config: { damping: 10, mass: 0.5, stiffness: 120 },
  })

  const y = interpolate(dropY, [0, 1], [4, 0])

  // Spin speeds up as it falls
  const rotationY = interpolate(frame, [0, 60], [0, Math.PI * 4], { extrapolateRight: 'clamp' }) +
    (frame > 60 ? (frame - 60) * 0.02 : 0)

  const rotationX = interpolate(dropY, [0, 1], [0.3, 0.05])

  const scale = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 90 },
  })

  // Shadow scale based on height
  const shadowScale = interpolate(y, [0, 4], [1, 0.3])
  const shadowOpacity = interpolate(y, [0, 4], [0.4, 0.1])

  return (
    <div style={{ width: '100%', height: '100%', background: `linear-gradient(180deg, #0d1b2a 0%, #1a1a2e 100%)` }}>
      {/* Floor reflection hint */}
      <div
        style={{
          position: 'absolute',
          bottom: '25%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 400 * shadowScale,
          height: 100 * shadowScale,
          background: `radial-gradient(ellipse, rgba(0,0,0,${shadowOpacity}) 0%, transparent 70%)`,
          filter: 'blur(20px)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 600,
          background: `radial-gradient(circle, ${colors.cyan.DEFAULT}35 0%, transparent 50%)`,
          filter: 'blur(60px)',
        }}
      />

      <ThreeCanvas width={1920} height={1080} camera={{ position: [0, 1, 7], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 5]} intensity={2.5} />
        <directionalLight position={[-5, 5, 5]} intensity={1.5} />
        <pointLight position={[0, 5, 3]} intensity={2} color="#FFD700" />
        <pointLight position={[3, 0, 3]} intensity={1.2} color="#0ECCED" />

        <group position={[0, y, 0]}>
          <LogoCoin rotationY={rotationY} rotationX={rotationX} scale={scale} frame={frame} />
        </group>
      </ThreeCanvas>
    </div>
  )
}

// ============================================================
// VARIATION 6: Triple Stack - Three coins stacked facing camera
// ============================================================
export const CoinTripleStack: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const baseRotation = frame * 0.02

  // Coin thickness for proper stacking
  const coinThickness = 0.45

  return (
    <div style={{ width: '100%', height: '100%', background: `linear-gradient(180deg, #0d1b2a 0%, ${colors.ink} 100%)` }}>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          height: 600,
          background: `radial-gradient(ellipse, ${colors.cyan.DEFAULT}40 0%, ${colors.blue.DEFAULT}20 40%, transparent 55%)`,
          filter: 'blur(70px)',
        }}
      />

      <ThreeCanvas width={1920} height={1080} camera={{ position: [0, 0.5, 7], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 5]} intensity={2.5} />
        <directionalLight position={[-5, 5, 5]} intensity={1.8} />
        <pointLight position={[0, 3, 4]} intensity={2} color="#FFD700" />
        <pointLight position={[-3, 0, 4]} intensity={1.5} color="#0ECCED" />

        {[0, 1, 2].map((i) => {
          const delay = i * 18
          const coinFrame = frame - delay

          // Scale spring
          const coinScale = spring({
            frame: coinFrame,
            fps,
            config: { damping: 12, mass: 0.5, stiffness: 90 },
          })

          // Drop animation with bounce
          const dropProgress = spring({
            frame: coinFrame,
            fps,
            config: { damping: 10, mass: 0.4, stiffness: 120 },
          })

          // Stack position - each coin sits on top of the previous
          const stackY = i * coinThickness * 0.8
          const startY = 4
          const y = interpolate(dropProgress, [0, 1], [startY, stackY])

          // Slight x offset for visual interest
          const xOffset = (i - 1) * 0.15

          return (
            <group key={i} position={[xOffset, y - 0.5, 0]}>
              <LogoCoin
                rotationY={baseRotation + (i * 0.3)}
                rotationX={0.03}
                scale={coinScale * 0.7}
                frame={frame}
              />
            </group>
          )
        })}
      </ThreeCanvas>
    </div>
  )
}
