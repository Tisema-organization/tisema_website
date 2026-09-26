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

export const PETITION_HREF = 'https://www.change.org/p/tisema-%E1%89%B5%E1%88%B0%E1%88%9B-campaign-petition-declare-violence-against-women-a-national-crisis'

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

export const ABOUT_INTRO = [
  'Tisema (ትሰማ) means “let her be heard.”',
  'Tisema is a public advocacy campaign born out of collective grief at the violence women and girls in Ethiopia are forced to live with. It began as a call for justice and accountability following the killings of individual women and girls whose names entered public conversation.',
  'Today, Tisema is a public demand to recognize these deaths and acts of violence as part of a broader pattern of violence and miscarriage of justice.',
] as const

export const ABOUT_EYEBROW = 'We are calling on the Ethiopian government'

export const ASK_LEAD =
  'to formally declare violence against women and girls, including femicide and sexual violence, a National Crisis requiring a '
export const ASK_EMPHASIS = 'whole-of-government emergency response.'

export const ABOUT_OUTRO = [
  'Tisema is organized by volunteers and endorsed by a diverse group of individual advocates and women’s rights organizations in Ethiopia. It is nonpartisan and has no political or party affiliation. Our demand is addressed to whoever holds executive office.',
  'This is not a single campaign moment. Tisema is a framework for sustained public pressure, accountability and solidarity for as long as it takes to make Ethiopia safer for women and girls.',
] as const

export const WHOLE_OF_GOVERNMENT = [
  {
    title: 'Recognition',
    body: 'Violence against women and girls is formally declared a National Crisis by the executive. Femicide is named, counted and punished, with one standard definition used across police, prosecution and courts.',
  },
  {
    title: 'Ownership',
    body: 'A coordinating National Crisis Response Council, chaired by the Prime Minister, with a delivery unit and multi-ministry coordination, reporting and evaluated by public scorecards.',
  },
  {
    title: 'Resourcing',
    body: 'An earmarked, traceable federal budget line with matching regional lines, not a reallocation inside an existing envelope.',
  },
  {
    title: 'Counting',
    body: 'Publication at full disaggregation of 12-month prevalence, help-seeking, non-partner violence, perpetrator, injury and FGM data the government already holds, with nationwide tracking through coordinated data sharing.',
  },
  {
    title: 'Reach',
    body: 'A survivor guarantee reaching rural woreda and kebele, conflict-affected and displaced populations, and women and girls with disabilities, including shelter, medical care, legal aid and a functioning national hotline.',
  },
  {
    title: 'Deadline',
    body: 'A date by which the response is operating, not merely announced: the Council convened, the budget line opened and the first public report issued. Without a date, there is an announcement, not a response.',
  },
] as const

export const AUTHORITIES = [
  {
    title: 'Prime Minister',
    body: 'The National Crisis Response Council would be chaired by the Prime Minister, with a delivery unit and multi-ministry coordination.',
    verdict: 'Provides executive leadership and ownership of the response.',
  },
  {
    title: 'Council of Ministers',
    body: 'The Tisema demand is addressed to the Council of Ministers together with the Prime Minister.',
    verdict: 'Part of the executive response Tisema is calling for.',
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
    title: 'Heaven Awot — A Case That Sparked Public Outrage',
    body: 'Seven-year-old Heaven Awot was sexually assaulted and killed in Bahir Dar. Her landlord, Getnet Baye, was convicted and sentenced to 25 years in prison. The sentence and subsequent legal proceedings sparked widespread outrage and helped give rise to #JusticeForHeaven, as women and advocates demanded justice and stronger accountability.',
  },
  {
    date: 'August 19, 2023',
    title: 'Zewdu Haftu — Killed During Ashenda',
    body: 'Thirty-two-year-old Zewdu Haftu was killed in Mekelle during the Ashenda season. Witness accounts described an attempted assault that Zewdu resisted before she was dragged and fatally struck by a vehicle. Her killing led to calls for justice and accountability in Tigray.',
  },
  {
    date: '2024',
    title: '#JusticeForHeaven — A Wider Mobilization',
    body: 'Public outrage over Heaven Awot’s case grew into #JusticeForHeaven. Women, advocates and rights organizations used social media and other forms of public advocacy to demand accountability, turning Heaven’s name into a wider call against violence toward women and girls.',
  },
  {
    date: 'March 10, 2025',
    title: 'Keneni Adugna — #JusticeForKeneni',
    body: 'Keneni Adugna, a 25-year-old engineer and social media creator, died after reportedly falling from the fifth floor of the Addis Ababa residence she shared with musician Andualem Gosa. After her death, photographs showing injuries, messages and other accounts surfaced indicating allegations of a history of intimate partner violence in the relationship. Andualem was initially detained in connection with her death but was later released for reported lack of evidence. #JusticeForKeneni grew as advocates demanded a thorough investigation, accountability and greater scrutiny of the allegations of abuse surrounding her case.',
  },
  {
    date: '2025',
    title: 'Ikram — Another Call for Justice',
    body: 'Ikram’s case became another focus of public advocacy as women continued raising concerns about violence, accountability and the repeated struggle for justice. Her name joined the growing number of women and girls whose cases were being discussed as part of a broader pattern rather than as isolated incidents.',
  },
  {
    date: 'October 7, 2025',
    title: 'Liza Dessale — #JusticeForLiza',
    body: 'Liza Dessale, a college student from Dessie, was reportedly sexually assaulted and killed while returning home after going to have her phone repaired. Her death led to #JusticeForLiza, as advocates again demanded justice and accountability for violence against women and girls.',
  },
  {
    date: 'October 28, 2025',
    title: 'Sekina — Sexual Violence, Femicide and a Later Call for Justice',
    body: 'Sekina was sexually assaulted and strangled to death in Dikona Kebele, Gurage Zone. Although her killing occurred before the formation of #Tisema, advocates learned about her case after the campaign had begun. Her case became part of Tisema’s continuing advocacy for women and girls whose experiences of violence and pursuit of justice might otherwise remain unheard.',
  },
  {
    date: 'August 4, 2026',
    title: 'Zewdu Haftu — The Case That Became a Turning Point',
    body: 'Nearly three years after Zewdu was killed, her case returned to public attention. Two men who had been convicted of her killing and sentenced to life imprisonment in 2025 were acquitted and released. The decision became the immediate catalyst that brought advocates together around the need for a broader response to recurring violence and failures of accountability.',
  },
  {
    date: 'August 6, 2026',
    title: 'Individual Justice Campaigns Coalesce into #Tisema',
    body: 'Years of advocacy around cases including Heaven, Keneni, Ikram, Liza and Zewdu had repeatedly brought women and advocates together to demand justice. Following the decision in Zewdu Haftu’s case, that accumulated advocacy began to coalesce into #Tisema — a broader public campaign addressing violence against women and girls as a systemic crisis.',
  },
  {
    date: 'August 6, 2026',
    title: '#Tisema — From Individual Cases to a National Demand',
    body: 'Tisema calls on the Ethiopian government to formally declare violence against women and girls, including femicide and sexual violence, a National Crisis requiring a whole-of-government emergency response. The campaign turns recurring public outrage around individual cases into a sustained demand for accountability, implementation and public reporting.',
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
  // Temporarily disabled with the standalone Demand and Terms routes.
  // { label: 'The Demand & Declaration', href: '/demand' },
  // { label: 'The 12 Demands', href: '/demands' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Emergency Resources', href: '/resources' },
  // { label: 'Terms and Conditions', href: '/terms' },
] as const

export const FOOTER_COPYRIGHT = '© 2026 #Tisema. All rights reserved.'

// Temporarily disabled with the Terms route.
// export const FOOTER_LEGAL = [
//   { label: 'Privacy Policy', href: '/terms' },
// ] as const

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
