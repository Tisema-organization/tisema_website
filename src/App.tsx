import { useRouter } from './lib/router'
import { LandingPage } from './components/LandingPage'
import { GalleryPage } from './components/GalleryPage'

export default function App() {
  const { route } = useRouter()

  if (route === 'gallery') return <GalleryPage />
  return <LandingPage />
}
