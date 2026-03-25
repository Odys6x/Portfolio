import { motion } from 'framer-motion'

function Navbar() {
  const links = [
    { label: 'About', href: 'about' },
    { label: 'Projects', href: 'projects' },
    { label: 'Contact', href: 'contact' },
  ]

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="hidden md:flex fixed top-0 left-0 right-0 h-12 z-50 items-center justify-between px-8"
        style={{ borderBottom: '1px solid #2a2a2a', backgroundColor: 'rgba(13,13,13,0.97)', backdropFilter: 'blur(8px)', paddingRight: 56 }}
      >
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, letterSpacing: '0.12em', color: '#E02020', fontWeight: 600 }}>
          オウェン・ウォン
        </div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '0.3em', color: '#999', textTransform: 'uppercase' }}>
          AI Engineer · Developer · Singapore
        </div>
        <ul className="flex items-center gap-8">
          {links.map((link) => (
            <li key={link.label}>
              <button
                onClick={() => scrollTo(link.href)}
                style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#aaa', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}
                onMouseEnter={e => e.target.style.color = '#E02020'}
                onMouseLeave={e => e.target.style.color = '#aaa'}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </motion.nav>

      <motion.nav
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex md:hidden fixed bottom-0 left-0 right-0 h-14 z-50 items-center justify-around px-4"
        style={{ borderTop: '1px solid #2a2a2a', backgroundColor: 'rgba(13,13,13,0.97)', backdropFilter: 'blur(8px)' }}
      >
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: '#E02020', letterSpacing: '0.05em' }}>OW</div>
        {links.map((link) => (
          <button
            key={link.label}
            onClick={() => scrollTo(link.href)}
            style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#666', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}
          >
            {link.label}
          </button>
        ))}
      </motion.nav>
    </>
  )
}

export default Navbar
