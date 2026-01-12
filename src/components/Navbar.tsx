import { motion } from 'framer-motion'

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-[#030812]/80 backdrop-blur-md border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo from Figma */}
        <a href="/" className="flex items-center">
          <img
            src="/assets/qusd-wordmark-white.svg"
            alt="QUSD"
            className="h-8 w-auto"
          />
        </a>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {['About', 'Features', 'Ecosystem', 'Docs'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white/70 hover:text-[#0ECCED] transition-colors font-medium text-sm tracking-wide font-[Roboto]"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2.5 bg-gradient-to-r from-[#0ECCED] to-[#025EC4] rounded-full font-[Orbitron] font-semibold text-sm text-[#030812] tracking-wide"
        >
          Launch App
        </motion.button>
      </div>
    </motion.nav>
  )
}
