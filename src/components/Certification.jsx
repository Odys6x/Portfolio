import { useState } from 'react'
import { motion } from 'framer-motion'

const CERTS = [
  {
    id: 1,
    img: '/src/assets/Hackrift.jpg',
    emoji: '🏆',
    title: 'HackRift 2025',
    subtitle: '1st Runner-Up',
    issuer: 'HackRift · Dec 2025',
    desc: 'First Runner-Up at HackRift 2025 hackathon. Built PathFinders — an AI-powered school recommendation system for Singapore\'s S1 posting process.',
    cardBg: 'linear-gradient(135deg, #fffbe8, #fff3c4)',
    border: '#ffd93d',
    shadow: '#d4a800',
    accent: '#7a5000',
    tape: 'rgba(255,211,70,0.85)',
    tapeAngle: -5,
    rotate: -1.5,
    ribbon: { bg: 'linear-gradient(135deg, #ff6b6b, #ee3333)', shadow: '#aa1111', text: '🥈 1st Runner-Up' },
    stamp: '🎖️',
  },
  {
    id: 2,
    img: '/src/assets/SG50.jpg',
    emoji: '🎨',
    title: 'SG50 Art Curriculum',
    subtitle: 'Online Showcase',
    issuer: 'Issued by Liew Wei Li',
    desc: 'Awarded for recognition of quality artwork titled "Singapore\'s Pride" in the SG50 Art Curriculum Online Showcase.',
    cardBg: 'linear-gradient(135deg, #f5f0ff, #ede0ff)',
    border: '#c8aaff',
    shadow: '#8866dd',
    accent: '#5533aa',
    tape: 'rgba(200,180,255,0.85)',
    tapeAngle: 4,
    rotate: 1,
    ribbon: { bg: 'linear-gradient(135deg, #a8e6cf, #5cb88a)', shadow: '#3a8a5a', text: '🎨 Showcase' },
    stamp: '✦',
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

// Certificate SVG decoration — rosette/seal
function CertSeal({ color, size = 60 }) {
  return (
    <svg viewBox="0 0 80 80" style={{ width: size, height: size }}>
      {/* Outer burst */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const x1 = 40 + 28 * Math.cos(angle)
        const y1 = 40 + 28 * Math.sin(angle)
        const x2 = 40 + 34 * Math.cos(angle + Math.PI / 12)
        const y2 = 40 + 34 * Math.sin(angle + Math.PI / 12)
        return <line key={i} x1="40" y1="40" x2={x2} y2={y2} stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.4"/>
      })}
      <circle cx="40" cy="40" r="22" fill={color} opacity="0.15" stroke={color} strokeWidth="2"/>
      <circle cx="40" cy="40" r="16" fill={color} opacity="0.2"/>
      <circle cx="40" cy="40" r="10" fill={color} opacity="0.35"/>
      <text x="40" y="46" textAnchor="middle" fontSize="14" fill="white">★</text>
    </svg>
  )
}

function CertCard({ cert, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: cert.rotate }}
      whileInView={{ opacity: 1, y: 0, rotate: cert.rotate }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.15, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -12, rotate: 0, scale: 1.04, zIndex: 10 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ position: 'relative', cursor: 'default' }}
    >
      {/* Washi tape */}
      <div style={{
        position: 'absolute', top: -10, left: '50%',
        transform: `translateX(-50%) rotate(${cert.tapeAngle}deg)`,
        width: 64, height: 16,
        background: cert.tape, borderRadius: 3,
        boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
        zIndex: 2,
      }}/>

      {/* Card */}
      <div style={{
        background: cert.cardBg,
        border: `2.5px solid ${cert.border}`,
        borderRadius: 18,
        padding: '28px 24px 22px',
        boxShadow: `3px 5px 0 ${cert.shadow}, 0 10px 28px rgba(0,0,0,0.08)`,
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Faint ruled lines */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute', left: 0, right: 0,
            top: 28 + i * 24, height: 1,
            background: cert.border, opacity: 0.2,
            pointerEvents: 'none',
          }}/>
        ))}

        {/* Ribbon badge */}
        <div style={{
          position: 'absolute', top: 18, right: -4,
          background: cert.ribbon.bg,
          color: 'white', fontFamily: "'Caveat', cursive",
          fontSize: 13, fontWeight: 700,
          padding: '3px 14px 3px 10px',
          borderRadius: '6px 0 0 6px',
          boxShadow: `2px 2px 0 ${cert.ribbon.shadow}`,
        }}>{cert.ribbon.text}</div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: 18, alignItems: 'flex-start' }}>

          {/* Seal */}
          <motion.div
            animate={{ rotate: hovered ? 360 : 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            style={{ flexShrink: 0, marginTop: 4 }}
          >
            <CertSeal color={cert.border} size={64}/>
          </motion.div>

          {/* Text */}
          <div style={{ flex: 1 }}>
            {/* Emoji + title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 24 }}>{cert.emoji}</span>
              <div>
                <p style={{
                  fontFamily: "'Caveat', cursive", fontSize: 26, fontWeight: 700,
                  color: cert.accent, margin: 0, lineHeight: 1.1,
                }}>{cert.title}</p>
                <p style={{
                  fontFamily: "'Caveat', cursive", fontSize: 16, fontWeight: 700,
                  color: cert.accent, opacity: 0.75, margin: 0,
                }}>{cert.subtitle}</p>
              </div>
            </div>

            {/* Squiggle */}
            <svg viewBox="0 0 180 6" style={{ width: '80%', display: 'block', marginBottom: 8 }}>
              <path d="M0,3 C18,0 36,6 54,3 C72,0 90,6 108,3 C126,0 144,6 162,3 C174,0 180,5 180,3"
                fill="none" stroke={cert.border} strokeWidth="2" strokeLinecap="round"/>
            </svg>

            {/* Issuer pill */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              background: 'rgba(255,255,255,0.7)',
              border: `1.5px solid ${cert.border}`,
              borderRadius: 20, padding: '2px 10px', marginBottom: 10,
            }}>
              <span style={{ fontSize: 11 }}>📜</span>
              <span style={{ fontFamily: "'Caveat', cursive", fontSize: 13, color: cert.accent, opacity: 0.8 }}>
                {cert.issuer}
              </span>
            </div>

            {/* Description */}
            <p style={{
              fontFamily: "'Caveat', cursive", fontSize: 15,
              color: '#555', lineHeight: 1.55, margin: '0 0 12px',
            }}>{cert.desc}</p>

            {/* Certificate image */}
            {cert.img && (
              <motion.div
                whileHover={{ scale: 1.03 }}
                style={{
                  borderRadius: 10, overflow: 'hidden',
                  border: `2px solid ${cert.border}`,
                  boxShadow: `2px 3px 0 ${cert.shadow}`,
                  transform: 'rotate(-0.8deg)',
                }}
              >
                <img src={cert.img} alt={cert.title} style={{
                  width: '100%', display: 'block',
                  objectFit: 'cover',
                  filter: 'saturate(0.95)',
                }}/>
              </motion.div>
            )}
          </div>
        </div>

        {/* Corner stamp */}
        <motion.div
          animate={{ rotate: hovered ? [0, -15, 15, 0] : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute', bottom: 10, right: 14,
            fontFamily: "'Caveat', cursive", fontSize: 20,
            color: cert.border, opacity: 0.6,
          }}
        >{cert.stamp}</motion.div>
      </div>
    </motion.div>
  )
}

export default function Certifications() {
  return (
    <section
      id="certifications"
      style={{
        background: 'linear-gradient(160deg, #fffbe8 0%, #fff5f0 50%, #f5f0ff 100%)',
        position: 'relative', padding: '80px 48px', overflow: 'hidden',
      }}
    >
      {/* Background doodles */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <StarDoodle color="#ffd93d" size={28} style={{ position:'absolute', top:30, left:'5%', transform:'rotate(15deg)', opacity:0.6 }}/>
        <FlowerDoodle color="#c8aaff" style={{ position:'absolute', top:20, right:'7%', opacity:0.55 }}/>
        <HeartDoodle color="#ffd93d" size={22} style={{ position:'absolute', top:80, left:'14%', transform:'rotate(-20deg)', opacity:0.55 }}/>
        <StarDoodle color="#ffb3cc" size={20} style={{ position:'absolute', top:50, right:'18%', transform:'rotate(-10deg)', opacity:0.6 }}/>
        <FlowerDoodle color="#ffd93d" style={{ position:'absolute', bottom:30, left:'8%', opacity:0.5 }}/>
        <StarDoodle color="#a8e6cf" size={24} style={{ position:'absolute', bottom:50, right:'6%', transform:'rotate(25deg)', opacity:0.6 }}/>
        <HeartDoodle color="#c8aaff" size={20} style={{ position:'absolute', bottom:20, left:'35%', transform:'rotate(10deg)', opacity:0.5 }}/>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: 52 }}
      >
        <p style={{ fontFamily: "'Caveat', cursive", fontSize: 16, color: '#9a8855', letterSpacing: '0.3em', margin: '0 0 6px' }}>
          しょうじょう — awards & certs
        </p>
        <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: 48, fontWeight: 700, color: '#2a3a50', margin: '0 0 12px', lineHeight: 1 }}>
          Achievements 🏅
        </h2>
        <svg viewBox="0 0 300 10" style={{ width: 220, display: 'block', margin: '0 auto' }}>
          <path d="M0,5 C30,1 60,9 90,5 C120,1 150,9 180,5 C210,1 240,9 270,5 C285,1 296,8 300,5"
            fill="none" stroke="#ffd93d" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      </motion.div>

      {/* Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: 40,
        maxWidth: 900,
        margin: '0 auto',
        alignItems: 'start',
      }}>
        {CERTS.map((cert, i) => (
          <CertCard key={cert.id} cert={cert} index={i}/>
        ))}
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&display=swap');`}</style>
    </section>
  )
}