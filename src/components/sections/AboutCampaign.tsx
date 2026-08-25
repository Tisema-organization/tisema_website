import { ASK_EMPHASIS, ASK_LEAD } from '../../lib/content'
import { BandTitle, Eyebrow } from './primitives'

export function AboutCampaign() {
  return (
    <section
      id="about-the-campaign"
      className="w-full scroll-mt-[105px] bg-field py-[96px] lg:h-[825.125px] lg:py-0"
    >
      <div className="section-shell flex h-full flex-col justify-center gap-[56px] lg:justify-start lg:gap-0">
        <BandTitle className="text-paper lg:mt-[119px] lg:ml-[63.88px] lg:leading-[97.125px]">
          About The Campaign{' '}
        </BandTitle>

        <div className="flex w-full max-w-[1031.625px] flex-col gap-[35px] lg:mt-[100.5px] lg:ml-[80.5px]">
          <Eyebrow tone="lime" className="text-lime">
            The Ask
          </Eyebrow>

          <div className="border-l-[2.625px] border-solid border-lime py-[8.75px] pr-[8.75px] pl-[24px] lg:pl-[56px]">
            <p className="font-serif text-[clamp(1.5rem,3.17vw,48px)] leading-[1.3125] text-paper">
              {ASK_LEAD}
              <span className="text-lime">{ASK_EMPHASIS}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
