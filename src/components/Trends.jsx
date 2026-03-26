import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TAG_COLORS = { LLM: '#E02020', ML: '#a78bfa', AI: '#60a5fa', Tech: '#4ade80' }
const TAGS = ['All', 'LLM', 'ML', 'AI', 'Tech']
const SUGGESTIONS = [
  "What's the biggest story today?",
  "What's happening with LLMs?",
  "Any interesting open source releases?",
  "What should developers pay attention to?",
]
const INITIAL_PROMPT = "Give me a sharp briefing on today's top AI and tech trends. What are the 2–3 key themes worth paying attention to?"

function timeAgo(unix) {
  const diff = Math.floor((Date.now() / 1000) - unix)
  if (diff < 3600) return `${Math.floor(diff / 60)}m`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`
  return `${Math.floor(diff / 86400)}d`
}

function TagPill({ tag }) {
  const color = TAG_COLORS[tag] || 'var(--text-faint)'
  return (
    <span style={{
      fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.22em',
      textTransform: 'uppercase', fontWeight: 700, color,
      background: color + '18', border: `1px solid ${color}35`, padding: '2px 7px',
    }}>
      {tag}
    </span>
  )
}

function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
      {[0, 0.18, 0.36].map((delay, i) => (
        <motion.div key={i}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 1, delay, ease: 'easeInOut' }}
          style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)' }}
        />
      ))}
    </div>
  )
}

// ── Left panel: story list ──
function StoryPanel({ trends, loading, activeTag, setActiveTag, onAskAbout }) {
  const tagCounts = { All: trends.length }
  for (const t of trends) tagCounts[t.tag] = (tagCounts[t.tag] || 0) + 1
  const filtered = activeTag === 'All' ? trends : trends.filter(t => t.tag === activeTag)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRight: '1px solid var(--border)' }}>

      {/* Filter tabs */}
      <div style={{ flexShrink: 0, padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {TAGS.map(tag => {
          const active = activeTag === tag
          const color = TAG_COLORS[tag]
          return (
            <button key={tag} onClick={() => setActiveTag(tag)} style={{
              fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.18em',
              textTransform: 'uppercase', cursor: 'pointer', padding: '4px 10px',
              border: `1px solid ${active ? (color || 'var(--accent)') : 'var(--border)'}`,
              background: active ? (color ? color + '18' : 'var(--surface)') : 'none',
              color: active ? (color || 'var(--accent)') : 'var(--text-faint)',
              fontWeight: active ? 600 : 400, transition: 'all 0.2s',
            }}>
              {tag}{tagCounts[tag] ? ` (${tagCounts[tag]})` : ''}
            </button>
          )
        })}
      </div>

      {/* Story list */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ width: 60, height: 10, background: 'var(--surface)', borderRadius: 2 }} />
                <div style={{ width: '85%', height: 12, background: 'var(--surface)', borderRadius: 2 }} />
                <div style={{ width: '40%', height: 10, background: 'var(--surface)', borderRadius: 2 }} />
              </div>
            ))
          : filtered.map((item, i) => (
              <StoryRow key={item.id} item={item} index={i} onAskAbout={onAskAbout} />
            ))
        }
      </div>
    </div>
  )
}

function StoryRow({ item, index, onAskAbout }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.button
      whileTap={{ scale: 0.99 }}
      onClick={() => onAskAbout(item)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', flexDirection: 'column', gap: 7,
        padding: '16px 20px', borderBottom: '1px solid var(--border)',
        background: hovered ? 'var(--surface)' : 'transparent',
        cursor: 'pointer', textAlign: 'left', width: '100%',
        border: 'none', borderBottom: '1px solid var(--border)',
        transition: 'background 0.15s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.15em', color: 'var(--text-dim)', fontWeight: 600 }}>
          #{String(index + 1).padStart(2, '0')}
        </span>
        <TagPill tag={item.tag} />
        <span style={{ marginLeft: 'auto', fontFamily: "'Inter', sans-serif", fontSize: 10, color: 'var(--text-faint)' }}>
          {timeAgo(item.time)}
        </span>
      </div>
      <p style={{
        fontFamily: "'Inter', sans-serif", fontSize: 12, lineHeight: 1.45, fontWeight: 500,
        color: hovered ? 'var(--accent)' : 'var(--text)', transition: 'color 0.15s',
      }}>
        {item.title}
      </p>
      <div style={{ display: 'flex', gap: 12 }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: 'var(--text-faint)' }}>{item.domain}</span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: 'var(--text-faint)' }}>↑ {item.score.toLocaleString()}</span>
      </div>
    </motion.button>
  )
}

// ── Right panel: AI chat ──
function ChatPanel({ onReady }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => { sendMessage(INITIAL_PROMPT, true) }, [])
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, loading])

  async function sendMessage(text, silent = false) {
    if (!text?.trim() || loading) return
    setInput('')
    setShowSuggestions(false)

    const userMsg = { role: 'user', content: text }
    const newMessages = silent ? messages : [...messages, userMsg]
    if (!silent) setMessages(newMessages)
    setLoading(true)

    try {
      const res = await fetch('/api/trend-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: silent ? [userMsg] : newMessages }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
      if (silent) { setShowSuggestions(true); onReady?.() }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Could not load briefing right now.' }])
    }
    setLoading(false)
  }

  // Expose sendMessage for parent (clicking a story)
  useEffect(() => { onReady?.(sendMessage) }, [])

  const hasConversation = messages.some(m => m.role === 'user')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* Panel label */}
      <div style={{ flexShrink: 0, padding: '16px 24px', borderBottom: '1px solid var(--border)' }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.3em', color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 600 }}>
          AI Analyst · Ask anything about today's trends
        </span>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start', gap: 5 }}
            >
              {msg.role === 'assistant' && (
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.28em', color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 600 }}>
                  Briefing
                </span>
              )}
              <div style={{
                maxWidth: msg.role === 'user' ? '75%' : '100%',
                padding: msg.role === 'user' ? '9px 14px' : '18px 20px',
                background: msg.role === 'user' ? 'var(--surface)' : 'var(--bg-alt)',
                border: '1px solid var(--border)',
                borderLeft: msg.role === 'assistant' ? '2px solid var(--accent)' : undefined,
              }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, lineHeight: 1.7, color: 'var(--text)', whiteSpace: 'pre-wrap' }}>
                  {msg.content}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.28em', color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 600 }}>Briefing</span>
            <div style={{ padding: '14px 18px', background: 'var(--bg-alt)', border: '1px solid var(--border)', borderLeft: '2px solid var(--accent)', display: 'inline-block' }}>
              <TypingDots />
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      <AnimatePresence>
        {showSuggestions && !hasConversation && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ flexShrink: 0, padding: '0 24px 12px', display: 'flex', flexWrap: 'wrap', gap: 6 }}
          >
            {SUGGESTIONS.map(s => (
              <motion.button key={s} whileHover={{ x: 2 }} whileTap={{ scale: 0.97 }}
                onClick={() => sendMessage(s)}
                style={{
                  fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '0.08em',
                  color: 'var(--text-muted)', cursor: 'pointer', background: 'var(--bg-alt)',
                  border: '1px solid var(--border)', padding: '5px 12px',
                }}
              >
                {s}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input */}
      <div style={{ flexShrink: 0, padding: '12px 24px', borderTop: '1px solid var(--border)', display: 'flex', gap: 8 }}>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input) } }}
          placeholder="Ask about today's AI & tech news..."
          style={{
            flex: 1, fontFamily: "'Inter', sans-serif", fontSize: 12, letterSpacing: '0.04em',
            padding: '10px 14px', background: 'var(--bg-alt)', border: '1px solid var(--border)',
            color: 'var(--text)', outline: 'none',
          }}
        />
        <motion.button whileTap={{ scale: 0.96 }} onClick={() => sendMessage(input)}
          disabled={!input.trim() || loading}
          style={{
            fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '0.2em',
            textTransform: 'uppercase', padding: '10px 18px',
            background: input.trim() && !loading ? 'var(--accent)' : 'var(--bg-alt)',
            color: input.trim() && !loading ? '#fff' : 'var(--text-faint)',
            border: '1px solid var(--border)', cursor: input.trim() && !loading ? 'pointer' : 'default',
            transition: 'background 0.2s, color 0.2s',
          }}
        >
          Send
        </motion.button>
      </div>

      {hasConversation && (
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          onClick={() => { setMessages([]); setShowSuggestions(false); sendMessage(INITIAL_PROMPT, true) }}
          style={{
            flexShrink: 0, margin: '0 24px 12px', fontFamily: "'Inter', sans-serif", fontSize: 10,
            letterSpacing: '0.2em', color: 'var(--text-faint)', textTransform: 'uppercase',
            background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
          }}
        >
          ↺ Reset
        </motion.button>
      )}
    </div>
  )
}

// ── Main section ──
export default function Trends() {
  const [trends, setTrends] = useState([])
  const [trendsLoading, setTrendsLoading] = useState(true)
  const [activeTag, setActiveTag] = useState('All')
  const chatSendRef = useRef(null)

  useEffect(() => {
    fetch('/api/trends')
      .then(r => r.json())
      .then(data => { setTrends(data.trends || []); setTrendsLoading(false) })
      .catch(() => setTrendsLoading(false))
  }, [])

  function handleAskAbout(item) {
    chatSendRef.current?.(`Tell me more about this story: "${item.title}" from ${item.domain}`)
  }

  return (
    <section style={{ height: 'calc(100vh - 48px)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ flexShrink: 0, padding: '32px 48px 20px' }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.35em', color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase' }}>
          ISSUE 05 · TECH PULSE
        </p>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(36px, 6vw, 60px)', color: 'var(--accent)', letterSpacing: '0.02em', lineHeight: 1 }}>
            AI & TECH TODAY
          </h2>
          {!trendsLoading && (
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '0.18em', color: 'var(--text-faint)', textTransform: 'uppercase', paddingBottom: 4 }}>
              {trends.length} stories · 9 AM SGT daily
            </span>
          )}
        </div>
      </div>

      {/* Two panels */}
      <div className="trends-panels">
        <StoryPanel
          trends={trends}
          loading={trendsLoading}
          activeTag={activeTag}
          setActiveTag={setActiveTag}
          onAskAbout={handleAskAbout}
        />
        <ChatPanel
          onReady={(fn) => { if (fn) chatSendRef.current = fn }}
        />
      </div>
    </section>
  )
}
