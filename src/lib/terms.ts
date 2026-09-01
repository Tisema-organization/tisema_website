/**
 * Terms and Conditions, transcribed from the campaign brief.
 *
 * The source PDF stores ff/fi/ffi as single ligature glyphs, which copy out as
 * one character and break both in-page search and screen readers. They are
 * written here as ordinary letters.
 */

export const TERMS_TITLE = 'Terms and Conditions'
export const TERMS_LEAD = 'Tisema Campaign Platform'

/**
 * Section 8 promises a revised effective date on every update, but the brief
 * does not carry one. Set it and the line renders; left empty it stays hidden
 * rather than showing a date nobody approved.
 */
export const TERMS_EFFECTIVE = ''

export const TERMS_NOTICE = {
  title: 'Safety & Emergency Notice',
  body: 'The Tisema Campaign Platform is an advocacy, awareness, and digital resource hub. It is NOT an emergency legal or medical dispatch center. If you are in immediate physical danger, please contact local emergency services, trusted community networks, or direct helpline resources.',
} as const

export type TermsBullet = { lead?: string; text: string }

export type TermsSection = {
  n: number
  title: string
  body?: string
  bullets?: TermsBullet[]
}

export const TERMS_SECTIONS: TermsSection[] = [
  {
    n: 1,
    title: 'Acceptance of Terms',
    body: 'By accessing, browsing, or interacting with the Tisema Campaign Platform ("Platform", "we", "us", or "our"), you agree to be bound by these Terms and Conditions ("Terms"). These Terms govern your access to and use of our website, digital resources, petition portals, and future data tracking modules. If you do not agree to these Terms, please immediately discontinue use of the Platform.',
  },
  {
    n: 2,
    title: 'Platform Mission & Educational Purpose',
    body: 'The Tisema Campaign Platform operates as a civil society initiative dedicated to ending gender-based violence (GBV) and femicide in Ethiopia by advocating for top-level political accountability and whole-of-government emergency responses. Content published on this Platform including policy briefs, legal summaries, data visualizations, and advocacy toolkits is provided strictly for public education, awareness, and civic participation.',
  },
  {
    n: 3,
    title: 'User Confidentiality, Anonymity & Safety',
    body: 'We recognize the sensitive social, legal, and geopolitical context surrounding human rights advocacy and GBV in Ethiopia. Safeguard mechanisms are embedded within our design:',
    bullets: [
      {
        lead: 'No Forced Account Creation:',
        text: 'Access to campaign materials, petitions, and resources does not require creating a public user profile.',
      },
      {
        lead: 'Privacy by Design:',
        text: 'We do not track, collect, or store personal identifiers, IP addresses, or location data of users browsing resource pages.',
      },
    ],
  },
  {
    n: 4,
    title: 'Acceptable Use & User Conduct',
    body: 'To preserve the integrity, safety, and supportive environment of the Tisema community, you agree not to use the Platform to:',
    bullets: [
      {
        text: 'Publish, upload, or transmit any material that is harassing, defamatory, abusive, threatening, or hate-speech directed at survivors or advocacy partners.',
      },
      {
        text: 'Attempt to compromise the technical security, anonymity, or operational integrity of the Platform or its infrastructure.',
      },
      {
        text: 'Submit false, misleading, or fabricated reports or data regarding GBV incidents or campaign petitions.',
      },
      {
        text: 'Dox, identify, or expose personal details of survivors, campaign contributors, or volunteers without explicit prior consent.',
      },
    ],
  },
  {
    n: 5,
    title: 'Intellectual Property & Fair Use Advocacy',
    body: 'All original policy materials, campaign toolkits, graphics, and documentation created by the Tisema Coalition are made available under an open-access advocacy model. You are encouraged to download, print, share, and distribute our public campaign materials for non-commercial, educational, and advocacy purposes, provided that Tisema is properly credited and content is not altered in a manner that misrepresents our core asks.',
  },
  {
    n: 6,
    title: 'Data Verification Disclaimers',
    body: 'Data presented within our tracking and archival modules reflects verified public records, media monitoring, and partner submissions vetted under strict data integrity protocols. While we strive for maximum accuracy, Tisema makes no express warranties regarding completeness or real-time coverage due to reporting constraints and systemic underreporting of GBV incidents.',
  },
  {
    n: 7,
    title: 'Limitation of Liability',
    body: 'Under no circumstances shall the Tisema Coalition, its organizers, partner organizations, volunteers, or technical contributors be liable for any direct, indirect, incidental, or consequential damages resulting from your access to or inability to access the Platform, or your reliance on any legal or educational content provided herein.',
  },
  {
    n: 8,
    title: 'Modifications to Terms',
    body: 'We reserve the right to update these Terms at any time to reflect technical upgrades or evolving security requirements. Updated Terms will be posted on this page with a revised effective date.',
  },
]
