import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion'
import { colors, typography } from '../../design-system/tokens'

// SVG Icons
const IconLock = ({ size = 32, color = colors.cyan.DEFAULT }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

const IconGlobe = ({ size = 32, color = colors.cyan.DEFAULT }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)

const IconBolt = ({ size = 32, color = colors.cyan.DEFAULT }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
)

const IconChart = ({ size = 32, color = colors.cyan.DEFAULT }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
)

const features = [
  { num: '01', title: 'Stable by design', desc: 'Dollar-pegged. Always.', Icon: IconLock },
  { num: '02', title: 'Borderless', desc: 'Tokyo to Toronto in seconds.', Icon: IconGlobe },
  { num: '03', title: 'Machine-native', desc: 'APIs your robots can call.', Icon: IconBolt },
  { num: '04', title: 'Transparent', desc: 'Real-time reserve proof.', Icon: IconChart },
]

const FeatureCard: React.FC<{
  feature: typeof features[0]
  index: number
  frame: number
  fps: number
}> = ({ feature, index, frame, fps }) => {
  const delay = 20 + index * 15

  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, mass: 0.6, stiffness: 100 },
  })

  const y = interpolate(frame - delay, [0, 20], [80, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  const rotateX = interpolate(frame - delay, [0, 20], [15, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <div
      style={{
        padding: 40,
        background: 'white',
        borderRadius: 24,
        border: `1px solid ${colors.gray[200]}`,
        transform: `scale(${scale}) translateY(${y}px) rotateX(${rotateX}deg)`,
        opacity,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
    >
      <span
        style={{
          fontFamily: typography.fontFamily.mono,
          fontSize: 48,
          fontWeight: typography.fontWeight.bold,
          color: colors.gray[200],
          display: 'block',
          marginBottom: 16,
        }}
      >
        {feature.num}
      </span>
      <div style={{ marginBottom: 16 }}>
        <feature.Icon size={36} color={colors.cyan.DEFAULT} />
      </div>
      <h3
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 22,
          fontWeight: typography.fontWeight.bold,
          color: colors.ink,
          marginBottom: 12,
        }}
      >
        {feature.title}
      </h3>
      <p
        style={{
          fontSize: 16,
          color: colors.gray[500],
          lineHeight: 1.5,
        }}
      >
        {feature.desc}
      </p>
    </div>
  )
}

export const FeatureCards: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Header animation
  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const headerY = interpolate(frame, [0, 20], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill
      style={{
        background: colors.paper,
        padding: 80,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            marginBottom: 60,
            opacity: headerOpacity,
            transform: `translateY(${headerY}px)`,
          }}
        >
          <span
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 14,
              fontWeight: typography.fontWeight.bold,
              color: colors.cyan.DEFAULT,
              letterSpacing: 4,
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: 16,
            }}
          >
            Why QUSD
          </span>
          <h2
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 42,
              fontWeight: typography.fontWeight.bold,
              color: colors.ink,
              maxWidth: 600,
            }}
          >
            Infrastructure for the machine economy.
          </h2>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 32,
          }}
        >
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} frame={frame} fps={fps} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  )
}
