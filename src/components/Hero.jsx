import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

function TrainCar({ delay, children }) {
  return (
    <motion.div
      animate={{ y: [0, -3, 0] }}
      transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut', delay }}
    >
      {children}
    </motion.div>
  )
}

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const [particlesReady, setParticlesReady] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setParticlesReady(true))
  }, [])

  const particleOptions = {
  fullScreen: { enable: false },  // ADD THIS LINE AT THE TOP
  particles: {
    number: { value: 15 },
    color: { value: ['#ffb7c5', '#ff9eb5', '#ffd0da', '#ffcce0'] },
    shape: { type: 'circle' },
    opacity: { value: { min: 0.4, max: 0.8 } },
    size: { value: { min: 3, max: 6 } },
    move: {
      enable: true,
      speed: 1,
      direction: 'bottom',
      straight: true,
      random: false,
      drift: -0.5,
      outModes: { default: 'out' },
    },
    wobble: { enable: false },
    rotate: {
      value: { min: 0, max: 360 },
      direction: 'clockwise',
      animation: { enable: true, speed: 3 }
    },
  },
  interactivity: { events: {} },
  background: { color: 'transparent' },
}

  return (
    <section ref={ref} id="hero" className="min-h-screen flex flex-col justify-center items-center text-center px-6 pl-24 relative overflow-hidden">

      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#87ceeb] via-[#b8e0f7] to-[#e0f4ff] pointer-events-none" />

      {/* Sun */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.8, 0.6] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        className="absolute top-16 right-40 w-20 h-20 bg-[#fff9c4]/80 rounded-full blur-2xl pointer-events-none"
      />
      <div className="absolute top-16 right-40 w-10 h-10 bg-[#ffe066]/60 rounded-full blur-md pointer-events-none" />

      {/* Sakura particles */}
      {particlesReady && (
  <div
    className="absolute overflow-hidden pointer-events-none z-10"
    style={{ top: 0, left: 0, width: '100%', height: '100vh' }}
  >
    <Particles
      id="sakura"
      options={particleOptions}
      style={{ height: '100%' }}
    />
  </div>
)}

      {/* Clouds */}
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: 35, ease: 'linear' }}
        className="absolute top-10 pointer-events-none flex"
        style={{ width: '200%' }}
      >
        {[0, 1].map((set) => (
          <div key={set} className="flex items-start flex-shrink-0 gap-64 px-32" style={{ width: '50%' }}>
            <div className="relative flex-shrink-0">
              <div className="w-36 h-8 bg-white/90 rounded-full" />
              <div className="absolute -top-5 left-6 w-24 h-12 bg-white/90 rounded-full" />
              <div className="absolute -top-3 left-16 w-16 h-8 bg-white/80 rounded-full" />
            </div>
            <div className="relative flex-shrink-0 mt-10">
              <div className="w-24 h-6 bg-white/70 rounded-full" />
              <div className="absolute -top-4 left-4 w-16 h-8 bg-white/70 rounded-full" />
            </div>
            <div className="relative flex-shrink-0 mt-2">
              <div className="w-44 h-8 bg-white/85 rounded-full" />
              <div className="absolute -top-6 left-8 w-28 h-14 bg-white/85 rounded-full" />
            </div>
            <div className="relative flex-shrink-0 mt-6">
              <div className="w-20 h-5 bg-white/60 rounded-full" />
              <div className="absolute -top-3 left-3 w-14 h-7 bg-white/60 rounded-full" />
            </div>
          </div>
        ))}
      </motion.div>

      {/* Ocean background - static deep blue */}
        <div className="absolute left-0 w-full pointer-events-none"
        style={{ bottom: '4.5rem', height: '220px', background: 'linear-gradient(to bottom, #5bc8e8, #2a8fad, #1a6f8a)' }}
        />

        {/* Sea surface waves - bob up and down only */}
        <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        className="absolute left-0 w-full pointer-events-none"
        style={{ bottom: '9rem' }}
        >
        <svg viewBox="0 0 1440 20" className="w-full" preserveAspectRatio="none">
            <path d="M0,10 C120,2 240,18 360,10 C480,2 600,18 720,10 C840,2 960,18 1080,10 C1200,2 1320,18 1440,10 L1440,20 L0,20 Z" fill="white" opacity="0.15"/>
        </svg>
        </motion.div>

        <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 1 }}
        className="absolute left-0 w-full pointer-events-none"
        style={{ bottom: '7rem' }}
        >
        <svg viewBox="0 0 1440 20" className="w-full" preserveAspectRatio="none">
            <path d="M0,10 C80,2 160,18 320,10 C480,2 560,18 720,10 C880,2 960,18 1120,10 C1280,2 1360,18 1440,10 L1440,20 L0,20 Z" fill="white" opacity="0.2"/>
        </svg>
        </motion.div>
    

        {/* Shore - connects sea to platform, no gap */}
        <div className="absolute left-0 w-full h-[4.5rem] bg-[#c8bfaa] bottom-0 pointer-events-none" />

        {/* Train tracks */}
        <div className="absolute bottom-14 left-0 w-full pointer-events-none opacity-50 z-10">
        <div className="w-full h-px bg-[#5a4a3a]" />
        <div className="w-full h-px bg-[#5a4a3a] mt-2" />
        <div className="flex w-full">
            {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="flex-1 flex justify-center">
                <div className="w-0.5 h-3 bg-[#5a4a3a] -mt-0.5" />
            </div>
            ))}
        </div>
        </div>

        {/* Train - fixed center */}
        <div className="absolute bottom-[3.8rem] left-1/2 -translate-x-1/2 pointer-events-none opacity-85 z-20 flex items-end gap-1">
        <TrainCar delay={0.4}>
            <svg width="62" height="36" viewBox="0 0 62 36" fill="none">
            <rect x="0" y="4" width="60" height="24" rx="3" fill="#e8b84b"/>
            <rect x="4" y="9" width="9" height="8" rx="1" fill="#b8e0f7" opacity="0.85"/>
            <rect x="15" y="9" width="9" height="8" rx="1" fill="#b8e0f7" opacity="0.85"/>
            <rect x="26" y="9" width="9" height="8" rx="1" fill="#b8e0f7" opacity="0.85"/>
            <rect x="37" y="9" width="9" height="8" rx="1" fill="#b8e0f7" opacity="0.85"/>
            <rect x="48" y="9" width="8" height="8" rx="1" fill="#b8e0f7" opacity="0.85"/>
            <circle cx="12" cy="32" r="4" fill="#2d4a3e" stroke="#1a2e28" strokeWidth="1"/>
            <circle cx="46" cy="32" r="4" fill="#2d4a3e" stroke="#1a2e28" strokeWidth="1"/>
            </svg>
        </TrainCar>
        <TrainCar delay={0.2}>
            <svg width="62" height="36" viewBox="0 0 62 36" fill="none">
            <rect x="0" y="4" width="60" height="24" rx="3" fill="#d4a832"/>
            <rect x="4" y="9" width="9" height="8" rx="1" fill="#b8e0f7" opacity="0.85"/>
            <rect x="15" y="9" width="9" height="8" rx="1" fill="#b8e0f7" opacity="0.85"/>
            <rect x="26" y="9" width="9" height="8" rx="1" fill="#b8e0f7" opacity="0.85"/>
            <rect x="37" y="9" width="9" height="8" rx="1" fill="#b8e0f7" opacity="0.85"/>
            <rect x="48" y="9" width="8" height="8" rx="1" fill="#b8e0f7" opacity="0.85"/>
            <circle cx="12" cy="32" r="4" fill="#2d4a3e" stroke="#1a2e28" strokeWidth="1"/>
            <circle cx="46" cy="32" r="4" fill="#2d4a3e" stroke="#1a2e28" strokeWidth="1"/>
            </svg>
        </TrainCar>
        <TrainCar delay={0}>
        <div className="relative">
            {/* Smoke from chimney */}
            <motion.div
            animate={{ y: [0, -12, -20], opacity: [0.5, 0.3, 0], scale: [0.8, 1.2, 1.6] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeOut' }}
            className="absolute -top-3 right-2 w-3 h-3 bg-white/70 rounded-full blur-sm"
            />
            <svg width="76" height="44" viewBox="0 0 76 44" fill="none">
            {/* Chimney - on the LEFT (back of engine, opposite to headlight) */}
            <rect x="62" y="0" width="6" height="8" rx="1" fill="#1a1a1a"/>
            <rect x="59" y="0" width="12" height="4" rx="1" fill="#1a1a1a"/>

            {/* Engine body */}
            <rect x="0" y="8" width="76" height="28" rx="4" fill="#e8b84b"/>
            <rect x="44" y="8" width="32" height="28" rx="4" fill="#f0c93a"/>

            {/* Windows */}
            <rect x="5" y="16" width="11" height="9" rx="1" fill="#b8e0f7" opacity="0.9"/>
            <rect x="19" y="16" width="11" height="9" rx="1" fill="#b8e0f7" opacity="0.9"/>
            <rect x="33" y="16" width="9" height="9" rx="1" fill="#b8e0f7" opacity="0.9"/>

            {/* Headlight only - no emblem */}
            <circle cx="71" cy="22" r="3" fill="#fffde7" opacity="0.95"/>

            {/* Wheels */}
            <circle cx="12" cy="40" r="4" fill="#2d4a3e" stroke="#1a2e28" strokeWidth="1"/>
            <circle cx="36" cy="40" r="4" fill="#2d4a3e" stroke="#1a2e28" strokeWidth="1"/>
            <circle cx="58" cy="40" r="4" fill="#2d4a3e" stroke="#1a2e28" strokeWidth="1"/>
            </svg>
        </div>
        </TrainCar>
        </div>

      {/* Hero content */}
      <motion.div style={{ y: contentY }} className="relative z-30 flex flex-col items-center mb-44">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/80 text-sm tracking-[0.3em] mb-4 drop-shadow"
        >
          ようこそ — welcome
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-7xl md:text-9xl font-bold text-white drop-shadow-lg tracking-tight mb-4"
        >
          Owen
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-xl md:text-2xl text-white/80 font-light tracking-widest mb-6 drop-shadow"
        >
          AI Engineer & Developer
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-24 h-px bg-white/50 mb-6"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-white/70 text-base md:text-lg max-w-md leading-relaxed drop-shadow"
        >
          Final year AI student @ SIT. Building intelligent systems
          that actually solve real problems.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
          whileTap={{ scale: 0.95 }}
          className="mt-10 px-8 py-3 border border-white/60 text-white text-sm tracking-widest transition-all duration-300 rounded-sm cursor-pointer backdrop-blur-sm"
        >
          見る — View Work
        </motion.button>
      </motion.div>

    </section>
  )
}

export default Hero