import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// Parametric spline path generator
const generateSplinePath = (
  points: number,
  amplitude: number,
  frequency: number,
  phase: number,
  yOffset: number
) => {
  const pathPoints: string[] = []
  for (let i = 0; i <= points; i++) {
    const x = (i / points) * 100
    const y = yOffset + amplitude * Math.sin((i / points) * Math.PI * frequency + phase)
    pathPoints.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`)
  }
  return pathPoints.join(' ')
}

// Animated parametric background
const ParametricBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <svg
      className="absolute top-0 left-0 w-full h-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="splineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0052CC" stopOpacity="0" />
          <stop offset="50%" stopColor="#0052CC" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0052CC" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="splineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0ECCED" stopOpacity="0" />
          <stop offset="50%" stopColor="#0ECCED" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#0ECCED" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.path
          key={i}
          d={generateSplinePath(50, 8, 2 + i * 0.5, i * 0.5, 20 + i * 15)}
          fill="none"
          stroke={i % 2 === 0 ? 'url(#splineGradient1)' : 'url(#splineGradient2)'}
          strokeWidth="0.15"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: i * 0.2, ease: 'easeOut' }}
        />
      ))}
    </svg>
  </div>
)

// Data
const tokenAllocation = [
  { label: 'Public Sale', value: 30, color: '#0052CC' },
  { label: 'Treasury', value: 25, color: '#0ECCED' },
  { label: 'Team', value: 20, color: '#025EC4' },
  { label: 'Ecosystem', value: 15, color: '#00c3ff' },
  { label: 'Liquidity', value: 10, color: '#043780' },
]

const reserveComposition = [
  { label: 'US Treasuries', value: 65, color: '#0052CC' },
  { label: 'Bank Deposits', value: 25, color: '#0ECCED' },
  { label: 'Overnight Repo', value: 10, color: '#025EC4' },
]

const revenueDistribution = [
  { label: 'Liquidity Operations', value: 60, color: '#0052CC' },
  { label: 'Operations', value: 25, color: '#0ECCED' },
  { label: 'QGOV Stakers', value: 15, color: '#025EC4' },
]

const useOfProceeds = [
  { label: 'Liquidity Infrastructure', value: 65, color: '#0052CC' },
  { label: 'Currency Corridors', value: 20, color: '#0ECCED' },
  { label: 'Operations', value: 15, color: '#025EC4' },
]

export default function Whitepaper() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#fafaf9]"
    >
      <Navbar />

      {/* Hero section with parametric background */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <ParametricBackground />
        <div className="absolute inset-0 dot-pattern-light opacity-50" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-['Space_Mono'] text-xs text-[#0052CC] tracking-widest uppercase">
              Protocol Documentation
            </span>
            <h1 className="font-['Orbitron'] text-5xl sm:text-6xl font-bold text-[#0a0a0a] mt-4 mb-6">
              QUSD Protocol
            </h1>
            <p className="text-xl text-[#737373] max-w-2xl mx-auto">
              Programmable Settlement Infrastructure for the Agent Economy
            </p>
            <div className="font-['Space_Mono'] text-xs text-[#a3a3a3] mt-6">
              v1.0 — January 2026
            </div>
          </motion.div>

        </div>
      </section>

      <article className="max-w-6xl mx-auto px-6 pb-24">
        {/* Token Economics Section - Compact */}
        <section className="mb-16 -mt-8">
          <motion.div
            className="bg-white border border-[#e5e5e5] rounded-2xl p-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-['Orbitron'] text-xl font-bold text-[#0a0a0a]">Token Economics</h2>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="font-['Space_Mono'] text-xs text-[#a3a3a3]">TOTAL SUPPLY</div>
                  <div className="font-['Orbitron'] font-bold text-[#0a0a0a]">1B QGOV</div>
                </div>
                <div className="text-right">
                  <div className="font-['Space_Mono'] text-xs text-[#a3a3a3]">RAISE</div>
                  <div className="font-['Orbitron'] font-bold text-[#0052CC]">$12.5M</div>
                </div>
                <div className="text-right">
                  <div className="font-['Space_Mono'] text-xs text-[#a3a3a3]">FDV</div>
                  <div className="font-['Orbitron'] font-bold text-[#0052CC]">$50M</div>
                </div>
              </div>
            </div>

            {/* Combined allocation bar */}
            <div className="mb-4">
              <div className="h-8 rounded-full overflow-hidden flex">
                {tokenAllocation.map((item, i) => (
                  <motion.div
                    key={item.label}
                    className="h-full flex items-center justify-center"
                    style={{ backgroundColor: item.color, width: `${item.value}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                  >
                    <span className="text-white text-[10px] font-bold">{item.value}%</span>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-between mt-2">
                {tokenAllocation.map((item) => (
                  <div key={item.label} className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[10px] text-[#737373]">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Token sale phases as visual timeline */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { phase: 'Seed', amount: '50M', price: '$0.02', raise: '$1.0M', pct: 5 },
                { phase: 'Strategic', amount: '100M', price: '$0.04', raise: '$4.0M', pct: 10 },
                { phase: 'Public', amount: '150M', price: '$0.05', raise: '$7.5M', pct: 15 },
              ].map((sale, i) => (
                <motion.div
                  key={sale.phase}
                  className="relative p-3 bg-[#fafaf9] rounded-lg overflow-hidden"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {/* Progress fill */}
                  <motion.div
                    className="absolute inset-0 bg-[#0052CC]/10"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}
                  />
                  <div className="relative">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-['Orbitron'] text-sm font-bold text-[#0a0a0a]">{sale.phase}</div>
                        <div className="text-[10px] text-[#a3a3a3]">{sale.amount} QGOV ({sale.pct}%)</div>
                      </div>
                      <div className="text-right">
                        <div className="font-['Space_Mono'] text-lg font-bold text-[#0052CC]">{sale.price}</div>
                        <div className="text-[10px] text-[#737373]">{sale.raise}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Reserve & Revenue Section - Compact */}
        <section className="mb-16">
          <motion.div
            className="bg-white border border-[#e5e5e5] rounded-2xl p-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-['Orbitron'] text-xl font-bold text-[#0a0a0a] mb-4">Reserve & Revenue</h2>

            <div className="grid grid-cols-4 gap-4">
              {/* Reserve donut - smaller */}
              <div className="flex flex-col items-center">
                <div className="font-['Space_Mono'] text-[10px] text-[#a3a3a3] mb-2">RESERVES</div>
                <div className="relative w-24 h-24">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {(() => {
                      let offset = 0
                      return reserveComposition.map((segment, index) => {
                        const circumference = 2 * Math.PI * 35
                        const segmentLength = (segment.value / 100) * circumference
                        const dashArray = `${segmentLength} ${circumference - segmentLength}`
                        const rotation = (offset / 100) * 360 - 90
                        offset += segment.value
                        return (
                          <motion.circle
                            key={segment.label}
                            cx="50" cy="50" r="35"
                            fill="none" stroke={segment.color} strokeWidth="10"
                            strokeDasharray={dashArray}
                            transform={`rotate(${rotation} 50 50)`}
                            initial={{ strokeDasharray: `0 ${circumference}` }}
                            animate={{ strokeDasharray: dashArray }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                          />
                        )
                      })
                    })()}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="font-['Orbitron'] text-lg font-bold">1:1</div>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  {reserveComposition.map((item) => (
                    <div key={item.label} className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-[8px] text-[#737373]">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Revenue bars - compact */}
              <div>
                <div className="font-['Space_Mono'] text-[10px] text-[#a3a3a3] mb-2">REVENUE SPLIT</div>
                <div className="space-y-2">
                  {revenueDistribution.map((item, i) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-[10px] mb-0.5">
                        <span className="text-[#737373]">{item.label}</span>
                        <span className="font-['Space_Mono'] font-bold">{item.value}%</span>
                      </div>
                      <div className="h-2 bg-[#e5e5e5] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: item.color }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: i * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Use of Proceeds - compact */}
              <div>
                <div className="font-['Space_Mono'] text-[10px] text-[#a3a3a3] mb-2">USE OF PROCEEDS</div>
                <div className="space-y-2">
                  {useOfProceeds.map((item, i) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-[10px] mb-0.5">
                        <span className="text-[#737373]">{item.label}</span>
                        <span className="font-['Space_Mono'] font-bold">{item.value}%</span>
                      </div>
                      <div className="h-2 bg-[#e5e5e5] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: item.color }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: i * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key numbers */}
              <div className="space-y-2">
                <div className="font-['Space_Mono'] text-[10px] text-[#a3a3a3] mb-2">PROJECTIONS</div>
                <div className="p-2 bg-[#fafaf9] rounded-lg">
                  <div className="text-[10px] text-[#a3a3a3]">At $100M reserves</div>
                  <div className="font-['Orbitron'] text-lg font-bold text-[#0052CC]">$5M/yr</div>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="p-2 bg-[#fafaf9] rounded text-center">
                    <div className="font-['Space_Mono'] text-xs font-bold">$8.1M</div>
                    <div className="text-[8px] text-[#a3a3a3]">Liquidity</div>
                  </div>
                  <div className="p-2 bg-[#fafaf9] rounded text-center">
                    <div className="font-['Space_Mono'] text-xs font-bold">$2.5M</div>
                    <div className="text-[8px] text-[#a3a3a3]">Corridors</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Protocol Stack Section - Compact */}
        <section className="mb-16">
          <motion.div
            className="bg-white border border-[#e5e5e5] rounded-2xl p-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-['Orbitron'] text-xl font-bold text-[#0a0a0a]">Protocol Stack</h2>
              <span className="font-['Space_Mono'] text-[10px] text-[#a3a3a3]">AGENT ECONOMY INFRASTRUCTURE</span>
            </div>

            {/* Horizontal flow diagram */}
            <div className="flex items-center justify-between gap-2 mb-4 overflow-x-auto pb-2">
              {[
                { name: 'NANDA', desc: 'Discovery', color: '#0052CC' },
                { name: 'MCP', desc: 'Tools', color: '#0ECCED' },
                { name: 'A2A', desc: 'Comms', color: '#025EC4' },
                { name: 'UCP', desc: 'Commerce', color: '#00c3ff' },
                { name: 'AP2', desc: 'Payments', color: '#043780' },
                { name: 'QUSD', desc: 'Settlement', color: '#0052CC', highlight: true },
              ].map((p, i, arr) => (
                <div key={p.name} className="flex items-center">
                  <motion.div
                    className={`px-3 py-2 rounded-lg border-2 text-center min-w-[70px] ${
                      p.highlight
                        ? 'bg-[#0052CC] border-[#0052CC]'
                        : 'bg-white'
                    }`}
                    style={{ borderColor: p.highlight ? '#0052CC' : p.color }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div className={`font-['Orbitron'] text-xs font-bold ${p.highlight ? 'text-white' : ''}`} style={{ color: p.highlight ? 'white' : p.color }}>
                      {p.name}
                    </div>
                    <div className={`text-[9px] ${p.highlight ? 'text-white/70' : 'text-[#a3a3a3]'}`}>{p.desc}</div>
                  </motion.div>
                  {i < arr.length - 1 && (
                    <motion.div
                      className="mx-1 text-[#e5e5e5]"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 + 0.1 }}
                    >
                      →
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* Protocol details grid */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { name: 'NANDA', full: 'Networked Agents & Decentralized AI', desc: 'Global discovery & identity' },
                { name: 'MCP', full: 'Model Context Protocol', desc: 'Agent-to-tool integration' },
                { name: 'A2A', full: 'Agent2Agent Protocol', desc: 'Horizontal communication' },
                { name: 'UCP', full: 'Universal Commerce Protocol', desc: 'Full commerce journey' },
                { name: 'AP2', full: 'Agent Payments Protocol', desc: 'Payment mandates' },
                { name: 'QUSD', full: 'Settlement Layer', desc: 'Programmable stablecoin', highlight: true },
              ].map((protocol, i) => (
                <motion.div
                  key={protocol.name}
                  className={`p-2 rounded-lg ${protocol.highlight ? 'bg-[#0052CC]' : 'bg-[#fafaf9]'}`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                >
                  <div className={`font-['Orbitron'] text-[10px] font-bold ${protocol.highlight ? 'text-white' : 'text-[#0052CC]'}`}>
                    {protocol.name}
                  </div>
                  <div className={`text-[9px] ${protocol.highlight ? 'text-white/70' : 'text-[#a3a3a3]'}`}>
                    {protocol.full}
                  </div>
                  <div className={`text-[10px] mt-0.5 ${protocol.highlight ? 'text-white/90' : 'text-[#737373]'}`}>
                    {protocol.desc}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Roadmap - Compact */}
        <section className="mb-16">
          <motion.div
            className="bg-white border border-[#e5e5e5] rounded-2xl p-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-['Orbitron'] text-xl font-bold text-[#0a0a0a] mb-3">Roadmap</h2>
            <div className="grid grid-cols-4 gap-3">
              {[
                { phase: '1', title: 'Foundation', status: 'active', items: ['Entity setup', 'Banking', 'Contracts', 'Audits'] },
                { phase: '2', title: 'Launch', status: 'upcoming', items: ['Ethereum', 'QGOV sale', 'Liquidity', 'KYB'] },
                { phase: '3', title: 'Expansion', status: 'upcoming', items: ['Solana', 'Monad', 'QUBIT', 'SDK'] },
                { phase: '4', title: 'Scale', status: 'upcoming', items: ['JPYC', 'EURC', 'Robotics', 'Enterprise'] },
              ].map((phase, index) => (
                <motion.div
                  key={phase.phase}
                  className={`p-3 rounded-lg ${phase.status === 'active' ? 'bg-[#0052CC]' : 'bg-[#fafaf9]'}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`font-['Orbitron'] text-lg font-bold ${phase.status === 'active' ? 'text-white' : 'text-[#0052CC]'}`}>
                      {phase.phase}
                    </span>
                    <span className={`font-['Orbitron'] text-sm font-bold ${phase.status === 'active' ? 'text-white' : 'text-[#0a0a0a]'}`}>
                      {phase.title}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {phase.items.map((item) => (
                      <div key={item} className={`text-[10px] ${phase.status === 'active' ? 'text-white/80' : 'text-[#737373]'}`}>
                        {item}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Footer CTA */}
        <motion.section
          className="text-center py-16 border-t border-[#e5e5e5]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="font-['Orbitron'] text-2xl font-bold text-[#0a0a0a] mb-4">
            Ready to Build?
          </div>
          <p className="text-[#737373] mb-8 max-w-md mx-auto">
            QUSD provides programmable settlement infrastructure for the next generation of autonomous systems.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/qusd"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#0a0a0a] text-white font-['Space_Mono'] text-sm font-medium rounded-lg hover:bg-[#0052CC] transition-colors"
            >
              GitHub
            </a>
            <a
              href="#docs"
              className="px-6 py-3 border border-[#e5e5e5] text-[#0a0a0a] font-['Space_Mono'] text-sm font-medium rounded-lg hover:border-[#0052CC] transition-colors"
            >
              Documentation
            </a>
          </div>
        </motion.section>
      </article>

      <Footer />
    </motion.div>
  )
}
