import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { TIMELINE } from '../../lib/content'
import { BandTitle } from './primitives'

/**
 * Horizontal timeline, read through a fixed lens.
 *
 * The comp draws August 2023 expanded with a stem down to the axis. That is
 * treated as a *reading position*: the track of dots and dates slides so the
 * selected point comes to rest under the stem.
 *
 * The reading position sits one slot in from the left rather than hard against
 * it, so the preceding entry stays on screen and stepping back is a click on a
 * visible date. That is also why there are no stepper arrows — the only reason
 * they existed was to reach a point the track had carried off-screen.
 */

/** Where the preceding point rests — the comp's first point on the frame. */
const BASE_FRAC = 164 / 1512
const BASE_MIN = 20
const BASE_MAX = 164

/**
 * Two gaps, not one. The step back to the previous point is deliberately
 * shorter than the step forward to the next, so the pair reads as "where you
 * just were" rather than as one more evenly spaced tick.
 */
const PREV_GAP_LG = 200
const PREV_GAP_SM = 130
const SPACING_LG = 300
const SPACING_SM = 200

/** Design widths: the panel column, and stem + gap above the axis. */
const PANEL_W = 684
const STEM_H = 116
const PANEL_GAP = 48
const DOT = 16

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
    const ro = new ResizeObserver(([entry]) => setRailW(entry.contentRect.width))
    ro.observe(rail)
    return () => ro.disconnect()
  }, [])

  const last = TIMELINE.length - 1
  const wide = railW >= 1024
  const baseX = railW > 0 ? clamp(railW * BASE_FRAC, BASE_MIN, BASE_MAX) : BASE_MAX
  const spacing = wide ? SPACING_LG : SPACING_SM
  const rightInset = wide ? 86 : 20

  /*
   * `slot` is which column the live point occupies: the first entry has no
   * predecessor so it sits at the left edge, everything after it sits one slot
   * in with its predecessor showing to the left.
   */
  const prevGap = wide ? PREV_GAP_LG : PREV_GAP_SM

  /*
   * The reading position steps in by one short gap only once there is a
   * previous point to park there. On the first entry nothing precedes it, so
   * holding that space open just leaves a dead margin down the left.
   */
  const readOffset = active === 0 ? 0 : prevGap

  /*
   * Offsets from the reading position. Points ahead march away at `spacing`;
   * the one behind sits a shorter `prevGap` back, and anything before that
   * continues at the normal spacing and slides out of view.
   */
  const offsetFor = (i: number) => {
    if (i === active) return 0
    if (i > active) return (i - active) * spacing
    return -prevGap - (active - 1 - i) * spacing
  }

  /* Sized for the stepped-in position so the width never changes underfoot. */
  const panelW =
    railW > 0
      ? Math.max(240, Math.min(PANEL_W, railW - baseX - prevGap - rightInset))
      : PANEL_W

  const select = useCallback((i: number) => setActive(i), [])

  const onKeyDown = (event: React.KeyboardEvent) => {
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
    <section
      id="timeline"
      className="w-full scroll-mt-[105px] bg-paper py-[80px] lg:py-0"
    >
      {/*
        Sits in the same band container as the Gallery and Feed headings so all
        three share a left edge. The comp puts this one at x=145 with 76.1px
        leading while those two sit at 129 with 60px — a 16px drift that reads
        as a misalignment once they are seen in sequence.
      */}
      <div className="section-shell">
        <div className="mx-auto w-full max-w-[1253.875px]">
          <BandTitle
            text="Timeline of the Movement"
            className="text-field lg:pt-[75.63px] lg:leading-[60px]"
          />
        </div>
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

        {/* Panel — parked at the reading position, swapping in place. It only
            shifts between the two slots, never further. */}
        <m.div
          className="pointer-events-none absolute"
          style={{
            left: baseX - DOT / 2,
            width: panelW,
            bottom: `calc(14% + ${STEM_H + PANEL_GAP}px)`,
          }}
          variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
          animate={{ x: readOffset }}
          transition={glide}
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
              {/* The final milestone is a headline and a date only. */}
              {entry.body ? (
                <p className="text-[18px] leading-[34.125px]">{entry.body}</p>
              ) : null}
              <p className="font-serif text-[40px] leading-[47px] whitespace-nowrap">
                {entry.date}
              </p>
            </m.div>
          </AnimatePresence>
        </m.div>

        {/* Stem — the live point comes to it. */}
        <m.div
          className="pointer-events-none absolute"
          style={{ left: baseX - DOT / 2, bottom: '14%' }}
          variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
          animate={{ x: readOffset }}
          transition={glide}
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
          <>
            {TIMELINE.map((point, i) => (
              <m.div
                key={point.date}
                role="presentation"
                className="absolute"
                style={{ left: baseX - DOT / 2, bottom: '14%' }}
                animate={{ x: readOffset + offsetFor(i) }}
                transition={glide}
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
                    {point.title ? `${point.date}: ${point.title}` : point.date}
                  </span>
                </m.button>
              </m.div>
            ))}
          </>
        </div>
      </m.div>
    </section>
  )
}
