import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const TAG_COLORS = {
  LLM: '#E02020',
  ML: '#a78bfa',
  AI: '#60a5fa',
  Tech: '#4ade80',
}

function timeAgo(unix) {
  const diff = Math.floor((Date.now() / 1000) - unix)
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

function TrendCard({ item, index }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        padding: '18px 20px',
        border: '1px solid var(--border)',
        background: hovered ? 'var(--surface)' : 'var(--bg-alt)',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'background 0.2s',
      }}
    >
      {/* Top row: tag + time */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 9,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: TAG_COLORS[item.tag] || 'var(--text-faint)',
          fontWeight: 600,
        }}>
          {item.tag}
        </span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: 'var(--text-faint)', letterSpacing: '0.05em' }}>
          {timeAgo(item.time)}
        </span>
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

      {/* Bottom row: domain + score */}
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

function SkeletonCard() {
  return (
    <div style={{
      padding: '18px 20px',
      border: '1px solid var(--border)',
      background: 'var(--bg-alt)',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    }}>
      <div style={{ width: 32, height: 10, background: 'var(--border)', borderRadius: 2 }} className="animate-pulse" />
      <div style={{ width: '90%', height: 13, background: 'var(--border)', borderRadius: 2 }} className="animate-pulse" />
      <div style={{ width: '70%', height: 13, background: 'var(--border)', borderRadius: 2 }} className="animate-pulse" />
      <div style={{ width: '40%', height: 10, background: 'var(--border)', borderRadius: 2, marginTop: 4 }} className="animate-pulse" />
    </div>
  )
}

export default function Trends() {
  const [trends, setTrends] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('/api/trends')
      .then(r => r.json())
      .then(data => {
        setTrends(data.trends || [])
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  return (
    <section style={{ padding: '48px 48px 80px', maxWidth: 1200, margin: '0 auto' }}>
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
          Curated daily · 9 AM SGT · Sourced from HackerNews
        </p>
      </div>

      {/* Grid */}
      {error ? (
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-faint)', letterSpacing: '0.1em' }}>
          Could not load trends. Try again later.
        </p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 12,
        }}>
          {loading
            ? Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)
            : trends.length === 0
              ? (
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-faint)', letterSpacing: '0.1em', gridColumn: '1/-1' }}>
                  No stories yet — check back after 9 AM SGT.
                </p>
              )
              : trends.map((item, i) => <TrendCard key={item.id} item={item} index={i} />)
          }
        </div>
      )}
    </section>
  )
}
