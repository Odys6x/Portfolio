import { motion } from 'framer-motion'

const projects = [
  {
    title: 'PathFinders',
    jp: 'パスファインダー',
    tag: '🏆 Hackrift 2nd Place',
    tagColor: '#f5c842',
    description: 'AI-powered school recommendation system for Singapore\'s Secondary 1 posting process. Being considered for MOE partnership.',
    tech: ['React', 'Python', 'Machine Learning', 'NLP'],
    color: '#e8f4f8',
    accent: '#2d5a6b',
  },
  {
    title: 'AWS Career Coach',
    jp: 'キャリアコーチ',
    tag: '☁️ Cloud AI',
    tagColor: '#7bc4c4',
    description: 'Cloud-based career coaching chatbot built on AWS. Provides personalised career guidance using LLMs and retrieval-augmented generation.',
    tech: ['AWS', 'Python', 'RAG', 'LLM'],
    color: '#f0f8e8',
    accent: '#4a7a4a',
  },
  {
    title: 'MSF Digital Human',
    jp: 'デジタルヒューマン',
    tag: '🤖 Gov Tech',
    tagColor: '#ffb7c5',
    description: 'Multilingual digital human system for the Ministry of Social and Family Development. Supports cross-cultural communication and assistance.',
    tech: ['Python', 'NLP', 'Multilingual AI', 'Full Stack'],
    color: '#fdf0f8',
    accent: '#8a4a6a',
  },
]

function Projects() {
  return (
    <section id="projects" className="min-h-screen flex flex-col justify-center items-center px-6 pl-24 py-24 relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#e8f4f8] to-[#faf7f2] pointer-events-none" />
      <div className="absolute top-32 right-20 w-72 h-72 bg-[#ffb7c5]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-32 left-20 w-56 h-56 bg-[#7bc4c4]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl">

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[#7bc4c4] text-xs tracking-[0.4em] mb-3 text-center"
        >
          プロジェクト — projects
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl font-bold text-[#2d5a6b] mb-4 tracking-tight text-center"
        >
          What I've Built
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-16 h-px bg-[#7bc4c4]/60 mx-auto mb-16"
        />

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
              className="rounded-2xl p-6 flex flex-col gap-4 cursor-pointer"
              style={{ backgroundColor: project.color, border: `1px solid ${project.accent}18` }}
            >
              {/* Tag */}
              <div className="flex items-center justify-between">
                <span
                  className="text-xs px-3 py-1 rounded-full font-medium"
                  style={{ backgroundColor: `${project.tagColor}30`, color: project.accent }}
                >
                  {project.tag}
                </span>
                <span className="text-[#aaa] text-xs">{project.jp}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-left" style={{ color: project.accent }}>
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-[#5a6a72] text-sm leading-relaxed text-left flex-1">
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((t, j) => (
                  <span
                    key={j}
                    className="text-xs px-2 py-1 rounded-md"
                    style={{ backgroundColor: `${project.accent}12`, color: project.accent }}
                  >
                    {t}
                  </span>
                ))}
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Projects