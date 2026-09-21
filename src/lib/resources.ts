export const RESOURCES_PAGE_HREF = '/resources'

export const RESOURCE_FILTERS = [
  'All Resources',
  'Short emergency numbers',
  'One-stop centres',
  "Women's shelters",
  'Legal Aid',
  'Help for children',
] as const

export type ResourceFilter = (typeof RESOURCE_FILTERS)[number]

export type ResourceContact = {
  location?: string
  title: string
  subtitle?: string
  description?: string
  numbers?: string[]
  numberLabel?: string
}

export type ResourceSection = {
  id: string
  index: string
  filter: Exclude<ResourceFilter, 'All Resources'>
  title: string
  note?: string
  contacts: ResourceContact[]
}

export const RESOURCE_SECTIONS: ResourceSection[] = [
  {
    id: 'short-emergency-numbers',
    index: '01',
    filter: 'Short emergency numbers',
    title: 'Short emergency numbers (አጭር የአደጋ ጊዜ ስልክ ቁጥሮች)',
    contacts: [
      { title: 'Police', description: 'Immediate danger. A crime happening now.', numbers: ['991'] },
      { title: 'Ambulance (Ethiopian Red Cross)', description: 'Medical emergency. Transport to hospital.', numbers: ['907'] },
      { title: 'Fire Brigade', description: 'Fire.', numbers: ['939'] },
      { title: 'EWLA (Ethiopian Women Lawyers Association)', description: 'Free legal advice, counselling and referral for sexual and gender-based violence. Toll-free. The strongest single number on this sheet.', numbers: ['7711'] },
      { title: 'Marie Stopes Ethiopia', description: 'Clinic line. Reproductive health, including emergency contraception.', numbers: ['8044'] },
      { title: 'EHRC (Ethiopian Human Rights Commission)', description: 'Complaints about how a state institution treated you, including police or prosecutors refusing to record a case. Not a service line.', numbers: ['7307'] },
    ],
  },
  {
    id: 'one-stop-centres',
    index: '02',
    filter: 'One-stop centres',
    title: 'One-stop centres (የተቀናጀ (ባለብዙ) አገልግሎት ማዕከላት)',
    note: 'A doctor, police, a prosecutor and a counsellor all in one building, so a woman does not have to travel between them and repeat her account at each stop.',
    contacts: [
      { location: 'Addis Ababa', title: 'Gandhi Memorial Hospital', subtitle: 'ጋንዲ መታሰቢያ ሆስፒታል', numbers: ['+251 1155 14340', '+251 11 551 8185'] },
      { location: 'Addis Ababa', title: 'Dagmawi Menelik Hospital', subtitle: 'ዳግማዊ ምኒልክ ሆስፒታል', numbers: ['+251 1112 34272'] },
      { location: 'Addis Ababa', title: 'Bole Hospital', subtitle: 'ቦሌ ሆስፒታል', numbers: ['+251 11 155 3622'] },
      { location: 'Adama', title: 'Adama Hospital Medical College', subtitle: 'አዳማ ሆስፒታል', numbers: ['+251 22 111 2424'] },
      { location: 'Mekelle', title: 'Ayder Referral Hospital', subtitle: 'አይደር ሪፈራል ሆስፒታል', numbers: ['+251 34 441 6690'] },
    ],
  },
  {
    id: 'womens-shelters',
    index: '03',
    filter: "Women's shelters",
    title: "Women’s shelters (የሴቶች መጠለያ ማዕከላት)",
    note: 'Free temporary shelter while a court case runs, when recovery time is needed, or when going home would put you at risk again. Most take women and mothers with their children. Some also take adolescent boys. For safety reasons, only city and phone details are provided. For more information, email info@tisemaethiopia.com.',
    contacts: [
      { location: 'Addis Ababa', title: 'AWSAD', subtitle: "Association for Women's Sanctuary & Development", numbers: ['+251 11 667 2290'] },
      { location: 'Adama', title: 'AWSAD', subtitle: "Association for Women's Sanctuary & Development", numbers: ['+251 22 212 0044'] },
      { location: 'Hawassa', title: 'AWSAD', subtitle: "Association for Women's Sanctuary & Development", numbers: ['+251 46 212 0996'] },
      { location: 'Dessie', title: 'AWSAD', subtitle: "Association for Women's Sanctuary & Development", numbers: ['+251 33 312 8719'] },
      { location: 'Addis Ababa', title: 'Agar Ethiopia', subtitle: 'አጋር ኢትዮጵያ', numbers: ['+251 11 369 8073'] },
      { location: 'Addis Ababa, Bahir Dar & Adet', title: 'OPRIFS', subtitle: 'Prevention, Rehab & Integration of Female Street Children', numbers: ['+251 11 416 7084'] },
    ],
  },
  {
    id: 'legal-aid',
    index: '04',
    filter: 'Legal Aid',
    title: 'Legal Aid (የሕግ እርዳታ ቁጥሮች)',
    note: 'All free. EWLA is the main route and 7711 reaches them from anywhere in the country.',
    contacts: [
      { location: 'Addis Ababa', title: 'EWLA Head Office', subtitle: 'Ethiopian Women Lawyers Association', numbers: ['+251 11 550 9256', '+251 11 550 8759'] },
      { location: 'Adama', title: 'EWLA Adama', subtitle: 'Ethiopian Women Lawyers Association', numbers: ['+251 22 112 5340'] },
      { location: 'Bahir Dar', title: 'EWLA Bahir Dar', subtitle: 'Ethiopian Women Lawyers Association', numbers: ['+251 58 220 7396'] },
      { location: 'Hawassa', title: 'EWLA Hawassa', subtitle: 'Ethiopian Women Lawyers Association', numbers: ['+251 46 220 4800'] },
      { location: 'Dire Dawa', title: 'EWLA Dire Dawa', subtitle: 'Ethiopian Women Lawyers Association', numbers: ['+251 915 73 44 23'] },
      { location: 'Addis Ababa', title: 'EHRC Complaints Desk', subtitle: 'Ethiopian Human Rights Commission', numbers: ['7307'] },
    ],
  },
  {
    id: 'help-for-children',
    index: '05',
    filter: 'Help for children',
    title: 'Help for Children & Youth (የሕፃናትና የወጣቶች እርዳታ)',
    contacts: [
      { title: 'Child Protection Reporting Line', subtitle: 'የህፃናት ጥበቃ መስመር', description: 'Confidential hotline to report violence, severe neglect, domestic exploitation, or endangerment against children. Triggers child welfare emergency dispatch.', numbers: ['935'] },
      { title: 'Child Justice Project', subtitle: 'የህፃናት ፍትህ ፕሮጀክት', description: 'Information and case follow-up. Present in each Addis Ababa sub-city; call one of these numbers for the closest court.', numbers: ['011 156 5603', '011 126 4804', '011 126 4805'] },
      { title: 'Child Benches (የህፃናት ችሎት)', subtitle: 'Court support shield', description: 'Courts set up so a child can give evidence without being questioned directly by lawyers, with psychologists supporting. In Addis Ababa the Lideta bench covers Lideta, Kirkos, Arada, Gulele and Addis Ketema. Other sub-cities have their own. Similar services exist outside Addis Ababa.', numberLabel: 'Contact through the court' },
      { title: "Women and Children’s offices", subtitle: 'የሴቶችና ህፃናት ጉዳይ ቢሮዎች', description: 'Should be present in every kebele and woreda. Reporting here can open access to support.', numberLabel: 'Contact your local kebele or woreda administration office directly.' },
      { title: 'One-stop centres', subtitle: 'Gandhi & Menelik Hospital intakes', description: 'Both serve children as well as adults. A pediatrician is preferable where one is available.' },
      { title: 'OPRIFS', subtitle: 'For Young Girls in Acute Crisis', description: 'Prevention, rehabilitation and reintegration for girls living on the street.', numbers: ['+251 11 416 7084'] },
    ],
  },
]
