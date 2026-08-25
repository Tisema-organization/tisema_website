import { useEffect, useRef, useState, type RefObject } from 'react'
import { motion } from 'motion/react'
import { EASE_OUT, HERO_VIDEO, LOGO_LOCKUP } from '../lib/assets'

type HeroVideoProps = {
  videoRef: RefObject<HTMLVideoElement | null>
}

export function HeroVideo({ videoRef }: HeroVideoProps) {
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const localRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = localRef.current
    if (!video) return

    const markReady = () => setReady(true)
    const markFail = () => setFailed(true)

    video.addEventListener('loadeddata', markReady)
    video.addEventListener('error', markFail)
    if (video.readyState >= 2) markReady()

    return () => {
      video.removeEventListener('loadeddata', markReady)
      video.removeEventListener('error', markFail)
    }
  }, [])

  return (
    <motion.div
      id="main-canvas"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-paper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
    >
      {!failed ? (
        <video
          ref={(node) => {
            localRef.current = node
            videoRef.current = node
          }}
          src={HERO_VIDEO}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: ready ? 1 : 0,
            transition: 'opacity 0.35s ease',
          }}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center px-6">
          <img
            src={LOGO_LOCKUP}
            alt="Tisema — handprint mark, let her be heard"
            className="h-auto w-[min(78vw,460px)] max-h-[72vh] object-contain"
            draggable={false}
          />
        </div>
      )}
    </motion.div>
  )
}
