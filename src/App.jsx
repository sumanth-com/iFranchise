import { useEffect, useState, lazy, Suspense, Component } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AnimatedSiteBackdrop from './components/AnimatedSiteBackdrop';
import PreFooterCTA from './components/PreFooterCTA';
import { FranchiseOpportunityNavbarFiltersProvider } from './context/FranchiseOpportunityNavbarFiltersContext';
import { useScrollPastHero } from './hooks/useScrollPastHero';
import { logger } from './lib/logger';

const ExpansionAssistant = lazy(() => import('./components/ExpansionAssistant'));

// ── Lazy-load all pages — only load what's needed ─────────────────────────────
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

class PageErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    logger.error('Page failed to load:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="relative z-10 flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="text-sm font-medium text-white">Something went wrong loading this page.</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-xl bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-violet-500"
          >
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ── Minimal page-level skeleton ───────────────────────────────────────────────
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
        <p className="text-xs font-medium uppercase tracking-widest text-white">Loading</p>
      </div>
    </div>
  );
}

const scrollToHashSection = () => {
  const hash = window.location.hash;
  if (!hash) return false;
  const target = document.querySelector(hash);
  if (!target) return false;
  const navbar = document.querySelector('header');
  const navbarOffset = navbar ? navbar.offsetHeight : 80;
  const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarOffset - 12;
  if (window.__lenis) {
    window.__lenis.scrollTo(Math.max(targetTop, 0), { duration: 1.2 });
  } else {
    window.scrollTo({ top: Math.max(targetTop, 0), behavior: 'smooth' });
  }
  return true;
};

const getPathname = () => {
  const pathname = window.location.pathname;
  if (pathname === '/about-us') return '/about';
  if (pathname === '/meet-the-team') return '/team';
  if (pathname === '/franchise') return '/franchise-details';
  if (['/featured-opportunities', '/opportunities', '/franchise-opportunities'].includes(pathname)) return '/franchise-opportunities';
  if (pathname === '/privacy-policy') return '/privacy-policy';
  if (pathname === '/terms-and-conditions' || pathname === '/terms') return '/terms-and-conditions';
  if (pathname === '/licenses') return '/licenses';
  if (pathname === '/contact-us') return '/contact';
  if (pathname === '/blog') return '/blog';
  if (pathname === '/services') return '/services';
  if (pathname === '/careers') return '/careers';
  if (['/list-your-brand', '/for-brand-owners', '/brand-owners'].includes(pathname)) return '/list-your-brand';
  if (pathname.startsWith('/careers/') && pathname.split('/').filter(Boolean).length === 2) return '/career-detail';
  if (pathname.startsWith('/blog/') && pathname.split('/').filter(Boolean).length >= 2) return '/blog-detail';
  if (pathname.startsWith('/franchise/') && pathname.length > 12) return '/franchise-details';
  const knownPaths = ['/', '/about', '/team', '/franchise-details', '/franchise-opportunities',
    '/privacy-policy', '/terms-and-conditions', '/licenses', '/contact', '/blog',
    '/services', '/careers', '/list-your-brand'];
  if (!knownPaths.includes(pathname)) return '/404';
  return pathname;
};

function App() {
  const [pathname, setPathname] = useState(getPathname);
  const [pagePhase, setPagePhase] = useState('idle');
  const assistantEligible = pathname !== '/404';
  const scrolledPastHero = useScrollPastHero(pathname, assistantEligible);
  const showExpansionAssistant = assistantEligible && scrolledPastHero;

  // Save scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (pathname === '/') sessionStorage.setItem('homeScrollPosition', window.scrollY.toString());
      else if (pathname === '/careers') sessionStorage.setItem('careersScrollPosition', window.scrollY.toString());
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Route change handler
  useEffect(() => {
    let timerId;
    const onRouteChange = () => {
      const nextPath = getPathname();
      if (pathname === '/') sessionStorage.setItem('homeScrollPosition', window.scrollY.toString());
      else if (pathname === '/careers') sessionStorage.setItem('careersScrollPosition', window.scrollY.toString());

      setPagePhase('exit');
      timerId = window.setTimeout(() => {
        setPathname(nextPath);
        setPagePhase('enter');
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => setPagePhase('idle'));
        });
        window.setTimeout(() => {
          const didScrollToHash = scrollToHashSection();
          if (!didScrollToHash) {
            // Always use instant scroll on route change — Lenis handles smoothness within page
            if (nextPath === '/') {
              const saved = sessionStorage.getItem('homeScrollPosition');
              window.scrollTo({ top: saved ? parseInt(saved, 10) : 0, behavior: 'instant' });
            } else if (nextPath === '/careers') {
              const saved = sessionStorage.getItem('careersScrollPosition');
              window.scrollTo({ top: saved ? parseInt(saved, 10) : 0, behavior: 'instant' });
            } else {
              window.scrollTo({ top: 0, behavior: 'instant' });
            }
            // Tell Lenis to sync after instant scroll
            if (window.__lenis) window.__lenis.scrollTo(window.scrollY, { immediate: true });
          }
        }, 0);
      }, 30); // snappy page transitions
    };
    window.addEventListener('popstate', onRouteChange);
    return () => {
      window.removeEventListener('popstate', onRouteChange);
      if (timerId) window.clearTimeout(timerId);
    };
  }, [pathname]);

  // Hash scroll on mount
  useEffect(() => {
    const timer = window.setTimeout(() => scrollToHashSection(), 0);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  // data-reveal IntersectionObserver — deferred to avoid blocking route paint
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

  return (
    <FranchiseOpportunityNavbarFiltersProvider>
      <div className="relative min-h-screen scroll-smooth bg-transparent text-white">
        <AnimatedSiteBackdrop />
        <Navbar />

      {/* Page transition wrapper */}
      <main
        id="main-content"
        className={`relative z-10 ${isCareerDetailPage ? '' : 'pt-20'}`}
        style={{
          opacity: pagePhase === 'idle' ? 1 : 0,
          transition: pagePhase === 'idle'
            ? 'opacity 0.2s cubic-bezier(0.22,1,0.36,1)'
            : 'opacity 0.08s ease',
        }}
      >
        <PageErrorBoundary>
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
        </PageErrorBoundary>
      </main>

      <PreFooterCTA />
      <Footer />

        {showExpansionAssistant && (
          <Suspense fallback={null}>
            <ExpansionAssistant />
          </Suspense>
        )}
      </div>
    </FranchiseOpportunityNavbarFiltersProvider>
  );
}

export default App;
