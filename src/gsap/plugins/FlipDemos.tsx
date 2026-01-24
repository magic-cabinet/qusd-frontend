import { useRef, useState } from 'react'
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import { colors, typography } from '../../design-system/tokens'
import { Logo } from '../components/Logo'

// Register plugin
gsap.registerPlugin(Flip)

// 1. Grid to List Layout Change
export function FlipGridToList() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isGrid, setIsGrid] = useState(true)

  const handleToggle = () => {
    if (!containerRef.current) return

    const items = containerRef.current.querySelectorAll('.flip-item')
    const state = Flip.getState(items)

    setIsGrid(!isGrid)

    // After React re-renders, animate to new positions
    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.6,
        ease: 'power2.inOut',
        stagger: 0.05,
        absolute: true,
      })
    })
  }

  const chains = [
    { name: 'Ethereum', color: '#627EEA' },
    { name: 'Base', color: '#0052FF' },
    { name: 'Arbitrum', color: '#28A0F0' },
    { name: 'Solana', color: '#00FFA3' },
  ]

  return (
    <div style={{ padding: '40px' }}>
      <button
        onClick={handleToggle}
        style={{
          padding: '12px 24px',
          background: colors.ink,
          color: 'white',
          fontFamily: typography.fontFamily.mono,
          fontSize: typography.fontSize.sm,
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          marginBottom: '24px',
        }}
      >
        Toggle {isGrid ? 'List' : 'Grid'} View
      </button>

      <div
        ref={containerRef}
        style={{
          display: isGrid ? 'grid' : 'flex',
          gridTemplateColumns: isGrid ? 'repeat(2, 1fr)' : undefined,
          flexDirection: isGrid ? undefined : 'column',
          gap: '16px',
          maxWidth: '500px',
        }}
      >
        {chains.map((chain) => (
          <div
            key={chain.name}
            className="flip-item"
            data-flip-id={chain.name}
            style={{
              padding: '24px',
              background: 'white',
              borderRadius: '12px',
              border: `1px solid ${colors.gray[200]}`,
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: chain.color,
            }} />
            <span style={{
              fontFamily: typography.fontFamily.mono,
              fontWeight: typography.fontWeight.bold,
            }}>
              {chain.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// 2. Card Expand/Collapse
export function FlipCardExpand() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleExpand = (id: string) => {
    if (!containerRef.current) return

    const card = containerRef.current.querySelector(`[data-flip-id="${id}"]`)
    if (!card) return

    const state = Flip.getState(card)

    setExpandedId(expandedId === id ? null : id)

    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.5,
        ease: 'power2.inOut',
        absolute: true,
      })
    })
  }

  const features = [
    { id: 'speed', title: 'Lightning Fast', desc: 'Sub-second transaction finality across all supported chains.', icon: '⚡' },
    { id: 'secure', title: 'Battle Tested', desc: 'Audited by leading security firms with no critical issues.', icon: '🛡️' },
    { id: 'open', title: 'Open Source', desc: 'Fully transparent codebase. MIT licensed.', icon: '📖' },
  ]

  return (
    <div ref={containerRef} style={{ padding: '40px', maxWidth: '600px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {features.map((feature) => (
          <div
            key={feature.id}
            data-flip-id={feature.id}
            onClick={() => handleExpand(feature.id)}
            style={{
              padding: expandedId === feature.id ? '32px' : '20px',
              background: expandedId === feature.id ? colors.ink : 'white',
              color: expandedId === feature.id ? 'white' : colors.ink,
              borderRadius: '16px',
              border: `1px solid ${colors.gray[200]}`,
              cursor: 'pointer',
              transition: 'background 0.3s, color 0.3s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '24px' }}>{feature.icon}</span>
              <h3 style={{
                fontFamily: typography.fontFamily.mono,
                fontSize: typography.fontSize.lg,
                fontWeight: typography.fontWeight.bold,
              }}>
                {feature.title}
              </h3>
            </div>
            {expandedId === feature.id && (
              <p style={{
                marginTop: '16px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: typography.fontSize.base,
                color: colors.gray[400],
                lineHeight: typography.lineHeight.relaxed,
              }}>
                {feature.desc}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// 3. Shuffle Animation
export function FlipShuffle() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [items, setItems] = useState(['ETH', 'BASE', 'ARB', 'SOL', 'QUSD', 'MATIC'])

  const handleShuffle = () => {
    if (!containerRef.current) return

    const elements = containerRef.current.querySelectorAll('.shuffle-item')
    const state = Flip.getState(elements)

    // Fisher-Yates shuffle
    const shuffled = [...items]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    setItems(shuffled)

    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.6,
        ease: 'power2.inOut',
        stagger: 0.03,
        absolute: true,
      })
    })
  }

  return (
    <div style={{ padding: '40px' }}>
      <button
        onClick={handleShuffle}
        style={{
          padding: '12px 24px',
          background: colors.gradient.primary,
          color: 'white',
          fontFamily: typography.fontFamily.mono,
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.bold,
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          marginBottom: '24px',
        }}
      >
        Shuffle
      </button>

      <div
        ref={containerRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          maxWidth: '400px',
        }}
      >
        {items.map((item) => (
          <div
            key={item}
            className="shuffle-item"
            data-flip-id={item}
            style={{
              padding: '24px',
              background: item === 'QUSD' ? colors.gradient.primary : colors.gray[100],
              color: item === 'QUSD' ? 'white' : colors.ink,
              borderRadius: '12px',
              textAlign: 'center',
              fontFamily: typography.fontFamily.mono,
              fontWeight: typography.fontWeight.bold,
              fontSize: typography.fontSize.sm,
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

// 4. Logo Container Move
export function FlipLogoMove() {
  const [position, setPosition] = useState<'left' | 'center' | 'right'>('center')
  const logoRef = useRef<HTMLImageElement>(null)

  const handleMove = (newPos: 'left' | 'center' | 'right') => {
    if (!logoRef.current) return

    const state = Flip.getState(logoRef.current)
    setPosition(newPos)

    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.5,
        ease: 'back.out(1.7)',
      })
    })
  }

  return (
    <div style={{ padding: '40px' }}>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
        {(['left', 'center', 'right'] as const).map((pos) => (
          <button
            key={pos}
            onClick={() => handleMove(pos)}
            style={{
              padding: '10px 20px',
              background: position === pos ? colors.ink : 'white',
              color: position === pos ? 'white' : colors.ink,
              fontFamily: typography.fontFamily.mono,
              fontSize: typography.fontSize.xs,
              textTransform: 'uppercase',
              border: `1px solid ${colors.gray[200]}`,
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            {pos}
          </button>
        ))}
      </div>

      <div style={{
        display: 'flex',
        justifyContent: position === 'left' ? 'flex-start' : position === 'right' ? 'flex-end' : 'center',
        padding: '40px',
        background: colors.gray[100],
        borderRadius: '16px',
        minHeight: '200px',
        alignItems: 'center',
      }}>
        <Logo
          ref={logoRef}
          variant="horizontal"
          color="dark"
          size={200}
          data-flip-id="logo"
        />
      </div>
    </div>
  )
}

// 5. Filter Animation
export function FlipFilter() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState<'all' | 'active' | 'coming'>('all')

  const chains = [
    { name: 'Ethereum', status: 'active' },
    { name: 'Base', status: 'active' },
    { name: 'Arbitrum', status: 'active' },
    { name: 'Solana', status: 'coming' },
    { name: 'Polygon', status: 'coming' },
    { name: 'Optimism', status: 'coming' },
  ]

  const handleFilter = (newFilter: 'all' | 'active' | 'coming') => {
    if (!containerRef.current) return

    const items = containerRef.current.querySelectorAll('.filter-item')
    const state = Flip.getState(items)

    setFilter(newFilter)

    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.5,
        ease: 'power2.inOut',
        absolute: true,
        scale: true,
        onEnter: (elements) => {
          gsap.fromTo(elements, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.3 })
        },
        onLeave: (elements) => {
          gsap.to(elements, { opacity: 0, scale: 0, duration: 0.3 })
        },
      })
    })
  }

  const filteredChains = chains.filter(
    (chain) => filter === 'all' || chain.status === filter
  )

  return (
    <div style={{ padding: '40px' }}>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        {(['all', 'active', 'coming'] as const).map((f) => (
          <button
            key={f}
            onClick={() => handleFilter(f)}
            style={{
              padding: '10px 20px',
              background: filter === f ? colors.cyan.DEFAULT : 'white',
              color: filter === f ? 'white' : colors.ink,
              fontFamily: typography.fontFamily.mono,
              fontSize: typography.fontSize.xs,
              textTransform: 'uppercase',
              border: `1px solid ${filter === f ? colors.cyan.DEFAULT : colors.gray[200]}`,
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            {f === 'coming' ? 'Coming Soon' : f}
          </button>
        ))}
      </div>

      <div
        ref={containerRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          maxWidth: '500px',
        }}
      >
        {filteredChains.map((chain) => (
          <div
            key={chain.name}
            className="filter-item"
            data-flip-id={chain.name}
            style={{
              padding: '20px',
              background: chain.status === 'active' ? 'white' : colors.gray[50],
              borderRadius: '12px',
              border: `1px solid ${chain.status === 'active' ? colors.cyan.DEFAULT : colors.gray[200]}`,
              textAlign: 'center',
            }}
          >
            <span style={{
              fontFamily: typography.fontFamily.mono,
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.bold,
              color: chain.status === 'active' ? colors.ink : colors.gray[400],
            }}>
              {chain.name}
            </span>
            {chain.status === 'coming' && (
              <span style={{
                display: 'block',
                marginTop: '4px',
                fontFamily: typography.fontFamily.mono,
                fontSize: typography.fontSize.xs,
                color: colors.gray[400],
              }}>
                Soon
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
