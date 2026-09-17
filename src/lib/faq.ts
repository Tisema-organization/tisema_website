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
  | 'About #Tisema'
  | 'The Demands & Justice'
  | 'How to Take Action'
  | 'Government & Authority'

export const FAQ_TOPICS: FaqTopic[] = [
  'All',
  'About #Tisema',
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
  tag?: string
  question: string
  answer?: string
  brandCards?: FaqBrandCard[]
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

const RAW: Array<Omit<FaqItem, 'id' | 'index'>> = [
  {
    topic: 'About #Tisema',
    category: 'CATEGORY 01',
    categoryTitle: 'About #Tisema',
    question: 'What is #ትሰማ? What do the logo and colors represent?',
    answer:
      '#ትሰማ! (Tisema) means “Let her be heard.” Tisema is a public advocacy campaign calling on the Ethiopian government to recognize and respond to violence against women and girls as a National Crisis. The campaign grew from repeated cases in which women and girls were killed, raped, assaulted or abused, public outrage followed, and attention later disappeared until another woman’s name became a national conversation. Tisema asks Ethiopia to stop responding only case by case and begin responding to the pattern itself.\n\nEvery element in the logo carries a part of the demand.',
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
    topic: 'About #Tisema',
    category: 'CATEGORY 01',
    categoryTitle: 'About #Tisema',
    question:
      'What is the political standing of Tisema? Is it anti or pro government?',
    answer:
      'Tisema is nonpartisan. It has no political or party affiliations, and its demands are addressed to whoever holds executive office. Holding public institutions accountable for protecting women and girls is not the same as supporting or opposing any political party.\n\nFurthermore, Tisema is initiated and run by volunteers from different walks of life and skill sets brought together by the singular desire to see the elimination of VAW in Ethiopia and amplify the voices of victims and survivors.',
  },
  {
    topic: 'The Demands & Justice',
    category: 'CATEGORY 02',
    categoryTitle: 'The Demands & Justice',
    question: "What exactly is Tisema demanding? And what would success look like?",
    answer: "We have one core demand and 12 detailed demands that follow from that. Our Core demand is:  We demand that violence against women and girls, including femicide and sexual violence, be declared a National Crisis requiring a whole-of-government emergency response. A press statement on the matter alone is not enough, it has been done before. What we ask for is a declaration with the appropriate legal instrument indicating clear political will to change the current VAWG reality in Ethiopia; high-level leadership above ministerial line that creates the response machinery including a coordinating body and delivery unit, dedicated federal level resources, measurable deadlines and mechanisms for public accountability.\nThe ultimate victory is waking up in an Ethiopia that is safe for women and girls and all its citizens. Until then, we will take success day by day and so far, it has been great to witness the impact of the social media campaign, the incredible response to the petition and everyone taking #Tisema as their own.  It is inspiring and encouraging. The next goal is to turn this support into a consistent base for advocacy, learning and articulating our demands until they are addressed.\n(See our National Crisis Declaration brief for more)",
  },
  {
    topic: 'The Demands & Justice',
    category: 'CATEGORY 02',
    categoryTitle: 'The Demands & Justice',
    question: "Why does Tisema consider violence against women and girls (VAWG) a National Crisis? And what would calling it a national crisis bring?",
    answer: "Because the problem is national in scale, persistent, harmful and institutionally fragmented.\nWidespread. One in three ever-married Ethiopian women has experienced violence from her partner, that is 31.4 % according to the Ethiopian Demographic and Health Survey of 2024–25. Nearly 3 in 4 of them told no one and received no support. That is the disclosed figure, gathered while parts of the country were at war and most of the public regarded (still does) the matter as private. Whatever the true number is, it is higher than this one.\nSerious and irreversible. The number of women killed rose by 45% in about four years while the number of men killed fell by 24%. Women went from 11% of all intentional homicide victims to 19%. And 60% of the women killed were classified as femicides; half of those were killed by an intimate partner, and 88% of that group died in their own homes. This data is for Addis Ababa and Dire Dawa, the only places in Ethiopia where this has ever been measured.\nNeeds are rising, capacity is collapsing: the number of people needing protection from gender-based violence rose from 5.8 million to 7.2 million in two years.[1] Of these 45% children, 44% women, 17.6% with a disability. In that time the number of organisations able to respond went from 76 to 48  and their woreda level reach shrank with them.[2] More people need help each year, and fewer places exist to provide it.\nAt this point no single institution can solve it. A case passes through police, prosecutors, courts, health facilities, social workers and regional administrations. They don’t determine the outcome alone. There is no standard definition of femicide across their records, no system linking a police report to a court file to a case outcome, no national map of services, and no office answerable for the whole. A survivor can vanish between three institutions, and no record will show that she did.\nCost: this is the concern that governments most care about and contains a fact that the public should also know about. Intimate partner violence alone costs Ethiopia an estimated 1.21 per cent of GDP every year, before counting female genital mutilation, child marriage or non-partner rape.5 A recurring loss of that size in any other sector would already have an owner and means to address it.\nThe argument is therefore not simply, “There are many cases, so this is a crisis.” It is that violence is widespread, persistent and lethal; it creates national social and economic costs; and the institutions responsible for prevention, protection, prosecution, health, data and survivor support remain fragmented. That combination makes the problem national and systemic. A problem this size with no owner, no map and no through-line from report to resolution is not a gap. It is what a crisis looks like in administrative terms.\n\nA declaration would then mean the following:\n●  \tRecognition. Violence against women and girls clearly recognized a national crisis by the executive, and femicide, named and counted under one standard definition applied across police, prosecution and court records.\n●  \tOwnership. A coordinating National Crisis Response Council, owned above line-ministry level, with a delivery unit and a multi-ministry steering committee, both reporting through public scorecards.\n●  \tResourcing. Funds earmarked on a traceable federal-level budget line, rather than a reallocation inside an existing envelope.\n●  \tCounting. Publication of the detailed and disaggregated data government already holds (EDHS 2024/25) and nationwide tracking of VAW cases through coordinated data-sharing mechanisms.\n●  \tReach. A survivor guarantee that reaches down to rural woreda and kebele level, including in conflict-affected areas and displaced communities, and that reaches women and girls with disabilities. Alongside it, prevention work in schools and workplaces.\n●  \tDeadline. A date by which the response must be operating, not merely announced: the Council convened, the budget line opened, the first public report published. A declaration with no date is an announcement, not a response.\nSources: ACAPS / GBV AoR, Ethiopia gender-based violence secondary data review report 2024, 15 July 2025. OCHA HNO via ACAPS/GBV AoR, July 2025.",
  },
  {
    topic: 'The Demands & Justice',
    category: 'CATEGORY 02',
    categoryTitle: 'The Demands & Justice',
    question: "Is this campaign about femicide only? And what does femicide even mean, is it just another word for murder?",
    answer: "No it is not but it is highlighting the importance of naming a specific type of death Ethiopian women are dying. And Femicide is a type of killing, not a stronger word for killing. Our demand explicitly covers violence against women and girls, including femicide and sexual violence. The broader concern includes intimate partner violence and the institutional systems responsible for prevention, protection, investigation, prosecution, health response and survivor support. Individual cases helped ignite the movement and the campaign’s purpose is to address the system connecting those cases.\nOn Femicide: every femicide is a homicide but not every homicide of a woman is a femicide. Whether a killing counts as femicide depends on the relationship between the killer and the woman, or on the circumstances of her death. A woman killed in an armed robbery is a homicide victim. A woman killed by the husband she was trying to leave is a femicide victim. The two deaths need different questions asked of them, and different action to stop the next one.\nThe internationally agreed definition for Femicide is the gender-related killing of women and girls. A killing is counted when the perpetrator is an intimate partner or former partner, or a family member, or when the killing carries specific gendered circumstances, such as prior sexual violence, a history of abuse, or a killing that follows her refusing a marriage or ending a relationship.\nWhy the distinction matters. If these killings are counted together with all other homicides, the pattern disappears. Counted separately, it becomes clear that most of them followed months or years of violence that somebody knew about. What is predictable can be prevented.\nEthiopian law contains no category of femicide, and Ethiopia publishes no national count of these killings. That is one of the things Tisema is asking to change.\nSources: UNODC and UN Women, Statistical Framework for Measuring the Gender-Related Killing of Women and Girls, Vienna 2022, endorsed by the UN Statistical Commission at its 53rd session, March 2022.",
  },
  {
    topic: 'The Demands & Justice',
    category: 'CATEGORY 02',
    categoryTitle: 'The Demands & Justice',
    question: "Why say gender-based violence or Violence against women? Men are killed too.",
    answer: "The term Gender applies to both women and me. But in the context of this campaign, it is speaking of the violence women and girls experience due to the prevalence and severity. It does not mean men do not experience suffering and violence. Globally more men than women are killed overall. That is not in dispute. We believe that our work to reduce violence against women will have a direct implication on reducing violence in society as a whole. It is a net positive for families and commmunities.\nTherefore, in this context the term gender-based describes the cause, not the number.\n·       Men are most often killed by strangers or acquaintances, in public places, in a single incident.\n·   \tWomen are most often killed by someone they know, frequently at home, frequently at the end of a long history of abuse, and frequently at the point where they tried to leave.\nViolence that comes from a man believing a woman belongs to him, has embarrased him or owes him obedience, will not be stopped by the same measures that stop violence between strangers in a bar. Violence is called gender-based when it is directed at a woman because she is a woman, or when it falls on women disproportionately.\nSource: CEDAW Committee, General Recommendation No. 19 (1992) and General Recommendation No. 35 (2017). Ethiopia ratified CEDAW in 1981.",
  },
  {
    topic: 'The Demands & Justice',
    category: 'CATEGORY 02',
    categoryTitle: 'The Demands & Justice',
    question: "What is the difference between GBV and VAWG?",
    answer: "Gender-based violence (GBV) is the umbrella term. It means violence directed at a person because of their gender, or violence that falls on one gender disproportionately. It can include men and boys.\nViolence against women and girls (VAWG) is the specific occurence inside that umbrella.\nEvery act of violence against a woman because she is a woman is gender-based violence. Not everything described as gender-based violence is violence against women and girls.\nThe two terms are often used as though they were interchangeable, and in practice GBV is sometimes used as a way of not saying the word women. Tisema uses GBV when talking about systems and services that must serve everybody, and violence against women and girls when naming what this campaign is about. The demand says women and girls, and it means it.\nSource: Inter-Agency Standing Committee, Guidelines for Integrating Gender-Based Violence Interventions in Humanitarian Action (2015).",
  },
  {
    topic: 'The Demands & Justice',
    category: 'CATEGORY 02',
    categoryTitle: 'The Demands & Justice',
    question: "What is sexual violence? Is it another way of saying rape?",
    answer: "Rape is one form of sexual violence. Sexual violence is much wider.\nThe internationally used definition is any sexual act, attempt to obtain a sexual act, unwanted sexual comment or advance, or act directed at a person’s sexuality using coercion, by any person, whatever their relationship to the victim, in any setting.\nThat includes:\n●   Rape and attempted rape.\n●   Unwanted sexual touching.\n●   Forcing a person to watch or take part in sexual acts.\n●   Sexual harassment.\n●   Taking or sharing intimate images without agreement.\n●   Demanding sex in exchange for a job, a grade, a service, aid, or safety.\nRape in international standards means non-consensual penetration. The question the law is supposed to ask is whether she agreed freely, not whether she fought.\nIn Ethiopia the law asks a different question. The rape provision of the Criminal Code is built on compulsion rather than consent, and it applies to sexual intercourse outside wedlock. It sits in the part of the Code dealing with crimes against morals, not in the part dealing with crimes against the person. So the offence is classified as an injury to morality, and the harm the law is protecting against is described in terms of chastity.\nPut simply: Ethiopian law asks whether she resisted. International standards ask whether she agreed. Changing that is part of what Tisema asks for.\nSource: World Health Organization, World Report on Violence and Health (2002). Rome Statute of the International Criminal Court, Elements of Crimes. Criminal Code of the Federal Democratic Republic of Ethiopia, Proclamation No. 414/2004.",
  },
  {
    topic: 'The Demands & Justice',
    category: 'CATEGORY 02',
    categoryTitle: 'The Demands & Justice',
    question: "What is the difference between sexual violence and conflict-related sexual violence?",
    answer: "The acts can be identical. What differs is the context, and the body of law that applies.\nConflict-related sexual violence means rape, sexual slavery, forced prostitution, forced pregnancy, forced abortion, enforced sterilisation, forced marriage, and other sexual violence of comparable gravity, where it is directly or indirectly linked to a conflict.\nIt matters because of what follows from it. Under international law, sexual violence in conflict can amount to a war crime, a crime against humanity, or an act of genocide. That brings different investigative duties, different standards of evidence, and, for the gravest crimes, no time limit on prosecution.\nEthiopian criminal law does not fully reflect this. The genocide provision lists no act of sexual violence among the acts that can constitute the crime. The war crimes provision reaches compulsion to prostitution, debauchery and rape, but not sexual slavery, forced pregnancy or enforced sterilisation.\nRome Statute of the International Criminal Court, Articles 7 and 8. Reports of the UN Secretary-General on conflict-related sexual violence. Criminal Code, Proclamation No. 414/2004.",
  },
  {
    topic: 'The Demands & Justice',
    category: 'CATEGORY 02',
    categoryTitle: 'The Demands & Justice',
    question: "What is consent?",
    answer: "Consent is agreement given freely, by a person able to give it, as a real choice.\nSilence is not consent. Not fighting back is not consent.\nAgreeing to one thing is not agreeing to all things related to that one thing. Agreeing once is not agreeing for always. And most importantly agreement can be withdrawn at any point.\nAgreement obtained by threat, by deception, by abuse of authority, or because she depends on that person for money, work, grades, care, papers or safety, is not consent.\nA child cannot consent to sex with an adult. Never. Whether they are said to have shown interest or not whether they looked older than they are – as long as they are a child, they cannot give free consent and the duty is on the adult to know and to protect them. \nEthiopian law does not currently use a consent standard for rape. (More soon on Sexual violence and consent).",
  },
  {
    topic: 'The Demands & Justice',
    category: 'CATEGORY 02',
    categoryTitle: 'The Demands & Justice',
    question: "What is intimate partner violence? Is that when a husband hits his wife? Is that even a crime?",
    answer: "Intimate partner violence is behaviour by a current or former husband, partner or boyfriend that causes physical, sexual or psychological harm. It is not only beating. It includes forcing sex, controlling money, controlling movement and who she may see, monitoring her phone, threatening her or her children, and sustained humiliation.\nIn Ethiopia, 31.4 per cent of ever-married women aged 15 to 49 report having experienced some form of intimate partner violence. That is close to one in three. And over the last 10 years the view of men on the matter has regressed. The share of men who agree that wife beating is justified for at least one reason has risen from 28% in 2016 to 39% in 2024/25.\nOf women who have experienced violence, 27 per cent have ever sought help from any source. Seventy-three per cent never sought help from anyone.\nIn the current Ethiopian law: there is no offence called domestic violence in Ethiopian law. Assault is a crime whoever commits it, so in principle a man who beats his wife can be charged under the general assault provisions. Three things get in the way.\n1. Violence between spouses appears in the Criminal Code inside the chapter on harmful traditional practices. It carries no penalty of its own and points back to the ordinary assault provisions. So in the structure of the Code, domestic violence is filed under culture rather than under violence.\n2. Several of the offences that most often fall on women can be prosecuted only if the woman lodges a complaint and maintains it. If the complaint is withdrawn, the case ends. This makes her, rather than the evidence, the point at which pressure is applied.\n3. There is no protection order in Ethiopian law. A woman in danger cannot ask a court to order a man to stay away from her without bringing a criminal case against him.\nTisema campaigns for legal reform to provide the proper legal home to these provisions with the necessary consequences and will raise awareness among the public to shift perspectives on what is deemed a violent act in relationships and a proper understanding of power imbalance.\nSources: Ethiopian Demographic and Health Survey 2024-25, Ethiopian Statistical Service and ICF, Table 15.11 (intimate partner violence) and chapter 15 (help-seeking). Criminal Code, Proclamation No. 414/2004.",
  },
  {
    topic: 'The Demands & Justice',
    category: 'CATEGORY 02',
    categoryTitle: 'The Demands & Justice',
    question: "My family says these things should be settled at home. What is wrong with reconciliation on matters involving violence against women?",
    answer: "Reconciliation is a good solution in settings where there is balance of power and all parties can be heard and protected equally. In a dispute about land or money, that can be a good outcome, reached faster and more cheaply than a court could manage. In settings that do not provide that power type of balance and on matters that are about safety and life, it can and has been seen to be harmful. Reconciliation ends a case with an agreement instead of a decision. And when applied in the case of Violence against women it is different and harmful, for three reasons.\n●   It returns a woman to the person who harmed her, usually with the agreement of people whose own lives depend on that relationship continuing.\n●   It is agreed under pressure she cannot refuse. Even if she gives her agreement to the reconciliation process we need to consider the context in which that consent is given. Agreement given by a woman with nowhere else to go is not agreement.\n●   Once reconciliation is done, it leaves no record. Nothing is counted, no pattern is visible, and the next time it happens, everything starts from zero.\nEthiopia’s new Criminal Procedure and Evidence Code still maintains a route for reconciliation on cases involving VAW. Tisema submits that this is going to further victimize women and will often lead to worse forms of violence because it does not address the root causes of violence it simply silences the woman and reassures the abuser that he can lean on community to get forgiveness for an act that could have maimed or taken the life of the woman or child in his life.\nCriminal Procedure and Evidence Code, Proclamation No. 1410/2026.",
  },
  {
    topic: 'The Demands & Justice',
    category: 'CATEGORY 02',
    categoryTitle: 'The Demands & Justice',
    question: "What is coercive control? And why do women stay if they know they are being abused?",
    answer: "Coercive control is a pattern of behaviour designed to make a woman dependent and compliant: isolating her, watching her, controlling money, movement, dress and contact, and using threats and humiliation to keep her in place. Where there is physical violence, it usually sits inside this pattern rather than standing alone.\nThe question “why did she not leave?” assumes leaving is as simple as walking out one door. For most women it is a series of doors, and other people hold them.\nShe may have no independent money, and no way to get any.\nShe may lose her children, or be told she will.\nHer family and community may press her to reconcile, and may treat leaving as her failure.\nThere may be nowhere to go. Shelter places are few and are concentrated in a small number of towns.\nAnd leaving is the most dangerous moment. The period during and after separation is when the risk of being killed is at its highest.\nThis is why the right question is not “why did she stay?”. It is “who else knew?” and “what did they do?”.",
  },
  {
    topic: 'The Demands & Justice',
    category: 'CATEGORY 02',
    categoryTitle: 'The Demands & Justice',
    question: "What about online abuse, leaked images and threats on the phone? Does that count as real violence?",
    answer: "These are also violence, and they have names.\nTechnology-facilitated gender-based violence covers violence committed, assisted or amplified through digital tools: harassment, coordinated pile-ons, impersonation, publishing a woman’s address, and tracking software.\nNon-consensual intimate images means creating, threatening to share, or sharing intimate images without agreement, including images that were taken with agreement, and images that were generated artificially. Tisema does not use the phrase revenge porn, which centres the man’s grievance and calls the abuse pornography.\nSextortion means threatening to release images or information unless the person provides sex, further images or money. It also covers officials, teachers, employers and health workers who make a service conditional on sex.\nStalking means repeated unwanted following, contact or surveillance that causes fear.\n\nNone of these are currently offences under Ethiopian criminal law. The African Union Convention on Ending Violence Against Women and Girls, adopted in Addis Ababa in February 2025, expressly covers online and digital violence.",
  },
  {
    topic: 'The Demands & Justice',
    category: 'CATEGORY 02',
    categoryTitle: 'The Demands & Justice',
    question: "What is a harmful traditional/cultural practice? And what is the difference between early marriage and child marriage? Are they not the same thing?",
    answer: "A harmful practice is one that is grounded in discrimination on the basis of sex, gender or age, is justified by tradition, culture, religion or superstition, and causes physical, sexual or psychological harm.\nThe agreed test has four parts. The practice denies a person’s dignity or bodily integrity. It\ndiscriminates. It is imposed by social prescription rather than freely chosen. And it is held in place by social norms rather than by individual decisions. Tradition is not the test. Harm and coercion are. Most traditions harm nobody and are nobody’s business but the people who keep them.\nEthiopia’s Criminal Code contains a chapter on harmful practices. It carries some of the lowest\npenalties in that part of the Code, and it includes a provision allowing a court to give a warning\ninstead of any penalty at all, having regard to the offender’s education and social standing.\nThe two terms Child and Early Marriage: they are used to describe the same thing but they do not carry the same meaning.\n• Child marriage is a marriage in which one or both parties is under 18. A child cannot consent\nto marriage. Stated that way, the fact is the whole argument. And leads us to discuss statutory\nrape and more.\n• Early marriage invites a question the fact does not deserve: early compared to what? It\nsounds like a matter of timing, or of maturity, on which reasonable people might disagree.\nIt turns a rule into an opinion. Tisema uses child marriage. Forced marriage is related but not identical. It means a marriage entered into without the full, free and informed consent of one or both parties, at any age, including where consent is withdrawn but the marriage is maintained. All child marriage is forced marriage. Not all forced marriage involves a child.",
  },
  {
    topic: 'The Demands & Justice',
    category: 'CATEGORY 02',
    categoryTitle: 'The Demands & Justice',
    question: "Why say FGM (Female Genital Mutilation) instead of female circumcision?",
    answer: "Female genital mutilation means all procedures involving partial or total removal of the external\nfemale genitalia, or other injury to the female genital organs, for non-medical reasons. The World Health Organization classifies four types of increasing severity.\n\nCircumcision implies an equivalence with male circumcision that does not hold, medically or in its consequences. Cutting softens it. Neither describes what happens or what it costs. This is not a judgment on families. The practice is carried out overwhelmingly by people who love their daughters and believe they are protecting them. That is exactly why ending it requires law, health services and community leadership working together, and not blame. Naming the harm accurately is what makes it possible to measure and to properly address. FGM has been a crime in Ethiopia since 2005. Articles 565 and 566 of the Criminal Code carry sentences ranging from three months to ten years but prosecutions are rare.\n\nCurrently FGM prevalence is falling. Among women aged 15 to 49 it dropped from 74.3 percent in 2005 to 65.2 percent in 2016, and UNFPA reports 48.5 percent as of 2024. The generational gap is clear: 75.3 percent of women aged 45 to 49 have been cut, against 47.1 percent of the youngest age group. Attitudes have shifted faster than practice. Around 79 percent of women and 87 percent of men now say the practice should stop. The prevalence is 98.5 percent in Somali and 24.2 percent in Tigray, and rates in Afar and Somali have stayed close to 91 and 99 percent for years without moving. Most cutting happens before a girl turns five, and almost all of it is done by traditional practitioners. It is practised across every region, religion and ethnic group in the country.\n\nEthiopia set itself a target of eliminating FGM by 2025 and built a plan to get there. The National Costed Roadmap to End Child Marriage and FGM/C, launched in 2019 covering the years up to 2024 at a cost of 94 million USD. That deadline has passed and the practice, while with commendable progress, still persists. Ethiopia would now need to move five times faster to meet the 2030 target, with an estimated 2.5 million girls at risk before then.\nTisema works to highlight this gap. The law is in place, the plan has been designed and even cost. What is missing is continued delivery, and the publicizing of the evidence so that the public can learn, and check for accountability.",
  },
  {
    topic: 'The Demands & Justice',
    category: 'CATEGORY 02',
    categoryTitle: 'The Demands & Justice',
    question: "What is sexual harassment? Is it just Lekefa?",
    answer: "Sexual harassment is unwelcome behaviour of a sexual nature: physical contact and advances,\nsexual remarks, showing sexual images, and demands for sex. It matters most where a woman has good reason to believe that objecting will cost her a job, a promotion, a grade, a service or her safety. This definition of sexual harassment names that behaviour as a violation of her rights rather than a fact of daily life. We need our own language for this that takes into account the real harm and impact of the act on the right and dignity of a woman or a girl.\nEveryday Amharic has words for some of this behaviour, and those words are not neutral. They tend to describe it as a nuisance, teasing or annoyance, something a woman is expected to absorb, deflect or laugh off. The behaviour they name is the same but the terms used diminish the seriousness and harm it causes.\n\nThere is a conventional belief that a female student, a house maid, or an office worker can just say no and decline advances and efforts to persuade her. What is often ignored is the lack of power to simply say no and walk away from a boss, a teacher or even a colleague without consequence specially in a society that normalizes the beating and even abduction of women and girls even in towns and cities let alone rural parts of the country. Women and girls have to conduct a mental calculation of harm and level of safety before they determine how to respond to any advances. The other side that is minimized is the impact of repeated requests, blocking one's way, following, and demanding compliance has on the mental, and physical safety of a woman.\n\nEthiopia has no criminal offence of sexual harassment. The Labour Proclamation addresses it for people in formal employment. That leaves students, domestic workers, informal traders, patients and job applicants without protection. Closing that gap is part of the legal reform Tisema asks for.",
  },
  {
    topic: 'Government & Authority',
    category: 'CATEGORY 03',
    categoryTitle: 'Government & Authority',
    question: "When you say declare a “National Crisis”, are you saying the government must declare a State of Emergency? And what does “whole-of-government response” actually mean?",
    answer: "No. Tisema is not calling for a State of Emergency under Article 93 of the Constitution. A constitutional State of Emergency involves extraordinary governmental powers and can involve limitations on rights. Tisema is asking for state capacity to be mobilized to protect the existing rights and safety of women and girls. “National Crisis” is being used as a political and administrative designation requiring priority, coordination, resources and accountability, not as a request to suspend constitutional rights.\n\nTisema is not claiming that “National Crisis” is a separate constitutional category equivalent to an Article 93 State of Emergency. The campaign’s position is that the government does not need a new constitutional emergency power merely to prioritize an issue, coordinate ministries, assign senior political responsibility, establish administrative structures, allocate resources, set targets and publicly report progress. The demand is fundamentally about using existing executive capacity and elevating the matter to the level it deserves.\n\nA whole-of-government response means violence against women cannot be delegated to one office and left there. Relevant institutions must operate toward one national objective, with clearly assigned responsibilities, common targets and a senior coordinating authority capable of demanding results. Police cannot solve the health-service problem. Hospitals cannot prosecute offenders. Courts cannot independently create prevention programs. A whole-of-government response connects those responsibilities.",
  },
  {
    topic: 'Government & Authority',
    category: 'CATEGORY 03',
    categoryTitle: 'Government & Authority',
    question: "How is this different from what the government is already doing? And why can’t the ministry that handles women’s issues simply take care of this?",
    answer: "• Ethiopia is not short of policies or strategies. There are policies, strategies, a coordinating body for gender-based violence, SOPs, a national roadmap on child marriage and female genital mutilation, one-stop centers in some cities, and a new National Policy on Women's Empowerment and Gender Equality approved in May 2026 (this has not been made public yet). Each is real. None of them have the institutional capacity or the necessary funds to make this level of coordination or response possible.\n• The current pattern after each publicized killing is the same: a statement, sometimes a task force, an awareness campaign, and then silence until the next name. A task force is the reflex of a government that has been asked a question it does not want to own. The test we apply to any response is simple: who is the named person, what is the budget line, clear action items, when does the public see the first report, and by what date must services be running. If those four cannot be answered, it is a press release.\n• The difference is not effort or good intentions. It is architecture. The Seqota Declaration on stunting had a federal delivery unit, a treasury allocation, nine sector ministries working to one plan, and coordinating bodies replicated to woreda level. Violence against women and girls has been given a lot of strategy documents, a coordinating body that sits within a ministry and many public statements acknowledging severity and devastation but never a national level action that matches all of these realities. That is why Tisema asks for this type of intervention because we the government has done so far, although well intentioned has not hit the target at all. It is time for a reset and high level ownership.\n• We believe that the current ministry tasked with handling women’s issues, as it is organized and funded now, cannot manage this task because violence against women and girls crosses institutional boundaries. A survivor may encounter police, prosecutors, courts, hospitals, social services, schools and local administrations. No single line ministry controls all of them. Tisema therefore asks, at this moment in our fight to save women and girls from violence a measure and leadership above line-ministry level, capable of coordinating the entire system. After this national crisis is successfully implemented and the crisis is averted then the long-term institutional home of the issue, rightly so, will be the ministry of women (the ministry name might vary).",
  },
  {
    topic: 'Government & Authority',
    category: 'CATEGORY 03',
    categoryTitle: 'Government & Authority',
    question: "Do you really think the government will accept this? Isn’t this kind of whole-of-government approach unrealistic for Ethiopia?",
    answer: "It is not unrealistic. Tisema points to the Seqota Declaration on stunting as evidence that Ethiopia has previously built a phased roadmap, delivery structures, treasury allocation and multisectoral coordination for a national priority. The comparison is institutional, not substantive: GBV and childhood stunting are different problems. The point is that the architecture and administrative practice for high-level, multisectoral national action already exist. We can also look to the Green Legacy effort and the stunning level of national coordination for the development of seedlings, engagement of ministries, and national mobilization to plant those seedlings. The proof is in the numbers and the capacity that has been mobilized when an issue is deemed important enough to make a national priority.",
  },
  {
    topic: 'Government & Authority',
    category: 'CATEGORY 03',
    categoryTitle: 'Government & Authority',
    question: "Ethiopia already faces conflict, displacement, poverty and other crises. Why prioritize this now?",
    answer: "It is very true that Ethiopia faces many crises. And it is also true that when it comes to women and children these crises are compounding factors not only competing for priority. Women and girls face the brunt of any crisis we can think of. Be it armed conflict and its aftermath in several regions, displacement or drought and food insecurity, Inflation that has hollowed out household incomes. All of these land the hardest on marginalized groups and women and girls are often at the very bottom, with exacerbated circumstances for women and children with disabilities. None of these is an argument for waiting, it is in fact the urgent action because each one is a multiplier of violence against women and girls. Conflict brings sexual violence as a weapon and dismantles the police and courts that would answer it. Displacement removes women from every protective relationship they had. Food insecurity pushes girls into early marriage and women into exploitation. Inflation traps women in violent households they cannot afford to leave. The 7.2 million people needing protection from gender-based violence are not separate from the other crises. They are produced by them. So Tisema is stating that addressing VAW will not delay the implementation of work for the other issues in fact it will accelerate them. This work will also have economic implications in that if addressed successfully Ethiopia will avoid the loss of 1.2% of its GDP each year due to VAW.",
  },
  {
    topic: 'Government & Authority',
    category: 'CATEGORY 03',
    categoryTitle: 'Government & Authority',
    question: "How’s this different from what the government is already doing?",
    answer: "Ethiopia is not short of policies or strategies. There are policies, strategies, a coordinating body for gender-based violence, SOPs, a national roadmap on child marriage and female genital mutilation, one-stop centers in some cities, and a new National Policy on Women's Empowerment and Gender Equality approved in May 2026 (this has not been made public yet). Each is real. None of them have the institutional capacity or the necessary funds to make this level of coordination or response possible.\n\nThe current pattern after each publicized killing is the same: a statement, sometimes a task force, an awareness campaign, and then silence until the next name. A task force is often the reflex of a government that has been asked a question it does not want to own. The test we apply to any response is simple: who is the named person, what is the budget line, clear action items, when does the public see the first report, and by what date must services be running. If those four cannot be answered, it is a press release.\n\nThe difference is not effort or good intentions. It is architecture. The Seqota Declaration on stunting had a federal delivery unit, a treasury allocation, nine sector ministries working to one plan, and coordinating bodies replicated to woreda level. Violence against women and girls has been given a lot of strategy documents, a coordinating body that sits within a ministry and many public statements acknowledging severity and devastation but never a national level action that matches all of these realities. That is why Tisema asks for this type of intervention because what the government has done so far, although well intentioned, has not hit the target at all. It is time for a reset and high level ownership.\n\nWe believe that the current ministry tasked with handling women’s issues, as it is organized and funded now, cannot manage this task because violence against women and girls crosses institutional boundaries. A survivor may encounter police, prosecutors, courts, hospitals, social services, schools and local administrations. No single line ministry controls all of them. Tisema therefore asks, at this moment in our fight to save women and girls from violence a measure and leadership above line-ministry level, capable of coordinating the entire system. After this national crisis is successfully implemented and the crisis is averted then the long-term institutional home of the issue, rightly so, will be the ministry of women (the ministry name might vary).",
  },
  {
    topic: 'How to Take Action',
    category: 'CATEGORY 04',
    categoryTitle: 'How to Take Action',
    question: "What can ordinary people do? How can we help?",
    answer: "Supporters can endorse the demand, sign the petition, carry its wording consistently, share accurate information, and take the demand to officials and institutions capable of acting. Signing does not mean endorsing a political party or demanding a constitutional State of Emergency. It means supporting a coordinated National Crisis response to violence against women and girls, backed by accountable leadership, resources, measurable delivery and public reporting. See the petition link and demand details to get more ways to support and take action.",
  },
]

export const FAQ_ITEMS: FaqItem[] = RAW.map((item, i) => ({
  ...item,
  id: `q${i + 1}`,
  index: pad(i + 1),
}))
