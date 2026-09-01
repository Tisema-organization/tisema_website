import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { animate, m, useInView, useReducedMotion } from 'motion/react'

/**
 * The site's shared reveal vocabulary.
 *
 * Deliberately small: things fade and rise, display type arrives a word at a
 * time, rules draw themselves in. The subject matter does not want bouncing or
 * spinning, so nothing overshoots and nothing scales.
 *
 * `LazyMotion` is mounted once at the root, so everything here uses `m.*`.
 */

export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

/** Fire a little before the element is fully on screen, and only once. */
export const VIEWPORT = { once: true, amount: 0.3 } as const

const RISE = {
  hidden: { opacity: 0, y: 18 },
  shown: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT },
  },
} as const

/** A single element that fades and rises into place. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={VIEWPORT}
      variants={{
        hidden: RISE.hidden,
        shown: {
          ...RISE.shown,
          transition: { ...RISE.shown.transition, delay },
        },
      }}
    >
      {children}
    </m.div>
  )
}

/** Wraps a group whose children arrive one after another. */
export function Stagger({
  children,
  className,
  gap = 0.08,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  gap?: number
  delay?: number
}) {
  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        shown: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
    >
      {children}
    </m.div>
  )
}

/** One member of a Stagger. */
export function Item({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <m.div className={className} variants={RISE}>
      {children}
    </m.div>
  )
}

export type Segment = { text: string; className?: string }

const WORD = {
  hidden: { opacity: 0, y: '0.45em' },
  shown: {
    opacity: 1,
    y: '0em',
    transition: { duration: 0.55, ease: EASE_OUT },
  },
} as const

/**
 * Display type that arrives a word at a time.
 *
 * The usual trick here is to hide the split copy from assistive tech and carry
 * a second `sr-only` one alongside it. That is rejected on purpose: the hidden
 * copy is still selectable, so copying a heading yields the text twice, and
 * every scraper sees it doubled. The words below are the real, only text —
 * nested spans in a heading are ordinary HTML and read back fine.
 */
export function Words({
  segments,
  className,
  delay = 0,
  gap = 0.028,
}: {
  segments: Segment[]
  className?: string
  delay?: number
  gap?: number
}) {
  return (
    <span className={className}>
      <m.span
        initial="hidden"
        whileInView="shown"
        viewport={VIEWPORT}
        variants={{
          hidden: {},
          shown: { transition: { staggerChildren: gap, delayChildren: delay } },
        }}
      >
        {segments.map((segment, si) =>
          // Keep the separators so spacing survives the inline-block words.
          segment.text.split(/(\s+)/).map((token, ti) =>
            token.trim() === '' ? (
              <span key={`${si}-${ti}`}>{token}</span>
            ) : (
              <m.span
                key={`${si}-${ti}`}
                className={`inline-block ${segment.className ?? ''}`}
                variants={WORD}
              >
                {token}
              </m.span>
            ),
          ),
        )}
      </m.span>
    </span>
  )
}

type Token = { text: string; className?: string; space: boolean; start: number }

/**
 * Copy that types itself out once it is on screen.
 *
 * Every character is in the DOM from the start and hidden with `opacity`,
 * rather than the text being appended as it goes. That keeps the block's
 * height fixed — a real append would reflow four lines of 48px display type on
 * every keystroke and shove the rest of the section down the page — and it
 * means the full sentence is selectable and readable to a crawler throughout.
 *
 * Characters are grouped into inline-block words so lines still break between
 * words rather than mid-word, which per-character spans would otherwise allow.
 */
export function Typewriter({
  segments,
  className,
  speed = 16,
  startDelay = 0.2,
}: {
  segments: Segment[]
  className?: string
  /** Milliseconds per character. */
  speed?: number
  /** Seconds to wait after entering view. */
  startDelay?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, VIEWPORT)
  const reduced = useReducedMotion()
  const [typed, setTyped] = useState(0)

  const { tokens, total } = useMemo(() => {
    const list: Token[] = []
    let start = 0
    for (const segment of segments) {
      for (const text of segment.text.split(/(\s+)/)) {
        if (!text) continue
        const space = text.trim() === ''
        list.push({ text, className: segment.className, space, start })
        start += text.length
      }
    }
    return { tokens: list, total: start }
  }, [segments])

  useEffect(() => {
    if (!inView) return

    if (reduced) {
      setTyped(total)
      return
    }

    let frame = 0
    let began = 0

    const step = (now: number) => {
      if (!began) began = now + startDelay * 1000
      const n = Math.floor((now - began) / speed)
      setTyped(Math.min(total, Math.max(0, n)))
      if (n < total) frame = requestAnimationFrame(step)
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [inView, reduced, total, speed, startDelay])

  const running = typed > 0 && typed < total

  return (
    <span ref={ref} className={className}>
      {tokens.map((token, ti) =>
        token.space ? (
          // Whitespace is invisible either way, so it never needs to fade.
          <span key={ti}>{token.text}</span>
        ) : (
          <span
            key={ti}
            className={`inline-block ${token.className ?? ''}`}
          >
            {Array.from(token.text).map((char, ci) => {
              const index = token.start + ci
              return (
                <span
                  key={ci}
                  className={running && index === typed - 1 ? 'typing-caret' : ''}
                  style={{ opacity: index < typed ? 1 : 0 }}
                >
                  {char}
                </span>
              )
            })}
          </span>
        ),
      )}
    </span>
  )
}

/**
 * A figure that counts up from zero once it is on screen.
 *
 * The text is written straight to the node rather than through state, so a
 * ~1.6s count does not re-render the section on every frame. There is no
 * `aria-live` here on purpose — the element is not a live region, so assistive
 * tech reads the settled number when it reaches it rather than every tick.
 */
export function Count({
  to,
  suffix = '',
  duration = 1.6,
}: {
  to: number
  /** Trails the number so "300" can settle as the design's "300K". */
  suffix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, VIEWPORT)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || !inView) return

    if (reduced) {
      el.textContent = to.toLocaleString() + suffix
      return
    }

    const controls = animate(0, to, {
      duration,
      ease: EASE_OUT,
      onUpdate: (value) => {
        el.textContent = Math.round(value).toLocaleString() + suffix
      },
    })

    return () => controls.stop()
  }, [inView, to, suffix, duration, reduced])

  return <span ref={ref}>{`0${suffix}`}</span>
}

/**
 * The 35x2.625 rule from the design, drawn in from its left edge.
 *
 * Painted with `currentColor` rather than pulled from the three exported rule
 * SVGs. The exports only exist in Field Dark, Lime and Paper, and the rule has
 * to be able to sit in Oxblood beside an Oxblood label — and a 35x2.625 solid
 * line is geometry, not artwork, so there is nothing to lose by drawing it.
 */
export function DrawRule() {
  return (
    <m.span
      aria-hidden
      className="block w-[35px] shrink-0 origin-left bg-current"
      style={{ height: '2.625px' }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.6, ease: EASE_OUT }}
    />
  )
}
