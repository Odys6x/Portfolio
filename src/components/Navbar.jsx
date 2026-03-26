import { motion } from 'framer-motion'
import { useTheme } from '../ThemeContext'

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
    </svg>
  )
}

function Navbar() {
  const { theme, toggleTheme } = useTheme()

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
        style={{ borderBottom: '1px solid var(--border)', backgroundColor: theme === 'dark' ? 'rgba(13,13,13,0.97)' : 'rgba(242,236,226,0.97)', backdropFilter: 'blur(8px)', paddingRight: 56 }}
      >
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, letterSpacing: '0.12em', color: 'var(--accent)', fontWeight: 600 }}>
          オウェン・ウォン
        </div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '0.3em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          AI Engineer · Developer · Singapore
        </div>
        <ul className="flex items-center gap-8">
          {links.map((link) => (
            <li key={link.label}>
              <button
                onClick={() => scrollTo(link.href)}
                style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
              >
                {link.label}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              style={{
                background: 'none',
                border: '1px solid var(--border)',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 28,
                height: 28,
                borderRadius: 2,
                padding: 0,
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
          </li>
        </ul>
      </motion.nav>

      <motion.nav
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex md:hidden fixed bottom-0 left-0 right-0 h-14 z-50 items-center justify-around px-4"
        style={{ borderTop: '1px solid var(--border)', backgroundColor: theme === 'dark' ? 'rgba(13,13,13,0.97)' : 'rgba(242,236,226,0.97)', backdropFilter: 'blur(8px)' }}
      >
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: 'var(--accent)', letterSpacing: '0.05em' }}>OW</div>
        {links.map((link) => (
          <button
            key={link.label}
            onClick={() => scrollTo(link.href)}
            style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}
          >
            {link.label}
          </button>
        ))}
        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 28,
            height: 28,
            padding: 0,
          }}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </motion.nav>
    </>
  )
}

export default Navbar
