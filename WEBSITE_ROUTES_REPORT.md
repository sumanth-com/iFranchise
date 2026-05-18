# iFranchise Website — Route Structure & Metadata Readiness Report

**Project:** React 19 + Vite 5 (SPA)  
**Routing:** Custom client-side routing via `history.pushState` / `popstate` (no React Router)  
**Router source:** `src/App.jsx` → `getPathname()`  
**Report date:** May 15, 2026  
**Purpose:** Stakeholder-ready documentation of all navigable paths, navigation touchpoints, forms, and SEO/metadata gaps.

---

## Executive Summary

The iFranchise website is a **single-page application** with **16 page components** mapped through a central pathname resolver. Routes are **flat** (no React Router nested layouts). Dynamic content exists for **careers**, **blog posts**, and **franchise listings**.

**Key findings:**

| Metric | Count |
|--------|------:|
| Primary static routes | 13 |
| System / error route | 1 (`404`) |
| Legacy URL aliases (redirects) | 9 |
| Career detail routes (dynamic) | 6 |
| Blog detail routes (dynamic) | 15 |
| Franchise slug routes (registered) | 9 |
| Franchise detail routes (query `?id=`) | 24 |
| **Total indexable URL patterns** | **~78+** |
| Pages with per-route `<title>` / meta | **0** (global only) |
| Broken / inconsistent nav links | **2** identified |

---

--------------------------------------------------
## WEBSITE ROUTE STRUCTURE
--------------------------------------------------

### Home
| Path | Component | Notes |
|------|-----------|-------|
| `/` | `Hero.jsx` | Default landing; includes hash target `#about` |

**Home hash anchors (in-page):**
| Hash | Element | Status |
|------|---------|--------|
| `#about` | Present on Hero (`id="about"`) | Working |
| `#faq` | Referenced in footer; **no matching `id` on home** | **Broken** |

---

### About & Team
| Path | Component | Notes |
|------|-----------|-------|
| `/about` | `AboutPage.jsx` | Primary About route |
| `/about-us` | → resolves to `/about` | Legacy alias |
| `/team` | `TeamPage.jsx` | Linked from About page CTA |
| `/meet-the-team` | → resolves to `/team` | Legacy alias |

---

### Services
| Path | Component | Notes |
|------|-----------|-------|
| `/services` | `ServicesPage.jsx` | Single services hub; **no sub-routes** (e.g. no `/services/seo`) |

All navbar “Services” dropdown items route to `/services`:
- Franchise Discovery, Expansion, Investor Matching, Consulting, Market Research, Lead Generation

**Navbar inconsistency:** “FAQs” in Resources dropdown links to `/services` (not an FAQ section).

---

### Franchise Opportunities (Investors)
| Path | Component | Notes |
|------|-----------|-------|
| `/franchise-opportunities` | `FranchiseOpportunitiesPage.jsx` | Primary listing |
| `/featured-opportunities` | → alias | Legacy |
| `/opportunities` | → alias | Legacy |

**Detail navigation pattern:** `/franchise-details?id={1–24}`

---

### Franchise Details (Dynamic — Brands / Opportunities)
| Path pattern | Component | Parameter | Records |
|--------------|-----------|-----------|--------:|
| `/franchise/{slug}` | `FranchiseDetailsPage.jsx` | URL slug | 9 registered slugs |
| `/franchise-details?id={id}` | `FranchiseDetailsPage.jsx` | Query `id` | 24 franchise IDs |
| `/franchise` | `FranchiseDetailsPage.jsx` | Defaults to ID `1` | Legacy alias |

**Registered slug → franchise ID map** (`slugToFranchiseId` in `FranchiseDetailsPage.jsx`):

| Slug | Franchise ID |
|------|-------------|
| `burgerblast` | 1 |
| `fitlife-gym` | 2 |
| `ecoclean-solutions` | 3 |
| `urban-coffee-co` | 1 |
| `fitlife-studios` | 2 |
| `bella-italia-ristorante` | 3 |
| `kidszone-play-center` | 24 |
| `quickclean-services` | 5 |
| `techrepair-pro` | 6 |

**Slug routes from homepage (Hero) — not in slug map (fallback to ID `1`):**
- `/franchise/foco-model`
- `/franchise/fofo-model`
- `/franchise/fico-model`

**Query-param franchise IDs (1–24):** All opportunities in `src/data/franchiseData.js` — BurgerBlast, FitLife Gym, EcoClean Solutions, TechTutor Education, QuickClean Services, TechRepair Pro, EduLearn Center, StyleSalon, PetParadise, AutoCare Express, CoffeeHaven, GreenThumb Garden, SmoothieKing, YogaZen Studio, BookWorm Store, CleanSweep Pro, CodeAcademy, PastaPerfect, SpaRetreat, GameZone, FreshMart, MindfulMeditation, Taco Fiesta, KidZone Play.

---

### Blog & Resources
| Path | Component | Notes |
|------|-----------|-------|
| `/blog` | `BlogPage.jsx` | Listing |
| `/blog/{slug}` | `BlogDetailPage.jsx` | Dynamic (15 posts) |

**Blog slugs:**

1. `/blog/real-estate-the-timeless-investment-opportunity`
2. `/blog/the-power-of-alternative-investments`
3. `/blog/smart-investing-in-a-changing-world`
4. `/blog/why-product-led-growth-drives-retention`
5. `/blog/how-to-launch-features-without-breaking-trust`
6. `/blog/crypto-risk-management-for-new-investors`
7. `/blog/bitcoin-halving-what-business-investors-should-know`
8. `/blog/weekly-market-roundup-growth-sectors`
9. `/blog/how-to-build-an-investment-thesis-you-can-defend`
10. `/blog/product-roadmap-prioritization-that-scales`
11. `/blog/crypto-regulation-signals-to-follow-in-2026`
12. `/blog/breaking-news-india-franchise-demand-rises`
13. `/blog/investing-checklist-before-signing-any-deal`
14. `/blog/product-analytics-metrics-that-actually-matter`
15. `/blog/crypto-portfolio-allocation-for-long-term-builders`

**Invalid blog slug behavior:** Falls back to first blog post (`blogPosts[0]`) instead of 404 — SEO/content risk.

---

### Careers
| Path | Component | Notes |
|------|-----------|-------|
| `/careers` | `CareersPage.jsx` | Job listings |
| `/careers/{roleId}` | `CareerDetailPage.jsx` | Dynamic job detail + application form |

**Career role IDs:**

| Path | Role |
|------|------|
| `/careers/creative-director` | Creative Director |
| `/careers/motion-designer` | Motion Designer |
| `/careers/franchise-growth-strategist` | Franchise Growth Strategist |
| `/careers/ui-ux-designer` | UI/UX Designer |
| `/careers/content-strategist` | Content Strategist |
| `/careers/business-development-lead` | Business Development Lead |

**Invalid career ID behavior:** Shows “Role not found” inline (page still renders).

**Navbar note:** Careers badge shows `4` openings; data defines **6** roles.

---

### Brand Owners (List Your Brand)
| Path | Component | Notes |
|------|-----------|-------|
| `/list-your-brand` | `ForBrandOwnersPage.jsx` | Primary brand-owner landing |
| `/for-brand-owners` | → alias | Legacy |
| `/brand-owners` | → alias | Legacy |

Includes `BrandApplicationForm` (multi-step) and embedded `FAQSection`.

---

### Contact
| Path | Component | Notes |
|------|-----------|-------|
| `/contact` | `ContactPage.jsx` | Contact form + FAQs |
| `/contact-us` | → alias | Legacy |

---

### Legal & Compliance
| Path | Component | Notes |
|------|-----------|-------|
| `/privacy-policy` | `PrivacyPolicyPage.jsx` | Privacy Policy |
| `/terms-and-conditions` | `TermsConditionsPage.jsx` | Terms of Service |
| `/terms` | → alias | Legacy |
| `/licenses` | `LicensesPage.jsx` | Licenses & IP notice |

---

### Error
| Path | Component | Notes |
|------|-----------|-------|
| Any unknown path | `NotFoundPage.jsx` | Renders without global Navbar/Footer |

---

## Routing Architecture

```
Browser URL (pathname + search + hash)
        │
        ▼
   getPathname()  ── aliases, dynamic patterns, 404 check
        │
        ▼
   App.jsx conditional render (lazy-loaded components)
        │
        ├── popstate listener → page transition + scroll restore
        └── hash scroll (scrollToHashSection) for #anchors
```

| Concept | Implementation |
|---------|----------------|
| Framework | React 19 + Vite 5 |
| Router library | **None** — custom History API |
| Route definition | `src/App.jsx` lines 54–76, 156–210 |
| Navigation | `history.pushState` + `PopStateEvent('popstate')` |
| Nested routes | **None** |
| Code splitting | `React.lazy()` per page component |
| Server rewrites | Not configured in `vite.config.js` (production needs host-level SPA fallback) |

---

## Navigation Inventory

### Primary Navbar (`src/components/Navbar.jsx`)

| Label | Path | Type |
|-------|------|------|
| Logo | `/` | Link |
| Company → About Us | `/about` | Dropdown |
| Company → Contact Us | `/contact` | Dropdown |
| Company → Careers | `/careers` | Dropdown |
| Services | `/services` | Top-level |
| Franchise Opportunities | `/franchise-opportunities` | Top-level |
| Resources → Blog | `/blog` | Dropdown |
| Resources → FAQs | `/services` | Dropdown ⚠️ |
| Resources → Industry Reports | `/blog` | Dropdown |
| Contact Us | `/contact` | Top-level |
| **CTA: List Your Brand** | `/list-your-brand` | Button |
| Mobile menu items | Same as above | — |
| Footer links (in nav drawer) | `/privacy-policy`, `/terms-and-conditions`, `/licenses` | Legal |

### Pre-Footer CTA & Footer (`src/components/PreFooterCTA.jsx`)

`Footer.jsx` is a stub (returns `null`); all footer links live in `PreFooterCTA.jsx`.

| Column | Links |
|--------|-------|
| **Company** | `/about`, `/contact`, `/careers` |
| **For Investors** | `/franchise-opportunities`, `/blog`, `/franchise-opportunities` |
| **For Brands** | `/list-your-brand`, `/contact`, `/services` |
| **Resources** | `/blog`, `/#faq` ⚠️, `/blog`, `/blog` |
| **Legal** | `/privacy-policy`, `/terms-and-conditions` |
| **Pre-footer CTA** | `/franchise-opportunities` |
| **External CTA** | `https://cal.com/ifranchise/30min` (new tab) |

### Homepage CTAs (`src/components/Hero.jsx`)

| CTA | Path |
|-----|------|
| Explore Opportunities | `/franchise-opportunities` |
| List Your Brand | `/list-your-brand` |
| Services | `/services` |
| Franchise cards | `/franchise/{slug}` |
| Franchise models | `/franchise/foco-model`, `/franchise/fofo-model`, `/franchise/fico-model` |

### Services Page CTAs (`src/components/ServicesPage.jsx`)

| CTA | Path |
|-----|------|
| Contact (multiple) | `/contact` |
| Browse opportunities | `/franchise-opportunities` |

### Expansion Assistant Widget (`src/components/ExpansionAssistant.jsx`)

Shown on all pages **except** `/contact` and `/franchise-opportunities`.

| Action | Path |
|--------|------|
| Services | `/services` |
| Franchise opportunities | `/franchise-opportunities` |
| List your brand | `/list-your-brand` |
| Contact | `/contact` |

### Floating Contact CTA (`src/components/FloatingContactCTA.jsx`)

Visible on: `/franchise-details` and `/franchise-opportunities` only.  
Opens franchise inquiry modal (submits to Google Sheets backend).

### Section-level CTAs (Home sections)

| Section file | Typical target |
|--------------|----------------|
| `ServicesOverview.jsx` | `/contact` |
| `ProcessFlow.jsx` | `/contact` |
| `FAQSection.jsx` | `/contact` |
| `BrandsSection.jsx` | `/contact` |
| `CaseStudiesSection.jsx` | `/contact` |
| `IndustriesSection.jsx` | `/contact` |
| `InvestorsSection.jsx` | `/franchise-details?id={id}`, `/franchise-opportunities` |
| `FinalCTA.jsx` | Various internal paths |

---

## Form & Submission Pages

| Page / Surface | Route(s) | Form type | Backend integration | Status |
|----------------|-----------|-----------|---------------------|--------|
| Contact | `/contact` | Contact | `submitContactForm` → Google Sheets | **Live** |
| Career detail | `/careers/{roleId}` | Job application | `submitJobApplication` → Google Sheets | **Live** |
| List Your Brand | `/list-your-brand` | Brand application | `submitBrandApplication` → Google Sheets | **Live** |
| Homepage contact | `/` | Contact | `submitContactForm` → Google Sheets | **Live** |
| Expansion Assistant — Brands | Global widget | Brand consultation | `submitBrandConsultation` → Google Sheets | **Live** |
| Expansion Assistant — Investors | Global widget | Investor lead | `submitChatbotLead` → Google Sheets | **Live** |
| Expansion Assistant — Strategy | Global widget | Strategy calendar click | `submitStrategyCall` → Google Sheets | **Live** |

---

## Route Statistics

### Totals

| Category | Count |
|----------|------:|
| **Page components (templates)** | 16 |
| **Primary static paths** | 13 |
| **Legacy alias paths** | 9 |
| **Dynamic career URLs** | 6 |
| **Dynamic blog URLs** | 15 |
| **Dynamic franchise slug URLs (registered)** | 9 |
| **Dynamic franchise query URLs** | 24 |
| **Approximate total unique URLs** | **~76–78** |

### Public pages (no auth gate)

All routes are public. No authenticated or admin routes detected.

### Dynamic pages

| Type | Pattern | Count |
|------|---------|------:|
| Careers | `/careers/:roleId` | 6 |
| Blog | `/blog/:slug` | 15 |
| Franchise (slug) | `/franchise/:slug` | 9 registered (+ 3 unmapped model slugs) |
| Franchise (query) | `/franchise-details?id=` | 24 |

### Form submission pages

4 live submission surfaces (see table above).

### SEO-important pages (recommended priority)

| Priority | Routes | Rationale |
|----------|--------|-----------|
| **P0** | `/`, `/franchise-opportunities`, `/list-your-brand`, `/services`, `/contact` | Core conversion funnel |
| **P1** | `/franchise-details?id=*`, `/franchise/*`, `/about`, `/blog` | Discovery & trust |
| **P2** | `/careers`, `/careers/*`, `/blog/*`, `/team` | Recruitment & content |
| **P3** | `/privacy-policy`, `/terms-and-conditions`, `/licenses` | Compliance |

### Metadata readiness

| Check | Status |
|-------|--------|
| Global `<title>` in `index.html` | ✅ One site-wide title |
| Per-page `<title>` | ❌ Not implemented |
| Meta descriptions | ❌ Not implemented |
| Open Graph tags | ❌ Not implemented |
| Twitter Card tags | ❌ Not implemented |
| Canonical URLs | ❌ Not implemented |
| `robots.txt` | ❌ Not found |
| `sitemap.xml` | ❌ Not found |
| Structured data (JSON-LD) | ❌ Not found |

**Pages missing titles/descriptions:** All routes except the static `index.html` default — crawlers and social shares will show the same global title for every URL.

---

## Issues & Recommendations

### Broken or inconsistent routes

| Issue | Location | Impact | Recommendation |
|-------|----------|--------|----------------|
| `/#faq` has no target on home | `PreFooterCTA.jsx` | Footer link does nothing useful from `/` | Add `id="faq"` to FAQ section on home, or link to `/list-your-brand#faq` / `/services` |
| Navbar “FAQs” → `/services` | `Navbar.jsx` | Users expect FAQ content | Link to FAQ section or dedicated FAQ route |
| Invalid blog slugs show wrong article | `BlogDetailPage.jsx` | SEO duplicate content risk | Return 404 or “post not found” for unknown slugs |
| `/franchise/foco-model` etc. not in slug map | `FranchiseDetailsPage.jsx` | All show franchise ID 1 | Add slugs to map or dedicated model pages |
| Careers badge “4” vs 6 roles | `Navbar.jsx` | Stale UI | Update badge to `6` |
| `/team` not in main nav | — | Low discoverability | Add to Company dropdown if intentional |
| No `sitemap.xml` / `robots.txt` | `public/` | Crawl efficiency | Generate sitemap for static + dynamic URLs |

### Unused / orphan routes

| Path | Status |
|------|--------|
| `/team` | Valid route; only linked from About page |
| Legacy aliases (`/about-us`, `/contact-us`, etc.) | Working redirects; keep for backward compatibility |
| Social links in footer (`href="#"`) | Placeholder — not internal routes |

---

## Metadata Recommendations

> **Note:** The site currently uses a single global title. Below are **recommended per-route** metadata for implementation (e.g. via `react-helmet-async`, a small `usePageMeta` hook, or SSR when adopted).

### Home — `/`

| Field | Suggested value |
|-------|-----------------|
| **Title** | iFranchise — India's Trusted Franchise Growth Platform |
| **Meta description** | Discover verified franchise opportunities, connect with investors, and scale your brand across India with iFranchise's end-to-end franchise growth platform. |
| **Keywords** | franchise India, franchise opportunities, franchise investment, list your brand, franchise expansion |
| **OG title** | iFranchise — Franchise Growth Platform for India |
| **OG description** | Build, invest, or expand with India's trusted franchise marketplace and growth partner. |

### About — `/about`

| Field | Suggested value |
|-------|-----------------|
| **Title** | About iFranchise — Mission, Vision & Franchise Expertise |
| **Meta description** | Learn how iFranchise helps investors, entrepreneurs, and brand owners navigate franchise discovery, expansion, and growth across India. |
| **Keywords** | about iFranchise, franchise company India, franchise platform |
| **OG title** | About iFranchise |
| **OG description** | Our mission is to make franchise growth accessible, data-driven, and scalable. |

### Team — `/team`

| Field | Suggested value |
|-------|-----------------|
| **Title** | Meet the Team — iFranchise Leadership |
| **Meta description** | Meet the iFranchise team driving franchise innovation, partnerships, and growth across India. |
| **Keywords** | iFranchise team, franchise leadership |
| **OG title** | Meet the iFranchise Team |
| **OG description** | The people behind India's franchise growth platform. |

### Services — `/services`

| Field | Suggested value |
|-------|-----------------|
| **Title** | Franchise Services — Discovery, Expansion & Lead Generation \| iFranchise |
| **Meta description** | Franchise discovery, expansion consulting, investor matching, market research, and lead generation services for brands and investors. |
| **Keywords** | franchise services, franchise consulting, lead generation, investor matching |
| **OG title** | iFranchise Services |
| **OG description** | End-to-end franchise growth services for brands and investors. |

### Franchise Opportunities — `/franchise-opportunities`

| Field | Suggested value |
|-------|-----------------|
| **Title** | Browse Franchise Opportunities in India \| iFranchise |
| **Meta description** | Explore verified franchise opportunities across food, wellness, education, retail, and more. Compare investment, ROI, and expansion markets. |
| **Keywords** | franchise opportunities India, buy franchise, franchise investment |
| **OG title** | Franchise Opportunities — iFranchise |
| **OG description** | Find your next franchise investment with curated, verified opportunities. |

### Franchise Detail — `/franchise/{slug}` & `/franchise-details?id={id}`

| Field | Suggested value |
|-------|-----------------|
| **Title** | `{Brand Name} Franchise — Investment, ROI & Details \| iFranchise` |
| **Meta description** | `{Brand Name}` franchise opportunity: investment range, business model, locations, and ROI. Apply or inquire on iFranchise. |
| **Keywords** | `{brand name} franchise`, franchise investment, `{industry}` franchise India |
| **OG title** | `{Brand Name} — Franchise Opportunity` |
| **OG description** | Investment, model, and expansion details for `{Brand Name}` on iFranchise. |

### List Your Brand — `/list-your-brand`

| Field | Suggested value |
|-------|-----------------|
| **Title** | List Your Brand — Franchise Expansion & Lead Generation \| iFranchise |
| **Meta description** | Scale your franchise brand across India. List on iFranchise for investor matching, lead generation, and nationwide expansion support. |
| **Keywords** | list franchise brand, franchise expansion India, franchise lead generation |
| **OG title** | List Your Brand on iFranchise |
| **OG description** | Connect with qualified franchise investors and grow your brand. |

### Blog — `/blog`

| Field | Suggested value |
|-------|-----------------|
| **Title** | Franchise & Investment Insights — iFranchise Blog |
| **Meta description** | Expert guides on franchise investment, product growth, market trends, and industry reports for entrepreneurs and investors. |
| **Keywords** | franchise blog, investment guides, franchise news India |
| **OG title** | iFranchise Blog |
| **OG description** | Insights for franchise investors and brand owners. |

### Blog Post — `/blog/{slug}`

| Field | Suggested value |
|-------|-----------------|
| **Title** | `{Post Title} \| iFranchise Blog` |
| **Meta description** | `{Post excerpt}` (≤ 160 characters) |
| **Keywords** | `{category}`, franchise, investment, `{topic keywords from post}` |
| **OG title** | `{Post Title}` |
| **OG description** | `{Post excerpt}` |

### Careers — `/careers`

| Field | Suggested value |
|-------|-----------------|
| **Title** | Careers at iFranchise — Join Our Growth Team |
| **Meta description** | Open roles in design, growth, marketing, and sales. Build India's leading franchise platform with iFranchise. |
| **Keywords** | iFranchise careers, franchise jobs Bangalore, startup jobs India |
| **OG title** | Careers — iFranchise |
| **OG description** | We're hiring. Explore open roles and join our team. |

### Career Detail — `/careers/{roleId}`

| Field | Suggested value |
|-------|-----------------|
| **Title** | `{Role Title} — Careers \| iFranchise` |
| **Meta description** | Apply for `{Role Title}` at iFranchise. `{Location}` · `{Type}` · `{Salary range}`. |
| **Keywords** | `{role title} job`, iFranchise hiring, `{department}` jobs |
| **OG title** | `{Role Title} — iFranchise Careers` |
| **OG description** | Join iFranchise as `{Role Title}`. View responsibilities and apply. |

### Contact — `/contact`

| Field | Suggested value |
|-------|-----------------|
| **Title** | Contact iFranchise — Talk to Our Franchise Experts |
| **Meta description** | Get in touch with iFranchise for franchise investment, brand listing, partnerships, and support. We respond within 24 hours. |
| **Keywords** | contact iFranchise, franchise inquiry, franchise consultation |
| **OG title** | Contact iFranchise |
| **OG description** | Speak with our franchise growth team today. |

### Privacy Policy — `/privacy-policy`

| Field | Suggested value |
|-------|-----------------|
| **Title** | Privacy Policy \| iFranchise |
| **Meta description** | How iFranchise collects, uses, and protects your personal information. |
| **Keywords** | privacy policy, data protection |
| **OG title** | Privacy Policy — iFranchise |
| **OG description** | Your privacy matters. Read our policy. |

### Terms — `/terms-and-conditions`

| Field | Suggested value |
|-------|-----------------|
| **Title** | Terms & Conditions \| iFranchise |
| **Meta description** | Terms of service for using the iFranchise platform and services. |
| **Keywords** | terms of service, terms and conditions |
| **OG title** | Terms of Service — iFranchise |
| **OG description** | Platform terms and conditions. |

### Licenses — `/licenses`

| Field | Suggested value |
|-------|-----------------|
| **Title** | Licenses & Intellectual Property \| iFranchise |
| **Meta description** | Trademark, copyright, and third-party license information for the iFranchise marketplace. |
| **Keywords** | licenses, intellectual property, trademarks |
| **OG title** | Licenses — iFranchise |
| **OG description** | IP and licensing information. |

### 404 — Not Found

| Field | Suggested value |
|-------|-----------------|
| **Title** | Page Not Found \| iFranchise |
| **Meta description** | The page you're looking for doesn't exist. Return to iFranchise home or browse franchise opportunities. |
| **Robots** | `noindex, nofollow` |

---

## Appendix A — Page Component Map

| Internal key (`getPathname`) | URL(s) | Component file |
|------------------------------|--------|------------------|
| `/` | `/` | `src/components/Hero.jsx` |
| `/about` | `/about`, `/about-us` | `src/components/AboutPage.jsx` |
| `/team` | `/team`, `/meet-the-team` | `src/components/TeamPage.jsx` |
| `/services` | `/services` | `src/components/ServicesPage.jsx` |
| `/franchise-opportunities` | `/franchise-opportunities`, `/featured-opportunities`, `/opportunities` | `src/components/FranchiseOpportunitiesPage.jsx` |
| `/franchise-details` | `/franchise-details?id=*`, `/franchise/*`, `/franchise` | `src/components/FranchiseDetailsPage.jsx` |
| `/list-your-brand` | `/list-your-brand`, `/for-brand-owners`, `/brand-owners` | `src/components/ForBrandOwnersPage.jsx` |
| `/blog` | `/blog` | `src/components/BlogPage.jsx` |
| `/blog-detail` | `/blog/*` | `src/components/BlogDetailPage.jsx` |
| `/careers` | `/careers` | `src/components/CareersPage.jsx` |
| `/career-detail` | `/careers/*` | `src/components/CareerDetailPage.jsx` |
| `/contact` | `/contact`, `/contact-us` | `src/components/ContactPage.jsx` |
| `/privacy-policy` | `/privacy-policy` | `src/components/PrivacyPolicyPage.jsx` |
| `/terms-and-conditions` | `/terms-and-conditions`, `/terms` | `src/components/TermsConditionsPage.jsx` |
| `/licenses` | `/licenses` | `src/components/LicensesPage.jsx` |
| `/404` | Unknown paths | `src/components/NotFoundPage.jsx` |

---

## Appendix B — Suggested Sitemap Entries (for future `sitemap.xml`)

```
/ 
/about
/team
/services
/franchise-opportunities
/list-your-brand
/contact
/blog
/careers
/privacy-policy
/terms-and-conditions
/licenses
/careers/{each-role-id}
/blog/{each-slug}
/franchise-details?id={1-24}
/franchise/{each-registered-slug}
```

---

*This report is documentation-only. No application code or UI was modified during its generation.*
