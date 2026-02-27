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




function TimelineCard({ exp, index }) {
  const isLeft = index % 2 === 0
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 56px 1fr', alignItems: 'start', marginBottom: 48 }}>
      <div style={{ paddingRight: 20, paddingTop: 8 }}>
        {isLeft ? (
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'relative' }}
          >
            <div style={{ position:'absolute', top:-9, right:'30%', transform:'rotate(-4deg)', width:52, height:14, background:exp.tape, borderRadius:3, boxShadow:'0 1px 4px rgba(0,0,0,0.1)', zIndex:2 }}/>
            <Card exp={exp}/>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.08 + 0.2 }} style={{ display:'flex', justifyContent:'flex-end', paddingTop:16 }}>
            <span style={{ fontFamily:"'Caveat', cursive", fontSize: 19, fontWeight:700, color:exp.accent, opacity:0.41, background:'rgba(255,255,255,0.7)', border:`1.5px solid ${exp.border}`, borderRadius:20, padding:'3px 12px' }}>📅 {exp.period}</span>
          </motion.div>
        )}
      </div>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', paddingTop:20 }}>
        <motion.div initial={{ scale:0 }} whileInView={{ scale:1 }} viewport={{ once:true }} transition={{ delay:index*0.08+0.1, type:'spring', stiffness:350 }}
          style={{ width:22, height:22, borderRadius:'50%', background:exp.dot, border:'3px solid white', boxShadow:`0 0 0 3px ${exp.dot}, 0 4px 10px rgba(0,0,0,0.15)`, zIndex:2, flexShrink:0 }}/>
      </div>
      <div style={{ paddingLeft:20, paddingTop:8 }}>
        {!isLeft ? (
          <motion.div initial={{ opacity:0, x:60 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true, margin:'-40px' }} transition={{ delay:index*0.08, duration:0.55, ease:[0.22,1,0.36,1] }} style={{ position:'relative' }}>
            <div style={{ position:'absolute', top:-9, left:'30%', transform:'rotate(4deg)', width:52, height:14, background:exp.tape, borderRadius:3, boxShadow:'0 1px 4px rgba(0,0,0,0.1)', zIndex:2 }}/>
            <Card exp={exp}/>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ delay:index*0.08+0.2 }} style={{ paddingTop:16 }}>
            <span style={{ fontFamily:"'Caveat', cursive", fontSize: 19, fontWeight:700, color:exp.accent, opacity:0.41, background:'rgba(255,255,255,0.7)', border:`1.5px solid ${exp.border}`, borderRadius:20, padding:'3px 12px' }}>📅 {exp.period}</span>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function Card({ exp }) {
  return (
    <motion.div whileHover={{ y:-5, scale:1.02 }} transition={{ type:'spring', stiffness:300 }}
      style={{ background:exp.bg, border:`2.5px solid ${exp.border}`, borderRadius:16, padding:'18px 20px 14px', boxShadow:`3px 4px 0 ${exp.shadow}, 0 6px 20px rgba(0,0,0,0.07)`, position:'relative', overflow:'hidden' }}>
      {Array.from({ length:8 }).map((_,i) => (
        <div key={i} style={{ position:'absolute', left:0, right:0, top:22+i*22, height:1, background:exp.border, opacity:0.2, pointerEvents:'none' }}/>
      ))}
      <div style={{ position:'relative', zIndex:1 }}>
        {exp.current && (
          <div style={{ display:'inline-block', marginBottom:8, background:'linear-gradient(135deg, #3aaa70, #1a7a48)', color:'white', fontFamily:"'Caveat', cursive", fontSize: 17, fontWeight:700, padding:'2px 12px', borderRadius:20, boxShadow:'1px 2px 0 #0a5030' }}>✦ Current</div>
        )}
        <div style={{ display:'flex', alignItems:'flex-start', gap:10, marginBottom:6 }}>
          <span style={{ fontSize: 32, flexShrink:0, lineHeight:1 }}>{exp.emoji}</span>
          <div>
            <p style={{ fontFamily:"'Caveat', cursive", fontSize: 23, fontWeight:700, color:exp.accent, margin:0, lineHeight:1.1 }}>{exp.role}</p>
            <p style={{ fontFamily:"'Caveat', cursive", fontSize: 19, fontWeight:600, color:exp.accent, opacity:0.41, margin:'2px 0 0' }}>{exp.company} · {exp.type}</p>
          </div>
        </div>
        <svg viewBox="0 0 160 5" style={{ width:'80%', display:'block', marginBottom:8 }}>
          <path d="M0,2.5 C16,0 32,5 48,2.5 C64,0 80,5 96,2.5 C112,0 128,5 144,2.5 C154,0 160,4 160,2.5" fill="none" stroke={exp.border} strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <p style={{ fontFamily:"'Caveat', cursive", fontSize: 19, fontWeight:600, color:'#444', lineHeight:1.55, margin:'0 0 10px' }}>{exp.desc}</p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
          {exp.tags.map(tag => (
            <span key={tag} style={{ fontFamily:"'Caveat', cursive", fontSize: 17, fontWeight:600, color:exp.accent, background:'rgba(255,255,255,0.75)', border:`1.5px solid ${exp.border}`, borderRadius:20, padding:'1px 8px' }}>{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <section id="experience" style={{ background: 'transparent', position: 'relative', zIndex: 1, padding:'80px 48px', overflow:'hidden' }}>
      <motion.div initial={{ opacity:0, y:-20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} style={{ textAlign:'center', marginBottom:60 }}>
        <p style={{ fontFamily:"'Caveat', cursive", fontSize: 22, fontWeight:700, color:'#7a9ab5', letterSpacing:'0.3em', margin:'0 0 6px' }}>けいけん — experience</p>
        <h2 style={{ fontFamily:"'Caveat', cursive", fontSize: 56, fontWeight:700, color:'#2a3a50', margin:'0 0 12px', lineHeight:1 }}>Where I've Worked 💼</h2>
        <svg viewBox="0 0 300 10" style={{ width:220, display:'block', margin:'0 auto' }}>
          <path d="M0,5 C30,1 60,9 90,5 C120,1 150,9 180,5 C210,1 240,9 270,5 C285,1 296,8 300,5" fill="none" stroke="#a8e6cf" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      </motion.div>
      <div style={{ maxWidth:900, margin:'0 auto', position:'relative' }}>
        <motion.div initial={{ scaleY:0 }} whileInView={{ scaleY:1 }} viewport={{ once:true }} transition={{ duration:1.2, ease:'easeInOut' }}
          style={{ position:'absolute', left:'50%', transform:'translateX(-50%)', top:0, bottom:0, width:4, background:'linear-gradient(to bottom, #7ddaaa, #92c5ff, #c8aaff, #ffaa88, #ffd93d)', borderRadius:4, opacity:0.33, zIndex:0, transformOrigin:'top' }}/>
        {EXPERIENCES.map((exp, i) => <TimelineCard key={exp.id} exp={exp} index={i}/>)}
        <div style={{ display:'flex', justifyContent:'center', marginTop:-16 }}>
          <motion.div initial={{ scale:0 }} whileInView={{ scale:1 }} viewport={{ once:true }} transition={{ delay:0.5, type:'spring' }}
            style={{ width:14, height:14, borderRadius:'50%', background:'#ffd93d', border:'3px solid white', boxShadow:'0 0 0 3px #ffd93d' }}/>
        </div>
      </div>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&display=swap');`}</style>
    </section>
  )
}