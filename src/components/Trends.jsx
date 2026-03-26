import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SUGGESTIONS = [
  "What's the biggest story today?",
  "What's happening with LLMs?",
  "Any interesting open source releases?",
  "What should developers pay attention to?",
]

function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: 5, alignItems: 'center', padding: '4px 0' }}>
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

export default function Trends() {
  const INITIAL_PROMPT = "Give me a sharp briefing on today's top AI and tech trends. What are the 2–3 key themes worth paying attention to?"

  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-request briefing on mount
  useEffect(() => {
    sendMessage(INITIAL_PROMPT, true)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function sendMessage(text, silent = false) {
    if (!text.trim() || loading) return
    setInput('')
    setShowSuggestions(false)

    const newMessages = silent
      ? messages
      : [...messages, { role: 'user', content: text }]

    if (!silent) setMessages(newMessages)
    setLoading(true)

    try {
      const payload = silent
        ? [{ role: 'user', content: text }]
        : newMessages

      const res = await fetch('/api/trend-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: payload }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
      if (silent) setShowSuggestions(true)
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Could not load briefing right now.' }])
    }
    setLoading(false)
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const hasConversation = messages.some(m => m.role === 'user')

  return (
    <section style={{ padding: '48px 48px 80px', maxWidth: 860, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.35em', color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase' }}>
          ISSUE 05 · TECH PULSE
        </p>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(40px, 8vw, 72px)', color: 'var(--accent)', letterSpacing: '0.02em', lineHeight: 1 }}>
          AI & TECH TODAY
        </h2>
        <div style={{ width: '100%', height: 1, background: 'var(--border)', marginTop: 16, marginBottom: 12 }} />
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '0.2em', color: 'var(--text-faint)', textTransform: 'uppercase' }}>
          AI-curated daily · Sourced from HackerNews · Ask anything
        </p>
      </div>

      {/* Messages */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 32 }}>
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
                gap: 6,
              }}
            >
              {msg.role === 'assistant' && (
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.3em', color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 600 }}>
                  AI BRIEFING
                </span>
              )}
              <div style={{
                maxWidth: msg.role === 'user' ? '70%' : '100%',
                padding: msg.role === 'user' ? '10px 16px' : '20px 24px',
                background: msg.role === 'user' ? 'var(--surface)' : 'var(--bg-alt)',
                border: `1px solid ${msg.role === 'user' ? 'var(--border)' : 'var(--border)'}`,
                borderLeft: msg.role === 'assistant' ? '3px solid var(--accent)' : undefined,
              }}>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: msg.role === 'assistant' ? 14 : 13,
                  lineHeight: 1.7,
                  color: 'var(--text)',
                  whiteSpace: 'pre-wrap',
                }}>
                  {msg.content}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.3em', color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 600 }}>
              AI BRIEFING
            </span>
            <div style={{ padding: '16px 20px', background: 'var(--bg-alt)', border: '1px solid var(--border)', borderLeft: '3px solid var(--accent)', display: 'inline-block' }}>
              <TypingDots />
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      <AnimatePresence>
        {showSuggestions && !hasConversation && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}
          >
            {SUGGESTIONS.map(s => (
              <motion.button
                key={s}
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => sendMessage(s)}
                style={{
                  fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '0.1em',
                  color: 'var(--text-muted)', cursor: 'pointer', background: 'var(--bg-alt)',
                  border: '1px solid var(--border)', padding: '6px 14px', textTransform: 'uppercase',
                }}
              >
                {s}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'stretch' }}>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask about today's AI & tech news..."
          style={{
            flex: 1,
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            letterSpacing: '0.05em',
            padding: '12px 16px',
            background: 'var(--bg-alt)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
            outline: 'none',
          }}
        />
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || loading}
          style={{
            fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '0.2em',
            textTransform: 'uppercase', padding: '12px 20px',
            background: input.trim() && !loading ? 'var(--accent)' : 'var(--bg-alt)',
            color: input.trim() && !loading ? '#fff' : 'var(--text-faint)',
            border: '1px solid var(--border)', cursor: input.trim() && !loading ? 'pointer' : 'default',
            transition: 'background 0.2s, color 0.2s',
          }}
        >
          Send
        </motion.button>
      </div>

      {/* Reset */}
      {hasConversation && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => { setMessages([]); setShowSuggestions(false); sendMessage(INITIAL_PROMPT, true) }}
          style={{
            marginTop: 16, fontFamily: "'Inter', sans-serif", fontSize: 10,
            letterSpacing: '0.2em', color: 'var(--text-faint)', textTransform: 'uppercase',
            background: 'none', border: 'none', cursor: 'pointer',
          }}
        >
          ↺ Reset briefing
        </motion.button>
      )}
    </section>
  )
}
