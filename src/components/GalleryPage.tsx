import { useEffect, useState } from 'react'
import { domAnimation, LazyMotion, MotionConfig } from 'motion/react'
import { CarouselDots } from './Carousel'
import { GalleryTile } from './GalleryTile'
import { SiteNav } from './SiteNav'
import { SiteFooter } from './sections/SiteFooter'
import { BandTitle } from './sections/primitives'
import { GALLERY_INTRO, GALLERY_ITEMS } from '../lib/content'
import { clientNavigate, useRouter } from '../lib/router'

const PER_PAGE = 12

export function GalleryPage() {
  const { navigate } = useRouter()
  const pageCount = Math.max(1, Math.ceil(GALLERY_ITEMS.length / PER_PAGE))
  const [page, setPage] = useState(0)

  useEffect(() => {
    setPage((p) => Math.min(p, pageCount - 1))
  }, [pageCount])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])

  const start = page * PER_PAGE
  const visible = GALLERY_ITEMS.slice(start, start + PER_PAGE)
  const rangeStart = GALLERY_ITEMS.length ? start + 1 : 0
  const rangeEnd = Math.min(start + PER_PAGE, GALLERY_ITEMS.length)

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <div className="relative min-h-screen bg-paper">
          <SiteNav pinned base="/" />

          <main className="pt-[72px] lg:pt-[105px]">
            <div className="section-shell py-[56px] lg:py-[96px]">
              <div className="mx-auto flex w-full max-w-[1253.875px] flex-col gap-[48px] lg:gap-[72px]">
                <header className="flex max-w-[820px] flex-col gap-[16px]">
                  <a
                    href="/"
                    onClick={(e) => clientNavigate(e, '/', navigate)}
                    className="w-fit font-serif text-[15.75px] leading-[28px] text-oxblood transition-opacity hover:opacity-70"
                  >
                    ← Back to home
                  </a>
                  <BandTitle
                    text="Campaign Gallery"
                    className="text-field lg:leading-[60px]"
                  />
                  <p className="text-[18px] leading-[34.125px] text-field">
                    {GALLERY_INTRO}
                  </p>
                  {GALLERY_ITEMS.length > PER_PAGE ? (
                    <p className="text-[15.75px] leading-[26px] text-oxblood">
                      Showing {rangeStart}–{rangeEnd} of {GALLERY_ITEMS.length}{' '}
                      stories
                    </p>
                  ) : null}
                </header>

                <ul className="grid list-none grid-cols-1 items-start gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {visible.map((item, index) => (
                    <li key={item.id}>
                      <GalleryTile
                        item={item}
                        delay={(index % 4) * 0.06}
                        showBody={false}
                      />
                    </li>
                  ))}
                </ul>

                {pageCount > 1 ? (
                  <CarouselDots
                    pageCount={pageCount}
                    page={page}
                    setPage={setPage}
                    label="Gallery page"
                  />
                ) : null}
              </div>
            </div>
          </main>

          <SiteFooter base="/" />
        </div>
      </MotionConfig>
    </LazyMotion>
  )
}
