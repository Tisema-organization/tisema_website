/**
 * The 12 Demands page — transcribed from Figma frame 175:4.
 * Clause bodies / PDF brief remain placeholders until campaign assets land.
 */

export const DEMANDS_PAGE_HREF = '/demands'

export const DEMANDS_PAGE_EYEBROW =
  'OFFICIAL CAMPAIGN MANIFESTO + 2025 CODIFIED EDITION'

export const DEMANDS_PAGE_TITLE = 'The 12 Demands'

export const DEMANDS_PAGE_INTRO =
  'Our uncompromised roadmap for systemic justice, civic protection, and institutional reckoning. Each item represents a binding imperative formulated by legal advocates, community leaders, and survivor coalitions.'

export const DEMANDS_PDF_LABEL = 'Download PDF Brief (2.4MB)'

export type DemandCategory =
  | 'Accountability'
  | 'Legal & Judicial'
  | 'Protection & Safety'
  | 'Public Disclosure'

export const DEMAND_FILTERS: Array<'All' | DemandCategory> = [
  'All',
  'Accountability',
  'Legal & Judicial',
  'Protection & Safety',
  'Public Disclosure',
]

export type ManifestDemand = {
  id: string
  index: string
  category: DemandCategory
  urgency: string
  urgencyAccent?: boolean
  title: string
  body: string
  status: string
  hasClause?: boolean
}

export const MANIFEST_DEMANDS: ManifestDemand[] = [
  {
    id: '01',
    index: '01',
    category: 'Accountability',
    urgency: 'Urgent Priority',
    urgencyAccent: true,
    title: 'Immediate Public Inquiry into Administrative Complicity',
    body: 'Empower an unencumbered, fully independent special investigator with subpoena authority to interrogate supervisory oversight failures and review classified institutional memos spanning from 2018 to the present day.',
    status: 'Draft Bill In Committee',
    hasClause: true,
  },
  {
    id: '02',
    index: '02',
    category: 'Legal & Judicial',
    urgency: 'Formal Filing',
    title: 'Revocation of Immunity for Culpable Leadership',
    body: 'Eliminate qualified and discretionary executive protections shielding departmental heads from civil litigation and direct personal liabilities when deliberate non-intervention is established.',
    status: 'Constitutional Petition Filed',
    hasClause: true,
  },
  {
    id: '03',
    index: '03',
    category: 'Protection & Safety',
    urgency: 'Safety Critical',
    urgencyAccent: true,
    title: 'Establishment of Victim & Witness Escrow Fund',
    body: 'Create an independently managed restitution escrow funded by punitive institutional levies, providing uncapped psychological, medical, and legal compensation directly to impacted individuals.',
    status: 'Board Model Ratified',
  },
  {
    id: '04',
    index: '04',
    category: 'Public Disclosure',
    urgency: 'Open Records',
    title: 'Complete Unsealing of Internal Grievance Archives',
    body: 'Mandate the transparent digitisation and public release of all disciplinary filings, internal review notes, and settlements resolved behind private arbitration panels over the past decade.',
    status: 'FOIA Lawsuit Ongoing',
  },
  {
    id: '05',
    index: '05',
    category: 'Accountability',
    urgency: 'Institutional',
    title: 'Immediate Removal of Named Inculpated Officers',
    body: 'Enact binding termination and severance forfeiture for senior officials proven to have suppressed actionable allegations, altered investigatory timelines, or retaliated against internal reporters.',
    status: '4 Officials Suspended',
  },
  {
    id: '06',
    index: '06',
    category: 'Legal & Judicial',
    urgency: 'High Urgency',
    urgencyAccent: true,
    title: 'Codified Ban on Forced Arbitration & Gag Orders',
    body: 'Nullify all pre-dispute mandatory arbitration agreements that deprive complainants of their day in public trial courts, ensuring unrestricted freedom to speak candidly to press and community groups.',
    status: 'Statutory Amendment Draft',
  },
  {
    id: '07',
    index: '07',
    category: 'Protection & Safety',
    urgency: 'Survivor Support',
    title: 'Independent Community Ombudsperson Directorate',
    body: 'Institute a fully autonomous grievance ombuds office staffed exclusively by external civil society representatives, with zero structural reporting lines or budgetary dependence on the accused bodies.',
    status: 'Structural Blueprint Published',
  },
  {
    id: '08',
    index: '08',
    category: 'Public Disclosure',
    urgency: 'Annual Audit',
    title: 'Annual Third-Party Human Rights Compliance Auditing',
    body: 'Require certified external forensic human rights auditors to conduct bi-annual site evaluations, policy inspections, and unannounced inspections published publicly without executive editorial privileges.',
    status: 'Metric Framework Established',
  },
  {
    id: '09',
    index: '09',
    category: 'Accountability',
    urgency: 'Remedy',
    title: 'Formal Institutional Apology & Permanent Memorial',
    body: 'Require the Board of Trustees and highest council officers to deliver an in-person public apology accepting institutional culpability, paired with a permanent commemorative archive honoring survivor resistance.',
    status: 'Site Location Proposed',
  },
  {
    id: '10',
    index: '10',
    category: 'Legal & Judicial',
    urgency: 'Critical Reform',
    urgencyAccent: true,
    title: 'Abolition of Predatory Statute Limitations',
    body: 'Legislate immediate statutory extensions permitting time-barred survivors to initiate civil actions against systemic institutional concealment, recognizing that trauma suppresses timely legal reporting.',
    status: 'Regional Bill Sponsored',
  },
  {
    id: '11',
    index: '11',
    category: 'Protection & Safety',
    urgency: 'Safety Protocol',
    title: 'Immediate Retaliation Sanctions & Whistleblower Security',
    body: 'Implement felony-grade criminal penalties for supervisors engaging in covert blacklisting, professional harassment, or defamation campaigns directed toward witnesses and family members.',
    status: 'Protective Order Enacted',
  },
  {
    id: '12',
    index: '12',
    category: 'Public Disclosure',
    urgency: 'Final Pillar',
    title: 'Democratized Governance & Community Veto Power',
    body: 'Restructure governing charters to reserve forty percent of voting board seats for elected civilian representatives and survivor advocates, granting them decisive veto power over institutional appointments.',
    status: 'Charter Redraft Proposed',
  },
]
