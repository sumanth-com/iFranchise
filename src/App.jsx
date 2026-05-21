import { useEffect, useState, lazy, Suspense, useRef, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AnimatedSiteBackdrop from './components/AnimatedSiteBackdrop';
import PreFooterCTA from './components/PreFooterCTA';
import { FranchiseOpportunityNavbarFiltersProvider } from './context/FranchiseOpportunityNavbarFiltersContext';
import { useScrollPastHero } from './hooks/useScrollPastHero';
import PageSEO from './components/seo/PageSEO';
import ErrorBoundary from './components/ErrorBoundary';
import {
  NAVIGATE_EVENT,
  getLogicalPathname,
  scrollStorageKey,
  persistCurrentScrollInHistory,
  readStoredScroll,
  applyScroll,
  scrollToHashSection,
} from './lib/navigation';

const ExpansionAssistant = lazy(() => import('./components/ExpansionAssistant'));

// -- Lazy-load all pages - only load what's needed -----------------------------
const Hero                    = lazy(() => import('./components/Hero'));
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
const CareerDetailPage        = lazy(() => import('./components/CareerDetailPage'));
const ForBrandOwnersPage      = lazy(() => import('./components/ForBrandOwnersPage'));

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
  const [pathname, setPathname] = useState(getLogicalPathname);
  const [pagePhase, setPagePhase] = useState('idle');
  const transitionTimerRef = useRef(null);

  const assistantEligible = pathname !== '/404';
  const scrolledPastHero = useScrollPastHero(pathname, assistantEligible);
  const showExpansionAssistant = assistantEligible && scrolledPastHero;

  const finishScrollForRoute = useCallback((isBackForward) => {
    const didScrollToHash = scrollToHashSection();
    if (didScrollToHash) return;

    if (isBackForward) {
      const restored = readStoredScroll();
      applyScroll(restored ?? 0);
      return;
    }

    applyScroll(0);
  }, []);

  const runRouteTransition = useCallback(
    (isBackForward) => {
      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
      }

      persistCurrentScrollInHistory();

      setPagePhase('exit');
      transitionTimerRef.current = window.setTimeout(() => {
        const nextPath = getLogicalPathname();
        setPathname(nextPath);
        setPagePhase('enter');
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => setPagePhase('idle'));
        });
        window.requestAnimationFrame(() => {
          finishScrollForRoute(isBackForward);
        });
      }, 30);
    },
    [finishScrollForRoute],
  );

  // Persist scroll while reading (all routes)
  useEffect(() => {
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
        { threshold: 0.1, rootMargin: '0px 0px -3% 0px' },
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

  const isAboutPage               = pathname === '/about';
  const isTeamPage                = pathname === '/team';
  const isFranchiseDetailsPage    = pathname === '/franchise-details';
  const isFranchiseOpportunitiesPage = pathname === '/franchise-opportunities';
  const isPrivacyPolicyPage       = pathname === '/privacy-policy';
  const isTermsPage               = pathname === '/terms-and-conditions';
  const isContactPage             = pathname === '/contact';
  const isLicensesPage            = pathname === '/licenses';
  const isServicesPage            = pathname === '/services';
  const isCareersPage             = pathname === '/careers';
  const isCareerDetailPage        = pathname === '/career-detail';
  const isNotFoundPage            = pathname === '/404';
  const isBlogPage                = pathname === '/blog';
  const isBlogDetailPage          = pathname === '/blog-detail';
  const isListYourBrandPage       = pathname === '/list-your-brand';
  const isHomePage                = pathname === '/';

  return (
    <FranchiseOpportunityNavbarFiltersProvider>
      <div className="relative min-h-screen scroll-smooth bg-transparent text-theme-primary">
        <PageSEO pathname={pathname} />
        <AnimatedSiteBackdrop />
        <Navbar />

      {/* Page transition wrapper */}
      <main
        id="main-content"
        className={`relative z-10 ${isCareerDetailPage || isHomePage ? '' : 'pt-16'}`}
        style={{
          opacity: pagePhase === 'idle' ? 1 : 0,
          transition: pagePhase === 'idle'
            ? 'opacity 0.2s cubic-bezier(0.22,1,0.36,1)'
            : 'opacity 0.08s ease',
        }}
      >
        <ErrorBoundary resetKey={pathname} label="Page">
        <Suspense fallback={<PageSkeleton />}>
          {isNotFoundPage ? <NotFoundPage />
          : isTermsPage ? <TermsConditionsPage />
          : isLicensesPage ? <LicensesPage />
          : isPrivacyPolicyPage ? <PrivacyPolicyPage />
          : isServicesPage ? <ServicesPage />
          : isCareersPage ? <CareersPage />
          : isCareerDetailPage ? <CareerDetailPage roleId={window.location.pathname.split('/careers/')[1]} />
          : isFranchiseOpportunitiesPage ? <FranchiseOpportunitiesPage />
          : isFranchiseDetailsPage ? <FranchiseDetailsPage />
          : isTeamPage ? <TeamPage />
          : isAboutPage ? <AboutPage />
          : isContactPage ? <ContactPage />
          : isBlogPage ? <BlogPage />
          : isBlogDetailPage ? <BlogDetailPage />
          : isListYourBrandPage ? <ForBrandOwnersPage />
          : <Hero />}
        </Suspense>
        </ErrorBoundary>
      </main>

      <PreFooterCTA variant={isCareerDetailPage ? 'careers-detail' : 'default'} />
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
