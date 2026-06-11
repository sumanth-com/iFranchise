# SEO & GEO Audit Report — iFranchise

**Date:** June 10, 2026  
**Scope:** Full-site technical SEO, on-page SEO, GEO (Generative Engine Optimization), CTA optimization, content, and local SEO.

---

## Executive summary

iFranchise already had a solid centralized SEO architecture (`PageSEO`, `resolvePageSeo`, JSON-LD, sitemap, `llms.txt`). This audit **implemented fixes and enhancements** across 25+ files to align crawler-first HTML with runtime SEO, strengthen AI citation readiness, improve keyword targeting for India franchise searches, and sharpen conversion-focused CTAs.

**Expected outcomes (3–6 months with consistent content + backlinks):**
- Improved indexing consistency for home and static pages
- Better rich-result eligibility (FAQ, breadcrumbs, Organization, JobPosting, BlogPosting)
- Stronger visibility in AI search (ChatGPT, Perplexity, Gemini, Copilot) via `llms.txt`, FAQ schema, and entity-rich structured data
- Higher click-through from clearer titles/descriptions and action-oriented CTAs

---

## 1. Technical SEO — Issues found & fixes

| Issue | Severity | Fix applied |
|-------|----------|-------------|
| `index.html` title/OG mismatched `staticPages.js` | High | Aligned title, description, OG, Twitter to canonical home SEO |
| 30+ duplicate `<link rel="manifest">` tags | Medium | Reduced to single `manifest.webmanifest` |
| `lang="en"` instead of India locale | Low | Changed to `lang="en-IN"` |
| Missing geo meta tags | Medium | Added `geo.region`, `geo.placename`, `author` |
| Weak robots directive | Low | Added `max-image-preview:large, max-snippet:-1, max-video-preview:-1` |
| `llms.txt` not referenced | Medium | Linked in `robots.txt`, `index.html`, expanded content |
| Sitemap missing `<lastmod>` | Medium | Added build-date `lastmod` to all 41 URLs |
| Legacy `/franchise-details` URLs | Medium | 301 redirect to `/franchise-opportunities` in `vercel.json` |
| Legacy `/franchise` path | Low | 301 redirect to `/franchise-opportunities` |
| Organization JSON-LD incomplete in HTML | Medium | Added address, `knowsAbout`, `contactPoint`, `ProfessionalService` |
| AI crawlers not explicitly allowed | Medium | Added GPTBot, PerplexityBot, ClaudeBot, Google-Extended rules |

### Remaining technical recommendations

1. **SSR or prerender** — Meta and JSON-LD are injected client-side after React hydration. Consider Vite SSR, prerender plugin, or a post-build prerender for top 41 sitemap URLs so crawlers that don't execute JS see full per-page SEO.
2. **Per-slug franchise redirects** — `/franchise-details?id=X` should 301 to `/franchise/{slug}` (requires edge middleware mapping IDs to slugs).
3. **OG image** — Replace apple-touch-icon with a dedicated 1200×630 branded OG image for richer social previews.
4. **Core Web Vitals** — Continue monitoring LCP (static hero preload in place), CLS, INP via Search Console.

---

## 2. On-page SEO — Pages optimized

### Static pages (`src/seo/staticPages.js`)

| Page | Optimization |
|------|----------------|
| `/` | Sharpened description for franchise consulting + investor matching |
| `/about-us` | Title/description emphasize franchise development expertise |
| `/services` | Reframed as franchise consulting & expansion services |
| `/franchise-opportunities` | Investment intent keywords, FOFO/FICO mention |
| `/list-your-brand` | Brand expansion + investor matching focus |
| `/contact-us` | "Connect with franchise experts" positioning |
| `/faq` | Broader franchise business + model keywords |

### Dynamic pages

- **11 franchise brand pages** — Kasturi Creations description corrected (accurate investment + returns language)
- **10 city location pages** — Enhanced meta descriptions with city + India + model keywords
- **4 blog posts** — Existing BlogPosting schema retained
- **3 career roles** — JobPosting schema retained

### Keywords (`src/seo/keywords.js`)

Expanded primary/secondary sets to include: franchise investment, retail franchise, startup investment india, brand expansion, business expansion, investor opportunities.

---

## 3. GEO (Generative Engine Optimization)

### Implemented

| Enhancement | Location |
|-------------|----------|
| Comprehensive `llms.txt` | `public/llms.txt` — quick answers, services, models, cities, brands, citation format |
| AI crawler allow rules | `public/robots.txt` |
| `IFRANCHISE_OVERVIEW_FAQS` | `src/data/faqContent.js` — "What is iFranchise?" answer blocks |
| `SERVICES_FAQS` | Franchise consulting scope for AI retrieval |
| Home FAQ schema | Combined overview + investment FAQs in JSON-LD |
| Services FAQ schema | Dedicated `SERVICES_FAQS` (replaced incorrect HOME_FAQS on services route) |
| Location-aware CollectionPage | City name in schema title/description for `/location/*` |
| Entity-rich Organization | `knowsAbout`, `contactPoint`, `areaServed: India`, `ProfessionalService` |
| Visible FAQ sync | Home + `/faq` page now show same GEO-optimized FAQ content |

### Why this helps AI systems

- **Direct answer blocks** in `llms.txt` and FAQs match how LLMs extract citations
- **Entity clarity** (Organization + Service + Offer + FAQPage) improves knowledge graph linking
- **Consistent NAP** (name, address, phone) across schema, footer, contact, and `llms.txt`

---

## 4. CTA optimization

| Location | Before | After |
|----------|--------|-------|
| Hero primary | Explore Opportunities | Explore Franchise Opportunities |
| Hero secondary | List Your Brand | Expand Your Brand Across India |
| Hero investor card | Explore Opportunities | Find the Right Franchise Investment |
| Hero brand card | List Your Brand | Expand Your Brand Across India |
| Hero featured | View All Opportunities | Explore All Franchise Opportunities |
| Hero consultation | Start Your Expansion Journey | Schedule a Growth Consultation |
| Pre-footer primary | Explore Opportunities | Explore Franchise Opportunities |
| Pre-footer secondary | Book Strategic Call | Schedule a Growth Consultation |
| Franchise detail | Enquire now | Connect With Franchise Experts |
| Inquiry form | Send interest | Submit Franchise Enquiry |
| Contact page | Get in touch | Connect With Franchise Experts |
| Services CTA | Start Your Expansion Journey | Schedule a Growth Consultation |
| Services section | View All Services | Explore Franchise Consulting Services |

---

## 5. Content & E-E-A-T improvements

- Fixed broken rupee symbols (`?` → proper ₹) in home FAQ by sourcing from `faqContent.js`
- Fixed grammar typo in Hero ("brand ?" → "brand,")
- Footer "Industries" duplicate link → "Franchise Services" → `/services` (better internal linking)
- Pre-footer trust line made accurate: "Trusted by franchise brands and investors across India"
- FAQ page expanded with About iFranchise + Services sections for depth and authority

---

## 6. Local SEO (India)

- `geo.region: IN-KA`, `geo.placename: Bengaluru, Karnataka, India` on all pages
- Organization schema: full Bengaluru address, `areaServed: India`
- 10 city landing pages in sitemap with localized titles and CollectionPage schema
- City aliases (Bangalore → Bengaluru, Delhi → Delhi NCR) via `vercel.json` redirects
- India-focused copy, INR investment ranges, FOFO/FOCO/FICO model explanations

---

## 7. Structured data coverage (post-audit)

| Route | Schema types |
|-------|----------------|
| All pages | Organization (+ ProfessionalService), WebSite |
| Home | FAQPage (8 Q&As), BreadcrumbList |
| About | AboutPage, BreadcrumbList |
| Services | Service ×6, FAQPage (services), BreadcrumbList |
| Opportunities | CollectionPage, ItemList, BreadcrumbList |
| Location pages | City-named CollectionPage + ItemList |
| Franchise detail | Organization (brand), WebPage, Offer, FAQPage, BreadcrumbList |
| List your brand | Service, ContactPage, FAQPage |
| Contact | ContactPage, FAQPage |
| FAQ | FAQPage (all groups) |
| Blogs | Blog, BlogPosting |
| Careers | CollectionPage, ItemList, JobPosting, FAQPage |

---

## 8. Files modified

```
index.html
public/robots.txt
public/llms.txt
public/sitemap.xml (regenerated)
vercel.json
src/seo/staticPages.js
src/seo/keywords.js
src/seo/config.js
src/seo/applyHead.js
src/seo/resolvePageSeo.js
src/seo/schema/builders.js
src/seo/schema/routeSchemas.js
src/data/faqContent.js
src/data/opportunities/brandSeo.js
scripts/generate-sitemap.mjs
src/components/Hero.jsx
src/components/PreFooterCTA.jsx
src/components/FranchiseDetailsPage.jsx
src/components/FranchiseInquiryModal.jsx
src/components/FranchiseInquiryLauncher.jsx
src/components/ContactPage.jsx
src/components/ServicesPage.jsx
src/components/OurServicesSection.jsx
src/components/FAQPage.jsx
docs/SEO_GEO_REPORT.md
```

---

## 9. Remaining recommendations (priority order)

1. **Prerender top 41 URLs** at build time for crawler-first SEO
2. **Create dedicated OG image** (1200×630) for social and AI link previews
3. **Add Google Search Console + Bing Webmaster Tools** verification meta tags if not already configured in GTM
4. **Build editorial calendar** — 2–4 franchise guides/month targeting long-tail India queries
5. **Earn backlinks** — guest posts on franchise/startup publications, LinkedIn thought leadership
6. **Review Core Web Vitals** monthly in Search Console
7. **Add `hreflang`** only if expanding beyond India
8. **Server-side franchise ID → slug redirects** for legacy query URLs

---

## 10. Validation checklist

After deploy:

- [ ] Google Rich Results Test on home, `/faq`, `/franchise/odette`, `/blogs/how-to-evaluate-franchise-opportunity-india`
- [ ] Submit `sitemap.xml` in Google Search Console & Bing Webmaster Tools
- [ ] Verify `robots.txt` and `llms.txt` load at production URLs
- [ ] Spot-check canonical tags on location pages and franchise detail pages
- [ ] Test CTAs and form submissions still track conversions in GA4/GTM

---

*Report generated as part of the June 2026 SEO/GEO optimization pass.*
