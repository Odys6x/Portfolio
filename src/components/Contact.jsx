import { useState } from 'react'
import { motion } from 'framer-motion'

const LINKS = [
  {
    id: 'github',
    emoji: '🐙',
    label: 'GitHub',
    ja: 'ギットハブ',
    sub: 'github.com/Odys6x',
    href: 'https://github.com/Odys6x',
    bg: 'linear-gradient(135deg, #e8f0ff, #d0e0ff)',
    border: '#92b4ff',
    shadow: '#5577ee',
    color: '#2244bb',
    tape: 'rgba(180,200,255,0.85)',
    rotate: -1.5,
  },
  {
    id: 'linkedin',
    emoji: '💼',
    label: 'LinkedIn',
    ja: 'リンクトイン',
    sub: 'linkedin.com/in/owenwong',
    href: 'https://linkedin.com/in/owenwong',
    bg: 'linear-gradient(135deg, #e8fff4, #ccf5e4)',
    border: '#7ddaaa',
    shadow: '#3aaa70',
    color: '#1a7a48',
    tape: 'rgba(180,255,210,0.85)',
    rotate: 1,
  },
  {
    id: 'email',
    emoji: '💌',
    label: 'Email',
    ja: 'メール',
    sub: 'phoinexw@gmail.com',
    href: 'mailto:phoinexw@gmail.com',
    bg: 'linear-gradient(135deg, #fff0f5, #ffd6e8)',
    border: '#ffaacc',
    shadow: '#ee6699',
    color: '#cc2266',
    tape: 'rgba(255,180,210,0.85)',
    rotate: -0.8,
  },
]

function StarDoodle({ color, size = 24, style }) {
  return (
    <svg viewBox="0 0 40 40" style={{ width: size, height: size, flexShrink: 0, ...style }}>
      <path d="M20,3 L23,15 L35,15 L26,23 L29,36 L20,28 L11,36 L14,23 L5,15 L17,15 Z"
        fill={color} stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  )
}

function HeartDoodle({ color, size = 20, style }) {
  return (
    <svg viewBox="0 0 30 28" style={{ width: size, flexShrink: 0, ...style }}>
      <path d="M15,24 C15,24 3,16 3,9 C3,5 6,2 10,2 C12,2 14,4 15,5 C16,4 18,2 20,2 C24,2 27,5 27,9 C27,16 15,24 15,24 Z"
        fill={color} stroke="white" strokeWidth="1.5"/>
    </svg>
  )
}

function FlowerDoodle({ color, style }) {
  return (
    <svg viewBox="0 0 40 40" style={{ width: 32, flexShrink: 0, ...style }}>
      <circle cx="20" cy="20" r="6" fill="#FFD700"/>
      {[0,60,120,180,240,300].map(a => (
        <ellipse key={a}
          cx={20 + 11*Math.cos(a*Math.PI/180)} cy={20 + 11*Math.sin(a*Math.PI/180)}
          rx="5" ry="7"
          transform={`rotate(${a} ${20 + 11*Math.cos(a*Math.PI/180)} ${20 + 11*Math.sin(a*Math.PI/180)})`}
          fill={color} stroke="white" strokeWidth="1"/>
      ))}
    </svg>
  )
}

function LinkCard({ link, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.a
      href={link.href}
      target={link.id !== 'email' ? '_blank' : undefined}
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40, rotate: link.rotate }}
      whileInView={{ opacity: 1, y: 0, rotate: link.rotate }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -12, rotate: 0, scale: 1.05, zIndex: 10 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ position: 'relative', textDecoration: 'none', display: 'block' }}
    >
      {/* Washi tape */}
      <div style={{
        position: 'absolute', top: -10, left: '50%',
        transform: `translateX(-50%) rotate(${link.rotate * -1.5}deg)`,
        width: 55, height: 15,
        background: link.tape, borderRadius: 3,
        boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
        zIndex: 2,
      }}/>

      {/* Card */}
      <div style={{
        background: link.bg,
        border: `2.5px solid ${link.border}`,
        borderRadius: 20,
        padding: '28px 28px 22px',
        boxShadow: `3px 5px 0 ${link.shadow}, 0 8px 24px rgba(0,0,0,0.07)`,
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Faint ruled lines */}
        {Array.from({length: 6}).map((_,i) => (
          <div key={i} style={{
            position: 'absolute', left: 0, right: 0,
            top: 24 + i * 22, height: 1,
            background: link.border, opacity: 0.2,
            pointerEvents: 'none',
          }}/>
        ))}

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 18 }}>
          {/* Big emoji */}
          <motion.div
            animate={{ rotate: hovered ? [0, -15, 15, -10, 10, 0] : 0 }}
            transition={{ duration: 0.5 }}
            style={{
              fontSize: 48, lineHeight: 1, flexShrink: 0,
              filter: 'drop-shadow(2px 3px 4px rgba(0,0,0,0.12))',
            }}
          >
            {link.emoji}
          </motion.div>

          {/* Text */}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 2 }}>
              <p style={{
                fontFamily: "'Caveat', cursive", fontSize: 30, fontWeight: 700,
                color: link.color, margin: 0, lineHeight: 1,
              }}>{link.label}</p>
              <span style={{
                fontFamily: "'Caveat', cursive", fontSize: 13,
                color: link.color, opacity: 0.5, letterSpacing: '0.05em',
              }}>{link.ja}</span>
            </div>
            <p style={{
              fontFamily: "'Caveat', cursive", fontSize: 16,
              color: link.color, opacity: 0.65, margin: 0,
            }}>{link.sub}</p>
          </div>

          {/* Arrow */}
          <motion.div
            animate={{ x: hovered ? 6 : 0 }}
            transition={{ type: 'spring', stiffness: 400 }}
            style={{
              fontFamily: "'Caveat', cursive", fontSize: 28,
              color: link.color, opacity: 0.5, flexShrink: 0,
            }}
          >→</motion.div>
        </div>
      </div>
    </motion.a>
  )
}

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        background: 'linear-gradient(160deg, #f0f8ff 0%, #fff9e6 50%, #fff0f5 100%)',
        position: 'relative', padding: '80px 24px 60px', overflow: 'hidden',
      }}
    >
      {/* Background doodles */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <StarDoodle color="#ffd93d" size={30} style={{ position:'absolute', top:30, left:'5%', transform:'rotate(20deg)', opacity:0.6 }}/>
        <FlowerDoodle color="#ffb3cc" style={{ position:'absolute', top:20, right:'8%', opacity:0.55 }}/>
        <HeartDoodle color="#a8e6cf" size={26} style={{ position:'absolute', top:90, left:'14%', transform:'rotate(-15deg)', opacity:0.55 }}/>
        <StarDoodle color="#b5a8ff" size={20} style={{ position:'absolute', top:50, right:'20%', transform:'rotate(-10deg)', opacity:0.6 }}/>
        <FlowerDoodle color="#ffd93d" style={{ position:'absolute', bottom:80, left:'6%', opacity:0.5 }}/>
        <HeartDoodle color="#ff9eb5" size={24} style={{ position:'absolute', bottom:60, right:'7%', transform:'rotate(15deg)', opacity:0.6 }}/>
        <StarDoodle color="#a8e6cf" size={22} style={{ position:'absolute', bottom:100, right:'28%', transform:'rotate(-25deg)', opacity:0.5 }}/>
        <StarDoodle color="#ffb3cc" size={18} style={{ position:'absolute', bottom:40, left:'30%', transform:'rotate(30deg)', opacity:0.55 }}/>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: 50 }}
      >
        <p style={{ fontFamily: "'Caveat', cursive", fontSize: 16, color: '#7a9ab5', letterSpacing: '0.3em', margin: '0 0 6px' }}>
          連絡先 — contact
        </p>
        <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: 52, fontWeight: 700, color: '#2a3a50', margin: '0 0 14px', lineHeight: 1 }}>
          Let's Connect!
        </h2>
        {/* Squiggle */}
        <svg viewBox="0 0 300 10" style={{ width: 240, display: 'block', margin: '0 auto 16px' }}>
          <path d="M0,5 C30,1 60,9 90,5 C120,1 150,9 180,5 C210,1 240,9 270,5 C285,1 296,8 300,5"
            fill="none" stroke="#ff9eb5" strokeWidth="3" strokeLinecap="round"/>
        </svg>

        {/* Note card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #fffdf6, #fff8e8)',
            border: '2.5px solid #ffd93d',
            borderRadius: 14, padding: '10px 24px',
            boxShadow: '2px 3px 0 #d4a800',
            position: 'relative',
          }}
        >
          {/* Tape on note */}
          <div style={{
            position: 'absolute', top: -8, left: '50%',
            transform: 'translateX(-50%) rotate(-3deg)',
            width: 48, height: 14,
            background: 'rgba(255,211,70,0.8)', borderRadius: 3,
          }}/>
          <p style={{ fontFamily: "'Caveat', cursive", fontSize: 17, color: '#7a5800', margin: 0 }}>
            whether it's a job opp, collab, or just a chat — inbox always open
          </p>
        </motion.div>
      </motion.div>

      {/* Link cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 32,
        maxWidth: 1000,
        margin: '0 auto 60px',
        alignItems: 'start',
      }}>
        {LINKS.map((link, i) => (
          <LinkCard key={link.id} link={link} index={i}/>
        ))}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        style={{ textAlign: 'center' }}
      >
        {/* Divider doodle */}
        <svg viewBox="0 0 400 10" style={{ width: '60%', maxWidth: 500, display: 'block', margin: '0 auto 16px' }}>
          <path d="M0,5 C40,1 80,9 120,5 C160,1 200,9 240,5 C280,1 320,9 360,5 C380,1 396,8 400,5"
            fill="none" stroke="#ffb3cc" strokeWidth="2" strokeLinecap="round" strokeDasharray="6,4"/>
        </svg>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}>
            <StarDoodle color="#ffd93d" size={16}/>
          </motion.div>
          <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <HeartDoodle color="#ff9eb5" size={16}/>
          </motion.div>
        </div>
      </motion.div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&display=swap');`}</style>
    </section>
  )
}