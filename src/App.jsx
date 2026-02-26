import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import MusicPlayer from './components/MusicPlayer'

function App() {
  return (
    <div>
      <Navbar />
      <MusicPlayer />
      <Hero />
      <About />
      <Projects />
      <Contact />
    </div>
  )
}

export default App