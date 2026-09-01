import { useRouter } from './lib/router'
import { LandingPage } from './components/LandingPage'
import { GalleryPage } from './components/GalleryPage'
import { TermsPage } from './components/TermsPage'
import { HeroScrollHint } from './components/HeroScrollHint'

export default function App() {
  const { route } = useRouter()

  if (route === 'gallery') return <GalleryPage />
  if (route === 'terms') return <TermsPage />

  return (
    <>
      <HeroScrollHint />
      <LandingPage />
    </>
  )
}
