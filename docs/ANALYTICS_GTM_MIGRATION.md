# Analytics migration — GTM-only architecture

**Date:** June 2026  
**GTM container:** `GTM-P6Z67GFD`  
**GA4 measurement ID (configure in GTM UI):** `G-SSHRXE8TFM`

## What was removed

| Removed from app code | Reason |
|----------------------|--------|
| `gtag('config', G-SSHRXE8TFM)` when GTM is present | GA4 config belongs in GTM only |
| `gtag('event', 'page_view')` when GTM is present | Duplicate of GTM-triggered GA4 hits |
| `initGA4()` / `__IFR_GA_READY__` bridge for production | No direct GA4 init when GTM loads |
| Second `dataLayer` push per navigation (gtag Arguments + plain object) | Single `page_view` object push only |
| Deferred `gtag/js` injection when GTM snippet exists | GTM is the only loader |

## What remains active

| Component | Role |
|-----------|------|
| `index.html` GTM head + noscript | Loads `gtm.js?id=GTM-P6Z67GFD` once |
| `src/lib/analytics/gtm.js` | `dataLayer`, deduped `trackPageView`, `trackEvent` |
| `src/lib/analytics/ga4.js` | Facade: GTM path in production; gtag fallback if GTM missing |
| `src/App.jsx` | `trackPageView({ logicalRoute })` on every SPA route |
| `src/main.jsx` | Idle `scheduleAnalytics()` → ensures `dataLayer` only |
| `VITE_GA_MEASUREMENT_ID` | Documented ID for GTM tag setup (not used for direct hits in prod) |

## GTM container setup (required)

In [Google Tag Manager](https://tagmanager.google.com) → **GTM-P6Z67GFD**:

1. **Tag:** Google Analytics: GA4 Configuration  
   - Measurement ID: `G-SSHRXE8TFM`  
   - Send a page view event when this configuration loads: **Off**

2. **Trigger:** Custom Event  
   - Event name: `page_view`

3. **Tag:** GA4 Event (or use Configuration tag fired on trigger above)  
   - Event name: `page_view`  
   - Map Data Layer Variables: `page_path`, `page_location`, `page_title`, `route_name`

4. **Do not add:** All Pages auto page_view + Custom Event `page_view` + History Change (pick one path).

5. **Publish** the container.

## Verification

```javascript
// After in-app navigation:
window.dataLayer.filter((e) => e && e.event === 'page_view').slice(-2)

// Should NOT see duplicate gtag page_view Arguments when GTM is installed:
window.dataLayer.filter((e) => e && e[0] === 'event' && e[1] === 'page_view')

// One gtm.js request:
[...document.querySelectorAll('script[src*="googletagmanager"]')].map((s) => s.src)
```

- GTM Preview: one GA4 hit per route change  
- GA4 Realtime / DebugView: one `page_view` per navigation  

## Fallback (dev only)

If `index.html` GTM snippet is removed, `ga4.js` loads deferred `gtag/js` and sends `page_view` directly. Production on Vercel always includes GTM.

## Unchanged systems

Forms, SEO, schema, Google Sheets, Resend lead notifications, and performance optimizations were not modified.
