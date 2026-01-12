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
  { label: 'Total Value Locked', value: 50, suffix: 'K', height: '100%' },
  { label: 'Transactions', value: 35, suffix: 'K', height: '74%' },
  { label: 'Active Agents', value: 20, suffix: 'K', height: '59%' },
  { label: 'Integrations', value: 10, suffix: 'K', height: '31%' },
]

export default function Metrics() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-32 relative bg-[#00c3ff] overflow-hidden" ref={ref}>
      {/* Background coins */}
      <div className="absolute inset-0 opacity-20">
        <img
          src="/assets/qusd-coins-cyan-bg.png"
          alt=""
          className="w-full h-full object-cover mix-blend-luminosity"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#043780]/50 via-transparent to-transparent" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <img src="/assets/qusd-wordmark-white.svg" alt="QUSD" className="h-6" />
          </div>
          <h2 className="font-[Orbitron] text-3xl md:text-4xl font-bold text-white uppercase tracking-tight mb-2">
            TVL Updates
          </h2>
          <p className="text-white/80 text-sm max-w-md font-[Roboto]">
            Orbitron Bold embodies precision and technological sophistication.
            It features consistent spacing and structural balance across all weights.
          </p>
        </motion.div>

        {/* Bar chart - Figma style with glass morphism */}
        <div className="flex items-end justify-center gap-4 md:gap-8 h-[400px] mt-12">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, height: 0 }}
              animate={isInView ? { opacity: 1, height: metric.height } : {}}
              transition={{ duration: 0.8, delay: index * 0.15, ease: 'easeOut' }}
              className="relative w-20 md:w-28 flex flex-col items-center"
              style={{ minHeight: metric.height }}
            >
              {/* Glass bar */}
              <div
                className="w-full rounded-t-lg relative overflow-hidden h-full"
                style={{
                  background: 'rgba(0, 195, 255, 0.39)',
                  boxShadow: `
                    inset 0px 52px 62px -31px white,
                    inset 0px 0px 52px 0px rgba(255,255,255,0.5),
                    inset 0px 4px 7px -5px rgba(255,255,255,0.16)
                  `,
                }}
              >
                {/* Solid base */}
                <div className="absolute inset-0 bg-[#00c3ff]" />
                {/* Glass overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'rgba(0, 195, 255, 0.39)',
                    boxShadow: `
                      inset 0px 52px 62px -31px white,
                      inset 0px 0px 52px 0px rgba(255,255,255,0.5),
                      inset 0px 4px 7px -5px rgba(255,255,255,0.16)
                    `,
                  }}
                />
              </div>

              {/* Value label */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 font-[Orbitron] text-2xl md:text-4xl font-bold text-white uppercase">
                <AnimatedCounter value={metric.value} suffix={metric.suffix} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* QUSD watermark */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center opacity-20">
          <img src="/assets/qusd-wordmark-white.svg" alt="" className="h-24" />
        </div>
      </div>
    </section>
  )
}
