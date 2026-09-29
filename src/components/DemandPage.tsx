import { useState } from 'react'
import { domAnimation, LazyMotion, MotionConfig } from 'motion/react'

import {
  DEMAND_ITEMS,
  DEMAND_PAGE_INTRO,
  DEMAND_PAGE_TITLE,
 
} from '../lib/demand'
import { clientNavigate, useRouter } from '../lib/router'
import { SiteNav } from './SiteNav'
import { SiteFooter } from './sections/SiteFooter'
import { Reveal } from './motion'

/**
 * Demand & Declaration — Figma "The Demand and Declaration" (180:20).
 * Top: three brief cards. Bottom: language explainers with hover download.
 */
export function DemandPage() {
  const { navigate } = useRouter()
  const [openDemand, setOpenDemand] = useState<string | null>(null)
  
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <div className="relative min-h-screen bg-paper">
          <SiteNav pinned base="/" />

          <main className="pt-[56px] lg:pt-[68px]">
            <div className="section-shell py-[56px] lg:py-[96px]">
              <div className="mx-auto flex w-full max-w-[1253.875px] flex-col gap-[64px]">
                <a
                  href="/"
                  onClick={(e) => clientNavigate(e, '/', navigate)}
                  className="w-fit font-serif text-[15.75px] leading-[28px] text-oxblood transition-opacity hover:opacity-70"
                >
                  ← Back to home
                </a>

                <header className="flex flex-col gap-[32px]">
                  <Reveal>
                    <h1 className="font-serif text-[clamp(2.25rem,4.3vw,48px)] leading-[1.15] text-field lg:leading-[60px]">
                      {DEMAND_PAGE_TITLE}
                    </h1>
                  </Reveal>

                  <Reveal delay={0.06}>
                    <p className="max-w-[1084px] text-[18px] leading-[32px] text-field">
                      {DEMAND_PAGE_INTRO}
                    </p>
                  </Reveal>
                </header>

<div className="flex w-full flex-col gap-[24px]">
  {DEMAND_ITEMS.map((item, index) => {
    const isOpen = openDemand === item.id
    const showPart =
      index === 0 || DEMAND_ITEMS[index - 1].part !== item.part

    return (
      <div key={item.id} className="flex flex-col gap-[16px]">
        {showPart && (
          <h2 className="mt-[24px] font-serif text-[24px] leading-[32px] text-oxblood lg:text-[28px]">
            {item.part}
          </h2>
        )}

        <div className="overflow-hidden rounded-[20px] border-[0.5px] border-dashed border-oxblood">
          <button
            type="button"
            onClick={() => setOpenDemand(isOpen ? null : item.id)}
            aria-expanded={isOpen}
            className="flex w-full items-center justify-between gap-[24px] px-[24px] py-[24px] text-left lg:px-[32px]"
          >
            <span className="flex items-start gap-[16px]">
              <span className="font-serif text-[18px] text-oxblood">
                {item.number}.
              </span>
              <span className="text-[18px] leading-[28px] font-semibold text-field lg:text-[20px]">
                {item.title}
              </span>
            </span>

            <span
              aria-hidden
              className="shrink-0 font-serif text-[28px] text-oxblood"
            >
              {isOpen ? '−' : '+'}
            </span>
          </button>

          {isOpen && (
            <div className="border-t border-oxblood/20 px-[24px] py-[28px] lg:px-[32px]">
              <div className="flex max-w-[1084px] flex-col gap-[28px]">
                <div className="whitespace-pre-line text-[16px] leading-[30px] text-field">
                  {item.demand}
                </div>

                <div className="flex flex-col gap-[8px]">
                  <p className="text-[14px] font-semibold uppercase tracking-[0.08em] text-oxblood">
                    Owner
                  </p>
                  <p className="text-[16px] leading-[28px] text-field">
                    {item.owner}
                  </p>
                </div>

                <div className="flex flex-col gap-[8px]">
                  <p className="text-[14px] font-semibold uppercase tracking-[0.08em] text-oxblood">
                    100-day result
                  </p>
                  <p className="text-[16px] leading-[28px] text-field">
                    {item.result}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  })}
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
