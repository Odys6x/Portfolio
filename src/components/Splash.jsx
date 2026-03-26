import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../ThemeContext'

export default function Splash({ onEnter }) {
  const { theme, setTheme } = useTheme()
  const isLight = theme === 'light'

  const bg = isLight ? '#F5F0E8' : '#0D0D0D'
  const text = isLight ? '#1a1a1a' : '#fff'
  const accent = isLight ? '#C01010' : '#E02020'
  const muted = isLight ? '#888' : '#555'
  const dim = isLight ? '#C8BFB5' : '#2a2a2a'

  return (
    <motion.div
      key="splash"
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      onClick={onEnter}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: bg,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', userSelect: 'none',
        transition: 'background 0.4s ease',
      }}
    >
      {/* Top rule */}
      <motion.div
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
        style={{ width: 120, height: 1, background: accent, marginBottom: 32, transformOrigin: 'left', transition: 'background 0.4s ease' }}
      />

      {/* Japanese name */}
      <motion.p
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, letterSpacing: '0.3em', color: accent, marginBottom: 16, transition: 'color 0.4s ease' }}
      >
        オウェン・ウォン
      </motion.p>

      {/* Main name */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(64px, 12vw, 120px)', color: text, letterSpacing: '0.05em', lineHeight: 1, textAlign: 'center', transition: 'color 0.4s ease' }}
      >
        OWEN WONG
      </motion.h1>

      {/* Meta */}
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.35em', color: muted, marginTop: 12, textTransform: 'uppercase', transition: 'color 0.4s ease' }}
      >
        AI Engineer · Developer · Singapore
      </motion.p>

      {/* Bottom rule */}
      <motion.div
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
        style={{ width: 120, height: 1, background: accent, marginTop: 32, marginBottom: 48, transformOrigin: 'right', transition: 'background 0.4s ease' }}
      />

      {/* Click to enter */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0.4, 1] }}
        transition={{ duration: 2, delay: 1.2, repeat: Infinity, repeatDelay: 0.5 }}
        style={{ display: 'flex', alignItems: 'center', gap: 12 }}
      >
        <div style={{ width: 20, height: 1, background: dim }} />
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '0.4em', color: muted, textTransform: 'uppercase' }}>
          Click anywhere to enter
        </p>
        <div style={{ width: 20, height: 1, background: dim }} />
      </motion.div>

      {/* Theme toggle — bottom left */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        onClick={e => { e.stopPropagation(); setTheme(isLight ? 'dark' : 'light') }}
        style={{ position: 'absolute', bottom: 32, left: 40, display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
      >
        <div style={{
          width: 36, height: 20, borderRadius: 10,
          border: `1px solid ${muted}`,
          position: 'relative', transition: 'all 0.3s ease',
          background: isLight ? accent : 'transparent',
        }}>
          <motion.div
            animate={{ x: isLight ? 18 : 2 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{ position: 'absolute', top: 2, width: 14, height: 14, borderRadius: '50%', background: isLight ? '#fff' : muted }}
          />
        </div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.3em', color: muted, textTransform: 'uppercase', transition: 'color 0.4s ease' }}>
          {isLight ? 'Light' : 'Dark'}
        </p>
      </motion.div>

      {/* VOL label — bottom right */}
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        style={{ position: 'absolute', bottom: 32, right: 40, fontFamily: "'Bebas Neue', sans-serif", fontSize: 13, color: dim, letterSpacing: '0.2em', transition: 'color 0.4s ease' }}
      >
        VOL.01 · 2026
      </motion.p>
    </motion.div>
  )
}
