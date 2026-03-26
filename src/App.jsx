import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeProvider } from './ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Certifications from './components/Certification'
import MusicPlayer from './components/MusicPlayer'
import Experience from './components/Experience'
import Splash from './components/Splash'

function App() {
  const [entered, setEntered] = useState(false)

  return (
    <ThemeProvider>
      <AnimatePresence>
        {!entered && <Splash onEnter={() => setEntered(true)} />}
      </AnimatePresence>
      <motion.div
        className="pt-0 md:pt-12 pb-14 md:pb-0"
        initial={{ opacity: 0, y: 24 }}
        animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
      >
        <Navbar />
        <MusicPlayer autoplay={entered} />
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
      </motion.div>
    </ThemeProvider>
  )
}

export default App
