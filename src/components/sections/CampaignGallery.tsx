import { GALLERY_INTRO, GALLERY_ITEMS } from '../../lib/content'
import { BandTitle } from './primitives'

export function CampaignGallery() {
  return (
    <section
      id="campaign-gallery"
      className="w-full scroll-mt-[105px] bg-paper py-[96px] lg:h-[1002px] lg:py-0"
    >
      <div className="section-shell flex h-full items-center">
        <div className="mx-auto flex w-full max-w-[1253.875px] flex-col gap-[56px] lg:gap-[105px]">
          <div className="flex flex-col gap-6 text-field lg:flex-row lg:items-center lg:gap-[233px]">
            <BandTitle className="whitespace-nowrap lg:leading-[97.125px]">
              Campaign Gallery
            </BandTitle>
            <p className="flex-1 text-[18px] leading-[34.125px]">
              {GALLERY_INTRO}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {GALLERY_ITEMS.map((item, i) => (
              <figure
                key={`${item.src}-${i}`}
                className="flex flex-col justify-center gap-[21px] overflow-hidden rounded-[8px] pb-[16px]"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  width={1080}
                  height={1350}
                  loading="lazy"
                  className="h-[240px] w-full object-cover lg:h-[364.875px]"
                />
                <figcaption className="flex flex-col gap-[7px] px-[14px] text-field">
                  <p className="font-serif text-[17.5px] leading-[34.125px]">
                    {item.title}
                  </p>
                  <p className="text-[12.25px] leading-[19.25px]">
                    {item.body}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>

          <img
            src="/design/gallery-dots.svg"
            alt=""
            width={107}
            height={9.727}
            className="mx-auto block w-[107px]"
            style={{ height: '9.727px' }}
          />
        </div>
      </div>
    </section>
  )
}
