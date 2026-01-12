import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const features = [
  {
    code: 'F01',
    title: 'Gasless Transactions',
    description: 'Users pay with QUSD, facilitators cover gas fees. Zero friction through EIP-2612 permit signatures.',
    specs: ['0 wei gas', 'Permit sigs', 'Meta-tx'],
  },
  {
    code: 'F02',
    title: 'Agent-Native Design',
    description: 'Built for AI agents, robotics, and IoT. DID-based identity verification at the protocol level.',
    specs: ['DID auth', 'Machine ID', 'Autonomous'],
  },
  {
    code: 'F03',
    title: 'Programmable Policies',
    description: 'Spending limits, multi-sig requirements, time-locks, and conditional transfers built-in.',
    specs: ['Policy engine', 'Multi-sig', 'Time-locks'],
  },
  {
    code: 'F04',
    title: 'Multi-Chain Native',
    description: 'Native deployment across Ethereum, Base, Solana, and Arbitrum. Not bridged—truly cross-chain.',
    specs: ['4+ chains', 'Native deploy', 'No bridges'],
  },
]

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="features" className="py-20 sm:py-32 relative bg-[#fafaf9]" ref={ref}>
      {/* Dot background */}
      <div className="absolute inset-0 dot-pattern" />

      {/* Elliptical glows */}
      <div className="glow-ellipse glow-cyan w-[500px] h-[300px] top-20 -right-60 animate-float opacity-20" />
      <div className="glow-ellipse glow-blue w-[400px] h-[250px] bottom-40 -left-40 animate-float-slow opacity-15" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="annotation">02</span>
            <div className="flex-1 h-px bg-[#e5e5e5]" />
            <span className="annotation">Architecture</span>
          </div>

          <div className="max-w-2xl">
            <h2 className="font-['Orbitron'] text-3xl sm:text-4xl md:text-5xl font-bold text-[#0a0a0a] leading-tight mb-4">
              Technical
              <br />
              <span className="relative inline-block">
                Specifications
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#0052CC] rounded-full" />
              </span>
            </h2>
            <p className="text-[#737373] mt-4">
              Core capabilities engineered for the machine economy.
            </p>
          </div>
        </motion.div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.code}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white p-6 sm:p-8 rounded-2xl border border-[#e5e5e5] hover:border-[#0ECCED]/30 hover:shadow-lg hover:shadow-[#0ECCED]/5 transition-all relative overflow-hidden"
            >

              {/* Code badge */}
              <div className="flex items-center justify-between mb-6 relative">
                <span className="w-12 h-12 border border-[#e5e5e5] flex items-center justify-center annotation rounded-xl group-hover:border-[#0ECCED] group-hover:bg-[#0052CC] group-hover:text-white transition-all">
                  {feature.code}
                </span>
                <span className="annotation text-[#a3a3a3]">{String(index + 1).padStart(2, '0')}/04</span>
              </div>

              {/* Content */}
              <h3 className="font-['Space_Mono'] text-lg sm:text-xl font-bold text-[#0a0a0a] mb-3 relative">
                {feature.title}
              </h3>
              <p className="text-[#737373] text-sm leading-relaxed mb-6 relative">
                {feature.description}
              </p>

              {/* Spec tags */}
              <div className="flex flex-wrap gap-2 relative">
                {feature.specs.map((spec) => (
                  <span
                    key={spec}
                    className="px-2 py-1 bg-[#fafaf9] border border-[#e5e5e5] annotation text-[9px] rounded-full"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
