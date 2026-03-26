import { useState, useEffect, useRef } from 'react'
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
import Trends from './components/Trends'

function App() {
  const [entered, setEntered] = useState(false)
  const [view, setView] = useState('portfolio')
  const scrollTarget = useRef(null)

  function navigate(target) {
    if (target === 'tech') {
      setView('tech')
      scrollTarget.current = null
    } else {
      scrollTarget.current = target
      setView('portfolio')
    }
  }

  useEffect(() => {
    if (view === 'portfolio' && scrollTarget.current) {
      const id = scrollTarget.current
      const timer = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        scrollTarget.current = null
      }, 80)
      return () => clearTimeout(timer)
    }
  }, [view])

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
        <Navbar view={view} navigate={navigate} />
        <MusicPlayer autoplay={entered} />
        <AnimatePresence mode="wait">
          {view === 'portfolio' ? (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Hero />
              <About />
              <Experience />
              <Projects />
              <Certifications />
              <Contact />
            </motion.div>
          ) : (
            <motion.div
              key="tech"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Trends />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </ThemeProvider>
  )
}

export default App
