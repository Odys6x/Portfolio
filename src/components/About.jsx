import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PHOTO = '/assets/Owen2.jpg'


const STARTERS = [
  "What's Owen working on?",
  "Tell me about PathFinders",
  "What tech does Owen know?",
  "Where has Owen worked?",
  "What does Owen do for fun?",
]

// ── Typing indicator dots ──
function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: 5, alignItems: 'center', padding: '2px 0' }}>
      {[0, 0.18, 0.36].map((delay, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 1, delay, ease: 'easeInOut' }}
          style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)' }}
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
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', marginBottom: 16 }}
    >
      {!isUser ? (
        <div style={{ display: 'flex', gap: 14, maxWidth: '85%' }}>
          <div style={{ width: 2, background: 'var(--accent)', flexShrink: 0, borderRadius: 1 }} />
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.75, fontWeight: 400 }}>
            {msg.content}
          </p>
        </div>
      ) : (
        <p style={{
          maxWidth: '75%',
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          color: 'var(--text)',
          lineHeight: 1.65,
          fontWeight: 400,
          borderBottom: '1px solid var(--accent)',
          paddingBottom: 4,
        }}>
          {msg.content}
        </p>
      )}
    </motion.div>
  )
}

// ── Chat panel inside the right binder ──
function ChatPanel() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Ask me anything about Owen — his projects, skills, experience, or what he's currently building.",
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
      setMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong. Please try again.' }])
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
      height: '100%', padding: '0',
      boxSizing: 'border-box',
    }}>

      {/* Messages area */}
      <div ref={scrollContainerRef} style={{
        flex: 1, overflowY: 'auto', minHeight: 0,
        padding: '4px 0',
        scrollbarWidth: 'thin',
        scrollbarColor: 'var(--border) transparent',
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
              style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}
            >
              <div style={{ width: 2, background: 'var(--accent)', flexShrink: 0, borderRadius: 1, alignSelf: 'stretch' }} />
              <div style={{ paddingLeft: 14 }}>
                <TypingDots />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Starter pills */}
      <AnimatePresence>
        {showStarters && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ flexShrink: 0, padding: '8px 0 4px' }}
          >
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.3em', color: 'var(--text-faint)', marginBottom: 8, textTransform: 'uppercase' }}>TRY ASKING</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {STARTERS.map((q) => (
                <motion.button
                  key={q}
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => sendMessage(q)}
                  style={{
                    fontFamily: "'Inter', sans-serif", fontSize: 10,
                    letterSpacing: '0.12em', color: 'var(--text-muted)', cursor: 'pointer',
                    background: 'var(--bg-alt)', border: '1px solid var(--border)', borderRadius: 0,
                    padding: '5px 12px', textTransform: 'uppercase',
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
      <div style={{ flexShrink: 0, marginTop: 10, display: 'flex', gap: 12, alignItems: 'flex-end', borderTop: '1px solid var(--border)', paddingTop: 14 }}>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask about Owen..."
          rows={1}
          style={{
            flex: 1, border: 'none', borderBottom: '1px solid var(--text-dim)', outline: 'none',
            background: 'transparent', resize: 'none',
            fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text)',
            padding: '4px 0', lineHeight: 1.5,
          }}
        />
        <motion.button
          whileHover={{ color: 'var(--accent)' }}
          whileTap={{ scale: 0.97 }}
          onClick={() => sendMessage()}
          disabled={loading || !input.trim()}
          style={{
            flexShrink: 0, background: 'none', border: 'none',
            color: loading || !input.trim() ? 'var(--text-dim)' : 'var(--text-muted)',
            cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
            fontFamily: "'Inter', sans-serif", fontSize: 10,
            letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 500,
            paddingBottom: 4,
          }}
        >
          SEND →
        </motion.button>
      </div>

      {/* Reset */}
      {messages.length > 2 && !showStarters && (
        <motion.button
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          onClick={() => { setMessages([messages[0]]); setShowStarters(true) }}
          style={{
            fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '0.2em',
            color: 'var(--text-faint)', textTransform: 'uppercase', background: 'none',
            border: 'none', cursor: 'pointer', marginTop: 8, textAlign: 'left',
          }}
        >
          ↺ RESET
        </motion.button>
      )}
    </div>
  )
}

export default function About() {
  return (
    <section id="about" style={{ background: 'var(--bg-alt)', position: 'relative', zIndex: 1, paddingTop: 80, paddingBottom: 80, overflow: 'hidden' }}>

      {/* Section header */}
      <div style={{ position: 'relative', overflow: 'hidden', padding: '0 48px 0', marginBottom: 48 }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.35em', color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', position: 'relative', zIndex: 1 }}>
          ISSUE 01 · FEATURE
        </p>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(40px, 8vw, 72px)', color: 'var(--accent)', letterSpacing: '0.02em', lineHeight: 1, position: 'relative', zIndex: 1 }}>
          ABOUT
        </h2>
        <div style={{ width: '100%', height: 1, background: 'var(--border)', marginTop: 16, position: 'relative', zIndex: 1 }} />
      </div>

      {/* Two-column editorial layout */}
      <div className="about-feature-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', maxWidth: 1200, margin: '0 auto', padding: '0 48px', gap: 0 }}>
        {/* Left: Photo */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ paddingRight: 48 }}
        >
          <div className="about-photo-wrap" style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'relative' }}>
            <img
              src={PHOTO}
              alt="Owen"
              style={{ width: '100%', height: 'auto', display: 'block', filter: 'contrast(1.05) saturate(0.9)' }}
            />
            <div className="about-photo-overlay" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 16px 14px', background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase' }}>OWEN WONG · SINGAPORE · 2026</p>
            </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Bio text */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ paddingLeft: 48, borderLeft: '1px solid var(--border)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(32px, 5vw, 52px)', color: 'var(--accent)', lineHeight: 1, marginBottom: 28, letterSpacing: '0.02em' }}>
            AI ENGINEER<br />&amp; DEVELOPER
          </p>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: 24, fontWeight: 400 }}>
            I'm Owen — a Singapore-based AI engineer who genuinely enjoys figuring out how to make machines useful. Currently wrapping up my final year at SIT while interning at SP Group, where I've been building AI agents that actually get used in production.
          </p>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: 32, fontWeight: 400 }}>
            Outside of work I enjoy gaming, staying up too late on side projects, and occasionally pretending I'll go to the gym. If you want to build something interesting, I'm probably already thinking about it.
          </p>

          {/* Skills list */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '0.3em', color: 'var(--text-muted)', marginBottom: 16, textTransform: 'uppercase' }}>SPECIALTIES</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['Python', 'LangGraph', 'RAG', 'DeepSeek', 'AWS', 'React', 'Full Stack', 'Computer Vision'].map(skill => (
                <span key={skill} style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.15em', color: 'var(--text-muted)', border: '1px solid var(--border)', padding: '4px 12px', textTransform: 'uppercase' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* AI Chat - editorial Q&A feature */}
      <div style={{ maxWidth: 1200, margin: '40px auto 0', padding: '0 48px' }}>
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 32 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 40 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.35em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>ASK THE SUBJECT</p>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '0.2em', color: 'var(--text-dim)', textTransform: 'uppercase' }}>AI-POWERED Q&amp;A</p>
          </div>
          <div className="about-chat-container" style={{ maxWidth: 860, margin: '0 auto', border: '1px solid var(--border)', background: 'var(--surface)' }}>
            <div style={{ borderBottom: '1px solid var(--border)', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 14, color: 'var(--accent)', letterSpacing: '0.1em' }}>ASK OWEN</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, color: 'var(--text-faint)', letterSpacing: '0.25em', textTransform: 'uppercase' }}>· AI-POWERED Q&A</span>
              <div style={{ flex: 1 }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, color: 'var(--text-dim)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>ISSUE 01</span>
            </div>
            <div style={{ height: 420, padding: '0 20px 20px' }}>
              <ChatPanel />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        textarea::placeholder { color: var(--text-dim); }
        textarea::-webkit-scrollbar { display: none; }
        @media (max-width: 767px) {
          .about-feature-grid { grid-template-columns: 1fr !important; padding: 0 20px !important; }
          .about-feature-grid > *:first-child { padding-right: 0 !important; }
          .about-photo-wrap { display: flex !important; justify-content: center !important; }
          .about-photo-wrap > div { width: 60% !important; }
          .about-photo-overlay { display: none !important; }
          .about-feature-grid > *:last-child { padding-left: 0 !important; border-left: none !important; padding-top: 32px !important; }
          #about > div:first-child { padding: 0 20px 0 !important; }
          .about-chat-container { max-width: 100% !important; }
          .about-chat-container > div { height: 480px !important; }
          #about > div:last-child { padding: 0 20px !important; margin-top: 48px !important; }
        }
      `}</style>
    </section>
  )
}
