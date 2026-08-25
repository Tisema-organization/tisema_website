import { m } from 'motion/react'
import { DrawRule, EASE_OUT, VIEWPORT, Words } from '../motion'

/** The 35×2.625 rule + label pair that opens most bands in the design. */
export function Eyebrow({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`flex items-center gap-[8.75px] py-[8.75px] ${className}`}>
      <DrawRule />
      <m.p
        className="font-serif text-[clamp(1.125rem,1.62vw,24.5px)] leading-[28px] whitespace-nowrap"
        initial={{ opacity: 0, x: -8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.12 }}
      >
        {children}
      </m.p>
    </div>
  )
}

/** Band heading — 52px display type at the design's 1512px width. */
export function BandTitle({
  text,
  className = '',
}: {
  text: string
  className?: string
}) {
  return (
    <h2
      className={`font-serif text-[clamp(2rem,3.44vw,52px)] leading-[1.2] ${className}`}
    >
      <Words segments={[{ text }]} />
    </h2>
  )
}
