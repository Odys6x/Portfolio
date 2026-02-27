import { motion } from 'framer-motion'
import { useMemo } from 'react'

// ── Single furin — drawn relative to (0,0) at hook point ──
function Furin({ size = 80, delay = 0, swayAmt = 8 }) {
  const r = size * 0.38
  const dur = (3.5 + delay * 0.5).toFixed(2)

  return (
    <g>
      {/* Native SVG animateTransform — rotates around (0,0) = hook */}
      <animateTransform
        attributeName="transform"
        type="rotate"
        values={`${-swayAmt},0,0; ${swayAmt},0,0; ${-swayAmt * 0.4},0,0; ${swayAmt * 0.6},0,0; ${-swayAmt},0,0`}
        keyTimes="0; 0.3; 0.52; 0.76; 1"
        dur={`${dur}s`}
        begin={`${delay}s`}
        repeatCount="indefinite"
        calcMode="spline"
        keySplines="0.45 0.05 0.55 0.95; 0.45 0.05 0.55 0.95; 0.45 0.05 0.55 0.95; 0.45 0.05 0.55 0.95"
      />
      {/* String top */}
      <line x1="0" y1="0" x2="0" y2={size * 0.3} stroke="rgba(255,255,255,0.65)" strokeWidth="1.2"/>

      {/* Glass ball */}
      <ellipse
        cx="0" cy={size * 0.3 + r}
        rx={r} ry={r}
        fill="rgba(255,255,255,0.10)"
        stroke="rgba(255,255,255,0.60)"
        strokeWidth="1.8"
      />
      {/* Shine */}
      <ellipse
        cx={-r * 0.28} cy={size * 0.3 + r * 0.55}
        rx={r * 0.35} ry={r * 0.25}
        fill="rgba(255,255,255,0.40)"
        transform={`rotate(-30, ${-r * 0.28}, ${size * 0.3 + r * 0.55})`}
      />
      <ellipse
        cx={-r * 0.48} cy={size * 0.3 + r * 0.42}
        rx={r * 0.1} ry={r * 0.08}
        fill="rgba(255,255,255,0.55)"
      />
      {/* Inner ring */}
      <ellipse
        cx="0" cy={size * 0.3 + r}
        rx={r * 0.55} ry={r * 0.55}
        fill="none"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1"
      />
      {/* Sakura inside */}
      <text
        x="0" y={size * 0.3 + r + r * 0.18}
        textAnchor="middle"
        fontSize={r * 0.5}
        opacity="0.45"
        fill="#e8a0a8"
      >🌸</text>

      {/* String below ball */}
      <line
        x1="0" y1={size * 0.3 + r * 2}
        x2="0" y2={size * 0.3 + r * 2 + size * 0.55}
        stroke="rgba(255,255,255,0.55)" strokeWidth="1.2"
      />

      {/* Tanzaku tag */}
      <rect
        x={-size * 0.12}
        y={size * 0.3 + r * 2 + size * 0.55}
        width={size * 0.24}
        height={size * 0.72}
        rx={size * 0.03}
        fill="rgba(72,158,172,0.72)"
        stroke="rgba(255,255,255,0.28)"
        strokeWidth="0.8"
      />
      {[0.18, 0.38, 0.58, 0.78].map((t, i) => (
        <line key={i}
          x1={-size * 0.08}
          y1={size * 0.3 + r * 2 + size * 0.55 + size * 0.72 * t}
          x2={size * 0.08}
          y2={size * 0.3 + r * 2 + size * 0.55 + size * 0.72 * t}
          stroke="rgba(255,255,255,0.22)" strokeWidth="0.8"
        />
      ))}
    </g>
  )
}

// ── Drifting petal ──
function Petal({ startX, startY, delay, duration }) {
  return (
    <motion.text
      initial={{ x: startX, y: startY, opacity: 0, rotate: 0 }}
      animate={{
        x: [startX, startX + 60, startX + 30, startX + 100],
        y: [startY, startY + 200, startY + 420, startY + 680],
        opacity: [0, 0.55, 0.45, 0],
        rotate: [0, 40, 80, 160],
      }}
      transition={{ repeat: Infinity, duration, delay, ease: 'easeIn' }}
      fontSize="13"
    >🌸</motion.text>
  )
}

// ── Bird ──
function Bird({ x, y, delay }) {
  return (
    <motion.text
      initial={{ x, opacity: 0 }}
      animate={{ x: [x, x - 350], opacity: [0, 0.3, 0.3, 0] }}
      transition={{ repeat: Infinity, duration: 20, delay, ease: 'linear' }}
      y={y} fontSize="9" fill="rgba(50,70,95,0.45)"
    >︿</motion.text>
  )
}

export default function FurinBackground({ style = {} }) {
  const furins = useMemo(() => [
    { x: 110,  rodY: 152, size: 86,  delay: 0,    sway: 7  },
    { x: 265,  rodY: 146, size: 98,  delay: 0.9,  sway: 10 },
    { x: 425,  rodY: 139, size: 80,  delay: 0.4,  sway: 6  },
    { x: 585,  rodY: 132, size: 94,  delay: 1.3,  sway: 9  },
    { x: 745,  rodY: 125, size: 76,  delay: 0.6,  sway: 5  },
    { x: 890,  rodY: 119, size: 90,  delay: 1.6,  sway: 8  },
    { x: 1040, rodY: 112, size: 83,  delay: 0.2,  sway: 11 },
    { x: 1195, rodY: 105, size: 93,  delay: 1.1,  sway: 7  },
    { x: 1345, rodY: 98,  size: 78,  delay: 0.8,  sway: 9  },
  ], [])

  const petals = useMemo(() => [
    { startX: 80,   startY: 80,  delay: 0,   duration: 11 },
    { startX: 310,  startY: 50,  delay: 2.5, duration: 14 },
    { startX: 560,  startY: 70,  delay: 1,   duration: 12 },
    { startX: 790,  startY: 110, delay: 3.5, duration: 10 },
    { startX: 1010, startY: 55,  delay: 0.5, duration: 13 },
    { startX: 1210, startY: 85,  delay: 4,   duration: 11 },
    { startX: 210,  startY: 180, delay: 6,   duration: 15 },
    { startX: 910,  startY: 160, delay: 2.2, duration: 12 },
    { startX: 1310, startY: 140, delay: 5,   duration: 14 },
  ], [])

  const birds = useMemo(() => [
    { x: 1400, y: 270, delay: 0   },
    { x: 1420, y: 285, delay: 0.4 },
    { x: 1408, y: 262, delay: 0.7 },
    { x: 1385, y: 278, delay: 1.1 },
    { x: 1395, y: 294, delay: 1.5 },
    { x: 1440, y: 255, delay: 0.9 },
    { x: 1365, y: 270, delay: 2.0 },
    { x: 1430, y: 305, delay: 2.4 },
  ], [])

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
        background: 'linear-gradient(180deg, #7ec8e3 0%, #aaddf0 45%, #d4eefc 100%)',
        ...style,
      }}
    >
      <svg
        viewBox="0 0 1440 700"
        preserveAspectRatio="xMidYMid slice"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <defs>
          <linearGradient id="furinSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#7ec8e3" stopOpacity="0.50"/>
            <stop offset="45%"  stopColor="#aaddf0" stopOpacity="0.35"/>
            <stop offset="100%" stopColor="#d4eefc" stopOpacity="0.15"/>
          </linearGradient>
          <radialGradient id="sunBloom" cx="88%" cy="6%" r="32%">
            <stop offset="0%"   stopColor="rgba(255,252,220,0.60)"/>
            <stop offset="100%" stopColor="rgba(255,255,255,0)"  />
          </radialGradient>
        </defs>

        <rect x="0" y="0" width="1440" height="700" fill="url(#furinSky)"/>
        <rect x="0" y="0" width="1440" height="700" fill="url(#sunBloom)"/>

        {/* Clouds */}
        <g opacity="0.52">
          <ellipse cx="100"  cy="118" rx="130" ry="44" fill="white"/>
          <ellipse cx="162"  cy="88"  rx="88"  ry="50" fill="white"/>
          <ellipse cx="58"   cy="100" rx="68"  ry="33" fill="white"/>
          <ellipse cx="228"  cy="105" rx="58"  ry="28" fill="white"/>
          <ellipse cx="585"  cy="92"  rx="108" ry="36" fill="white"/>
          <ellipse cx="642"  cy="68"  rx="72"  ry="40" fill="white"/>
          <ellipse cx="512"  cy="83"  rx="62"  ry="28" fill="white"/>
          <ellipse cx="1052" cy="78"  rx="92"  ry="33" fill="white"/>
          <ellipse cx="1122" cy="55"  rx="68"  ry="38" fill="white"/>
          <ellipse cx="980"  cy="72"  rx="58"  ry="26" fill="white"/>
          <ellipse cx="1182" cy="88"  rx="52"  ry="22" fill="white"/>
          <ellipse cx="382"  cy="155" rx="52"  ry="18" fill="white" opacity="0.7"/>
          <ellipse cx="822"  cy="138" rx="68"  ry="20" fill="white" opacity="0.6"/>
          <ellipse cx="1302" cy="148" rx="58"  ry="18" fill="white" opacity="0.62"/>
        </g>

        {/* Rod shadow */}
        <line x1="-20" y1="162" x2="1460" y2="90" stroke="rgba(20,30,50,0.12)" strokeWidth="16" strokeLinecap="round"/>
        {/* Rod body */}
        <line x1="-20" y1="158" x2="1460" y2="86" stroke="rgba(75,95,125,0.68)" strokeWidth="11" strokeLinecap="round"/>
        {/* Rod highlight */}
        <line x1="-20" y1="153" x2="1460" y2="81" stroke="rgba(170,195,215,0.45)" strokeWidth="3" strokeLinecap="round"/>
        {/* Rod texture */}
        {Array.from({ length: 26 }).map((_, i) => (
          <line key={i}
            x1={i * 58} y1={158 - i * 2.8}
            x2={i * 58 + 36} y2={156 - i * 2.8}
            stroke="rgba(40,58,100,0.18)" strokeWidth="9"
          />
        ))}

        {/* Hooks */}
        {furins.map(({ x, rodY }, i) => (
          <path key={`hook-${i}`}
            d={`M ${x} ${rodY - 2} Q ${x + 7} ${rodY - 9} ${x + 7} ${rodY + 5} Q ${x + 7} ${rodY + 13} ${x} ${rodY + 13}`}
            fill="none" stroke="rgba(35,45,65,0.60)" strokeWidth="2.2" strokeLinecap="round"
          />
        ))}

        {/* Furin — each translated so (0,0) is at hook bottom, rotate pivots there */}
        {furins.map(({ x, rodY, size, delay, sway }, i) => (
          <g key={`furin-${i}`} transform={`translate(${x}, ${rodY + 13})`}>
            <Furin size={size} delay={delay} swayAmt={sway}/>
          </g>
        ))}

        {/* Birds */}
        {birds.map((b, i) => <Bird key={i} {...b}/>)}

        {/* Petals */}
        {petals.map((p, i) => <Petal key={i} {...p}/>)}

      </svg>
    </div>
  )
}