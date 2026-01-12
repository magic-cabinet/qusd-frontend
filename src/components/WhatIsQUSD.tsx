import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const specs = [
  { label: 'Token Standard', value: 'ERC-20' },
  { label: 'Peg Mechanism', value: '1:1 USD' },
  { label: 'Collateral', value: '100%' },
  { label: 'Permit', value: 'EIP-2612' },
]

export default function WhatIsQUSD() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-20 sm:py-32 relative bg-white border-y border-[#e5e5e5]" ref={ref}>
      {/* Dot pattern */}
      <div className="absolute inset-0 dot-pattern-light" />

      {/* Elliptical glows */}
      <div className="glow-ellipse glow-blue w-[400px] h-[250px] -top-20 left-1/4 animate-float-slow opacity-15" />
      <div className="glow-ellipse glow-cyan w-[350px] h-[200px] bottom-0 right-1/4 animate-float-reverse opacity-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="annotation">01</span>
            <div className="flex-1 h-px bg-[#e5e5e5]" />
            <span className="annotation">Protocol Overview</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Visual diagram */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Circular diagram */}
            <div className="aspect-square relative">
              {/* Outer elliptical glow ring */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-[90%] h-[90%] rounded-full"
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(14, 204, 237, 0.1) 0%, transparent 70%)',
                  }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>

              {/* Center content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="relative"
                >
                  {/* Circular border with gradient */}
                  <div
                    className="w-40 h-40 sm:w-56 sm:h-56 rounded-full flex items-center justify-center relative"
                    style={{
                      background: 'linear-gradient(135deg, rgba(14, 204, 237, 0.1) 0%, rgba(2, 94, 196, 0.1) 100%)',
                      border: '2px solid',
                      borderImageSource: 'linear-gradient(135deg, #0ECCED, #025EC4)',
                      borderImageSlice: 1,
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        border: '2px solid transparent',
                        background: 'linear-gradient(#fafaf9, #fafaf9) padding-box, linear-gradient(135deg, #0ECCED, #025EC4) border-box',
                      }}
                    />
                    <div className="text-center relative z-10">
                      <div className="font-['Space_Mono'] text-5xl sm:text-7xl font-bold bg-gradient-to-r from-[#0ECCED] to-[#025EC4] bg-clip-text text-transparent">$1</div>
                      <div className="annotation mt-2">USD PEG</div>
                    </div>
                  </div>

                  {/* Orbiting dots */}
                  <motion.div
                    className="absolute -inset-8"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-gradient-to-r from-[#0ECCED] to-[#025EC4] rounded-full" />
                  </motion.div>
                  <motion.div
                    className="absolute -inset-12"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#00ff88] rounded-full" />
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Specs table below diagram */}
            <div className="mt-6 space-y-2">
              {specs.map((spec, i) => (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                  className="flex items-center justify-between p-3 bg-[#fafaf9] rounded-xl hover:bg-white transition-colors border border-transparent hover:border-[#e5e5e5]"
                >
                  <span className="annotation">{spec.label}</span>
                  <span className="font-['Space_Mono'] text-sm font-bold">{spec.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:pt-8"
          >
            <h2 className="font-['Space_Mono'] text-3xl sm:text-4xl md:text-5xl font-bold text-[#0a0a0a] leading-tight mb-6">
              What is
              <br />
              <span className="relative inline-block mt-2">
                QUSD
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0ECCED] to-[#025EC4] rounded-full" />
              </span>
              ?
            </h2>

            <div className="space-y-4 text-[#737373] leading-relaxed">
              <p>
                QUSD is a <span className="text-[#0a0a0a] font-medium">machine-native stablecoin</span> designed
                from the ground up for the autonomous economy—enabling seamless, instant, and verifiable
                transactions between AI agents, robotics systems, and IoT devices.
              </p>
              <p>
                Built on the X402 payment protocol, QUSD supports gasless transactions through
                EIP-2612 permit signatures, allowing machines to transact without holding ETH for gas.
              </p>
              <p>
                Every QUSD is backed 1:1 by USD reserves, providing the stability required for
                autonomous systems that cannot tolerate price volatility.
              </p>
            </div>

            {/* Technical tags */}
            <div className="mt-8 flex flex-wrap gap-2">
              {['X402', 'EIP-2612', 'ERC-20', 'DID', 'Multi-Chain'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 border border-[#e5e5e5] bg-[#fafaf9] annotation rounded-full hover:border-[#0ECCED] hover:bg-gradient-to-r hover:from-[#0ECCED]/5 hover:to-[#025EC4]/5 transition-all cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Read more link */}
            <motion.a
              href="#"
              whileHover={{ x: 4 }}
              className="inline-flex items-center gap-2 mt-8 font-['Space_Mono'] text-sm text-[#0a0a0a] hover:text-[#0ECCED] transition-colors"
            >
              <span>Read the whitepaper</span>
              <span>→</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
