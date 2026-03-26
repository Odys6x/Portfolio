import { motion } from 'framer-motion'

const PROJECTS = [
  { id:1, img:'/assets/MOE.jpg', jaTitle:'パスファインダー', badge:'2nd Place · Hackrift', title:'PathFinders', desc:"AI-powered school recommendation system for Singapore's Secondary 1 posting process. Being considered for MOE partnership.", tags:['React','Python','Machine Learning','NLP'], featured:true },
  { id:2, img:null, jaTitle:'エーアイエージェント', badge:'Capstone · SP Group', title:'AI Agent Augmentation', desc:'Multi-agent AI system for automated cyber incident response. Reduced response time from 45 mins → under 5 mins using fine-tuned DeepSeek + RAG.', tags:['DeepSeek','RAG','Python','LangGraph'] },
  { id:3, img:'/assets/AWS.jpg', jaTitle:'キャリアコーチ', badge:'Cloud AI · AWS', title:'AWS Career Coach', desc:'Cloud-based career coaching chatbot on AWS. Personalised career guidance using LLMs and retrieval-augmented generation.', tags:['AWS','Python','RAG','LLM'] },
  { id:4, img:'/assets/MSF.jpg', jaTitle:'デジタルヒューマン', badge:'MSF · Empathetic AI', title:'MSF Digital Human', desc:'Multilingual digital human for the Ministry of Social and Family Development. Supports cross-cultural communication and assistance.', tags:['Python','NLP','Multilingual AI','Full Stack'] },
]

function ProjectCard({ project, index }) {
  const isFeatured = project.featured
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className={isFeatured ? 'project-featured' : ''}
      style={{ borderBottom: '1px solid var(--border)', paddingTop: 40, paddingBottom: 40 }}
    >
      <div className="project-grid" style={{ display: 'grid', gridTemplateColumns: project.img ? '1fr 1fr' : '1fr', gap: 48, alignItems: 'start' }}>
        {project.img && (
          <div style={{ overflow: 'hidden' }}>
            <motion.img
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
              src={project.img}
              alt={project.title}
              style={{ width: '100%', height: 'auto', maxHeight: 360, objectFit: 'contain', display: 'block', filter: 'contrast(1.05) saturate(0.7) brightness(0.85)' }}
            />
          </div>
        )}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            {isFeatured && (
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.25em', color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 700, border: '1px solid var(--accent)', padding: '2px 8px' }}>FEATURED</span>
            )}
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.2em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{project.badge}</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.2em', color: 'var(--text-dim)', textTransform: 'uppercase' }}>{project.jaTitle}</span>
          </div>

          <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: isFeatured ? 48 : 36, color: 'var(--accent)', letterSpacing: '0.03em', lineHeight: 1, marginBottom: 12 }}>{project.title}</h3>

          <div style={{ width: 32, height: 1, background: 'var(--accent)', marginBottom: 16 }} />

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: 16 }}>{project.desc}</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {project.tags.map(tag => (
              <span key={tag} style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '0.15em', color: 'var(--text-muted)', border: '1px solid var(--border)', padding: '3px 10px', textTransform: 'uppercase' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" style={{ background: 'var(--bg)', position: 'relative', zIndex: 1, paddingTop: 80, paddingBottom: 80 }}>
      <div style={{ position: 'relative', overflow: 'hidden', padding: '0 48px', marginBottom: 48 }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.35em', color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', position: 'relative', zIndex: 1 }}>ISSUE 03 · PORTFOLIO</p>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(40px, 8vw, 72px)', color: 'var(--accent)', letterSpacing: '0.02em', lineHeight: 1, position: 'relative', zIndex: 1 }}>WHAT I'VE BUILT</h2>
        <div style={{ width: '100%', height: 1, background: 'var(--border)', marginTop: 16, position: 'relative', zIndex: 1 }} />
      </div>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px' }}>
        <div className="projects-list">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}
        >
          <div style={{ width: 24, height: 1, background: 'var(--text-dim)' }} />
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.2em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>More projects on the way</p>
        </motion.div>
      </div>
      <style>{`
        .projects-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 80px;
        }
        .projects-list > * {
          border-bottom: 1px solid var(--border);
        }
        @media (max-width: 900px) {
          .projects-list { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 767px) {
          #projects > div:first-child { padding: 0 20px !important; }
          #projects > div:last-child { padding: 0 20px !important; }
          .project-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
        }
      `}</style>
    </section>
  )
}
