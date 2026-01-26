import { useCurrentFrame, useVideoConfig, spring, interpolate, staticFile } from 'remotion'
import { ThreeCanvas } from '@remotion/three'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { colors } from '../../design-system/tokens'

// Coin mesh component
const CoinMesh: React.FC<{
  rotationY: number
  rotationX: number
  scale: number
}> = ({ rotationY, rotationX, scale }) => {
  const meshRef = useRef<THREE.Mesh>(null)

  // Load the QUSD logo as a texture
  const texture = useLoader(THREE.TextureLoader, staticFile('logos/QUSD_ICON_0ECCED.svg'))

  // Create coin geometry - cylinder with beveled edges
  const geometry = useMemo(() => {
    return new THREE.CylinderGeometry(2, 2, 0.2, 64, 1, false)
  }, [])

  // Gold/metallic material for the coin edge
  const edgeMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#FFD700'),
      metalness: 0.9,
      roughness: 0.1,
    })
  }, [])

  // Face material with logo
  const faceMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(colors.cyan.DEFAULT),
      metalness: 0.7,
      roughness: 0.2,
      map: texture,
    })
  }, [texture])

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={[rotationX, rotationY, 0]}
      scale={[scale, scale, scale]}
    >
      <meshStandardMaterial
        color={new THREE.Color('#FFD700')}
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  )
}

// Simple coin without texture loading issues
const SimpleCoin: React.FC<{
  rotationY: number
  rotationX: number
  scale: number
}> = ({ rotationY, rotationX, scale }) => {
  const meshRef = useRef<THREE.Group>(null)

  return (
    <group ref={meshRef} rotation={[rotationX, rotationY, 0]} scale={[scale, scale, scale]}>
      {/* Main coin body */}
      <mesh>
        <cylinderGeometry args={[2, 2, 0.25, 64]} />
        <meshStandardMaterial
          color="#0ECCED"
          metalness={0.8}
          roughness={0.15}
        />
      </mesh>

      {/* Gold rim */}
      <mesh>
        <torusGeometry args={[2, 0.08, 16, 64]} />
        <meshStandardMaterial
          color="#FFD700"
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>

      {/* Inner ring detail */}
      <mesh position={[0, 0.13, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.03, 16, 64]} />
        <meshStandardMaterial
          color="#FFD700"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Q letter on front */}
      <mesh position={[0, 0.14, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.02, 64]} />
        <meshStandardMaterial
          color="#025EC4"
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>

      {/* Center circle */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.02, 32]} />
        <meshStandardMaterial
          color="#0ECCED"
          metalness={0.7}
          roughness={0.2}
          emissive="#0ECCED"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Back face */}
      <mesh position={[0, -0.14, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.02, 64]} />
        <meshStandardMaterial
          color="#025EC4"
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
    </group>
  )
}

export const Coin3D: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps, durationInFrames } = useVideoConfig()

  // Coin spin animation
  const rotationY = interpolate(frame, [0, durationInFrames], [0, Math.PI * 4])

  // Slight tilt
  const rotationX = interpolate(
    Math.sin(frame * 0.05),
    [-1, 1],
    [-0.2, 0.2]
  )

  // Scale entrance
  const scale = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.8, stiffness: 80 },
  })

  // Floating motion
  const floatY = Math.sin(frame * 0.08) * 0.3

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: colors.ink,
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 600,
          background: `radial-gradient(circle, ${colors.cyan.DEFAULT}30 0%, transparent 60%)`,
          borderRadius: '50%',
          filter: 'blur(40px)',
        }}
      />

      <ThreeCanvas
        width={1920}
        height={1080}
        camera={{ position: [0, 2, 8], fov: 50 }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, 3, -5]} intensity={0.5} color="#0ECCED" />
        <pointLight position={[0, 3, 0]} intensity={0.8} color="#FFD700" />

        <group position={[0, floatY, 0]}>
          <SimpleCoin rotationY={rotationY} rotationX={rotationX} scale={scale} />
        </group>
      </ThreeCanvas>
    </div>
  )
}

// Multiple coins composition
export const CoinShower: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps, durationInFrames } = useVideoConfig()

  const coins = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 10,
      z: (Math.random() - 0.5) * 6,
      delay: i * 8,
      speed: 0.8 + Math.random() * 0.4,
      rotationOffset: Math.random() * Math.PI * 2,
    }))
  }, [])

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: colors.ink,
      }}
    >
      {/* Background gradients */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '20%',
          width: 500,
          height: 500,
          background: `radial-gradient(circle, ${colors.cyan.DEFAULT}20 0%, transparent 60%)`,
          borderRadius: '50%',
          filter: 'blur(60px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '20%',
          width: 400,
          height: 400,
          background: `radial-gradient(circle, ${colors.blue.DEFAULT}20 0%, transparent 60%)`,
          borderRadius: '50%',
          filter: 'blur(50px)',
        }}
      />

      <ThreeCanvas
        width={1920}
        height={1080}
        camera={{ position: [0, 0, 15], fov: 60 }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <directionalLight position={[-5, 5, -5]} intensity={0.4} color="#0ECCED" />
        <pointLight position={[0, 5, 0]} intensity={0.6} color="#FFD700" />

        {coins.map((coin) => {
          const coinFrame = frame - coin.delay
          if (coinFrame < 0) return null

          const y = interpolate(
            coinFrame,
            [0, durationInFrames],
            [8, -8]
          )

          const rotationY = coinFrame * 0.15 * coin.speed + coin.rotationOffset
          const rotationX = Math.sin(coinFrame * 0.1) * 0.3

          const scale = spring({
            frame: coinFrame,
            fps,
            config: { damping: 15, mass: 0.5, stiffness: 100 },
          })

          return (
            <group key={coin.id} position={[coin.x, y, coin.z]}>
              <SimpleCoin
                rotationY={rotationY}
                rotationX={rotationX}
                scale={scale * 0.4}
              />
            </group>
          )
        })}
      </ThreeCanvas>
    </div>
  )
}

// Stacked coins
export const CoinStack: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const stackCount = 5

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: colors.ink,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 700,
          height: 700,
          background: `radial-gradient(circle, ${colors.cyan.DEFAULT}25 0%, transparent 55%)`,
          borderRadius: '50%',
          filter: 'blur(50px)',
        }}
      />

      <ThreeCanvas
        width={1920}
        height={1080}
        camera={{ position: [4, 4, 8], fov: 45 }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[8, 8, 5]} intensity={1.1} />
        <directionalLight position={[-4, 4, -4]} intensity={0.5} color="#0ECCED" />
        <pointLight position={[0, 6, 0]} intensity={0.7} color="#FFD700" />

        {Array.from({ length: stackCount }, (_, i) => {
          const delay = i * 10
          const coinFrame = frame - delay

          const y = spring({
            frame: coinFrame,
            fps,
            config: { damping: 12, mass: 0.6, stiffness: 80 },
          })

          const targetY = i * 0.3 - 0.6

          const rotationY = frame * 0.02 + (i * Math.PI) / stackCount

          return (
            <group key={i} position={[0, interpolate(y, [0, 1], [5, targetY]), 0]}>
              <SimpleCoin
                rotationY={rotationY}
                rotationX={Math.PI / 2}
                scale={0.5}
              />
            </group>
          )
        })}
      </ThreeCanvas>
    </div>
  )
}
