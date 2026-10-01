import { Reveal } from '../motion'
import { BandTitle } from './primitives'

const TIKTOK_HASHTAG_URL =
  'https://www.tiktok.com/tag/%E1%89%B5%E1%88%B0%E1%88%9B'

export function CampaignFeed() {
  return (
    <section
      id="campaign-feed"
      className="relative w-full scroll-mt-[68px] bg-paper py-[96px] lg:py-[120px]"
    >
      <div className="section-shell">
        <div className="mx-auto w-full max-w-[1253.875px]">
          <div className="flex flex-col gap-6 text-field lg:flex-row lg:items-center lg:gap-[233px]">
            <BandTitle
              text="#ትሰማ on TikTok"
              className="whitespace-nowrap lg:leading-[60px]"
            />

            <Reveal className="flex-1" delay={0.2}>
              <div className="flex flex-col items-start gap-6">
                <p className="text-[18px] leading-[34.125px]">
                  Follow #ትሰማ on TikTok to see how people are sharing,
                  organizing, speaking out, and amplifying the movement.
                </p>

                <a
                  href={TIKTOK_HASHTAG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-field px-7 py-4 text-[15px] font-bold text-paper transition-opacity hover:opacity-80"
                >
                  View #ትሰማ on TikTok →
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
