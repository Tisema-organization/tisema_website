import {
  GALLERY_INTRO,
  GALLERY_LANDING_ITEMS,
  GALLERY_PAGE_HREF,
  type GalleryItem,
} from '../../lib/content'
import { clientNavigate, useRouter } from '../../lib/router'
import {
  CarouselDots,
  CarouselTrack,
  useCarousel,
  usePerPage,
} from '../Carousel'
import { GalleryTile } from '../GalleryTile'
import { Reveal } from '../motion'
import { BandTitle } from './primitives'

export function CampaignGallery() {
  const { navigate } = useRouter()
  const perPage = usePerPage({ base: 2, lg: 4 })
  const { page, setPage, pageCount } = useCarousel(
    GALLERY_LANDING_ITEMS.length,
    perPage,
  )

  return (
    <section
      id="campaign-gallery"
      className="w-full scroll-mt-[105px] bg-paper py-[96px] lg:h-[1002px] lg:py-0"
    >
      <div className="section-shell flex h-full items-center">
        <div className="mx-auto flex w-full max-w-[1253.875px] flex-col gap-[56px] lg:gap-[105px]">
          <div className="flex flex-col gap-6 text-field lg:flex-row lg:items-center lg:gap-[233px]">
            <BandTitle
              text="Campaign Gallery"
              className="whitespace-nowrap lg:leading-[60px]"
            />
            <Reveal className="flex-1" delay={0.2}>
              <p className="text-[18px] leading-[34.125px]">{GALLERY_INTRO}</p>
            </Reveal>
          </div>

          <CarouselTrack<GalleryItem>
            items={GALLERY_LANDING_ITEMS}
            perPage={perPage}
            page={page}
            pageCount={pageCount}
            label="Gallery page"
            gridClassName="grid grid-cols-2 items-start gap-4 lg:grid-cols-4"
            render={(item, index) => (
              <GalleryTile
                key={item.id}
                item={item}
                delay={(index % perPage) * 0.08}
              />
            )}
          />

          <CarouselDots
            pageCount={pageCount}
            page={page}
            setPage={setPage}
            label="Gallery page"
          />

          <Reveal className="flex justify-center" delay={0.15}>
            <a
              href={GALLERY_PAGE_HREF}
              onClick={(e) => clientNavigate(e, GALLERY_PAGE_HREF, navigate)}
              className="inline-flex items-center justify-center gap-2 rounded-[4px] border border-solid border-oxblood px-6 py-3 font-serif text-[17px] leading-[28px] text-oxblood transition-opacity hover:opacity-80"
            >
              View all stories
              <span aria-hidden>→</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
