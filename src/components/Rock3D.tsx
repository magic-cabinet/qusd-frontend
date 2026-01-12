import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, Float, PresentationControls, ContactShadows } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import * as THREE from 'three'

type RockVariant = 'default' | 'cityscape' | 'floating' | 'hero' | 'minimal'

interface RockModelProps {
  variant?: RockVariant
  autoRotate?: boolean
  rotationSpeed?: number
}

function RockModel({ variant = 'default', autoRotate = true, rotationSpeed = 0.3 }: RockModelProps) {
  const { scene } = useGLTF('/models/ROCK.glb')
  const meshRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += delta * rotationSpeed
    }
  })

  const getScale = () => {
    switch (variant) {
      case 'cityscape': return 15
      case 'hero': return 3
      case 'floating': return 2
      case 'minimal': return 1.5
      default: return 2
    }
  }

  const getPosition = (): [number, number, number] => {
    switch (variant) {
      case 'cityscape': return [0, -8, 0]
      case 'hero': return [0, -0.5, 0]
      case 'floating': return [0, 0, 0]
      case 'minimal': return [0, 0, 0]
      default: return [0, -0.5, 0]
    }
  }

  return (
    <group ref={meshRef} scale={getScale()} position={getPosition()}>
      <primitive object={scene.clone()} />
    </group>
  )
}

interface Rock3DProps {
  variant?: RockVariant
  className?: string
  autoRotate?: boolean
  rotationSpeed?: number
  showShadow?: boolean
  environmentPreset?: 'sunset' | 'dawn' | 'night' | 'warehouse' | 'forest' | 'apartment' | 'studio' | 'city' | 'park' | 'lobby'
  backgroundColor?: string
  interactive?: boolean
}

export default function Rock3D({
  variant = 'default',
  className = '',
  autoRotate = true,
  rotationSpeed = 0.3,
  showShadow = true,
  environmentPreset = 'city',
  backgroundColor = 'transparent',
  interactive = true,
}: Rock3DProps) {
  const getCameraSettings = () => {
    switch (variant) {
      case 'cityscape':
        return { position: [0, 2, 8] as [number, number, number], fov: 45 }
      case 'hero':
        return { position: [0, 0, 5] as [number, number, number], fov: 50 }
      case 'floating':
        return { position: [0, 0, 4] as [number, number, number], fov: 50 }
      case 'minimal':
        return { position: [0, 0, 4] as [number, number, number], fov: 45 }
      default:
        return { position: [0, 0, 5] as [number, number, number], fov: 50 }
    }
  }

  const cameraSettings = getCameraSettings()

  const content = (
    <Suspense fallback={null}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <spotLight position={[-10, 10, -5]} intensity={0.5} color="#0ECCED" />
      <spotLight position={[10, -10, 5]} intensity={0.3} color="#025EC4" />

      {variant === 'floating' ? (
        <Float
          speed={2}
          rotationIntensity={0.5}
          floatIntensity={1}
        >
          <RockModel variant={variant} autoRotate={autoRotate} rotationSpeed={rotationSpeed} />
        </Float>
      ) : (
        <RockModel variant={variant} autoRotate={autoRotate} rotationSpeed={rotationSpeed} />
      )}

      {showShadow && variant !== 'cityscape' && (
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.4}
          scale={10}
          blur={2}
          far={4}
        />
      )}

      <Environment preset={environmentPreset} />
    </Suspense>
  )

  return (
    <div className={`${className}`} style={{ backgroundColor }}>
      <Canvas
        camera={{ position: cameraSettings.position, fov: cameraSettings.fov }}
        shadows
        gl={{ antialias: true, alpha: true }}
      >
        {interactive ? (
          <PresentationControls
            global
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            {content}
          </PresentationControls>
        ) : (
          content
        )}
      </Canvas>
    </div>
  )
}

// Cityscape variant - immersive view like being inside a city made of the rock
export function Rock3DCityscape({ className = '' }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={{ position: [0, 1, 4], fov: 60 }}
        shadows
        gl={{ antialias: true }}
        style={{ background: 'linear-gradient(180deg, #030812 0%, #020764 50%, #043780 100%)' }}
      >
        <Suspense fallback={null}>
          <fog attach="fog" args={['#020764', 5, 30]} />
          <ambientLight intensity={0.2} />
          <directionalLight position={[5, 10, 5]} intensity={0.8} color="#0ECCED" castShadow />
          <spotLight position={[-5, 8, -5]} intensity={1} color="#025EC4" angle={0.5} />
          <pointLight position={[0, 5, 0]} intensity={0.5} color="#0ECCED" />

          {/* Main towering rock - like a skyscraper */}
          <group position={[0, -5, -5]} scale={20}>
            <RockModelStatic />
          </group>

          {/* Secondary rocks - surrounding buildings */}
          <group position={[-8, -6, -8]} scale={15} rotation={[0, 0.5, 0]}>
            <RockModelStatic />
          </group>
          <group position={[10, -7, -10]} scale={18} rotation={[0, -0.3, 0]}>
            <RockModelStatic />
          </group>
          <group position={[-12, -8, -15]} scale={22} rotation={[0, 0.8, 0]}>
            <RockModelStatic />
          </group>
          <group position={[15, -9, -18]} scale={25} rotation={[0, -0.6, 0]}>
            <RockModelStatic />
          </group>

          {/* Foreground rocks - close buildings */}
          <group position={[-3, -4, 2]} scale={8} rotation={[0, 0.2, 0]}>
            <RockModelStatic />
          </group>
          <group position={[4, -5, 1]} scale={10} rotation={[0, -0.4, 0]}>
            <RockModelStatic />
          </group>

          <Environment preset="night" />
        </Suspense>
      </Canvas>

      {/* Overlay gradient for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(3, 8, 18, 0.3) 100%)',
        }}
      />
    </div>
  )
}

// Static rock model without animation for cityscape
function RockModelStatic() {
  const { scene } = useGLTF('/models/ROCK.glb')
  return <primitive object={scene.clone()} />
}

// Preload the model
useGLTF.preload('/models/ROCK.glb')
