import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

// Animated typing effect
function TypeWriter({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timeout)
  }, [delay])

  useEffect(() => {
    if (!started) return
    if (displayed.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1))
      }, 40)
      return () => clearTimeout(timeout)
    }
  }, [displayed, text, started])

  return (
    <span>
      {displayed}
      {displayed.length < text.length && <span className="cursor" />}
    </span>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#fafaf9]">
      {/* Dot pattern background */}
      <div className="absolute inset-0 dot-pattern-light" />

      {/* Elliptical blurs */}
      <div className="glow-ellipse glow-cyan w-[600px] h-[400px] -top-40 -right-40 animate-float-slow opacity-30" />
      <div className="glow-ellipse glow-blue w-[500px] h-[300px] bottom-20 -left-40 animate-float-reverse opacity-20" />
      <div className="glow-ellipse glow-cyan w-[300px] h-[200px] top-1/3 right-1/4 animate-float opacity-15" />

      {/* Side annotation */}
      <div className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
        <span className="annotation tracking-[0.3em]">STABILITY PROTOCOL</span>
      </div>

      {/* Right side metrics */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
        className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2"
      >
        <div className="border border-[#e5e5e5] bg-white/80 backdrop-blur-sm p-4 w-32 rounded-2xl">
          <div className="annotation mb-2">Peg Ratio</div>
          <div className="font-['Space_Mono'] text-2xl font-bold">1:1</div>
          <div className="annotation text-[#00ff88] mt-1">● Stable</div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full pt-32 sm:pt-24">
        <div className="max-w-4xl">
          {/* Protocol badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 sm:mb-8"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 border border-[#e5e5e5] bg-white/80 backdrop-blur-sm rounded-full">
              <div className="w-2 h-2 bg-[#0052CC] rounded-full" />
              <span className="annotation">X402 Payment Protocol</span>
              <span className="annotation text-[#a3a3a3]">|</span>
              <span className="annotation">ERC-20</span>
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="font-['Orbitron'] text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#0a0a0a] leading-[0.9]">
              <span className="text-[#a3a3a3] font-normal">The</span>
              <br />
              Machine
              <br />
              <span className="relative inline-block">
                Economy
                <motion.span
                  className="absolute -bottom-2 left-0 h-1 bg-[#0052CC] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, delay: 1 }}
                />
              </span>
            </h1>
          </motion.div>

          {/* Subheadline with typing effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 sm:mt-8 max-w-xl"
          >
            <p className="font-['Space_Mono'] text-sm sm:text-base text-[#737373] leading-relaxed">
              <TypeWriter
                text="Infrastructure for autonomous transactions between AI agents, robotics, and IoT systems."
                delay={1200}
              />
            </p>
          </motion.div>

          {/* Technical specs row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-8 sm:mt-12 flex flex-wrap gap-4 sm:gap-6"
          >
            {[
              { label: 'Gas', value: '0', unit: 'wei' },
              { label: 'Latency', value: '<1', unit: 'sec' },
              { label: 'Chains', value: '4+', unit: '' },
            ].map((spec, i) => (
              <div key={spec.label} className="flex items-baseline gap-2">
                <span className="annotation">{spec.label}:</span>
                <span className="font-['Space_Mono'] text-xl sm:text-2xl font-bold">{spec.value}</span>
                {spec.unit && <span className="annotation">{spec.unit}</span>}
                {i < 2 && <span className="text-[#d4d4d4] ml-4 hidden sm:inline">/</span>}
              </div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Bottom technical strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-0 left-0 right-0 border-t border-[#e5e5e5] bg-white/50 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between overflow-x-auto">
          <div className="flex items-center gap-6 sm:gap-8">
            {['Ethereum', 'Base', 'Arbitrum', 'Solana'].map((chain, i) => (
              <div key={chain} className="flex items-center gap-2 whitespace-nowrap">
                <span className="annotation text-[#a3a3a3]">{String(i + 1).padStart(2, '0')}</span>
                <span className="annotation">{chain}</span>
              </div>
            ))}
          </div>
          <div className="hidden sm:block annotation text-[#a3a3a3]">
            Scroll to explore ↓
          </div>
        </div>
      </motion.div>
    </section>
  )
}
