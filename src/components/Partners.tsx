import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const partners = [
  {
    name: 'Ethereum',
    code: 'ETH',
    status: 'Active',
    icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg'
  },
  {
    name: 'Base',
    code: 'BASE',
    status: 'Active',
    icon: 'https://avatars.githubusercontent.com/u/108554348?s=200&v=4'
  },
  {
    name: 'Solana',
    code: 'SOL',
    status: 'Active',
    icon: 'https://cryptologos.cc/logos/solana-sol-logo.svg'
  },
  {
    name: 'Arbitrum',
    code: 'ARB',
    status: 'Active',
    icon: 'https://cryptologos.cc/logos/arbitrum-arb-logo.svg'
  },
  {
    name: 'Chainlink',
    code: 'LINK',
    status: 'Integrated',
    icon: 'https://cryptologos.cc/logos/chainlink-link-logo.svg'
  },
  {
    name: 'Uniswap',
    code: 'UNI',
    status: 'Integrated',
    icon: 'https://cryptologos.cc/logos/uniswap-uni-logo.svg'
  },
]

export default function Partners() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="ecosystem" className="py-20 sm:py-32 relative bg-[#fafaf9]" ref={ref}>
      {/* Dot background */}
      <div className="absolute inset-0 dot-pattern" />

      {/* Elliptical glows */}
      <div className="glow-ellipse glow-blue w-[450px] h-[280px] top-20 -right-40 animate-float opacity-15" />
      <div className="glow-ellipse glow-cyan w-[400px] h-[250px] bottom-40 left-1/4 animate-float-slow opacity-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="annotation">05</span>
            <div className="flex-1 h-px bg-[#e5e5e5]" />
            <span className="annotation">Network Integrations</span>
          </div>

          <div className="max-w-2xl">
            <h2 className="font-['Space_Mono'] text-3xl sm:text-4xl md:text-5xl font-bold text-[#0a0a0a] leading-tight mb-4">
              Ecosystem &
              <br />
              <span className="relative inline-block">
                Partners
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0ECCED] to-[#025EC4] rounded-full" />
              </span>
            </h2>
            <p className="text-[#737373] mt-4">
              Integrated with leading blockchain infrastructure.
            </p>
          </div>
        </motion.div>

        {/* Partners grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.code}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group bg-white p-6 rounded-2xl border border-[#e5e5e5] hover:border-[#0ECCED]/30 hover:shadow-lg hover:shadow-[#0ECCED]/5 transition-all relative overflow-hidden"
            >
              {/* Elliptical glow on hover */}
              <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-gradient-to-br from-[#0ECCED]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />

              {/* Partner content */}
              <div className="flex flex-col items-center text-center relative">
                {/* Icon */}
                <div className="w-14 h-14 flex items-center justify-center mb-4 rounded-xl overflow-hidden">
                  <img
                    src={partner.icon}
                    alt={partner.name}
                    className="w-10 h-10 object-contain"
                  />
                </div>

                {/* Name */}
                <span className="font-['Space_Mono'] text-sm font-medium text-[#0a0a0a] mb-1">
                  {partner.name}
                </span>

                {/* Status */}
                <span className="annotation text-[10px] text-[#00ff88]">● {partner.status}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Integration CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 p-6 sm:p-8 border border-[#e5e5e5] bg-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="font-['Space_Mono'] text-xl font-bold text-[#0a0a0a] mb-2">
              Ready to integrate?
            </h3>
            <p className="text-[#737373] text-sm">
              Join the autonomous economy today.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <motion.a
              href="#"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0052CC] text-white font-semibold text-sm rounded-full hover:bg-[#003D99] hover:shadow-lg hover:shadow-[#0052CC]/25 transition-all"
            >
              <span>View Documentation</span>
              <span>→</span>
            </motion.a>
          </div>
        </motion.div>

        {/* Bottom annotation */}
        <div className="mt-6 flex items-center justify-between">
          <span className="annotation text-[#a3a3a3]">6 active integrations</span>
          <span className="annotation text-[#a3a3a3]">More coming soon</span>
        </div>
      </div>
    </section>
  )
}
