import { useEffect, useRef, useState } from 'react'
import { CustomCursor } from './CustomCursor'
import { HeroReveal } from './HeroReveal'
import {
  CampaignInfo,
  Caption,
  CornerFrame,
  HeaderNav,
  LimeOverlay,
  OutroFooter,
  PetitionButton,
  SiteTitle,
} from './Overlays'

function isCoarsePointer() {
  return window.matchMedia('(pointer: coarse)').matches
}

export function LandingPage() {
  const spacerRef = useRef<HTMLDivElement>(null)
  const [customCursor, setCustomCursor] = useState(
    () => window.innerWidth >= 1024 && !isCoarsePointer(),
  )

  useEffect(() => {
    const sync = () => {
      const touch = isCoarsePointer()
      setCustomCursor(window.innerWidth >= 1024 && !touch)

      const info = document.getElementById('outro-info')
      if (info) {
        info.dataset.outroOffset = window.innerWidth >= 1024 ? '160' : '120'
      }
    }

    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [])

  return (
    <div
      id="scroll-spacer"
      ref={spacerRef}
      className={`relative overflow-x-hidden bg-lime select-none ${customCursor ? 'cursor-none' : ''}`}
      style={{ height: '700vh' }}
    >
      <CornerFrame />
      <CustomCursor enabled={customCursor} />
      <SiteTitle />
      <Caption />
      <HeaderNav />
      <CampaignInfo />
      <PetitionButton />
      <LimeOverlay />
      <OutroFooter />
      <HeroReveal spacerRef={spacerRef} />
    </div>
  )
}
