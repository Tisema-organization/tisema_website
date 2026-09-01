import { ABOUT_EYEBROW, ASK_EMPHASIS, ASK_LEAD } from '../../lib/content'
import { Reveal, Typewriter } from '../motion'
import { Eyebrow } from './primitives'

export function AboutCampaign() {
  return (
    <section
      id="about-the-campaign"
      className="w-full scroll-mt-[105px] bg-paper py-[96px] lg:h-[635px] lg:py-0"
    >
      <div className="section-shell flex h-full flex-col justify-center">
        <div className="flex w-full max-w-[1031.625px] flex-col gap-[35px] lg:ml-[80.5px]">
          <Eyebrow className="text-oxblood">{ABOUT_EYEBROW}</Eyebrow>

          {/* The campaign's central demand — the one line worth typing out,
              with the ask itself carrying the accent colour. */}
          <Reveal className="border-l-[2.625px] border-solid border-lime py-[8.75px] pr-[8.75px] pl-[24px] lg:pl-[56px]">
            <p className="font-serif text-[clamp(1.5rem,3.17vw,48px)] leading-[1.3125] text-oxblood">
              <Typewriter
                segments={[
                  { text: ASK_LEAD },
                  { text: ASK_EMPHASIS, className: 'text-lime' },
                ]}
              />
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
