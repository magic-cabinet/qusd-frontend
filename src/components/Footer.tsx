import { motion } from 'framer-motion'

const socialLinks = [
  { name: 'X', href: '#', label: 'TW' },
  { name: 'Discord', href: '#', label: 'DC' },
  { name: 'GitHub', href: '#', label: 'GH' },
  { name: 'Telegram', href: '#', label: 'TG' },
]

const footerLinks = [
  {
    title: 'Product',
    code: 'P',
    links: ['Features', 'Documentation', 'API Reference', 'Changelog'],
  },
  {
    title: 'Company',
    code: 'C',
    links: ['About', 'Blog', 'Careers', 'Contact'],
  },
  {
    title: 'Legal',
    code: 'L',
    links: ['Privacy', 'Terms', 'Security', 'Compliance'],
  },
]

export default function Footer() {
  return (
    <footer className="relative pt-16 sm:pt-24 pb-8 border-t border-[#e5e5e5] bg-white overflow-hidden">
      {/* Dot background */}
      <div className="absolute inset-0 dot-pattern-light" />

      {/* Elliptical glows */}
      <div className="glow-ellipse glow-cyan w-[400px] h-[250px] -bottom-32 left-1/4 animate-float-slow opacity-15" />
      <div className="glow-ellipse glow-blue w-[300px] h-[200px] top-20 -right-20 animate-float opacity-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Top annotation bar */}
        <div className="flex items-center gap-4 mb-12">
          <span className="annotation">Footer</span>
          <div className="flex-1 h-px bg-[#e5e5e5]" />
          <span className="annotation">QUSD Protocol</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12 sm:mb-16">
          {/* Brand column */}
          <div className="col-span-2">
            {/* Logo */}
            <div className="mb-6">
              <img
                src="/qusd-logo-lockup-dark.svg"
                alt="QUSD"
                className="h-10 w-auto"
              />
            </div>

            <p className="text-[#737373] text-sm leading-relaxed mb-6 max-w-sm">
              Build the first financial layer for the machine economy. Power the pulse of the
              autonomous economy.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ y: -2 }}
                  className="w-10 h-10 border border-[#e5e5e5] flex items-center justify-center annotation rounded-full hover:border-[#0ECCED] hover:bg-gradient-to-r hover:from-[#0ECCED] hover:to-[#025EC4] hover:text-white transition-all"
                >
                  {social.label}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 border border-[#e5e5e5] flex items-center justify-center annotation text-[9px] rounded-full">
                  {column.code}
                </span>
                <h4 className="font-['Space_Mono'] font-bold text-sm text-[#0a0a0a]">
                  {column.title}
                </h4>
              </div>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[#737373] text-sm hover:text-[#0ECCED] transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-[#e5e5e5]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="annotation text-[#a3a3a3]">
              &copy; {new Date().getFullYear()} QUSD Protocol. All rights reserved.
            </p>
            <p className="annotation text-[#a3a3a3]">
              Machine-Native <span className="bg-gradient-to-r from-[#0ECCED] to-[#025EC4] bg-clip-text text-transparent">Stablecoin</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
