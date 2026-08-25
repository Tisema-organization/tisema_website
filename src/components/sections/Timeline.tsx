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
 * Horizontal timeline. The design fixes each point at an x on the 1512px frame,
 * so those x's are kept as fractions and the whole rail scrolls sideways under
 * lg rather than reflowing into something the comp never shows.
 *
 * The comp only draws the August 2023 entry expanded. Read as an interaction
 * rather than a static picture, that is the *selected* state — so every point
 * can take it, and picking one slides the stem and swaps the panel.
 */

/** Left edge of each point's 16px dot, as a fraction of the rail. */
const POINT_LEFT = [
  164 / 1512,
  442 / 1512,
  742 / 1512,
  1042 / 1512,
  1342 / 1512,
]

/** Design widths: the panel column, and stem + gap above the axis. */
const PANEL_W = 684
const STEM_H = 116
const PANEL_GAP = 48
/** Gutter the panel keeps from the rail's right edge when it has to shift. */
const PANEL_INSET = 86

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

export function Timeline() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const dotRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [railW, setRailW] = useState(0)
  const [active, setActive] = useState(0)
  const [pinned, setPinned] = useState(false)
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

  /*
   * Above lg the panel rides inside the rail, anchored over its dot the way the
   * comp draws it. Below lg the rail is wider than the screen and scrolls, so a
   * panel pinned to a dot would be half off-screen — there it sits above the
   * rail at full width instead, and only the axis scrolls.
   */
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 64rem)')
    const sync = () => setPinned(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const panelW =
    railW > 0
      ? Math.min(PANEL_W, Math.max(240, railW - PANEL_INSET * 2))
      : PANEL_W
  const dotX = railW * POINT_LEFT[active]
  const panelX = clamp(dotX, 0, Math.max(0, railW - panelW - PANEL_INSET))

  /** Under lg the rail overflows, so a pick off-screen has to be brought in. */
  const select = useCallback(
    (i: number) => {
      setActive(i)
      const scroller = scrollerRef.current
      if (!scroller || railW === 0) return
      const target = railW * POINT_LEFT[i] + 8 - scroller.clientWidth / 2
      const max = scroller.scrollWidth - scroller.clientWidth
      if (max <= 0) return
      scroller.scrollTo({
        left: clamp(target, 0, max),
        behavior: reduced ? 'auto' : 'smooth',
      })
    },
    [railW, reduced],
  )

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
    : { type: 'spring' as const, stiffness: 170, damping: 26, mass: 0.9 }
  const swap = { duration: reduced ? 0 : 0.28, ease: EASE }

  const panel = (
    <AnimatePresence mode="wait" initial={false}>
      <m.div
        key={active}
        id={`timeline-panel-${active}`}
        role="tabpanel"
        aria-labelledby={`timeline-tab-${active}`}
        className="flex flex-col gap-[16px] text-field"
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
  )

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

        {/* min-height holds the ground while AnimatePresence swaps entries. */}
        {!pinned && (
          <div className="section-shell mt-[40px] min-h-[260px] sm:min-h-[220px]">
            {panel}
          </div>
        )}

        <div ref={scrollerRef} className="overflow-x-auto">
          <m.div
            ref={railRef}
            className="relative mx-auto h-[240px] min-w-[1200px] lg:h-[640px] lg:w-[1512px] lg:min-w-0"
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Axis draws itself in from the left as the band arrives. */}
            <m.img
              src="/design/timeline-axis.svg"
              alt=""
              className="absolute left-0 h-px w-full origin-left"
              style={{ top: '86%' }}
              variants={{ hidden: { scaleX: 0 }, shown: { scaleX: 1 } }}
              transition={{ duration: reduced ? 0 : 0.9, ease: 'easeOut' }}
            />

            {/* Panel — bottom-anchored, so a taller entry grows up, not down. */}
            {pinned && (
              <m.div
                className="pointer-events-none absolute right-0 left-0"
                style={{ bottom: `calc(14% + ${STEM_H + PANEL_GAP}px)` }}
                variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
                transition={{
                  duration: reduced ? 0 : 0.5,
                  delay: reduced ? 0 : 0.35,
                }}
              >
                <m.div
                  className="flex flex-col justify-end"
                  style={{ width: panelW }}
                  animate={{ x: panelX }}
                  transition={glide}
                >
                  {panel}
                </m.div>
              </m.div>
            )}

            {/* Stem — slides between dots, and its circle lands on the live one. */}
            <m.div
              className="pointer-events-none absolute left-0"
              style={{ bottom: '14%' }}
              variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
              transition={{
                duration: reduced ? 0 : 0.5,
                delay: reduced ? 0 : 0.45,
              }}
            >
              <m.img
                src="/design/timeline-marker.svg"
                alt=""
                width={16}
                height={116}
                className="block h-[116px] w-[16px] -scale-y-100"
                animate={{ x: dotX }}
                transition={glide}
              />
            </m.div>

            <div
              role="tablist"
              aria-label="Timeline of the movement"
              aria-orientation="horizontal"
              className="pointer-events-none absolute inset-0"
              onKeyDown={onKeyDown}
            >
              {TIMELINE.map((point, i) => (
                <div
                  key={point.date}
                  role="presentation"
                  className="absolute"
                  style={{ left: `${POINT_LEFT[i] * 100}%`, bottom: '14%' }}
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
                      className="block font-serif text-[20px] leading-[24px] whitespace-nowrap text-field"
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
            </div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  )
}
