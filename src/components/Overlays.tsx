import { motion } from 'motion/react'
import { CAPTION_TEXT, EASE_OUT } from '../lib/assets'
import { CircleFrame, HamburgerIcon, LogoMark } from './Marks'

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: EASE_OUT },
}

export function Logo() {
  return (
    <motion.div
      className="pointer-events-none fixed top-4 left-4 z-20 w-[124px] mix-blend-exclusion sm:top-8 sm:left-8 sm:w-[266px] lg:w-[355px]"
      initial={fadeUp.initial}
      animate={fadeUp.animate}
      transition={{ ...fadeUp.transition, delay: 0 }}
    >
      <LogoMark className="h-auto w-full" />
    </motion.div>
  )
}

export function Caption() {
  return (
    <motion.p
      className="pointer-events-none fixed top-[118px] left-4 z-20 w-[calc(100vw-32px)] font-sans text-[12px] leading-[140%] font-medium tracking-[-0.04em] text-white mix-blend-exclusion sm:top-[180px] sm:left-8 sm:w-[calc(50vw-48px)] lg:top-[244px] lg:w-[692px]"
      initial={fadeUp.initial}
      animate={fadeUp.animate}
      transition={{ ...fadeUp.transition, delay: 0.3 }}
    >
      {CAPTION_TEXT}
    </motion.p>
  )
}

export function HeaderNav() {
  return (
    <motion.header
      className="pointer-events-none fixed top-4 right-4 z-20 flex h-[30px] w-auto items-center justify-between mix-blend-exclusion lg:top-8 lg:right-8 lg:w-[330px]"
      initial={fadeUp.initial}
      animate={fadeUp.animate}
      transition={{ ...fadeUp.transition, delay: 0.15 }}
    >
      <span className="hidden font-sans text-[15px] font-medium tracking-[-0.04em] text-white uppercase lg:inline">
        ABOUT
      </span>
      <div className="ml-auto flex items-center gap-5 lg:gap-[50px]">
        <HamburgerIcon className="h-6 w-6 lg:h-[30px] lg:w-[30px]" />
        <span className="font-sans text-[13px] font-medium tracking-[-0.04em] text-white uppercase lg:text-[15px]">
          [ CART ]
        </span>
      </div>
    </motion.header>
  )
}

export function ProductInfo() {
  return (
    <motion.div
      id="outro-info"
      data-outro-offset="132"
      className="pointer-events-none fixed right-0 bottom-12 left-0 z-20 flex flex-col items-center mix-blend-exclusion lg:right-8 lg:bottom-20 lg:left-auto lg:w-[330px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.45 }}
    >
      <div className="mb-3 flex w-[252px] flex-col items-start lg:mb-8 lg:w-full">
        <div className="relative h-5 w-5 lg:h-[30px] lg:w-[30px]">
          <CircleFrame className="h-full w-full" />
          <span
            id="circle-symbol"
            className="absolute inset-0 flex items-center justify-center font-sans text-[10px] font-medium tracking-[-0.04em] text-white uppercase lg:text-[15px]"
          >
            8
          </span>
        </div>
        <p className="w-full text-center font-sans text-[20px] leading-[100%] font-medium tracking-[-0.04em] text-white uppercase lg:text-[30px]">
          ARCHIVE COLLECTION
          <br />
          &quot;PROMPT&quot;
        </p>
      </div>
      <p className="text-center font-sans text-[60px] leading-[100%] font-medium tracking-[-0.04em] text-white lg:text-[80px]">
        $97,33
      </p>
    </motion.div>
  )
}

export function ViewButton() {
  return (
    <div
      id="outro-buy"
      className="pointer-events-none fixed right-4 bottom-[60px] left-4 z-20 flex h-[100px] items-center justify-center rounded-[1335px] bg-white mix-blend-exclusion lg:right-8 lg:bottom-8 lg:left-auto lg:h-[174px] lg:w-[330px]"
      style={{ transform: 'scale(0)', transformOrigin: 'right bottom' }}
    >
      <span className="font-sans text-[72px] font-medium tracking-[-0.04em] text-white mix-blend-exclusion lg:text-[110px]">
        view
      </span>
    </div>
  )
}

export function WhiteOverlay() {
  return (
    <div
      id="outro-overlay"
      className="pointer-events-none fixed inset-0 z-[12] bg-white"
      style={{ opacity: 0 }}
    />
  )
}

export function OutroFooter() {
  return (
    <div
      id="outro-footer"
      className="pointer-events-none fixed bottom-6 left-4 z-20 flex w-[calc(100%-32px)] justify-between mix-blend-exclusion lg:bottom-8 lg:gap-20 lg:justify-start"
      style={{ opacity: 0 }}
    >
      <span className="font-sans text-[11px] font-medium tracking-[-0.02em] text-white uppercase lg:text-[13px]">
        PRMPT (R) 2026
      </span>
      <span className="font-sans text-[11px] font-medium tracking-[-0.02em] text-white uppercase lg:text-[13px]">
        PRIVACY POLICY
      </span>
    </div>
  )
}
