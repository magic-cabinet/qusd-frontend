import { motion, useSpring, useTransform } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 })
  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString()
  )

  useEffect(() => {
    if (isInView) {
      spring.set(value)
    }
  }, [isInView, spring, value])

  return (
    <span ref={ref}>
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  )
}

const metrics = [
  { code: 'M01', label: 'Total Value Locked', value: 50, suffix: 'M', unit: 'USD' },
  { code: 'M02', label: 'Transactions', value: 35, suffix: 'K', unit: 'count' },
  { code: 'M03', label: 'Active Agents', value: 20, suffix: 'K', unit: 'count' },
  { code: 'M04', label: 'Integrations', value: 127, suffix: '', unit: 'count' },
]

export default function Metrics() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-20 sm:py-32 relative bg-[#0a0a0a] overflow-hidden" ref={ref}>
      {/* Dot pattern overlay */}
      <div className="absolute inset-0 dot-pattern-dark" />

      {/* Elliptical glows */}
      <div className="glow-ellipse glow-cyan w-[600px] h-[400px] -top-40 -right-40 animate-float-slow opacity-30" />
      <div className="glow-ellipse glow-blue w-[500px] h-[300px] bottom-0 -left-40 animate-float-reverse opacity-25" />
      <div className="glow-ellipse glow-cyan w-[300px] h-[200px] top-1/2 right-1/3 animate-float opacity-15" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="annotation text-[#737373]">04</span>
            <div className="flex-1 h-px bg-[#262626]" />
            <span className="annotation text-[#737373]">Live Metrics</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="font-['Space_Mono'] text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                Network
                <br />
                <span className="relative inline-block">
                  Statistics
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0ECCED] to-[#025EC4] rounded-full" />
                </span>
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse" />
              <span className="annotation text-[#00ff88]">Live Data</span>
            </div>
          </div>
        </motion.div>

        {/* Metrics grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.code}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-[#111111] p-6 sm:p-8 rounded-2xl border border-[#262626] hover:border-[#0ECCED]/30 hover:shadow-lg hover:shadow-[#0ECCED]/10 transition-all relative overflow-hidden"
            >
              {/* Elliptical glow on hover */}
              <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-gradient-to-br from-[#0ECCED]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />

              {/* Code badge */}
              <div className="flex items-center justify-between mb-6 relative">
                <span className="annotation text-[#737373]">{metric.code}</span>
                <span className="annotation text-[#737373]">{metric.unit}</span>
              </div>

              {/* Value */}
              <div className="mb-2 relative">
                <span className="font-['Space_Mono'] text-4xl sm:text-5xl font-bold text-white">
                  <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                </span>
              </div>

              {/* Label */}
              <span className="annotation text-[#a3a3a3] relative">{metric.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Data source annotation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6 flex items-center justify-between"
        >
          <span className="annotation text-[#737373]">Last updated: {new Date().toISOString().split('T')[0]}</span>
          <span className="annotation text-[#737373]">Source: On-chain analytics</span>
        </motion.div>
      </div>
    </section>
  )
}
