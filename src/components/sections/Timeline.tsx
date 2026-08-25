import { useCallback, useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  m,
  useReducedMotion,
} from 'motion/react'
import { TIMELINE } from '../../lib/content'
import { BandTitle } from './primitives'

/**
 * Horizontal timeline, read through a fixed lens.
 *
 * The comp draws August 2023 expanded at x=164 with a stem down to the axis.
 * Rather than move that furniture around, it is treated as a *reading
 * position*: the panel and the stem never move, and the track of dots and
 * dates slides so the selected point comes to rest under the stem. Points
 * ahead of the selection sit off to the right and are revealed as it advances.
 */

/** Reading position on the 1512px frame — the comp's first point. */
const READ_FRAC = 164 / 1512
const READ_MIN = 20
const READ_MAX = 164

/** Gap between points. Wider than the comp so there is always more to reveal. */
const SPACING_LG = 340
const SPACING_SM = 200

/** Design widths: the panel column, and stem + gap above the axis. */
const PANEL_W = 684
const STEM_H = 116
const PANEL_GAP = 48

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

export function Timeline() {
  const railRef = useRef<HTMLDivElement>(null)
  const dotRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [railW, setRailW] = useState(0)
  const [active, setActive] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    const ro = new ResizeObserver(([entry]) =>
      setRailW(entry.contentRect.width),
    )
    ro.observe(rail)
    return () => ro.disconnect()
  }, [])

  const wide = railW >= 1024
  const readX =
    railW > 0 ? clamp(railW * READ_FRAC, READ_MIN, READ_MAX) : READ_MAX
  const spacing = wide ? SPACING_LG : SPACING_SM
  const rightInset = wide ? 86 : 20
  const panelW =
    railW > 0
      ? Math.max(240, Math.min(PANEL_W, railW - readX - rightInset))
      : PANEL_W

  /** The track carries every point; sliding it parks the live one at readX. */
  const trackX = -spacing * active

  const select = useCallback((i: number) => setActive(i), [])

  const onKeyDown = (event: React.KeyboardEvent) => {
    const last = TIMELINE.length - 1
    let next = -1
    if (event.key === 'ArrowRight') next = active === last ? 0 : active + 1
    else if (event.key === 'ArrowLeft') next = active === 0 ? last : active - 1
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = last
    if (next < 0) return
    event.preventDefault()
    select(next)
    dotRefs.current[next]?.focus()
  }

  const entry = TIMELINE[active]
  const glide = reduced
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 150, damping: 24, mass: 0.9 }
  const swap = { duration: reduced ? 0 : 0.28, ease: EASE }

  /*
   * Points fade at the edges instead of being guillotined by the clip. The
   * faded tail is shorter on narrow screens, where every pixel of reachable
   * track counts — a masked-out point is not clickable.
   */
  const trackMask = `linear-gradient(to right, transparent 0, #000 24px, #000 calc(100% - ${
    wide ? 130 : 56
  }px), transparent 100%)`

  return (
    <LazyMotion features={domAnimation} strict>
      <section
        id="timeline"
        className="w-full scroll-mt-[105px] bg-paper py-[80px] lg:py-0"
      >
        <div className="section-shell">
          <BandTitle className="text-field lg:pt-[75.63px] lg:leading-[76.1px]">
            Timeline of the Movement
          </BandTitle>
        </div>

        <m.div
          ref={railRef}
          /*
           * `clip`, not `hidden`. `hidden` is still a scroll container, so
           * focusing a tab that is off to the right makes the browser scroll
           * the rail — dragging the parked panel and stem off with it. `clip`
           * cannot be scrolled at all.
           */
          className="relative mx-auto h-[560px] [overflow:clip] lg:h-[640px] lg:w-[1512px]"
          initial="hidden"
          /*
           * The reveal is held in state rather than left to `whileInView`, so
           * anything that mounts after it has fired still lands on `shown`
           * instead of being stranded at `hidden`.
           */
          animate={revealed ? 'shown' : 'hidden'}
          viewport={{ once: true, amount: 0.3 }}
          onViewportEnter={() => setRevealed(true)}
        >
          {/* Axis — full bleed and still; a uniform line reads the same either
              way, so only the points actually need to travel. */}
          <m.img
            src="/design/timeline-axis.svg"
            alt=""
            className="absolute left-0 h-px w-full origin-left"
            style={{ top: '86%' }}
            variants={{ hidden: { scaleX: 0 }, shown: { scaleX: 1 } }}
            transition={{ duration: reduced ? 0 : 0.9, ease: 'easeOut' }}
          />

          {/* Panel — parked at the reading position, swapping in place. */}
          <m.div
            className="pointer-events-none absolute"
            style={{
              left: readX,
              width: panelW,
              bottom: `calc(14% + ${STEM_H + PANEL_GAP}px)`,
            }}
            variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
            transition={{
              duration: reduced ? 0 : 0.5,
              delay: reduced ? 0 : 0.35,
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={active}
                id={`timeline-panel-${active}`}
                role="tabpanel"
                aria-labelledby={`timeline-tab-${active}`}
                className="flex flex-col justify-end gap-[16px] text-field"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={swap}
              >
                <p className="font-serif text-[24px] leading-[34.125px]">
                  {entry.title}
                </p>
                <p className="text-[18px] leading-[34.125px]">{entry.body}</p>
                <p className="font-serif text-[40px] leading-[47px] whitespace-nowrap">
                  {entry.date}
                </p>
              </m.div>
            </AnimatePresence>
          </m.div>

          {/* Stem — also parked; the live point comes to it. */}
          <m.div
            className="pointer-events-none absolute"
            style={{ left: readX, bottom: '14%' }}
            variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
            transition={{
              duration: reduced ? 0 : 0.5,
              delay: reduced ? 0 : 0.45,
            }}
          >
            <img
              src="/design/timeline-marker.svg"
              alt=""
              width={16}
              height={116}
              className="block h-[116px] w-[16px] -scale-y-100"
            />
          </m.div>

          {/*
            The edge mask has to sit on a STILL wrapper. On the track itself it
            travels with the translation, so its opaque window slides away and
            points that are plainly on screen end up masked out — and since a
            masked-out area does not hit-test, they stop being clickable too.
          */}
          <div
            role="tablist"
            aria-label="Timeline of the movement"
            aria-orientation="horizontal"
            className="pointer-events-none absolute inset-0"
            style={{ maskImage: trackMask, WebkitMaskImage: trackMask }}
            onKeyDown={onKeyDown}
          >
            <m.div
              className="absolute inset-0"
              animate={{ x: trackX }}
              transition={glide}
            >
              {TIMELINE.map((point, i) => (
                <div
                  key={point.date}
                  role="presentation"
                  className="absolute"
                  style={{ left: readX + spacing * i, bottom: '14%' }}
                >
                  <m.button
                    ref={(el) => {
                      dotRefs.current[i] = el
                    }}
                    type="button"
                    role="tab"
                    id={`timeline-tab-${i}`}
                    aria-selected={i === active}
                    aria-controls={`timeline-panel-${i}`}
                    tabIndex={i === active ? 0 : -1}
                    onClick={() => select(i)}
                    className="pointer-events-auto flex cursor-pointer flex-col items-start gap-[24px] rounded-sm focus-visible:ring-2 focus-visible:ring-oxblood focus-visible:ring-offset-4 focus-visible:ring-offset-paper focus-visible:outline-none"
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      shown: { opacity: 1, y: 0 },
                    }}
                    /* Stated outright rather than inherited — the track between
                     here and the rail carries its own `animate`. */
                    animate={revealed ? 'shown' : 'hidden'}
                    transition={{
                      duration: reduced ? 0 : 0.45,
                      delay: reduced ? 0 : 0.25 + i * 0.09,
                    }}
                  >
                    {/*
                    The live entry shows its date large in the panel, so the
                    small label fades but keeps its box — the dot must not hop.
                  */}
                    <m.span
                      aria-hidden
                      className="block font-serif text-[14px] leading-[20px] whitespace-nowrap text-field lg:text-[20px] lg:leading-[24px]"
                      animate={{ opacity: i === active ? 0 : 1 }}
                      transition={swap}
                    >
                      {point.date}
                    </m.span>

                    <span className="relative block size-[16px]">
                      <m.span
                        className="absolute -inset-[7px] rounded-full bg-oxblood/15"
                        animate={{
                          opacity: i === active ? 1 : 0,
                          scale: i === active ? 1 : 0.5,
                        }}
                        transition={swap}
                      />
                      <m.img
                        src="/design/timeline-dot.svg"
                        alt=""
                        width={16}
                        height={16}
                        className="relative block size-[16px]"
                        whileHover={reduced ? undefined : { scale: 1.25 }}
                        transition={swap}
                      />
                    </span>
                    <span className="sr-only">
                      {point.title
                        ? `${point.date}: ${point.title}`
                        : point.date}
                    </span>
                  </m.button>
                </div>
              ))}
            </m.div>
          </div>

          {/* Past points slide out of reach, so stepping needs its own control. */}
          <m.div
            className="absolute right-[20px] flex gap-[12px] lg:right-[71px]"
            /* Above the stem's full height, so a date label arriving at the
               right edge never slides underneath the controls. */
            style={{ bottom: `calc(14% + ${STEM_H + 20}px)` }}
            variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
            transition={{
              duration: reduced ? 0 : 0.5,
              delay: reduced ? 0 : 0.55,
            }}
          >
            {(
              [
                ['Previous entry', -1, '-rotate-90'],
                ['Next entry', 1, 'rotate-90'],
              ] as const
            ).map(([label, step, spin]) => {
              const target = active + step
              const disabled = target < 0 || target > TIMELINE.length - 1
              return (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  disabled={disabled}
                  onClick={() => select(target)}
                  className={`flex size-[40px] items-center justify-center overflow-hidden rounded-[90px] bg-clay-highlight/36 p-[12px] shadow-[4px_4px_31px_0px_rgba(19,19,19,0.3)] transition-opacity ${spin} ${
                    disabled
                      ? 'cursor-default opacity-25'
                      : 'cursor-pointer hover:opacity-80'
                  }`}
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
            })}
          </m.div>
        </m.div>
      </section>
    </LazyMotion>
  )
}
