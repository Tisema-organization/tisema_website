/**
 * Blogs page — transcribed from Figma frame 201:2560.
 * Article bodies and additional posts remain placeholders.
 */

export const BLOGS_PAGE_HREF = '/blogs'

export const BLOGS_PAGE_TITLE = 'Blogs'

export const BLOGS_PAGE_INTRO =
  'We demand that violence against women and girls, including femicide and sexual violence, be declared a National Crisis requiring a whole-of-government emergency response.'

export type BlogPost = {
  id: string
  title: string
  excerpt: string
  tag: string
  meta: string
  image: string
  imageAlt: string
}

export const BLOG_FEATURED = {
  id: 'featured',
  eyebrow: 'WHY THESE DEMANDS CANNOT BE COMPROMISED',
  badge: 'LEAD INVESTIGATIVE ESSAY',
  title:
    '“Justice is not a negotiation with those who silenced the vulnerable. It is the unyielding demand that power answers to truth.”',
  excerpt:
    'For months, institutional spokespersons offered empty platitudes and internal task forces. The 12 Demands codify measurable changes that leave zero room for retroactive evasion or private whitewashing. This dispatch details the statutory timeline and why immediate executive decree is non-negotiable.',
  author: 'Legal Strategy Collective',
  meta: 'Published Oct 18, 2024 • 8 min read',
  image: '/blogs/featured.png',
  imageAlt: 'Community members marching with placards for accountability',
  caption: 'Photo: Mobilization Archive #Tisema Addis Ababa Assembly',
} as const

/** Design shows six cards; copy is repeated as placeholder until more posts land. */
export const BLOG_RECENT: BlogPost[] = Array.from({ length: 6 }, (_, i) => ({
  id: `recent-${i + 1}`,
  title: 'What does it mean to declare a National Crisis? The legal and…',
  excerpt:
    'Examining the statutory thresholds required to mobilize inter-ministerial budgets, protective escorts, and swift judicial processing units.',
  tag: 'CRISIS ANALYSIS',
  meta: '6 min read • Oct 14',
  image: '/blogs/courthouse.png',
  imageAlt: 'Courthouse pillars and legal architecture',
}))

export const RECENT_STORIES_TITLE = 'Recent Stories'

export const RECENT_STORIES_INTRO =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

/** Landing preview — three cards before linking to the full blogs page. */
export const RECENT_STORIES = BLOG_RECENT.slice(0, 3)
