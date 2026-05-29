import { useEffect, useState, lazy, Suspense, useRef, useCallback, startTransition } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AnimatedSiteBackdrop from './components/AnimatedSiteBackdrop';
import { FranchiseOpportunityNavbarFiltersProvider } from './context/FranchiseOpportunityNavbarFiltersContext';
import { useScrollPastHero } from './hooks/useScrollPastHero';
import { useLowPowerDevice } from './hooks/useLowPowerDevice';
import PageSEO from './components/seo/PageSEO';
import ErrorBoundary from './components/ErrorBoundary';
import {
  NAVIGATE_EVENT,
  getLogicalPathname,
  scrollStorageKey,
  readStoredScroll,
  applyScroll,
  restoreScrollWithRetry,
  scrollToHashSection,
} from './lib/navigation';
import { FRANCHISE_DETAILS_SHELL, FRANCHISE_OPPORTUNITIES_SHELL } from './lib/franchiseOpportunitiesShell.js';
import { prefetchRoute } from './lib/routePrefetch.js';
import { trackPageView } from './lib/analytics/ga4.js';

const ExpansionAssistant = lazy(() => import('./components/ExpansionAssistant'));
const Hero = lazy(() => import('./components/Hero'));
const PreFooterCTA = lazy(() => import('./components/PreFooterCTA'));

// -- Lazy-load all other pages -----------------------------------------------
const AboutPage               = lazy(() => import('./components/AboutPage'));
const TeamPage                = lazy(() => import('./components/TeamPage'));
const FranchiseDetailsPage    = lazy(() => import('./components/FranchiseDetailsPage'));
const FranchiseOpportunitiesPage = lazy(() => import('./components/FranchiseOpportunitiesPage'));
const PrivacyPolicyPage       = lazy(() => import('./components/PrivacyPolicyPage'));
const TermsConditionsPage     = lazy(() => import('./components/TermsConditionsPage'));
const NotFoundPage            = lazy(() => import('./components/NotFoundPage'));
const ContactPage             = lazy(() => import('./components/ContactPage'));
const BlogPage                = lazy(() => import('./components/BlogPage'));
const BlogDetailPage          = lazy(() => import('./components/BlogDetailPage'));
const ServicesPage            = lazy(() => import('./components/ServicesPage'));
const LicensesPage            = lazy(() => import('./components/LicensesPage'));
const CareersPage             = lazy(() => import('./components/CareersPage'));
const ForBrandOwnersPage      = lazy(() => import('./components/ForBrandOwnersPage'));
const FAQPage                 = lazy(() => import('./components/FAQPage'));

// -- Minimal page-level skeleton -----------------------------------------------
function PageSkeleton() {
  return (
    <div
      className="relative z-10 flex min-h-screen w-full items-center justify-center bg-transparent"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading page"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-violet-500/30 border-t-violet-400" />
        <p className="text-xs font-medium uppercase tracking-widest text-theme-primary">Loading</p>
      </div>
    </div>
  );
}

function App() {
  const lowPowerDevice = useLowPowerDevice();
  const [pathname, setPathname] = useState(getLogicalPathname);
  const [pagePhase, setPagePhase] = useState('idle');
  const isHomeRoute = pathname === '/';
  const [showBackdrop, setShowBackdrop] = useState(!lowPowerDevice && !isHomeRoute);
  const transitionTimerRef = useRef(null);

  const assistantEligible = pathname !== '/404';
  const scrolledPastHero = useScrollPastHero(pathname, assistantEligible);
  const [assistantMounted, setAssistantMounted] = useState(() => !lowPowerDevice);
  const [showPreFooter, setShowPreFooter] = useState(false);

  useEffect(() => {
    if (!lowPowerDevice) {
      setAssistantMounted(true);
      return undefined;
    }
    if (!assistantEligible || !scrolledPastHero) {
      setAssistantMounted(false);
      return undefined;
    }
    let idleId;
    let timeoutId;
    const mount = () => setAssistantMounted(true);
    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(mount, { timeout: 4000 });
    } else {
      timeoutId = window.setTimeout(mount, 1500);
    }
    return () => {
      if (idleId != null) window.cancelIdleCallback(idleId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [lowPowerDevice, assistantEligible, scrolledPastHero, pathname]);

  const showExpansionAssistant = assistantEligible && scrolledPastHero && assistantMounted;

  const finishScrollForRoute = useCallback((isBackForward) => {
    const didScrollToHash = scrollToHashSection();
    if (didScrollToHash) return;

    if (isBackForward) {
      const restored = readStoredScroll();
      restoreScrollWithRetry(restored ?? 0);
      return;
    }

    applyScroll(0);
  }, []);

  const runRouteTransition = useCallback(
    (isBackForward) => {
      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
      }

      setPagePhase('exit');
      transitionTimerRef.current = window.setTimeout(() => {
        const nextPath = getLogicalPathname();
        startTransition(() => {
          setPathname(nextPath);
          setPagePhase('enter');
        });
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => setPagePhase('idle'));
        });
        window.requestAnimationFrame(() => {
          finishScrollForRoute(isBackForward);
        });
      }, 20);
    },
    [finishScrollForRoute],
  );

  // Persist scroll while reading (native scroll; Lenis syncs via lenisScroll.js)
  useEffect(() => {
    if (window.__lenis) return undefined;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        sessionStorage.setItem(scrollStorageKey(), String(window.scrollY));
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  // Warm likely next routes after navigation (idle, non-blocking)
  useEffect(() => {
    const RELATED_PREFETCH = {
      '/': ['/franchise-opportunities', '/list-your-brand', '/contact-us'],
      '/list-your-brand': ['/contact-us', '/franchise-opportunities', '/services'],
      '/franchise-opportunities': ['/franchise-details', '/contact-us', '/list-your-brand'],
      '/about-us': ['/team', '/contact-us', '/services'],
      '/services': ['/contact-us', '/list-your-brand', '/franchise-opportunities'],
      '/contact-us': ['/list-your-brand', '/franchise-opportunities'],
      '/blog': ['/blog-detail', '/contact-us'],
    };
    const targets = RELATED_PREFETCH[pathname];
    if (!targets?.length) return undefined;

    const run = () => targets.forEach((route) => prefetchRoute(route));
    let idleId;
    let timeoutId;
    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(run, { timeout: 2200 });
    } else {
      timeoutId = window.setTimeout(run, 500);
    }
    return () => {
      if (idleId != null) window.cancelIdleCallback(idleId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [pathname]);

  // Browser back / forward
  useEffect(() => {
    const onPopState = (event) => {
      // Trusted = browser back/forward; synthetic PopStateEvent = in-app link (scroll to top)
      runRouteTransition(event.isTrusted === true);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [runRouteTransition]);

  // Programmatic SPA navigation (navbar, footer, CTAs)
  useEffect(() => {
    const onNavigate = () => {
      runRouteTransition(false);
    };
    window.addEventListener(NAVIGATE_EVENT, onNavigate);
    return () => window.removeEventListener(NAVIGATE_EVENT, onNavigate);
  }, [runRouteTransition]);

  useEffect(
    () => () => {
      if (transitionTimerRef.current) window.clearTimeout(transitionTimerRef.current);
    },
    [],
  );

  // Hash scroll after page paint (e.g. /#faq on home)
  useEffect(() => {
    const timer = window.setTimeout(() => scrollToHashSection(), 80);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  // data-reveal IntersectionObserver - deferred to avoid blocking route paint
  useEffect(() => {
    let observer;
    let cancelled = false;

    const setup = () => {
      if (cancelled) return;
      const revealElements = document.querySelectorAll('[data-reveal]:not(.is-revealed)');
      if (!revealElements.length) return;

      observer = new IntersectionObserver(
        (entries) => entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        }),
        {
          threshold: 0.08,
          rootMargin:
            typeof window !== 'undefined' && window.matchMedia('(max-width: 1279px)').matches
              ? '0px 0px -2% 0px'
              : '0px 0px -3% 0px',
        },
      );
      revealElements.forEach((el) => observer.observe(el));
    };

    let idleId;
    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(setup, { timeout: 400 });
    } else {
      idleId = window.setTimeout(setup, 0);
    }

    return () => {
      cancelled = true;
      if ('requestIdleCallback' in window) window.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
      observer?.disconnect();
    };
  }, [pathname]);

  // Below-fold footer CTA — defer chunk until after first paint (all routes).
  useEffect(() => {
    let idleId;
    let timeoutId;
    const show = () => setShowPreFooter(true);
    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(show, { timeout: 2200 });
    } else {
      timeoutId = window.setTimeout(show, 500);
    }
    return () => {
      if (idleId != null) window.cancelIdleCallback(idleId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  // GA4: track initial page + every SPA route change.
  // Uses a deduped singleton to prevent duplicate page_view events.
  useEffect(() => {
    const expectedPageKey = `${window.location.pathname}${window.location.search}`;
    const raf1 = window.requestAnimationFrame(() => {
      const raf2 = window.requestAnimationFrame(() => {
        if (`${window.location.pathname}${window.location.search}` !== expectedPageKey) return;
        trackPageView({ logicalRoute: pathname });
      });
      // In case of very rapid route changes, prevent stale callbacks.
      // eslint-disable-next-line no-unused-vars
      return raf2;
    });
    return () => {
      window.cancelAnimationFrame(raf1);
    };
  }, [pathname]);

  const isAboutPage               = pathname === '/about-us';
  const isTeamPage                = pathname === '/team';
  const isFranchiseDetailsPage    = pathname === '/franchise-details';
  const isFranchiseOpportunitiesPage = pathname === '/franchise-opportunities';
  const isPrivacyPolicyPage       = pathname === '/privacy-policy';
  const isTermsPage               = pathname === '/terms-and-conditions';
  const isContactPage             = pathname === '/contact-us';
  const isLicensesPage            = pathname === '/licenses';
  const isServicesPage            = pathname === '/services';
  const isCareersPage             = pathname === '/careers';
  const isNotFoundPage            = pathname === '/404';
  const isBlogPage                = pathname === '/blog';
  const isBlogDetailPage          = pathname === '/blog-detail';
  const isListYourBrandPage       = pathname === '/list-your-brand';
  const isFAQPage                 = pathname === '/faq';
  const isHomePage                = pathname === '/';

  useEffect(() => {
    document.documentElement.classList.toggle('low-power-device', lowPowerDevice);
    return () => document.documentElement.classList.remove('low-power-device');
  }, [lowPowerDevice]);

  useEffect(() => {
    if (lowPowerDevice) {
      let idleId;
      const show = () => setShowBackdrop(true);
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(show, { timeout: 3500 });
      } else {
        idleId = window.setTimeout(show, 2000);
      }
      return () => {
        if ('requestIdleCallback' in window) window.cancelIdleCallback(idleId);
        else window.clearTimeout(idleId);
      };
    }
    if (isHomeRoute) {
      let idleId;
      const show = () => setShowBackdrop(true);
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(show, { timeout: 1800 });
      } else {
        idleId = window.setTimeout(show, 600);
      }
      return () => {
        if ('requestIdleCallback' in window) window.cancelIdleCallback(idleId);
        else window.clearTimeout(idleId);
      };
    }
    setShowBackdrop(true);
    return undefined;
  }, [lowPowerDevice, isHomeRoute]);

  return (
    <FranchiseOpportunityNavbarFiltersProvider>
      <div className="relative min-h-screen bg-transparent text-theme-primary">
        <PageSEO pathname={pathname} />
        {showBackdrop ? <AnimatedSiteBackdrop /> : null}
        <Navbar />

      {/* Page transition wrapper */}
      <main
        id="main-content"
        data-phase={pagePhase === 'idle' ? undefined : pagePhase}
        className={`relative z-10 ${isHomePage ? '' : 'pt-16'}`}
        style={{
          opacity: pagePhase === 'idle' ? 1 : 0,
          transition: pagePhase === 'idle'
            ? 'opacity 0.2s cubic-bezier(0.22,1,0.36,1)'
            : 'opacity 0.08s ease',
        }}
      >
        <ErrorBoundary resetKey={pathname} label="Page">
        {isHomePage ? (
          <Suspense fallback={null}>
            <Hero />
          </Suspense>
        ) : (
          <Suspense fallback={<PageSkeleton />}>
            {isNotFoundPage ? <NotFoundPage />
            : isTermsPage ? <TermsConditionsPage />
            : isLicensesPage ? <LicensesPage />
            : isPrivacyPolicyPage ? <PrivacyPolicyPage />
            : isServicesPage ? <ServicesPage />
            : isCareersPage ? <CareersPage />
            : isFranchiseOpportunitiesPage ? <FranchiseOpportunitiesPage />
            : isFranchiseDetailsPage ? <FranchiseDetailsPage />
            : isTeamPage ? <TeamPage />
            : isAboutPage ? <AboutPage />
            : isContactPage ? <ContactPage />
            : isBlogPage ? <BlogPage />
            : isBlogDetailPage ? <BlogDetailPage />
            : isListYourBrandPage ? <ForBrandOwnersPage />
            : isFAQPage ? <FAQPage />
            : <NotFoundPage />}
          </Suspense>
        )}
        </ErrorBoundary>
      </main>

      {showPreFooter ? (
        <Suspense fallback={null}>
          <PreFooterCTA
            shellClassName={
              isFranchiseOpportunitiesPage
                ? FRANCHISE_OPPORTUNITIES_SHELL
                : isFranchiseDetailsPage
                  ? FRANCHISE_DETAILS_SHELL
                  : ''
            }
          />
        </Suspense>
      ) : null}
      <Footer />

        {showExpansionAssistant && (
          <ErrorBoundary resetKey={pathname} label="Expansion assistant">
            <Suspense fallback={null}>
              <ExpansionAssistant />
            </Suspense>
          </ErrorBoundary>
        )}
      </div>
    </FranchiseOpportunityNavbarFiltersProvider>
  );
}

export default App;
