export default function Footer() {
  return (
    <footer className="relative pt-16 sm:pt-24 pb-8 border-t border-[#e5e5e5] bg-white overflow-hidden">
      {/* Dot background */}
      <div className="absolute inset-0 dot-pattern-light" />

      {/* Elliptical glows */}
      <div className="glow-ellipse glow-cyan w-[400px] h-[250px] -bottom-32 left-1/4 animate-float-slow opacity-15" />
      <div className="glow-ellipse glow-blue w-[300px] h-[200px] top-20 -right-20 animate-float opacity-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="mb-6">
            <img
              src="/qusd-logo-lockup-dark.svg"
              alt="QUSD"
              className="h-10 w-auto"
            />
          </div>

          <p className="text-[#737373] text-sm leading-relaxed mb-8 max-w-md">
            The financial layer for the machine economy.
          </p>

          {/* Bottom bar */}
          <div className="pt-6 border-t border-[#e5e5e5] w-full">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="annotation text-[#a3a3a3]">
                &copy; {new Date().getFullYear()} QUSD Protocol. All rights reserved.
              </p>
              <p className="annotation text-[#a3a3a3]">
                Machine-Native <span className="text-[#0052CC]">Stablecoin</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
