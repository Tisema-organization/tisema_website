import { domAnimation, LazyMotion, MotionConfig } from 'motion/react'
import { SiteNav } from './SiteNav'
import { SiteFooter } from './sections/SiteFooter'
import {
  TERMS_EFFECTIVE,
  TERMS_LEAD,
  TERMS_NOTICE,
  TERMS_SECTIONS,
  TERMS_TITLE,
} from '../lib/terms'

/**
 * Terms and Conditions.
 *
 * No comp exists for this page, so it is built from the site's own tokens and
 * type scale. Deliberately plain: the reveal vocabulary used on the landing
 * page is left off the body copy, because text that fades in as you reach it
 * is a nuisance to actually read — and this is the one page someone may need
 * to read carefully, or search.
 */
export function TermsPage() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <div className="relative min-h-screen bg-paper">
          {/* No hero here to drive the handoff, so the nav starts visible and
              its anchors point back at the landing page. */}
          <SiteNav pinned base="/" />

          <main className="pt-[72px] lg:pt-[105px]">
            <div className="section-shell py-[56px] lg:py-[96px]">
              <div className="mx-auto flex max-w-[820px] flex-col gap-[48px]">
                <header className="flex flex-col gap-[12px]">
                  <p className="font-serif text-[19.25px] leading-[28px] text-oxblood">
                    {TERMS_LEAD}
                  </p>
                  <h1 className="font-serif text-[clamp(2.25rem,4.3vw,52px)] leading-[1.2] text-field">
                    {TERMS_TITLE}
                  </h1>
                  {TERMS_EFFECTIVE ? (
                    <p className="text-[15.75px] leading-[26.25px] text-oxblood">
                      Effective {TERMS_EFFECTIVE}
                    </p>
                  ) : null}
                </header>

                {/* The safety notice outranks everything else on the page, so
                    it gets the band treatment rather than sitting in the run
                    of numbered clauses. */}
                <aside
                  role="note"
                  className="flex flex-col gap-[16px] border-[0.875px] border-solid border-clay-flat bg-oxblood p-[28px]"
                >
                  <p className="font-serif text-[clamp(1.125rem,1.62vw,24.5px)] leading-[28px] text-lime">
                    {TERMS_NOTICE.title}
                  </p>
                  <p className="text-[clamp(1rem,1.27vw,19.25px)] leading-[34.125px] text-paper">
                    {TERMS_NOTICE.body}
                  </p>
                </aside>

                <ol className="flex list-none flex-col gap-[40px]">
                  {TERMS_SECTIONS.map((section) => (
                    <li
                      key={section.n}
                      className="flex flex-col gap-[16px] border-l-[0.875px] border-solid border-clay-core pl-[24px] lg:pl-[32px]"
                    >
                      <h2 className="font-serif text-[21px] leading-[35px] text-field">
                        <span className="text-oxblood">{section.n}.</span>{' '}
                        {section.title}
                      </h2>

                      {section.body ? (
                        <p className="text-[16px] leading-[28px] text-oxblood">
                          {section.body}
                        </p>
                      ) : null}

                      {section.bullets ? (
                        <ul className="flex list-disc flex-col gap-[12px] pl-[20px] marker:text-clay-core">
                          {section.bullets.map((bullet) => (
                            <li
                              key={bullet.text}
                              className="text-[16px] leading-[28px] text-oxblood"
                            >
                              {bullet.lead ? (
                                <span className="font-semibold text-field">
                                  {bullet.lead}{' '}
                                </span>
                              ) : null}
                              {bullet.text}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </main>

          <SiteFooter base="/" />
        </div>
      </MotionConfig>
    </LazyMotion>
  )
}
