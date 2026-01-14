import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

// Token allocation data
const tokenAllocation = [
  { label: 'Public Sale', percent: 30, color: '#0052CC' },
  { label: 'Treasury', percent: 25, color: '#0ECCED' },
  { label: 'Team', percent: 20, color: '#025EC4' },
  { label: 'Ecosystem', percent: 15, color: '#00c3ff' },
  { label: 'Liquidity', percent: 10, color: '#043780' },
]

// Use of proceeds
const useOfProceeds = [
  { label: 'Chain Treasury', percent: 40, color: '#0052CC' },
  { label: 'Development', percent: 25, color: '#0ECCED' },
  { label: 'Security', percent: 15, color: '#025EC4' },
  { label: 'Operations', percent: 12, color: '#00c3ff' },
  { label: 'DevRel', percent: 8, color: '#043780' },
]

const Bar = ({ percent, color }: { percent: number; color: string }) => (
  <div className="h-2 bg-[#e5e5e5] rounded-full overflow-hidden flex-1">
    <div className="h-full rounded-full" style={{ width: `${percent}%`, backgroundColor: color }} />
  </div>
)

const WhitepaperPage = () => (
  <div className="min-h-screen bg-[#fafaf9] font-['Roboto'] p-4 sm:p-6">
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&family=Roboto:wght@300;400;500&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-['Orbitron'] text-xl sm:text-2xl font-bold text-[#0a0a0a]">QUSD Protocol</h1>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-[#737373]">Governance & Treasury</span>
          <span className="font-['Space_Mono'] text-[10px] text-[#0052CC]">$12.5M · $50M FDV</span>
        </div>
      </div>

      {/* Mobile: Stack, Desktop: 3 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        {/* Token Allocation */}
        <div className="bg-white border border-[#e5e5e5] rounded-xl p-4">
          <div className="font-['Space_Mono'] text-[10px] text-[#a3a3a3] mb-4">QGOV TOKEN · 1B SUPPLY</div>

          <div className="flex items-center gap-6">
            {/* Pie */}
            <div className="relative w-24 h-24 flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {tokenAllocation.reduce((acc, item) => {
                  const offset = acc.offset
                  acc.elements.push(
                    <circle key={item.label} cx="50" cy="50" r="40" fill="transparent"
                      stroke={item.color} strokeWidth="20"
                      strokeDasharray={`${item.percent} ${100 - item.percent}`}
                      strokeDashoffset={-offset} />
                  )
                  acc.offset += item.percent
                  return acc
                }, { elements: [] as React.JSX.Element[], offset: 0 }).elements}
              </svg>
            </div>

            {/* Legend */}
            <div className="space-y-1.5 flex-1">
              {tokenAllocation.map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-[#737373] flex-1">{item.label}</span>
                  <span className="font-['Space_Mono'] font-bold">{item.percent}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Token Sale */}
        <div className="bg-white border border-[#e5e5e5] rounded-xl p-4">
          <div className="font-['Space_Mono'] text-[10px] text-[#a3a3a3] mb-4">TOKEN SALE</div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#737373]">Seed</span>
              <span className="font-['Space_Mono'] text-sm">$1M @ $0.02</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#737373]">Strategic</span>
              <span className="font-['Space_Mono'] text-sm">$4M @ $0.04</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#737373]">Public IDO</span>
              <span className="font-['Space_Mono'] text-sm">$7.5M @ $0.05</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[#e5e5e5] flex justify-between items-center">
            <span className="text-xs text-[#737373]">Total Raise</span>
            <span className="font-['Orbitron'] text-xl font-bold text-[#0052CC]">$12.5M</span>
          </div>
        </div>

        {/* Use of Proceeds */}
        <div className="bg-white border border-[#e5e5e5] rounded-xl p-4">
          <div className="font-['Space_Mono'] text-[10px] text-[#a3a3a3] mb-4">USE OF PROCEEDS</div>

          <div className="space-y-3">
            {useOfProceeds.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#737373]">{item.label}</span>
                  <span className="font-['Space_Mono'] font-bold">{item.percent}%</span>
                </div>
                <Bar percent={item.percent} color={item.color} />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom row - Mobile: Stack, Desktop: 2 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">

        {/* Treasury Management */}
        <div className="bg-white border border-[#e5e5e5] rounded-xl p-4">
          <div className="font-['Space_Mono'] text-[10px] text-[#a3a3a3] mb-4">RESERVE YIELD DISTRIBUTION</div>

          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-[#fafaf9] rounded-lg">
              <div className="font-['Orbitron'] text-2xl font-bold text-[#0052CC]">50%</div>
              <div className="text-xs text-[#737373] mt-1">Treasury</div>
            </div>
            <div className="text-center p-3 bg-[#fafaf9] rounded-lg">
              <div className="font-['Orbitron'] text-2xl font-bold text-[#0ECCED]">30%</div>
              <div className="text-xs text-[#737373] mt-1">Stakers</div>
            </div>
            <div className="text-center p-3 bg-[#fafaf9] rounded-lg">
              <div className="font-['Orbitron'] text-2xl font-bold text-[#025EC4]">20%</div>
              <div className="text-xs text-[#737373] mt-1">Buyback</div>
            </div>
          </div>
        </div>

        {/* Decentralization Timeline */}
        <div className="bg-white border border-[#e5e5e5] rounded-xl p-4">
          <div className="font-['Space_Mono'] text-[10px] text-[#a3a3a3] mb-4">PROGRESSIVE DECENTRALIZATION</div>

          <div className="grid grid-cols-4 gap-2">
            {[
              { n: 1, label: 'Multi-sig', active: true },
              { n: 2, label: 'Expanded', active: false },
              { n: 3, label: 'Governance', active: false },
              { n: 4, label: 'Full DAO', active: false },
            ].map((phase) => (
              <div key={phase.n} className="text-center">
                <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center text-sm font-bold ${phase.active ? 'bg-[#0052CC] text-white' : 'bg-[#e5e5e5] text-[#737373]'}`}>
                  {phase.n}
                </div>
                <div className="text-[10px] text-[#737373] mt-2">{phase.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-[#e5e5e5] text-xs text-[#a3a3a3]">
        <span>QUSD Protocol · 2025</span>
        <a href="https://github.com/qusd" className="text-[#0a0a0a] hover:text-[#0052CC]">GitHub →</a>
      </div>
    </div>
  </div>
)

// Stablecoin liquidity comparison data
const stablecoins = [
  {
    rank: 1,
    name: 'USDT',
    issuer: 'Tether',
    marketCap: '$181.9B',
    type: 'Fiat-backed',
    mechanism: 'Institutional mint via Tether Limited. KYC/KYB required. Fiat wire to authorized partners.',
    access: 'Institutional',
  },
  {
    rank: 2,
    name: 'USDC',
    issuer: 'Circle',
    marketCap: '$75.98B',
    type: 'Fiat-backed',
    mechanism: 'Circle Mint platform. Bank transfers in 185 countries. Full KYC required.',
    access: 'Institutional',
  },
  {
    rank: 3,
    name: 'USDe',
    issuer: 'Ethena',
    marketCap: '$11.87B',
    type: 'Synthetic',
    mechanism: 'Delta-neutral hedging. Whitelisted users mint with USDC/USDT. Retail via DEX pools.',
    access: 'Hybrid',
  },
  {
    rank: 4,
    name: 'DAI',
    issuer: 'MakerDAO',
    marketCap: '$5.4B',
    type: 'Crypto-backed',
    mechanism: 'CDP system. Lock crypto collateral to mint. Overcollateralized. Fully permissionless.',
    access: 'Permissionless',
  },
  {
    rank: 5,
    name: 'PYUSD',
    issuer: 'PayPal',
    marketCap: '$2.73B',
    type: 'Fiat-backed',
    mechanism: 'Through PayPal app or Paxos. Zero fees. Retail-friendly onboarding.',
    access: 'Retail',
  },
  {
    rank: 6,
    name: 'USD1',
    issuer: 'World Liberty',
    marketCap: '$2.69B',
    type: 'Fiat-backed',
    mechanism: 'BitGo-managed deposits. Zero-fee minting. Multi-chain via Chainlink CCIP.',
    access: 'Institutional',
  },
  {
    rank: 7,
    name: 'TUSD',
    issuer: 'TrueUSD',
    marketCap: '$492M',
    type: 'Fiat-backed',
    mechanism: 'Bank deposit to TrustToken. Chainlink Proof of Reserve for automated minting. Zero fees.',
    access: 'Hybrid',
  },
  {
    rank: 8,
    name: 'USDD',
    issuer: 'TRON DAO',
    marketCap: '$465M',
    type: 'Overcollateralized',
    mechanism: 'Whitelisted institutions burn TRX to mint. PSM for 1:1 swaps. 200%+ collateralized.',
    access: 'Hybrid',
  },
  {
    rank: 9,
    name: 'FRAX',
    issuer: 'Frax Finance',
    marketCap: '$350M',
    type: 'Fiat-backed',
    mechanism: 'Originally fractional-algorithmic, now fully collateralized. Mint with USDC.',
    access: 'Permissionless',
  },
  {
    rank: 10,
    name: 'GUSD',
    issuer: 'Gemini',
    marketCap: '$47.8M',
    type: 'Fiat-backed',
    mechanism: 'Through Gemini platform. USD deposit converts 1:1. NYDFS regulated.',
    access: 'Retail',
  },
]

const accessColors: Record<string, string> = {
  Institutional: '#0052CC',
  Retail: '#0ECCED',
  Hybrid: '#025EC4',
  Permissionless: '#00c3ff',
}

const typeColors: Record<string, string> = {
  'Fiat-backed': '#0052CC',
  'Crypto-backed': '#0ECCED',
  Synthetic: '#025EC4',
  Overcollateralized: '#00c3ff',
}

const StablecoinComparison = () => (
  <div className="min-h-screen bg-[#fafaf9] font-['Roboto'] p-4 sm:p-6">
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&family=Roboto:wght@300;400;500&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-['Orbitron'] text-xl sm:text-2xl font-bold text-[#0a0a0a]">Stablecoin Landscape</h1>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-[#737373]">Top 10 by Market Cap</span>
          <span className="font-['Space_Mono'] text-[10px] text-[#0052CC]">Liquidity Onboarding Analysis</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="text-[10px] text-[#a3a3a3] font-['Space_Mono']">ACCESS MODEL:</div>
        {Object.entries(accessColors).map(([label, color]) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-[10px] text-[#737373]">{label}</span>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-[#e5e5e5] rounded-xl overflow-hidden">
        {/* Desktop Table Header */}
        <div className="hidden sm:grid grid-cols-12 gap-2 p-3 bg-[#fafaf9] border-b border-[#e5e5e5] font-['Space_Mono'] text-[10px] text-[#a3a3a3]">
          <div className="col-span-1">#</div>
          <div className="col-span-2">TOKEN</div>
          <div className="col-span-2">MARKET CAP</div>
          <div className="col-span-2">TYPE</div>
          <div className="col-span-4">LIQUIDITY MECHANISM</div>
          <div className="col-span-1">ACCESS</div>
        </div>

        {/* Rows */}
        {stablecoins.map((coin, idx) => (
          <div
            key={coin.name}
            className={`p-3 ${idx !== stablecoins.length - 1 ? 'border-b border-[#e5e5e5]' : ''}`}
          >
            {/* Desktop Row */}
            <div className="hidden sm:grid grid-cols-12 gap-2 items-center">
              <div className="col-span-1 font-['Space_Mono'] text-xs text-[#a3a3a3]">{coin.rank}</div>
              <div className="col-span-2">
                <div className="font-['Orbitron'] text-sm font-bold">{coin.name}</div>
                <div className="text-[10px] text-[#a3a3a3]">{coin.issuer}</div>
              </div>
              <div className="col-span-2 font-['Space_Mono'] text-sm">{coin.marketCap}</div>
              <div className="col-span-2">
                <span
                  className="inline-block px-2 py-0.5 rounded text-[10px] text-white"
                  style={{ backgroundColor: typeColors[coin.type] }}
                >
                  {coin.type}
                </span>
              </div>
              <div className="col-span-4 text-xs text-[#737373] leading-relaxed">{coin.mechanism}</div>
              <div className="col-span-1">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: accessColors[coin.access] }}
                  title={coin.access}
                />
              </div>
            </div>

            {/* Mobile Row */}
            <div className="sm:hidden space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-['Space_Mono'] text-xs text-[#a3a3a3]">#{coin.rank}</span>
                  <span className="font-['Orbitron'] text-sm font-bold">{coin.name}</span>
                  <span className="text-[10px] text-[#a3a3a3]">{coin.issuer}</span>
                </div>
                <span className="font-['Space_Mono'] text-sm">{coin.marketCap}</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="inline-block px-2 py-0.5 rounded text-[10px] text-white"
                  style={{ backgroundColor: typeColors[coin.type] }}
                >
                  {coin.type}
                </span>
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: accessColors[coin.access] }}
                  title={coin.access}
                />
                <span className="text-[10px] text-[#a3a3a3]">{coin.access}</span>
              </div>
              <div className="text-xs text-[#737373]">{coin.mechanism}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        <div className="bg-white border border-[#e5e5e5] rounded-xl p-4">
          <div className="font-['Space_Mono'] text-[10px] text-[#a3a3a3] mb-3">FIAT-BACKED DOMINANCE</div>
          <div className="font-['Orbitron'] text-2xl font-bold text-[#0052CC]">7/10</div>
          <div className="text-xs text-[#737373] mt-1">Top stablecoins use fiat reserves</div>
        </div>
        <div className="bg-white border border-[#e5e5e5] rounded-xl p-4">
          <div className="font-['Space_Mono'] text-[10px] text-[#a3a3a3] mb-3">INSTITUTIONAL GATE</div>
          <div className="font-['Orbitron'] text-2xl font-bold text-[#0ECCED]">6/10</div>
          <div className="text-xs text-[#737373] mt-1">Require KYC/KYB for minting</div>
        </div>
        <div className="bg-white border border-[#e5e5e5] rounded-xl p-4">
          <div className="font-['Space_Mono'] text-[10px] text-[#a3a3a3] mb-3">PERMISSIONLESS</div>
          <div className="font-['Orbitron'] text-2xl font-bold text-[#025EC4]">2/10</div>
          <div className="text-xs text-[#737373] mt-1">Fully open minting (DAI, FRAX)</div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-white border border-[#e5e5e5] rounded-xl p-4 mt-4">
        <div className="font-['Space_Mono'] text-[10px] text-[#a3a3a3] mb-3">KEY INSIGHTS FOR QUSD</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#737373]">
          <div>
            <div className="font-medium text-[#0a0a0a] mb-1">Institutional vs Retail</div>
            <p>USDT/USDC require institutional relationships for direct minting. PYUSD opened retail via PayPal app. USD1 pursuing zero-fee model.</p>
          </div>
          <div>
            <div className="font-medium text-[#0a0a0a] mb-1">Multi-chain is Standard</div>
            <p>All major stablecoins deploy across 5+ chains. USD1 uses Chainlink CCIP. Circle uses CCTP. Cross-chain liquidity is table stakes.</p>
          </div>
          <div>
            <div className="font-medium text-[#0a0a0a] mb-1">Proof of Reserve Trending</div>
            <p>TUSD pioneered Chainlink PoR for automated minting. USD1 adopted it. Transparency through on-chain attestation becoming standard.</p>
          </div>
          <div>
            <div className="font-medium text-[#0a0a0a] mb-1">Zero-Fee Competition</div>
            <p>PYUSD, USD1, TUSD offer zero-fee mint/redeem. Margin compression forcing issuers to monetize through yield on reserves.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-[#e5e5e5] text-xs text-[#a3a3a3]">
        <span>QUSD Protocol · 2025</span>
        <span className="font-['Space_Mono'] text-[10px]">Data as of Jan 2025</span>
      </div>
    </div>
  </div>
)

const meta = {
  title: 'Whitepaper/Overview',
  component: WhitepaperPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof WhitepaperPage>

export default meta
type Story = StoryObj<typeof meta>

export const Full: Story = {}

export const StablecoinLandscape: Story = {
  render: () => <StablecoinComparison />,
}
