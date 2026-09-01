import type { MouseEvent } from 'react'
import { HANDOFF_VH, HERO_SCROLL_VH } from './assets'
import { shouldClientNavigate } from './router'

const HERO_SEEN_KEY = 'tisema:hero-intro-seen'

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

/** Scroll offset where the handoff finishes and the settled Home hero is shown. */
export function settledHeroScrollY(vh = window.innerHeight) {
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
