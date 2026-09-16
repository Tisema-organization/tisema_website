import { useEffect, useRef, type RefObject } from 'react'
import {
  HANDOFF_VH,
  HAND_MASK_OUTSIDE,
  HAND_SOLID,
  HERO_REST_VH,
  HERO_SCROLL_VH,
  POSTER,
  POSTER_FROM_HAND,
} from '../lib/assets'
import { buildHeroCells } from '../lib/victims'
import { HERO_SUBTITLE, petitionUrl } from '../lib/content'
import { DEMANDS_PAGE_HREF } from '../lib/demands'
import {
  HERO_BEGIN_EVENT,
  markHeroIntroSeen,
  publishHeroIntroState,
  shouldSkipHeroIntro,
  type HeroIntroState,
} from '../lib/heroSession'
import { clientNavigate, useRouter } from '../lib/router'

/** Odd max — keep growing through the hand phase so the mosaic never sits still. */
const MAX_SIDE = 17
const GRID = buildHeroCells(MAX_SIDE * MAX_SIDE)
const CENTER = Math.floor(MAX_SIDE / 2)
const HAND_ASPECT = 819 / 780

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

/** Scroll: densifying wall → paper closes in (hand defines) → settle → solid. */
const MASK_REVEAL_END = 0.62
/** Hold the invisible oversize hole before paper starts closing in. */
const MASK_SHRINK_START = 0.46
const PLATE_ZOOM_END = 0.78

/** Upper-left palm flesh — solid in the mask (face cutout at center is not). */
const MASK_POS_START_X = 34
const MASK_POS_START_Y = 44
const MASK_POS_END_X = 50
const MASK_POS_END_Y = 50

/*
 * The wall opens slightly over-zoomed and eases back to cover.
 *
 * Densifying on its own only changes how the plate is subdivided: the frame
 * stays exactly the same size, and a ~5% change in tile width across a wall of
 * faces reads as nothing happening. A global scale change is the cue the eye
 * actually catches. It never drops below coverScale, so the plate stays
 * full-bleed and no paper edge is ever exposed.
 */
const OPEN_ZOOM = 1.28
const OPEN_SETTLE = 0.24

/**
 * One-gesture cinematic. The old multi-viewport scrub read as a media toy;
 * a single Begin plays the same beats as a short film, then the page is a
 * normal campaign site.
 *
 * scrollP runs linear in time — no keyframe remapping. Remapping used to brake
 * right before the cutout (densify leg was fast, cutout leg slow), which read
 * as a stall and a wobble as the grid and mask fought each other.
 */
const CINEMATIC_MS = 8000
/** Hero scrollP reaches 1 here; handoff starts earlier so the join is continuous. */
const CINEMATIC_HERO_END = 0.78
const CINEMATIC_HANDOFF_START = 0.64

/**
 * Mask size where the paper edge first reads — used for paper opacity / pos.
 * Above this the hole is still larger than the viewport.
 */
const MASK_VISIBLE_START = 260

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
 * Ease-out with a steep start: slope 2 at t=0, flattening to 0 at t=1.
 *
 * Used for the opening densify instead of smoothstep, whose slope is zero at
 * both ends. Zero slope at the start is exactly what makes the first turn of
 * the wheel produce no visible change; a fast start means the wall reacts
 * immediately, and the flat finish still hands over smoothly to the next leg.
 */
function easeOutQuad(edge0: number, edge1: number, x: number) {
  const t = clamp((x - edge0) / (edge1 - edge0))
  return t * (2 - t)
}

function easeInCubic(t: number) {
  return t * t * t
}

/**
 * Mask hole size. Drops through invisible oversize with a soft ease-in, then
 * the visible close is linear — ease-out used to slam the first visible frames
 * and read as a wobble against the grid.
 */
function maskPctForReveal(
  revealT: number,
  oversize: number,
  visibleStart: number,
) {
  const t = clamp(revealT)
  if (t <= 0) return oversize
  if (t >= 1) return 100
  // First fifth: oversize → visibleStart (soft). Rest: linear visible close.
  const head = 0.2
  if (t < head) {
    return lerp(oversize, visibleStart, easeInCubic(t / head))
  }
  return lerp(visibleStart, 100, (t - head) / (1 - head))
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
    let lockedVw = window.innerWidth
    /** Locked so mobile browser chrome changing `vh` mid-scroll cannot rewind progress. */
    let lockedVh = window.innerHeight
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

    /*
     * waiting → one gesture → playing → done. Once done, the scrub track is
     * gone and the stage stays on the settled Home for a short rest height.
     */
    let introState: HeroIntroState = 'done'
    let cinematicStart = 0
    let touchStartY = 0
    let prevOverflow = ''

    const setIntroState = (next: HeroIntroState) => {
      if (introState === next) return
      introState = next
      root.dataset.heroIntro = next
      publishHeroIntroState(next)
    }

    const lockScroll = () => {
      prevOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    }

    const unlockScroll = () => {
      document.body.style.overflow = prevOverflow
    }

    const maybeRelockViewport = () => {
      const vw = window.innerWidth
      if (Math.abs(vw - lockedVw) > 1) {
        lockedVw = vw
        lockedVh = window.innerHeight
      }
    }

    const layoutShell = () => {
      maybeRelockViewport()
      const vw = window.innerWidth
      const vh = lockedVh

      /*
       * Waiting/playing: one viewport — the cinematic drives itself.
       * Done/reduced: short settled rest, then the page below.
       * Dev scrub keeps the old multi-viewport track so frames stay reachable.
       */
      const frozenScrub = import.meta.env.DEV
        ? new URLSearchParams(window.location.search).get('scrub')
        : null

      if (frozenScrub) {
        scroller.style.height = `${vh * (HERO_SCROLL_VH + HANDOFF_VH + HERO_REST_VH + 1)}px`
      } else if (reduced || introState === 'done') {
        /*
         * Exactly one viewport — no leftover "rest" track. After the cinematic,
         * an extra HERO_REST_VH of pinned settled hero ate the first scroll
         * with no visible change.
         */
        scroller.style.height = `${vh}px`
      } else {
        scroller.style.height = `${vh}px`
      }
      sticky.style.height = `${vh}px`

      const isNarrow = vw < 1024
      const maxW = vw * (isNarrow ? 0.82 : 0.58)
      const maxH = vh * (isNarrow ? 0.56 : 0.64)
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
      const key = `${cellW.toFixed(5)}:${cellH.toFixed(5)}`
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
            : clamp(colsFloat - (colNeed - 1))
        const opRow =
          rowNeed <= openRows
            ? 1
            : clamp(rowsFloat - (rowNeed - 1))
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
      /*
       * Densify finishes as the cutout begins — so the wall is already full
       * and still when paper starts closing. Growing cells into a moving mask
       * was the pre-cutout wobble.
       */
      const growT = clamp(scrollP / MASK_SHRINK_START)
      const colsFloat = lerp(startCols, MAX_SIDE, growT)
      const rowsFloat = lerp(startRows, MAX_SIDE, growT)
      layoutGrid(colsFloat, rowsFloat)

      /*
       * Grid is never masked. A paper layer on top has an oversized hand-shaped
       * hole — at max size the hole covers the plate (looks like full grid).
       * Shrinking the hole closes paper in from the edges and defines the hand.
       *
       * revealT is linear in scrollP (not smoothstep) so the cutout doesn't
       * ease to a standstill at either end of its window.
       */
      const revealT = clamp(
        (scrollP - MASK_SHRINK_START) / (MASK_REVEAL_END - MASK_SHRINK_START),
      )
      const visibleStart = Math.max(MASK_VISIBLE_START, coverScale * 95)
      const currentMaskPct =
        scrollP < MASK_SHRINK_START
          ? maskOversizePct
          : maskPctForReveal(revealT, maskOversizePct, visibleStart)
      // easeOutQuad — smoothstep was flat at the cutout→zoom seam.
      const plateT = easeOutQuad(MASK_REVEAL_END, PLATE_ZOOM_END, scrollP)
      const shrinkProgress = clamp(
        scrollP < MASK_SHRINK_START
          ? 0
          : (visibleStart - Math.min(currentMaskPct, visibleStart)) /
              (visibleStart - 100),
      )
      const paperIn = smoothstep(0.02, 0.22, shrinkProgress)
      /** Stay on the palm until paper creeps in, then drift to logo center. */
      const posT = smoothstep(0.15, 0.9, shrinkProgress)
      setPaperMaskPosition(
        lerp(MASK_POS_START_X, MASK_POS_END_X, posT),
        lerp(MASK_POS_START_Y, MASK_POS_END_Y, posT),
      )

      // Phase A drives the plate's scale; phase B takes over and flies it right.
      // easeOutQuad (not smoothstep) so the logo glide starts moving immediately
      // instead of holding still at the hero→handoff seam.
      const glide = easeOutQuad(0, GLIDE_END, handP)
      const vw = window.innerWidth
      const vh = window.innerHeight
      const targetScale = handTarget.w > 0 ? handTarget.w / plateW : 1
      const dx = handTarget.w > 0 ? lerp(0, handTarget.cx - vw / 2, glide) : 0
      const dy = handTarget.w > 0 ? lerp(0, handTarget.cy - vh / 2, glide) : 0

      // Opening zoom settles early and linearly so late densify isn't fighting
      // a still-moving plate scale.
      const openScale = lerp(
        coverScale * OPEN_ZOOM,
        coverScale,
        clamp(scrollP / Math.max(OPEN_SETTLE, 1e-6)),
      )

      let baseScale: number
      if (scrollP < MASK_SHRINK_START) {
        setPaperMaskSize(maskOversizePct)
        baseScale = openScale
      } else if (scrollP < MASK_REVEAL_END) {
        setPaperMaskSize(currentMaskPct)
        baseScale = openScale
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

    const finishCinematic = () => {
      cancelAnimationFrame(frameId)
      markHeroIntroSeen()
      setIntroState('done')
      unlockScroll()
      layoutShell()
      window.scrollTo(0, 0)
      measureHandTarget()
      apply(1, 1, 1)
      frameId = requestAnimationFrame(tickSettled)
    }

    const tickCinematic = (now: number) => {
      if (!cinematicStart) cinematicStart = now
      // Strictly linear in wall-clock time — any global ease reintroduces
      // rushes and hangs.
      const u = clamp((now - cinematicStart) / CINEMATIC_MS)

      const scrollP = clamp(u / CINEMATIC_HERO_END)
      const handP =
        u <= CINEMATIC_HANDOFF_START
          ? 0
          : clamp(
              (u - CINEMATIC_HANDOFF_START) / (1 - CINEMATIC_HANDOFF_START),
            )

      if (handP > 0) measureHandTarget()
      apply(scrollP, scrollP, handP)

      if (u >= 1) {
        finishCinematic()
        return
      }
      frameId = requestAnimationFrame(tickCinematic)
    }

    const tickSettled = () => {
      apply(1, 1, 1)
      frameId = requestAnimationFrame(tickSettled)
    }

    const startCinematic = () => {
      if (introState !== 'waiting') return
      setIntroState('playing')
      cinematicStart = 0
      frameId = requestAnimationFrame(tickCinematic)
    }

    const onBeginEvent = () => startCinematic()

    const onPointerUp = (event: PointerEvent) => {
      if (introState !== 'waiting') return
      if (event.pointerType === 'mouse' && event.button !== 0) return
      startCinematic()
    }

    const onWheel = (event: WheelEvent) => {
      if (introState !== 'waiting') return
      if (event.deltaY <= 0) return
      event.preventDefault()
      startCinematic()
    }

    const onTouchStart = (event: TouchEvent) => {
      if (introState !== 'waiting') return
      touchStartY = event.touches[0]?.clientY ?? 0
    }

    const onTouchMove = (event: TouchEvent) => {
      if (introState !== 'waiting') return
      event.preventDefault()
      const y = event.touches[0]?.clientY ?? touchStartY
      if (touchStartY - y > 28) startCinematic()
    }

    paper.style.webkitMaskImage = paperMaskUrl
    paper.style.maskImage = paperMaskUrl

    /*
     * ?scrub=heroP,handP freezes the stage on one frame so a screenshot can be
     * taken of an exact moment in the sequence. Dev only, and it deliberately
     * never starts the rAF loop when frozen.
     */
    const frozen = import.meta.env.DEV
      ? new URLSearchParams(window.location.search).get('scrub')
      : null

    const skipIntro = shouldSkipHeroIntro() && !reduced && !frozen
    const deepLink = (() => {
      const hash = window.location.hash
      return Boolean(hash && hash !== '#home')
    })()

    if (frozen) {
      setIntroState('done')
      const [heroP = 1, handP = 0] = frozen.split(',').map(Number)
      layoutShell()
      setPaperMaskSize(maskOversizePct)
      setPaperMaskPosition(MASK_POS_START_X, MASK_POS_START_Y)
      requestAnimationFrame(() => {
        layoutShell()
        measureHandTarget()
        apply(heroP, heroP, handP)
      })
    } else if (reduced || skipIntro || deepLink) {
      setIntroState('done')
      if (!reduced && skipIntro) markHeroIntroSeen()
      layoutShell()
      setPaperMaskSize(maskOversizePct)
      setPaperMaskPosition(MASK_POS_START_X, MASK_POS_START_Y)
      if (!deepLink) window.scrollTo(0, 0)
      apply(1, 1, 1)
      requestAnimationFrame(() => {
        layoutShell()
        measureHandTarget()
        apply(1, 1, 1)
        frameId = requestAnimationFrame(tickSettled)
      })
    } else {
      setIntroState('waiting')
      lockScroll()
      layoutShell()
      setPaperMaskSize(maskOversizePct)
      setPaperMaskPosition(MASK_POS_START_X, MASK_POS_START_Y)
      window.scrollTo(0, 0)
      apply(0, 0, 0)

      window.addEventListener(HERO_BEGIN_EVENT, onBeginEvent)
      sticky.addEventListener('pointerup', onPointerUp)
      window.addEventListener('wheel', onWheel, { passive: false })
      window.addEventListener('touchstart', onTouchStart, { passive: true })
      window.addEventListener('touchmove', onTouchMove, { passive: false })
    }

    window.addEventListener('resize', layoutShell, { passive: true })

    if (import.meta.env.DEV) {
      // Deterministic scrubbing for screenshots — rAF is throttled when the
      // preview pane is hidden, so verification needs a direct handle.
      ;(window as unknown as Record<string, unknown>).__tisemaScrub = (
        heroP: number,
        handP = 0,
      ) => {
        measureHandTarget()
        apply(heroP, heroP, handP)
      }
    }

    return () => {
      cancelAnimationFrame(frameId)
      unlockScroll()
      window.removeEventListener('resize', layoutShell)
      window.removeEventListener(HERO_BEGIN_EVENT, onBeginEvent)
      sticky.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      delete root.dataset.heroIntro
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
        className="hero-poster pointer-events-none absolute top-[78%] left-1/2 h-[44vh] w-auto max-w-[88vw] -translate-x-1/2 -translate-y-1/2 opacity-0 sm:top-[74%] sm:h-[48vh] lg:top-[52.016%] lg:left-[74.537%] lg:h-[71.953vh] lg:max-w-none"
      />

      <div ref={plateRef} className="hero-plate pointer-events-none">
        <div ref={mosaicRef} className="hero-mosaic absolute inset-0">
          <div className="hero-grid absolute inset-0">
            {GRID.map((cell, i) => {
              const row = Math.floor(i / MAX_SIDE)
              const col = i % MAX_SIDE
              const opening = inOpening(row, col)
              const ring = Math.max(
                Math.abs(row - CENTER),
                Math.abs(col - CENTER),
              )
              return (
                <div
                  key={cell.id}
                  ref={(el) => {
                    cellRefs.current[i] = el
                  }}
                  className="absolute overflow-hidden bg-lime"
                  /* layoutGrid owns every cell's box from the first frame. */
                  style={{ display: 'none', left: '0%', top: '0%' }}
                >
                  <img
                    /*
                      Only the opening cells are ever seen large. Everything
                      else appears once the lattice has densified, by which
                      point a cell is ~130px wide, so it takes the 320 cut.
                    */
                    src={opening ? cell.src : cell.srcSmall}
                    alt=""
                    draggable={false}
                    decoding="async"
                    loading={opening || ring <= 3 ? 'eager' : 'lazy'}
                    fetchPriority={opening ? 'high' : 'auto'}
                    width={640}
                    height={800}
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
  const { navigate } = useRouter()
  const petition = petitionUrl()
  const petitionExternal = petition.startsWith('http')

  return (
    <div
      className="hero-copy pointer-events-none absolute top-[calc(56px+0.5rem)] left-[5.55%] z-20 flex w-[89%] max-w-[630px] flex-col gap-4 sm:gap-5 lg:top-1/2 lg:left-[6.48%] lg:w-[52%] lg:max-w-none lg:gap-10"
      style={{
        opacity: 'var(--hero-text-in, 0)',
        transform:
          'translateY(var(--hero-copy-shift, 0px)) translateX(calc((1 - var(--hero-text-in, 0)) * -40px))',
      }}
    >
      <h1 className="max-w-[572px] font-serif text-[clamp(2rem,4.63vw,70px)] leading-[1.093] text-field">
        <span>Declaring </span>
        <span className="text-oxblood">Violence Against </span>
        <span className="text-oxblood italic">Women and Girls </span>
        <span>a National Crisis</span>
      </h1>
      <p className="max-w-[644px] text-[clamp(1rem,1.56vw,23.625px)] leading-[1.4444] font-normal text-field">
        {HERO_SUBTITLE}
      </p>

      <div className="pointer-events-auto relative z-20 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:gap-6">
        <a
          href={petition}
          {...(petitionExternal
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
          className="inline-flex shrink-0 items-center justify-center rounded-[3.5px] bg-oxblood px-5 py-2.5 text-[13.78px] leading-[24.5px] font-semibold whitespace-nowrap text-paper transition-opacity hover:opacity-90 sm:px-[28px] sm:py-[8.75px] sm:text-lime"
        >
          Take Action
        </a>
        <a
          href={DEMANDS_PAGE_HREF}
          onClick={(e) => clientNavigate(e, DEMANDS_PAGE_HREF, navigate)}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-[3.5px] border border-solid border-oxblood bg-lime px-5 py-2.5 text-[14px] leading-[22px] font-semibold whitespace-nowrap text-oxblood transition-opacity hover:opacity-80 sm:gap-[8.75px] sm:px-[28px] sm:py-[8.75px] sm:text-[15.75px] sm:leading-[28px]"
        >
          Read the Demand
          <span aria-hidden className="text-[18px] leading-none">
            ↗
          </span>
        </a>
      </div>
    </div>
  )
}
