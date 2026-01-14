import { motion } from 'framer-motion'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
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
      <HowItWorks />
      <Footer />
    </motion.div>
  )
}

export default App
