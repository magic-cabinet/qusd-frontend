import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Metrics() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-24 relative bg-[#0a0a0a]" ref={ref}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-['Orbitron'] text-3xl sm:text-4xl font-bold text-white mb-8">
            Open source
          </h2>

          <div className="space-y-6 text-lg text-[#a3a3a3] leading-relaxed max-w-3xl">
            <p>
              QUSD is open source software. MIT licensed. Fork it, run it, contribute to it.
            </p>
            <p>
              No token launch. No governance theater. Just code that works.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-[#262626]">
            <a
              href="https://github.com/qusd"
              target="_blank"
              rel="noopener noreferrer"
              className="font-['Space_Mono'] text-sm text-white hover:text-[#0ECCED] transition-colors"
            >
              Star on GitHub →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
