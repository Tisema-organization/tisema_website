/**
 * The campaign portraits, generated from the "Victims Campaign Photos" folder
 * by scripts/build-victim-images.sh.
 *
 * Slugs keep the source's numeric prefix because two different portraits are
 * both named "Ayantu" — on name alone one silently overwrites the other.
 *
 * `name` comes from the filename. No `story` is set here: these are real
 * people and their accounts have to come from the campaign, not be inferred
 * from a file listing. Tiles render the name alone until a story is supplied.
 */

export type Victim = {
  slug: string
  name: string
  story?: string
}

export const VICTIM_IMAGE_BASE = '/victims/gallery'

/** Widths built by the script, smallest first. */
export const VICTIM_WIDTHS = [320, 640] as const

/**
 * The Download link hands over a JPEG, not the WebP the page displays.
 *
 * These are meant to be re-uploaded as social profile pictures, and upload
 * forms are a much more conservative path than display: browsers all render
 * WebP, but a platform's photo uploader is where an unusual container gets
 * rejected. JPEG removes the question, and costs nothing here because the file
 * is only ever fetched on click — never as part of the page.
 */
export const VICTIM_DOWNLOAD_EXT = 'jpg'

export const VICTIMS: Victim[] = [
  { slug: '1-hanna', name: 'Hanna' },
  { slug: '2-birtukan', name: 'Birtukan' },
  { slug: '3-frehiwot', name: 'Frehiwot' },
  { slug: '4-lamrot', name: 'Lamrot' },
  { slug: '5-tiruye', name: 'Tiruye' },
  { slug: '6-adonayit', name: 'Adonayit' },
  { slug: '7-samrawit-png', name: 'Samrawit png' },
  { slug: '8-nibret', name: 'Nibret' },
  { slug: '9-three-girls-unnamed', name: 'Three Girls Unnamed' },
  { slug: '10-ayantu', name: 'Ayantu' },
  { slug: '11-beamlak', name: 'Beamlak' },
  { slug: '12-hasset', name: 'Hasset' },
  { slug: '13-tsigereda', name: 'Tsigereda' },
  { slug: '14-haimanot', name: 'Haimanot' },
  { slug: '15-banchiayehu', name: 'Banchiayehu' },
  { slug: '16-lewam', name: 'Lewam' },
  { slug: '17-nuhamin', name: 'Nuhamin' },
  { slug: '18-samrawit-2', name: 'Samrawit' },
  { slug: '19-alemitu', name: 'Alemitu' },
  { slug: '20-boni', name: 'Boni' },
  { slug: '21-firewoini', name: 'Firewoini' },
  { slug: '22-lydia', name: 'Lydia' },
  { slug: '23-lewam-2', name: 'Lewam' },
  { slug: '24-mahlet', name: 'Mahlet' },
  { slug: '25-adanech', name: 'Adanech' },
  { slug: '26-bitania', name: 'Bitania' },
  { slug: '27-meaza', name: 'Meaza' },
  { slug: '28-simbo', name: 'Simbo' },
  { slug: '29-woinshet', name: 'Woinshet' },
  { slug: '30-wudinesh', name: 'Wudinesh' },
  { slug: '31-birikti', name: 'Birikti' },
  { slug: '32-fatuma', name: 'Fatuma' },
  { slug: '33-hohete', name: 'Hohete' },
  { slug: '34-seble', name: 'Seble' },
  { slug: '35-selome', name: 'Selome' },
  { slug: '36-tizita', name: 'Tizita' },
  { slug: '37-amrot', name: 'Amrot' },
  { slug: '38-ayantu', name: 'Ayantu' },
  { slug: '39-mahlet-2', name: 'Mahlet' },
  { slug: '40-nolawit', name: 'Nolawit' },
  { slug: '41-tigist', name: 'Tigist' },
  { slug: '42-ruth', name: 'Ruth' },
  { slug: '49-winta', name: 'Winta' },
  { slug: '50-melat', name: 'Melat' },
  { slug: '51-mulubirhan', name: 'Mulubirhan' },
  { slug: '52-kidusan', name: 'Kidusan' },
  { slug: '53-tarikua', name: 'Tarikua' },
  { slug: '54-sekina', name: 'Sekina' },
  { slug: '55-ekram', name: 'Ekram' },
  { slug: '56-heaven', name: 'Heaven' },
  { slug: '57-liza', name: 'Liza' },
  { slug: '58-zewdu', name: 'Zewdu' },
  { slug: '59-keneni', name: 'Keneni' },
]

/** Stories supplied by the campaign brief, keyed by slug. */
export const VICTIM_STORIES: Record<string, string> = {
  '56-heaven':
    'She was seven years old when her life was taken through sexual violence. Three years later, her case is still open, and she is still waiting for justice.',
  '57-liza': 'Lost to sexual violence over a year ago, her case remains open.',
  '59-keneni':
    'She was thrown from the fifth floor of a building. No case was ever opened her story stands here because no one else will tell it.',
}

export type HeroCell = {
  id: string
  /** For cells the opening frame shows large. */
  src: string
  /** For cells that only ever appear once the lattice is dense and small. */
  srcSmall: string
}

/**
 * Cells for the hero lattice, dealt from the full portrait set rather than a
 * handful repeated.
 *
 * 53 portraits against a 17-column grid: the two are coprime, so stepping by
 * index alone scatters them — a cell's horizontal neighbour is +1 and its
 * vertical neighbour +17, and neither lands back on the same portrait.
 */
export function buildHeroCells(count: number): HeroCell[] {
  return Array.from({ length: count }, (_, i) => {
    const victim = VICTIMS[i % VICTIMS.length]
    return {
      id: `${victim.slug}-${i}`,
      src: `${VICTIM_IMAGE_BASE}/${victim.slug}-640.webp`,
      srcSmall: `${VICTIM_IMAGE_BASE}/${victim.slug}-320.webp`,
    }
  })
}
