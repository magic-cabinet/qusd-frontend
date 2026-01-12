import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const partners = [
  { name: 'Ethereum', logo: 'ETH' },
  { name: 'Base', logo: 'BASE' },
  { name: 'Solana', logo: 'SOL' },
  { name: 'Arbitrum', logo: 'ARB' },
  { name: 'Chainlink', logo: 'LINK' },
  { name: 'Uniswap', logo: 'UNI' },
]

export default function Partners() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="ecosystem" className="py-32 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-[Orbitron] text-4xl md:text-5xl font-bold text-white mb-4 uppercase tracking-tight">
            Ecosystem &{' '}
            <span className="bg-gradient-to-r from-cyan to-blue bg-clip-text text-transparent">
              Partners
            </span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Integrated with leading blockchain infrastructure
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative aspect-square rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col items-center justify-center gap-3 hover:border-cyan/30 transition-all cursor-pointer"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-cyan/10 to-transparent" />

              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center font-[Orbitron] font-bold text-white/70 group-hover:text-cyan transition-colors">
                  {partner.logo}
                </div>
              </div>
              <span className="text-white/50 text-sm font-medium group-hover:text-white/70 transition-colors">
                {partner.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent">
            <div className="text-left">
              <h3 className="font-[Orbitron] text-xl font-bold text-white mb-1">
                Ready to integrate?
              </h3>
              <p className="text-white/50 text-sm">
                Join the autonomous economy today
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(14,204,237,0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-cyan to-blue rounded-full font-[Orbitron] font-semibold text-sm text-void whitespace-nowrap"
            >
              View Documentation
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
