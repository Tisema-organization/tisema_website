import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
import { CIRCLE_SYMBOLS } from '../lib/assets'
import { getColumnCount } from '../lib/layout'
import { CustomCursor } from './CustomCursor'
import { GalleryPanel } from './GalleryPanel'
import {
  Caption,
  HeaderNav,
  Logo,
  OutroFooter,
  ProductInfo,
  ViewButton,
  WhiteOverlay,
} from './Overlays'
import { VideoStage } from './VideoStage'

gsap.registerPlugin(ScrollTrigger)

function isCoarsePointer() {
  return window.matchMedia('(pointer: coarse)').matches
}

export function LandingPage() {
  const spacerRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const maxScrollRef = useRef(0)
  const [cols, setCols] = useState(() => getColumnCount(window.innerWidth))
  const [isTouch, setIsTouch] = useState(() => isCoarsePointer())
  const [customCursor, setCustomCursor] = useState(
    () => window.innerWidth >= 1024 && !isCoarsePointer(),
  )

  useEffect(() => {
    const sync = () => {
      const touch = isCoarsePointer()
      setIsTouch(touch)
      setCols(getColumnCount(window.innerWidth))
      setCustomCursor(window.innerWidth >= 1024 && !touch)

      const info = document.getElementById('outro-info')
      if (info) {
        info.dataset.outroOffset = window.innerWidth >= 1024 ? '166' : '132'
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
        const maxScroll = Math.max(0, wrap.offsetHeight - vh)
        maxScrollRef.current = maxScroll
        spacer.style.height = `${vh + maxScroll + 2 * vh}px`
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
            start: 'top top',
            end: () => `+=${window.innerHeight}`,
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
    let lastSymbol = 0
    let lastY = window.scrollY
    let frame = 0

    const tick = () => {
      const y = window.scrollY
      const vh = window.innerHeight
      const maxScroll = maxScrollRef.current
      const wrap = wrapRef.current
      const canvas = document.getElementById('main-canvas')
      const overlay = document.getElementById('outro-overlay')
      const info = document.getElementById('outro-info')
      const buy = document.getElementById('outro-buy')
      const footer = document.getElementById('outro-footer')
      const symbol = document.getElementById('circle-symbol')

      if (wrap) {
        if (y <= vh) {
          wrap.style.transform = 'translateY(0px)'
        } else {
          const phase2 = Math.min(y - vh, maxScroll)
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
        canvas.style.visibility = y >= vh ? 'hidden' : 'visible'
      }

      const outroStart = vh + maxScroll
      const progress =
        y > outroStart ? Math.min(1, (y - outroStart) / Math.max(1, vh - 100)) : 0

      if (overlay) overlay.style.opacity = String(progress)
      if (footer) footer.style.opacity = String(progress)
      if (buy) buy.style.transform = `scale(${progress})`

      const offset = info ? Number(info.dataset.outroOffset || 166) : 166
      if (info) info.style.transform = `translateY(${-progress * offset}px)`

      if (symbol && y !== lastY) {
        const now = performance.now()
        if (now - lastSymbol > 80) {
          lastSymbol = now
          const next = CIRCLE_SYMBOLS[Math.floor(Math.random() * CIRCLE_SYMBOLS.length)]
          symbol.textContent = next
        }
      }
      lastY = y

      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div
      id="scroll-spacer"
      ref={spacerRef}
      className={`relative overflow-x-hidden bg-white select-none ${customCursor ? 'cursor-none' : ''}`}
      style={{ height: '500vh' }}
    >
      <CustomCursor enabled={customCursor} />
      <Logo />
      <Caption />
      <HeaderNav />
      <ProductInfo />
      <ViewButton />
      <WhiteOverlay />
      <OutroFooter />
      <VideoStage isTouch={isTouch} />
      <GalleryPanel cols={cols} panelRef={panelRef} wrapRef={wrapRef} />
    </div>
  )
}
