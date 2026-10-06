/**
 * Demand & Declaration page — Figma frame 180:20.
 */

import { ASK_EMPHASIS, ASK_LEAD } from './content'


export const DEMAND_PAGE_HREF = '/demand'

export const DEMAND_PAGE_TITLE = 'The Demand'

export const DEMAND_PAGE_INTRO = `${ASK_LEAD}${ASK_EMPHASIS}`
export type DemandItem = {
  id: string
  number: number
  part: string
  title: string
  demand: string
  boldLead?: string
  boldLabels?: string[]
  owner: string
  result: string
}
export const DEMAND_ITEMS: DemandItem[] = [
  {
    id: 'declaration-national-leadership',
    number: 1,
    part: 'Part I · Governance and Financing',
    title: 'Declaration and National Leadership',
    boldLead: 'We demand that violence against women and girls, including femicide and sexual violence, be declared a National Crisis requiring a whole-of-government emergency response.',
    demand: `We demand that violence against women and girls, including femicide and sexual violence, be declared a National Crisis requiring a whole-of-government emergency response. The declaration and the national response architecture it requires must be formally adopted and published through an appropriate legal instrument and placed under the personal political leadership of the Prime Minister. The instrument must establish a National Response Council, chaired by the Prime Minister, and a permanent, adequately staffed Delivery Unit, reporting directly to the Prime Minister through the Council, responsible for setting the delivery trajectory, tracking every commitment against its named owner and deadline, escalating delays, and publishing progress on a fixed cycle without pre-clearance. Existing coordination structures, including the National Coordinating Body on Violence Against Women and Children and Child Justice, are placed under the Council and retain their coordination functions. The Council and Delivery Unit must include child-safeguarding expertise and ensure that implementation standards address the distinct rights, safety and developmental needs of girls.`,
    owner: `Office of the Prime Minister and the Council of Ministers.`,
    result: `The instrument is adopted by the Council of Ministers and published in the Federal Negarit Gazeta; the National Response Council for VAWG is constituted and holds its first meeting chaired by the Prime Minister; the Delivery Unit is established with a named head, a staffing plan and a budget code.`,
  },
  {
    id: 'dedicated-transparent-financing',
    number: 2,
    part: 'Part I · Governance and Financing',
    title: 'Dedicated and Transparent Financing',
    boldLead: 'We demand that the National Crisis Response be fully costed, funded and published through a dedicated and traceable federal budget line, with corresponding regional budget lines or budget tags approved through regional budget processes.',
    demand: `We demand that the National Crisis Response be fully costed, funded and published through a dedicated and traceable federal budget line, with corresponding regional budget lines or budget tags approved through regional budget processes. The financing plan must identify allocations by institution, intervention and federal and regional level, with allocations, releases and actual expenditure published on a fixed cycle. Because the 2026/27 federal budget has already been enacted, the Council of Ministers must submit the necessary supplementary budget appropriation to the House of Peoples’ Representatives. Costing and allocations must expressly cover child-sensitive safeguarding and services for girls.

The financing plan must include an emergency allocation for safe houses and shelter services, disbursed within the first 100 days to existing providers, whether public or non-governmental, for maintenance, rehabilitation, staffing and expansion of capacity, and for the legal aid and psychosocial support delivered alongside accommodation.`,
    owner: `Ministry of Finance, jointly with the Delivery Unit; regional finance bureaus for the corresponding regional budget lines.`,
    result: `The costed financing plan is published, a dedicated federal budget programme code is created, the supplementary budget appropriation is submitted to the House of Peoples’ Representatives, and the first allocation and release report is published. The first-round release from the federal contingency reserve to named service providers and safe houses is authorised ahead of the supplementary budget, and the amount is published.`,
  },
  {
    id: 'standalone-ministry',
    number: 3,
    part: 'Part I · Governance and Financing',
    title: 'Long-Term Institutionalisation Through a Standalone Ministry',
    boldLead: 'We demand that a standalone Ministry of Women’s Empowerment and Gender Equality be established under the Executive Organs Proclamation, with its own budget code and the express authority to set government-wide standards, require institutional reporting and publish compliance findings on every federal institution’s obligations under the law.',
    demand: `We demand that a standalone Ministry of Women’s Empowerment and Gender Equality be established under the Executive Organs Proclamation, with its own budget code and the express authority to set government-wide standards, require institutional reporting and publish compliance findings on every federal institution’s obligations under the law. The Ministry must lead the costed implementation of the National Policy on Women’s Empowerment and Gender Equality and ensure that the standards, systems and gains of the National Crisis Response are incorporated into the broader gender-equality programme. Furthermore, it should, through a time-bound transition plan, become the permanent institutional home of the National Response Council’s Delivery Unit functions, capacity and systems. Its government-wide standards and compliance findings must expressly address child-safeguarding matters.`,
    owner: `Office of the Prime Minister, Ministry of Justice and the House of Peoples’ Representatives.`,
    result: `The draft Executive Organs Proclamation tabled before the House of Peoples’ Representatives contains the Ministry, its own budget code and an express powers article covering standard-setting, mandatory institutional reporting and publication of compliance findings, together with a published transition plan for the Delivery Unit functions.`,
  },
   {
    id: 'national-case-data-public-accountability',
    number: 4,
    part: 'Part II · Data, Justice and Accountability',
    title: 'National Case Data and Public Accountability',
    boldLead: 'We demand that every case of violence against women and girls reported to or recorded by police, courts, health or social services be counted under common national definitions and minimum data standards, using interoperable computer systems that prevent double-counting and protect personal data.',
    demand: `We demand that every case of violence against women and girls reported to or recorded by police, courts, health or social services be counted under common national definitions and minimum data standards, using interoperable computer systems that prevent double-counting and protect personal data. Femicide must be defined and recorded as a national statistical category, including the alleged perpetrator’s relationship to the victim and any police, military, state-security or armed-group affiliation. Each institution must record the action taken and outcome within its mandate, and every justice case must be tracked from first report to final disposition, including the reasons for delay, referral or closure at each stage. Government must publish anonymised aggregate data on a fixed schedule, disaggregated by type of violence, age, disability, displacement, geography and conflict setting. Records concerning girls must be governed by heightened confidentiality, access-control and non-identification safeguards.

Reference: UNODC and UN Women, Statistical Framework for Measuring the Gender-Related Killing of Women and Girls (Vienna, 2022), including the perpetrator–victim relationship variable at full category depth and the safety and security provider sub-categories.`,
    owner: `Ethiopian Statistical Service, jointly with the Ministry of Justice, the Federal Police Commission, the Federal Supreme Court, the Ministry of Health and the Ministry of Women and Social Affairs (MoWSA).`,
    result: `Common national definitions and a minimum data standard are issued, femicide is established as a national statistical category built to the UNODC and UN Women statistical framework, a baseline owner is named, and the first publication date is fixed and announced.`,
  },
    {
    id: 'procedural-safeguards-vawg-cases',
    number: 5,
    part: 'Part II · Data, Justice and Accountability',
    title: 'Procedural Safeguards for VAWG Cases',
    boldLead: 'We demand that, within the Criminal Procedure and Evidence Code’s 180-day period between publication and entry into force, the Government submit urgent amendments to Parliament and issue all implementing regulations and institutional directives authorised by the Code.',
    demand: `We demand that, within the Criminal Procedure and Evidence Code’s 180-day period between publication and entry into force, the Government submit urgent amendments to Parliament and issue all implementing regulations and institutional directives authorised by the Code. These measures must exclude VAWG offences within Article 159’s scope, including intimate-partner and domestic-violence offences, from reconciliation; strictly limit plea bargaining in serious VAWG cases; prevent coerced withdrawal or automatic dismissal of complaints; and prohibit the use of a survivor’s sexual history or character to infer consent or undermine credibility. They must also enforce mandatory complaint registration, require a lethality risk assessment and protective action at first report, and establish other necessary case-handling and survivor-protection safeguards, including revision of statutory reporting obligations on medical staff when treating survivors. For girls, these safeguards must include child-sensitive reporting, interviewing and representation, including independent support where a parent or caregiver is implicated.`,
    owner: `Ministry of Justice, with the Federal Police Commission and regional justice bureaus; the House of Peoples’ Representatives for the amendments.`,
    result: `The amendments excluding VAWG offences from reconciliation are submitted to Parliament, and the directives on mandatory complaint registration, lethality risk assessment at first report and limits on plea bargaining are issued and published before the Code enters into force. Immediate notice is given to police, prosecutors, the judiciary and the broader public indicating these changes to ensure compliance.`,
  },
    {
    id: 'independent-review-six-cases',
    number: 6,
    part: 'Part II · Data, Justice and Accountability',
    title: 'Independent Review of Institutional Handling of the Six Cases',
    boldLead: 'We demand an independent, legally mandated review of how police, prosecutors, courts and other public institutions handled the cases of Heaven, Keneni, Ikram, Zewdu, Liza and Sekina, examining delay, obstruction, abuse of power and improper influence at each stage from first contact to final disposition.',
    demand: `We demand an independent, legally mandated review of how police, prosecutors, courts and other public institutions handled the cases of Heaven, Keneni, Ikram, Zewdu, Liza and Sekina, examining delay, obstruction, abuse of power and improper influence at each stage from first contact to final disposition. These six are examined because enough is publicly known to reconstruct the full case pathway; they are not the only cases in which the system failed, and the review neither limits nor substitutes for any family’s right to a remedy.
The reviewing body must publish a review methodology that can be applied to other cases and findings identifying the decision points at which cases are lost. It must publish its decisions without government pre-clearance, subject to privacy, child and fair-trial safeguards, and without reconsidering any judgment. Suspected misconduct must be referred to the competent authorities, and findings on judicial conduct to the Federal Judicial Administration Council. The Delivery Unit must publish a response to every recommendation, naming an owner and a date.`,
    owner: `Council of Ministers to establish it; the Ethiopian Human Rights Commission or the Ethiopian Institution of the Ombudsman or a dedicated commission established for the purpose as its institutional home, with the last being the campaign’s preference; the Delivery Unit for the response to findings.`,
    result: `The review is established through the appropriate legal instrument, or by exercise of existing powers, with a named chair, published terms of reference, a budget, express authority to obtain police and prosecution files, and a fixed reporting date.`,
  },
    {
    id: 'disability-access-equal-protection',
    number: 7,
    part: 'Part III · Equal Protection in Every Setting',
    title: 'Disability Access and Equal Protection',
    boldLead: 'We demand a funded, binding and independently monitored disability-inclusion standard across every part of the National Crisis Response, designed and reviewed with women and girls with disabilities and their representative organisations.',  
    demand: `We demand a funded, binding and independently monitored disability-inclusion standard across every part of the National Crisis Response, designed and reviewed with women and girls with disabilities and their representative organisations. Police, courts, health services, shelters, One-Stop Centres and hotlines must provide physical access, accessible transport and communication, qualified sign-language interpretation, and all reasonable and procedural accommodations without cost or delay. Every report must be registered and assessed without discriminatory assumptions about legal capacity or credibility. No adult survivor may be required to obtain a guardian’s or caregiver’s consent, and any woman or girl whose caregiver may be the abuser must be offered independent support and a safe reporting route. Institutions must publish anonymised disability-disaggregated data on access, refusals, outcomes and compliance. Girls must receive age-appropriate communication and support consistent with their evolving capacities and best interests.`,
    owner: `MoWSA, Ministry of Health, Ministry of Justice and Federal Police Commission, designed with organisations of women and girls with disabilities.`,
    result: `The disability-inclusion standard is published as a binding directive with a costed compliance plan, and a baseline accessibility audit of designated police stations, One-Stop Centres, courts and shelters is commissioned with its reporting date fixed.`,
  },
    {
    id: 'protection-conflict-displacement-insecure-settings',
    number: 8,
    part: 'Part III · Equal Protection in Every Setting',
    title: 'Protection in Conflict, Displacement and Insecure Settings',
    boldLead: 'We demand a funded, conflict-responsive plan ensuring that women and girls affected by conflict or continuing insecurity, including those who are displaced, returning or living without functional public services, are protected and served by design, not by exception.',
    demand: `We demand a funded, conflict-responsive plan ensuring that women and girls affected by conflict or continuing insecurity, including those who are displaced, returning or living without functional public services, are protected and served by design, not by exception.

It must cover violence by all state and non-state armed actors and provide mobile and community-based services where facilities are absent, damaged or unsafe; confidential reporting and referral routes that do not require connectivity, identity documents, police presence or dangerous travel; and timely access to the same national minimum standard of care, protection and legal assistance. The plan must name responsible federal and regional institutions, identify priority coverage gaps, and set budgets, targets and public reporting deadlines. For girls, reporting and access to care must not depend on the presence or consent of a parent or caregiver who may be implicated in the harm.`,
    owner: `The Delivery Unit with MoWSA, the Ministry of Health, the Ministry of Justice and the relevant regional bureaus.`,
    result: `A coverage map identifying priority gaps is published with named responsible institutions, and the mobile and community-based service package is costed with first-phase deployment funded and dated.`,
  },
    {
    id: 'comprehensive-vawg-femicide-legal-reform',
    number: 9,
    part: 'Part IV · Law, Prevention and Survivor Support',
    title: 'Comprehensive VAWG and Femicide Legal Reform',
    boldLead: 'We demand the enactment of a comprehensive law on violence against women and girls, accompanied by targeted amendments to the Criminal Code. The reforms must expressly define and recognise femicide in criminal law and national statistics guidelines.',
    demand: `We demand the enactment of a comprehensive law on violence against women and girls, accompanied by targeted amendments to the Criminal Code. The reforms must expressly define and recognise femicide in criminal law and national statistics guidelines. They must also define sexual offences by the absence of consent; comprehensively prohibit intimate-partner and domestic violence, including coercive control, stalking and technology-facilitated abuse; remove discriminatory defences, mitigation and sentencing rules that excuse violence on grounds such as jealousy, alleged infidelity, separation, family honour or a woman’s exercise of autonomy; and ensure proportionate offences and penalties for harmful practices and sexual violence against children.

The reforms must also establish free, same-day emergency protection orders, available without a prior criminal complaint and recognised and enforceable across federal and regional jurisdictions. The comprehensive law must provide child-sensitive protection and justice procedures, including where a parent, caregiver or authority figure is implicated.`,
    owner: `Ministry of Justice, in consultation with the National Response Council for VAWG, and the House of Peoples’ Representatives.`,
    result: `A published drafting mandate and timetable are issued, and a first draft of the comprehensive law and the accompanying Criminal Code amendments, including the femicide definition and the emergency protection order, is released for public consultation.`,
  },
    {
    id: 'health-safety-survivor-care',
    number: 10,
    part: 'Part IV · Law, Prevention and Survivor Support',
    title: 'Health and Safety: Survivor Care and Time-Critical Treatment',
    boldLead: 'We demand the adoption, through an appropriate legal instrument, and full funding of a binding national minimum package of free, confidential, survivor-centred care for every woman and girl, wherever she lives and without requiring a prior police report.',
    boldLabels: ['Time-critical care:', 'Continuing care:'],
    demand: `We demand the adoption, through an appropriate legal instrument, and full funding of a binding national minimum package of free, confidential, survivor-centred care for every woman and girl, wherever she lives and without requiring a prior police report.

Time-critical care: Every designated facility must provide 24-hour post-rape care, including emergency contraception, HIV post-exposure prophylaxis, treatment of sexually transmitted infections and injuries, and, at the same visit, a consent-based medical-forensic examination on a uniform national form under chain-of-custody rules that preserve her option to report later. Any statutory reporting obligation must be disclosed to her before she consents, and no report may be made to police beyond what the law expressly requires.

Continuing care: The package must guarantee emergency transport and protection, psychosocial support, legal assistance, safe shelter, case management and emergency material support for survivors and their dependent children; set maximum response times and geographic coverage requirements, including rural, disability-accessible, child-sensitive and conflict-responsive delivery; and fund a toll-free multilingual national hotline connected to verified local services. Access may not be conditional on identity or travel documents, proof of address, employment status or an employer’s consent. For children, care must not be denied or delayed because a parent or guardian is absent or implicated.`,
    owner: `Ministry of Health and regional health bureaus, with the Ministry of Justice on medico-legal and evidence standards, for time-critical care; MoWSA, with the Ministry of Health and regional bureaus, for continuing care. Ethio telecom, the Ministry of Finance, the Ministry of Justice and the Ministry of Health on the toll-free hotline.`,
    result: `The facility and travel-time coverage map is published with gaps costed, the uniform medico-legal form and evidence protocol are issued for mandatory national use, and a joint Ministry of Justice and Ministry of Health directive clarifies the scope of the reporting obligation under the Criminal Procedure Code as it applies to health providers. A named list of facilities verified as stocked with emergency contraception and HIV post-exposure prophylaxis and staffed at night is published with addresses and telephone numbers. The minimum package is adopted and published as a binding instrument with response times and coverage requirements, costed by region, and, most importantly, the hotline is funded and set to be operational with its operator and service standard named. Until the new national hotline goes live, the government should, at the start of the 100-day period, strengthen an existing hotline that serves women and girls and is currently working at capacity, by using emergency funding.`,
  },
    {
    id: 'prevention-education-fgm-child-marriage',
    number: 11,
    part: 'Part IV · Law, Prevention and Survivor Support',
    title: 'Prevention Education: Conduct Non-Violence Education and End FGM (Female Genital Mutilation) and Child Marriage',
    boldLead: 'We demand a funded, system-wide programme of VAWG prevention and education that reaches society as a whole: women and men, girls and boys, caregivers, educators, and community and religious leaders.',
    demand: `We demand a funded, system-wide programme of VAWG prevention and education that reaches society as a whole: women and men, girls and boys, caregivers, educators, and community and religious leaders. It must be delivered both inside and outside the education system, so that no girl is missed because she is out of school. Age-appropriate, evidence-based education on equality, bodily autonomy, consent, respectful relationships and non-violence must be integrated into curricula and into educator training curricula across all public and private schools, teacher-training institutions, TVET institutions and universities. Every educational institution must enforce safeguarding and sexual-harassment standards covering staff and students and provide safe and confidential reporting and referral channels with access to external escalation.

The programme must expressly address FGM and child marriage, delivered through health extension workers, community structures and religious and community leaders so that it reaches caregivers of girls below school age and girls who are out of school, displaced or living beyond the reach of services. It must prohibit the medicalisation of FGM, and fund a successor for the National Costed Roadmap to End Child Marriage and FGM with targets in the highest-prevalence regions.`,
    owner: `Ministry of Education, with the Ministry of Health for community and health extension delivery, MoWSA for the roadmap, the Ministry of Labour and Skills for TVET, and the regional education and health bureaus.`,
    result: `The end-line evaluation of the National Costed Roadmap to End Child Marriage and FGM is published, and a costed and funded successor roadmap informed by its findings is adopted, or its status and a fixed adoption date are disclosed. An action plan for curriculum and educator-training revision is adopted. A first round of pilot prevention-education training is conducted at each level of educational institution in a representative sample of institutions.`,
  },
    {
    id: 'sexual-harassment-exploitation-work-education',
    number: 12,
    part: 'Part IV · Law, Prevention and Survivor Support',
    title: 'Sexual Harassment and Exploitation at Work and in Education',
    boldLead: 'We demand comprehensive legislation on sexual harassment and exploitation covering employment and education in both the public and private sectors, together with initiating the ratification of ILO Convention 190 and its incorporation into domestic law.',
    demand: `We demand comprehensive legislation on sexual harassment and exploitation covering employment and education in both the public and private sectors, together with initiating the ratification of ILO Convention 190 and its incorporation into domestic law.

The law must define sexual harassment to include both conditional and hostile-environment conduct, whether occurring once or repeatedly, and place an enforceable duty on every employer and every educational institution to prevent it. That duty must include maintaining a published policy, investigating complaints and protecting complainants and witnesses from retaliation, with reinstatement and compensation as available remedies.

It must cover the full world of work as defined in Convention 190, including employer-provided accommodation and transport, and apply irrespective of contract, documentation or immigration status, reaching seasonal and agency-supplied workers, horticulture, agro-industry and industrial parks, and informal, domestic and live-in employment. Where a worker is supplied through a private employment agency, the agency and the user enterprise must be jointly liable. Returning migrant worker survivors must have access to the care set out in Demand 10.

Every workplace and educational institution must operate a confidential reporting channel with a route of escalation independent of the institution, available where the person complained of holds authority over the complainant’s employment, grades, residence, wages or documents. Where the complainant is a child, child-safeguarding procedures and independent support must apply. Institutions must report anonymised compliance and outcome data annually, and the government must publish which institutions have complied and which have not against a national scorecard.`,
    owner: `Ministry of Labour and Skills, with the Ministry of Justice on the legislation and the Ministry of Education for educational institutions; the Council of Ministers for the personal services Regulation; the House of Peoples’ Representatives for ratification and enactment.`,
    result: `A draft ratification proclamation for ILO Convention No. 190 is submitted to the House of Peoples' Representatives. Pending enactment of the sexual harassment law, two immediate measures are taken. Draft amendments to Articles 2(11) and 2(12) of the Labour Proclamation No. 1156/2019, which only address the solicitation of sexual favours and leave hostile-environment conduct outside the law, are prepared to the standard of Convention 190 and tabled. The Council of Ministers issues the Regulation on conditions of work in personal services required by Article 3(3)(c), so that the domestic and live-in workers excluded by Article 3(2)(d) are protected while the new legislation is prepared. These are in addition to the directive issued by the Ministry of Labour and Skills under Immediate Actions in the First 30 Days. Every federal public institution, higher education institution and industrial park operator has published a policy, named a focal point and established an external escalation route.`,
  },
  ]

export const DEMAND_BRIEF_CARDS: {
  id: string
  title: string
  body: string
  href?: string
}[] = []

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
  export const DEMAND_ABBREVIATIONS = [
  { abbreviation: 'VAWG', meaning: 'Violence Against Women and Girls' },
  { abbreviation: 'FGM', meaning: 'Female Genital Mutilation' },
  { abbreviation: 'CEDAW', meaning: 'Convention on the Elimination of All Forms of Discrimination Against Women' },
  { abbreviation: 'GBV', meaning: 'Gender-Based Violence' },
  { abbreviation: 'SOPs', meaning: 'Standard Operating Procedures' },
  { abbreviation: 'ILO', meaning: 'International Labour Organization' },
  { abbreviation: 'GDP', meaning: 'Gross Domestic Product' },
  { abbreviation: 'MoWSA', meaning: 'Ministry of Women and Social Affairs' },
  { abbreviation: 'UNODC', meaning: 'United Nations Office on Drugs and Crime' },
  { abbreviation: 'UN', meaning: 'United Nations' },
  { abbreviation: 'HIV', meaning: 'Human Immunodeficiency Virus' },
  { abbreviation: 'TVET', meaning: 'Technical and Vocational Education and Training' },
  { abbreviation: 'No.', meaning: 'Number'
  },
]
