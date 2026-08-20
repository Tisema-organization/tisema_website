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
    src: '/victims/liza.png',
  },
  {
    id: 'heaven',
    name: 'Heaven',
    nameAm: 'ሄቨን',
    tag: '#ሄቨን_ትሰማ',
    src: '/victims/heaven.png',
  },
  {
    id: 'keneni',
    name: 'Keneni',
    nameAm: 'ቀነኒ',
    tag: '#ቀነኒ_ትሰማ',
    src: '/victims/keneni.png',
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
export const HERO_VIDEO = '/victims/tisema-vid.mp4'

/** How many viewport-heights of scroll scrub the hero video 0 → end. */
export const VIDEO_SCROLL_VH = 3

export const CAPTION_TEXT =
  'ትሰማ — “let her be heard.” Scroll to play the story. When it ends, the women and girls of Ethiopia who were silenced come into view. Speak their names.'

export const EASE_OUT = [0.25, 0.1, 0.25, 1] as const
