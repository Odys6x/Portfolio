import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const VIDEO_IDS = ['ye4jAQ0uxcQ', '86BOrA1Nn5o', 'SuKrrjnHfRU']

function MusicPlayer({ autoplay = false }) {
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const playerRef = useRef(null)
  const mountRef = useRef(null)
  const autoplayedRef = useRef(false)

  // Play once when user has entered and player is ready
  useEffect(() => {
    if (autoplay && ready && !autoplayedRef.current) {
      autoplayedRef.current = true
      playerRef.current.playVideo()
      setPlaying(true)
    }
  }, [autoplay, ready])

  useEffect(() => {
    const initPlayer = () => {
      playerRef.current = new window.YT.Player(mountRef.current, {
        videoId: VIDEO_IDS[0],
        playerVars: { autoplay: 0, controls: 0, loop: 1, playlist: VIDEO_IDS.join(','), modestbranding: 1 },
        events: {
          onReady: () => { setReady(true) },
        },
      })
    }

    if (window.YT && window.YT.Player) {
      initPlayer()
    } else {
      if (!document.getElementById('yt-api-script')) {
        const tag = document.createElement('script')
        tag.id = 'yt-api-script'
        tag.src = 'https://www.youtube.com/iframe_api'
        document.head.appendChild(tag)
      }
      window.onYouTubeIframeAPIReady = initPlayer
    }

    return () => { if (playerRef.current?.destroy) playerRef.current.destroy() }
  }, [])

  const toggle = () => {
    if (!ready) return
    if (playing) { playerRef.current.pauseVideo() } else { playerRef.current.playVideo() }
    setPlaying(p => !p)
  }

  return (
    <div style={{ position: 'fixed', top: 0, right: 16, height: 48, display: 'flex', alignItems: 'center', zIndex: 100 }}>
      {/* Hidden YouTube mount */}
      <div style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', opacity: 0, pointerEvents: 'none' }}>
        <div ref={mountRef} />
      </div>

      {/* Round button */}
      <motion.button
        onClick={toggle}
        whileTap={{ scale: 0.9 }}
        title={playing ? 'Pause music' : 'Play music'}
        style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          cursor: ready ? 'pointer' : 'default',
          opacity: ready ? 1 : 0.4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
        }}
      >
        <motion.svg
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          animate={playing ? { scale: [1, 1.3, 1] } : { scale: 1 }}
          transition={playing ? { repeat: Infinity, duration: 1.2, ease: 'easeInOut' } : {}}
        >
          <path d="M9 18V5l12-2v13M9 18c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-2c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" stroke={playing ? 'var(--accent)' : '#555'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </motion.svg>
      </motion.button>
    </div>
  )
}

export default MusicPlayer
