import { motion } from 'framer-motion'

const PHOTO = '/assets/Owen.jpg'

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: '#0D0D0D',
        display: 'flex',
        alignItems: 'stretch',
        overflow: 'hidden',
      }}
    >
      {/* ── LEFT: Text column ── */}
      <div
        style={{
          flex: '0 0 55%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px 48px 48px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Top meta */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'center', gap: 12 }}
        >
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '0.32em', color: '#777', textTransform: 'uppercase' }}>VOL.01</span>
          <span style={{ width: 16, height: 1, background: '#2a2a2a', display: 'inline-block' }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '0.32em', color: '#777', textTransform: 'uppercase' }}>2025</span>
          <span style={{ width: 16, height: 1, background: '#2a2a2a', display: 'inline-block' }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '0.32em', color: '#777', textTransform: 'uppercase' }}>SINGAPORE</span>
        </motion.div>

        {/* Main name */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.8 }}
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(80px, 10vw, 148px)',
              lineHeight: 0.88,
              color: '#E02020',
              letterSpacing: '0.02em',
              margin: 0,
            }}
          >
            OWEN<br />WONG
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 14 }}
          >
            <span style={{ width: 32, height: 2, background: '#E02020', display: 'inline-block', flexShrink: 0 }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.28em', color: '#888', textTransform: 'uppercase' }}>AI Engineer</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.28em', color: '#777', textTransform: 'uppercase' }}>/</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.28em', color: '#888', textTransform: 'uppercase' }}>Developer</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#999', lineHeight: 1.8, marginTop: 20, maxWidth: 380 }}
          >
            Final year AI student at Singapore Institute of Technology. Currently GenAI Developer at SP Group — building systems that cut incident response from 45 min to under 5.
          </motion.p>
        </div>

        {/* Bottom: tags + button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
            {['Python', 'LangGraph', 'RAG', 'AWS', 'React'].map(tag => (
              <span key={tag} style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '0.15em', color: '#888', border: '1px solid #2a2a2a', padding: '4px 12px', textTransform: 'uppercase' }}>
                {tag}
              </span>
            ))}
          </div>
          <motion.button
            whileHover={{ x: 6 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: '#E02020',
              border: 'none',
              color: 'white',
              fontFamily: "'Inter', sans-serif",
              fontSize: 10,
              letterSpacing: '0.28em',
              padding: '11px 28px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}
          >
            VIEW WORK →
          </motion.button>
        </motion.div>
      </div>

      {/* ── RIGHT: Photo column ── */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15, duration: 0.9 }}
        style={{ flex: '0 0 45%', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
      >
        <div style={{ position: 'absolute', left: 0, top: '10%', bottom: '10%', width: 1, background: '#2a2a2a', zIndex: 3 }} />

        {/* Photo — inset with padding, cover crop */}
        <div style={{ padding: '16px 40px 0', flex: 1 }}>
          <img
            src={PHOTO}
            alt="Owen Wong"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 30%',
              display: 'block',
              filter: 'contrast(1.05) saturate(0.7) brightness(0.85)',
            }}
          />
        </div>

        {/* Caption — pinned to bottom matching left column's 48px padding */}
        <div style={{ padding: '12px 40px 48px', textAlign: 'right' }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '0.28em', color: '#888', textTransform: 'uppercase', lineHeight: 2 }}>
            GENAI DEVELOPER @ SP GROUP<br />
            SINGAPORE INSTITUTE OF TECHNOLOGY
          </p>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 767px) {
          #hero { flex-direction: column !important; }
          #hero > div:first-child { flex: none !important; padding: 100px 24px 36px !important; }
          #hero > div:last-child { flex: none !important; height: 55vw !important; min-height: 260px; }
        }
      `}</style>
    </section>
  )
}
