import { type ThemeVariation } from './variations'

interface ThemePreviewProps {
  theme: ThemeVariation
}

export function ThemePreview({ theme }: ThemePreviewProps) {
  const { colors, typography, style } = theme

  return (
    <div
      style={{
        backgroundColor: colors.background.main,
        color: colors.text.primary,
        fontFamily: typography.bodyFont,
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          backgroundColor: colors.background.card,
          borderBottom: `1px solid ${colors.border}`,
          padding: '16px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src={theme.logos.dark} alt="QUSD" style={{ height: '32px' }} />
        </div>

        <div style={{ display: 'flex', gap: '24px', fontSize: '14px' }}>
          {['Protocol', 'Features', 'Docs'].map((item) => (
            <span key={item} style={{ color: colors.text.secondary, cursor: 'pointer' }}>
              {item}
            </span>
          ))}
        </div>

        <button
          style={{
            background: colors.gradient,
            color: colors.text.inverse,
            border: 'none',
            padding: '10px 20px',
            borderRadius: style.borderRadius,
            fontFamily: typography.headingFont,
            fontSize: '13px',
            cursor: 'pointer',
          }}
        >
          Launch App →
        </button>
      </nav>

      {/* Hero Section */}
      <section style={{ padding: '80px 32px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ maxWidth: '700px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              backgroundColor: colors.background.card,
              border: `1px solid ${colors.border}`,
              borderRadius: '9999px',
              marginBottom: '24px',
              fontSize: '12px',
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: colors.gradient }} />
            <span style={{ color: colors.text.secondary }}>X402 Payment Protocol</span>
          </div>

          <h1
            style={{
              fontFamily: typography.headingFont,
              fontSize: '64px',
              fontWeight: 700,
              lineHeight: 0.95,
              marginBottom: '24px',
            }}
          >
            <span style={{ color: colors.text.muted }}>The</span>
            <br />
            Machine
            <br />
            <span style={{ position: 'relative', display: 'inline-block' }}>
              Economy
              <span
                style={{
                  position: 'absolute',
                  bottom: '-4px',
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: colors.gradient,
                  borderRadius: '2px',
                }}
              />
            </span>
          </h1>

          <p style={{ fontSize: '16px', color: colors.text.secondary, lineHeight: 1.6, marginBottom: '32px' }}>
            Infrastructure for autonomous transactions between AI agents, robotics, and IoT systems.
          </p>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              style={{
                background: colors.gradient,
                color: colors.text.inverse,
                border: 'none',
                padding: '14px 28px',
                borderRadius: style.borderRadius,
                fontFamily: typography.headingFont,
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Start Building →
            </button>
            <button
              style={{
                background: 'transparent',
                color: colors.text.primary,
                border: `2px solid ${colors.text.primary}`,
                padding: '14px 28px',
                borderRadius: style.borderRadius,
                fontFamily: typography.headingFont,
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Documentation
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        style={{
          backgroundColor: colors.background.card,
          borderTop: `1px solid ${colors.border}`,
          borderBottom: `1px solid ${colors.border}`,
          padding: '64px 32px',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: typography.headingFont,
              fontSize: '36px',
              fontWeight: 700,
              marginBottom: '48px',
            }}
          >
            Technical Specifications
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {[
              { code: 'F01', title: 'Gasless Transactions', desc: 'Zero gas fees via EIP-2612' },
              { code: 'F02', title: 'Agent-Native', desc: 'Built for AI & robotics' },
              { code: 'F03', title: 'Programmable', desc: 'Policy engine built-in' },
              { code: 'F04', title: 'Multi-Chain', desc: '4+ chains supported' },
            ].map((feature) => (
              <div
                key={feature.code}
                style={{
                  padding: '24px',
                  backgroundColor: colors.background.main,
                  border: `1px solid ${colors.border}`,
                  borderRadius: style.borderRadius,
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `1px solid ${colors.border}`,
                    borderRadius: style.cardStyle === 'sharp' ? '4px' : '12px',
                    marginBottom: '16px',
                    fontFamily: typography.headingFont,
                    fontSize: '12px',
                    color: colors.text.secondary,
                  }}
                >
                  {feature.code}
                </div>
                <h3 style={{ fontFamily: typography.headingFont, fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>
                  {feature.title}
                </h3>
                <p style={{ fontSize: '14px', color: colors.text.secondary }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section style={{ backgroundColor: colors.background.dark, padding: '64px 32px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: typography.headingFont,
              fontSize: '36px',
              fontWeight: 700,
              color: colors.text.inverse,
              marginBottom: '48px',
            }}
          >
            Network Statistics
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {[
              { value: '$50M', label: 'Total Value Locked' },
              { value: '35K', label: 'Transactions' },
              { value: '20K', label: 'Active Agents' },
              { value: '127', label: 'Integrations' },
            ].map((metric) => (
              <div
                key={metric.label}
                style={{
                  padding: '24px',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderRadius: style.borderRadius,
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div
                  style={{
                    fontFamily: typography.headingFont,
                    fontSize: '40px',
                    fontWeight: 700,
                    color: colors.text.inverse,
                    marginBottom: '8px',
                  }}
                >
                  {metric.value}
                </div>
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: colors.background.card,
          borderTop: `1px solid ${colors.border}`,
          padding: '48px 32px',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src={theme.logos.dark} alt="QUSD" style={{ height: '24px' }} />
          </div>
          <span style={{ fontSize: '13px', color: colors.text.muted }}>
            © 2025 QUSD Protocol. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  )
}

export default ThemePreview
