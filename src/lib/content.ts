/**
 * Copy and structure transcribed from Figma "Landing Page - V2" (129:259).
 * Placeholder copy in the gallery/feed/footer is reproduced as designed.
 */

export const NAV_LINKS = [
  { label: 'About The Campaign', href: '#about-the-campaign' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Campaign Gallery', href: '#campaign-gallery' },
  { label: 'Campaign Feed', href: '#campaign-feed' },
] as const

export const PETITION_HREF = '#petition'

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
}

export const STATS: StatItem[] = [
  {
    figure: '1 in 3',
    body: 'Women experience physical or sexual violence in their lifetime in Ethiopia',
  },
  {
    figure: '300K',
    countTo: 300,
    suffix: 'K',
    body: 'GBV cases reported, justice delayed is justice denied.',
  },
  {
    figure: '100k+',
    countTo: 100,
    suffix: 'k+',
    body: 'Number of petition signed',
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
    body: ' Fixed reporting intervals with published data and similar structures replicated in every region.',
  },
] as const

export const NOT_ASKING_TITLE = 'What Tisema Is NOT Asking For '
export const NOT_ASKING_BODY =
  "We are NOT asking for a State of Emergency under Article 93. Article 93 operates by suspending rights. We are asking for state capacity and resources to be fully mobilized to protect rights—specifically women and girls' rights."

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

const LOREM_LONG =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

export const GALLERY_INTRO =
  'This gallery holds the stories behind Tisema women lost to violence, whose cases still call for justice.'
export const FEED_INTRO =
  "Every case page brings together what's being said across social media; posts, comments, and shares from every platform; gathered in one place so no voice speaking up for these women gets lost or scattered."
/** The one non-social channel the footer blurb points at. */
export const CONTACT_EMAIL = 'official@tisemaethiopia.com'

export const FOOTER_BLURB =
  'Have information, a story to share, or want to support this cause? Reach out through any of the channels below.'

export type GalleryItem = {
  src: string
  title: string
  body: string
  /** File the tile's Download action hands over — the image itself. */
  file: string
}

const GALLERY_SOURCE: GalleryItem[] = [
  {
    src: '/assets/tisema.png',
    title: 'Tisema logo',
    body: 'Tisema means "let her be heard", a promise these stories will not be met with silence.',
    file: '/assets/tisema.png',
  },
  {
    src: '/assets/heaven.png',
    title: 'Heaven',
    body: 'She was seven years old when her life was taken through sexual violence. Three years later, her case is still open, and she is still waiting for justice.',
    file: '/assets/heaven.png',
  },
  {
    src: '/assets/liza.png',
    title: 'Liza',
    body: 'Lost to sexual violence over a year ago, her case remains open.',
    file: '/assets/liza.png',
  },
  {
    src: '/assets/keneni.png',
    title: 'Keneni',
    body: 'She was thrown from the fifth floor of a building. No case was ever opened her story stands here because no one else will tell it.',
    file: '/assets/keneni.png',
  },
]

/**
 * Two pages' worth. The design draws one row of four plus a dot indicator, so
 * the four real tiles fill page one exactly; the repeat is what gives the
 * indicator a second page to point at until more stories exist.
 */
export const GALLERY_ITEMS: GalleryItem[] = [
  ...GALLERY_SOURCE,
  ...GALLERY_SOURCE,
]

export type FeedPost = {
  src: string
  name: string
  handle: string
  age: string
  body: string
}

const FEED_SOURCE: FeedPost[] = [
  {
    src: '/assets/keneni.png',
    name: 'User Name',
    handle: '@user_name',
    age: '5h',
    body: LOREM_LONG,
  },
  {
    src: '/assets/heaven.png',
    name: 'User Name',
    handle: '@user_name',
    age: '5h',
    body: LOREM_LONG,
  },
  {
    src: '/assets/liza.png',
    name: 'User Name',
    handle: '@user_name',
    age: '5h',
    body: LOREM_LONG,
  },
]

/** Same two-page arrangement as the gallery, for the same reason. */
export const FEED_POSTS: FeedPost[] = [...FEED_SOURCE, ...FEED_SOURCE]

export const FOOTER_CTA = 'Help Make a Difference Today.'

export const FOOTER_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About The Campaign', href: '#about-the-campaign' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Campaign Gallery', href: '#campaign-gallery' },
  { label: 'Campaign Feed', href: '#campaign-feed' },
  { label: 'Terms and Conditions', href: '/terms.html' },
] as const

export type SocialMark = {
  src: string
  label: string
  w: number
  h: number
  /** Twitter and YouTube sit in a translucent rounded chip in the design. */
  boxed?: boolean
}

/** Exported social marks, in the order they sit in the footer row. */
export const FOOTER_SOCIALS: SocialMark[] = [
  { src: '/design/social-1.svg', label: 'LinkedIn', w: 40.322, h: 40.322 },
  { src: '/design/social-2.svg', label: 'Instagram', w: 38.365, h: 39 },
  {
    src: '/design/twitter-glyph.svg',
    label: 'X',
    w: 24.32,
    h: 22.041,
    boxed: true,
  },
  { src: '/design/social-4.svg', label: 'Facebook', w: 38, h: 39 },
  { src: '/design/social-3.svg', label: 'TikTok', w: 38.365, h: 39.3 },
  {
    src: '/design/social-youtube.svg',
    label: 'YouTube',
    w: 24.32,
    h: 24.32,
    boxed: true,
  },
]
