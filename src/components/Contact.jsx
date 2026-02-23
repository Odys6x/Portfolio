import { motion } from 'framer-motion'

const links = [
  {
    label: 'GitHub',
    jp: 'ギットハブ',
    href: 'https://github.com/',
    icon: '🐙',
    color: '#2d5a6b',
  },
  {
    label: 'LinkedIn',
    jp: 'リンクトイン',
    href: 'https://linkedin.com/in/',
    icon: '💼',
    color: '#4a7a9b',
  },
  {
    label: 'Email',
    jp: 'メール',
    href: 'mailto:your@email.com',
    icon: '✉️',
    color: '#7bc4c4',
  },
]

function Contact() {
  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center items-center text-center px-6 pl-24 py-24 relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#faf7f2] to-[#e8f4f8] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#7bc4c4]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-32 w-48 h-48 bg-[#ffb7c5]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-xl w-full">

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[#7bc4c4] text-xs tracking-[0.4em] mb-3"
        >
          連絡先 — contact
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl font-bold text-[#2d5a6b] mb-4 tracking-tight"
        >
          Let's Connect
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-16 h-px bg-[#7bc4c4]/60 mx-auto mb-6"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-[#5a6a72] text-lg leading-relaxed mb-12"
        >
          Whether it's a job opportunity, collaboration, or just a chat — 
          my inbox is always open 🍵
        </motion.p>

        {/* Links */}
        <div className="flex flex-col gap-4">
          {links.map((link, i) => (
            <motion.a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              whileHover={{ x: 8, scale: 1.02 }}
              className="flex items-center justify-between px-6 py-4 rounded-xl bg-white/70 backdrop-blur-sm border border-[#7bc4c4]/20 group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{link.icon}</span>
                <div className="text-left">
                  <p className="font-semibold text-[#2d5a6b]">{link.label}</p>
                  <p className="text-xs text-[#aaa] tracking-widest">{link.jp}</p>
                </div>
              </div>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-[#7bc4c4] text-lg"
              >
                →
              </motion.span>
            </motion.a>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-[#bbb] text-xs tracking-widest mt-16"
        >
          © 2026 Owen · Built with React & Framer Motion 🚃
        </motion.p>

      </div>
    </section>
  )
}

export default Contact