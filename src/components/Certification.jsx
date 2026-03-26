import { motion } from 'framer-motion'

const CERTS = [
  { id:1, img:'/assets/Hackrift.jpg', emoji:'🏆', title:'HackRift 2025', subtitle:'1st Runner-Up', issuer:'HackRift · Dec 2025', desc:"First Runner-Up at HackRift 2025 hackathon. Built PathFinders — an AI-powered school recommendation system for Singapore's S1 posting process." },
  { id:2, img:'/assets/SG50.jpg', emoji:'🎨', title:'SG50 Art Curriculum', subtitle:'Online Showcase', issuer:'Issued by Liew Wei Li', desc:'Awarded for recognition of quality artwork titled "Singapore\'s Pride" in the SG50 Art Curriculum Online Showcase.' },
]

function CertCard({ cert, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      style={{ paddingTop: 40, paddingBottom: 40, borderBottom: '1px solid var(--border)', display: 'grid', gridTemplateColumns: cert.img ? '1fr 1fr' : '1fr', gap: cert.img ? 48 : 0, alignItems: 'start' }}
      className="cert-card"
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.2em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{cert.issuer}</span>
        </div>
        <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(26px, 4vw, 40px)', color: 'var(--accent)', letterSpacing: '0.03em', lineHeight: 1, marginBottom: 4 }}>{cert.title}</h3>
        <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: 'var(--text-muted)', letterSpacing: '0.03em', lineHeight: 1, marginBottom: 16 }}>{cert.subtitle}</p>
        <div style={{ width: 32, height: 1, background: 'var(--accent)', marginBottom: 16 }} />
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.75 }}>{cert.desc}</p>
      </div>
      {cert.img && (
        <div className="cert-img" style={{ overflow: 'hidden' }}>
          <img src={cert.img} alt={cert.title} style={{ width: '100%', height: 'auto', display: 'block', filter: 'contrast(1.05) saturate(0.7) brightness(0.85)', transform: `rotate(${index % 2 === 0 ? '-1deg' : '1deg'})`, boxShadow: '4px 4px 20px rgba(0,0,0,0.3)', transition: 'transform 0.3s ease' }} />
        </div>
      )}
    </motion.div>
  )
}

export default function Certifications() {
  return (
    <section id="certifications" style={{ background: 'var(--bg-alt)', position: 'relative', zIndex: 1, paddingTop: 80, paddingBottom: 80 }}>
      <div style={{ position: 'relative', overflow: 'hidden', padding: '0 48px', marginBottom: 48, textAlign: 'right' }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.35em', color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', position: 'relative', zIndex: 1 }}>ISSUE 04 · RECOGNITION</p>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(40px, 8vw, 72px)', color: 'var(--accent)', letterSpacing: '0.02em', lineHeight: 1, position: 'relative', zIndex: 1 }}>ACHIEVEMENTS</h2>
        <div style={{ width: '100%', height: 1, background: 'var(--border)', marginTop: 16, position: 'relative', zIndex: 1 }} />
      </div>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 48px' }}>
        <div>
          {CERTS.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 767px) {
          #certifications > div:first-child { padding: 0 20px !important; }
          #certifications > div:last-child { padding: 0 20px !important; }
          .cert-card { grid-template-columns: 1fr !important; gap: 20px !important; }
          .cert-img { order: -1; }
        }
      `}</style>
    </section>
  )
}
