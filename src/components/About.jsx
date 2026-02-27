import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PHOTO = '/assets/Owen.jpg'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }
  })
}

const STARTERS = [
  "What's Owen working on? 🛡️",
  "Tell me about PathFinders 🏆",
  "What does Owen do for fun? 🎮",
  "What tech does Owen know? 💻",
  "Where has Owen worked? 💼",
]

function RuledPage({ children, marginColor = '#ffb3cc' }) {
  return (
    <div style={{ position: 'relative', background: '#fffdf6', borderRadius: 6, overflow: 'hidden', height: '100%' }}>
      {Array.from({ length: 28 }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute', left: 0, right: 0,
          top: 20 + i * 22, height: 1,
          background: '#ddeeff', opacity: 0.7,
          pointerEvents: 'none',
        }}/>
      ))}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, left: 28,
        width: 2, background: marginColor, opacity: 0.5,
        pointerEvents: 'none',
      }}/>
      <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
        {children}
      </div>
    </div>
  )
}

// ── Typing indicator dots ──
function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center', padding: '2px 0' }}>
      {[0, 0.2, 0.4].map((delay, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 0.7, delay, ease: 'easeInOut' }}
          style={{
            width: 7, height: 7, borderRadius: '50%',
            background: '#cc2266',
          }}
        />
      ))}
    </div>
  )
}

// ── Chat bubble ──
function ChatBubble({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: 10,
      }}
    >
      {!isUser && (
        <div style={{
          width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(135deg, #ff9eb5, #ff6b9d)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, marginRight: 7, marginTop: 2,
          boxShadow: '0 2px 6px rgba(200,50,80,0.3)',
        }}>🤖</div>
      )}
      <div style={{
        maxWidth: '78%',
        background: isUser
          ? 'linear-gradient(135deg, #ff9eb5, #ff6b9d)'
          : 'rgba(255,255,255,0.92)',
        color: isUser ? 'white' : '#333',
        border: isUser ? 'none' : '1.5px solid #ffb3cc',
        borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
        padding: '8px 13px',
        fontFamily: "'Caveat', cursive", fontWeight: 600,
        fontSize: 19,
        lineHeight: 1.55,
        boxShadow: isUser
          ? '2px 3px 0 rgba(200,50,80,0.25)'
          : '2px 3px 0 rgba(255,179,204,0.4)',
      }}>
        {msg.content}
      </div>
      {isUser && (
        <div style={{
          width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(135deg, #ffd93d, #f0a800)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, marginLeft: 7, marginTop: 2,
          boxShadow: '0 2px 6px rgba(200,150,0,0.3)',
        }}>😊</div>
      )}
    </motion.div>
  )
}

// ── Chat panel inside the right binder ──
function ChatPanel() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hey there! 👋 I'm Owen Bot — ask me anything about Owen! Whether it's his projects, skills, or what he does for fun lah~",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showStarters, setShowStarters] = useState(true)
  const scrollContainerRef = useRef(null)
  const prevMsgCount = useRef(1)

  // On mount: force scroll to top after full layout + paint
  useEffect(() => {
    let raf1, raf2
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        const el = scrollContainerRef.current
        if (el) el.scrollTop = 0
      })
    })
    return () => { cancelAnimationFrame(raf1); cancelAnimationFrame(raf2) }
  }, [])

  // On new messages: scroll to bottom
  useEffect(() => {
    const el = scrollContainerRef.current
    if (!el) return
    if (messages.length > prevMsgCount.current || loading) {
      el.scrollTop = el.scrollHeight
    }
    prevMsgCount.current = messages.length
  }, [messages, loading])

  const sendMessage = async (text) => {
    const userText = (text || input).trim()
    if (!userText || loading) return

    setInput('')
    setShowStarters(false)
    setMessages(prev => [...prev, { role: 'user', content: userText }])
    setLoading(true)

    try {
      const history = messages
        .filter(m => m.role !== 'system')
        .concat({ role: 'user', content: userText })

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Aiyah, something went wrong leh 😅 Try again!' }])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      height: '100%', padding: '10px 10px 10px 36px',
      boxSizing: 'border-box',
    }}>

      {/* Header */}
      <div style={{ marginBottom: 8, flexShrink: 0 }}>
        <motion.p
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontFamily: "'Caveat', cursive", fontSize: 26, fontWeight: 700, margin: '0 0 2px', lineHeight: 1.1 }}
        >
          <span style={{ color: '#ee4444' }}>Ask me about</span>
          <span style={{ color: '#cc2266' }}> Owen!</span>
          <span style={{ fontSize: 22 }}> 💬</span>
        </motion.p>
        {/* Squiggle */}
        <svg viewBox="0 0 220 8" style={{ width: '100%', display: 'block', marginBottom: 4 }}>
          <path d="M0,4 C18,0 36,8 54,4 C72,0 90,8 108,4 C126,0 144,8 162,4 C180,0 198,8 216,4"
            fill="none" stroke="#ee4444" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
        {/* Powered by badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        </div>
      </div>

      {/* Messages area */}
      <div ref={scrollContainerRef} style={{
        flex: 1, overflowY: 'auto', minHeight: 0,
        padding: '4px 0',
        scrollbarWidth: 'thin',
        scrollbarColor: '#ffb3cc transparent',
      }}>
        {messages.map((msg, i) => (
          <ChatBubble key={i} msg={msg} />
        ))}

        {/* Typing indicator */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}
            >
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: 'linear-gradient(135deg, #ff9eb5, #ff6b9d)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
              }}>🤖</div>
              <div style={{
                background: 'rgba(255,255,255,0.92)', border: '1.5px solid #ffb3cc',
                borderRadius: '16px 16px 16px 4px', padding: '8px 14px',
                boxShadow: '2px 3px 0 rgba(255,179,204,0.4)',
              }}>
                <TypingDots />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Starter pills — outside scroll so they don't push content */}
      <AnimatePresence>
        {showStarters && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ flexShrink: 0, padding: '6px 0 2px' }}
          >
            <p style={{
              fontFamily: "'Caveat', cursive", fontWeight: 600, fontSize: 15, color: '#aa4488',
              opacity: 0.7, marginBottom: 5,
            }}>✦ Try asking:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {STARTERS.map((q) => (
                <motion.button
                  key={q}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => sendMessage(q)}
                  style={{
                    fontFamily: "'Caveat', cursive", fontWeight: 600, fontSize: 15,
                    color: '#cc2266', cursor: 'pointer',
                    background: 'linear-gradient(135deg, #fff0f5, #ffe4f0)',
                    border: '1.5px solid #ffb3cc', borderRadius: 20,
                    padding: '3px 9px',
                    boxShadow: '1px 2px 0 #f090b0',
                    transition: 'all 0.15s',
                  }}
                >
                  {q}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input area */}
      <div style={{
        flexShrink: 0, marginTop: 8,
        display: 'flex', gap: 6, alignItems: 'flex-end',
      }}>
        <div style={{
          flex: 1, position: 'relative',
          background: 'rgba(255,255,255,0.9)',
          border: '2px solid #ffb3cc',
          borderRadius: 14,
          boxShadow: '2px 2px 0 #f090b0',
          overflow: 'hidden',
        }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask about Owen..."
            rows={1}
            style={{
              width: '100%', border: 'none', outline: 'none',
              background: 'transparent', resize: 'none',
              fontFamily: "'Caveat', cursive", fontWeight: 600, fontSize: 18, color: '#333',
              padding: '8px 10px',
              lineHeight: 1.4,
            }}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.93 }}
          onClick={() => sendMessage()}
          disabled={loading || !input.trim()}
          style={{
            width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
            background: loading || !input.trim()
              ? 'rgba(255,179,204,0.4)'
              : 'linear-gradient(135deg, #ff9eb5, #ff6b9d)',
            border: '2px solid #ffb3cc',
            cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20,
            boxShadow: loading || !input.trim() ? 'none' : '2px 3px 0 #aa1144',
            transition: 'all 0.2s',
          }}
        >
          {loading ? '⏳' : '✉️'}
        </motion.button>
      </div>

      {/* Reset hint */}
      {messages.length > 2 && !showStarters && (
        <motion.button
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          onClick={() => { setMessages([messages[0]]); setShowStarters(true) }}
          style={{
            fontFamily: "'Caveat', cursive", fontWeight: 600, fontSize: 15, color: '#aa4488',
            opacity: 0.55, background: 'none', border: 'none', cursor: 'pointer',
            marginTop: 4, textAlign: 'center',
          }}
        >
          ↺ start over
        </motion.button>
      )}
    </div>
  )
}

const BINDER_HEIGHT = 580

export default function About() {
  return (
    <section
      id="about"
      style={{ background: 'transparent', position: 'relative', zIndex: 1, padding: '80px 16px', overflow: 'hidden' }}
    >
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 32 }}
      >
        <div style={{ width: 40, height: 3, borderRadius: 2, background: '#ff9eb5' }}/>
        <p style={{ fontFamily: "'Caveat', cursive", fontWeight: 600, fontSize: 26, color: '#ff6b9d', letterSpacing: '0.1em', margin: 0 }}>
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
              background: 'linear-gradient(160deg, #faf7f0 0%, #f2f6f8 100%)', borderRadius: 8, padding: '5px 0',
              border: '2.5px solid #ffd93d', boxShadow: '2px 3px 0 #d4a800',
              textAlign: 'center', marginBottom: 10, flexShrink: 0,
            }}>
              <span style={{ fontFamily: "'Caveat', cursive", fontSize: 20, color: '#cc3333', fontWeight: 700 }}>
                📋 PROFILE ノート
              </span>
            </div>

            {/* Inner ruled page */}
            <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
              <RuledPage marginColor="#a0c4d8">
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
                    {/* Washi tape strips */}
                    <div style={{ position:'absolute', top:-5, left:-16, width:42, height:14, background:'rgba(255,211,70,0.85)', borderRadius:2, transform:'rotate(-38deg)', boxShadow:'1px 1px 3px rgba(0,0,0,0.15)', zIndex:2 }}/>
                    <div style={{ position:'absolute', top:-5, right:-10, width:42, height:14, background:'rgba(180,220,255,0.88)', borderRadius:2, transform:'rotate(38deg)', boxShadow:'1px 1px 3px rgba(0,0,0,0.15)', zIndex:2 }}/>
                    <div style={{ position:'absolute', bottom:2, left:-10, width:38, height:13, background:'rgba(200,255,180,0.88)', borderRadius:2, transform:'rotate(38deg)', boxShadow:'1px 1px 3px rgba(0,0,0,0.15)', zIndex:2 }}/>
                    <div style={{ position:'absolute', bottom:2, right:-16, width:38, height:13, background:'rgba(255,180,200,0.88)', borderRadius:2, transform:'rotate(-38deg)', boxShadow:'1px 1px 3px rgba(0,0,0,0.15)', zIndex:2 }}/>
                    <img
                      src={PHOTO} alt="Owen"
                      style={{
                        width: '100%', height: 220,
                        objectFit: 'cover', objectPosition: 'center 15%',
                        display: 'block', borderRadius: 2,
                        filter: 'saturate(0.9) contrast(1.05)',
                      }}
                    />
                    <p style={{ fontFamily: "'Caveat', cursive", fontWeight: 600, fontSize: 19, color: '#666', textAlign: 'center', marginTop: 5, lineHeight: 1 }}>
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
                    <p style={{ fontFamily: "'Caveat', cursive", fontSize: 30, color: '#cc2266', fontWeight: 700, lineHeight: 1, margin: 0 }}>
                      Owen Wong
                    </p>
                    <p style={{ fontFamily: "'Caveat', cursive", fontWeight: 600, fontSize: 18, color: '#aa4488', margin: '3px 0 0' }}>
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
                          fontFamily: "'Caveat', cursive", fontWeight: 600, fontSize: 18, color: '#333',
                        }}
                      >{s.text}</motion.div>
                    ))}
                  </div>

                </div>
              </RuledPage>
            </div>
          </div>
        </motion.div>

        {/* ══ BOOK SPINE ══ */}
        <div style={{ width: 28, flexShrink: 0, zIndex: 20, position: 'relative', alignSelf: 'stretch' }}>
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 14, background: 'linear-gradient(to right, rgba(0,0,0,0.18), rgba(0,0,0,0.06), transparent)' }}/>
          <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 14, background: 'linear-gradient(to left, rgba(0,0,0,0.18), rgba(0,0,0,0.06), transparent)' }}/>
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 2, background: 'linear-gradient(to bottom, rgba(255,255,255,0.0), rgba(255,255,255,0.55) 20%, rgba(255,255,255,0.55) 80%, rgba(255,255,255,0.0))' }}/>
        </div>

        {/* ══ RIGHT BINDER — AI CHAT ══ */}
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
              <span style={{ fontFamily: "'Caveat', cursive", fontSize: 20, color: '#2a7a50', fontWeight: 700 }}>
                🤖 OWEN BOT チャット
              </span>
            </div>

            {/* Inner ruled page with chat */}
            <div style={{ flex: 1, position: 'relative', zIndex: 1, minHeight: 0 }}>
              <RuledPage marginColor="#a0c4d8">
                <ChatPanel />
              </RuledPage>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&display=swap');
        textarea::placeholder { color: #cc226680; }
        textarea::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  )
}