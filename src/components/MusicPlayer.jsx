import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const VIDEO_ID = 'pFjWIHYzYDk'

function MusicPlayer() {
  const [playing, setPlaying] = useState(true)
  const [ready, setReady] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const playerRef = useRef(null)
  const mountRef = useRef(null)

  useEffect(() => {
    const initPlayer = () => {
      playerRef.current = new window.YT.Player(mountRef.current, {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          loop: 1,
          playlist: VIDEO_ID,
          modestbranding: 1,
        },
        events: {
          onReady: (e) => {
            setReady(true)
            e.target.playVideo()
          },
        },
      })
    }

    if (window.YT && window.YT.Player) {
      initPlayer()
    } else {
      // Load the API script if not already present
      if (!document.getElementById('yt-api-script')) {
        const tag = document.createElement('script')
        tag.id = 'yt-api-script'
        tag.src = 'https://www.youtube.com/iframe_api'
        document.head.appendChild(tag)
      }
      window.onYouTubeIframeAPIReady = initPlayer
    }

    return () => {
      if (playerRef.current?.destroy) {
        playerRef.current.destroy()
      }
    }
  }, [])

  const toggle = () => {
    if (!ready) return
    if (playing) {
      playerRef.current.pauseVideo()
    } else {
      playerRef.current.playVideo()
    }
    setPlaying(p => !p)
  }

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col items-center gap-2">

      {/* Hidden YouTube iframe mount point */}
      <div
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          overflow: 'hidden',
          opacity: 0,
          pointerEvents: 'none',
          top: 0,
          left: 0,
        }}
      >
        <div ref={mountRef} />
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-12 right-0 whitespace-nowrap text-[10px] tracking-widest text-[#7bc4c4] px-3 py-1.5 rounded-full pointer-events-none"
            style={{
              background: 'rgba(250,247,242,0.95)',
              border: '1px solid rgba(123,196,196,0.25)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {playing ? 'BGM — 停止' : 'BGM — 再生'}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.button
        onClick={toggle}
        onHoverStart={() => setShowTooltip(true)}
        onHoverEnd={() => setShowTooltip(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        className="relative w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
        style={{
          background: playing
            ? 'linear-gradient(135deg, rgba(45,90,107,0.12), rgba(123,196,196,0.18))'
            : 'rgba(250,247,242,0.9)',
          border: `1px solid ${playing ? 'rgba(123,196,196,0.5)' : 'rgba(123,196,196,0.25)'}`,
          backdropFilter: 'blur(12px)',
          boxShadow: playing
            ? '0 0 16px rgba(123,196,196,0.25)'
            : '0 2px 8px rgba(0,0,0,0.06)',
        }}
        title={playing ? 'Pause' : 'Play BGM'}
      >
        {/* Ripple when playing */}
        {playing && (
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeOut' }}
            style={{ border: '1px solid rgba(123,196,196,0.6)' }}
          />
        )}

        {/* Icon: animated bars or note */}
        {playing ? (
          <div className="flex items-end gap-[3px] h-4">
            {[0.1, 0.3, 0].map((delay, i) => (
              <motion.div
                key={i}
                animate={{ scaleY: [0.4, 1, 0.4] }}
                transition={{
                  repeat: Infinity,
                  duration: 0.9,
                  delay,
                  ease: 'easeInOut',
                }}
                className="w-[3px] rounded-full origin-bottom"
                style={{
                  height: 14,
                  background: 'linear-gradient(to top, #2d5a6b, #7bc4c4)',
                }}
              />
            ))}
          </div>
        ) : (
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-[#7bc4c4] text-base select-none"
            style={{ lineHeight: 1 }}
          >
            ♪
          </motion.span>
        )}
      </motion.button>
    </div>
  )
}

export default MusicPlayer