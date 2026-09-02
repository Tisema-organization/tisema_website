import { Reveal } from './motion'
import type { GalleryItem } from '../lib/content'

type GalleryTileProps = {
  item: GalleryItem
  delay?: number
  /**
   * The full gallery lists every portrait, and only a handful have a story
   * yet. Showing the description where it exists would leave most tiles with
   * a bare name beside a few that carry a paragraph, so that page opts out
   * and reads as one consistent grid of names.
   */
  showBody?: boolean
}

function downloadName(item: GalleryItem) {
  return `${item.title}${item.file.slice(item.file.lastIndexOf('.'))}`
}

function DownloadButton({
  item,
  className,
}: {
  item: GalleryItem
  className: string
}) {
  return (
    <a
      href={item.file}
      download={downloadName(item)}
      aria-label={`Download ${item.title}`}
      className={className}
    >
      <img
        src="/design/icon-download.svg"
        alt=""
        width={21}
        height={21}
        className="block size-[21px] shrink-0"
      />
      <span className="text-[15.75px] leading-[28px] font-light whitespace-nowrap">
        Download
      </span>
    </a>
  )
}

export function GalleryTile({
  item,
  delay = 0,
  showBody = true,
}: GalleryTileProps) {
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
            srcSet={item.srcSet}
            /*
              A tile is ~302px wide at desktop and about 45vw below it. Without
              this the browser assumes 100vw and picks the largest candidate for
              every tile, which throws away the point of shipping two widths.
            */
            sizes="(min-width: 1024px) 302px, 45vw"
            alt={item.title}
            width={1080}
            height={1350}
            loading="lazy"
            /* Keeps decode off the main thread — it adds up across 50+ tiles. */
            decoding="async"
            className="h-[240px] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] lg:h-[364.875px]"
          />

          {/* Touch: always-visible bar — hover overlays do not exist on phones. */}
          <div className="absolute inset-x-0 bottom-0 flex justify-center bg-field/85 px-4 py-3 lg:hidden">
            <DownloadButton
              item={item}
              className="inline-flex items-center justify-center gap-[8.75px] rounded-[8px] border-[0.438px] border-solid border-lime px-[21px] py-[5.25px] text-lime transition-colors hover:bg-lime/10 focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-field focus-visible:outline-none"
            />
          </div>

          <div className="pointer-events-none absolute inset-0 hidden place-items-center bg-field/65 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 lg:grid">
            <DownloadButton
              item={item}
              className="pointer-events-auto inline-flex items-center justify-center gap-[8.75px] rounded-[8px] border-[0.438px] border-solid border-lime px-[21px] py-[5.25px] text-lime transition-colors hover:bg-lime/10 focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-field focus-visible:outline-none"
            />
          </div>
        </div>

        <figcaption className="flex flex-col gap-[7px] px-[14px] text-field">
          <p className="font-serif text-[17.5px] leading-[34.125px]">
            {item.title}
          </p>
          {showBody && item.body ? (
            <p className="text-[12.25px] leading-[19.25px]">{item.body}</p>
          ) : null}
        </figcaption>
      </figure>
    </Reveal>
  )
}
