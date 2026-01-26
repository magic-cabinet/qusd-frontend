import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion'
import { colors } from '../../design-system/tokens'

export const LogoReveal: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Logo scale animation
  const logoScale = spring({
    frame,
    fps,
    config: {
      damping: 12,
      mass: 0.5,
      stiffness: 100,
    },
  })

  // Rotation
  const rotation = interpolate(frame, [0, 30], [-180, 0], {
    extrapolateRight: 'clamp',
  })

  // Glow pulse (after initial animation)
  const glowOpacity = frame > 40
    ? interpolate(
        Math.sin((frame - 40) * 0.1),
        [-1, 1],
        [0.3, 0.7]
      )
    : 0.3

  // Background gradient layers
  const layer1Y = interpolate(frame, [0, 90], [0, -50])
  const layer2Y = interpolate(frame, [0, 90], [0, -80])

  return (
    <AbsoluteFill
      style={{
        background: colors.ink,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Parallax gradient layers */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '15%',
          width: 400,
          height: 400,
          background: `radial-gradient(circle, ${colors.cyan.DEFAULT}25 0%, transparent 70%)`,
          borderRadius: '50%',
          filter: 'blur(60px)',
          transform: `translateY(${layer1Y}px)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '30%',
          right: '10%',
          width: 500,
          height: 500,
          background: `radial-gradient(circle, ${colors.blue.DEFAULT}20 0%, transparent 70%)`,
          borderRadius: '50%',
          filter: 'blur(80px)',
          transform: `translateY(${layer2Y}px)`,
        }}
      />

      {/* Grid lines */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.06,
        }}
      >
        {[...Array(25)].map((_, i) => (
          <line
            key={`v${i}`}
            x1={`${i * 4}%`}
            y1="0"
            x2={`${i * 4}%`}
            y2="100%"
            stroke={colors.cyan.DEFAULT}
            strokeWidth="1"
          />
        ))}
        {[...Array(15)].map((_, i) => (
          <line
            key={`h${i}`}
            x1="0"
            y1={`${i * 7}%`}
            x2="100%"
            y2={`${i * 7}%`}
            stroke={colors.cyan.DEFAULT}
            strokeWidth="1"
          />
        ))}
      </svg>

      {/* Logo */}
      <div
        style={{
          transform: `scale(${logoScale}) rotate(${rotation}deg)`,
          filter: `drop-shadow(0 0 ${40 * glowOpacity}px ${colors.cyan.DEFAULT})`,
        }}
      >
        <img
          src="/logos/QUSD_ICON_0ECCED.svg"
          alt="QUSD"
          style={{
            width: 200,
            height: 'auto',
          }}
        />
      </div>
    </AbsoluteFill>
  )
}
