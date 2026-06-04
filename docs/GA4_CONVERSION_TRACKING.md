# GA4 conversion tracking (GTM dataLayer)

All conversion events use `trackEvent()` from `src/lib/analytics/ga4.js`, which pushes to `window.dataLayer` when GTM (`GTM-P6Z67GFD`) is installed. Configure matching **Custom Event** triggers and **GA4 Event** tags in GTM, then mark events as conversions in GA4 Admin.

## Events

| Event name | When fired | Parameters |
|------------|------------|------------|
| `contact_form_submit` | Google Sheets submit success | `page_path`, `page_title`, `form_type`, `source_page` |
| `franchise_inquiry_submit` | Same | Same |
| `list_brand_submit` | Same | Same |
| `brochure_download` | Same | Same |
| `career_apply` | User clicks careers `mailto:hr@ifranchise.in` Apply link | `page_path`, `page_title`, `source_page`, `form_type` (`career_apply`), optional `role_id` |
| `whatsapp_click` | Click site WhatsApp link (`wa.me/91…`) | `page_path`, `page_title`, `source_page`, optional `link_location` |
| `phone_click` | Click site `tel:` link for main office number | Same |

`form_type` values for form submits: `contact`, `franchise_inquiry`, `brand_application`, `brochure_download`.

### `source_page` values (forms)

| source_page | Form |
|-------------|------|
| `contact_page` | Contact page |
| `homepage_contact` | Homepage contact modal |
| `list_your_brand_hero` | List Your Brand |
| `franchise_details_brochure` | Brochure modal |
| `franchise_details_inquiry` | Franchise inquiry modal |

Chatbot forms are **not** mapped to conversion events (unchanged Sheets behavior).

## Files changed

| File | Change |
|------|--------|
| `src/lib/analytics/conversionEvents.js` | **New** — event map, `trackFormConversion`, `trackConversionClick` |
| `src/lib/analytics/conversionClickTracking.js` | **New** — delegated WhatsApp / phone / career apply clicks |
| `src/lib/forms/utils/submitPipeline.js` | Call `trackFormConversion` after successful Sheets submit only |
| `src/lib/analytics/ga4.js` | Init click tracking from `scheduleAnalytics()` |
| `docs/GA4_CONVERSION_TRACKING.md` | This report |

## GTM setup (manual)

For each event name above:

1. Trigger: **Custom Event**, Event name = exact string (e.g. `contact_form_submit`).
2. Tag: **Google Analytics: GA4 Event**, Measurement ID `G-SSHRXE8TFM`, Event name = same as trigger.
3. In GA4: Admin → Events → Mark as conversion.
