import type { MouseEvent } from 'react'
import { HANDOFF_VH, HERO_SCROLL_VH } from './assets'
import { shouldClientNavigate } from './router'

const HERO_SEEN_KEY = 'tisema:hero-intro-seen'

export const HERO_BEGIN_EVENT = 'tisema:hero-begin'
export const HERO_INTRO_STATE_EVENT = 'tisema:hero-intro-state'

export type HeroIntroState = 'waiting' | 'playing' | 'done'

export function hasSeenHeroIntro() {
  try {
    return sessionStorage.getItem(HERO_SEEN_KEY) === '1'
  } catch {
    return false
  }
}

export function markHeroIntroSeen() {
  try {
    sessionStorage.setItem(HERO_SEEN_KEY, '1')
  } catch {
    // private mode / blocked storage
  }
}

/**
 * Where Home sits after the intro.
 *
 * Once the cinematic has played (or been skipped), Home is the top of a short
 * settled hero — not eight viewports into a scrub track.
 */
export function settledHeroScrollY(vh = window.innerHeight) {
  if (hasSeenHeroIntro()) return 0
  return vh * (HERO_SCROLL_VH + HANDOFF_VH)
}

/** Skip the intro only when returning home — not when deep-linking to a section. */
export function shouldSkipHeroIntro() {
  if (!hasSeenHeroIntro()) return false
  const hash = window.location.hash
  return hash === '' || hash === '#home'
}

export function scrollToSettledHero(behavior: ScrollBehavior = 'instant') {
  window.scrollTo({ top: settledHeroScrollY(), behavior })
}

export function requestHeroBegin() {
  window.dispatchEvent(new Event(HERO_BEGIN_EVENT))
}

export function publishHeroIntroState(state: HeroIntroState) {
  window.dispatchEvent(
    new CustomEvent(HERO_INTRO_STATE_EVENT, { detail: { state } }),
  )
}

/** Home/logo click on the landing page — jump past the intro when already seen. */
export function handleHomeNavClick(
  e: MouseEvent<HTMLAnchorElement>,
  base: string,
  href = `${base}#home`,
) {
  const path = window.location.pathname
  const onLanding =
    path === '/' ||
    path.endsWith('/index.html') ||
    path.endsWith('/index.htm')

  if (!onLanding && shouldClientNavigate(href)) return

  if (!hasSeenHeroIntro()) return

  if (!onLanding && (base === '' || base === '/')) return

  if (onLanding) {
    e.preventDefault()
    scrollToSettledHero('smooth')
    if (window.location.hash !== '#home') {
      history.replaceState(null, '', `${base || ''}#home`)
    }
  }
}
