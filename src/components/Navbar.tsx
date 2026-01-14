import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const navItems = [
  { label: 'Protocol', href: '#about', code: '01', isRoute: false },
  { label: 'Architecture', href: '#features', code: '02', isRoute: false },
  { label: 'Whitepaper', href: '/whitepaper', code: '03', isRoute: true },
  { label: 'Docs', href: '#docs', code: '04', isRoute: false },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-[#e5e5e5] bg-[#fafaf9]/90 backdrop-blur-sm"
      >
        {/* Top annotation bar */}
        <div className="hidden sm:flex items-center justify-between px-6 py-1 border-b border-[#e5e5e5] bg-[#f5f5f4]">
          <span className="annotation">QUSD Protocol v1.0</span>
          <span className="annotation">Machine-Native Stablecoin Infrastructure</span>
          <span className="annotation">Status: Active</span>
        </div>

        <div className="px-4 sm:px-6 py-3 sm:py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src="/qusd-logo-lockup-dark.svg"
                alt="QUSD"
                style={{ width: 'auto', height: '44px' }}
              />
            </Link>

            {/* Nav Links - Desktop */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                item.isRoute ? (
                  <Link
                    key={item.code}
                    to={item.href}
                    className="group px-4 py-2 flex items-center gap-2 hover:bg-[#0a0a0a] transition-colors duration-200 rounded-full"
                  >
                    <span className="annotation text-[#a3a3a3] group-hover:text-[#737373]">{item.code}</span>
                    <span className="text-sm font-medium text-[#0a0a0a] group-hover:text-white transition-colors">
                      {item.label}
                    </span>
                  </Link>
                ) : (
                  <a
                    key={item.code}
                    href={item.href}
                    className="group px-4 py-2 flex items-center gap-2 hover:bg-[#0a0a0a] transition-colors duration-200 rounded-full"
                  >
                    <span className="annotation text-[#a3a3a3] group-hover:text-[#737373]">{item.code}</span>
                    <span className="text-sm font-medium text-[#0a0a0a] group-hover:text-white transition-colors">
                      {item.label}
                    </span>
                  </a>
                )
              ))}
            </div>

            <div className="flex items-center gap-3">
              {/* Status indicator */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 border border-[#e5e5e5] rounded-full">
                <div className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse" />
                <span className="annotation">Mainnet</span>
              </div>

              {/* Hamburger Menu - Mobile */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden w-10 h-10 border border-[#e5e5e5] flex items-center justify-center rounded-full"
                aria-label="Toggle menu"
              >
                <div className="flex flex-col gap-1">
                  <motion.span
                    animate={isOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                    className="w-5 h-0.5 bg-[#0a0a0a] block"
                  />
                  <motion.span
                    animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                    className="w-5 h-0.5 bg-[#0a0a0a] block"
                  />
                  <motion.span
                    animate={isOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                    className="w-5 h-0.5 bg-[#0a0a0a] block"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#fafaf9] md:hidden"
            style={{ top: '60px' }}
          >
            {/* Dot background */}
            <div className="absolute inset-0 dot-pattern-light" />

            {/* Elliptical glow */}
            <div className="glow-ellipse glow-cyan w-64 h-64 top-20 -right-32 animate-float opacity-20" />

            <div className="relative p-6">
              <div className="space-y-2">
                {navItems.map((item, index) => (
                  item.isRoute ? (
                    <motion.div
                      key={item.code}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between p-4 border border-[#e5e5e5] rounded-2xl bg-white hover:bg-[#f5f5f4] transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <span className="w-8 h-8 border border-[#e5e5e5] flex items-center justify-center annotation rounded-full">
                            {item.code}
                          </span>
                          <span className="font-medium text-lg">{item.label}</span>
                        </div>
                        <span className="text-[#a3a3a3]">→</span>
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.a
                      key={item.code}
                      href={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between p-4 border border-[#e5e5e5] rounded-2xl bg-white hover:bg-[#f5f5f4] transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <span className="w-8 h-8 border border-[#e5e5e5] flex items-center justify-center annotation rounded-full">
                          {item.code}
                        </span>
                        <span className="font-medium text-lg">{item.label}</span>
                      </div>
                      <span className="text-[#a3a3a3]">→</span>
                    </motion.a>
                  )
                ))}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
