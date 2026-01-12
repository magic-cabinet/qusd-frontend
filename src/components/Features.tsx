import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Gasless Transactions',
    description:
      'Users pay QUSD tokens, facilitators cover gas. Zero friction for end users with EIP-2612 permit signatures.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Agent-Native',
    description:
      'Built for AI agents, robotics, and IoT. DID-based identity verification at the protocol level for autonomous transactors.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: 'Programmable Money',
    description:
      'Policy engine integration for spending limits, multi-sig requirements, time-locks, and conditional transfers.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    title: 'Multi-Chain Native',
    description:
      'Native deployment across Ethereum, Base, Solana, and Arbitrum. Not bridged — truly cross-chain from day one.',
  },
]

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="features" className="py-32 relative" ref={ref}>
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(ellipse, rgba(4,55,128,0.3) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-[Orbitron] text-4xl md:text-5xl font-bold text-white mb-4 uppercase tracking-tight">
            Built for the{' '}
            <span className="bg-gradient-to-r from-cyan to-blue bg-clip-text text-transparent">
              Future
            </span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Infrastructure designed for autonomous economic agents
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:border-cyan/30 transition-all duration-300"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-cyan/5 to-transparent" />

              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan/20 to-blue/20 flex items-center justify-center text-cyan mb-6 group-hover:shadow-[0_0_30px_rgba(14,204,237,0.3)] transition-shadow">
                  {feature.icon}
                </div>
                <h3 className="font-[Orbitron] text-xl font-bold text-white mb-3 tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-white/60 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
