import { useEffect, useRef, useState } from 'react'
import { LEFT_VIDEO, RIGHT_VIDEO } from '../lib/assets'

type VideoStageProps = {
  isTouch: boolean
}

export function VideoStage({ isTouch }: VideoStageProps) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLVideoElement>(null)
  const rightRef = useRef<HTMLVideoElement>(null)
  const mouseXRef = useRef(typeof window === 'undefined' ? 0 : window.innerWidth / 2)
  const activeSideRef = useRef<'left' | 'right'>('right')
  const rafRef = useRef(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const left = leftRef.current
    const right = rightRef.current
    if (!left || !right) return

    let loaded = 0
    const mark = () => {
      loaded += 1
      if (loaded >= 2) setReady(true)
    }

    const onLeft = () => mark()
    const onRight = () => mark()
    left.addEventListener('loadeddata', onLeft)
    right.addEventListener('loadeddata', onRight)
    left.addEventListener('error', onLeft)
    right.addEventListener('error', onRight)

    if (left.readyState >= 2) onLeft()
    if (right.readyState >= 2) onRight()

    return () => {
      left.removeEventListener('loadeddata', onLeft)
      right.removeEventListener('loadeddata', onRight)
      left.removeEventListener('error', onLeft)
      right.removeEventListener('error', onRight)
    }
  }, [])

  useEffect(() => {
    const left = leftRef.current
    const right = rightRef.current
    if (!left || !right) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (isTouch) {
      left.style.display = 'block'
      right.style.display = 'none'
      activeSideRef.current = 'left'

      if (reduced) {
        left.pause()
        right.pause()
        left.currentTime = 0
        return
      }

      const playLeft = () => {
        left.style.display = 'block'
        right.style.display = 'none'
        right.pause()
        void left.play()
      }
      const playRight = () => {
        right.style.display = 'block'
        left.style.display = 'none'
        left.pause()
        void right.play()
      }

      const onLeftEnded = () => playRight()
      const onRightEnded = () => playLeft()
      left.addEventListener('ended', onLeftEnded)
      right.addEventListener('ended', onRightEnded)
      playLeft()

      return () => {
        left.removeEventListener('ended', onLeftEnded)
        right.removeEventListener('ended', onRightEnded)
        left.pause()
        right.pause()
      }
    }

    left.pause()
    right.pause()
    left.style.display = 'none'
    right.style.display = 'block'
    activeSideRef.current = 'right'

    const onMove = (event: MouseEvent) => {
      mouseXRef.current = event.clientX
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    const seek = (video: HTMLVideoElement, time: number) => {
      if (!video.duration || video.seeking) return
      const next = Math.min(Math.max(time, 0), video.duration)
      if (Math.abs(video.currentTime - next) < 0.01) return
      video.currentTime = next
    }

    const tick = () => {
      const canvas = canvasRef.current
      const l = leftRef.current
      const r = rightRef.current
      if (!canvas || !l || !r) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }

      const width = canvas.clientWidth
      const center = width / 2
      const dead = Math.max(30, width * 0.05)
      const x = mouseXRef.current

      if (x < center - dead) {
        activeSideRef.current = 'right'
        r.style.display = 'block'
        l.style.display = 'none'
        const range = center - dead
        const progress = range > 0 ? (center - dead - x) / range : 0
        seek(r, progress * (r.duration || 0))
      } else if (x > center + dead) {
        activeSideRef.current = 'left'
        l.style.display = 'block'
        r.style.display = 'none'
        const range = width - (center + dead)
        const progress = range > 0 ? (x - (center + dead)) / range : 0
        seek(l, progress * (l.duration || 0))
      } else {
        const current = activeSideRef.current === 'left' ? l : r
        const other = activeSideRef.current === 'left' ? r : l
        current.style.display = 'block'
        other.style.display = 'none'
        seek(current, 0)
        seek(other, 0)
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [isTouch])

  return (
    <div
      id="main-canvas"
      ref={canvasRef}
      className="pointer-events-none fixed top-[220px] left-0 z-0 h-[calc(100vh-220px)] w-screen overflow-hidden lg:inset-0 lg:h-full lg:w-full"
      style={{
        opacity: ready ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    >
      <video
        ref={leftRef}
        src={LEFT_VIDEO}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        className="absolute inset-0 h-full w-full object-cover"
        style={{ display: 'none' }}
      />
      <video
        ref={rightRef}
        src={RIGHT_VIDEO}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        className="absolute inset-0 h-full w-full object-cover"
        style={{ display: 'block' }}
      />
    </div>
  )
}
