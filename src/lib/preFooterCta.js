import { navigateTo } from './navigation';
import { CAREERS_APPLY_EMAIL } from '../components/careersData';
import { SOCIAL_LINKS } from '../constants/socialLinks';

const CAL_URL = 'https://cal.com/ifranchise.in/30min';
const LINKEDIN_HREF = SOCIAL_LINKS.find((s) => s.id === 'linkedin')?.href || '#';

const openCal = () => window.open(CAL_URL, '_blank', 'noopener,noreferrer');

function scrollToListYourBrandForm() {
  document.getElementById('lyb-hero-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  window.setTimeout(() => {
    const firstField = document.querySelector(
      '#hero-brand-inquiry input:not([type="hidden"]), #hero-brand-inquiry select, #hero-brand-inquiry textarea',
    );
    firstField?.focus({ preventScroll: true });
  }, 420);
}

function scrollToFranchiseInquiryForm() {
  document.getElementById('fd-sticky-inquiry-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export const PREFOOTER_CTA_CONTENT = {
  default: {
    heading: 'Ready to Build, Invest, or Expand?',
    description:
      'Whether you are exploring franchise investment opportunities or planning to scale your business, iFranchise helps you move forward with clarity, confidence, and the right connections.',
    trust: 'Trusted by franchise brands and investors across India.',
    primary: { label: 'Explore Franchise Opportunities', action: () => navigateTo('/franchise-opportunities') },
    secondary: { label: 'Schedule a Growth Consultation', action: openCal },
  },
  careers: {
    heading: 'Join the iFranchise team',
    description:
      'We are building a franchise growth platform with ambitious people. View open roles, apply with your portfolio, or follow us for future openings.',
    primary: { label: 'View open roles', action: () => navigateTo('/careers#open-roles') },
    secondary: {
      label: 'Apply via email',
      action: () => {
        window.location.href = `mailto:${CAREERS_APPLY_EMAIL}?subject=${encodeURIComponent('Application — iFranchise Careers')}`;
      },
    },
    tertiary: {
      label: 'Follow on LinkedIn',
      action: () => window.open(LINKEDIN_HREF, '_blank', 'noopener,noreferrer'),
    },
  },
  listYourBrand: {
    heading: 'Ready To List Your Brand?',
    description:
      'Submit your brand profile and reach serious franchise investors and expansion partners across India.',
    trust: 'Trusted by franchise brands on the iFranchise network.',
    primary: { label: 'Submit Brand Listing', action: scrollToListYourBrandForm },
    secondary: { label: 'Talk To Franchise Expert', action: () => navigateTo('/contact-us') },
  },
  services: {
    heading: 'Ready To Scale With Franchise Expertise?',
    description:
      'From franchise development and consulting to lead generation — get the support your brand or investment journey needs.',
    trust: 'Trusted by franchise brands and investors across India.',
    primary: { label: 'Book a Strategy Call', action: openCal },
    secondary: { label: 'Explore Franchise Opportunities', action: () => navigateTo('/franchise-opportunities') },
  },
  franchiseOpportunities: {
    heading: 'Take The Next Step In Your Franchise Journey',
    description:
      'Shortlist opportunities, speak with our advisors, or list your own brand on India\'s franchise marketplace.',
    trust: 'Trusted by franchise brands and investors across India.',
    primary: { label: 'Speak With An Advisor', action: () => navigateTo('/contact-us') },
    secondary: { label: 'List Your Brand', action: () => navigateTo('/list-your-brand') },
  },
  franchiseDetails: {
    heading: 'Interested In This Franchise?',
    description:
      'Submit an enquiry and our team will help you evaluate this opportunity and plan your next move.',
    trust: 'Trusted by franchise brands and investors across India.',
    primary: { label: 'Submit Franchise Enquiry', action: scrollToFranchiseInquiryForm },
    secondary: { label: 'Explore More Opportunities', action: () => navigateTo('/franchise-opportunities') },
  },
  contact: {
    heading: 'Explore Franchising On Your Terms',
    description:
      'Browse verified franchise opportunities or list your brand while our team supports your growth journey.',
    trust: 'Trusted by franchise brands and investors across India.',
    primary: { label: 'Explore Franchise Opportunities', action: () => navigateTo('/franchise-opportunities') },
    secondary: { label: 'List Your Brand', action: () => navigateTo('/list-your-brand') },
  },
  about: {
    heading: 'Build, Invest, Or Expand With iFranchise',
    description:
      'Discover how India\'s franchise growth platform connects brands, investors, and expansion partners nationwide.',
    trust: 'Trusted by franchise brands and investors across India.',
    primary: { label: 'Explore Franchise Opportunities', action: () => navigateTo('/franchise-opportunities') },
    secondary: { label: 'Contact Us', action: () => navigateTo('/contact-us') },
  },
  blog: {
    heading: 'Turn Franchise Insights Into Action',
    description:
      'Keep learning from our guides and resources, or explore live franchise opportunities across India.',
    trust: 'Trusted by franchise brands and investors across India.',
    primary: { label: 'Browse All Articles', action: () => navigateTo('/blogs') },
    secondary: { label: 'Explore Franchise Opportunities', action: () => navigateTo('/franchise-opportunities') },
  },
  faq: {
    heading: 'Still Have Franchise Questions?',
    description:
      'Speak with our team or explore opportunities and services tailored to investors and brand owners.',
    trust: 'Trusted by franchise brands and investors across India.',
    primary: { label: 'Contact Us', action: () => navigateTo('/contact-us') },
    secondary: { label: 'Explore Franchise Opportunities', action: () => navigateTo('/franchise-opportunities') },
  },
  readiness: {
    heading: 'Ready For Your Next Franchise Move?',
    description:
      'Use your readiness insights to explore matching opportunities or list your brand for investor discovery.',
    trust: 'Trusted by franchise brands and investors across India.',
    primary: { label: 'Explore Franchise Opportunities', action: () => navigateTo('/franchise-opportunities') },
    secondary: { label: 'List Your Brand', action: () => navigateTo('/list-your-brand') },
  },
  knowledgeHub: {
    heading: 'Turn Knowledge Into Franchise Action',
    description:
      'Apply what you\'ve learned — explore opportunities, assess readiness, or list your brand on iFranchise.',
    trust: 'Trusted by franchise brands and investors across India.',
    primary: { label: 'Explore Franchise Opportunities', action: () => navigateTo('/franchise-opportunities') },
    secondary: { label: 'List Your Brand', action: () => navigateTo('/list-your-brand') },
  },
};

export function resolvePreFooterVariant(pathname) {
  if (pathname === '/careers' || pathname === '/career-detail') return 'careers';
  if (pathname === '/list-your-brand') return 'listYourBrand';
  if (pathname === '/services') return 'services';
  if (pathname === '/franchise-opportunities') return 'franchiseOpportunities';
  if (pathname === '/franchise-details') return 'franchiseDetails';
  if (pathname === '/contact-us') return 'contact';
  if (pathname === '/about-us' || pathname === '/team') return 'about';
  if (pathname === '/blogs' || pathname === '/blog-detail') return 'blog';
  if (pathname === '/faq') return 'faq';
  if (pathname === '/franchise-readiness-assessment') return 'readiness';
  if (pathname.startsWith('/resources/knowledge-hub')) return 'knowledgeHub';
  return 'default';
}
