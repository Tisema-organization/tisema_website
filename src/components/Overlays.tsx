import { motion } from 'motion/react'
import { CAPTION_TEXT, EASE_OUT } from '../lib/assets'

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: EASE_OUT },
}

export function CornerFrame() {
  return (
    <div
      className="phase-frame pointer-events-none fixed inset-3 z-30 sm:inset-5 lg:inset-8"
      aria-hidden
    >
      <span className="absolute top-0 left-0 h-8 w-8 border-t-2 border-l-2 border-oxblood sm:h-10 sm:w-10" />
      <span className="absolute top-0 right-0 h-8 w-8 border-t-2 border-r-2 border-oxblood sm:h-10 sm:w-10" />
      <span className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-oxblood sm:h-10 sm:w-10" />
      <span className="absolute right-0 bottom-0 h-8 w-8 border-r-2 border-b-2 border-oxblood sm:h-10 sm:w-10" />
    </div>
  )
}

export function SiteTitle() {
  return (
    <motion.div
      className="pointer-events-none fixed top-6 left-1/2 z-20 -translate-x-1/2 text-center sm:top-8"
      initial={fadeUp.initial}
      animate={fadeUp.animate}
      transition={{ ...fadeUp.transition, delay: 0 }}
    >
      <p className="phase-ink font-ethiopic text-[15px] font-semibold tracking-[0.02em] text-oxblood sm:text-[18px] lg:text-[20px]">
        ትሰማ <span className="mx-1 font-sans font-medium">·</span>{' '}
        <span className="font-display tracking-[0.12em] uppercase">Tisema</span>
      </p>
    </motion.div>
  )
}

export function Caption() {
  return (
    <motion.p
      className="phase-ink phase-hide-on-hand pointer-events-none fixed top-[72px] left-4 z-20 w-[calc(100vw-32px)] max-w-[420px] font-sans text-[12px] leading-[150%] font-medium tracking-[-0.02em] text-oxblood sm:top-[88px] sm:left-8 sm:max-w-[480px] lg:top-[100px] lg:max-w-[560px] lg:text-[13px]"
      initial={fadeUp.initial}
      animate={fadeUp.animate}
      transition={{ ...fadeUp.transition, delay: 0.25 }}
    >
      {CAPTION_TEXT}
    </motion.p>
  )
}

export function HeaderNav() {
  return (
    <motion.header
      className="pointer-events-none fixed top-6 right-4 z-20 flex items-center gap-5 sm:top-8 sm:right-8 lg:gap-10"
      initial={fadeUp.initial}
      animate={fadeUp.animate}
      transition={{ ...fadeUp.transition, delay: 0.12 }}
    >
      <span className="phase-ink hidden font-display text-[13px] font-semibold tracking-[0.14em] text-oxblood uppercase sm:inline">
        About
      </span>
      <span className="phase-ink font-display text-[13px] font-semibold tracking-[0.14em] text-oxblood uppercase">
        Petition
      </span>
    </motion.header>
  )
}

export function CampaignInfo() {
  return (
    <motion.div
      id="outro-info"
      data-outro-offset="132"
      className="phase-hide-on-hand pointer-events-none fixed right-0 bottom-16 left-0 z-20 flex flex-col items-center px-4 lg:right-8 lg:bottom-24 lg:left-auto lg:w-[300px] lg:items-end lg:px-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.4 }}
    >
      <p className="phase-ink font-display text-center text-[11px] font-semibold tracking-[0.18em] text-oxblood uppercase lg:text-right">
        Against silence
      </p>
      <p className="phase-ink font-ethiopic mt-1 text-center text-[22px] leading-[110%] font-bold text-oxblood lg:text-right lg:text-[28px]">
        ትሰማ
      </p>
      <p className="phase-ink mt-2 max-w-[240px] text-center text-[12px] leading-[140%] font-medium text-oxblood/80 lg:text-right">
        Faces gather. The hand holds them. Scroll until she is heard.
      </p>
    </motion.div>
  )
}

export function PetitionButton() {
  return (
    <a
      id="outro-buy"
      href="#petition"
      className="pointer-events-none fixed right-4 bottom-8 left-4 z-20 flex h-[72px] items-center justify-center bg-oxblood sm:h-[88px] lg:right-8 lg:left-auto lg:h-[110px] lg:w-[360px]"
      style={{ transform: 'scale(0)', transformOrigin: 'right bottom' }}
    >
      <span className="font-display text-[22px] font-bold tracking-[0.08em] text-paper uppercase sm:text-[28px] lg:text-[34px]">
        Sign the petition
      </span>
    </a>
  )
}

export function LimeOverlay() {
  return (
    <div
      id="outro-overlay"
      className="pointer-events-none fixed inset-0 z-[12] bg-lime"
      style={{ opacity: 0 }}
    />
  )
}

export function OutroFooter() {
  return (
    <div
      id="outro-footer"
      className="pointer-events-none fixed bottom-5 left-4 z-20 flex w-[calc(100%-32px)] justify-between text-oxblood sm:bottom-8 sm:left-8"
      style={{ opacity: 0 }}
    >
      <span className="font-ethiopic text-[11px] font-semibold sm:text-[13px]">#ትሰማ!</span>
      <span className="font-display text-[11px] font-semibold tracking-[0.12em] uppercase sm:text-[13px]">
        #Tisema
      </span>
    </div>
  )
}
