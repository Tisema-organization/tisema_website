import { useEffect, useState, type ReactNode } from 'react'
import { m } from 'motion/react'
import { EASE_OUT } from './motion'

/**
 * Paged carousel shared by the gallery and the feed.
 *
 * The design ships a static five-dot indicator, but a real indicator has to
 * follow the item count, so the dots are rebuilt as buttons here. Their
 * geometry is lifted straight off `gallery-dots.svg`: a 9.727px dot (r 4.864),
 * the live one filled Clay Highlight inside a 3.648px Body Rose ring at 16%,
 * with centres 24.318px apart.
 */

const DOT = 9.727
const RING = 17.023
const RING_W = 3.64773
const STEP = 24.318

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const sync = () => setMatches(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [query])
  return matches
}

/** How many items share a page at the current breakpoint. */
export function usePerPage(steps: { base: number; sm?: number; lg?: number }) {
  const sm = useMediaQuery('(min-width: 40rem)')
  const lg = useMediaQuery('(min-width: 64rem)')
  if (lg && steps.lg) return steps.lg
  if (sm && steps.sm) return steps.sm
  return steps.base
}

export function useCarousel(count: number, perPage: number) {
  const pageCount = Math.max(1, Math.ceil(count / perPage))
  const [page, setPage] = useState(0)

  // A breakpoint change can shrink the page count out from under the cursor.
  useEffect(() => {
    setPage((p) => Math.min(p, pageCount - 1))
  }, [pageCount])

  const pages = Array.from({ length: pageCount }, (_, i) => i)
  return { page, setPage, pageCount, pages, perPage }
}

export function CarouselTrack<T>({
  items,
  perPage,
  page,
  pageCount,
  gridClassName,
  label,
  render,
}: {
  items: readonly T[]
  perPage: number
  page: number
  pageCount: number
  gridClassName: string
  label: string
  render: (item: T, index: number) => ReactNode
}) {
  return (
    <div className="[overflow:clip]" aria-live="polite">
      <m.div
        className="flex"
        animate={{ x: `-${page * 100}%` }}
        transition={{ duration: 0.55, ease: EASE_OUT }}
      >
        {Array.from({ length: pageCount }, (_, p) => {
          const slice = items.slice(p * perPage, p * perPage + perPage)
          const offscreen = p !== page
          return (
            <div
              key={p}
              className="w-full shrink-0"
              role="group"
              aria-roledescription="slide"
              aria-label={`${label} ${p + 1} of ${pageCount}`}
              /* Keeps off-screen links out of the tab order and the a11y tree. */
              {...(offscreen ? { inert: true } : {})}
            >
              <div className={gridClassName}>
                {slice.map((item, i) => render(item, p * perPage + i))}
              </div>
            </div>
          )
        })}
      </m.div>
    </div>
  )
}

export function CarouselDots({
  pageCount,
  page,
  setPage,
  label,
  className = '',
}: {
  pageCount: number
  page: number
  setPage: (n: number) => void
  label: string
  className?: string
}) {
  if (pageCount < 2) return null

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{ gap: `${STEP - RING}px` }}
    >
      {Array.from({ length: pageCount }, (_, i) => {
        const live = i === page
        return (
          <button
            key={i}
            type="button"
            onClick={() => setPage(i)}
            aria-label={`${label} ${i + 1} of ${pageCount}`}
            aria-current={live ? 'true' : undefined}
            className="grid cursor-pointer place-items-center rounded-full focus-visible:ring-2 focus-visible:ring-oxblood focus-visible:ring-offset-2 focus-visible:ring-offset-paper focus-visible:outline-none"
            /* Visual is tiny; the hit area is not. */
            style={{ width: 40, height: 40 }}
          >
            <span
              className="relative grid place-items-center"
              style={{ width: RING, height: RING }}
            >
              {live && (
                <m.span
                  className="absolute rounded-full"
                  style={{
                    width: RING,
                    height: RING,
                    border: `${RING_W}px solid rgba(218,191,185,0.16)`,
                    boxSizing: 'border-box',
                  }}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                />
              )}
              <m.span
                className="rounded-full"
                style={{ width: DOT, height: DOT }}
                animate={{ backgroundColor: live ? '#a55b47' : '#652314' }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
              />
            </span>
          </button>
        )
      })}
    </div>
  )
}

/** The design's 40px round arrow, as used beside the feed. */
export function CarouselArrow({
  direction,
  onClick,
  disabled,
  label,
  className = '',
}: {
  direction: 'prev' | 'next'
  onClick: () => void
  disabled: boolean
  label: string
  className?: string
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`flex size-[40px] items-center justify-center overflow-hidden rounded-[90px] bg-clay-highlight/36 p-[12px] shadow-[4px_4px_31px_0px_rgba(19,19,19,0.3)] transition-opacity ${
        direction === 'next' ? 'rotate-90' : '-rotate-90'
      } ${disabled ? 'cursor-default opacity-25' : 'cursor-pointer hover:opacity-80'} ${className}`}
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
  )
}
