import { useEffect, useRef, type RefObject } from 'react'
import {
  buildGalleryVictims,
  HANDOFF_VH,
  HAND_MASK_OUTSIDE,
  HAND_SOLID,
  HERO_REST_VH,
  HERO_SCROLL_VH,
  POSTER,
  POSTER_FROM_HAND,
} from '../lib/assets'
import { HERO_SUBTITLE } from '../lib/content'

/** Odd max — keep growing through the hand phase so the mosaic never sits still. */
const MAX_SIDE = 17
const GRID = buildGalleryVictims(MAX_SIDE * MAX_SIDE)
const CENTER = Math.floor(MAX_SIDE / 2)
const HAND_ASPECT = 819 / 780

const SIDE_AT_MASK = 7

/**
 * The opening frame is a wall of portraits filling the viewport: 4x2 on a
 * landscape screen. Narrower viewports take fewer columns — four columns on a
 * phone would be 97px wide against 422px tall and shred the faces — and the
 * row count follows from keeping each cell near the poster's own 0.8 ratio.
 */
const POSTER_RATIO = 0.8

function openingGrid(vw: number, vh: number) {
  // Cells straddle the plate's centre, so an axis can only ever resolve to an
  // even count — asking for three quietly gives two.
  const cols = vw >= 1024 ? 4 : 2
  const ideal = (POSTER_RATIO * vh * cols) / vw
  const rows = Math.max(2, 2 * Math.round(ideal / 2))
  return { cols, rows }
}

/** Generous static block for the loading hints, covering every breakpoint. */
const EAGER_COLS = 4
const EAGER_ROWS = 3

/** Scroll: 4×2 wall → densify → paper closes in (hand defines) → settle → solid. */
const GROW_START = 0.08
const MASK_START = 0.38
const MASK_REVEAL_END = 0.62
/** Hold the invisible oversize hole before paper starts closing in. */
const MASK_SHRINK_START = 0.46
const PLATE_ZOOM_END = 0.78
const GROW_END = 0.88

/** Upper-left palm flesh — solid in the mask (face cutout at center is not). */
const MASK_POS_START_X = 34
const MASK_POS_START_Y = 44
const MASK_POS_END_X = 50
const MASK_POS_END_Y = 50

const SCROLL_EASE = 0.14

/*
 * Handoff (phase B) beats, in units of handP. The plate glides first so the
 * hand is already travelling when the poster takes over from the silhouette —
 * a moving cross-fade hides the last fraction of a percent of misalignment.
 */
const GLIDE_END = 0.55
/** Out early, while the hand is still centred — the poster brings its own. */
const MARK_OUT = [0, 0.15] as const
const TEXT_IN = [0.2, 0.52] as const
const LIME_IN = [0.3, 0.58] as const
/** Only once parked and lime: both hands coincide, both limes are #B6F500. */
const POSTER_IN = [0.6, 0.78] as const
const NAV_IN = [0.72, 1] as const

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

/**
 * How many cells an axis must hold before the one at `index` is included.
 * Cells sit on a lattice centred on the plate, so this is always even.
 */
function axisNeed(index: number) {
  return Math.abs(index - (CENTER - 0.5)) * 2 + 1
}

/** Cells likely to be on screen at rest, so they load eagerly. */
function inOpening(row: number, col: number) {
  return axisNeed(col) <= EAGER_COLS && axisNeed(row) <= EAGER_ROWS
}

type HeroStageProps = {
  scrollRef: RefObject<HTMLDivElement | null>
}

export function HeroStage({ scrollRef }: HeroStageProps) {
  const stickyRef = useRef<HTMLDivElement>(null)
  const limeRef = useRef<HTMLDivElement>(null)
  const plateRef = useRef<HTMLDivElement>(null)
  const mosaicRef = useRef<HTMLDivElement>(null)
  const paperRef = useRef<HTMLDivElement>(null)
  const solidRef = useRef<HTMLImageElement>(null)
  const posterRef = useRef<HTMLImageElement>(null)
  const markRef = useRef<HTMLParagraphElement>(null)
  const cellRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const scroller = scrollRef.current
    const sticky = stickyRef.current
    const lime = limeRef.current
    const plate = plateRef.current
    const mosaic = mosaicRef.current
    const paper = paperRef.current
    const solid = solidRef.current
    const poster = posterRef.current
    const mark = markRef.current
    if (
      !scroller ||
      !sticky ||
      !lime ||
      !plate ||
      !mosaic ||
      !paper ||
      !solid ||
      !poster ||
      !mark
    ) {
      return
    }

    const root = document.documentElement
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const paperMaskUrl = `url(${HAND_MASK_OUTSIDE})`

    let frameId = 0
    let smoothProgress = 0
    let lastPhase = ''
    let lastTransform = ''
    let lastMaskPct = -1
    let lastMaskPos = ''
    let lastLayoutKey = ''
    let lastNavLive = ''
    let coverScale = 3
    /** Hole larger than the plate — grid stays full-bleed until shrink begins. */
    let maskOversizePct = 3200
    /** Viewport-space box the hand glides into, matching the poster slot. */
    let handTarget = { cx: 0, cy: 0, w: 0 }
    let plateW = 1
    /** Counts across the whole plate that put the opening wall on screen. */
    let startCols = EAGER_COLS
    let startRows = EAGER_ROWS
    /** The wall's own dimensions at the current viewport. */
    let openCols = EAGER_COLS
    let openRows = EAGER_ROWS

    const layoutShell = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight

      /*
       * A sticky child stops pinning once the parent has only its own height
       * left, so the parent needs one extra viewport on top of the phases —
       * without it the settled Home forms and departs on the very same frame.
       */
      /*
       * Reduced motion jumps straight to the settled Home, so the scroll length
       * that exists purely to drive the animation would be dead space.
       */
      scroller.style.height = reduced
        ? `${vh}px`
        : `${vh * (HERO_SCROLL_VH + HANDOFF_VH + HERO_REST_VH + 1)}px`
      sticky.style.height = `${vh}px`

      const maxW = vw * 0.58
      const maxH = vh * 0.64
      let w = maxH * HAND_ASPECT
      let h = maxH
      if (w > maxW) {
        w = maxW
        h = w / HAND_ASPECT
      }

      plate.style.width = `${w}px`
      plate.style.height = `${h}px`
      plateW = w

      const scaleX = vw / w
      const scaleY = vh / h
      coverScale = Math.max(scaleX, scaleY) * 1.12
      if (w * coverScale < vw + 4) coverScale = (vw + 4) / w
      if (h * coverScale < vh + 4)
        coverScale = Math.max(coverScale, (vh + 4) / h)

      maskOversizePct = Math.max(6500, coverScale * 2600)

      /*
       * The plate is bigger than the viewport at cover scale, so asking for
       * exactly 4 columns across the *plate* would not put 4 across the
       * *screen*. Scale the counts by how far the plate overhangs, and the
       * centred lattice then lands 4x2 precisely inside the viewport.
       */
      const opening = openingGrid(vw, vh)
      openCols = opening.cols
      openRows = opening.rows
      startCols = (openCols * (w * coverScale)) / vw
      startRows = (openRows * (h * coverScale)) / vh

      const plateBottom = vh * 0.5 + h / 2
      mark.style.top = `${Math.min(vh * 0.91, plateBottom + 14)}px`
      mark.style.bottom = 'auto'
      mark.style.left = '50%'
      mark.style.transform = 'translateX(-50%)'

      measureHandTarget()
    }

    /*
     * The poster element is the real, responsive Home layout. Reading its box
     * means the glide retargets itself on resize and at every breakpoint
     * without a second source of truth for where the hand ends up.
     */
    const measureHandTarget = () => {
      const box = poster.getBoundingClientRect()
      if (box.width < 1) return
      const w = box.width / POSTER_FROM_HAND.width
      const left = box.left - POSTER_FROM_HAND.left * w
      const top = box.top - POSTER_FROM_HAND.top * w
      handTarget = { cx: left + w / 2, cy: top + w / HAND_ASPECT / 2, w }
    }

    const setPlateTransform = (dx: number, dy: number, scale: number) => {
      const next = `translate3d(calc(-50% + ${dx.toFixed(2)}px), calc(-50% + ${dy.toFixed(2)}px), 0) scale(${scale.toFixed(5)})`
      if (next === lastTransform) return
      lastTransform = next
      plate.style.transform = next
    }

    const setPaperMaskSize = (pct: number) => {
      if (Math.abs(pct - lastMaskPct) < 0.05) return
      lastMaskPct = pct
      paper.style.setProperty('--mask-size', `${pct.toFixed(2)}%`)
    }

    const setPaperMaskPosition = (x: number, y: number) => {
      const key = `${x.toFixed(1)}:${y.toFixed(1)}`
      if (key === lastMaskPos) return
      lastMaskPos = key
      paper.style.setProperty('--mask-pos', `${x.toFixed(2)}% ${y.toFixed(2)}%`)
    }

    /*
     * Columns and rows are tracked separately. The opening frame wants a 4x2
     * wall filling a landscape viewport, but the hand the grid resolves into is
     * near-square — so the two axes start on different counts and converge.
     */
    const layoutGrid = (colsFloat: number, rowsFloat: number) => {
      const cellW = 100 / colsFloat
      const cellH = 100 / rowsFloat
      const key = `${cellW.toFixed(3)}:${cellH.toFixed(3)}`
      if (key === lastLayoutKey) return
      lastLayoutKey = key

      const anchor = CENTER - 0.5

      for (let i = 0; i < GRID.length; i++) {
        const el = cellRefs.current[i]
        if (!el) continue
        const row = Math.floor(i / MAX_SIDE)
        const col = i % MAX_SIDE
        const colNeed = axisNeed(col)
        const rowNeed = axisNeed(row)

        const opCol =
          colNeed <= openCols
            ? 1
            : smoothstep(colNeed - 1.05, colNeed - 0.15, colsFloat)
        const opRow =
          rowNeed <= openRows
            ? 1
            : smoothstep(rowNeed - 1.05, rowNeed - 0.15, rowsFloat)
        const op = Math.min(opCol, opRow)

        if (op < 0.01) {
          el.style.display = 'none'
          continue
        }

        el.style.display = 'block'
        el.style.position = 'absolute'
        el.style.width = `${cellW}%`
        el.style.height = `${cellH}%`
        el.style.left = `${50 + (col - anchor - 0.5) * cellW}%`
        el.style.top = `${50 + (row - anchor - 0.5) * cellH}%`
        el.style.opacity = op.toFixed(3)
      }
    }

    const apply = (scrollP: number, fadeP: number, handP: number) => {
      const preT = smoothstep(GROW_START, MASK_START, scrollP)
      const postT = smoothstep(MASK_START, GROW_END, scrollP)
      const colsFloat =
        scrollP < MASK_START
          ? lerp(startCols, SIDE_AT_MASK, preT)
          : lerp(SIDE_AT_MASK, MAX_SIDE, postT)
      const rowsFloat =
        scrollP < MASK_START
          ? lerp(startRows, SIDE_AT_MASK, preT)
          : lerp(SIDE_AT_MASK, MAX_SIDE, postT)
      layoutGrid(colsFloat, rowsFloat)

      /*
       * Grid is never masked. A paper layer on top has an oversized hand-shaped
       * hole — at max size the hole covers the plate (looks like full grid).
       * Shrinking the hole closes paper in from the edges and defines the hand.
       */
      const revealT = smoothstep(MASK_SHRINK_START, MASK_REVEAL_END, scrollP)
      const revealEase = revealT * revealT * revealT * revealT
      const plateT = smoothstep(MASK_REVEAL_END, PLATE_ZOOM_END, scrollP)
      const currentMaskPct =
        scrollP < MASK_SHRINK_START
          ? maskOversizePct
          : lerp(maskOversizePct, 100, revealEase)
      const shrinkProgress = clamp(
        (maskOversizePct - currentMaskPct) / (maskOversizePct - 100),
      )
      const paperIn = smoothstep(0.18, 0.42, shrinkProgress)
      /** Stay on the palm until paper creeps in, then drift to logo center. */
      const posT = smoothstep(0.3, 0.95, shrinkProgress)
      setPaperMaskPosition(
        lerp(MASK_POS_START_X, MASK_POS_END_X, posT),
        lerp(MASK_POS_START_Y, MASK_POS_END_Y, posT),
      )

      // Phase A drives the plate's scale; phase B takes over and flies it right.
      const glide = smoothstep(0, GLIDE_END, handP)
      const vw = window.innerWidth
      const vh = window.innerHeight
      const targetScale = handTarget.w > 0 ? handTarget.w / plateW : 1
      const dx = handTarget.w > 0 ? lerp(0, handTarget.cx - vw / 2, glide) : 0
      const dy = handTarget.w > 0 ? lerp(0, handTarget.cy - vh / 2, glide) : 0

      let baseScale: number
      if (scrollP < MASK_SHRINK_START) {
        setPaperMaskSize(maskOversizePct)
        baseScale = coverScale
      } else if (scrollP < MASK_REVEAL_END) {
        setPaperMaskSize(currentMaskPct)
        baseScale = coverScale
      } else {
        setPaperMaskSize(100)
        baseScale = lerp(coverScale, 1, plateT)
      }

      // The opening lattice is centred and sized to the viewport, so the plate
      // needs no vertical bias to keep faces in frame.
      setPlateTransform(dx, dy, lerp(baseScale, targetScale, glide))

      const mosaicOut = smoothstep(0.82, 0.92, fadeP)
      const solidIn = smoothstep(0.84, 0.94, fadeP)
      const markIn = smoothstep(0.9, 0.98, fadeP)

      const posterIn = smoothstep(POSTER_IN[0], POSTER_IN[1], handP)
      const markOut = smoothstep(MARK_OUT[0], MARK_OUT[1], handP)
      const limeIn = smoothstep(LIME_IN[0], LIME_IN[1], handP)
      const textIn = smoothstep(TEXT_IN[0], TEXT_IN[1], handP)
      const navIn = smoothstep(NAV_IN[0], NAV_IN[1], handP)

      let paperOpacity = 0
      if (scrollP >= MASK_SHRINK_START && mosaicOut < 0.998) {
        paperOpacity = scrollP < MASK_REVEAL_END ? paperIn : 1
      }

      mosaic.style.opacity =
        mosaicOut > 0.998 ? '0' : (1 - mosaicOut).toFixed(3)
      paper.style.opacity = paperOpacity.toFixed(3)

      /*
       * The poster dissolves in ON TOP of a still-opaque silhouette rather than
       * cross-fading with it. Two half-opaque copies of the same hand composite
       * to 75% coverage, which reads as a wash-out at the midpoint; layering
       * keeps it at 100% the whole way through.
       */
      solid.style.display =
        solidIn < 0.002 || posterIn > 0.995 ? 'none' : 'block'
      solid.style.opacity = solidIn < 0.002 ? '0' : solidIn.toFixed(3)
      poster.style.opacity = posterIn < 0.002 ? '0' : posterIn.toFixed(3)

      const markOpacity = markIn * (1 - markOut)
      mark.style.opacity = markOpacity < 0.002 ? '0' : markOpacity.toFixed(3)

      lime.style.opacity = limeIn.toFixed(3)
      root.style.setProperty('--hero-text-in', textIn.toFixed(3))
      root.style.setProperty('--hero-nav-in', navIn.toFixed(3))

      const navLive = navIn > 0.6 ? 'on' : 'off'
      if (navLive !== lastNavLive) {
        root.dataset.nav = navLive
        lastNavLive = navLive
      }

      const phase =
        handP > 0.5
          ? 'settled'
          : scrollP > 0.86
            ? 'logo'
            : scrollP > 0.5
              ? 'hand'
              : 'hero'
      if (phase !== lastPhase) {
        root.dataset.phase = phase
        lastPhase = phase
      }
    }

    const tick = () => {
      const vh = window.innerHeight
      const heroMax = Math.max(1, vh * HERO_SCROLL_VH)
      const y = window.scrollY
      const target = reduced ? 1 : clamp(y / heroMax)
      const handP = reduced
        ? 1
        : clamp((y - heroMax) / Math.max(1, vh * HANDOFF_VH))

      if (reduced) {
        smoothProgress = 1
      } else {
        smoothProgress += (target - smoothProgress) * SCROLL_EASE
        if (Math.abs(target - smoothProgress) < 0.0004) smoothProgress = target
      }

      // The glide target lives in viewport space, so it moves while pinned.
      if (handP > 0) measureHandTarget()

      apply(reduced ? 1 : target, smoothProgress, handP)
      frameId = requestAnimationFrame(tick)
    }

    paper.style.webkitMaskImage = paperMaskUrl
    paper.style.maskImage = paperMaskUrl
    layoutShell()
    setPaperMaskSize(maskOversizePct)
    setPaperMaskPosition(MASK_POS_START_X, MASK_POS_START_Y)
    apply(0, 0, 0)

    /*
     * ?scrub=heroP,handP freezes the stage on one frame so a screenshot can be
     * taken of an exact moment in the sequence. Dev only, and it deliberately
     * never starts the rAF loop.
     */
    const frozen = import.meta.env.DEV
      ? new URLSearchParams(window.location.search).get('scrub')
      : null

    if (frozen) {
      const [heroP = 1, handP = 0] = frozen.split(',').map(Number)
      requestAnimationFrame(() => {
        layoutShell()
        measureHandTarget()
        apply(heroP, heroP, handP)
      })
    } else {
      frameId = requestAnimationFrame(tick)
    }

    window.addEventListener('resize', layoutShell, { passive: true })

    if (import.meta.env.DEV) {
      // Deterministic scrubbing for screenshots — rAF is throttled when the
      // preview pane is hidden, so verification needs a direct handle.
      ;(window as unknown as Record<string, unknown>).__tisemaScrub = (
        heroP: number,
        handP = 0,
      ) => {
        smoothProgress = heroP
        measureHandTarget()
        apply(heroP, heroP, handP)
      }
    }

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', layoutShell)
      if (import.meta.env.DEV) {
        delete (window as unknown as Record<string, unknown>).__tisemaScrub
      }
    }
  }, [scrollRef])

  return (
    <div
      ref={stickyRef}
      id="hero-sticky"
      className="sticky top-0 h-screen w-full overflow-hidden bg-paper"
    >
      <div
        ref={limeRef}
        className="pointer-events-none absolute inset-0 bg-lime opacity-0"
        aria-hidden
      />

      <HeroCopy />

      {/*
        The poster is the settled Home hero image and the geometry the glide
        aims at. It stays mounted from the start so its box can be measured.
      */}
      <img
        ref={posterRef}
        src={POSTER}
        alt="ትሰማ campaign mark — a hand print over the words #ትሰማ!"
        draggable={false}
        width={1080}
        height={1350}
        className="hero-poster pointer-events-none absolute top-[68%] left-1/2 h-[36vh] w-auto -translate-x-1/2 -translate-y-1/2 opacity-0 lg:top-[52.016%] lg:left-[74.537%] lg:h-[71.953vh]"
      />

      <div ref={plateRef} className="hero-plate pointer-events-none">
        <div ref={mosaicRef} className="hero-mosaic absolute inset-0">
          <div className="hero-grid absolute inset-0">
            {GRID.map((victim, i) => {
              const row = Math.floor(i / MAX_SIDE)
              const col = i % MAX_SIDE
              const opening = inOpening(row, col)
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
                  className="absolute overflow-hidden bg-lime"
                  /* layoutGrid owns every cell's box from the first frame. */
                  style={{ display: 'none', left: '0%', top: '0%' }}
                >
                  <img
                    src={victim.src}
                    alt=""
                    draggable={false}
                    decoding="async"
                    loading={opening || ring <= 3 ? 'eager' : 'lazy'}
                    fetchPriority={opening ? 'high' : 'auto'}
                    width={1636}
                    height={2048}
                    className="hero-portrait"
                  />
                </div>
              )
            })}
          </div>
        </div>

        <div
          ref={paperRef}
          className="hero-paper-cutout pointer-events-none absolute inset-0 bg-paper"
          aria-hidden
        />

        <img
          ref={solidRef}
          src={HAND_SOLID}
          alt=""
          draggable={false}
          className="hero-solid pointer-events-none absolute inset-0 h-full w-full object-contain opacity-0"
        />
      </div>

      <p
        ref={markRef}
        className="pointer-events-none absolute left-1/2 z-10 font-ethiopic text-[clamp(1.35rem,4.2vw,2.35rem)] font-semibold tracking-wide text-oxblood opacity-0"
      >
        #ትሰማ!
      </p>
    </div>
  )
}

/** The settled Home headline — slides in from the left as the hand clears it. */
function HeroCopy() {
  return (
    <div
      className="hero-copy pointer-events-none absolute top-[9%] left-[5.55%] z-[2] flex w-[89%] max-w-[630px] flex-col gap-7 lg:top-1/2 lg:w-[52%] lg:gap-[56px]"
      style={{
        opacity: 'var(--hero-text-in, 0)',
        transform:
          'translateY(var(--hero-copy-shift, 0px)) translateX(calc((1 - var(--hero-text-in, 0)) * -40px))',
      }}
    >
      <h1 className="font-serif text-[clamp(2rem,4.63vw,70px)] leading-[1.093] text-field">
        <span>Declaring </span>
        <span className="text-oxblood">Violence Against </span>
        <span className="text-oxblood italic">Women and Girls </span>
        <span>a National Crisis</span>
      </h1>
      <p className="max-w-[644px] text-[clamp(1rem,1.56vw,23.625px)] leading-[1.4444] font-normal text-field/70">
        {HERO_SUBTITLE}
      </p>
    </div>
  )
}
