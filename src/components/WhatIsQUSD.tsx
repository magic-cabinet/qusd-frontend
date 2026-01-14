import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function WhatIsQUSD() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-24 relative bg-white border-y border-[#e5e5e5]" ref={ref}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-['Orbitron'] text-3xl sm:text-4xl font-bold text-[#0a0a0a] mb-8">
            What is QUSD?
          </h2>

          <div className="space-y-6 text-lg text-[#737373] leading-relaxed max-w-3xl">
            <p>
              QUSD is an open source stablecoin for autonomous systems.
              One token. No gas fees. Works across chains.
            </p>
            <p>
              Machines need money they can actually use. Not wrapped tokens,
              not gas management, not human approval flows. Just send and receive.
            </p>
            <p>
              Every QUSD is backed 1:1 by USD. The code is open. The reserves are audited.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-[#e5e5e5]">
            <a
              href="https://github.com/qusd"
              target="_blank"
              rel="noopener noreferrer"
              className="font-['Space_Mono'] text-sm text-[#0a0a0a] hover:text-[#0052CC] transition-colors"
            >
              View the source →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
