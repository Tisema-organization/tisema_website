import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { TermsPage } from './components/TermsPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TermsPage />
  </StrictMode>,
)
