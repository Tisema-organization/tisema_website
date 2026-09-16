import { FAQ_PAGE_HREF, FAQ_PAGE_INTRO, FAQ_PAGE_TITLE } from '../../lib/faq'
import { clientNavigate, useRouter } from '../../lib/router'
import { Reveal } from '../motion'

export function FaqHighlight() {
  const { navigate } = useRouter()

  return (
    <section
      id="faq"
      className="w-full scroll-mt-[68px] bg-paper py-[64px] lg:py-[96px]"
    >
      <div className="section-shell">
        <Reveal className="mx-auto flex w-full max-w-[820px] flex-col items-center gap-6 text-center">
          <span className="rounded-full bg-oxblood px-4 py-2 text-[14px] font-semibold tracking-[0.02em] text-paper">
            FAQ
          </span>
          <h2 className="font-serif text-[clamp(1.75rem,3.5vw,40px)] leading-[1.2] text-field">
            {FAQ_PAGE_TITLE}
          </h2>
          <p className="text-[17px] leading-[28px] text-field">{FAQ_PAGE_INTRO}</p>
          <a
            href={FAQ_PAGE_HREF}
            onClick={(e) => clientNavigate(e, FAQ_PAGE_HREF, navigate)}
            className="inline-flex items-center justify-center rounded-[4px] border border-solid border-oxblood px-6 py-3 font-serif text-[17px] leading-[28px] text-oxblood transition-opacity hover:opacity-80"
          >
            Browse all questions
            <span aria-hidden className="ml-2">
              →
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
