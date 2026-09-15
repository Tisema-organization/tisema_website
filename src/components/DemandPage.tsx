import { domAnimation, LazyMotion, MotionConfig } from 'motion/react'
import { POSTER_MARK } from '../lib/assets'
import {
  DEMAND_BRIEF_CARDS,
  DEMAND_PAGE_INTRO,
  DEMAND_PAGE_TITLE,
  DEMAND_THEME_DOCS,
} from '../lib/demand'
import { clientNavigate, useRouter } from '../lib/router'
import { SiteNav } from './SiteNav'
import { SiteFooter } from './sections/SiteFooter'
import { Item, Reveal, Stagger } from './motion'

/**
 * Demand & Declaration — Figma "The Demand and Declaration" (180:20).
 * Top: three brief cards. Bottom: language explainers with hover download.
 */
export function DemandPage() {
  const { navigate } = useRouter()

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

                <Stagger
                  className="grid w-full gap-[24px] lg:grid-cols-3"
                  gap={0.1}
                >
                  {DEMAND_BRIEF_CARDS.map((card) => (
                    <Item
                      key={card.id}
                      className="flex flex-col gap-[13px] rounded-[20px] border-[0.5px] border-dashed border-oxblood px-[32px] py-[24px]"
                    >
                      <div className="flex flex-col gap-[16px]">
                        <p className="text-[22px] leading-normal font-semibold text-field">
                          {card.title}
                        </p>
                        <p className="text-[16px] leading-[28px] font-light text-field">
                          {card.body}
                        </p>
                      </div>

                      {card.href ? (
                        <a
                          href={card.href}
                          onClick={(e) =>
                            clientNavigate(e, card.href!, navigate)
                          }
                          className="mt-auto inline-flex w-fit items-center gap-[2px] rounded-[8px] bg-oxblood py-[4px] pr-[8px] pl-[16px] text-[14px] leading-[28px] text-paper capitalize transition-opacity hover:opacity-90"
                        >
                          Read more
                          <span aria-hidden className="text-[16px]">
                            ↗
                          </span>
                        </a>
                      ) : (
                        <span className="mt-auto inline-flex w-fit items-center gap-[2px] rounded-[8px] bg-oxblood py-[4px] pr-[8px] pl-[16px] text-[14px] leading-[28px] text-paper capitalize">
                          Read more
                          <span aria-hidden className="text-[16px]">
                            ↗
                          </span>
                        </span>
                      )}
                    </Item>
                  ))}
                </Stagger>

                <Stagger
                  className="grid w-full grid-cols-2 gap-x-[16px] gap-y-[32px] lg:grid-cols-4 lg:gap-x-[24px]"
                  gap={0.08}
                >
                  {DEMAND_THEME_DOCS.map((doc) => (
                    <Item key={doc.id}>
                      {/*
                        Download is a real link (keyboard + focus-within),
                        matching GalleryTile hover/focus pattern.
                      */}
                      <figure className="group flex flex-col items-center gap-[16px] text-center">
                        <div className="relative aspect-square w-full overflow-hidden bg-lime">
                          <img
                            src={POSTER_MARK}
                            alt=""
                            width={256}
                            height={320}
                            className="h-full w-full object-contain p-[18%]"
                          />

                          <div className="absolute inset-x-0 bottom-0 flex justify-center bg-field/85 px-3 py-3 lg:hidden">
                            <a
                              href={doc.file}
                              download={doc.downloadName}
                              aria-label={`Download ${doc.language} explainer`}
                              className="inline-flex items-center gap-2 rounded-[8px] border border-lime px-4 py-1.5 text-lime"
                            >
                              <img
                                src="/design/icon-download.svg"
                                alt=""
                                width={21}
                                height={21}
                                className="block size-[21px]"
                              />
                              <span className="text-[14px] font-light">
                                Download
                              </span>
                            </a>
                          </div>

                          <div className="pointer-events-none absolute inset-0 hidden place-items-center bg-field/65 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 lg:grid">
                            <a
                              href={doc.file}
                              download={doc.downloadName}
                              aria-label={`Download ${doc.language} explainer`}
                              className="pointer-events-auto inline-flex items-center gap-2 rounded-[8px] border border-lime px-4 py-1.5 text-lime transition-colors hover:bg-lime/10 focus-visible:ring-2 focus-visible:ring-lime focus-visible:outline-none"
                            >
                              <img
                                src="/design/icon-download.svg"
                                alt=""
                                width={21}
                                height={21}
                                className="block size-[21px]"
                              />
                              <span className="text-[14px] font-light">
                                Download
                              </span>
                            </a>
                          </div>
                        </div>

                        <figcaption className="flex flex-col gap-[4px]">
                          <p className="font-ethiopic text-[15.75px] leading-[28px] text-field">
                            #ትሰማ!
                          </p>
                          <p className="text-[15.75px] leading-[26px] font-semibold text-oxblood">
                            {doc.language}
                          </p>
                          <p className="text-[13px] leading-[22px] text-oxblood/80">
                            {doc.title}
                          </p>
                        </figcaption>
                      </figure>
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
