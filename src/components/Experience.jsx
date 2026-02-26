import { motion } from 'framer-motion'

const EXPERIENCES = [
  {
    id: 1,
    emoji: '🛡️',
    role: 'GenAI Developer',
    company: 'SP Group',
    period: 'Sep 2025 – Present',
    type: 'Internship · On-site',
    desc: 'Built AI Agent Augmentation system — reduced cybersecurity incident response from 45 min → under 5 min using fine-tuned DeepSeek + RAG pipeline.',
    tags: ['DeepSeek', 'RAG', 'Python', 'LangGraph'],
    current: true,
    bg: '#e8fff4', border: '#7ddaaa', shadow: '#3aaa70', accent: '#1a7a48', dot: '#3aaa70',
    tape: 'rgba(180,255,210,0.85)',
  },
  {
    id: 2,
    emoji: '🎓',
    role: 'GenerativeAI App Developer',
    company: 'Singapore Institute of Technology',
    period: 'Jan 2025 – Apr 2025',
    type: 'Part-time · 4 mos',
    desc: 'Developed AWS-powered career coaching chatbot for hospitality students and mid-career professionals. Mean satisfaction score 8.45/10.',
    tags: ['AWS', 'LLM', 'Python', 'RAG'],
    bg: '#e8f4ff', border: '#92c5ff', shadow: '#5599ee', accent: '#2244bb', dot: '#5599ee',
    tape: 'rgba(180,210,255,0.85)',
  },
  {
    id: 3,
    emoji: '🔬',
    role: 'AI Research Assistant',
    company: 'Singapore Institute of Technology',
    period: 'Jul 2024 – Apr 2025',
    type: 'Part-time · 10 mos',
    desc: 'Enhanced MRI scan quality using advanced image processing techniques for improved diagnostic accuracy and interpretability.',
    tags: ['Computer Vision', 'Medical Imaging', 'Python'],
    bg: '#f5f0ff', border: '#c8aaff', shadow: '#8866dd', accent: '#5533aa', dot: '#8866dd',
    tape: 'rgba(200,180,255,0.85)',
  },
  {
    id: 4,
    emoji: '💼',
    role: 'IT Assistant',
    company: 'ATT Systems Group',
    period: 'Mar 2020 – May 2020',
    type: 'Internship · 3 mos',
    desc: 'Provided technical assistance and day-to-day operational support for office systems in Singapore.',
    tags: ['IT Support', 'Operations'],
    bg: '#fff5f0', border: '#ffaa88', shadow: '#dd6633', accent: '#aa3311', dot: '#dd6633',
    tape: 'rgba(255,190,160,0.85)',
  },
  {
    id: 5,
    emoji: '🖥️',
    role: 'IT Assistant',
    company: 'Setsco Services Pte Ltd',
    period: 'Dec 2017 – Apr 2018',
    type: 'Part-time · 5 mos',
    desc: 'Solved client issues by installing programs, fixing computers and providing day-to-day IT support.',
    tags: ['IT Support', 'Troubleshooting'],
    bg: '#fffbe8', border: '#ffd93d', shadow: '#d4a800', accent: '#7a5000', dot: '#d4a800',
    tape: 'rgba(255,220,100,0.85)',
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

function TimelineCard({ exp, index }) {
  const isLeft = index % 2 === 0

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 56px 1fr',
      alignItems: 'start',
      marginBottom: 48,
    }}>
      {/* LEFT SLOT */}
      <div style={{ paddingRight: 20, paddingTop: 8 }}>
        {isLeft ? (
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'relative' }}
          >
            {/* Washi tape */}
            <div style={{
              position: 'absolute', top: -9, right: '30%',
              transform: 'rotate(-4deg)',
              width: 52, height: 14,
              background: exp.tape, borderRadius: 3,
              boxShadow: '0 1px 4px rgba(0,0,0,0.1)', zIndex: 2,
            }}/>
            <Card exp={exp}/>
          </motion.div>
        ) : (
          /* Period label on empty side */
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 + 0.2 }}
            style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 16 }}
          >
            <span style={{
              fontFamily: "'Caveat', cursive", fontSize: 14,
              color: exp.accent, opacity: 0.65,
              background: 'rgba(255,255,255,0.7)',
              border: `1.5px solid ${exp.border}`,
              borderRadius: 20, padding: '3px 12px',
            }}>📅 {exp.period}</span>
          </motion.div>
        )}
      </div>

      {/* CENTRE DOT */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 20 }}>
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 + 0.1, type: 'spring', stiffness: 350 }}
          style={{
            width: 22, height: 22, borderRadius: '50%',
            background: exp.dot,
            border: '3px solid white',
            boxShadow: `0 0 0 3px ${exp.dot}, 0 4px 10px rgba(0,0,0,0.15)`,
            zIndex: 2, flexShrink: 0,
          }}
        />
      </div>

      {/* RIGHT SLOT */}
      <div style={{ paddingLeft: 20, paddingTop: 8 }}>
        {!isLeft ? (
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'relative' }}
          >
            {/* Washi tape */}
            <div style={{
              position: 'absolute', top: -9, left: '30%',
              transform: 'rotate(4deg)',
              width: 52, height: 14,
              background: exp.tape, borderRadius: 3,
              boxShadow: '0 1px 4px rgba(0,0,0,0.1)', zIndex: 2,
            }}/>
            <Card exp={exp}/>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 + 0.2 }}
            style={{ paddingTop: 16 }}
          >
            <span style={{
              fontFamily: "'Caveat', cursive", fontSize: 14,
              color: exp.accent, opacity: 0.65,
              background: 'rgba(255,255,255,0.7)',
              border: `1.5px solid ${exp.border}`,
              borderRadius: 20, padding: '3px 12px',
            }}>📅 {exp.period}</span>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function Card({ exp }) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
      style={{
        background: exp.bg,
        border: `2.5px solid ${exp.border}`,
        borderRadius: 16,
        padding: '18px 20px 14px',
        boxShadow: `3px 4px 0 ${exp.shadow}, 0 6px 20px rgba(0,0,0,0.07)`,
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Faint ruled lines */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute', left: 0, right: 0,
          top: 22 + i * 22, height: 1,
          background: exp.border, opacity: 0.2,
          pointerEvents: 'none',
        }}/>
      ))}

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Current badge */}
        {exp.current && (
          <div style={{
            display: 'inline-block', marginBottom: 8,
            background: 'linear-gradient(135deg, #3aaa70, #1a7a48)',
            color: 'white', fontFamily: "'Caveat', cursive",
            fontSize: 12, fontWeight: 700,
            padding: '2px 12px', borderRadius: 20,
            boxShadow: '1px 2px 0 #0a5030',
          }}>✦ Current</div>
        )}

        {/* Role + company */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 6 }}>
          <span style={{ fontSize: 28, flexShrink: 0, lineHeight: 1 }}>{exp.emoji}</span>
          <div>
            <p style={{
              fontFamily: "'Caveat', cursive", fontSize: 20, fontWeight: 700,
              color: exp.accent, margin: 0, lineHeight: 1.1,
            }}>{exp.role}</p>
            <p style={{
              fontFamily: "'Caveat', cursive", fontSize: 14,
              color: exp.accent, opacity: 0.75, margin: '2px 0 0',
            }}>{exp.company} · {exp.type}</p>
          </div>
        </div>

        {/* Squiggle */}
        <svg viewBox="0 0 160 5" style={{ width: '80%', display: 'block', marginBottom: 8 }}>
          <path d="M0,2.5 C16,0 32,5 48,2.5 C64,0 80,5 96,2.5 C112,0 128,5 144,2.5 C154,0 160,4 160,2.5"
            fill="none" stroke={exp.border} strokeWidth="2" strokeLinecap="round"/>
        </svg>

        {/* Desc */}
        <p style={{
          fontFamily: "'Caveat', cursive", fontSize: 14,
          color: '#444', lineHeight: 1.55, margin: '0 0 10px',
        }}>{exp.desc}</p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {exp.tags.map(tag => (
            <span key={tag} style={{
              fontFamily: "'Caveat', cursive", fontSize: 12,
              color: exp.accent,
              background: 'rgba(255,255,255,0.75)',
              border: `1.5px solid ${exp.border}`,
              borderRadius: 20, padding: '1px 8px',
            }}>{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <section
      id="experience"
      style={{
        background: 'linear-gradient(160deg, #f0fff8 0%, #fff9e6 50%, #f0f4ff 100%)',
        position: 'relative', padding: '80px 48px', overflow: 'hidden',
      }}
    >
      {/* Background doodles */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <StarDoodle color="#a8e6cf" size={28} style={{ position:'absolute', top:30, left:'3%', transform:'rotate(15deg)', opacity:0.55 }}/>
        <FlowerDoodle color="#ffb3cc" style={{ position:'absolute', top:18, right:'5%', opacity:0.5 }}/>
        <HeartDoodle color="#ffd93d" size={24} style={{ position:'absolute', top:80, left:'10%', transform:'rotate(-20deg)', opacity:0.5 }}/>
        <StarDoodle color="#b5a8ff" size={20} style={{ position:'absolute', top:45, right:'16%', transform:'rotate(-10deg)', opacity:0.55 }}/>
        <FlowerDoodle color="#a8e6cf" style={{ position:'absolute', bottom:30, left:'6%', opacity:0.45 }}/>
        <StarDoodle color="#ff9eb5" size={24} style={{ position:'absolute', bottom:50, right:'4%', transform:'rotate(25deg)', opacity:0.55 }}/>
        <HeartDoodle color="#b5a8ff" size={20} style={{ position:'absolute', bottom:20, left:'33%', transform:'rotate(10deg)', opacity:0.45 }}/>
        <StarDoodle color="#ffd93d" size={18} style={{ position:'absolute', bottom:80, right:'22%', transform:'rotate(-20deg)', opacity:0.5 }}/>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: 60 }}
      >
        <p style={{ fontFamily: "'Caveat', cursive", fontSize: 16, color: '#7a9ab5', letterSpacing: '0.3em', margin: '0 0 6px' }}>
          けいけん — experience
        </p>
        <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: 48, fontWeight: 700, color: '#2a3a50', margin: '0 0 12px', lineHeight: 1 }}>
          Where I've Worked 💼
        </h2>
        <svg viewBox="0 0 300 10" style={{ width: 220, display: 'block', margin: '0 auto' }}>
          <path d="M0,5 C30,1 60,9 90,5 C120,1 150,9 180,5 C210,1 240,9 270,5 C285,1 296,8 300,5"
            fill="none" stroke="#a8e6cf" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      </motion.div>

      {/* Timeline */}
      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
        {/* Vertical gradient line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            left: '50%', transform: 'translateX(-50%)',
            top: 0, bottom: 0, width: 4,
            background: 'linear-gradient(to bottom, #7ddaaa, #92c5ff, #c8aaff, #ffaa88, #ffd93d)',
            borderRadius: 4, opacity: 0.6,
            zIndex: 0, transformOrigin: 'top',
          }}
        />

        {EXPERIENCES.map((exp, i) => (
          <TimelineCard key={exp.id} exp={exp} index={i}/>
        ))}

        {/* End cap dot */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: -16 }}>
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: 'spring' }}
            style={{
              width: 14, height: 14, borderRadius: '50%',
              background: '#ffd93d',
              border: '3px solid white',
              boxShadow: '0 0 0 3px #ffd93d',
            }}
          />
        </div>
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&display=swap');`}</style>
    </section>
  )
}