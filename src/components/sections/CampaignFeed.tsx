import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { FEED_INTRO, FEED_POSTS, type FeedPost } from '../../lib/content'
import { CarouselArrow } from '../Carousel'
import { Reveal } from '../motion'
import { BandTitle } from './primitives'

const GAP = 21

/**
 * Tracks a native scroller so the arrows can step it and disable themselves at
 * either end. Native scrolling is the point: it hands back trackpad swipes,
 * touch drags, shift-wheel and keyboard scrolling for free, none of which a
 * translate-based track gets without reimplementing them.
 */
function useRail() {
  const ref = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const reduced = useReducedMotion()

  const sync = useCallback(() => {
    const el = ref.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setAtStart(el.scrollLeft <= 1)
    // A rail with nothing to scroll counts as being at both ends at once.
    setAtEnd(max <= 1 || el.scrollLeft >= max - 1)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    sync()
    el.addEventListener('scroll', sync, { passive: true })
    const ro = new ResizeObserver(sync)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', sync)
      ro.disconnect()
    }
  }, [sync])

  const step = useCallback(
    (direction: 1 | -1) => {
      const el = ref.current
      if (!el) return
      const card = el.querySelector<HTMLElement>('[data-feed-card]')
      const amount = card ? card.offsetWidth + GAP : el.clientWidth * 0.8
      el.scrollBy({
        left: direction * amount,
        behavior: reduced ? 'auto' : 'smooth',
      })
    },
    [reduced],
  )

  return { ref, atStart, atEnd, step }
}

export function CampaignFeed() {
  const rail = useRail()

  return (
    <section
      id="campaign-feed"
      className="relative w-full scroll-mt-[105px] bg-paper py-[96px] lg:py-[120px]"
    >
      <div className="section-shell">
        <div className="mx-auto w-full max-w-[1253.875px]">
          <div className="flex flex-col gap-6 text-field lg:flex-row lg:items-center lg:gap-[233px]">
            <BandTitle
              text="Campaign Feed"
              className="whitespace-nowrap lg:leading-[60px]"
            />
            <Reveal className="flex-1" delay={0.2}>
              <p className="text-[18px] leading-[34.125px]">{FEED_INTRO}</p>
            </Reveal>
          </div>

          <div
            ref={rail.ref}
            className="section-rail mt-[56px] snap-x snap-mandatory lg:mt-[80px]"
            tabIndex={0}
            role="region"
            aria-label="Campaign feed posts"
          >
            <ul className="flex list-none" style={{ gap: `${GAP}px` }}>
              {FEED_POSTS.map((post, index) => (
                <li
                  key={post.id}
                  data-feed-card
                  className="w-[78vw] max-w-[340px] shrink-0 snap-start sm:w-[340px] sm:max-w-none lg:w-[403.958px]"
                >
                  <Post post={post} delay={(index % 3) * 0.08} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <CarouselArrow
        direction="prev"
        onClick={() => rail.step(-1)}
        disabled={rail.atStart}
        label="Previous posts"
        className="absolute top-1/2 left-[8px] hidden -translate-y-1/2 lg:flex lg:left-[24px]"
      />
      <CarouselArrow
        direction="next"
        onClick={() => rail.step(1)}
        disabled={rail.atEnd}
        label="Next posts"
        className="absolute top-1/2 right-[8px] hidden -translate-y-1/2 lg:flex lg:right-[24px]"
      />
    </section>
  )
}

function Post({ post, delay }: { post: FeedPost; delay: number }) {
  const initial = post.name.trim().charAt(0).toUpperCase() || 'U'

  return (
    <Reveal delay={delay}>
      <article className="flex flex-col items-center gap-[21px] pb-[7px]">
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-full transition-opacity hover:opacity-90"
          aria-label={`View ${post.name}'s TikTok post`}
        >
          <img
            src={post.src}
            alt=""
            width={1080}
            height={1350}
            loading="lazy"
            className="aspect-[403.958/472.5] w-full rounded-[16px] object-cover"
          />
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
        </a>

        <div className="flex w-full flex-col gap-[7px] px-[14px]">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-[7px]">
              {post.avatarSrc ? (
                <img
                  src={post.avatarSrc}
                  alt=""
                  width={31}
                  height={31}
                  className="size-[30.625px] shrink-0 rounded-full object-cover"
                />
              ) : (
                <div className="flex size-[30.625px] shrink-0 items-center justify-center rounded-[20.417px] border-[0.263px] border-solid border-clay-highlight bg-oxblood p-[5.104px]">
                  <p className="font-serif text-[10.719px] leading-normal text-field">
                    {initial}
                  </p>
                </div>
              )}
              <div className="flex min-w-0 flex-col gap-[1.75px] text-field">
                <p className="truncate text-[12.25px] leading-[15.75px] font-bold">
                  {post.name}
                </p>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-[10.5px] leading-[15.75px] transition-opacity hover:opacity-70"
                >
                  {post.handle}
                </a>
              </div>
            </div>
            <p className="shrink-0 text-[10.5px] leading-[15.75px] whitespace-nowrap text-field">
              {post.age}
            </p>
          </div>
          <p className="line-clamp-4 text-[12.25px] leading-[19.25px] text-field">
            {post.body}
          </p>
        </div>
      </article>
    </Reveal>
  )
}
