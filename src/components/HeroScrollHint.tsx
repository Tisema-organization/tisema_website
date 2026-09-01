import { useEffect, useRef, useState } from 'react'

/** Grid is considered "at rest" within this many pixels of the top. */
const GRID_START_MAX_Y = 16

function ScrollChevron() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className="hero-scroll-hint-chevron"
    >
      <path
        d="M10 4v10M10 14l-4-4M10 14l4-4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * Scroll cue at the top of the hero mosaic. Shown whenever the page is back at
 * the grid start — first visit or after scrolling up — and hides on scroll.
 *
 * Plain CSS only — this sits outside LazyMotion in App, so it cannot use `m.*`.
 */
export function HeroScrollHint() {
  const everScrolled = useRef(window.scrollY > GRID_START_MAX_Y)
  const [atGridStart, setAtGridStart] = useState(
    () => window.scrollY <= GRID_START_MAX_Y,
  )
  const [delayedIn, setDelayedIn] = useState(everScrolled.current)
  const [coarse, setCoarse] = useState(() =>
    window.matchMedia('(pointer: coarse)').matches,
  )
  const [reducedMotion, setReducedMotion] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const sync = () => {
      const atStart = window.scrollY <= GRID_START_MAX_Y
      if (!atStart) everScrolled.current = true
      setAtGridStart(atStart)
    }

    sync()
    const raf = requestAnimationFrame(sync)

    window.addEventListener('scroll', sync, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', sync)
    }
  }, [])

  useEffect(() => {
    if (!atGridStart || everScrolled.current) {
      setDelayedIn(true)
      return
    }

    const timer = window.setTimeout(() => setDelayedIn(true), 750)
    return () => window.clearTimeout(timer)
  }, [atGridStart])

  useEffect(() => {
    const coarseMq = window.matchMedia('(pointer: coarse)')
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => {
      setCoarse(coarseMq.matches)
      setReducedMotion(motionMq.matches)
    }
    coarseMq.addEventListener('change', sync)
    motionMq.addEventListener('change', sync)
    return () => {
      coarseMq.removeEventListener('change', sync)
      motionMq.removeEventListener('change', sync)
    }
  }, [])

  const show = !reducedMotion && atGridStart && delayedIn

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-50 flex justify-center transition-[opacity,transform] duration-500 ease-out ${
        show ? 'translate-y-0 opacity-100' : 'translate-y-2.5 opacity-0'
      }`}
      aria-hidden={!show}
    >
      <div className="flex flex-col items-center gap-2.5 rounded-full bg-paper/88 px-5 py-3 shadow-[0_8px_32px_rgba(45,12,5,0.12)] backdrop-blur-sm">
        <span className="text-[11px] font-medium tracking-[0.2em] text-field/85 uppercase">
          {coarse ? 'Swipe up' : 'Scroll to begin'}
        </span>
        <ScrollChevron />
      </div>
    </div>
  )
}
