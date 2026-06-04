# Google Tag Manager — iFranchise (GTM-only)

**Container ID:** `GTM-P6Z67GFD`  
**GA4 property (configure in GTM only):** `G-SSHRXE8TFM`  
**Site:** https://www.ifranchise.in

## Architecture

| Layer | Responsibility |
|-------|----------------|
| `index.html` | Official GTM snippet (loads once) |
| `gtm.js` | `dataLayer` + deduped SPA `page_view` pushes |
| `ga4.js` | Thin facade; **no direct GA4 hits when GTM is present** |
| GTM UI | GA4 Configuration + tags/triggers for `G-SSHRXE8TFM` |

Application code does **not** load `gtag/js` or send GA4 `page_view` when GTM is installed.

## GTM container setup

1. Open [tagmanager.google.com](https://tagmanager.google.com) → **GTM-P6Z67GFD**.
2. Create **GA4 Configuration** tag → Measurement ID `G-SSHRXE8TFM`.
3. Disable automatic page view on that tag (SPA handled by custom event).
4. Create **Trigger:** Custom Event → Event name equals `page_view`.
5. Fire GA4 Event (or Configuration) on that trigger; map `page_path`, `page_location`, `page_title`, `route_name` from Data Layer.
6. **Publish** after Preview testing.

See `docs/ANALYTICS_GTM_MIGRATION.md` for removed vs active code.

## Verification checklist

- [ ] View source: `GTM-P6Z67GFD` in `<head>` and noscript after `<body>`
- [ ] `window.dataLayer` is an array
- [ ] One `gtm.js?id=GTM-P6Z67GFD` in Network tab
- [ ] No `gtag/js?id=G-SSHRXE8TFM` in Network when GTM is present
- [ ] SPA routes push one `{ event: 'page_view', ... }` per navigation
- [ ] GTM Preview: one GA4 tag fire per route change
- [ ] GA4 Realtime shows traffic with measurement ID `G-SSHRXE8TFM`

```javascript
window.dataLayer.filter((e) => e && e.event === 'page_view').slice(-3)
```

## Env vars (optional)

- `VITE_GTM_CONTAINER_ID=GTM-P6Z67GFD` (default in code)
- `VITE_GA_MEASUREMENT_ID=G-SSHRXE8TFM` (reference for GTM tag; not used for direct page_view in prod)
