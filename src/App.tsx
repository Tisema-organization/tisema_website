import { useRouter } from './lib/router'
import { LandingPage } from './components/LandingPage'
import { GalleryPage } from './components/GalleryPage'
// Temporarily disabled; retain these pages for possible future restoration.
// import { TermsPage } from './components/TermsPage'
// import { DemandPage } from './components/DemandPage'
// import { DemandsPage } from './components/DemandsPage'
import { FaqPage } from './components/FaqPage'
import { ResourcesPage } from './components/ResourcesPage'
export default function App() {
  const { route } = useRouter()

  if (route === 'gallery') return <GalleryPage />
  // if (route === 'terms') return <TermsPage />
  // if (route === 'demand') return <DemandPage />
  // if (route === 'demands') return <DemandsPage />
  if (route === 'faq') return <FaqPage />
  if (route === 'resources') return <ResourcesPage />

  return (
    <>
      <LandingPage />
    </>
  )
}
