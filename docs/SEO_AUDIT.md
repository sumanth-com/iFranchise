# iFranchise SEO Audit & Implementation

Last updated: June 2026

## Summary

Full-stack SEO is implemented via `PageSEO` (meta + JSON-LD), build-time `sitemap.xml`, `robots.txt`, `public/llms.txt` (AI crawlers), and component-level image alt text. No form, routing, or analytics behavior was changed.

---

## 1. Schema markup (JSON-LD)

| Scope | Types |
|-------|--------|
| **Global (all pages)** | `Organization`, `WebSite` |
| **Home** | + `BreadcrumbList`, `FAQPage` |
| **About** | + `AboutPage`, `BreadcrumbList` |
| **Services** | + `Service` (×6), `FAQPage`, `BreadcrumbList` |
| **Franchise listing** | + `CollectionPage`, `ItemList`, `BreadcrumbList` |
| **Franchise detail** | + `Organization` (brand), `Offer`, `FAQPage` (if FAQs exist), `BreadcrumbList` |
| **List your brand** | + `Service`, `ContactPage`, `FAQPage`, `BreadcrumbList` |
| **Contact** | + `ContactPage`, `FAQPage`, `BreadcrumbList` |
| **FAQ** | + `FAQPage`, `BreadcrumbList` |
| **Blogs** | + `Blog`, `BreadcrumbList` |
| **Blog post** | + `BlogPosting` + `Article`, `BreadcrumbList` |
| **Careers** | + `CollectionPage`, `ItemList`, `FAQPage`, `BreadcrumbList` |
| **Job detail** | + `JobPosting`, `BreadcrumbList` |

**Code:** `src/seo/schema/*`, injected by `src/components/seo/PageSEO.jsx`  
**Static fallback:** `index.html` (Organization + WebSite before JS loads)

**Validate:** [Rich Results Test](https://search.google.com/test/rich-results) · [Schema Validator](https://validator.schema.org/)

---

## 2. Meta SEO

| Requirement | Status |
|-------------|--------|
| Unique title per route | ✅ `staticPages.js` + dynamic resolvers |
| Unique meta description | ✅ 140–160 char targeting via `metaUtils.js` |
| Canonical URL | ✅ `resolvePageSeo.js` + `vercel.json` redirects |
| Open Graph | ✅ `applyHead.js` |
| Twitter Cards | ✅ + `twitter:site` |
| Title ≤60 chars | ✅ `formatTitle()` |
| Description 140–160 | ✅ `formatDescription()` |
| Keywords | ✅ `keywords.js` |

---

## 3. Image SEO

| Item | Status |
|------|--------|
| Descriptive **alt** on key UI images | ✅ Navbar, franchise pages, blog, careers, cards |
| **title** on select hero/marketing images | ✅ Partial (about, blog, careers, cards) |
| width/height on key images | ✅ Existing on many components |
| lazy loading | ✅ Existing on below-fold images |
| **File renames** (image1.webp → semantic names) | ⚠️ Not bulk-renamed — would break Vite imports; use alt text + future asset migration |

**Helpers:** `src/seo/imageAlt.js`

---

## 4. Keyword strategy

Primary and secondary keyword lists live in `src/seo/keywords.js` and are woven into:

- Static page `keywords` meta tags
- Title/description copy (natural phrasing)
- Franchise/blog/career dynamic metadata

---

## 5. Technical SEO

| Item | Status |
|------|--------|
| `sitemap.xml` | ✅ Build script — main, franchise, blog, **career** URLs |
| `robots.txt` | ✅ Allows `/`, disallows `/404`, sitemap link |
| Canonical URLs | ✅ Per route + alias redirects in `vercel.json` |
| Duplicate URLs | ✅ Aliases redirect to canonical paths |
| Single H1 per page | ✅ Main templates use one primary H1 |
| Heading hierarchy | ✅ Section headings use H2+ |

---

## 6. Performance SEO

| Area | Notes |
|------|--------|
| LCP | Static hero preload in `index.html`; WebP heroes |
| Code splitting | Vite route-based chunks (unchanged) |
| Images | WebP where generated; `loading="lazy"` on non-LCP |
| CSS | Theme split; mobile-responsive deferred |

**Target:** Desktop 90+ / Mobile 85+ — run Lighthouse after deploy for baseline.

**Not changed in this pass:** Removing unused CSS/JS bundles (requires bundle analyzer pass).

---

## 7. AI SEO

| Item | Status |
|------|--------|
| `public/llms.txt` | ✅ Site summary for AI crawlers |
| FAQ structured content | ✅ FAQPage schema + visible FAQs |
| Entity-rich Organization schema | ✅ Name, email, address, sameAs |
| Clear page purpose in meta | ✅ Updated descriptions |

---

## Files modified (this implementation)

- `src/seo/keywords.js` (new)
- `src/seo/metaUtils.js` (new)
- `src/seo/imageAlt.js` (new)
- `src/seo/staticPages.js`
- `src/seo/resolvePageSeo.js`
- `src/seo/applyHead.js`
- `src/seo/index.js`
- `public/llms.txt` (new)
- `scripts/generate-sitemap.mjs`
- `index.html`
- `src/components/Navbar.jsx`
- `src/components/FranchiseDetailsPage.jsx`
- `src/components/AboutPage.jsx`
- `src/components/BlogPage.jsx`
- `src/components/CareersPage.jsx`
- `src/components/OpportunityCard.jsx`
- `src/components/NotFoundPage.jsx`
- `src/components/PreFooterCTA.jsx`
- `docs/SEO_AUDIT.md` (this file)

Schema modules (prior work): `src/seo/schema/*`, `src/data/faqContent.js`

---

## After deploy — validation checklist

1. **Deploy** to Vercel (production).
2. **Sitemap:** open `https://www.ifranchise.in/sitemap.xml` — confirm URL count.
3. **robots.txt:** `https://www.ifranchise.in/robots.txt`
4. **llms.txt:** `https://www.ifranchise.in/llms.txt`
5. **Per-page schema:** DevTools → search `application/ld+json` on 3–5 URLs.
6. **Rich Results Test:** home, one franchise, one blog, one career job.
7. **Google Search Console:** submit sitemap.
8. **Lighthouse:** home, franchise listing, one detail page (mobile + desktop).

---

## Remaining recommendations

1. **Rename asset files** in `src/assets/` to semantic names during a dedicated asset migration (update imports + sitemap images).
2. Add **`dateModified`** per blog post in `blogData.js`.
3. Add explicit **`datePosted` / `validThrough`** on each role in `careersData.jsx`.
4. **SSR or prerender** for JSON-LD in raw HTML on all routes (optional; Google renders JS).
5. **AggregateRating** schema only if reviews are officially verified for rich results policy.
6. Run **Lighthouse CI** in GitHub Actions for regression tracking.
7. Submit **`llms.txt`** URL to Bing Webmaster / monitor AI referral traffic.

---

## Lighthouse impact summary

This pass focuses on **metadata, schema, sitemap, and alt text** — negligible runtime cost. No new blocking scripts. Expected Lighthouse impact: **neutral to slightly positive** (better crawlability; no heavy additions). Run post-deploy benchmarks to confirm 90+/85+ targets.
