import { useState } from 'react'
import { motion } from 'framer-motion'

function Navbar() {
  const [hovered, setHovered] = useState(null)

  const links = [
  { label: 'About', jp: '私について', href: 'about' },
  { label: 'Projects', jp: 'プロジェクト', href: 'projects' },
  { label: 'Contact', jp: '連絡先', href: 'contact' },
]

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

  return (
    <motion.nav
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 h-full z-50 flex flex-col justify-between items-center py-10 px-4 w-16`}
        style={{ 
        borderRight: '1px solid rgba(123,196,196,0.2)',
        backgroundColor: 'rgba(250, 245, 235, 0.99)' 
        }}
    >
      {/* Top logo - vertical text */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex flex-col items-center gap-1 cursor-pointer"
      >
        <span
          className="text-[#2d5a6b] font-bold text-xs tracking-widest"
          style={{ writingMode: 'vertical-rl' }}
        >
          オウェン
        </span>
        <div className="w-px h-8 bg-[#7bc4c4]/40" />
      </motion.div>

      {/* Nav links - vertical */}
      <ul className="flex flex-col items-center gap-10">
        {links.map((link) => (
          <motion.li
                key={link.label}
                onHoverStart={() => setHovered(link.label)}
                onHoverEnd={() => setHovered(null)}
                whileHover={{ x: 3 }}
                onClick={() => scrollTo(link.href)}
                className="flex flex-col items-center gap-2 cursor-pointer group"
                >
            {/* Japanese label */}
            <motion.span
              animate={{ opacity: hovered === link.label ? 1 : 0, y: hovered === link.label ? 0 : 5 }}
              transition={{ duration: 0.2 }}
              className="text-[#7bc4c4] text-[9px] tracking-widest"
              style={{ writingMode: 'vertical-rl' }}
            >
              {link.jp}
            </motion.span>

            {/* Dot indicator */}
            <motion.div
              animate={{ backgroundColor: hovered === link.label ? '#7bc4c4' : '#c9b8a8' }}
              className="w-1.5 h-1.5 rounded-full"
            />

            {/* English label */}
            <span
              className="text-[#3d3530] group-hover:text-[#2d5a6b] text-[10px] tracking-widest transition-colors duration-200"
              style={{ writingMode: 'vertical-rl' }}
            >
              {link.label}
            </span>
          </motion.li>
        ))}
      </ul>

      {/* Bottom - small train icon */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="text-[#7bc4c4] text-lg"
      >
        🚃
      </motion.div>
    </motion.nav>
  )
}

export default Navbar