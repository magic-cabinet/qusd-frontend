import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const steps = [
  {
    number: '01',
    title: 'Sign Intent',
    description: 'User signs permit + payment intent via MetaMask. No gas required.',
    technical: 'EIP-2612',
  },
  {
    number: '02',
    title: 'Submit Header',
    description: 'Frontend sends X-PAYMENT header to resource server with signed proof.',
    technical: 'X-PAYMENT',
  },
  {
    number: '03',
    title: 'Verify & Settle',
    description: 'Facilitator verifies signatures and settles payment on-chain.',
    technical: 'On-Chain',
  },
  {
    number: '04',
    title: 'Access Granted',
    description: 'User granted time-limited access. Recipient claims tokens when ready.',
    technical: 'Time-Lock',
  },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="docs" className="py-20 sm:py-32 relative bg-white" ref={ref}>
      {/* Dot background */}
      <div className="absolute inset-0 dot-pattern-light" />

      {/* Elliptical glows */}
      <div className="glow-ellipse glow-cyan w-[450px] h-[280px] top-40 -left-40 animate-float opacity-15" />
      <div className="glow-ellipse glow-blue w-[350px] h-[200px] bottom-20 right-1/4 animate-float-slow opacity-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="annotation">03</span>
            <div className="flex-1 h-px bg-[#e5e5e5]" />
            <span className="annotation">Protocol Flow</span>
          </div>

          <div className="max-w-2xl">
            <h2 className="font-['Orbitron'] text-3xl sm:text-4xl md:text-5xl font-bold text-[#0a0a0a] leading-tight mb-4">
              How it
              <br />
              <span className="relative inline-block">
                Works
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#0052CC] rounded-full" />
              </span>
            </h2>
            <p className="text-[#737373] mt-4">
              Gasless micropayments for physical hardware and AI services.
            </p>
          </div>
        </motion.div>

        {/* Process steps */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              {/* Step card */}
              <div className="group relative border border-[#e5e5e5] bg-white rounded-2xl hover:border-[#0ECCED]/30 hover:shadow-lg hover:shadow-[#0ECCED]/5 transition-all overflow-hidden">

                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 flex items-center justify-center font-['Space_Mono'] font-bold text-lg rounded-xl bg-[#fafaf9] group-hover:bg-[#0052CC] group-hover:text-white transition-all">
                      {step.number}
                    </div>
                    <span className="annotation text-[#a3a3a3]">{step.technical}</span>
                  </div>

                  <h3 className="font-['Space_Mono'] text-lg font-bold text-[#0a0a0a] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[#737373] text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Curved connector arrow - only between steps */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3C10 3 13 8 13 8C13 8 10 13 6 13" stroke="#d4d4d4" strokeWidth="1.5" fill="none"/>
                    <path d="M11 6L13 8L11 10" stroke="#d4d4d4" strokeWidth="1.5" fill="none"/>
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Code snippet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 border border-[#e5e5e5] bg-[#0a0a0a] overflow-hidden rounded-2xl"
        >
          {/* Terminal header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#262626]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27ca3f]" />
            </div>
            <span className="annotation text-[#737373]">x402-payment.ts</span>
            <div className="w-16" />
          </div>

          {/* Code content */}
          <div className="p-4 sm:p-6 font-['Space_Mono'] text-sm overflow-x-auto">
            <pre className="text-[#e5e5e5]">
              <code>
                <span className="text-[#0ECCED]">const</span> payment = <span className="text-[#0ECCED]">await</span> x402.
                <span className="text-[#00ff88]">createPayment</span>({'{'}
                {'\n'}  <span className="text-[#737373]">amount:</span> <span className="text-[#ffbd2e]">"1.00"</span>,
                {'\n'}  <span className="text-[#737373]">token:</span> <span className="text-[#ffbd2e]">"QUSD"</span>,
                {'\n'}  <span className="text-[#737373]">recipient:</span> agent.<span className="text-[#00ff88]">did</span>,
                {'\n'}{'}'});
              </code>
            </pre>
          </div>

          {/* Terminal footer */}
          <div className="px-4 py-2 border-t border-[#262626] flex items-center gap-2">
            <span className="text-[#00ff88]">●</span>
            <span className="annotation text-[#737373]">Ready</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
