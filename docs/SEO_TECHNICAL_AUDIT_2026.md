# Technical SEO Audit Report — iFranchise (July 2026)

## Stack note

This is a **Vite + React SPA**, not Next.js. SEO is implemented via:

1. Static `index.html` shell meta + JSON-LD  
2. Build-time `route-seo-boot.js` (per-path title/description/canonical/OG before React)  
3. Runtime `PageSEO` + JSON-LD `@graph` after hydration  

---

## Issues found & fixed

| Issue | Severity | Fix |
|-------|----------|-----|
| ~75 duplicate `<link rel="manifest">` tags in `index.html` | P0 | Kept single `manifest.webmanifest` link |
| Default OG image was 180×180 favicon | P0 | Switched to `/images/hero/home-hero-1280w.webp` (1280×720) + width/height/alt |
| Broken `SearchAction` (`?q=` not wired in UI) | P1 | Removed from WebSite schema (static + runtime) |
| Sitemap duplicate knowledge-hub URLs | P1 | Deduped by `loc` (3 duplicates removed → **69 unique URLs**) |
| `@type` arrays collapsed to first type only | P1 | `sanitizeSchemaNode` preserves multi-type arrays |
| Boot script missing robots / OG type / Twitter card / image dims | P1 | Expanded `generate-route-seo.mjs` boot meta |
| Missing LocalBusiness signals | P2 | Added `LocalBusiness` + `geo` + `priceRange` on Organization |
| GSC verification hook | P2 | Supports `VITE_GOOGLE_SITE_VERIFICATION` + HTML comment placeholder |

---

## Files changed

- `index.html` — manifest cleanup, OG/Twitter image meta, JSON-LD, GSC comment  
- `public/robots.txt` — reviewed (Allow `/`, Disallow `/404`, Sitemap)  
- `public/sitemap.xml` — regenerated (69 unique URLs)  
- `public/route-seo-boot.js` — regenerated  
- `scripts/generate-sitemap.mjs` — dedupe by loc  
- `scripts/generate-route-seo.mjs` — OG defaults + richer boot tags  
- `src/seo/config.js` — OG image path/dims/alt  
- `src/seo/applyHead.js` — OG image meta, GSC verification  
- `src/seo/resolvePageSeo.js` — image width/height/alt on SEO payload  
- `src/seo/schema/sanitize.js` — preserve `@type` arrays  
- `src/seo/schema/builders.js` — WebSite without SearchAction; LocalBusiness org  

---

## SEO improvements (current state)

### Technical
- ✓ `robots.txt` with sitemap pointer  
- ✓ `sitemap.xml` (69 unique URLs, priorities, changefreq)  
- ✓ Canonical URLs per route (aliases + Vercel 301s)  
- ✓ Unique titles (≤60) and descriptions (140–160) via `metaUtils`  
- ✓ Open Graph + Twitter Card with large image  
- ✓ Favicon set (≥48×48) + single web manifest + theme-color  
- ✓ `lang="en-IN"`, geo meta, llms.txt  

### Structured data (JSON-LD `@graph`)
- Organization + ProfessionalService + LocalBusiness  
- WebSite  
- WebPage / AboutPage / ContactPage  
- Service, CollectionPage, ItemList  
- FAQPage (where FAQs exist)  
- BreadcrumbList  
- Blog / BlogPosting  
- JobPosting  
- Franchise Offer / brand Organization  

### Indexability
- 404 / missing entities → `noindex`  
- No accidental global noindex  
- Canonicals prevent alias duplicates  

---

## Core Web Vitals (already in place + SEO-adjacent)

| Area | Status |
|------|--------|
| LCP | Static hero outside `#root`, WebP preload, deferred SEO boot |
| CLS | Sized favicons/images; hero width/height on static LCP img |
| INP | Code-split routes, deferred assistant |
| Caching | Vercel headers for sitemap/robots/assets |

**Remaining CWV recommendation:** add a dedicated **1200×630 JPG/PNG** OG share image (WebP works in many crawlers; Facebook historically prefers JPG).

---

## Remaining recommendations (not blocking)

1. **Prerender / SSR** for top marketing URLs — social crawlers that skip JS still see home meta until boot runs (boot helps Google; prerender helps Facebook/LinkedIn fully).  
2. **Edge 301** `/franchise-details?id=X` → `/franchise/{slug}` (today redirects to listing).  
3. **Content-aware `lastmod`** in sitemap (per blog/franchise update date).  
4. **Image sitemap** for franchise/blog assets.  
5. Wire real **site search** before re-adding `SearchAction`.  
6. Set `VITE_GOOGLE_SITE_VERIFICATION` (and Bing) in production env.  
7. Validate JSON-LD in [Google Rich Results Test](https://search.google.com/test/rich-results) after deploy.  
8. Submit sitemap in Google Search Console + Bing Webmaster Tools.  
9. Prefer JPG OG default if social previews fail on WebP.  
10. Ensure career `datePosted` / `validThrough` are real dates for JobPosting compliance.

---

## Google Search Console checklist

1. Verify property `https://www.ifranchise.in` (HTML tag via `VITE_GOOGLE_SITE_VERIFICATION` or DNS).  
2. Submit `https://www.ifranchise.in/sitemap.xml`.  
3. Inspect home + `/franchise-opportunities` + one franchise URL.  
4. Monitor Coverage / Experience / Enhancements (FAQ, Job postings).  

---

## Validation commands

```bash
npm run seo:sitemap
npm run seo:routes
npm run build
```

Then test live URLs with Rich Results Test and URL Inspection.
