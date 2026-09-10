/**
 * FAQ page — content from public/tisema_faq.docx.
 * Layout follows Figma frame 201:1346.
 */

export const FAQ_PAGE_HREF = '/faq'

export const FAQ_PAGE_TITLE = 'Frequently Asked Questions'

export const FAQ_PAGE_INTRO =
  'Why violence against women and girls in Ethiopia must be treated as a National Crisis'

export const FAQ_SEARCH_PLACEHOLDER =
  'Search questions, keywords (e.g., logo, funding, legal demands)...'

export type FaqTopic =
  | 'All'
  | 'About #Tisema & The Brand'
  | 'The Demands & Justice'
  | 'How to Take Action'
  | 'Government & Authority'

export const FAQ_TOPICS: FaqTopic[] = [
  'All',
  'About #Tisema & The Brand',
  'The Demands & Justice',
  'Government & Authority',
  'How to Take Action',
]

export type FaqBrandCard = { title: string; body: string }

export type FaqItem = {
  id: string
  index: string
  topic: Exclude<FaqTopic, 'All'>
  category: string
  categoryTitle: string
  tag: string
  question: string
  answer?: string
  brandCards?: FaqBrandCard[]
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

const RAW: Array<Omit<FaqItem, 'id' | 'index'>> = [
  {
    topic: 'About #Tisema & The Brand',
    category: 'CATEGORY 01',
    categoryTitle: 'About #Tisema & The Brand',
    tag: 'BRAND & MEANING',
    question: 'What is #ትሰማ? What does the logo and colors represent?',
    answer:
      '#ትሰማ (Tisema) means “Let her be heard.” Tisema is a public advocacy campaign calling on the Ethiopian government to recognize and respond to violence against women and girls as a National Crisis. The campaign grew from repeated cases in which women and girls were killed, raped, assaulted or abused, public outrage followed, and attention later disappeared until another woman’s name became a national conversation. Tisema asks Ethiopia to stop responding only case by case and begin responding to the pattern itself.\n\nEvery element in the logo carries a part of the demand.',
    brandCards: [
      {
        title: 'The Name',
        body: 'ትሰማ, Tisema, means let her be heard. It is set in Ethiopic and in Latin script together, because the demand belongs to Ethiopians first and still has to travel beyond us.',
      },
      {
        title: 'The Amharic hashtag',
        body: '#ትሰማ! is the main organising hashtag. We also use the corresponding terms in English, Afaan Oromo, Tigrigna and many other local and international languages. In addition, we use #HearUs and #በቃን! as secondary hashtags.',
      },
      {
        title: 'The Face',
        body: 'A woman in profile, unnamed and unidentifiable, cut into the palm as negative space, not drawn. She is deliberately not an image of injury or a recognisable face. She is not one particular woman. She could be anyone in this country, and she is facing forward rather than turning away. The profile is built to be adapted across social media, so the campaign is never represented by a single kind of woman.',
      },
      {
        title: 'The Hand',
        body: 'Open and raised. A raised hand asks for abuse and injustice to STOP, demands to be heard and asks to be counted. And it does all three unapologetically. The print of one’s hand is also the oldest mark a person leaves behind to say that she was here.',
      },
      {
        title: 'Oxblood (Deep Red)',
        body: 'This colour represents what has been lost and is still not being counted. It is the colour of grief that confronts what caused it, because we believe that only what is faced can be changed.',
      },
      {
        title: 'Lime (Green)',
        body: 'This is the color of what is still possible. All that we aim for. It is the colour of new growth, of the first shoots breaking through the ground. This campaign is not only remembrance. It is a demand for change.',
      },
    ],
  },
  {
    topic: 'About #Tisema & The Brand',
    category: 'CATEGORY 01',
    categoryTitle: 'About #Tisema & The Brand',
    tag: 'NONPARTISAN',
    question:
      'Is Tisema anti-government or affiliated with an opposition party?',
    answer:
      'No. Tisema identifies itself as nonpartisan. It has no party affiliation, and its demand is addressed to whoever holds executive office. Holding public institutions accountable for protecting women and girls is not the same as supporting or opposing a political party.\n\nTisema is run by volunteers from different walks of life and skill sets brought together by the singular desire to see the elimination of VAW in Ethiopia and amplify the voices of victims and survivors.',
  },
  {
    topic: 'About #Tisema & The Brand',
    category: 'CATEGORY 01',
    categoryTitle: 'About #Tisema & The Brand',
    tag: 'SCOPE',
    question: 'Is Tisema only about femicide?',
    answer:
      'No. Femicide is part of the campaign, but the demand explicitly covers violence against women and girls, including femicide and sexual violence. The broader concern includes intimate partner violence and the institutional systems responsible for prevention, protection, investigation, prosecution, health response and survivor support. Individual cases helped ignite the movement; the campaign’s purpose is to address the system connecting those cases.',
  },
  {
    topic: 'The Demands & Justice',
    category: 'CATEGORY 02',
    categoryTitle: 'The Demand & National Crisis',
    tag: 'THE ASK',
    question: 'What exactly is Tisema demanding?',
    answer:
      'One central demand:\n\nWe demand that violence against women and girls, including femicide and sexual violence, be declared a National Crisis requiring a whole-of-government emergency response.\n\nA declaration alone is not enough. A meaningful declaration must create actual government machinery: high-level ownership, dedicated resources, measurable deadlines, data collection and public accountability.',
  },
  {
    topic: 'The Demands & Justice',
    category: 'CATEGORY 02',
    categoryTitle: 'The Demand & National Crisis',
    tag: 'WHY A CRISIS',
    question:
      'Why does Tisema consider violence against women and girls a National Crisis?',
    answer:
      'Because the problem is national in scale, persistent, harmful and institutionally fragmented.\n\nWidespread. One in three ever-married Ethiopian women (31.4 per cent) report physical, sexual or emotional violence from a partner. Nearly three in four of them told no one and sought no help. The 2016 survey found roughly the same share, so a decade of policy has not moved the number. This is the disclosed figure, gathered while parts of the country were at war and while most people treat such violence as private. The true figure is higher.\n\nSerious and irreversible. In Addis Ababa and Dire Dawa, the only places where it has been measured, the number of women killed rose by about 45 per cent over roughly four years while the number of men killed fell by 24 per cent. Women went from 11 per cent of intentional homicide victims to 19 per cent. Six in ten of the women killed met the UN statistical definition of femicide, a conservative count that includes only cases with enough recorded detail to classify. Half of those were killed by an intimate partner; almost nine in ten of that group died at home.\n\nOutrunning capacity. The number of people needing protection from gender-based violence rose from 5.8 million to 7.2 million in two years; 45 per cent were children, 44 per cent women, 17.6 per cent people with a disability. Over the same period the organisations able to respond fell from 76 to 48, and their woreda reach shrank with them. More people need help each year, and fewer places exist to provide it.\n\nNo single institution can solve it. A case passes through police, prosecutors, courts, health facilities, social workers and regional administrations. No one of them controls the outcome. There is no standard definition of femicide across their records, no system linking a police report to a court file to a case outcome, no national map of services, and no office answerable for the whole. A survivor can vanish between three institutions and no record will show that she did.\n\nThere is a fifth feature that belongs on this list because it is the one governments most respect. Intimate partner violence alone costs Ethiopia an estimated 1.21 per cent of GDP every year, before counting female genital mutilation, child marriage or non-partner rape. A recurring loss of that size in any other sector would already have an owner.\n\nThe argument is therefore not simply, “There are many cases, so this is a crisis.” It is that violence is widespread, persistent and sometimes lethal; it creates national social and economic costs; and the institutions responsible for prevention, protection, prosecution, health, data and survivor support remain fragmented. That combination makes the problem national and systemic.',
  },
  {
    topic: 'The Demands & Justice',
    category: 'CATEGORY 02',
    categoryTitle: 'The Demand & National Crisis',
    tag: 'NOT ARTICLE 93',
    question:
      'Does “National Crisis” mean Ethiopia must declare a constitutional State of Emergency?',
    answer:
      'No. Tisema is not calling for a State of Emergency under Article 93 of the Constitution. A constitutional State of Emergency involves extraordinary governmental powers and can involve limitations on rights. Tisema is asking for state capacity to be mobilized to protect the existing rights and safety of women and girls. “National Crisis” is being used as a political and administrative designation requiring priority, coordination, resources and accountability, not as a request to suspend constitutional rights.',
  },
  {
    topic: 'The Demands & Justice',
    category: 'CATEGORY 02',
    categoryTitle: 'The Demand & National Crisis',
    tag: 'LEGAL STATUS',
    question:
      'Is “National Crisis” a special legal status already defined in Ethiopian law?',
    answer:
      'Tisema is not claiming that “National Crisis” is a separate constitutional category equivalent to an Article 93 State of Emergency. The campaign’s position is that government does not need a new constitutional emergency power merely to prioritize an issue, coordinate ministries, assign senior political responsibility, establish administrative structures, allocate resources, set targets and publicly report progress. The demand is fundamentally about using existing executive capacity.',
  },
  {
    topic: 'The Demands & Justice',
    category: 'CATEGORY 02',
    categoryTitle: 'The Demand & National Crisis',
    tag: 'WHAT CHANGES',
    question: 'What would calling it a National Crisis do?',
    answer:
      'Names change what institutions do. When something is a crisis, four things follow that do not follow from a policy or a strategy document.\n\nIt creates an owner above the ministries. The Ministry of Women and Social Affairs can issue directives within its own sector. It holds no authority over Justice, Health, the Police, Education or Finance, which sit at equal rank. A crisis designation puts coordination at Deputy Prime Minister level or above, where cooperation can be required rather than requested.\n\nIt opens a budget line. Crisis responses are funded through visible, traceable allocations, not reallocations inside an existing envelope. That is the difference between a programme that can be tracked and one that can be quietly starved.\n\nIt sets a deadline. Emergencies have dates: when the council convenes, when the first report is published, when services must be operating. A policy has a horizon. A crisis has a calendar.\n\nIt makes the pattern official. The state currently treats each killing as an isolated incident. A declaration is the state saying, on the record, that these deaths are one phenomenon. That is what allows femicide to be defined, counted and published, which is what allows every later question to be answered with data instead of denial.\n\nThe broader framework also calls for improved national case tracking and a survivor guarantee that reaches rural woredas, conflict-affected communities and displaced populations. Without implementation machinery, a declaration risks becoming a press release rather than a response.',
  },
  {
    topic: 'The Demands & Justice',
    category: 'CATEGORY 02',
    categoryTitle: 'The Demand & National Crisis',
    tag: 'LANGUAGE',
    question: 'Why use the word “crisis”? Isn’t that exaggerated?',
    answer:
      'A crisis does not require every woman to be experiencing violence, nor does it have to appear suddenly. A persistent condition can warrant crisis-level action when its scale is large, consequences are severe, institutional responses remain inadequate and fragmented ordinary approaches repeatedly fail to produce sufficient change. “National Crisis” describes the required level of response as much as the severity of the problem.',
  },
  {
    topic: 'The Demands & Justice',
    category: 'CATEGORY 02',
    categoryTitle: 'The Demand & National Crisis',
    tag: 'WHOLE OF GOVERNMENT',
    question: 'What does “whole-of-government response” actually mean?',
    answer:
      'It means violence against women cannot be delegated to one office and forgotten. Relevant institutions must operate toward one national objective, with clearly assigned responsibilities, common targets and a senior coordinating authority capable of demanding results. Police cannot solve the health-service problem. Hospitals cannot prosecute offenders. Courts cannot independently create prevention programs. A whole-of-government response connects those responsibilities.',
  },
  {
    topic: 'Government & Authority',
    category: 'CATEGORY 03',
    categoryTitle: 'Authority & Delivery',
    tag: 'WHO ACTS',
    question: 'Who has the authority to act?',
    answer:
      'At the federal executive level, responsibility ultimately reaches the Prime Minister and Council of Ministers. The campaign points to the Constitution’s allocation of federal executive authority and to the Prime Minister’s leadership and coordination role. The Deputy Prime Minister can also perform responsibilities entrusted by the Prime Minister. Tisema therefore directs its central demand to the executive rather than treating gender-based violence as the responsibility of a single ministry.',
  },
  {
    topic: 'Government & Authority',
    category: 'CATEGORY 03',
    categoryTitle: 'Authority & Delivery',
    tag: 'WHY NOT ONE MINISTRY',
    question: 'Why can’t the ministry responsible for women simply handle this?',
    answer:
      'Because violence against women and girls crosses institutional boundaries. A survivor may encounter police, prosecutors, courts, hospitals, social services, schools and local administrations. No single line ministry controls all of them. Tisema therefore asks for ownership above line-ministry level, capable of coordinating the entire system.',
  },
  {
    topic: 'Government & Authority',
    category: 'CATEGORY 03',
    categoryTitle: 'Authority & Delivery',
    tag: 'EXISTING WORK',
    question:
      'How is this different from what the government is already doing?',
    answer:
      'Ethiopia is not short of policies or strategies. There are policies, strategies, a coordinating body for gender-based violence, a national roadmap on child marriage and female genital mutilation, one-stop centers in some cities, and a new National Policy on Women\'s Empowerment and Gender Equality approved in May 2026. Each is real. None of them has the features that make a response answerable.\n\nThe current pattern after each publicized killing is the same: a statement, sometimes a task force, an awareness campaign, and then silence until the next name. A task force is the reflex of a government that has been asked a question it does not want to own. The test we apply to any response is simple: who is the named person, what is the budget line, when does the public see the first report, and by what date must services be running. If those four cannot be answered, it is a press release.\n\nThe difference is not effort or good intentions. It is architecture. The Seqota Declaration on stunting has a federal delivery unit, a treasury allocation, nine sector ministries working to one plan, and coordinating bodies replicated to woreda level. Violence against women and girls has a directorate.',
  },
  {
    topic: 'Government & Authority',
    category: 'CATEGORY 03',
    categoryTitle: 'Authority & Delivery',
    tag: 'BUDGET',
    question: 'Why is a dedicated budget so important?',
    answer:
      'It is important because a policy without resources cannot protect anyone. Police, health facilities, survivor services, prosecutors, courts, prevention programs and data systems all require staff, infrastructure and funding. Tisema asks for identifiable funding on a traceable budget line so the public can ask what was promised, what was funded, what was spent and what changed.',
  },
  {
    topic: 'Government & Authority',
    category: 'CATEGORY 03',
    categoryTitle: 'Authority & Delivery',
    tag: 'DATA & REPORTING',
    question: 'Why does Tisema demand public reporting and data?',
    answer:
      'We demand public reporting because government cannot effectively manage what it cannot consistently count and follow. The campaign identifies fragmented police, court and case documentation as a major weakness. Public reporting would make it possible to track reports, investigations, prosecutions, case timelines, survivor services, allocated resources and whether national targets are being met.',
  },
  {
    topic: 'Government & Authority',
    category: 'CATEGORY 03',
    categoryTitle: 'Authority & Delivery',
    tag: 'FEASIBILITY',
    question:
      'Is this kind of whole-of-government approach unrealistic for Ethiopia?',
    answer:
      'No. Tisema points to the Seqota Declaration on stunting as evidence that Ethiopia has previously built a phased roadmap, delivery structures, treasury allocation and multisectoral coordination for a national priority. The comparison is institutional, not substantive: GBV and childhood stunting are different problems. The point is that the architecture and administrative practice for high-level, multisectoral national action already exist.',
  },
  {
    topic: 'Government & Authority',
    category: 'CATEGORY 03',
    categoryTitle: 'Authority & Delivery',
    tag: 'POLICY VS DELIVERY',
    question: 'Is Tisema asking the government to create entirely new policies?',
    answer:
      'Not primarily. The campaign argues that Ethiopia already has policies, strategies and commitments relating to women’s rights and gender equality. The missing piece is delivery machinery: who owns implementation, who coordinates ministries, what money is allocated, what deadline exists, what is measured and who must publicly answer when targets are missed. The demand is not simply for another document. It is for implementation.',
  },
  {
    topic: 'Government & Authority',
    category: 'CATEGORY 03',
    categoryTitle: 'Authority & Delivery',
    tag: 'SUCCESS',
    question: 'What would success look like?',
    answer:
      'Success is not simply the Prime Minister saying the words “National Crisis.” Success means a senior accountable authority exists; money can be traced; cases can be followed through the system; survivor services reach communities beyond major cities; ministries have defined responsibilities; deadlines exist; progress is published; and the public can determine whether commitments were actually delivered.',
  },
  {
    topic: 'How to Take Action',
    category: 'CATEGORY 04',
    categoryTitle: 'Taking Action',
    tag: 'WHY NOW',
    question:
      'Ethiopia already faces conflict, displacement, poverty and other crises. Why prioritize this now?',
    answer:
      'It is very true that Ethiopia faces many crises. And it is also true that when it comes to women and children these crises are compounding not only competing for priority. Women and girls face the brunt of any crisis we can think of. Be it armed conflict and its aftermath in several regions, displacement or drought and food insecurity, inflation that has hollowed out household incomes. All of these land the hardest on marginalized groups and women and girls are often at the very bottom, with exacerbated circumstances for women and children with disabilities.\n\nNone of these is an argument for waiting; it is in fact the urgent case for action because each one is a multiplier of violence against women and girls.\n\nConflict brings sexual violence as a weapon and dismantles the police and courts that would answer it. Displacement removes women from every protective relationship they had. Food insecurity pushes girls into early marriage and women into exploitation. Inflation traps women in violent households they cannot afford to leave. The 7.2 million people needing protection from gender-based violence are not separate from the other crises. They are produced by them. So Tisema is stating that addressing VAW will not delay the implementation of work for the other issues — in fact it will accelerate them. This work will also have economic implication in that if addressed successfully Ethiopia will avoid the loss of 1.2% of its GDP each year due to VAW.',
  },
  {
    topic: 'How to Take Action',
    category: 'CATEGORY 04',
    categoryTitle: 'Taking Action',
    tag: 'BEYOND SENTENCING',
    question: 'Why not just campaign for harsher sentences?',
    answer:
      'Because punishment after violence occurs addresses only one part of the problem. A national response must also address prevention, reporting, investigation, evidence preservation, survivor protection, health care, prosecution, case tracking, institutional accountability and long-term prevention. Tisema therefore focuses on the system, not simply punishment.',
  },
  {
    topic: 'How to Take Action',
    category: 'CATEGORY 04',
    categoryTitle: 'Taking Action',
    tag: 'HOW TO HELP',
    question: 'What can ordinary people do?',
    answer:
      'Supporters can endorse the demand, sign the petition, carry its wording consistently, share accurate information, and take the demand to officials and institutions capable of acting. Signing does not mean endorsing a political party or demanding a constitutional State of Emergency. It means supporting a coordinated National Crisis response to violence against women and girls, backed by accountable leadership, resources, measurable delivery and public reporting.',
  },
]

export const FAQ_ITEMS: FaqItem[] = RAW.map((item, i) => ({
  ...item,
  id: `q${i + 1}`,
  index: pad(i + 1),
}))
