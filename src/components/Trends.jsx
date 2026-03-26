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
  if (diff < 3600) return `${Math.floor(diff / 60)}m`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`
  return `${Math.floor(diff / 86400)}d`
}

function TagPill({ tag, size = 'sm' }) {
  const color = TAG_COLORS[tag] || 'var(--text-faint)'
  return (
    <span style={{
      fontFamily: "'Inter', sans-serif",
      fontSize: size === 'lg' ? 10 : 9,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      fontWeight: 700,
      color,
      background: color + '18',
      border: `1px solid ${color}35`,
      padding: size === 'lg' ? '3px 10px' : '2px 8px',
    }}>
      {tag}
    </span>
  )
}

function FeaturedCard({ item }) {
  const [hovered, setHovered] = useState(false)
  const color = TAG_COLORS[item.tag] || 'var(--text-faint)'

  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        padding: '32px 36px',
        border: `1px solid ${hovered ? color + '50' : 'var(--border)'}`,
        borderTop: `3px solid ${color}`,
        background: hovered ? 'var(--surface)' : 'var(--bg-alt)',
        textDecoration: 'none',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.25s, border-color 0.25s',
        marginBottom: 12,
      }}
    >
      {/* Watermark rank */}
      <span style={{
        position: 'absolute', right: 28, top: 8,
        fontFamily: "'Bebas Neue', sans-serif", fontSize: 110,
        color: 'var(--border)', lineHeight: 1,
        pointerEvents: 'none', userSelect: 'none',
        transition: 'color 0.25s',
      }}>
        01
      </span>

      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <TagPill tag={item.tag} size="lg" />
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.25em', color: 'var(--text-faint)', textTransform: 'uppercase' }}>
          Top Story
        </span>
      </div>

      {/* Title */}
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 'clamp(17px, 2.2vw, 22px)',
        lineHeight: 1.35,
        color: hovered ? 'var(--accent)' : 'var(--text)',
        fontWeight: 600,
        maxWidth: '75%',
        transition: 'color 0.2s',
      }}>
        {item.title}
      </p>

      {/* AI summary */}
      {item.summary && (
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 12,
          lineHeight: 1.6,
          color: 'var(--text-faint)',
          fontStyle: 'italic',
          maxWidth: '65%',
        }}>
          {item.summary}
        </p>
      )}

      {/* Bottom row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'var(--text-faint)', letterSpacing: '0.05em' }}>
            {item.domain}
          </span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'var(--text-muted)', fontWeight: 500 }}>
            ↑ {item.score.toLocaleString()}
          </span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: 'var(--text-faint)' }}>
            {timeAgo(item.time)} ago
          </span>
        </div>
        <motion.span
          animate={{ x: hovered ? 5 : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ color: 'var(--accent)', fontSize: 18, fontWeight: 300 }}
        >
          →
        </motion.span>
      </div>
    </motion.a>
  )
}

function TrendCard({ item, index }) {
  const [hovered, setHovered] = useState(false)
  const color = TAG_COLORS[item.tag] || 'var(--text-faint)'
  const rank = String(index + 2).padStart(2, '0')

  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.035, duration: 0.4 }}
      whileHover={{ y: -4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        padding: '20px 22px',
        border: `1px solid ${hovered ? color + '50' : 'var(--border)'}`,
        background: hovered ? 'var(--surface)' : 'var(--bg-alt)',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'background 0.2s, border-color 0.2s',
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.15em', color: 'var(--text-dim)', fontWeight: 600 }}>
            #{rank}
          </span>
          <TagPill tag={item.tag} />
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

      {/* Title */}
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 13,
        lineHeight: 1.5,
        color: hovered ? 'var(--accent)' : 'var(--text)',
        fontWeight: 500,
        transition: 'color 0.2s',
      }}>
        {item.title}
      </p>

      {/* AI summary */}
      {item.summary && (
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 11,
          lineHeight: 1.55,
          color: 'var(--text-faint)',
          fontStyle: 'italic',
        }}>
          {item.summary}
        </p>
      )}

      {/* Bottom row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: 'var(--text-faint)', letterSpacing: '0.04em' }}>
          {item.domain}
        </span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: 'var(--text-faint)' }}>
          ↑ {item.score.toLocaleString()}
        </span>
      </div>
    </motion.a>
  )
}

function SkeletonCard({ featured = false }) {
  return (
    <div style={{
      padding: featured ? '32px 36px' : '20px 22px',
      border: '1px solid var(--border)',
      borderTop: featured ? '3px solid var(--border)' : undefined,
      background: 'var(--bg-alt)',
      display: 'flex', flexDirection: 'column', gap: 10,
      marginBottom: featured ? 12 : 0,
    }}>
      <div style={{ width: 52, height: 18, background: 'var(--surface)', borderRadius: 2 }} />
      <div style={{ width: '80%', height: featured ? 22 : 13, background: 'var(--surface)', borderRadius: 2 }} />
      {featured && <div style={{ width: '55%', height: 22, background: 'var(--surface)', borderRadius: 2 }} />}
      <div style={{ width: '65%', height: 11, background: 'var(--surface)', borderRadius: 2 }} />
      <div style={{ width: '35%', height: 10, background: 'var(--surface)', borderRadius: 2, marginTop: 4 }} />
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
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.35em', color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase' }}>
          ISSUE 05 · TECH PULSE
        </p>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(40px, 8vw, 72px)', color: 'var(--accent)', letterSpacing: '0.02em', lineHeight: 1 }}>
            AI & TECH TODAY
          </h2>
          {!loading && (
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '0.18em', color: 'var(--text-faint)', textTransform: 'uppercase', paddingBottom: 10 }}>
              {trends.length} stories · 9 AM SGT daily
            </span>
          )}
        </div>
        <div style={{ width: '100%', height: 1, background: 'var(--border)', marginTop: 16, marginBottom: 20 }} />

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {TAGS.map(tag => {
            const active = activeTag === tag
            const color = TAG_COLORS[tag]
            const count = tagCounts[tag] || 0
            return (
              <motion.button
                key={tag}
                onClick={() => setActiveTag(tag)}
                whileTap={{ scale: 0.96 }}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 10,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  padding: '5px 14px',
                  border: `1px solid ${active ? (color || 'var(--accent)') : 'var(--border)'}`,
                  background: active ? (color ? color + '18' : 'var(--surface)') : 'none',
                  color: active ? (color || 'var(--accent)') : 'var(--text-faint)',
                  transition: 'all 0.2s',
                  fontWeight: active ? 600 : 400,
                }}
              >
                {tag}{count > 0 ? ` (${count})` : ''}
              </motion.button>
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
          No stories for this category yet.
        </p>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTag}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
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
