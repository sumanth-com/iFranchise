import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/themes.css'
import './index.css'
import './styles/performance.css'
import { initScrollRestoration } from './lib/navigation.js'
import { ThemeProvider } from './context/ThemeContext.jsx'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import { logger } from './lib/logger.js'
import { bootstrapFormPipeline } from './lib/forms/formBootstrap.js'
const isHome =
  typeof window !== 'undefined' &&
  (window.location.pathname === '/' || window.location.pathname === '')
const isMobile =
  typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches

function runWhenIdle(fn, timeout = 4000) {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(fn, { timeout })
  } else {
    setTimeout(fn, Math.min(timeout, 1500))
  }
}

if (!isHome) {
  import('./styles/mobile-responsive.css')
}

runWhenIdle(() => {
  if (isHome) import('./styles/mobile-responsive.css')
  import('./lib/routePrefetch.js').then(({ initRoutePrefetch }) => initRoutePrefetch())
  import('./lib/deferStyles.js').then(({ deferNonCriticalStyles }) => deferNonCriticalStyles())
  import('./lib/scheduleAnalytics.js').then(({ scheduleAnalytics }) => scheduleAnalytics())
  if (!isMobile) {
    import('./lib/lenisScroll.js').then(({ scheduleLenisInit }) => {
      if (document.readyState === 'complete') scheduleLenisInit()
      else window.addEventListener('load', scheduleLenisInit, { once: true })
    })
  }
}, isMobile ? 5000 : 2500)

if (isHome) {
  runWhenIdle(() => {
    import('./components/Hero.jsx')
  }, isMobile ? 1200 : 400)
  if (!isMobile) {
    import('./lib/preloadHomeHero.js').then(({ preloadHomeHero }) => preloadHomeHero())
  }
}

initScrollRestoration()

bootstrapFormPipeline().catch(() => {
  logger.error('Form pipeline bootstrap failed')
})

if (!import.meta.env.DEV) {
  window.addEventListener('unhandledrejection', (event) => {
    event.preventDefault()
    logger.error('Unhandled async error')
  })
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
