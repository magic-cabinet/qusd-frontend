import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function WhatIsQUSD() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-32 relative bg-[#030812]" ref={ref}>
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#043780]/20 via-transparent to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Stacked coins image from Figma */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative rounded-[40px] overflow-hidden"
          >
            <div className="aspect-square relative bg-[#030812]">
              {/* Gradient overlay like Figma */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#043780] via-[rgba(4,55,128,0.75)] to-transparent z-10" />

              {/* Stacked coins image */}
              <img
                src="/assets/qusd-coins-stacked.png"
                alt="QUSD Coins"
                className="absolute inset-0 w-full h-full object-cover mix-blend-screen"
              />

              {/* Text overlay */}
              <div className="absolute top-8 left-8 z-20">
                <p className="font-[Orbitron] text-white uppercase text-3xl md:text-4xl leading-tight">
                  <span className="font-normal">Stability </span>
                  <span className="font-black">In</span>
                  <br />
                  <span className="font-black">Motion, Automated</span>
                </p>
              </div>

              {/* Large percentage like Figma */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute top-1/3 left-1/2 -translate-x-1/2 z-20"
              >
                <span className="font-[Orbitron] text-[8rem] md:text-[12rem] font-bold text-white/90 leading-none">
                  15,7%
                </span>
              </motion.div>

              {/* QUSD wordmark bottom right */}
              <div className="absolute bottom-6 right-6 z-20">
                <img src="/assets/qusd-wordmark-small.svg" alt="QUSD" className="h-10" />
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="font-[Orbitron] text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tight">
              What is{' '}
              <span className="bg-gradient-to-r from-[#0ECCED] to-[#025EC4] bg-clip-text text-transparent">
                QUSD
              </span>
              ?
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-6 font-[Roboto]">
              QUSD is a <span className="text-[#0ECCED]">machine-native stablecoin</span> built for the
              autonomous economy — enabling seamless, instant, and verifiable transactions between
              AI agents, robotics systems, and IoT devices.
            </p>
            <p className="text-white/60 leading-relaxed mb-8 font-[Roboto]">
              By merging financial stability with intelligent infrastructure, QUSD becomes
              the foundation for a new era of digital commerce where machines transact
              as efficiently as humans.
            </p>
            <div className="flex flex-wrap gap-3">
              {['X402 Protocol', 'EIP-2612', 'Agent DIDs', 'Multi-Chain'].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full border border-[#0ECCED]/30 bg-[#0ECCED]/5 text-[#0ECCED] text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
