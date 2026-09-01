import {
  GALLERY_INTRO,
  GALLERY_ITEMS,
  type GalleryItem,
} from '../../lib/content'
import {
  CarouselDots,
  CarouselTrack,
  useCarousel,
  usePerPage,
} from '../Carousel'
import { Reveal } from '../motion'
import { BandTitle } from './primitives'

export function CampaignGallery() {
  const perPage = usePerPage({ base: 2, lg: 4 })
  const { page, setPage, pageCount } = useCarousel(
    GALLERY_ITEMS.length,
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
            items={GALLERY_ITEMS}
            perPage={perPage}
            page={page}
            pageCount={pageCount}
            label="Gallery page"
            gridClassName="grid grid-cols-2 gap-4 lg:grid-cols-4"
            render={(item, index) => (
              <Tile key={index} item={item} delay={(index % perPage) * 0.08} />
            )}
          />

          <CarouselDots
            pageCount={pageCount}
            page={page}
            setPage={setPage}
            label="Gallery page"
          />
        </div>
      </div>
    </section>
  )
}

function Tile({ item, delay }: { item: GalleryItem; delay: number }) {
  return (
    <Reveal delay={delay}>
      {/*
        The download affordance is a real link, so it is reachable by keyboard —
        `focus-within` mirrors `hover` rather than leaving it mouse-only.
      */}
      <figure className="group flex flex-col justify-center gap-[21px] overflow-hidden rounded-[8px] pb-[16px]">
        <div className="relative overflow-hidden">
          <img
            src={item.src}
            alt={item.title}
            width={1080}
            height={1350}
            loading="lazy"
            className="h-[240px] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] lg:h-[364.875px]"
          />

          <div className="pointer-events-none absolute inset-0 grid place-items-center bg-field/65 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
            <a
              href={item.file}
              /* Names the saved file after the story rather than the asset
                 path, so "heaven.png" lands as "Heaven.png". */
              download={`${item.title}${item.file.slice(item.file.lastIndexOf('.'))}`}
              aria-label={`Download ${item.title}`}
              className="pointer-events-auto flex items-center justify-center gap-[8.75px] rounded-[8px] border-[0.438px] border-solid border-lime px-[21px] py-[5.25px] transition-colors hover:bg-lime/10 focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-field focus-visible:outline-none"
            >
              <img
                src="/design/icon-download.svg"
                alt=""
                width={21}
                height={21}
                className="block size-[21px]"
              />
              <span className="text-[15.75px] leading-[28px] font-light whitespace-nowrap text-lime">
                Download
              </span>
            </a>
          </div>
        </div>

        <figcaption className="flex flex-col gap-[7px] px-[14px] text-field">
          <p className="font-serif text-[17.5px] leading-[34.125px]">
            {item.title}
          </p>
          <p className="text-[12.25px] leading-[19.25px]">{item.body}</p>
        </figcaption>
      </figure>
    </Reveal>
  )
}
