/**
 * Demand & Declaration page — Figma frame 180:20.
 */

import { ASK_EMPHASIS, ASK_LEAD } from './content'
import { DEMANDS_PAGE_HREF } from './demands'

export const DEMAND_PAGE_HREF = '/demand'

export const DEMAND_PAGE_TITLE = 'The Demand'

export const DEMAND_PAGE_INTRO = `${ASK_LEAD}${ASK_EMPHASIS}`

export type DemandBriefCard = {
  id: string
  title: string
  body: string
  href?: string
}

export const DEMAND_BRIEF_CARDS: DemandBriefCard[] = [
  {
    id: 'national-crisis',
    title: 'What does it mean to call something a national crisis?',
    body: 'Lorem ipsum dolor sit amet consectetur. Rhoncus tristique dolor mauris aliquet bibendum neque. Ac nunc aliquet',
  },
  {
    id: 'detailed-demands',
    title: 'What are the detailed demands of the campaign?',
    body: 'Lorem ipsum dolor sit amet consectetur. Rhoncus tristique dolor mauris aliquet bibendum neque. Ac nunc aliquet',
    href: DEMANDS_PAGE_HREF,
  },
  {
    id: 'briefs',
    title: 'Briefs on the demands.',
    body: 'Lorem ipsum dolor sit amet consectetur. Rhoncus tristique dolor mauris aliquet bibendum neque. Ac nunc aliquet',
  },
]

export type DemandThemeDoc = {
  id: string
  language: string
  title: string
  file: string
  downloadName: string
}

/** Language explainers in public/demands — the four bottom cards. */
export const DEMAND_THEME_DOCS: DemandThemeDoc[] = [
  {
    id: 'english',
    language: 'English',
    title: 'VAW is a National Crisis Explainer',
    file: '/demands/english-vaw-national-crisis-explainer.pdf',
    downloadName: 'Tisema-VAW-National-Crisis-Explainer-English.pdf',
  },
  {
    id: 'amharic',
    language: 'አማርኛ',
    title: 'የሴቶች ጥቃት የብሔራዊ ቀውስ ነው',
    file: '/demands/amharic-vaw-national-crisis-explainer.pdf',
    downloadName: 'Tisema-VAW-National-Crisis-Explainer-Amharic.pdf',
  },
  {
    id: 'afan-oromo',
    language: 'Afaan Oromo',
    title: 'VAW is a National Crisis Explainer',
    file: '/demands/afan-oromo-vaw-national-crisis-explainer.pdf',
    downloadName: 'Tisema-VAW-National-Crisis-Explainer-Afaan-Oromo.pdf',
  },
  {
    id: 'tigrigna',
    language: 'ትግርኛ',
    title: 'VAW is a National Crisis Explainer',
    file: '/demands/tigrigna-vaw-national-crisis-explainer.pdf',
    downloadName: 'Tisema-VAW-National-Crisis-Explainer-Tigrigna.pdf',
  },
]
