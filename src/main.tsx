import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'lenis/dist/lenis.css'
import App from './App.tsx'
import SmoothScrolling from './SmoothScrolling.tsx'
import { PreloaderProvider } from './context/PreloaderContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SmoothScrolling>
      <PreloaderProvider>
        <App />
      </PreloaderProvider>
    </SmoothScrolling>
  </StrictMode>,
)
