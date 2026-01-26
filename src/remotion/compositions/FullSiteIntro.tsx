import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Sequence } from 'remotion'
import { colors, typography } from '../../design-system/tokens'

// SVG Icons
const IconTarget = ({ size = 48, color = colors.cyan.DEFAULT }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
)

const IconDollar = ({ size = 48, color = colors.cyan.DEFAULT }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
)

const IconWorld = ({ size = 48, color = colors.cyan.DEFAULT }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)

const IconRobot = ({ size = 48, color = colors.cyan.DEFAULT }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4" />
    <circle cx="8" cy="16" r="1" fill={color} />
    <circle cx="16" cy="16" r="1" fill={color} />
  </svg>
)

const steps = [
  { num: '01', title: 'Set a goal', Icon: IconTarget, color: colors.cyan.DEFAULT },
  { num: '02', title: 'Fund in QUSD', Icon: IconDollar, color: colors.blue.DEFAULT },
  { num: '03', title: 'Build anywhere', Icon: IconWorld, color: colors.cyan.light },
  { num: '04', title: 'Machines transact', Icon: IconRobot, color: colors.blue.light },
]

// Hero Scene
const HeroScene: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 100 },
  })
  const logoRotation = interpolate(frame, [0, 25], [-180, 0], { extrapolateRight: 'clamp' })
  const glowOpacity = frame > 30 ? interpolate(Math.sin((frame - 30) * 0.08), [-1, 1], [0.3, 0.6]) : 0.3

  const titleOpacity = interpolate(frame, [15, 35], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const titleY = interpolate(frame, [15, 35], [60, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  return (
    <AbsoluteFill
      style={{
        background: colors.ink,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Background elements */}
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
        }}
      />

      <div style={{ textAlign: 'center', zIndex: 1 }}>
        <div
          style={{
            marginBottom: 40,
            transform: `scale(${logoScale}) rotate(${logoRotation}deg)`,
            filter: `drop-shadow(0 0 ${35 * glowOpacity}px ${colors.cyan.DEFAULT})`,
          }}
        >
          <img src="/logos/QUSD_ICON_0ECCED.svg" alt="QUSD" style={{ width: 120 }} />
        </div>

        <h1
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 80,
            fontWeight: 700,
            color: 'white',
            lineHeight: 1.05,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          Build the<br />
          <span style={{ color: colors.cyan.DEFAULT }}>machine age</span>
        </h1>
      </div>
    </AbsoluteFill>
  )
}

// Steps Scene
const StepsScene: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  return (
    <AbsoluteFill
      style={{
        background: colors.ink,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at center, ${colors.cyan.DEFAULT}08 0%, transparent 60%)`,
        }}
      />

      <div style={{ display: 'flex', gap: 48, zIndex: 1 }}>
        {steps.map((step, i) => {
          const delay = i * 20
          const scale = spring({
            frame: frame - delay,
            fps,
            config: { damping: 14, mass: 0.5, stiffness: 100 },
          })
          const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })

          return (
            <div
              key={i}
              style={{
                textAlign: 'center',
                opacity,
                transform: `scale(${scale})`,
              }}
            >
              <div style={{ marginBottom: 16 }}>
                <step.Icon size={56} color={step.color} />
              </div>
              <span
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: 48,
                  fontWeight: 700,
                  color: step.color,
                  opacity: 0.3,
                  display: 'block',
                  marginBottom: 8,
                }}
              >
                {step.num}
              </span>
              <h3
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: 24,
                  fontWeight: 700,
                  color: 'white',
                }}
              >
                {step.title}
              </h3>
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

// CTA Scene
const CTAScene: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 10, mass: 0.4, stiffness: 80 },
  })
  const glowOpacity = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.4, 0.8])

  const textOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const textY = interpolate(frame, [20, 40], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  const ctaOpacity = interpolate(frame, [50, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  return (
    <AbsoluteFill
      style={{
        background: colors.ink,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '20%',
          width: 400,
          height: 400,
          background: `radial-gradient(circle, ${colors.cyan.DEFAULT}15 0%, transparent 70%)`,
          borderRadius: '50%',
          filter: 'blur(60px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '15%',
          width: 350,
          height: 350,
          background: `radial-gradient(circle, ${colors.blue.DEFAULT}15 0%, transparent 70%)`,
          borderRadius: '50%',
          filter: 'blur(50px)',
        }}
      />

      <div style={{ textAlign: 'center', zIndex: 1 }}>
        <div
          style={{
            marginBottom: 40,
            transform: `scale(${logoScale})`,
            filter: `drop-shadow(0 0 ${50 * glowOpacity}px ${colors.cyan.DEFAULT})`,
          }}
        >
          <img src="/logos/QUSD_ICON_0ECCED.svg" alt="QUSD" style={{ width: 100 }} />
        </div>

        <div
          style={{
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
          }}
        >
          <h2
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 56,
              fontWeight: 700,
              color: 'white',
              marginBottom: 20,
            }}
          >
            The future is funded.
          </h2>
          <p
            style={{
              fontSize: 22,
              color: colors.gray[400],
              marginBottom: 40,
            }}
          >
            Join the builders making machines work.
          </p>
        </div>

        <div
          style={{
            padding: '20px 56px',
            background: colors.cyan.DEFAULT,
            color: colors.ink,
            fontFamily: typography.fontFamily.mono,
            fontSize: 16,
            fontWeight: 700,
            borderRadius: 4,
            display: 'inline-block',
            opacity: ctaOpacity,
            boxShadow: `0 0 30px ${colors.cyan.DEFAULT}40`,
          }}
        >
          Get Started
        </div>
      </div>
    </AbsoluteFill>
  )
}

export const FullSiteIntro: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={100}>
        <HeroScene frame={frame} fps={fps} />
      </Sequence>
      <Sequence from={100} durationInFrames={100}>
        <StepsScene frame={frame - 100} fps={fps} />
      </Sequence>
      <Sequence from={200} durationInFrames={100}>
        <CTAScene frame={frame - 200} fps={fps} />
      </Sequence>
    </AbsoluteFill>
  )
}
