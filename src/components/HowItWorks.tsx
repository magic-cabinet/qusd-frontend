import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const steps = [
  {
    number: '01',
    title: 'Sign Payment Intent',
    description: 'User signs permit + payment intent via MetaMask. No gas required.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Submit X-PAYMENT Header',
    description: 'Frontend sends X-PAYMENT header to resource server with signed proof.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Verify & Settle',
    description: 'Facilitator verifies signatures and settles payment on-chain.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Access Granted',
    description: 'User granted time-limited access. Recipient claims tokens when ready.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-32 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-cyan/30 bg-cyan/5 text-cyan text-sm font-medium tracking-wide mb-6">
            X402 Protocol
          </span>
          <h2 className="font-[Orbitron] text-4xl md:text-5xl font-bold text-white mb-4 uppercase tracking-tight">
            How it{' '}
            <span className="bg-gradient-to-r from-cyan to-blue bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Gasless micropayments for physical hardware and AI services
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative"
              >
                {/* Step card */}
                <div className="relative p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:border-cyan/30 transition-colors group">
                  {/* Number badge */}
                  <div className="absolute -top-4 left-6">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan to-blue flex items-center justify-center font-[Orbitron] font-bold text-xs text-void">
                      {step.number}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center text-cyan mb-4 mt-2 group-hover:bg-cyan/20 transition-colors">
                    {step.icon}
                  </div>

                  <h3 className="font-[Orbitron] text-lg font-bold text-white mb-2 tracking-wide">
                    {step.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
                </div>

                {/* Arrow connector */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-cyan/30">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M6 3l5 5-5 5" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Code snippet preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 p-6 rounded-2xl border border-white/10 bg-void-light/50 backdrop-blur-sm font-mono text-sm overflow-x-auto"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="ml-2 text-white/40 text-xs">x402-payment.ts</span>
          </div>
          <pre className="text-white/70">
            <code>
              <span className="text-cyan">const</span> payment = <span className="text-cyan">await</span> x402.
              <span className="text-blue">createPayment</span>({'{'}
              {'\n'}  amount: <span className="text-green-400">"1.00"</span>,
              {'\n'}  token: <span className="text-green-400">"QUSD"</span>,
              {'\n'}  recipient: agent.<span className="text-blue">did</span>,
              {'\n'}{'}'});
            </code>
          </pre>
        </motion.div>
      </div>
    </section>
  )
}
