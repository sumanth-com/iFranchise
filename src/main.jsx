import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/themes.css'
import './index.css'
import './styles/mobile-responsive.css'
import './styles/performance.css'
import { initScrollRestoration } from './lib/navigation.js'
import { initRoutePrefetch } from './lib/routePrefetch.js'
import { preloadHomeHero } from './lib/preloadHomeHero.js'
import { scheduleLenisInit } from './lib/lenisScroll.js'
import { deferNonCriticalStyles } from './lib/deferStyles.js'
import { scheduleAnalytics } from './lib/scheduleAnalytics.js'
import { ThemeProvider } from './context/ThemeContext.jsx'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import { logger } from './lib/logger.js'

initScrollRestoration()
initRoutePrefetch()
deferNonCriticalStyles()
scheduleAnalytics()

if (!import.meta.env.DEV) {
  window.addEventListener('unhandledrejection', (event) => {
    event.preventDefault()
    logger.error('Unhandled async error')
  })
}

const path = window.location.pathname
if (path === '/' || path === '') {
  preloadHomeHero()
}

const isMobileViewport =
  typeof window !== 'undefined' &&
  window.matchMedia('(max-width: 767px)').matches

if (!isMobileViewport) {
  if (document.readyState === 'complete') {
    scheduleLenisInit()
  } else {
    window.addEventListener('load', scheduleLenisInit, { once: true })
  }
}

const rootEl = document.getElementById('root')
const appTree = (
  <ErrorBoundary label="Application">
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </ErrorBoundary>
)

createRoot(rootEl).render(
  import.meta.env.DEV ? <StrictMode>{appTree}</StrictMode> : appTree,
)
