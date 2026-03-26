import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TAG_COLORS = {
  LLM: '#E02020',
  ML: '#a78bfa',
  AI: '#60a5fa',
  Tech: '#4ade80',
}

const TAGS = ['All', 'LLM', 'ML', 'AI', 'Tech']

function timeAgo(unix) {
  const diff = Math.floor((Date.now() / 1000) - unix)
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

function FeaturedCard({ item }) {
  const [hovered, setHovered] = useState(false)
  const color = TAG_COLORS[item.tag] || 'var(--text-faint)'
  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -3 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        padding: '28px 32px',
        border: '1px solid var(--border)',
        borderTop: `3px solid ${color}`,
        background: hovered ? 'var(--surface)' : 'var(--bg-alt)',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'background 0.2s',
        marginBottom: 12,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '0.2em', color: 'var(--text-faint)', fontWeight: 600 }}>
            #01
          </span>
          <span style={{
            fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.25em',
            textTransform: 'uppercase', color: color, fontWeight: 700,
            border: `1px solid ${color}`, padding: '2px 8px',
          }}>
            {item.tag}
          </span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.2em', color: 'var(--text-faint)', textTransform: 'uppercase' }}>
            TOP STORY
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: 'var(--text-faint)' }}>
            {timeAgo(item.time)}
          </span>
          <motion.span
            animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.3 }}
            transition={{ duration: 0.2 }}
            style={{ color: 'var(--accent)', fontSize: 16 }}
          >
            →
          </motion.span>
        </div>
      </div>

      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 'clamp(16px, 2vw, 20px)',
        lineHeight: 1.4,
        color: hovered ? 'var(--accent)' : 'var(--text)',
        fontWeight: 600,
        transition: 'color 0.2s',
        maxWidth: '80%',
      }}>
        {item.title}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'var(--text-faint)', letterSpacing: '0.05em' }}>
          {item.domain}
        </span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.08em', fontWeight: 500 }}>
          ↑ {item.score.toLocaleString()}
        </span>
      </div>
    </motion.a>
  )
}

function TrendCard({ item, index }) {
  const [hovered, setHovered] = useState(false)
  const color = TAG_COLORS[item.tag] || 'var(--text-faint)'
  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      whileHover={{ y: -3 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        padding: '18px 20px',
        border: '1px solid var(--border)',
        borderLeft: `3px solid ${color}`,
        background: hovered ? 'var(--surface)' : 'var(--bg-alt)',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'background 0.2s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.15em', color: 'var(--text-dim)', fontWeight: 600 }}>
            #{String(index + 2).padStart(2, '0')}
          </span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color, fontWeight: 600 }}>
            {item.tag}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: 'var(--text-faint)' }}>
            {timeAgo(item.time)}
          </span>
          <motion.span
            animate={{ x: hovered ? 3 : 0, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.15 }}
            style={{ color: 'var(--accent)', fontSize: 13 }}
          >
            →
          </motion.span>
        </div>
      </div>

      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 13,
        lineHeight: 1.5,
        color: hovered ? 'var(--accent)' : 'var(--text)',
        fontWeight: 500,
        transition: 'color 0.2s',
        flexGrow: 1,
      }}>
        {item.title}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: 'var(--text-faint)', letterSpacing: '0.05em' }}>
          {item.domain}
        </span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: 'var(--text-faint)', letterSpacing: '0.08em' }}>
          ↑ {item.score.toLocaleString()}
        </span>
      </div>
    </motion.a>
  )
}

function SkeletonCard({ featured = false }) {
  return (
    <div style={{
      padding: featured ? '28px 32px' : '18px 20px',
      border: '1px solid var(--border)',
      borderLeft: featured ? undefined : '3px solid var(--border)',
      borderTop: featured ? '3px solid var(--border)' : undefined,
      background: 'var(--bg-alt)',
      display: 'flex', flexDirection: 'column', gap: 10,
      marginBottom: featured ? 12 : 0,
    }}>
      <div style={{ width: 80, height: 10, background: 'var(--surface)', borderRadius: 2 }} />
      <div style={{ width: '85%', height: featured ? 20 : 13, background: 'var(--surface)', borderRadius: 2 }} />
      {featured && <div style={{ width: '60%', height: 20, background: 'var(--surface)', borderRadius: 2 }} />}
      <div style={{ width: '40%', height: 10, background: 'var(--surface)', borderRadius: 2, marginTop: 4 }} />
    </div>
  )
}

export default function Trends() {
  const [trends, setTrends] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [activeTag, setActiveTag] = useState('All')

  useEffect(() => {
    fetch('/api/trends')
      .then(r => r.json())
      .then(data => { setTrends(data.trends || []); setLoading(false) })
      .catch(() => { setError(true); setLoading(false) })
  }, [])

  const tagCounts = { All: trends.length }
  for (const t of trends) tagCounts[t.tag] = (tagCounts[t.tag] || 0) + 1

  const filtered = activeTag === 'All' ? trends : trends.filter(t => t.tag === activeTag)
  const featured = filtered[0]
  const rest = filtered.slice(1)

  return (
    <section style={{ padding: '48px 48px 80px', maxWidth: 1200, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.35em', color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase' }}>
          ISSUE 05 · TECH PULSE
        </p>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(40px, 8vw, 72px)', color: 'var(--accent)', letterSpacing: '0.02em', lineHeight: 1 }}>
            AI & TECH TODAY
          </h2>
          {!loading && (
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '0.2em', color: 'var(--text-faint)', textTransform: 'uppercase', paddingBottom: 8 }}>
              {trends.length} stories · Updated daily 9 AM SGT
            </span>
          )}
        </div>
        <div style={{ width: '100%', height: 1, background: 'var(--border)', marginTop: 16, marginBottom: 20 }} />

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {TAGS.map(tag => {
            const active = activeTag === tag
            const count = tagCounts[tag] || 0
            return (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                style={{
                  fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '0.2em',
                  textTransform: 'uppercase', cursor: 'pointer', padding: '5px 12px',
                  border: `1px solid ${active ? (TAG_COLORS[tag] || 'var(--accent)') : 'var(--border)'}`,
                  background: active ? 'var(--surface)' : 'none',
                  color: active ? (TAG_COLORS[tag] || 'var(--accent)') : 'var(--text-faint)',
                  transition: 'all 0.2s',
                }}
              >
                {tag} {count > 0 && <span style={{ opacity: 0.6 }}>({count})</span>}
              </button>
            )
          })}
        </div>
      </div>

      {/* Content */}
      {error ? (
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-faint)', letterSpacing: '0.1em' }}>
          Could not load trends. Try again later.
        </p>
      ) : loading ? (
        <>
          <SkeletonCard featured />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
            {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </>
      ) : filtered.length === 0 ? (
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-faint)', letterSpacing: '0.1em' }}>
          No stories yet for this category.
        </p>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div key={activeTag} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            {featured && <FeaturedCard item={featured} />}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
              {rest.map((item, i) => <TrendCard key={item.id} item={item} index={i} />)}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </section>
  )
}
