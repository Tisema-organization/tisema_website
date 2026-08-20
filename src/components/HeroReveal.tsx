import { useEffect, useRef, type RefObject } from 'react'
import {
  buildGalleryVictims,
  HAND_MASK_SOLID,
  HAND_SOLID,
  HERO_SCROLL_VH,
} from '../lib/assets'

/** Odd max — keep growing through the hand phase so the mosaic never sits still. */
const MAX_SIDE = 17
const GRID = buildGalleryVictims(MAX_SIDE * MAX_SIDE)
const CENTER = Math.floor(MAX_SIDE / 2)
const HAND_ASPECT = 819 / 780

/** Side length when the hand mask first appears (then densify further inside it). */
const SIDE_AT_MASK = 7

/** Scroll range: hold one face → grow → hand (still growing) → solid. */
const GROW_START = 0.08
const MASK_START = 0.5
const GROW_END = 0.82
const MASK_END = 0.78

const SCROLL_EASE = 0.14

function clamp(n: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, n))
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp((x - edge0) / (edge1 - edge0))
  return t * t * (3 - 2 * t)
}

/** Chebyshev ring → odd side length that first includes this cell. */
function ringSide(row: number, col: number) {
  const dist = Math.max(Math.abs(row - CENTER), Math.abs(col - CENTER))
  return dist * 2 + 1
}

type HeroRevealProps = {
  spacerRef: RefObject<HTMLDivElement | null>
}

export function HeroReveal({ spacerRef }: HeroRevealProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const mosaicRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const solidRef = useRef<HTMLImageElement>(null)
  const markRef = useRef<HTMLParagraphElement>(null)
  const cellRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const spacer = spacerRef.current
    const stage = stageRef.current
    const mosaic = mosaicRef.current
    const grid = gridRef.current
    const solid = solidRef.current
    const mark = markRef.current
    if (!spacer || !stage || !mosaic || !grid || !solid || !mark) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const overlay = document.getElementById('outro-overlay')
    const info = document.getElementById('outro-info')
    const buy = document.getElementById('outro-buy')
    const footer = document.getElementById('outro-footer')
    const maskUrl = `url(${HAND_MASK_SOLID})`

    let frameId = 0
    let smoothProgress = 0
    let lastPhase = ''
    let lastMask = -1
    let lastLayoutKey = ''
    let maskArmed = false
    let handFitPct = 70

    const layoutShell = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      spacer.style.height = `${vh * (HERO_SCROLL_VH + 1.1)}px`

      // Fit full hand in view with generous margin (fingers + wrist clear edges).
      const maxH = vh * 0.58
      const maxW = vw * 0.62
      const handW = Math.min(maxW, maxH * HAND_ASPECT)
      handFitPct = (handW / vw) * 100

      solid.style.width = `${handFitPct}%`
      solid.style.height = 'auto'
      solid.style.aspectRatio = `${819} / ${780}`
      solid.style.top = '47%'
      solid.style.left = '50%'
      solid.style.transform = 'translate3d(-50%, -50%, 0)'

      // Sit the mark just under the hand plate.
      const handH = handW / HAND_ASPECT
      const handBottom = vh * 0.47 + handH / 2
      const markTop = Math.min(vh * 0.9, handBottom + vh * 0.018)
      mark.style.top = `${markTop}px`
      mark.style.bottom = 'auto'
    }

    const setMaskEnabled = (on: boolean) => {
      if (on === maskArmed) return
      maskArmed = on
      if (on) {
        mosaic.style.webkitMaskImage = maskUrl
        mosaic.style.maskImage = maskUrl
      } else {
        mosaic.style.webkitMaskImage = 'none'
        mosaic.style.maskImage = 'none'
      }
    }

    /**
     * Absolute cells in a continuous sideFloat×sideFloat layout.
     * sideFloat=1 → one full-bleed portrait.
     * As sideFloat rises, cells shrink and outer rings fade in.
     */
    const layoutGrid = (sideFloat: number) => {
      const cellPct = 100 / sideFloat
      // Quantize writes so we don't thrash style on sub-pixel scroll noise
      const key = `${cellPct.toFixed(2)}:${sideFloat.toFixed(2)}`
      if (key === lastLayoutKey) return
      lastLayoutKey = key

      for (let i = 0; i < GRID.length; i++) {
        const el = cellRefs.current[i]
        if (!el) continue
        const row = Math.floor(i / MAX_SIDE)
        const col = i % MAX_SIDE
        const needed = ringSide(row, col)

        // Ring fades in as sideFloat approaches that odd size.
        const op =
          needed <= 1
            ? 1
            : smoothstep(needed - 1.05, needed - 0.15, sideFloat)

        if (op < 0.01) {
          el.style.display = 'none'
          continue
        }

        const left = 50 + (col - CENTER - 0.5) * cellPct
        const top = 50 + (row - CENTER - 0.5) * cellPct

        el.style.display = 'block'
        el.style.position = 'absolute'
        el.style.width = `${cellPct}%`
        el.style.height = `${cellPct}%`
        el.style.left = `${left}%`
        el.style.top = `${top}%`
        el.style.opacity = op.toFixed(3)
      }
    }

    const apply = (p: number) => {
      // Keep densifying through the hand reveal — never freeze the mosaic.
      // 1 → 7 before/at mask, then 7 → MAX_SIDE while the silhouette zooms out.
      const preT = smoothstep(GROW_START, MASK_START, p)
      const postT = smoothstep(MASK_START, GROW_END, p)
      const sideFloat =
        p < MASK_START
          ? lerp(1, SIDE_AT_MASK, preT)
          : lerp(SIDE_AT_MASK, MAX_SIDE, postT)
      layoutGrid(sideFloat)

      // Hand mask zooms out while the grid keeps growing underneath
      const maskT = smoothstep(MASK_START, MASK_END, p)
      setMaskEnabled(maskT > 0.001)
      const maskSize = lerp(380, handFitPct, maskT)
      if (Math.abs(maskSize - lastMask) > 0.12) {
        mosaic.style.setProperty('--mask-size', `${maskSize.toFixed(2)}%`)
        lastMask = maskSize
      }

      const mosaicOut = smoothstep(0.8, 0.91, p)
      const solidIn = smoothstep(0.82, 0.93, p)
      const markIn = smoothstep(0.9, 0.98, p)
      const outro = smoothstep(0.94, 1, p)

      mosaic.style.opacity =
        mosaicOut > 0.998 ? '0' : (1 - mosaicOut).toFixed(3)
      solid.style.opacity = solidIn < 0.002 ? '0' : solidIn.toFixed(3)
      mark.style.opacity = markIn < 0.002 ? '0' : markIn.toFixed(3)

      const phase =
        p > 0.84 ? 'logo' : p > 0.52 ? 'hand' : p > GROW_START ? 'grid' : 'hero'
      if (phase !== lastPhase) {
        document.documentElement.dataset.phase = phase
        lastPhase = phase
      }

      if (overlay) overlay.style.opacity = (outro * 0.06).toFixed(3)
      if (footer) footer.style.opacity = outro < 0.002 ? '0' : outro.toFixed(3)
      if (buy) {
        buy.style.transform = `scale(${outro})`
        buy.style.pointerEvents = outro >= 0.85 ? 'auto' : 'none'
      }
      if (info) {
        const infoFade = 1 - smoothstep(0.38, 0.55, p)
        info.style.opacity = infoFade < 0.002 ? '0' : infoFade.toFixed(3)
        const offset = Number(info.dataset.outroOffset || 160)
        info.style.transform = `translate3d(0, ${(-outro * offset).toFixed(1)}px, 0)`
      }
    }

    const tick = () => {
      const max = Math.max(1, window.innerHeight * HERO_SCROLL_VH)
      const target = reduced ? 1 : clamp(window.scrollY / max)
      if (reduced) {
        smoothProgress = 1
      } else {
        smoothProgress += (target - smoothProgress) * SCROLL_EASE
        if (Math.abs(target - smoothProgress) < 0.0004) smoothProgress = target
      }
      apply(smoothProgress)
      frameId = requestAnimationFrame(tick)
    }

    layoutShell()
    setMaskEnabled(false)
    mosaic.style.setProperty('--mask-size', '380%')
    apply(0)
    frameId = requestAnimationFrame(tick)
    window.addEventListener('resize', layoutShell, { passive: true })

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', layoutShell)
    }
  }, [spacerRef])

  return (
    <div
      ref={stageRef}
      id="main-canvas"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-lime"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={mosaicRef}
          className="hero-mosaic absolute inset-0"
          style={{ ['--mask-size' as string]: '380%' }}
        >
          <div
            ref={gridRef}
            className="hero-grid absolute inset-0"
          >
            {GRID.map((victim, i) => {
              const row = Math.floor(i / MAX_SIDE)
              const col = i % MAX_SIDE
              const isCenter = row === CENTER && col === CENTER
              const ring = Math.max(
                Math.abs(row - CENTER),
                Math.abs(col - CENTER),
              )
              return (
                <div
                  key={victim.id}
                  ref={(el) => {
                    cellRefs.current[i] = el
                  }}
                  className="absolute overflow-hidden bg-oxblood"
                  style={{
                    display: isCenter ? 'block' : 'none',
                    width: '100%',
                    height: '100%',
                    left: '0%',
                    top: '0%',
                    opacity: 1,
                  }}
                >
                  <img
                    src={victim.src}
                    alt=""
                    draggable={false}
                    decoding="async"
                    loading={ring <= 3 ? 'eager' : 'lazy'}
                    fetchPriority={isCenter ? 'high' : 'auto'}
                    width={1636}
                    height={2048}
                    className="hero-portrait"
                  />
                </div>
              )
            })}
          </div>
        </div>

        <img
          ref={solidRef}
          src={HAND_SOLID}
          alt=""
          draggable={false}
          className="hero-solid pointer-events-none absolute object-fill opacity-0"
        />

        <p
          ref={markRef}
          className="pointer-events-none absolute left-1/2 z-10 -translate-x-1/2 font-ethiopic text-[clamp(1.35rem,4.2vw,2.35rem)] font-semibold tracking-wide text-oxblood opacity-0"
        >
          #ትሰማ!
        </p>
      </div>
    </div>
  )
}
