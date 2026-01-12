import { motion } from 'framer-motion'
import Hero from './components/Hero'
import WhatIsQUSD from './components/WhatIsQUSD'
import Features from './components/Features'
import Metrics from './components/Metrics'
import HowItWorks from './components/HowItWorks'
import Partners from './components/Partners'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-void"
    >
      <Navbar />
      <Hero />
      <WhatIsQUSD />
      <Features />
      <Metrics />
      <HowItWorks />
      <Partners />
      <Footer />
    </motion.div>
  )
}

export default App
