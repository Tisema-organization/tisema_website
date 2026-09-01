import { useEffect, useRef, useState } from 'react'
import { domAnimation, LazyMotion, MotionConfig } from 'motion/react'
import { CustomCursor } from './CustomCursor'
import { HeroStage } from './HeroStage'
import { SiteNav } from './SiteNav'
import { AboutCampaign } from './sections/AboutCampaign'
import { CampaignFeed } from './sections/CampaignFeed'
import { CampaignGallery } from './sections/CampaignGallery'
import { DemandDeclaration } from './sections/DemandDeclaration'
import { SiteFooter } from './sections/SiteFooter'
import { Stat } from './sections/Stat'
import { Timeline } from './sections/Timeline'
import { WhoCanDeclare } from './sections/WhoCanDeclare'
import { WholeOfGovernment } from './sections/WholeOfGovernment'

function isCoarsePointer() {
  return window.matchMedia('(pointer: coarse)').matches
}

export function LandingPage() {
  const heroScrollRef = useRef<HTMLDivElement>(null)
  const [customCursor, setCustomCursor] = useState(
    () => window.innerWidth >= 1024 && !isCoarsePointer(),
  )

  useEffect(() => {
    const sync = () => {
      setCustomCursor(window.innerWidth >= 1024 && !isCoarsePointer())
    }

    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [])

  useEffect(() => {
    const hash = window.location.hash
    if (!hash || hash === '#home') return

    const scrollToHash = () => {
      document.querySelector(hash)?.scrollIntoView()
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(scrollToHash)
    })
  }, [])

  return (
    /*
     * One feature bundle for the whole page. `strict` keeps every call site on
     * `m.*`, so the full `motion` build can never be pulled back in by accident.
     */
    <LazyMotion features={domAnimation} strict>
      {/*
        `reducedMotion="user"` makes Motion drop transform animations for anyone
        who asks the OS for less movement, while still letting things fade — so
        the reveals never have to check the media query themselves.
      */}
      <MotionConfig reducedMotion="user">
        <div id="home" className="relative bg-paper [overflow-x:clip]">
          <SiteNav />

          {/*
        The hero owns its own scroll length and pins a sticky stage inside it.
        When that length runs out the stage scrolls away on its own and the
        bands below simply follow — no pin/unpin swap, no cross-cut.
      */}
          <div
            id="hero-scroll"
            ref={heroScrollRef}
            className={`relative select-none ${customCursor ? 'cursor-none' : ''}`}
          >
            <HeroStage scrollRef={heroScrollRef} />
          </div>

          <CustomCursor enabled={customCursor} />

          <main>
            <Stat />
            <AboutCampaign />
            <WholeOfGovernment />
            <WhoCanDeclare />
            <DemandDeclaration />
            <Timeline />
            <CampaignGallery />
            <CampaignFeed />
          </main>

          <SiteFooter />
        </div>
      </MotionConfig>
    </LazyMotion>
  )
}
