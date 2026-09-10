import { useEffect, useState } from 'react'
import {
  HERO_INTRO_STATE_EVENT,
  requestHeroBegin,
  type HeroIntroState,
} from '../lib/heroSession'

/**
 * Solemn Begin cue for the cinematic hero. One gesture — this button, a tap
 * on the grid, a wheel notch, or a short swipe — plays the reveal. It is not
 * a scroll affordance; the sequence is timed, not scrubbed.
 */
export function HeroScrollHint() {
  const [state, setState] = useState<HeroIntroState>(() => {
    const current = document.documentElement.dataset.heroIntro
    if (current === 'waiting' || current === 'playing' || current === 'done') {
      return current
    }
    return 'done'
  })
  const [delayedIn, setDelayedIn] = useState(false)

  useEffect(() => {
    const onState = (event: Event) => {
      const next = (event as CustomEvent<{ state: HeroIntroState }>).detail
        ?.state
      if (next) setState(next)
    }

    window.addEventListener(HERO_INTRO_STATE_EVENT, onState)
    const current = document.documentElement.dataset.heroIntro
    if (current === 'waiting' || current === 'playing' || current === 'done') {
      setState(current)
    }

    return () => window.removeEventListener(HERO_INTRO_STATE_EVENT, onState)
  }, [])

  useEffect(() => {
    if (state !== 'waiting') {
      setDelayedIn(false)
      return
    }

    const timer = window.setTimeout(() => setDelayedIn(true), 700)
    return () => window.clearTimeout(timer)
  }, [state])

  const show = state === 'waiting' && delayedIn

  return (
    <div
      className={`fixed inset-x-0 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-50 flex justify-center transition-[opacity,transform] duration-500 ease-out ${
        show
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-2.5 opacity-0'
      }`}
      aria-hidden={!show}
    >
      <button
        type="button"
        onClick={() => requestHeroBegin()}
        className="flex flex-col items-center gap-2 rounded-full bg-paper/90 px-7 py-3.5 shadow-[0_8px_32px_rgba(45,12,5,0.14)] backdrop-blur-sm transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-field focus-visible:ring-offset-2 focus-visible:ring-offset-paper focus-visible:outline-none"
      >
        <span className="text-[11px] font-medium tracking-[0.22em] text-field uppercase">
          Begin
        </span>
        <span
          aria-hidden
          className="hero-scroll-hint-chevron block h-px w-8 bg-field/55"
        />
      </button>
    </div>
  )
}
