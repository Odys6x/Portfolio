import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Certifications from './components/Certification'
import MusicPlayer from './components/MusicPlayer'
import Experience from './components/Experience'

function App() {
  return (
    <div>
      <Navbar />
      <MusicPlayer />
      <Hero />
      <About />
      <Experience /> 
      <Projects />
      <Certifications />
      <Contact />
    </div>
  )
}

export default App