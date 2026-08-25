import {
  ABOUT_EYEBROW,
  ABOUT_HEADING,
  ASK_EMPHASIS,
  ASK_LEAD,
} from '../../lib/content'
import { Reveal, Typewriter } from '../motion'
import { BandTitle, Eyebrow } from './primitives'

export function AboutCampaign() {
  return (
    <section
      id="about-the-campaign"
      className="w-full scroll-mt-[105px] bg-field py-[96px] lg:h-[825.125px] lg:py-0"
    >
      <div className="section-shell flex h-full flex-col justify-center gap-[35px] lg:justify-start lg:gap-0">
        <Eyebrow className="text-lime lg:mt-[119px] lg:ml-[80.5px]">
          {ABOUT_EYEBROW}
        </Eyebrow>

        <BandTitle
          text={ABOUT_HEADING}
          className="text-paper lg:mt-[56px] lg:ml-[80.5px] lg:leading-[97.125px]"
        />

        <div className="flex w-full max-w-[1031.625px] flex-col gap-[35px] lg:mt-[24px] lg:ml-[80.5px]">

          {/* The campaign's central demand — the one line worth landing word
              by word, with the ask itself carrying the accent colour. */}
          <Reveal className="border-l-[2.625px] border-solid border-lime py-[8.75px] pr-[8.75px] pl-[24px] lg:pl-[56px]">
            <p className="font-serif text-[clamp(1.5rem,3.17vw,48px)] leading-[1.3125] text-paper">
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
