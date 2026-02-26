import { motion } from 'framer-motion'

const PHOTO = '/assets/Owen.jpg'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }
  })
}

function StarDoodle({ color, size = 24, style }) {
  return (
    <svg viewBox="0 0 40 40" style={{ width: size, height: size, flexShrink: 0, ...style }}>
      <path d="M20,3 L23,15 L35,15 L26,23 L29,36 L20,28 L11,36 L14,23 L5,15 L17,15 Z"
        fill={color} stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  )
}

function HeartDoodle({ color, size = 20, style }) {
  return (
    <svg viewBox="0 0 30 28" style={{ width: size, flexShrink: 0, ...style }}>
      <path d="M15,24 C15,24 3,16 3,9 C3,5 6,2 10,2 C12,2 14,4 15,5 C16,4 18,2 20,2 C24,2 27,5 27,9 C27,16 15,24 15,24 Z"
        fill={color} stroke="white" strokeWidth="1.5"/>
    </svg>
  )
}

function FlowerDoodle({ color, style }) {
  return (
    <svg viewBox="0 0 40 40" style={{ width: 32, flexShrink: 0, ...style }}>
      <circle cx="20" cy="20" r="6" fill="#FFD700"/>
      {[0,60,120,180,240,300].map(a => (
        <ellipse key={a}
          cx={20 + 11*Math.cos(a*Math.PI/180)}
          cy={20 + 11*Math.sin(a*Math.PI/180)}
          rx="5" ry="7"
          transform={`rotate(${a} ${20 + 11*Math.cos(a*Math.PI/180)} ${20 + 11*Math.sin(a*Math.PI/180)})`}
          fill={color} stroke="white" strokeWidth="1"/>
      ))}
    </svg>
  )
}

function CloudDoodle({ color, style }) {
  return (
    <svg viewBox="0 0 60 35" style={{ width: 60, flexShrink: 0, ...style }}>
      <path d="M10,28 C2,28 2,16 10,16 C10,8 18,4 26,8 C30,2 42,2 44,10 C52,10 56,18 50,24 C50,28 42,32 36,28 Z"
        fill={color} stroke="white" strokeWidth="2"/>
    </svg>
  )
}

// Ruled lines background for a notebook page
function RuledPage({ children, marginColor = '#ffb3cc' }) {
  return (
    <div style={{ position: 'relative', background: '#fffdf6', borderRadius: 6, overflow: 'hidden', height: '100%' }}>
      {/* Horizontal ruled lines */}
      {Array.from({ length: 28 }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute', left: 0, right: 0,
          top: 20 + i * 22, height: 1,
          background: '#ddeeff', opacity: 0.7,
          pointerEvents: 'none',
        }}/>
      ))}
      {/* Margin line */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, left: 28,
        width: 2, background: marginColor, opacity: 0.7,
        pointerEvents: 'none',
      }}/>
      <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
        {children}
      </div>
    </div>
  )
}

const BINDER_HEIGHT = 580

export default function About() {
  return (
    <section
      id="about"
      style={{ background: '#fff9e6', position: 'relative', padding: '80px 16px', overflow: 'hidden' }}
    >
      {/* Background scatter doodles */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <FlowerDoodle color="#ff9eb5" style={{ position:'absolute', top:30, left:'6%', opacity:0.65 }}/>
        <StarDoodle color="#ffd93d" size={30} style={{ position:'absolute', top:55, left:'15%', transform:'rotate(20deg)', opacity:0.75 }}/>
        <CloudDoodle color="#b5e8ff" style={{ position:'absolute', top:18, right:'14%', opacity:0.85 }}/>
        <HeartDoodle color="#ff9eb5" size={26} style={{ position:'absolute', top:65, right:'28%', transform:'rotate(-15deg)', opacity:0.65 }}/>
        <StarDoodle color="#a8e6cf" size={20} style={{ position:'absolute', top:85, right:'7%', transform:'rotate(40deg)', opacity:0.75 }}/>
        <FlowerDoodle color="#b5a8ff" style={{ position:'absolute', top:12, left:'43%', opacity:0.45 }}/>
        <StarDoodle color="#ff9eb5" size={26} style={{ position:'absolute', bottom:45, left:'5%', transform:'rotate(-20deg)', opacity:0.65 }}/>
        <FlowerDoodle color="#ffd93d" style={{ position:'absolute', bottom:28, left:'20%', opacity:0.55 }}/>
        <HeartDoodle color="#ff6b6b" size={30} style={{ position:'absolute', bottom:65, right:'9%', transform:'rotate(10deg)', opacity:0.75 }}/>
        <CloudDoodle color="#a8e6cf" style={{ position:'absolute', bottom:18, right:'24%', opacity:0.65 }}/>
        <StarDoodle color="#b5a8ff" size={22} style={{ position:'absolute', bottom:75, left:'36%', transform:'rotate(30deg)', opacity:0.55 }}/>
        <HeartDoodle color="#ffd93d" size={20} style={{ position:'absolute', top:'42%', left:'2%', transform:'rotate(-10deg)', opacity:0.65 }}/>
        <FlowerDoodle color="#ff9eb5" style={{ position:'absolute', top:'57%', right:'2%', opacity:0.55 }}/>
        <StarDoodle color="#6bcbff" size={16} style={{ position:'absolute', top:'32%', right:'5%', transform:'rotate(15deg)', opacity:0.75 }}/>
        <StarDoodle color="#ffb3cc" size={16} style={{ position:'absolute', top:'68%', left:'4%', transform:'rotate(-30deg)', opacity:0.65 }}/>
      </div>

      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 32 }}
      >
        <div style={{ width: 40, height: 3, borderRadius: 2, background: '#ff9eb5' }}/>
        <p style={{ fontFamily: "'Caveat', cursive", fontSize: 22, color: '#ff6b9d', letterSpacing: '0.1em', margin: 0 }}>
          私について ✦ about me
        </p>
        <div style={{ width: 40, height: 3, borderRadius: 2, background: '#ff9eb5' }}/>
      </motion.div>

      {/* ── Main binder row ── */}
      <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'center', maxWidth: 860, margin: '0 auto', height: BINDER_HEIGHT }}>

        {/* ══ LEFT BINDER ══ */}
        <motion.div
          initial={{ opacity: 0, x: -70, rotate: -2 }}
          whileInView={{ opacity: 1, x: 0, rotate: -1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          style={{ flex: 1, maxWidth: 370, position: 'relative', display: 'flex', flexDirection: 'column' }}
        >
          {/* Cover shell */}
          <div style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            background: 'linear-gradient(145deg, #ff6b6b, #dd3333)',
            borderRadius: '14px 0 0 14px',
            boxShadow: '-6px 8px 32px rgba(200,50,50,0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
            padding: '12px 10px 10px',
            overflow: 'hidden',
            position: 'relative',
          }}>
            {/* Polka dots */}
            <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.10, pointerEvents:'none' }}>
              {Array.from({length:120}).map((_,i) => (
                <circle key={i} cx={`${(i%10)*11+5}%`} cy={`${Math.floor(i/10)*11+5}%`} r="5" fill="white"/>
              ))}
            </svg>

            {/* Cover label */}
            <div style={{
              position: 'relative', zIndex: 1,
              background: '#fff9e6', borderRadius: 8, padding: '5px 0',
              border: '2.5px solid #ffd93d', boxShadow: '2px 3px 0 #d4a800',
              textAlign: 'center', marginBottom: 10, flexShrink: 0,
            }}>
              <span style={{ fontFamily: "'Caveat', cursive", fontSize: 16, color: '#cc3333', fontWeight: 700 }}>
                📋 PROFILE ノート
              </span>
            </div>

            {/* Inner ruled page */}
            <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
              <RuledPage marginColor="#ffb3cc">
                <div style={{ padding: '14px 10px 14px 36px', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', boxSizing: 'border-box' }}>

                  {/* Polaroid */}
                  <motion.div
                    whileHover={{ rotate: 2, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 280 }}
                    style={{
                      background: '#fff',
                      padding: '7px 7px 28px',
                      boxShadow: '3px 4px 16px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.05)',
                      borderRadius: 3,
                      transform: 'rotate(-1.5deg)',
                      width: '88%',
                      flexShrink: 0,
                      position: 'relative',
                    }}
                  >
                    {/* Washi tape strips — pinned at each photo corner */}
                    <div style={{ position:'absolute', top:-5, left:-16, width:42, height:14, background:'rgba(255,211,70,0.85)', borderRadius:2, transform:'rotate(-38deg)', boxShadow:'1px 1px 3px rgba(0,0,0,0.15)', zIndex:2 }}/>
                    <div style={{ position:'absolute', top:-5, right:-10, width:42, height:14, background:'rgba(180,220,255,0.88)', borderRadius:2, transform:'rotate(38deg)', boxShadow:'1px 1px 3px rgba(0,0,0,0.15)', zIndex:2 }}/>
                    <div style={{ position:'absolute', bottom:2, left:-10, width:38, height:13, background:'rgba(200,255,180,0.88)', borderRadius:2, transform:'rotate(38deg)', boxShadow:'1px 1px 3px rgba(0,0,0,0.15)', zIndex:2 }}/>
                    <div style={{ position:'absolute', bottom:2, right:-16, width:38, height:13, background:'rgba(255,180,200,0.88)', borderRadius:2, transform:'rotate(-38deg)', boxShadow:'1px 1px 3px rgba(0,0,0,0.15)', zIndex:2 }}/>

                    <img
                      src={PHOTO} alt="Owen"
                      style={{
                        width: '100%',
                        height: 220,
                        objectFit: 'cover',
                        objectPosition: 'center 15%',
                        display: 'block',
                        borderRadius: 2,
                        filter: 'saturate(0.9) contrast(1.05)',
                      }}
                    />
                    <p style={{ fontFamily: "'Caveat', cursive", fontSize: 17, color: '#666', textAlign: 'center', marginTop: 5, lineHeight: 1 }}>
                      Owen ~ 2025 ☕
                    </p>
                  </motion.div>

                  {/* Name sticker */}
                  <motion.div
                    animate={{ rotate: [-1, 1.5, -1] }}
                    transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
                    style={{
                      marginTop: 18,
                      background: 'linear-gradient(135deg, #fff0f5, #ffe4f0)',
                      border: '2.5px solid #ffb3cc', borderRadius: 12,
                      padding: '6px 20px', boxShadow: '2px 3px 0 #f090b0',
                      textAlign: 'center', flexShrink: 0,
                    }}
                  >
                    <p style={{ fontFamily: "'Caveat', cursive", fontSize: 26, color: '#cc2266', fontWeight: 700, lineHeight: 1, margin: 0 }}>
                      Owen Wong
                    </p>
                    <p style={{ fontFamily: "'Caveat', cursive", fontSize: 14, color: '#aa4488', margin: '3px 0 0' }}>
                      🇸🇬 SG · born in 🇫🇷 France
                    </p>
                  </motion.div>

                  {/* Badge stickers */}
                  <div style={{ display: 'flex', gap: 8, marginTop: 12, flexShrink: 0 }}>
                    {[
                      { bg: '#ffd93d', border: '#d4a800', shadow: '#a07a00', text: '⭐ AI Dev' },
                      { bg: '#a8e6cf', border: '#5cb88a', shadow: '#3a8a5a', text: '🎮 Gamer' },
                    ].map((s, i) => (
                      <motion.div key={i}
                        animate={{ y: [0, -3, 0] }}
                        transition={{ repeat: Infinity, duration: 2 + i * 0.6, ease: 'easeInOut', delay: i * 0.4 }}
                        style={{
                          background: s.bg, border: `2px solid ${s.border}`,
                          borderRadius: 20, padding: '4px 12px',
                          boxShadow: `1px 2px 0 ${s.shadow}`,
                          fontFamily: "'Caveat', cursive", fontSize: 14, color: '#333',
                        }}
                      >{s.text}</motion.div>
                    ))}
                  </div>

                </div>
              </RuledPage>
            </div>
          </div>
        </motion.div>

        {/* ══ BOOK SPINE / FOLD ══ */}
        <div style={{
          width: 28, flexShrink: 0, zIndex: 20,
          position: 'relative', alignSelf: 'stretch',
        }}>
          {/* Left page shadow — darkens at the fold */}
          <div style={{
            position: 'absolute', top: 0, bottom: 0, left: 0, width: 14,
            background: 'linear-gradient(to right, rgba(0,0,0,0.18), rgba(0,0,0,0.06), transparent)',
          }}/>
          {/* Right page shadow */}
          <div style={{
            position: 'absolute', top: 0, bottom: 0, right: 0, width: 14,
            background: 'linear-gradient(to left, rgba(0,0,0,0.18), rgba(0,0,0,0.06), transparent)',
          }}/>
          {/* Centre crease highlight */}
          <div style={{
            position: 'absolute', top: 0, bottom: 0,
            left: '50%', transform: 'translateX(-50%)',
            width: 2,
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.0), rgba(255,255,255,0.55) 20%, rgba(255,255,255,0.55) 80%, rgba(255,255,255,0.0))',
          }}/>
        </div>

        {/* ══ RIGHT BINDER ══ */}
        <motion.div
          initial={{ opacity: 0, x: 70, rotate: 2 }}
          whileInView={{ opacity: 1, x: 0, rotate: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{ flex: 1, maxWidth: 370, position: 'relative', display: 'flex', flexDirection: 'column' }}
        >
          <div style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            background: 'linear-gradient(145deg, #dd3333, #bb1111)',
            borderRadius: '0 14px 14px 0',
            boxShadow: '6px 8px 32px rgba(200,50,50,0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
            padding: '12px 10px 10px',
            overflow: 'hidden',
            position: 'relative',
          }}>
            {/* Polka dots */}
            <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.10, pointerEvents:'none' }}>
              {Array.from({length:120}).map((_,i) => (
                <circle key={i} cx={`${(i%10)*11+5}%`} cy={`${Math.floor(i/10)*11+5}%`} r="5" fill="white"/>
              ))}
            </svg>

            {/* Cover label */}
            <div style={{
              position: 'relative', zIndex: 1,
              background: '#fff9e6', borderRadius: 8, padding: '5px 0',
              border: '2.5px solid #a8e6cf', boxShadow: '2px 3px 0 #5cb88a',
              textAlign: 'center', marginBottom: 10, flexShrink: 0,
            }}>
              <span style={{ fontFamily: "'Caveat', cursive", fontSize: 16, color: '#2a7a50', fontWeight: 700 }}>
                ✏️ ABOUT ME メモ
              </span>
            </div>

            {/* Inner ruled page */}
            <div style={{ flex: 1, position: 'relative', zIndex: 1, minHeight: 0 }}>
              <RuledPage marginColor="#ffb3cc">
                <div style={{ padding: '10px 10px 10px 36px', boxSizing: 'border-box' }}>

                  {/* Header */}
                  <motion.p custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    style={{ fontFamily: "'Caveat', cursive", fontSize: 30, fontWeight: 700, margin: '0 0 2px', lineHeight: 1.1 }}>
                    <span style={{ color: '#ee4444' }}>Hey! I'm</span>
                    <span style={{ color: '#cc2266' }}> Owen</span>
                    <span style={{ fontSize: 26 }}> 👋</span>
                  </motion.p>

                  {/* Squiggle underline */}
                  <motion.svg custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    viewBox="0 0 220 8" style={{ width: '100%', display: 'block', marginBottom: 10 }}>
                    <path d="M0,4 C18,0 36,8 54,4 C72,0 90,8 108,4 C126,0 144,8 162,4 C180,0 198,8 216,4"
                      fill="none" stroke="#ee4444" strokeWidth="2.5" strokeLinecap="round"/>
                  </motion.svg>

                  {/* Info pills */}
                  {[
                    { icon:'📚', text:'Final-year Applied AI @ SIT', bg:'#fff0f5', border:'#ffb3cc', shadow:'#f090b0', color:'#cc2266' },
                    { icon:'🛡️', text:'GenAI Dev @ SP Group', bg:'#f0f8ff', border:'#b3d4ff', shadow:'#88aaee', color:'#2244aa' },
                  ].map(({ icon, text, bg, border, shadow, color }, i) => (
                    <motion.div key={i} custom={i+2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                      style={{ marginBottom: 6 }}>
                      <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        background: bg, border: `2px solid ${border}`, borderRadius: 20,
                        padding: '3px 12px', boxShadow: `1px 2px 0 ${shadow}`,
                      }}>
                        <span style={{ fontSize: 13 }}>{icon}</span>
                        <span style={{ fontFamily: "'Caveat', cursive", fontSize: 15, color }}>{text}</span>
                      </div>
                    </motion.div>
                  ))}

                  {/* Dashed divider */}
                  <motion.svg custom={5} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    viewBox="0 0 220 6" style={{ width: '100%', display: 'block', margin: '6px 0 8px' }}>
                    <line x1="0" y1="3" x2="220" y2="3" stroke="#ffd93d" strokeWidth="3" strokeLinecap="round" strokeDasharray="8,5"/>
                  </motion.svg>

                  {/* Things I love header */}
                  <motion.div custom={6} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    style={{ marginBottom: 8 }}>
                    <span style={{
                      fontFamily: "'Caveat', cursive", fontSize: 17, fontWeight: 700, color: 'white',
                      background: 'linear-gradient(135deg, #a8e6cf, #5cb88a)',
                      borderRadius: 8, padding: '3px 12px', boxShadow: '2px 2px 0 #3a8a5a',
                      display: 'inline-block',
                    }}>
                      すきなこと ♡ things i love
                    </span>
                  </motion.div>

                  {[
                    { emoji:'🎮', text:'League of Legends, Monster Hunter, Pokemon', color:'#8855cc', bg:'#f5f0ff', border:'#c8a8ff', shadow:'#9966dd' },
                    { emoji:'🏃', text:'Trekking, Cycling', color:'#1a7a40', bg:'#f0fff0', border:'#a0e0b0', shadow:'#4a9a60' },
                    { emoji:'🎸', text:'Currently Learning Bass Guitar', color:'#cc4400', bg:'#fff5f0', border:'#ffb890', shadow:'#dd6622' },
                    { emoji:'🐠', text:'Animal Lover', color:'#0055aa', bg:'#f0f8ff', border:'#90c8ff', shadow:'#2266cc' },
                  ].map(({ emoji, text, color, bg, border, shadow }, i) => (
                    <motion.div key={i} custom={i+7} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                      style={{ marginBottom: 5 }}>
                      <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        background: bg, border: `2px solid ${border}`, borderRadius: 20,
                        padding: '3px 12px', boxShadow: `1px 2px 0 ${shadow}`,
                      }}>
                        <span style={{ fontSize: 13 }}>{emoji}</span>
                        <span style={{ fontFamily: "'Caveat', cursive", fontSize: 15, color }}>{text}</span>
                      </div>
                    </motion.div>
                  ))}

                  {/* Pink dashed divider */}
                  <motion.svg custom={11} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    viewBox="0 0 220 6" style={{ width: '100%', display: 'block', margin: '6px 0 8px' }}>
                    <line x1="0" y1="3" x2="220" y2="3" stroke="#ff9eb5" strokeWidth="3" strokeLinecap="round" strokeDasharray="6,5"/>
                  </motion.svg>

                  {/* Quote bubble */}
                  <motion.div custom={12} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    style={{
                      background: 'linear-gradient(135deg, #fff5f8, #ffe8f0)',
                      border: '2.5px solid #ffb3cc', borderRadius: 12,
                      padding: '7px 14px', boxShadow: '2px 3px 0 #f090b0',
                      position: 'relative',
                    }}>
                    <span style={{ position: 'absolute', top: -10, left: 10, fontSize: 20, color: '#ffb3cc', lineHeight: 1 }}>"</span>
                    <p style={{ fontFamily: "'Caveat', cursive", fontSize: 14, color: '#cc2266', lineHeight: 1.5, margin: 0, fontStyle: 'italic' }}>
                      I love building things that actually<br/>work in the real world.
                    </p>
                  </motion.div>

                  {/* Corner spinning star */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6, marginTop: 8, alignItems: 'center' }}>
                    <motion.div animate={{ scale: [1, 1.25, 1] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
                      <HeartDoodle color="#ff9eb5" size={18}/>
                    </motion.div>
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 9, ease: 'linear' }}>
                      <StarDoodle color="#ffd93d" size={20}/>
                    </motion.div>
                    <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}>
                      <StarDoodle color="#b5a8ff" size={16}/>
                    </motion.div>
                  </div>

                </div>
              </RuledPage>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&display=swap');`}</style>
    </section>
  )
}