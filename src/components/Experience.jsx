import { motion } from 'framer-motion'

const COMPANIES = [
  {
    id: 1,
    company: 'SP Group',
    roles: [
      {
        role: 'GenAI Developer',
        period: 'Sep 2025 – Present',
        type: 'Internship · On-site',
        desc: 'Built AI Agent Augmentation system — reduced cybersecurity incident response from 45 min → under 5 min using fine-tuned DeepSeek + RAG pipeline.',
        tags: ['DeepSeek', 'RAG', 'Python', 'LangGraph'],
        current: true,
      },
    ],
  },
  {
    id: 2,
    company: 'Singapore Institute of Technology',
    roles: [
      {
        role: 'GenerativeAI App Developer',
        period: 'Jan 2025 – Apr 2025',
        type: 'Part-time · 4 mos',
        desc: 'Developed AWS-powered career coaching chatbot for hospitality students and mid-career professionals. Mean satisfaction score 8.45/10.',
        tags: ['AWS', 'LLM', 'Python', 'RAG'],
      },
      {
        role: 'AI Research Assistant',
        period: 'Jul 2024 – Apr 2025',
        type: 'Part-time · 10 mos',
        desc: 'Enhanced MRI scan quality using advanced image processing techniques for improved diagnostic accuracy and interpretability.',
        tags: ['Computer Vision', 'Medical Imaging', 'Python'],
      },
    ],
  },
  {
    id: 3,
    company: 'ATT Systems Group',
    roles: [
      {
        role: 'IT Assistant',
        period: 'Mar 2020 – May 2020',
        type: 'Internship · 3 mos',
        desc: 'Provided technical assistance and day-to-day operational support for office systems in Singapore.',
        tags: ['IT Support', 'Operations'],
      },
    ],
  },
  {
    id: 4,
    company: 'Setsco Services Pte Ltd',
    roles: [
      {
        role: 'IT Assistant',
        period: 'Dec 2017 – Apr 2018',
        type: 'Part-time · 5 mos',
        desc: 'Solved client issues by installing programs, fixing computers and providing day-to-day IT support.',
        tags: ['IT Support', 'Troubleshooting'],
      },
    ],
  },
]

function CompanyCard({ group, index }) {
  const hasCurrent = group.roles.some(r => r.current)
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      style={{ borderBottom: '1px solid var(--border)', paddingTop: 48, paddingBottom: 48 }}
    >
      {/* Top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '0.28em', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          {hasCurrent && (
            <>
              <span style={{ width: 1, height: 10, background: 'var(--accent)', display: 'inline-block' }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.28em', color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 600 }}>CURRENT</span>
            </>
          )}
        </div>
      </div>

      {/* Company headline */}
      <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(28px, 6vw, 68px)', color: hasCurrent ? 'var(--accent)' : 'var(--text)', letterSpacing: '0.02em', lineHeight: 0.9, marginBottom: 28 }}>
        {group.company}
      </h3>

      {/* Roles */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {group.roles.map((r, i) => (
          <div key={i} className="exp-cols" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 40, alignItems: 'start', paddingTop: i > 0 ? 24 : 0, borderTop: i > 0 ? '1px solid var(--surface)' : 'none' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
                <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(18px, 3vw, 28px)', color: 'var(--text)', letterSpacing: '0.06em', lineHeight: 1 }}>{r.role}</p>
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '0.2em', color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: 12 }}>{r.period} · {r.type}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {r.tags.map(tag => (
                  <span key={tag} style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.15em', color: 'var(--text-faint)', border: '1px solid var(--border)', padding: '3px 8px', textTransform: 'uppercase' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: 32 }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8 }}>{r.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <section id="experience" style={{ background: 'var(--bg)', position: 'relative', zIndex: 1, paddingTop: 80, paddingBottom: 80 }}>
<div style={{ position: 'relative', overflow: 'hidden', padding: '0 48px', marginBottom: 48, textAlign: 'right' }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.35em', color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', position: 'relative', zIndex: 1 }}>ISSUE 02 · CAREER</p>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(40px, 8vw, 72px)', color: 'var(--accent)', letterSpacing: '0.02em', lineHeight: 1, position: 'relative', zIndex: 1 }}>WHERE I'VE WORKED</h2>
        <div style={{ width: '100%', height: 1, background: 'var(--border)', marginTop: 16, position: 'relative', zIndex: 1 }} />
      </div>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 48px' }}>
        {COMPANIES.map((group, i) => (
          <CompanyCard key={group.id} group={group} index={i} />
        ))}
      </div>
      <style>{`
        @media (max-width: 767px) {
          #experience > div:first-child { padding: 0 20px !important; }
          #experience > div:last-child { padding: 0 20px !important; }
          .exp-cols { grid-template-columns: 1fr !important; gap: 16px !important; }
          .exp-cols > *:last-child { border-left: none !important; padding-left: 0 !important; padding-top: 0 !important; }
        }
      `}</style>
    </section>
  )
}
