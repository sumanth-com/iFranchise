import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/themes.css'
import './index.css'
import './styles/mobile-responsive.css'
import { initScrollRestoration } from './lib/navigation.js'
import { preloadHomeHero } from './lib/preloadHomeHero.js'
import { ThemeProvider } from './context/ThemeContext.jsx'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import { logger } from './lib/logger.js'
import Lenis from '@studio-freight/lenis'

initScrollRestoration()

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

function initLenis() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) return null

  const lenis = new Lenis({
    duration: 1.05,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothTouch: false,
    touchMultiplier: 1.4,
    wheelMultiplier: 0.85,
    lerp: 0.1,
  })

  window.__lenis = lenis
  document.documentElement.classList.add('lenis', 'lenis-smooth')

  let rafId
  const raf = (time) => {
    lenis.raf(time)
    rafId = requestAnimationFrame(raf)
  }
  rafId = requestAnimationFrame(raf)

  const onVisibility = () => {
    if (document.hidden) {
      cancelAnimationFrame(rafId)
    } else {
      rafId = requestAnimationFrame(raf)
    }
  }
  document.addEventListener('visibilitychange', onVisibility)

  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  const onMotionChange = (e) => {
    if (e.matches) {
      cancelAnimationFrame(rafId)
      document.removeEventListener('visibilitychange', onVisibility)
      mq.removeEventListener('change', onMotionChange)
      lenis.destroy()
      window.__lenis = null
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
    }
  }
  mq.addEventListener('change', onMotionChange)

  return () => {
    cancelAnimationFrame(rafId)
    document.removeEventListener('visibilitychange', onVisibility)
    mq.removeEventListener('change', onMotionChange)
    lenis.destroy()
    window.__lenis = null
    document.documentElement.classList.remove('lenis', 'lenis-smooth')
  }
}

// Homepage: start Lenis right after first paint for premium scroll feel
const scheduleLenis = () => {
  const isHome = path === '/' || path === ''
  if (isHome) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => initLenis())
    })
    return
  }
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => initLenis(), { timeout: 800 })
  } else {
    setTimeout(() => initLenis(), 1)
  }
}

if (document.readyState === 'complete') {
  scheduleLenis()
} else {
  window.addEventListener('load', scheduleLenis, { once: true })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary label="Application">
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
)
