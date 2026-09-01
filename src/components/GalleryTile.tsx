import { Reveal } from './motion'
import type { GalleryItem } from '../lib/content'

type GalleryTileProps = {
  item: GalleryItem
  delay?: number
}

export function GalleryTile({ item, delay = 0 }: GalleryTileProps) {
  return (
    <Reveal delay={delay}>
      {/*
        The download affordance is a real link, so it is reachable by keyboard —
        `focus-within` mirrors `hover` rather than leaving it mouse-only.
      */}
      <figure className="group flex flex-col gap-[21px] overflow-hidden rounded-[8px] pb-[16px]">
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
