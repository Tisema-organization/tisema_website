export const COLORS = {
  lime: '#B6F500',
  oxblood: '#6B241A',
  fieldDark: '#2D0C05',
  paper: '#FBF8F3',
  clayFlat: '#733721',
} as const

export type Victim = {
  id: string
  name: string
  nameAm: string
  tag: string
  src: string
}

export const VICTIMS: Victim[] = [
  {
    id: 'liza',
    name: 'Liza',
    nameAm: 'ሊዛ',
    tag: '#ሊዛ_ትሰማ',
    src: '/victims/portraits/liza.png?v=2',
  },
  {
    id: 'heaven',
    name: 'Heaven',
    nameAm: 'ሄቨን',
    tag: '#ሄቨን_ትሰማ',
    src: '/victims/portraits/heaven.png?v=2',
  },
  {
    id: 'keneni',
    name: 'Keneni',
    nameAm: 'ቀነኒ',
    tag: '#ቀነኒ_ትሰማ',
    src: '/victims/portraits/keneni.png?v=2',
  },
]

/** Repeat the limited set so the scroll gallery feels full until more portraits arrive. */
export function buildGalleryVictims(count = 12): Victim[] {
  return Array.from({ length: count }, (_, i) => {
    const base = VICTIMS[i % VICTIMS.length]
    return { ...base, id: `${base.id}-${i}` }
  })
}

export const LOGO_LOCKUP = '/logo-lockup.png'
export const LOGO_TRANSPARENT = '/logo-transparent.png'
export const HAND_MASK = '/hand-mask.png'
/** Filled palm (no face cutout) — legacy luminance mask. */
export const HAND_MASK_FILL = '/hand-mask-fill.png'
/** Solid hand silhouette as alpha — derived from hand-solid.png. */
export const HAND_MASK_SOLID = '/hand-mask-solid-alpha.png?v=4'
/** Inverted mask — opaque outside, transparent hand hole (paper closes in on scroll). */
export const HAND_MASK_OUTSIDE = '/hand-mask-outside-alpha.png?v=2'
export const HAND_SOLID = '/hand-solid.png'

/** Viewport-heights of scroll driving the hero mosaic → hand reveal. */
export const HERO_SCROLL_VH = 6

/** Viewport-heights spent gliding the hand into the settled Home layout. */
export const HANDOFF_VH = 2

/** Viewport-heights the settled Home holds before it scrolls away. */
export const HERO_REST_VH = 1

/** The campaign poster the hand hands off to — the Home hero image. */
export const POSTER = '/assets/tisema.png'

/**
 * Alignment between hand-solid.png (819x780) and assets/tisema.png (1080x1350).
 * Measured by fitting the two hand masks: centroid x 0.47506 vs 0.47526 and an
 * rms-radius ratio of 1.002, so the poster sits at the hand box's width, nudged
 * up by 2.5% of it. Ratios are multiples of the displayed hand WIDTH.
 */
export const POSTER_FROM_HAND = {
  width: 1.00187,
  left: -0.00109,
  top: -0.02502,
} as const

/** @deprecated kept for asset path; hero is now scroll-mosaic, not video */
export const VIDEO_SCROLL_VH = 3

export const CAPTION_TEXT =
  'ትሰማ — “let her be heard.” Scroll and their faces gather. The hand holds them. Speak their names.'
export const EASE_OUT = [0.25, 0.1, 0.25, 1] as const
