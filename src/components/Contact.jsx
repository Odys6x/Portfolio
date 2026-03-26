import { motion } from 'framer-motion'

const LINKS = [
  { id:'github',   label:'GitHub',   sub:'github.com/Odys6x',      href:'https://github.com/Odys6x' },
  { id:'linkedin', label:'LinkedIn', sub:'linkedin.com/in/wongchunowen', href:'https://www.linkedin.com/in/wongchunowen/' },
  { id:'email',    label:'Email',    sub:'phoinexw@gmail.com',       href:'mailto:phoinexw@gmail.com' },
]

const ICONS = {
  github: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
    </svg>
  ),
  linkedin: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  email: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="M2 7l10 7 10-7"/>
    </svg>
  ),
}

function LinkCard({ link, index }) {
  return (
    <motion.a
      href={link.href}
      target={link.id !== 'email' ? '_blank' : undefined}
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -4 }}
      style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '36px 24px', border: '1px solid var(--border)', cursor: 'pointer', flex: 1 }}
    >
      <div style={{ color: 'var(--accent)' }}>{ICONS[link.id]}</div>
      <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: 'var(--text)', letterSpacing: '0.08em', lineHeight: 1 }}>{link.label}</p>
      <p className="contact-sub" style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'var(--text-faint)', letterSpacing: '0.06em' }}>{link.sub}</p>
    </motion.a>
  )
}

export default function Contact() {
  return (
    <section id="contact" style={{ background: 'var(--bg)', position: 'relative', zIndex: 1, paddingTop: 80, paddingBottom: 100 }}>
      <div style={{ position: 'relative', overflow: 'hidden', padding: '0 48px', marginBottom: 48, textAlign: 'center' }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.35em', color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', position: 'relative', zIndex: 1 }}>ISSUE 05 · CONTACT</p>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(40px, 8vw, 72px)', color: 'var(--accent)', letterSpacing: '0.02em', lineHeight: 1, position: 'relative', zIndex: 1 }}>LET'S CONNECT</h2>
        <div style={{ width: '100%', height: 1, background: 'var(--border)', marginTop: 16, position: 'relative', zIndex: 1 }} />
      </div>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 48px' }}>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 48, textAlign: 'center' }}
        >
          Whether it's a job opportunity, a collaboration, or just a chat — my inbox is always open.
        </motion.p>

        <div className="contact-links" style={{ display: 'flex', gap: 16 }}>
          {LINKS.map((link, i) => (
            <LinkCard key={link.id} link={link} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{ marginTop: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '0.25em', color: 'var(--text-dim)', textTransform: 'uppercase' }}>OWEN WONG · SINGAPORE · 2026</p>
          <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, color: 'var(--text-dim)', letterSpacing: '0.1em' }}>VOL.01</p>
        </motion.div>
      </div>
      <style>{`
        @media (max-width: 767px) {
          #contact > div:first-child { padding: 0 20px !important; }
          #contact > div:last-child { padding: 0 20px !important; }
          .contact-links { flex-direction: column !important; }
          .contact-links > a { flex-direction: row !important; justify-content: flex-start !important; gap: 16px !important; padding: 20px 16px !important; }
          .contact-sub { display: none !important; }
        }
      `}</style>
    </section>
  )
}
