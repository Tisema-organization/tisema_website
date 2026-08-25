import { FEED_INTRO, FEED_POSTS } from '../../lib/content'
import { BandTitle } from './primitives'

export function CampaignFeed() {
  return (
    <section
      id="campaign-feed"
      className="relative w-full scroll-mt-[105px] bg-paper py-[96px] lg:h-[975px] lg:py-0"
    >
      <div className="section-shell flex h-full items-center">
        <div className="mx-auto flex w-full max-w-[1253.875px] flex-col gap-[56px] lg:gap-[105px]">
          <div className="flex flex-col gap-6 text-field lg:flex-row lg:items-center lg:gap-[233px]">
            <BandTitle className="whitespace-nowrap lg:leading-[97.125px]">
              Campaign Feed
            </BandTitle>
            <p className="flex-1 text-[18px] leading-[34.125px]">{FEED_INTRO}</p>
          </div>

          <div className="grid gap-[21px] sm:grid-cols-2 lg:grid-cols-3">
            {FEED_POSTS.map((post, i) => (
              <article
                key={`${post.src}-${i}`}
                className="flex flex-col items-center gap-[21px] pb-[7px]"
              >
                <div className="relative w-full">
                  <img
                    src={post.src}
                    alt=""
                    width={1080}
                    height={1350}
                    loading="lazy"
                    className="aspect-[403.958/472.5] w-full rounded-[16px] object-cover"
                  />
                  {/*
                    The badge's export is the shadowed 64.36x65.07 mark, which
                    the design bleeds outside a 32.365x33.069 box. Keeping both
                    boxes preserves the shadow falloff instead of shrinking the
                    glyph to the outer size.
                  */}
                  <div className="absolute top-[15px] left-[16.5px] h-[33.069px] w-[32.365px]">
                    <img
                      src="/design/social-5.svg"
                      alt=""
                      width={64.3646}
                      height={65.0693}
                      className="absolute block max-w-none"
                      style={{
                        top: '-36.29%',
                        left: '-37.08%',
                        width: '198.88%',
                        height: '196.77%',
                      }}
                    />
                  </div>
                </div>

                <div className="flex w-full flex-col gap-[7px] px-[14px]">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-[7px]">
                      <div className="flex size-[30.625px] items-center justify-center rounded-[20.417px] border-[0.263px] border-solid border-clay-highlight bg-oxblood p-[5.104px]">
                        <p className="font-serif text-[10.719px] leading-normal text-field">
                          U
                        </p>
                      </div>
                      <div className="flex w-[87.5px] flex-col gap-[1.75px] whitespace-nowrap text-field">
                        <p className="text-[12.25px] leading-[15.75px] font-bold">
                          {post.name}
                        </p>
                        <p className="text-[10.5px] leading-[15.75px]">
                          {post.handle}
                        </p>
                      </div>
                    </div>
                    <p className="text-[10.5px] leading-[15.75px] whitespace-nowrap text-field">
                      {post.age}
                    </p>
                  </div>
                  <p className="text-[12.25px] leading-[19.25px] text-field">
                    {post.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        aria-label="Next posts"
        className="absolute top-1/2 right-[71px] hidden size-[40px] -translate-y-1/2 rotate-90 items-center justify-center overflow-hidden rounded-[90px] bg-clay-highlight/36 p-[12px] shadow-[4px_4px_31px_0px_rgba(19,19,19,0.3)] lg:flex"
      >
        <img
          src="/design/arrow-bold.svg"
          alt=""
          width={12.444}
          height={18.07}
          className="block w-[12.444px]"
          style={{ height: '18.07px' }}
        />
      </button>
    </section>
  )
}
