import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const chains = ['Ethereum', 'Base', 'Arbitrum', 'Solana']

export default function Partners() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="ecosystem" className="py-24 relative bg-[#fafaf9]" ref={ref}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-['Orbitron'] text-3xl sm:text-4xl font-bold text-[#0a0a0a] mb-8">
            Chains
          </h2>

          <p className="text-lg text-[#737373] mb-8 max-w-2xl">
            Native deployments, not bridges. Same contract interface everywhere.
          </p>

          <div className="flex flex-wrap gap-4">
            {chains.map((chain) => (
              <span
                key={chain}
                className="px-4 py-2 bg-white border border-[#e5e5e5] rounded-lg font-['Space_Mono'] text-sm"
              >
                {chain}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
