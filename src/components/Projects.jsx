import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Project data ──
const PROJECTS = [
  {
    id: 1,
    img: '/src/assets/MOE.jpg',
    emoji: '🏆',
    badge: '2nd Place · Hackrift',
    badgeBg: '#ffd93d', badgeColor: '#7a5000',
    jaTitle: 'パスファインダー',
    title: 'PathFinders',
    desc: 'AI-powered school recommendation system for Singapore\'s Secondary 1 posting process. Being considered for MOE partnership.',
    tags: ['React', 'Python', 'Machine Learning', 'NLP'],
    tagColor: '#5544cc',
    cardBg: 'linear-gradient(135deg, #e8f4ff 0%, #d4eaff 100%)',
    borderColor: '#92c5ff',
    shadowColor: '#5599ee',
    accentColor: '#2255cc',
    tape: 'rgba(255,211,70,0.82)',
    tapeAngle: -6,
    rotate: -2,
    sticker: '✦',
    stickerColor: '#ffd93d',
    featured: true,
  },
  {
    id: 2,
    img: null,
    emoji: '🤖',
    badge: 'Capstone · SP Group',
    badgeBg: '#a8e6cf', badgeColor: '#1a5a38',
    jaTitle: 'エーアイエージェント',
    title: 'AI Agent Augmentation',
    desc: 'Multi-agent AI system for automated cyber incident response. Reduced response time from 45 mins → under 5 mins using fine-tuned DeepSeek + RAG.',
    tags: ['DeepSeek', 'RAG', 'Python', 'LangGraph'],
    tagColor: '#1a5a38',
    cardBg: 'linear-gradient(135deg, #e8fff2 0%, #ccf5e0 100%)',
    borderColor: '#7ddaaa',
    shadowColor: '#3aaa70',
    accentColor: '#1a7a48',
    tape: 'rgba(180,255,200,0.85)',
    tapeAngle: 5,
    rotate: 1.5,
    sticker: '★',
    stickerColor: '#a8e6cf',
  },
  {
    id: 3,
    img: '/src/assets/AWS.jpg',
    emoji: '☁️',
    badge: 'Cloud AI · AWS',
    badgeBg: '#ffb3cc', badgeColor: '#880033',
    jaTitle: 'キャリアコーチ',
    title: 'AWS Career Coach',
    desc: 'Cloud-based career coaching chatbot on AWS. Personalised career guidance using LLMs and retrieval-augmented generation.',
    tags: ['AWS', 'Python', 'RAG', 'LLM'],
    tagColor: '#880033',
    cardBg: 'linear-gradient(135deg, #fff0f5 0%, #ffd6e8 100%)',
    borderColor: '#ffaacc',
    shadowColor: '#ee6699',
    accentColor: '#cc2266',
    tape: 'rgba(255,180,200,0.82)',
    tapeAngle: -4,
    rotate: -1,
    sticker: '♡',
    stickerColor: '#ff9eb5',
  },
  {
    id: 4,
    img: '/src/assets/MSF.jpg',
    emoji: '🌏',
    badge: 'MSF · Empathetic AI',
    badgeBg: '#b5a8ff', badgeColor: '#330099',
    jaTitle: 'デジタルヒューマン',
    title: 'MSF Digital Human',
    desc: 'Multilingual digital human for the Ministry of Social and Family Development. Supports cross-cultural communication and assistance.',
    tags: ['Python', 'NLP', 'Multilingual AI', 'Full Stack'],
    tagColor: '#330099',
    cardBg: 'linear-gradient(135deg, #f5f0ff 0%, #e4d8ff 100%)',
    borderColor: '#c8aaff',
    shadowColor: '#8866dd',
    accentColor: '#6633bb',
    tape: 'rgba(200,180,255,0.82)',
    tapeAngle: 7,
    rotate: 2,
    sticker: '✿',
    stickerColor: '#b5a8ff',
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

function HeartDoodle({ color, size = 20, style }) {
  return (
    <svg viewBox="0 0 30 28" style={{ width: size, flexShrink: 0, ...style }}>
      <path d="M15,24 C15,24 3,16 3,9 C3,5 6,2 10,2 C12,2 14,4 15,5 C16,4 18,2 20,2 C24,2 27,5 27,9 C27,16 15,24 15,24 Z"
        fill={color} stroke="white" strokeWidth="1.5"/>
    </svg>
  )
}

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      custom={index}
      initial={{ opacity: 0, y: 50, rotate: project.rotate }}
      whileInView={{ opacity: 1, y: 0, rotate: project.rotate }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10, rotate: 0, scale: 1.03, zIndex: 10 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ position: 'relative', cursor: 'pointer' }}
    >
      {/* Washi tape top */}
      <div style={{
        position: 'absolute', top: -10, left: '50%',
        transform: `translateX(-50%) rotate(${project.tapeAngle}deg)`,
        width: 60, height: 16,
        background: project.tape,
        borderRadius: 3,
        boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
        zIndex: 2,
      }}/>

      {/* Card */}
      <div style={{
        background: project.cardBg,
        border: `2.5px solid ${project.borderColor}`,
        borderRadius: 16,
        padding: '28px 24px 22px',
        boxShadow: `3px 5px 0 ${project.shadowColor}, 0 8px 24px rgba(0,0,0,0.08)`,
        transition: 'box-shadow 0.2s',
        height: '100%',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* Ruled lines faint background */}
        {Array.from({length: 12}).map((_,i) => (
          <div key={i} style={{
            position: 'absolute', left: 0, right: 0,
            top: 30 + i * 24, height: 1,
            background: project.borderColor, opacity: 0.25,
            pointerEvents: 'none',
            zIndex: 0,
          }}/>
        ))}

        {/* Card content above lines */}
        <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Featured ribbon */}
        {project.featured && (
          <div style={{
            position: 'absolute', top: 14, right: -8,
            background: 'linear-gradient(135deg, #ff6b6b, #ee3333)',
            color: 'white', fontFamily: "'Caveat', cursive",
            fontSize: 12, fontWeight: 700,
            padding: '2px 14px 2px 10px',
            borderRadius: '4px 0 0 4px',
            boxShadow: '2px 2px 0 #aa1111',
            letterSpacing: '0.05em',
          }}>⭐ FEATURED</div>
        )}

        {/* Badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            background: project.badgeBg, borderRadius: 20,
            padding: '2px 10px',
            boxShadow: '1px 1px 0 rgba(0,0,0,0.12)',
          }}>
            <span style={{ fontSize: 12 }}>{project.emoji}</span>
            <span style={{ fontFamily: "'Caveat', cursive", fontSize: 13, color: project.badgeColor, fontWeight: 700 }}>
              {project.badge}
            </span>
          </div>
          <span style={{
            fontFamily: "'Caveat', cursive", fontSize: 11,
            color: project.accentColor, opacity: 0.6, letterSpacing: '0.05em'
          }}>
            {project.jaTitle}
          </span>
        </div>

        {/* Title */}
        <p style={{
          fontFamily: "'Caveat', cursive", fontSize: 32, fontWeight: 700,
          color: project.accentColor, lineHeight: 1.1, margin: '0 0 8px',
        }}>
          {project.title}
        </p>

        {/* Squiggle underline */}
        <svg viewBox="0 0 160 6" style={{ width: '70%', display: 'block', marginBottom: 12 }}>
          <path d="M0,3 C16,0 32,6 48,3 C64,0 80,6 96,3 C112,0 128,6 144,3 C152,0 158,6 160,3"
            fill="none" stroke={project.borderColor} strokeWidth="2" strokeLinecap="round"/>
        </svg>

        {/* Project image */}
        {project.img && (
          <div style={{
            width: '100%', height: 240, marginBottom: 16,
            borderRadius: 10, overflow: 'hidden',
            border: `2px solid ${project.borderColor}`,
            position: 'relative', zIndex: 2,
          }}>
            <img src={project.img} alt={project.title} style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center',
              display: 'block',
            }}/>
          </div>
        )}

        {/* Description */}
        <p style={{
          fontFamily: "'Caveat', cursive", fontSize: 17,
          color: '#444', lineHeight: 1.55, margin: '0 0 14px',
        }}>
          {project.desc}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {project.tags.map(tag => (
            <span key={tag} style={{
              fontFamily: "'Caveat', cursive", fontSize: 15,
              color: project.tagColor,
              background: 'rgba(255,255,255,0.7)',
              border: `1.5px solid ${project.borderColor}`,
              borderRadius: 20, padding: '1px 9px',
            }}>{tag}</span>
          ))}
        </div>

        </div>

        {/* Corner sticker */}
        <motion.div
          animate={{ rotate: hovered ? 360 : 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute', bottom: 12, right: 14,
            fontFamily: "'Caveat', cursive", fontSize: 22,
            color: project.stickerColor,
            filter: 'drop-shadow(1px 1px 0 rgba(0,0,0,0.1))',
          }}
        >
          {project.sticker}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section
      id="projects"
      style={{ background: 'linear-gradient(160deg, #fff9e6 0%, #fef6f0 50%, #f0f8ff 100%)', position: 'relative', padding: '80px 48px', overflow: 'hidden' }}
    >
      {/* Background doodles */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <StarDoodle color="#ffd93d" size={28} style={{ position:'absolute', top:30, left:'4%', transform:'rotate(15deg)', opacity:0.6 }}/>
        <FlowerDoodle color="#ffb3cc" style={{ position:'absolute', top:20, right:'6%', opacity:0.55 }}/>
        <HeartDoodle color="#a8e6cf" size={24} style={{ position:'absolute', top:80, left:'12%', transform:'rotate(-20deg)', opacity:0.55 }}/>
        <StarDoodle color="#b5a8ff" size={22} style={{ position:'absolute', top:40, right:'18%', transform:'rotate(-10deg)', opacity:0.6 }}/>
        <FlowerDoodle color="#ffd93d" style={{ position:'absolute', bottom:30, left:'8%', opacity:0.5 }}/>
        <StarDoodle color="#ff9eb5" size={26} style={{ position:'absolute', bottom:50, right:'5%', transform:'rotate(25deg)', opacity:0.6 }}/>
        <HeartDoodle color="#b5a8ff" size={20} style={{ position:'absolute', bottom:20, left:'35%', transform:'rotate(10deg)', opacity:0.5 }}/>
        <StarDoodle color="#a8e6cf" size={18} style={{ position:'absolute', bottom:60, right:'30%', transform:'rotate(-30deg)', opacity:0.55 }}/>
      </div>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: 52 }}
      >
        <p style={{ fontFamily: "'Caveat', cursive", fontSize: 16, color: '#7a9ab5', letterSpacing: '0.3em', margin: '0 0 6px' }}>
          プロジェクト — projects
        </p>
        <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: 48, fontWeight: 700, color: '#2a3a50', margin: '0 0 12px', lineHeight: 1 }}>
          What I've Built
        </h2>
        {/* Decorative underline */}
        <svg viewBox="0 0 300 10" style={{ width: 220, display: 'block', margin: '0 auto' }}>
          <path d="M0,5 C30,1 60,9 90,5 C120,1 150,9 180,5 C210,1 240,9 270,5 C285,1 296,8 300,5"
            fill="none" stroke="#ff9eb5" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      </motion.div>

      {/* Cards grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: 40,
        maxWidth: 1500,
        margin: '0 auto',
        alignItems: 'start',
      }}>
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i}/>
        ))}
      </div>

      {/* Bottom note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        style={{ textAlign: 'center', marginTop: 48 }}
      >
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(255,255,255,0.7)',
          border: '2px solid #ffd93d',
          borderRadius: 20, padding: '6px 20px',
          boxShadow: '2px 2px 0 #d4a800',
          fontFamily: "'Caveat', cursive", fontSize: 15, color: '#7a5000',
        }}>
          <span>✏️</span>
          <span>more projects on the way...</span>
          <motion.span animate={{ rotate: [0, 20, -20, 0] }} transition={{ repeat: Infinity, duration: 2 }}>✨</motion.span>
        </div>
      </motion.div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&display=swap');`}</style>
    </section>
  )
}