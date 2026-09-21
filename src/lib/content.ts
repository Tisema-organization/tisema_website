/**
 * Copy and structure transcribed from Figma "Landing Page - V2" (129:259).
 * Placeholder copy in the gallery/feed/footer is reproduced as designed.
 */

import { FAQ_PAGE_HREF } from './faq'
import {
  VICTIM_DOWNLOAD_EXT,
  VICTIM_IMAGE_BASE,
  VICTIM_STORIES,
  VICTIM_WIDTHS,
  VICTIMS,
} from './victims'

export type NavLink = {
  label: string
  href: string
  /** Pill styling on the homepage and when this route is active. */
  highlight?: boolean
}

export const NAV_LINKS: NavLink[] = [
  { label: 'About The Campaign', href: '#about-the-campaign' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Cases', href: '#cases' },
  { label: 'Campaign Feed', href: '#campaign-feed' },
  { label: 'FAQ', href: FAQ_PAGE_HREF },
]

/** Hash links respect `base`; app routes stay root-relative. */
export function resolveNavHref(href: string, base = '') {
  if (href.startsWith('/')) return href
  return `${base}${href}`
}

export const PETITION_HREF = 'https://c.org/zKH2wvVRdr'

/** Resolves petition link — external URLs ignore the page base prefix. */
export function petitionUrl(base = '') {
  return PETITION_HREF.startsWith('http') ? PETITION_HREF : `${base}${PETITION_HREF}`
}

export const HERO_SUBTITLE =
  "A movement grounded in solidarity, data, and action to protect women's lives and rights."

export type StatItem = {
  /** The exact string the design shows at rest. */
  figure: string
  /** When set, the numeric part counts from 0 to this on scroll into view. */
  countTo?: number
  /** Trails the counted number, e.g. the "K" in "300K". */
  suffix?: string
  body: string
  source: string
  sourceHref: string
}

/** Figures from About Tisema (vF 0209) — EDHS 2024–25 and crisis brief. */
export const STATS: StatItem[] = [
  {
    figure: '1 in 3',
    body: '31.4% of ever-married Ethiopian women experience intimate partner violence.',
    source:
      'Ethiopian Statistical Service (ESS) & ICF. (2026). Ethiopia Demographic and Health Survey 2024–25: Key Indicators Report, Table 18.',
    sourceHref:
      'https://ess.gov.et/wp-content/uploads/2026/01/edhs-2024-25-kir-01172026.pdf',
  },
  {
    figure: '45%',
    countTo: 45,
    suffix: '%',
    body: 'Increase in female homicide victims over ~4 years (Addis Ababa & Dire Dawa).',
    source:
      'Tisema calculation from Addis Ababa and Dire Dawa homicide records. Classification methodology: UNODC & UN Women. (2022). Statistical Framework for Measuring the Gender-Related Killing of Women and Girls.',
    sourceHref:
      'https://www.unodc.org/documents/data-and-analysis/statistics/Statistical_framework_femicide_2022.pdf',
  },
  {
    figure: '7.2M',
    body: 'People requiring GBV protection—up from 5.8M in two years.',
    source:
      'ACAPS. (2025, July 15). Ethiopia: Gender-Based Violence Secondary Data Review Report 2024, p. 2 (citing OCHA, 2024, and UNFPA, 2024).',
    sourceHref:
      'https://www.acaps.org/fileadmin/Data_Product/Main_media/20250715_ACAPS_Ethiopia_-_Gender_Based__violence_secondary_data_review.pdf',
  },
]

export const ABOUT_EYEBROW = 'The Ask'

export const ASK_LEAD =
  'We demand that violence against women and girls, including femicide and sexual violence, be declared a National Crisis requiring a '
export const ASK_EMPHASIS = 'whole-of-government emergency response.'

export const WHOLE_OF_GOVERNMENT = [
  {
    title: 'Coordination Above Line Ministries',
    body: ' A coordinating body ranked equal to or above line ministries so it can compel cooperation across Justice, Health, Police, Education, and Finance.',
  },
  {
    title: 'Dedicated Budgets & Targets',
    body: 'Each ministry carries its own outcome targets and dedicated budget line, written into its own main plan rather than parked in a gender unit.',
  },
  {
    title: 'Regional & Woreda Localization',
    body: 'Structure replicated at regional and woreda levels where policing, health, and justice administration are physically delivered.',
  },
] as const

export const WHO_CAN_DECLARE_INTRO_QUOTE = '“National crisis"'
export const WHO_CAN_DECLARE_INTRO_REST =
  ' is a political designation—there is no procedural or legal obstacle to declaring it. Executive authority sits directly with leadership:'

export const AUTHORITIES = [
  {
    due: 'Due 28 Aug 2026',
    title: 'Prime Minister',
    body: 'Chief Executive and Chairman of the Council (Art. 74(1)); supervises the federal administration and takes corrective measures (Art. 74(8)). Highest executive power is vested jointly in the PM and the Council (Art. 72(1)).',
    verdict: 'Makes the declaration. Can act alone.',
  },
  {
    due: 'Due 28 Aug 2026',
    title: 'Council of Ministers',
    body: 'Decides the organisational structure of ministries and other organs; coordinates them and provides leadership (Art. 77(2)); formulates social policies and strategies (Art. 77(6)); draws up the budget (Art. 77(3)).',
    verdict: 'Creates the structure and the budget line.',
  },
  {
    due: 'Due 28 Aug 2026',
    title: 'Deputy Prime Minister',
    body: 'Carries out responsibilities entrusted by the Prime Minister (Art. 75(1)(a)).',
    verdict: 'Can chair the coordinating body.',
  },
  {
    due: 'Due 28 Aug 2026',
    title: 'Ministry of Women and Social Affairs',
    body: 'Issues directives within its own sector only. Holds no authority over Justice, Health, Police, Education or Finance, which sit at equal rank.',
    verdict: 'Cannot deliver this ask alone.',
  },
] as const

export const DEMANDS = [
  {
    index: '01',
    title: 'A Named Accountable Office',
    body: 'Chaired at Deputy Prime Minister level or above to convene and hold line ministries accountable.',
  },
  {
    index: '02',
    title: 'A Dedicated Budget Line',
    body: 'Domestic treasury allocation visible in the federal budget.',
  },
  {
    index: '03',
    title: 'A Deadline & Published Targets',
    body: 'Dated milestones and named outcome indicators.',
  },
  {
    index: '04',
    title: 'Mandatory Public Reporting',
    body: 'Fixed reporting intervals with published data and similar structures replicated in every region.',
  },
] as const

export const NOT_ASKING_TITLE = 'What Tisema Is NOT Asking For '
export const NOT_ASKING_BODY =
  "We are NOT asking for a State of Emergency under Article 93. Article 93 operates by suspending rights. We are asking for state capacity and resources to be fully mobilized to protect rights specifically women and girls' rights."

export type TimelineEntry = {
  date: string
  title?: string
  body?: string
}

export const TIMELINE: TimelineEntry[] = [
  {
    date: 'August 2023',
    title: 'Brutal Crime Sparks Initial Local Mobilization',
    body: 'Seven-year-old Heaven Awot is killed in Bahir Dar. Local rights groups begin tracking the legal process as the perpetrator appeals for sentence reductions.',
  },
  {
    date: 'Early 2024',
    title: 'Sentence Reduction Ignites Online Petition',
    body: "News spreads that Getnet Baye's sentence for Heaven's murder was reduced from 25 to 21 years. Digital campaigns under #JusticeForHeaven take off, demanding judicial accountability and stricter sentencing for child abuse and femicide.",
  },
  {
    date: 'March 2025',
    title: 'A Pattern of Dismissed Cases',
    body: 'Following the death of Keneni Adugna and the release of suspects in multiple murder cases due to "missing evidence" or "procedural gaps," outrage spreads across Ethiopian social media. Activists realize the issue extends beyond individual cases to systemic institutional failure.',
  },
  {
    date: 'Late 2025 – Mid 2026',
    title: 'Coalescing into #Tisema',
    body: 'Individual hashtag campaigns (such as #JusticeForHeaven and #JusticeForKeneni) unify under the singular slogan #Tisema (#ትሰማ – "Let her be heard"). The scope expands from demanding justice for specific victims to pushing for structural legal reforms.',
  },
  {
    /* The brief gives this milestone a headline and a date but no body. */
    date: 'August 2026',
    title: 'National Petitions and Crisis Demands: #Tisema Campaign started',
  },
]

export const GALLERY_INTRO =
  'Here are the stories behind Tisema — women lost to violence, whose cases still call for justice.'
export const FEED_INTRO =
  "Every case page brings together what's being said across social media; posts, comments, and shares from every platform; gathered in one place so no voice speaking up for these women gets lost or scattered."
/** The one non-social channel the footer blurb points at. */
export const CONTACT_EMAIL = 'info@tisemaethiopia.com'

export const FOOTER_BLURB =
  'Have information, a story to share, or want to support this cause? Reach out through any of the channels below.'

export type GalleryItem = {
  id: string
  src: string
  /** Responsive candidates; the tile pairs these with a `sizes` hint. */
  srcSet?: string
  title: string
  /** Absent until the campaign supplies the story. */
  body?: string
  /** File the tile's Download action hands over. */
  file: string
}

export const GALLERY_PAGE_HREF = '/cases'

/** How many tiles the landing-page carousel shows before linking to the full gallery. */
export const GALLERY_LANDING_PREVIEW = 4

const GALLERY_SOURCE: GalleryItem[] = [
  {
    id: 'tisema',
    src: '/assets/tisema-640.webp',
    srcSet: '/assets/tisema-256.webp 256w, /assets/tisema-640.webp 640w',
    title: 'Tisema logo',
    body: 'Tisema means "let her be heard", a promise these stories will not be met with silence.',
    file: '/assets/tisema.png',
  },
  /*
   * The portraits are served as WebP at two widths. A tile renders at roughly
   * 302x365 CSS px, so 640 already covers 2x DPR; the 1080 variant is only
   * ever fetched by the Download link, never by the page.
   */
  ...VICTIMS.map<GalleryItem>((victim) => ({
    id: victim.slug,
    src: `${VICTIM_IMAGE_BASE}/${victim.slug}-640.webp`,
    srcSet: VICTIM_WIDTHS.map(
      (w) => `${VICTIM_IMAGE_BASE}/${victim.slug}-${w}.webp ${w}w`,
    ).join(', '),
    title: victim.name,
    body: VICTIM_STORIES[victim.slug],
    file: `${VICTIM_IMAGE_BASE}/${victim.slug}-full.${VICTIM_DOWNLOAD_EXT}`,
  })),
]

export const GALLERY_ITEMS: GalleryItem[] = GALLERY_SOURCE

/**
 * The landing preview carries only tiles that have a story to tell — slicing
 * the first few off the front instead would surface whichever portraits happen
 * to sort earliest, captioned with a bare name. The full list, names and all,
 * lives on the gallery page behind "View all stories".
 */
export const GALLERY_LANDING_ITEMS: GalleryItem[] = GALLERY_ITEMS.filter(
  (item) => Boolean(item.body),
).slice(0, GALLERY_LANDING_PREVIEW)

export type FeedPost = {
  id: string
  src: string
  name: string
  handle: string
  age: string
  body: string
  url: string
  avatarSrc?: string
  /** Unix seconds — used for sorting scraped posts. */
  createdAt?: number
}


export { FEED_POSTS } from './feed'

export const FOOTER_CTA = 'Help Make a Difference Today.'

/** Primary quick links shown in the footer column (Figma 208:473). */
export const FOOTER_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'The Demand & Declaration', href: '/demand' },
  { label: 'The 12 Demands', href: '/demands' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Emergency Resources', href: '/resources' },
  { label: 'Terms and Conditions', href: '/terms' },
] as const

export const FOOTER_COPYRIGHT = '© 2026 #Tisema. All rights reserved.'

export const FOOTER_LEGAL = [
  { label: 'Privacy Policy', href: '/terms' },
] as const

export const FOOTER_HELP = {
  title: 'GET HELP',
  badge: 'SURVIVOR SUPPORT',
  helplineLabel: '24/7 EMERGENCY & CRISIS HELPLINE',
  tollFree: 'Toll-Free: 1111',
  tollFreeTel: '1111',
  phone: '',
  phoneTel: '',
  lines: [
    {
      label: 'Survivor Legal Aid Clinic',
      phone: '',
      tel: '',
    },
    {
      label: 'Confidential Psychological Support',
      phone: '',
      tel: '',
    },
    {
      label: 'Safe House Emergency Intake & Shelter Dispatch',
      phone: '',
      tel: '',
    },
  ],
} as const

export type SocialMark = {
  src: string
  label: string
  href: string
  w: number
  h: number
  /** X and Telegram sit in a translucent rounded chip in the design. */
  boxed?: boolean
}

/** Live campaign channels, in footer order. */
export const FOOTER_SOCIALS: SocialMark[] = [
  {
    src: '/design/twitter-glyph.svg',
    label: 'X',
    href: 'https://x.com/tisemaethiopia',
    w: 24.32,
    h: 22.041,
    boxed: true,
  },
  {
    src: '/design/social-2.svg',
    label: 'Instagram',
    href: 'https://www.instagram.com/tisemaethiopia',
    w: 38.365,
    h: 39,
  },
  {
    src: '/design/social-3.svg',
    label: 'TikTok',
    href: 'https://www.tiktok.com/@tisemaethiopia',
    w: 38.365,
    h: 39.3,
  },
  {
    src: '/design/telegram-glyph.svg',
    label: 'Telegram',
    href: 'https://t.me/+hEb9hRj8flllOTA1',
    w: 24.32,
    h: 24.32,
    boxed: true,
  },
]
