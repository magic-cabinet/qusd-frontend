import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="docs" className="py-24 relative bg-white" ref={ref}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-['Orbitron'] text-3xl sm:text-4xl font-bold text-[#0a0a0a] mb-8">
            Get started
          </h2>

          <p className="text-lg text-[#737373] mb-8 max-w-2xl">
            Install the SDK and start transacting.
          </p>

          {/* Code block */}
          <div className="bg-[#0a0a0a] rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[#262626] flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27ca3f]" />
            </div>
            <div className="p-6 font-['Space_Mono'] text-sm overflow-x-auto">
              <pre className="text-[#e5e5e5]">
{`npm install @qusd/sdk

import { QUSD } from '@qusd/sdk'

const qusd = new QUSD()

// Send payment
await qusd.send({
  to: '0x...',
  amount: '100'
})`}
              </pre>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-[#e5e5e5]">
            <a
              href="https://github.com/qusd"
              target="_blank"
              rel="noopener noreferrer"
              className="font-['Space_Mono'] text-sm text-[#0a0a0a] hover:text-[#0052CC] transition-colors"
            >
              Full documentation →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
