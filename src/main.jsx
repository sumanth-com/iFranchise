import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Lenis from '@studio-freight/lenis'

function initLenis() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) return null

  const lenis = new Lenis({
    duration: 0.85,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothTouch: false,
    touchMultiplier: 1.5,
    wheelMultiplier: 0.9,
    lerp: 0.14,
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

// Defer Lenis until after first paint for faster perceived load
const scheduleLenis = () => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => initLenis(), { timeout: 1200 })
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
    <App />
  </StrictMode>,
)
