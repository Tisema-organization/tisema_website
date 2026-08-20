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
/** Solid hand silhouette as alpha — fixed CSS mask (do not animate mask-size). */
export const HAND_MASK_SOLID = '/hand-mask-solid-alpha.png'
export const HAND_SOLID = '/hand-solid.png'
export const HERO_VIDEO = '/victims/tisema-vid.mp4'

/** Viewport-heights of scroll driving the hero mosaic → hand reveal. */
export const HERO_SCROLL_VH = 6

/** @deprecated kept for asset path; hero is now scroll-mosaic, not video */
export const VIDEO_SCROLL_VH = 3

export const CAPTION_TEXT =
  'ትሰማ — “let her be heard.” Scroll and their faces gather. The hand holds them. Speak their names.'
export const EASE_OUT = [0.25, 0.1, 0.25, 1] as const
