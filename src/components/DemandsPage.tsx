import { useMemo, useState } from 'react'
import { domAnimation, LazyMotion, MotionConfig } from 'motion/react'
import {
  DEMAND_FILTERS,
  DEMANDS_PAGE_EYEBROW,
  DEMANDS_PAGE_INTRO,
  DEMANDS_PAGE_TITLE,
  DEMANDS_PDF_LABEL,
  MANIFEST_DEMANDS,
  type DemandCategory,
} from '../lib/demands'
import { clientNavigate, useRouter } from '../lib/router'
import { SiteNav } from './SiteNav'
import { SiteFooter } from './sections/SiteFooter'
import { Item, Reveal, Stagger } from './motion'

export function DemandsPage() {
  const { navigate } = useRouter()
  const [filter, setFilter] = useState<'All' | DemandCategory>('All')

  const visible = useMemo(
    () =>
      filter === 'All'
        ? MANIFEST_DEMANDS
        : MANIFEST_DEMANDS.filter((d) => d.category === filter),
    [filter],
  )

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <div className="relative min-h-screen bg-paper">
          <SiteNav pinned base="/" />

          <main className="pt-[56px] lg:pt-[68px]">
            <div className="section-shell py-[56px] lg:py-[96px]">
              <div className="mx-auto flex w-full max-w-[1253.875px] flex-col gap-[40px] lg:gap-[48px]">
                <header className="flex flex-col gap-[20px]">
                  <a
                    href="/"
                    onClick={(e) => clientNavigate(e, '/', navigate)}
                    className="w-fit font-serif text-[15.75px] leading-[28px] text-oxblood transition-opacity hover:opacity-70"
                  >
                    ← Back to home
                  </a>

                  <Reveal>
                    <p className="text-[12px] font-semibold tracking-[0.08em] text-oxblood uppercase">
                      {DEMANDS_PAGE_EYEBROW}
                    </p>
                  </Reveal>

                  <Reveal delay={0.06}>
                    <h1 className="font-serif text-[clamp(2.25rem,4.3vw,52px)] leading-[1.15] text-field">
                      {DEMANDS_PAGE_TITLE}
                    </h1>
                  </Reveal>

                  <Reveal delay={0.1}>
                    <p className="max-w-[1084px] text-[18px] leading-[28px] text-field">
                      {DEMANDS_PAGE_INTRO}
                    </p>
                  </Reveal>
                </header>

                <div className="flex flex-col gap-[16px] lg:flex-row lg:items-center lg:justify-between">
                  <div
                    className="flex flex-wrap gap-[8px]"
                    role="tablist"
                    aria-label="Filter demands"
                  >
                    {DEMAND_FILTERS.map((item) => {
                      const active = filter === item
                      const label =
                        item === 'All'
                          ? `All Demands (${MANIFEST_DEMANDS.length})`
                          : item
                      return (
                        <button
                          key={item}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          onClick={() => setFilter(item)}
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

                  <span className="text-[14px] font-semibold text-oxblood/70">
                    {DEMANDS_PDF_LABEL}
                  </span>
                </div>

                <Stagger
                  className="grid w-full gap-[24px] lg:grid-cols-2"
                  gap={0.06}
                >
                  {visible.map((demand) => (
                    <Item
                      key={demand.id}
                      className="flex flex-col justify-between rounded-[12px] bg-white p-[28px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] lg:p-[32px]"
                    >
                      <div className="flex flex-col gap-[12px]">
                        <div className="flex items-center justify-between gap-[12px]">
                          <div className="flex items-center gap-[12px]">
                            <span className="flex size-[44px] shrink-0 items-center justify-center rounded-full bg-field text-[16px] font-bold text-paper">
                              {demand.index}
                            </span>
                            <span className="rounded-full bg-[#eae8e2] px-[12px] py-[4px] text-[12px] font-bold tracking-[0.03em] text-field uppercase">
                              {demand.category}
                            </span>
                          </div>
                          <span
                            className={`shrink-0 rounded-full px-[10px] py-[4px] text-[12px] font-bold tracking-[0.06em] whitespace-nowrap ${
                              demand.urgencyAccent
                                ? 'bg-lime text-[#131f00]'
                                : 'bg-[#f0eee8] text-oxblood'
                            }`}
                          >
                            {demand.urgency}
                          </span>
                        </div>

                        <h2 className="font-serif text-[20px] leading-[28px] text-field lg:text-[22px]">
                          {demand.title}
                        </h2>
                        <p className="text-[15px] leading-[24px] text-oxblood">
                          {demand.body}
                        </p>
                      </div>

                      <div className="mt-[16px] flex items-center justify-between gap-[12px] border-t border-[#f3efe6] pt-[12px]">
                        <p className="text-[13px] font-medium tracking-[0.01em] text-field">
                          Status: {demand.status}
                        </p>
                        {demand.hasClause ? (
                          <span className="text-[12px] font-bold tracking-[0.06em] text-field">
                            Read Clause ▾
                          </span>
                        ) : null}
                      </div>
                    </Item>
                  ))}
                </Stagger>
              </div>
            </div>
          </main>

          <SiteFooter base="/" />
        </div>
      </MotionConfig>
    </LazyMotion>
  )
}
