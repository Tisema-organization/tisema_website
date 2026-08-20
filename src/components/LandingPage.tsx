import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
import { VIDEO_SCROLL_VH } from '../lib/assets'
import { getColumnCount } from '../lib/layout'
import { CustomCursor } from './CustomCursor'
import { GalleryPanel } from './GalleryPanel'
import { HeroVideo } from './HeroVideo'
import {
  CampaignInfo,
  Caption,
  CornerFrame,
  HeaderNav,
  LimeOverlay,
  OutroFooter,
  PetitionButton,
  SiteTitle,
} from './Overlays'

gsap.registerPlugin(ScrollTrigger)

function isCoarsePointer() {
  return window.matchMedia('(pointer: coarse)').matches
}

export function LandingPage() {
  const spacerRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const maxScrollRef = useRef(0)
  const videoScrollRef = useRef(0)
  const [cols, setCols] = useState(() => getColumnCount(window.innerWidth))
  const [customCursor, setCustomCursor] = useState(
    () => window.innerWidth >= 1024 && !isCoarsePointer(),
  )

  useEffect(() => {
    const sync = () => {
      const touch = isCoarsePointer()
      setCols(getColumnCount(window.innerWidth))
      setCustomCursor(window.innerWidth >= 1024 && !touch)

      const info = document.getElementById('outro-info')
      if (info) {
        info.dataset.outroOffset = window.innerWidth >= 1024 ? '160' : '120'
      }
    }

    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [])

  useGSAP(
    () => {
      const spacer = spacerRef.current
      const panel = panelRef.current
      const wrap = wrapRef.current
      if (!spacer || !panel || !wrap) return

      const applySize = () => {
        const vh = window.innerHeight
        const videoScroll = vh * VIDEO_SCROLL_VH
        const maxScroll = Math.max(0, wrap.offsetHeight - vh)
        videoScrollRef.current = videoScroll
        maxScrollRef.current = maxScroll
        // video scrub + panel slide + gallery + outro
        spacer.style.height = `${videoScroll + vh + maxScroll + 2 * vh}px`
      }

      applySize()

      gsap.fromTo(
        panel,
        { y: () => window.innerHeight },
        {
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: spacer,
            start: () => `top+=${window.innerHeight * VIDEO_SCROLL_VH} top`,
            end: () =>
              `top+=${window.innerHeight * VIDEO_SCROLL_VH + window.innerHeight} top`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      )

      const onResize = () => {
        applySize()
        ScrollTrigger.refresh()
      }

      const observer = new ResizeObserver(onResize)
      observer.observe(wrap)
      window.addEventListener('resize', onResize)

      return () => {
        observer.disconnect()
        window.removeEventListener('resize', onResize)
      }
    },
    { scope: spacerRef, dependencies: [cols] },
  )

  useEffect(() => {
    let frame = 0
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const seekVideo = (video: HTMLVideoElement, time: number) => {
      if (!video.duration || video.seeking) return
      const next = Math.min(Math.max(time, 0), video.duration)
      if (Math.abs(video.currentTime - next) < 0.02) return
      video.currentTime = next
    }

    const tick = () => {
      const y = window.scrollY
      const vh = window.innerHeight
      const videoScroll = videoScrollRef.current || vh * VIDEO_SCROLL_VH
      const maxScroll = maxScrollRef.current
      const galleryStart = videoScroll
      const galleryPinned = videoScroll + vh
      const wrap = wrapRef.current
      const canvas = document.getElementById('main-canvas')
      const overlay = document.getElementById('outro-overlay')
      const info = document.getElementById('outro-info')
      const buy = document.getElementById('outro-buy')
      const footer = document.getElementById('outro-footer')
      const video = videoRef.current

      // Scroll-scrub the hero video across the first segment
      if (video && video.duration) {
        if (reduced) {
          seekVideo(video, 0)
        } else {
          const progress = Math.min(1, Math.max(0, y / Math.max(1, videoScroll)))
          seekVideo(video, progress * video.duration)
        }
      }

      // Gallery inner scroll only after the panel has finished sliding up
      if (wrap) {
        if (y <= galleryPinned) {
          wrap.style.transform = 'translateY(0px)'
        } else {
          const phase2 = Math.min(y - galleryPinned, maxScroll)
          wrap.style.transform = `translateY(${-phase2}px)`
        }
      }

      const cells = document.querySelectorAll<HTMLElement>('.bp-cell')
      for (const cell of cells) {
        const card = cell.firstElementChild as HTMLElement | null
        if (!card) continue
        const rect = cell.getBoundingClientRect()
        if (rect.bottom <= 0 || rect.top >= vh) {
          card.style.transform = 'scale(0)'
          continue
        }
        const enter = Math.min(1, (vh - rect.top) / (vh * 0.6))
        const exit = Math.min(1, rect.bottom / (vh * 0.4))
        const scale = Math.min(enter, exit)
        card.style.transform = `scale(${Math.max(0, scale)})`
      }

      if (canvas) {
        // Hold full opacity through video scrub; fade as the panel arrives
        if (y <= galleryStart) {
          canvas.style.opacity = '1'
          canvas.style.visibility = 'visible'
        } else {
          const fade = Math.max(0, 1 - (y - galleryStart) / (vh * 0.85))
          canvas.style.opacity = String(fade)
          canvas.style.visibility = y >= galleryPinned ? 'hidden' : 'visible'
        }
      }

      document.documentElement.dataset.phase =
        y > galleryStart + vh * 0.55 ? 'gallery' : 'hero'

      const outroStart = galleryPinned + maxScroll
      const progress =
        y > outroStart ? Math.min(1, (y - outroStart) / Math.max(1, vh - 100)) : 0

      if (overlay) overlay.style.opacity = String(progress)
      if (footer) footer.style.opacity = String(progress)
      if (buy) buy.style.transform = `scale(${progress})`

      const offset = info ? Number(info.dataset.outroOffset || 160) : 160
      if (info) info.style.transform = `translateY(${-progress * offset}px)`

      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div
      id="scroll-spacer"
      ref={spacerRef}
      className={`relative overflow-x-hidden bg-lime select-none ${customCursor ? 'cursor-none' : ''}`}
      style={{ height: '500vh' }}
    >
      <CornerFrame />
      <CustomCursor enabled={customCursor} />
      <SiteTitle />
      <Caption />
      <HeaderNav />
      <CampaignInfo />
      <PetitionButton />
      <LimeOverlay />
      <OutroFooter />
      <HeroVideo videoRef={videoRef} />
      <GalleryPanel cols={cols} panelRef={panelRef} wrapRef={wrapRef} />
    </div>
  )
}
