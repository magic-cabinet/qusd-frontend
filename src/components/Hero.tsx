import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030812]">
      {/* Gradient ellipse backgrounds from Figma */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src="/assets/gradient-ellipse-1.svg"
          alt=""
          className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] mix-blend-screen opacity-60"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        />
        <motion.img
          src="/assets/gradient-ellipse-2.svg"
          alt=""
          className="absolute -bottom-1/4 -right-1/4 w-[120%] h-[120%] mix-blend-screen opacity-40"
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        />
        <motion.img
          src="/assets/gradient-ellipse-3.svg"
          alt=""
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] mix-blend-screen opacity-50"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* QUSD coins background from Figma */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[60%] h-full mix-blend-lighten pointer-events-none"
      >
        <img
          src="/assets/qusd-coins-bg.png"
          alt=""
          className="w-full h-full object-cover object-left"
        />
      </motion.div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(14,204,237,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14,204,237,1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-[#0ECCED]/30 bg-[#0ECCED]/5 text-[#0ECCED] text-sm font-medium tracking-wide">
              Machine-Native Stablecoin
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-[Orbitron] text-5xl md:text-6xl lg:text-7xl font-bold text-white uppercase tracking-tight leading-[0.95] mb-6"
          >
            <span className="font-normal text-white/70">Stability </span>
            <span className="font-black">In</span>
            <br />
            <span className="font-black">Motion,</span>{' '}
            <span className="font-black bg-gradient-to-r from-[#0ECCED] to-[#025EC4] bg-clip-text text-transparent">
              Automated
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white/60 text-lg md:text-xl max-w-xl mb-10 leading-relaxed font-[Roboto]"
          >
            Build the first financial layer for the machine economy.
            Enabling seamless, instant, and verifiable transactions between AI, robotics, and IoT systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(14,204,237,0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-[#0ECCED] to-[#025EC4] rounded-full font-[Orbitron] font-bold text-[#030812] tracking-wide text-sm"
            >
              Get Started
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-white/20 hover:border-[#0ECCED]/50 rounded-full font-[Orbitron] font-semibold text-white/80 hover:text-white tracking-wide text-sm transition-colors"
            >
              Read Docs
            </motion.button>
          </motion.div>
        </div>

        {/* QUSD Wordmark - top right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute top-8 right-6 md:right-0"
        >
          <img
            src="/assets/qusd-wordmark-white.svg"
            alt="QUSD"
            className="h-12 md:h-16 w-auto"
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/30"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
