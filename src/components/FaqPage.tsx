import { useMemo, useState } from 'react'
import { domAnimation, LazyMotion, MotionConfig } from 'motion/react'
import {
  FAQ_ITEMS,
  FAQ_PAGE_INTRO,
  FAQ_PAGE_TITLE,
  FAQ_SEARCH_PLACEHOLDER,
  FAQ_TOPICS,
  type FaqTopic,
} from '../lib/faq'
import { clientNavigate, useRouter } from '../lib/router'
import { SiteNav } from './SiteNav'
import { SiteFooter } from './sections/SiteFooter'
import { Reveal } from './motion'

const EMPHASIZED_LEADS = [
  'Widespread.',
  'Serious and irreversible.',
  'Why the distinction matters.',
  'Therefore, in this context the term gender-based describes the cause, not the number.',
]

function AnswerLine({ line, bullet = false }: { line: string; bullet?: boolean }) {
  const colon = line.indexOf(':')
  const colonLead = colon > 0 && colon < 70 ? line.slice(0, colon + 1) : ''
  const sentenceLead = EMPHASIZED_LEADS.find((lead) => line.startsWith(lead))
  const firstStop = line.indexOf('.')
  const bulletLead =
    bullet && firstStop > 0 && firstStop < 36
      ? line.slice(0, firstStop + 1)
      : ''
  const lead = colonLead || sentenceLead || bulletLead || ''

  if (line.startsWith('Source:') || line.startsWith('Sources:')) {
    return <span className="text-[14px] italic text-oxblood/70">{line}</span>
  }

  if (!lead) return <>{line}</>

  return (
    <>
      <strong className="font-bold text-field">
        {bulletLead ? lead.slice(0, -1) + ':' : sentenceLead ? lead.slice(0, -1) + ';' : lead}
      </strong>
      {line.slice(lead.length)}
    </>
  )
}

function AnswerContent({ answer }: { answer: string }) {
  const blocks = answer.split(/\n\s*\n/)

  return blocks.map((block, blockIndex) => {
    const lines = block.split('\n').map((line) => line.trim()).filter(Boolean)
    const isList = lines.every((line) => /^[●·•]\s*/.test(line))
    const isNumberedList = lines.every((line) => /^\d+\.\s+/.test(line))

    if (isList || isNumberedList) {
      return (
        <ul
          key={`${blockIndex}-${block.slice(0, 24)}`}
          className={`flex flex-col gap-2 pl-6 text-[16px] leading-[30px] tracking-[0.02em] text-[#4f4d4d] ${
            isNumberedList ? 'list-decimal' : 'list-disc'
          }`}
        >
          {lines.map((line) => {
            const content = line.replace(/^(?:[●·•]\s*|\d+\.\s+)/, '')
            return (
              <li key={line.slice(0, 48)}>
                <AnswerLine line={content} bullet />
              </li>
            )
          })}
        </ul>
      )
    }

    return (
      <div
        key={`${blockIndex}-${block.slice(0, 24)}`}
        className="flex flex-col gap-2 text-[16px] leading-[30px] tracking-[0.02em] text-[#4f4d4d]"
      >
        {lines.map((line) => {
          const bullet = /^[●·•]\s*/.test(line)
          const content = line.replace(/^[●·•]\s*/, '')

          return bullet ? (
            <div key={line.slice(0, 48)} className="flex gap-3 pl-1">
              <span aria-hidden className="shrink-0 text-field">•</span>
              <p>
                <AnswerLine line={content} bullet />
              </p>
            </div>
          ) : (
            <p key={line.slice(0, 48)}>
              <AnswerLine line={line} />
            </p>
          )
        })}
      </div>
    )
  })
}

export function FaqPage() {
  const { navigate } = useRouter()
  const [topic, setTopic] = useState<FaqTopic>('All')
  const [query, setQuery] = useState('')
  const [openId, setOpenId] = useState<string>('q1')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return FAQ_ITEMS.filter((item) => {
      if (topic !== 'All' && item.topic !== topic) return false
      if (!q) return true
      const brand = item.brandCards
        ?.map((c) => `${c.title} ${c.body}`)
        .join(' ')
      const hay =
        `${item.question} ${item.tag ?? ''} ${item.answer ?? ''} ${brand ?? ''}`.toLowerCase()
      return hay.includes(q)
    })
  }, [topic, query])

  const sections = useMemo(() => {
    const order: string[] = []
    const map = new Map<string, typeof FAQ_ITEMS>()
    for (const item of filtered) {
      const key = `${item.category}|${item.categoryTitle}`
      if (!map.has(key)) {
        map.set(key, [])
        order.push(key)
      }
      map.get(key)!.push(item)
    }
    return order.map((key) => {
      const [category, categoryTitle] = key.split('|')
      return { category, categoryTitle, items: map.get(key)! }
    })
  }, [filtered])

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <div className="relative min-h-screen bg-paper">
          <SiteNav pinned base="/" />

          <main className="pt-[56px] lg:pt-[68px]">
            <div className="section-shell py-[56px] lg:py-[96px]">
              <div className="mx-auto flex w-full max-w-[1253.875px] flex-col gap-[40px]">
                <header className="flex flex-col gap-[24px]">
                  <a
                    href="/"
                    onClick={(e) => clientNavigate(e, '/', navigate)}
                    className="w-fit font-serif text-[15.75px] leading-[28px] text-oxblood transition-opacity hover:opacity-70"
                  >
                    ← Back to home
                  </a>

                  <Reveal>
                    <h1 className="font-serif text-[clamp(2.25rem,4.3vw,48px)] leading-[1.15] text-field">
                      {FAQ_PAGE_TITLE}
                    </h1>
                  </Reveal>

                  <Reveal delay={0.06}>
                    <p className="max-w-[1084px] text-[18px] leading-[28px] text-field">
                      {FAQ_PAGE_INTRO}
                    </p>
                  </Reveal>

                  <div className="relative max-w-[964px]">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute top-1/2 left-[16px] -translate-y-1/2 text-oxblood/50"
                    >
                      ⌕
                    </span>
                    <input
                      type="search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder={FAQ_SEARCH_PLACEHOLDER}
                      className="w-full rounded-[12px] bg-white py-[16px] pr-[32px] pl-[48px] text-[15px] text-field shadow-[0px_4px_24px_0px_rgba(92,36,27,0.06)] outline-none placeholder:text-oxblood/50 focus:ring-2 focus:ring-lime"
                    />
                  </div>

                  <div
                    className="flex flex-wrap gap-[8px]"
                    role="tablist"
                    aria-label="FAQ topics"
                  >
                    {FAQ_TOPICS.map((item) => {
                      const active = topic === item
                      const label = item === 'All' ? 'All Topics' : item
                      return (
                        <button
                          key={item}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          onClick={() => setTopic(item)}
                          className={`rounded-full px-[16px] py-[8px] text-[14px] font-semibold tracking-[0.02em] transition-colors ${
                            active
                              ? 'bg-oxblood text-paper'
                              : 'bg-[#f0eee8] text-oxblood hover:bg-oxblood/10'
                          }`}
                        >
                          {label}
                        </button>
                      )
                    })}
                  </div>
                </header>

                <div className="flex flex-col gap-[16px]">
                  {sections.length === 0 ? (
                    <p className="text-[16px] text-oxblood">
                      No questions match that search.
                    </p>
                  ) : null}

                  {sections.map((section) => (
                    <section
                      key={section.category}
                      className="flex flex-col gap-[16px]"
                    >
                      <div className="flex flex-col gap-2 pt-[8px] sm:flex-row sm:items-center sm:gap-[8px]">
                        <div className="flex shrink-0 items-center gap-[8px]">
                          <p className="text-[12px] font-bold tracking-[0.06em] text-field uppercase">
                            {section.category}
                          </p>
                          <span
                            className="h-[2px] w-[48px] shrink-0 bg-lime"
                            aria-hidden
                          />
                        </div>
                        <h2 className="min-w-0 text-[18px] leading-[1.35] font-bold text-field sm:text-[20px] sm:leading-normal">
                          {section.categoryTitle}
                        </h2>
                      </div>

                      {section.items.map((item) => {
                        const open = openId === item.id
                        return (
                          <article
                            key={item.id}
                            className="overflow-hidden rounded-[12px] bg-white shadow-[0px_4px_24px_0px_rgba(92,36,27,0.06)]"
                          >
                            <button
                              type="button"
                              aria-expanded={open}
                              onClick={() =>
                                setOpenId(open ? '' : item.id)
                              }
                              className="flex w-full items-start gap-3 p-4 text-left sm:gap-4 sm:p-6"
                            >
                              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#f0eee8] text-[13px] font-bold text-field sm:size-10 sm:text-[16px]">
                                {item.index}
                              </span>
                              <div className="min-w-0 flex-1 flex flex-col gap-1 pt-0.5 sm:gap-[4px] sm:pt-1">
                                {item.tag ? (
                                  <p className="text-[11px] font-semibold tracking-[0.06em] text-[#496800] uppercase sm:text-[12px]">
                                    {item.tag}
                                  </p>
                                ) : null}
                                <p className="text-[16px] leading-[24px] font-bold text-field sm:text-[18px] sm:leading-[28px] lg:text-[20px]">
                                  {item.question}
                                </p>
                              </div>
                              <span
                                aria-hidden
                                className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-[#f0eee8] text-sm text-field transition-transform sm:mt-0 sm:size-8 ${
                                  open ? 'rotate-180' : ''
                                }`}
                              >
                                ▾
                              </span>
                            </button>

                            {open && item.answer ? (
                              <div className="flex flex-col gap-[16px] px-4 pb-6 sm:px-6 sm:pb-8 lg:px-[80px]">
                                <AnswerContent answer={item.answer} />

                                {item.brandCards ? (
                                  <div className="grid gap-[16px] sm:grid-cols-2">
                                    {item.brandCards.map((card) => (
                                      <div
                                        key={card.title}
                                        className="flex flex-col gap-[16px] rounded-[8px] bg-oxblood/5 p-[24px]"
                                      >
                                        <p className="font-serif text-[24px] text-field">
                                          {card.title}
                                        </p>
                                        <p className="text-[16px] leading-[30px] tracking-[0.02em] text-[#4f4d4d]">
                                          {card.body}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                ) : null}
                              </div>
                            ) : null}
                          </article>
                        )
                      })}
                    </section>
                  ))}
                </div>
              </div>
            </div>
          </main>

          <SiteFooter base="/" />
        </div>
      </MotionConfig>
    </LazyMotion>
  )
}
