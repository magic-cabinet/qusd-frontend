import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="features" className="py-24 relative bg-[#fafaf9]" ref={ref}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-['Orbitron'] text-3xl sm:text-4xl font-bold text-[#0a0a0a] mb-8">
            How it works
          </h2>

          <div className="space-y-6 text-lg text-[#737373] leading-relaxed max-w-3xl">
            <p>
              <span className="text-[#0a0a0a] font-medium">No gas tokens.</span>{' '}
              Machines pay fees in QUSD. No ETH management, no failed transactions.
            </p>
            <p>
              <span className="text-[#0a0a0a] font-medium">Identity built in.</span>{' '}
              Agents have verifiable identity at the protocol level. Know who you're transacting with.
            </p>
            <p>
              <span className="text-[#0a0a0a] font-medium">Programmable limits.</span>{' '}
              Set spending caps, approved counterparties, and safety rules that the protocol enforces.
            </p>
            <p>
              <span className="text-[#0a0a0a] font-medium">Multi-chain.</span>{' '}
              Native on Ethereum, Base, Arbitrum, Solana. Move value where you need it.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-[#e5e5e5]">
            <a
              href="https://github.com/qusd"
              target="_blank"
              rel="noopener noreferrer"
              className="font-['Space_Mono'] text-sm text-[#0a0a0a] hover:text-[#0052CC] transition-colors"
            >
              Read the docs →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
