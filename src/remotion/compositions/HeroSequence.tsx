import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Sequence } from 'remotion'
import { colors, typography } from '../../design-system/tokens'

const AnimatedText: React.FC<{ text: string; delay: number }> = ({ text, delay }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  return (
    <span style={{ display: 'inline-block', overflow: 'hidden' }}>
      {text.split('').map((char, i) => {
        const charFrame = frame - delay - i * 2
        const y = spring({
          frame: charFrame,
          fps,
          config: { damping: 15, mass: 0.5, stiffness: 120 },
        })
        const opacity = interpolate(charFrame, [0, 10], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })

        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              transform: `translateY(${(1 - y) * 60}px)`,
              opacity,
              whiteSpace: char === ' ' ? 'pre' : 'normal',
            }}
          >
            {char}
          </span>
        )
      })}
    </span>
  )
}

export const HeroSequence: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Logo animation
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 100 },
  })
  const logoRotation = interpolate(frame, [0, 25], [-180, 0], {
    extrapolateRight: 'clamp',
  })

  // Subtitle fade
  const subtitleOpacity = interpolate(frame, [70, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const subtitleY = interpolate(frame, [70, 90], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // CTA buttons
  const ctaOpacity = interpolate(frame, [100, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const ctaY = interpolate(frame, [100, 120], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // Glow pulse
  const glowOpacity = frame > 30
    ? interpolate(Math.sin((frame - 30) * 0.08), [-1, 1], [0.3, 0.6])
    : 0.3

  // Parallax
  const layer1Y = interpolate(frame, [0, 150], [0, -60])
  const layer2Y = interpolate(frame, [0, 150], [0, -100])

  return (
    <AbsoluteFill
      style={{
        background: colors.ink,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Parallax layers */}
      <div
        style={{
          position: 'absolute',
          top: '5%',
          left: '10%',
          width: 400,
          height: 400,
          background: `radial-gradient(circle, ${colors.cyan.DEFAULT}25 0%, transparent 70%)`,
          borderRadius: '50%',
          filter: 'blur(50px)',
          transform: `translateY(${layer1Y}px)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '25%',
          right: '5%',
          width: 550,
          height: 550,
          background: `radial-gradient(circle, ${colors.blue.DEFAULT}20 0%, transparent 70%)`,
          borderRadius: '50%',
          filter: 'blur(70px)',
          transform: `translateY(${layer2Y}px)`,
        }}
      />

      {/* Grid */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.05,
        }}
      >
        {[...Array(25)].map((_, i) => (
          <line key={`v${i}`} x1={`${i * 4}%`} y1="0" x2={`${i * 4}%`} y2="100%" stroke={colors.cyan.DEFAULT} strokeWidth="1" />
        ))}
        {[...Array(15)].map((_, i) => (
          <line key={`h${i}`} x1="0" y1={`${i * 7}%`} x2="100%" y2={`${i * 7}%`} stroke={colors.cyan.DEFAULT} strokeWidth="1" />
        ))}
      </svg>

      {/* Content */}
      <div style={{ textAlign: 'center', zIndex: 1 }}>
        {/* Logo */}
        <div
          style={{
            marginBottom: 48,
            transform: `scale(${logoScale}) rotate(${logoRotation}deg)`,
            filter: `drop-shadow(0 0 ${35 * glowOpacity}px ${colors.cyan.DEFAULT})`,
          }}
        >
          <img src="/logos/QUSD_ICON_0ECCED.svg" alt="QUSD" style={{ width: 120, height: 'auto' }} />
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 88,
            fontWeight: typography.fontWeight.bold,
            color: 'white',
            lineHeight: 1.05,
            marginBottom: 32,
          }}
        >
          <AnimatedText text="Build the" delay={15} />
          <br />
          <span style={{ color: colors.cyan.DEFAULT }}>
            <AnimatedText text="machine age" delay={35} />
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 24,
            color: colors.gray[400],
            maxWidth: 550,
            margin: '0 auto 48px',
            lineHeight: 1.6,
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
          }}
        >
          Fund robotics. Get funded. In currency that doesn't gamble with your runway.
        </p>

        {/* CTA buttons */}
        <div
          style={{
            display: 'flex',
            gap: 16,
            justifyContent: 'center',
            opacity: ctaOpacity,
            transform: `translateY(${ctaY}px)`,
          }}
        >
          <div
            style={{
              padding: '18px 40px',
              background: colors.cyan.DEFAULT,
              color: colors.ink,
              fontFamily: typography.fontFamily.mono,
              fontSize: 14,
              fontWeight: typography.fontWeight.bold,
              borderRadius: 4,
            }}
          >
            Launch App
          </div>
          <div
            style={{
              padding: '18px 40px',
              background: 'transparent',
              color: 'white',
              fontFamily: typography.fontFamily.mono,
              fontSize: 14,
              border: `1px solid ${colors.gray[600]}`,
              borderRadius: 4,
            }}
          >
            Watch Demo
          </div>
        </div>
      </div>
    </AbsoluteFill>
  )
}
