import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#fafaf9] overflow-hidden">
      {/* Dot pattern */}
      <div className="absolute inset-0 dot-pattern-light" />

      {/* Floating glows */}
      <div className="glow-ellipse glow-cyan w-[600px] h-[400px] -top-40 -right-40 animate-float-slow opacity-25" />
      <div className="glow-ellipse glow-blue w-[500px] h-[300px] bottom-20 -left-40 animate-float-reverse opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-24">
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="font-['Space_Mono'] text-xs text-[#0052CC] tracking-widest uppercase">
            Open Source Stablecoin
          </span>
        </motion.div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="font-['Orbitron'] text-5xl sm:text-6xl lg:text-7xl font-bold text-[#0a0a0a] leading-[1.05] mb-8">
              The stablecoin
              <br />
              <span className="text-[#0052CC]">agents use</span>
            </h1>

            <p className="text-lg text-[#737373] leading-relaxed mb-8 max-w-lg">
              QUSD lets autonomous systems hold and spend dollars.
              AI agents, robots, IoT—anything that needs to pay for something
              without a human clicking approve.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com/qusd"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#0a0a0a] text-white font-['Space_Mono'] text-sm font-medium rounded-lg hover:bg-[#0052CC] transition-colors"
              >
                GitHub
              </a>
              <Link
                to="/whitepaper"
                className="px-6 py-3 border border-[#e5e5e5] text-[#0a0a0a] font-['Space_Mono'] text-sm font-medium rounded-lg hover:border-[#0052CC] transition-colors"
              >
                Whitepaper
              </Link>
              <a
                href="#docs"
                className="px-6 py-3 border border-[#e5e5e5] text-[#0a0a0a] font-['Space_Mono'] text-sm font-medium rounded-lg hover:border-[#0052CC] transition-colors"
              >
                Documentation
              </a>
            </div>
          </motion.div>

          {/* Right side - what it does */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="p-6 border border-[#e5e5e5] rounded-xl bg-white">
              <div className="font-['Space_Mono'] text-xs text-[#a3a3a3] mb-3">01</div>
              <div className="text-[#0a0a0a] font-medium mb-2">Open source</div>
              <div className="text-sm text-[#737373]">MIT licensed. Audit the code, fork it, run your own.</div>
            </div>

            <div className="p-6 border border-[#e5e5e5] rounded-xl bg-white">
              <div className="font-['Space_Mono'] text-xs text-[#a3a3a3] mb-3">02</div>
              <div className="text-[#0a0a0a] font-medium mb-2">Multi-chain native</div>
              <div className="text-sm text-[#737373]">Ethereum, Base, Arbitrum, Solana. Same interface everywhere.</div>
            </div>

            <div className="p-6 border border-[#e5e5e5] rounded-xl bg-white">
              <div className="font-['Space_Mono'] text-xs text-[#a3a3a3] mb-3">03</div>
              <div className="text-[#0a0a0a] font-medium mb-2">Agent-first design</div>
              <div className="text-sm text-[#737373]">Built for autonomous systems. Not a human wallet retrofitted.</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
