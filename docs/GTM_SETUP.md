# Google Tag Manager — iFranchise

**Container ID:** `GTM-P6Z67GFD`  
**Site:** https://www.ifranchise.in

## Implementation

| Piece | Location |
|-------|----------|
| GTM `<head>` snippet | `index.html` (first scripts in `<head>`) |
| GTM `<noscript>` iframe | `index.html` (immediately after `<body>`) |
| SPA page views | `src/lib/analytics/gtm.js` + `trackPageView()` in `ga4.js` |
| No duplicate gtag load | `src/lib/scheduleAnalytics.js` skips direct `gtag/js` when GTM is present |
| Route changes | `src/App.jsx` → `trackPageView({ logicalRoute })` on every pathname change |

## GTM container setup (Tag Manager UI)

1. In [tagmanager.google.com](https://tagmanager.google.com), open container **GTM-P6Z67GFD**.
2. Add a **Google Analytics: GA4 Configuration** tag with measurement ID `G-SSHRXE8TFM`.
3. Trigger: **All Pages** (initial load) and/or a **Custom Event** trigger for event name `page_view` (SPA).
4. Disable duplicate GA4 tags if you also load gtag elsewhere.
5. **Publish** the container after testing in Preview mode.

## Verification checklist

### Source code (after deploy)

- [ ] View page source on https://www.ifranchise.in
- [ ] Find `GTM-P6Z67GFD` in `<head>` GTM script
- [ ] Find `googletagmanager.com/ns.html?id=GTM-P6Z67GFD` in `<noscript>` after `<body>`

### Browser DevTools (any page)

- [ ] Console: `window.dataLayer` is an array with length ≥ 1
- [ ] Console: `window.__IFR_GTM_CONTAINER__` → `"GTM-P6Z67GFD"`
- [ ] Network tab: request to `googletagmanager.com/gtm.js?id=GTM-P6Z67GFD` (once)
- [ ] No second duplicate `gtm.js` or duplicate `gtag/js` unless configured only in GTM

### SPA routes (navigate in-site, watch dataLayer)

- [ ] Home `/`
- [ ] About `/about-us`
- [ ] Services `/services`
- [ ] Franchise Opportunities `/franchise-opportunities`
- [ ] Franchise detail `/franchise/{slug}`
- [ ] List Your Brand `/list-your-brand`
- [ ] Contact `/contact-us`
- [ ] Careers `/careers` and job detail `/careers/{id}`
- [ ] Blogs `/blogs` and post `/blogs/{slug}`

For each route change, run in console:

```js
window.dataLayer.filter((e) => e.event === 'page_view').slice(-3)
```

You should see `page_path`, `page_location`, `page_title`, and `route_name`.

### GTM Preview / Tag Assistant

- [ ] GTM → **Preview** → connect to www.ifranchise.in
- [ ] Tags fire on load and on internal navigation
- [ ] GA4 receives page views (if GA4 tag is configured in GTM)

### Existing GA4

- [ ] `VITE_GA_MEASUREMENT_ID=G-SSHRXE8TFM` set on Vercel
- [ ] GA4 Realtime still shows traffic after deploy
- [ ] Prefer **one** GA4 path: either GTM-only or confirm no double page_view in GA4 DebugView

## Deployment

1. Commit and push to `main` (Vercel auto-deploy).
2. Optional env on Vercel: `VITE_GTM_CONTAINER_ID=GTM-P6Z67GFD` (defaults in code if omitted).
3. Publish GTM container in Tag Manager after code is live.
4. Re-test with Tag Assistant and GA4 Realtime.

## Duplicate prevention

- GTM loads **once** from `index.html` only.
- `scheduleAnalytics.js` does **not** inject a second `gtag/js` when GTM is installed.
- `trackPageView` dedupes by `pathname + search` for both GTM dataLayer and GA4 gtag events.
