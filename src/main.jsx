import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
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

import './styles/themes.css'
import './components/forms/form-field-focus.css'

function runWhenIdle(fn, timeout = 4000) {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(fn, { timeout })
  } else {
    setTimeout(fn, Math.min(timeout, 1500))
  }
}

import('./styles/mobile-responsive.css')

function bootLenisOnInteraction() {
  if (isMobile) return
  let started = false
  const start = () => {
    if (started) return
    started = true
    window.removeEventListener('scroll', start, true)
    window.removeEventListener('wheel', start, true)
    window.removeEventListener('pointerdown', start, true)
    import('./lib/lenisScroll.js').then(({ scheduleLenisInit }) => scheduleLenisInit())
  }
  window.addEventListener('scroll', start, { passive: true, capture: true })
  window.addEventListener('wheel', start, { passive: true, capture: true })
  window.addEventListener('pointerdown', start, { once: true, capture: true })
  runWhenIdle(start, 12000)
}

runWhenIdle(() => {
  import('./lib/routePrefetch.js').then(({ initRoutePrefetch }) => initRoutePrefetch())
  import('./lib/deferStyles.js').then(({ deferNonCriticalStyles }) => deferNonCriticalStyles())
  import('./lib/scheduleAnalytics.js').then(({ scheduleAnalytics }) => scheduleAnalytics())
  bootLenisOnInteraction()
}, isMobile ? 4000 : 2000)

initScrollRestoration()

runWhenIdle(
  () => {
    bootstrapFormPipeline().catch(() => {
      logger.error('Form pipeline bootstrap failed')
    })
  },
  isMobile ? 6000 : 3000,
)

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
