import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState, useMemo } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

// ─── Time-based colour palettes ──────────────────────────────────────────────
// Each stop: hour (0-24), skyTop, skyMid, skyBottom, seaTop, seaMid, seaDeep,
//            cloudOpacity, sunColor, sunOpacity, sunBlur
const PALETTES = [
  {
    h: 0,
    skyTop: '#020614', skyMid: '#0a0e2e', skyBot: '#0d1542',
    seaTop: '#05101e', seaMid: '#040c18', seaDeep: '#020810',
    cloud: 0.15, sunColor: '#fff9c4', sunGlow: '#ffe066', sunOp: 0,
  },
  {
    h: 4,
    skyTop: '#0d0826', skyMid: '#1a1050', skyBot: '#2d1b69',
    seaTop: '#0a1428', seaMid: '#07101e', seaDeep: '#040c16',
    cloud: 0.2, sunColor: '#fff9c4', sunGlow: '#ffe066', sunOp: 0,
  },
  {
    h: 5.5,
    skyTop: '#1a0a3a', skyMid: '#8b2252', skyBot: '#e8623a',
    seaTop: '#1a2e48', seaMid: '#101e30', seaDeep: '#081420',
    cloud: 0.5, sunColor: '#ffcc80', sunGlow: '#ff9933', sunOp: 0.5,
  },
  {
    h: 7,
    skyTop: '#e8633a', skyMid: '#f5a623', skyBot: '#ffd59e',
    seaTop: '#3a6a8a', seaMid: '#2a4e6e', seaDeep: '#1a3858',
    cloud: 0.85, sunColor: '#fff176', sunGlow: '#ffd740', sunOp: 0.75,
  },
  {
    h: 9,
    skyTop: '#2a85c8', skyMid: '#5ab4e0', skyBot: '#a8d8f0',
    seaTop: '#4aaac8', seaMid: '#2a80a8', seaDeep: '#1a6088',
    cloud: 0.9, sunColor: '#fff9c4', sunGlow: '#ffe566', sunOp: 0.65,
  },
  {
    h: 12,
    skyTop: '#1e90ff', skyMid: '#5bc8f5', skyBot: '#87ceeb',
    seaTop: '#5bc8e8', seaMid: '#2a8fad', seaDeep: '#1a6f8a',
    cloud: 0.9, sunColor: '#fffde7', sunGlow: '#fff176', sunOp: 0.8,
  },
  {
    h: 15,
    skyTop: '#2a8acc', skyMid: '#60b8de', skyBot: '#a0d0e8',
    seaTop: '#50b8d8', seaMid: '#2888a8', seaDeep: '#186880',
    cloud: 0.85, sunColor: '#fff9c4', sunGlow: '#ffd740', sunOp: 0.7,
  },
  {
    h: 17.5,
    skyTop: '#c0440a', skyMid: '#e8841a', skyBot: '#f5c842',
    seaTop: '#2a5070', seaMid: '#1a3850', seaDeep: '#0e2438',
    cloud: 0.75, sunColor: '#ffab40', sunGlow: '#ff6d00', sunOp: 0.95,
  },
  {
    h: 19,
    skyTop: '#6b1a6e', skyMid: '#3a1060', skyBot: '#1a0840',
    seaTop: '#151e32', seaMid: '#0e1624', seaDeep: '#080e18',
    cloud: 0.35, sunColor: '#ff8a65', sunGlow: '#ff5722', sunOp: 0.4,
  },
  {
    h: 21,
    skyTop: '#06061a', skyMid: '#090d28', skyBot: '#0d1038',
    seaTop: '#060e1a', seaMid: '#040a14', seaDeep: '#02060e',
    cloud: 0.15, sunColor: '#fff9c4', sunGlow: '#ffe066', sunOp: 0,
  },
  {
    h: 24,
    skyTop: '#020614', skyMid: '#0a0e2e', skyBot: '#0d1542',
    seaTop: '#05101e', seaMid: '#040c18', seaDeep: '#020810',
    cloud: 0.15, sunColor: '#fff9c4', sunGlow: '#ffe066', sunOp: 0,
  },
]

function hexToRgb(hex) {
  const h = hex.replace('#', '')
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ]
}

function lerpNum(a, b, t) {
  return a + (b - a) * t
}

function lerpColor(c1, c2, t) {
  const [r1, g1, b1] = hexToRgb(c1)
  const [r2, g2, b2] = hexToRgb(c2)
  return `rgb(${Math.round(lerpNum(r1,r2,t))},${Math.round(lerpNum(g1,g2,t))},${Math.round(lerpNum(b1,b2,t))})`
}

function getColors(date = new Date()) {
  const h = date.getHours() + date.getMinutes() / 60

  // Find the two surrounding palette stops
  let lo = PALETTES[0], hi = PALETTES[PALETTES.length - 1]
  for (let i = 0; i < PALETTES.length - 1; i++) {
    if (h >= PALETTES[i].h && h < PALETTES[i + 1].h) {
      lo = PALETTES[i]
      hi = PALETTES[i + 1]
      break
    }
  }

  const t = lo.h === hi.h ? 0 : (h - lo.h) / (hi.h - lo.h)

  return {
    skyTop:    lerpColor(lo.skyTop,   hi.skyTop,   t),
    skyMid:    lerpColor(lo.skyMid,   hi.skyMid,   t),
    skyBot:    lerpColor(lo.skyBot,   hi.skyBot,   t),
    seaTop:    lerpColor(lo.seaTop,   hi.seaTop,   t),
    seaMid:    lerpColor(lo.seaMid,   hi.seaMid,   t),
    seaDeep:   lerpColor(lo.seaDeep,  hi.seaDeep,  t),
    cloud:     lerpNum(lo.cloud,      hi.cloud,     t),
    sunColor:  lerpColor(lo.sunColor, hi.sunColor,  t),
    sunGlow:   lerpColor(lo.sunGlow,  hi.sunGlow,   t),
    sunOp:     lerpNum(lo.sunOp,      hi.sunOp,     t),
  }
}

// ─── Train car helper ────────────────────────────────────────────────────────
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

// ─── Main component ───────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const [particlesReady, setParticlesReady] = useState(false)
  const [colors, setColors] = useState(() => getColors())

  // Update every minute
  useEffect(() => {
    const tick = () => setColors(getColors())
    const id = setInterval(tick, 60_000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setParticlesReady(true))
  }, [])

  // Sakura petals tint with time — pink in day, muted at night
  const sakuraColors = useMemo(() => {
    const h = new Date().getHours()
    if (h >= 21 || h < 5)  return ['#4a3a5a', '#3a2a4a', '#5a4a6a']
    if (h >= 5  && h < 7)  return ['#ffb7c5', '#ff9eaa', '#ffcc88']
    return ['#ffb7c5', '#ff9eb5', '#ffd0da', '#ffcce0']
  }, [colors])

  const particleOptions = {
    fullScreen: { enable: false },
    particles: {
      number: { value: 15 },
      color: { value: sakuraColors },
      shape: { type: 'circle' },
      opacity: { value: { min: 0.3, max: 0.7 } },
      size: { value: { min: 3, max: 6 } },
      move: {
        enable: true, speed: 1, direction: 'bottom',
        straight: true, random: false, drift: -0.5,
        outModes: { default: 'out' },
      },
      rotate: {
        value: { min: 0, max: 360 },
        direction: 'clockwise',
        animation: { enable: true, speed: 3 },
      },
    },
    interactivity: { events: {} },
    background: { color: 'transparent' },
  }

  const TRANS = 'background 90s linear, opacity 90s linear'

  return (
    <section ref={ref} id="hero" className="min-h-screen flex flex-col justify-center items-center text-center px-6 pl-24 relative overflow-hidden">

      {/* ── Sky gradient ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, ${colors.skyTop}, ${colors.skyMid}, ${colors.skyBot})`,
          transition: TRANS,
        }}
      />

      {/* ── Stars (visible at night) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: Math.max(0, 1 - colors.sunOp * 3), transition: TRANS }}
      >
        {useMemo(() => Array.from({ length: 60 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              top:  `${Math.random() * 60}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0.2, 0.9, 0.2] }}
            transition={{ repeat: Infinity, duration: 2 + Math.random() * 3, delay: Math.random() * 3 }}
          />
        )), [])}
      </div>

      {/* ── Sun / Moon ── */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [colors.sunOp * 0.7, colors.sunOp, colors.sunOp * 0.7] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        className="absolute top-16 right-40 w-20 h-20 rounded-full blur-2xl pointer-events-none"
        style={{ backgroundColor: `${colors.sunGlow}cc`, transition: TRANS }}
      />
      <div
        className="absolute top-16 right-40 w-10 h-10 rounded-full blur-md pointer-events-none"
        style={{
          backgroundColor: colors.sunColor,
          opacity: colors.sunOp,
          transition: TRANS,
        }}
      />

      {/* ── Sakura particles ── */}
      {particlesReady && (
        <div
          className="absolute overflow-hidden pointer-events-none z-10"
          style={{ top: 0, left: 0, width: '100%', height: '100vh' }}
        >
          <Particles id="sakura" options={particleOptions} style={{ height: '100%' }} />
        </div>
      )}

      {/* ── Clouds ── */}
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: 35, ease: 'linear' }}
        className="absolute top-10 pointer-events-none flex"
        style={{ width: '200%', opacity: colors.cloud, transition: 'opacity 90s linear' }}
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

      {/* ── Ocean background ── */}
      <div
        className="absolute left-0 w-full pointer-events-none"
        style={{
          bottom: '4.5rem',
          height: '220px',
          background: `linear-gradient(to bottom, ${colors.seaTop}, ${colors.seaMid}, ${colors.seaDeep})`,
          transition: TRANS,
        }}
      />

      {/* ── Sea surface waves ── */}
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

      {/* ── Shore ── */}
      <div className="absolute left-0 w-full h-[4.5rem] bg-[#c8bfaa] bottom-0 pointer-events-none" />

      {/* ── Train tracks ── */}
      <div className="absolute bottom-[1.65rem] left-0 w-full pointer-events-none z-10 overflow-hidden">
        <svg viewBox="0 0 1440 36" className="w-full" preserveAspectRatio="none" style={{ display: 'block' }}>
          {/* Ballast bed */}
          <rect x="0" y="10" width="1440" height="26" fill="#a89880"/>
          <rect x="0" y="10" width="1440" height="6" fill="#b8a890" opacity="0.7"/>
          <rect x="0" y="30" width="1440" height="6" fill="#7a6a58" opacity="0.5"/>
          {/* Rail left */}
          <rect x="0" y="11" width="1440" height="5" rx="1" fill="#4a3c2c"/>
          <rect x="0" y="11" width="1440" height="2" rx="1" fill="#8a7a62"/>
          <rect x="0" y="11" width="1440" height="1" fill="#b0a080" opacity="0.6"/>
          {/* Rail right */}
          <rect x="0" y="23" width="1440" height="5" rx="1" fill="#4a3c2c"/>
          <rect x="0" y="23" width="1440" height="2" rx="1" fill="#8a7a62"/>
          <rect x="0" y="23" width="1440" height="1" fill="#b0a080" opacity="0.6"/>
        </svg>

        {/* Scrolling sleepers + spikes layer */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
            className="flex"
            style={{ width: '200%', position: 'absolute', top: 0, left: 0, height: '100%' }}
          >
            {[0, 1].map((copy) => (
              <svg key={copy} viewBox="0 0 1440 36" style={{ width: '50%', height: '36px', display: 'block', flexShrink: 0 }} preserveAspectRatio="none">
                {Array.from({ length: 72 }).map((_, i) => {
                  const x = i * 20
                  const shade = i % 3 === 0 ? '#5c4a32' : i % 3 === 1 ? '#6a5640' : '#523e2c'
                  return (
                    <g key={i}>
                      <rect x={x} y="12" width="16" height="16" rx="1" fill={shade}/>
                      <line x1={x+3} y1="13" x2={x+3} y2="27" stroke="#3e2c18" strokeWidth="0.6" opacity="0.35"/>
                      <line x1={x+8} y1="13" x2={x+9} y2="27" stroke="#7a6040" strokeWidth="0.5" opacity="0.25"/>
                      <line x1={x+13} y1="13" x2={x+12} y2="27" stroke="#3e2c18" strokeWidth="0.5" opacity="0.3"/>
                      <rect x={x} y="12" width="16" height="2" rx="0.5" fill="white" opacity="0.08"/>
                      <circle cx={x+4} cy="13.5" r="1.2" fill="#2a2018"/>
                      <circle cx={x+12} cy="13.5" r="1.2" fill="#2a2018"/>
                      <circle cx={x+4} cy="25.5" r="1.2" fill="#2a2018"/>
                      <circle cx={x+12} cy="25.5" r="1.2" fill="#2a2018"/>
                    </g>
                  )
                })}
              </svg>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Train ── */}
      <div className="absolute bottom-[3.5rem] left-1/2 -translate-x-1/2 pointer-events-none z-20 flex items-end gap-3">

        {/* — Passenger Car 1 — */}
        <TrainCar delay={0.4}>
          <svg width="96" height="54" viewBox="0 0 96 54" fill="none">
            {/* Roof */}
            <rect x="1" y="2" width="94" height="12" rx="4" fill="#222018"/>
            <rect x="3" y="2" width="90" height="6" rx="3" fill="#302e22"/>
            {/* Body depth shadow */}
            <rect x="1" y="12" width="94" height="30" rx="3" fill="#b8900e"/>
            {/* Main body */}
            <rect x="0" y="10" width="96" height="30" rx="3" fill="#e8b830"/>
            {/* Top highlight */}
            <rect x="2" y="10" width="92" height="8" rx="2" fill="#f8cc44" opacity="0.45"/>
            {/* Teal stripe */}
            <rect x="0" y="29" width="96" height="5" fill="#3aafc2"/>
            <rect x="0" y="29" width="96" height="2" fill="#56cfe0" opacity="0.55"/>
            {/* Window 1 */}
            <rect x="5" y="13" width="15" height="12" rx="2" fill="#182a36"/>
            <rect x="6" y="14" width="13" height="10" rx="1.5" fill="#a2d4ee"/>
            <rect x="6" y="14" width="13" height="3.5" rx="1" fill="white" opacity="0.28"/>
            {/* Window 2 */}
            <rect x="25" y="13" width="15" height="12" rx="2" fill="#182a36"/>
            <rect x="26" y="14" width="13" height="10" rx="1.5" fill="#a2d4ee"/>
            <rect x="26" y="14" width="13" height="3.5" rx="1" fill="white" opacity="0.28"/>
            {/* Door */}
            <rect x="44" y="11" width="8" height="22" rx="1" fill="#c49a1a" opacity="0.55"/>
            <rect x="47" y="13" width="2" height="18" rx="0.5" fill="#a07810" opacity="0.7"/>
            {/* Window 3 */}
            <rect x="56" y="13" width="15" height="12" rx="2" fill="#182a36"/>
            <rect x="57" y="14" width="13" height="10" rx="1.5" fill="#a2d4ee"/>
            <rect x="57" y="14" width="13" height="3.5" rx="1" fill="white" opacity="0.28"/>
            {/* Window 4 */}
            <rect x="76" y="13" width="15" height="12" rx="2" fill="#182a36"/>
            <rect x="77" y="14" width="13" height="10" rx="1.5" fill="#a2d4ee"/>
            <rect x="77" y="14" width="13" height="3.5" rx="1" fill="white" opacity="0.28"/>
            {/* Undercarriage */}
            <rect x="5" y="39" width="86" height="6" rx="2" fill="#161210"/>
            {/* Bogies */}
            <rect x="7" y="41" width="20" height="4" rx="1" fill="#242018"/>
            <rect x="69" y="41" width="20" height="4" rx="1" fill="#242018"/>
            {/* Wheels left */}
            <circle cx="14" cy="50" r="4.5" fill="#161210" stroke="#302a1e" strokeWidth="1.5"/>
            <circle cx="14" cy="50" r="1.8" fill="#302a1e"/>
            <circle cx="14" cy="50" r="0.7" fill="#4a4232"/>
            <circle cx="22" cy="50" r="3.5" fill="#161210" stroke="#302a1e" strokeWidth="1.5"/>
            <circle cx="22" cy="50" r="1.4" fill="#302a1e"/>
            {/* Wheels right */}
            <circle cx="74" cy="50" r="4.5" fill="#161210" stroke="#302a1e" strokeWidth="1.5"/>
            <circle cx="74" cy="50" r="1.8" fill="#302a1e"/>
            <circle cx="74" cy="50" r="0.7" fill="#4a4232"/>
            <circle cx="82" cy="50" r="3.5" fill="#161210" stroke="#302a1e" strokeWidth="1.5"/>
            <circle cx="82" cy="50" r="1.4" fill="#302a1e"/>
            {/* Couplers */}
            <rect x="-3" y="22" width="5" height="4" rx="1" fill="#7a6a48"/>
            <rect x="94" y="22" width="5" height="4" rx="1" fill="#7a6a48"/>
          </svg>
        </TrainCar>

        {/* — Passenger Car 2 — */}
        <TrainCar delay={0.2}>
          <svg width="96" height="54" viewBox="0 0 96 54" fill="none">
            <rect x="1" y="2" width="94" height="12" rx="4" fill="#222018"/>
            <rect x="3" y="2" width="90" height="6" rx="3" fill="#302e22"/>
            <rect x="1" y="12" width="94" height="30" rx="3" fill="#b08810"/>
            <rect x="0" y="10" width="96" height="30" rx="3" fill="#dcac2c"/>
            <rect x="2" y="10" width="92" height="8" rx="2" fill="#f0c040" opacity="0.45"/>
            <rect x="0" y="29" width="96" height="5" fill="#3aafc2"/>
            <rect x="0" y="29" width="96" height="2" fill="#56cfe0" opacity="0.55"/>
            <rect x="5" y="13" width="15" height="12" rx="2" fill="#182a36"/>
            <rect x="6" y="14" width="13" height="10" rx="1.5" fill="#a2d4ee"/>
            <rect x="6" y="14" width="13" height="3.5" rx="1" fill="white" opacity="0.28"/>
            <rect x="25" y="13" width="15" height="12" rx="2" fill="#182a36"/>
            <rect x="26" y="14" width="13" height="10" rx="1.5" fill="#a2d4ee"/>
            <rect x="26" y="14" width="13" height="3.5" rx="1" fill="white" opacity="0.28"/>
            <rect x="44" y="11" width="8" height="22" rx="1" fill="#b88e18" opacity="0.55"/>
            <rect x="47" y="13" width="2" height="18" rx="0.5" fill="#966e08" opacity="0.7"/>
            <rect x="56" y="13" width="15" height="12" rx="2" fill="#182a36"/>
            <rect x="57" y="14" width="13" height="10" rx="1.5" fill="#a2d4ee"/>
            <rect x="57" y="14" width="13" height="3.5" rx="1" fill="white" opacity="0.28"/>
            <rect x="76" y="13" width="15" height="12" rx="2" fill="#182a36"/>
            <rect x="77" y="14" width="13" height="10" rx="1.5" fill="#a2d4ee"/>
            <rect x="77" y="14" width="13" height="3.5" rx="1" fill="white" opacity="0.28"/>
            <rect x="5" y="39" width="86" height="6" rx="2" fill="#161210"/>
            <rect x="7" y="41" width="20" height="4" rx="1" fill="#242018"/>
            <rect x="69" y="41" width="20" height="4" rx="1" fill="#242018"/>
            <circle cx="14" cy="50" r="4.5" fill="#161210" stroke="#302a1e" strokeWidth="1.5"/>
            <circle cx="14" cy="50" r="1.8" fill="#302a1e"/>
            <circle cx="14" cy="50" r="0.7" fill="#4a4232"/>
            <circle cx="22" cy="50" r="3.5" fill="#161210" stroke="#302a1e" strokeWidth="1.5"/>
            <circle cx="22" cy="50" r="1.4" fill="#302a1e"/>
            <circle cx="74" cy="50" r="4.5" fill="#161210" stroke="#302a1e" strokeWidth="1.5"/>
            <circle cx="74" cy="50" r="1.8" fill="#302a1e"/>
            <circle cx="74" cy="50" r="0.7" fill="#4a4232"/>
            <circle cx="82" cy="50" r="3.5" fill="#161210" stroke="#302a1e" strokeWidth="1.5"/>
            <circle cx="82" cy="50" r="1.4" fill="#302a1e"/>
            <rect x="-3" y="22" width="5" height="4" rx="1" fill="#7a6a48"/>
            <rect x="94" y="22" width="5" height="4" rx="1" fill="#7a6a48"/>
          </svg>
        </TrainCar>

        {/* — Locomotive (faces right) — */}
        <TrainCar delay={0}>
          <div className="relative">
            {/* Smoke puffs — above chimney at nose */}
            <motion.div
              animate={{ y: [0, -14, -24], opacity: [0.55, 0.25, 0], scale: [0.7, 1.2, 1.7] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeOut' }}
              className="absolute -top-4 right-3 w-4 h-4 bg-white/55 rounded-full blur-sm"
            />
            <motion.div
              animate={{ y: [0, -9, -18], opacity: [0.35, 0.15, 0], scale: [0.5, 0.9, 1.3] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeOut', delay: 0.55 }}
              className="absolute -top-2 right-5 w-3 h-3 bg-white/40 rounded-full blur-sm"
            />

            <svg width="116" height="62" viewBox="0 0 116 62" fill="none">
              {/* Chimney — right at nose cap */}
              <rect x="96" y="0" width="9" height="11" rx="2" fill="#181818"/>
              <rect x="94" y="0" width="13" height="4" rx="1.5" fill="#181818"/>
              <rect x="95" y="3" width="11" height="3" rx="1" fill="#282828"/>

              {/* Roof — extends all the way to the nose */}
              <rect x="2" y="5" width="112" height="13" rx="5" fill="#222018"/>
              <rect x="4" y="5" width="108" height="7" rx="4" fill="#2e2c20"/>

              {/* Body shadow */}
              <rect x="1" y="16" width="105" height="33" rx="4" fill="#b08810"/>
              {/* Main body */}
              <rect x="0" y="14" width="105" height="33" rx="4" fill="#e8b830"/>
              {/* Rounded nose cap */}
              <rect x="92" y="14" width="24" height="33" rx="10" fill="#f0bc28"/>
              {/* Nose highlight */}
              <rect x="93" y="15" width="22" height="12" rx="6" fill="#f8cc40" opacity="0.5"/>
              {/* Body top highlight */}
              <rect x="2" y="14" width="100" height="9" rx="3" fill="#f8cc44" opacity="0.42"/>

              {/* Teal stripe */}
              <rect x="0" y="33" width="108" height="5" fill="#3aafc2"/>
              <rect x="0" y="33" width="108" height="2" fill="#56cfe0" opacity="0.55"/>

              {/* Windows x3 */}
              <rect x="5" y="17" width="17" height="13" rx="2" fill="#182a36"/>
              <rect x="6" y="18" width="15" height="11" rx="1.5" fill="#a2d4ee"/>
              <rect x="6" y="18" width="15" height="3.5" rx="1" fill="white" opacity="0.3"/>

              <rect x="27" y="17" width="17" height="13" rx="2" fill="#182a36"/>
              <rect x="28" y="18" width="15" height="11" rx="1.5" fill="#a2d4ee"/>
              <rect x="28" y="18" width="15" height="3.5" rx="1" fill="white" opacity="0.3"/>

              <rect x="50" y="17" width="15" height="13" rx="2" fill="#182a36"/>
              <rect x="51" y="18" width="13" height="11" rx="1.5" fill="#a2d4ee"/>
              <rect x="51" y="18" width="13" height="3.5" rx="1" fill="white" opacity="0.3"/>

              {/* Large front cab window */}
              <rect x="71" y="16" width="26" height="16" rx="3" fill="#182a36"/>
              <rect x="72" y="17" width="24" height="14" rx="2.5" fill="#c0e4ff"/>
              <rect x="72" y="17" width="24" height="5" rx="2" fill="white" opacity="0.32"/>

              {/* Ventilation grilles */}
              <rect x="5" y="35" width="3" height="9" rx="1" fill="#c09010" opacity="0.45"/>
              <rect x="10" y="35" width="1.5" height="9" fill="#c09010" opacity="0.4"/>
              <rect x="13" y="35" width="1.5" height="9" fill="#c09010" opacity="0.4"/>
              <rect x="16" y="35" width="1.5" height="9" fill="#c09010" opacity="0.4"/>
              <rect x="19" y="35" width="1.5" height="9" fill="#c09010" opacity="0.4"/>

              {/* Headlight */}
              <circle cx="109" cy="25" r="5.5" fill="#1a1a14"/>
              <circle cx="109" cy="25" r="4" fill="#fffce0"/>
              <circle cx="109" cy="25" r="2.2" fill="white" opacity="0.92"/>
              <circle cx="109" cy="25" r="6.5" fill="#ffee66" opacity="0.15"/>
              {/* Marker light (red, below headlight) */}
              <circle cx="109" cy="35" r="3" fill="#1a1a14"/>
              <circle cx="109" cy="35" r="2" fill="#e84040" opacity="0.88"/>
              {/* Red nose accent stripe */}
              <rect x="104" y="42" width="14" height="2.5" rx="1" fill="#b83030" opacity="0.85"/>

              {/* Undercarriage */}
              <rect x="5" y="45" width="100" height="7" rx="2" fill="#141210"/>
              {/* 3 bogies */}
              <rect x="7" y="47" width="22" height="4" rx="1" fill="#222018"/>
              <rect x="40" y="47" width="22" height="4" rx="1" fill="#222018"/>
              <rect x="75" y="47" width="22" height="4" rx="1" fill="#222018"/>

              {/* Wheels — 3 pairs */}
              <circle cx="15" cy="57" r="5" fill="#141210" stroke="#2a2418" strokeWidth="1.5"/>
              <circle cx="15" cy="57" r="2" fill="#2a2418"/>
              <circle cx="15" cy="57" r="0.8" fill="#484030"/>
              <circle cx="24" cy="57" r="4" fill="#141210" stroke="#2a2418" strokeWidth="1.5"/>
              <circle cx="24" cy="57" r="1.6" fill="#2a2418"/>

              <circle cx="48" cy="57" r="5" fill="#141210" stroke="#2a2418" strokeWidth="1.5"/>
              <circle cx="48" cy="57" r="2" fill="#2a2418"/>
              <circle cx="48" cy="57" r="0.8" fill="#484030"/>
              <circle cx="57" cy="57" r="4" fill="#141210" stroke="#2a2418" strokeWidth="1.5"/>
              <circle cx="57" cy="57" r="1.6" fill="#2a2418"/>

              <circle cx="83" cy="57" r="5" fill="#141210" stroke="#2a2418" strokeWidth="1.5"/>
              <circle cx="83" cy="57" r="2" fill="#2a2418"/>
              <circle cx="83" cy="57" r="0.8" fill="#484030"/>
              <circle cx="92" cy="57" r="4" fill="#141210" stroke="#2a2418" strokeWidth="1.5"/>
              <circle cx="92" cy="57" r="1.6" fill="#2a2418"/>

              {/* Rear coupler */}
              <rect x="-3" y="25" width="5" height="4" rx="1" fill="#7a6a48"/>

              {/* Front step */}
              <rect x="103" y="45" width="13" height="3" rx="1" fill="#141210"/>
            </svg>
          </div>
        </TrainCar>
      </div>

      {/* ── Hero text ── */}
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