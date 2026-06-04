# Conversion tracking audit — production readiness

**Audit date:** 2026-06-04  
**Property:** `G-SSHRXE8TFM` · **GTM:** `GTM-P6Z67GFD` · **Site:** https://www.ifranchise.in

---

## Executive summary

| Layer | Status | Notes |
|-------|--------|--------|
| Application code (repo) | **PASS** | All 7 events implemented; single pipeline; GTM-only `dataLayer` |
| Production deploy | **FAIL** | Live bundle does not contain conversion event strings |
| dataLayer (prod) | **NOT VERIFIED** | Blocked until deploy |
| GTM container | **NOT VERIFIED** | Requires your GTM UI / Preview |
| GA4 / DebugView | **NOT VERIFIED** | Requires GA4 access after GTM + deploy |
| Conversions marked | **NOT VERIFIED** | GA4 Admin only |
| Duplicate risk (code) | **LOW** | One push per success; page_view deduped |
| **Production-ready** | **NO** | Deploy code + publish GTM + run checklist below |

---

## 1. All 7 conversion events — code verification

| Event | Implemented | Fires when | Code path |
|-------|-------------|------------|-----------|
| `contact_form_submit` | Yes | Sheets success | `submitPipeline` → `trackFormConversion` (`form_type: contact`) |
| `franchise_inquiry_submit` | Yes | Sheets success | Same (`franchise_inquiry`) |
| `list_brand_submit` | Yes | Sheets success | Same (`brand_application`) |
| `brochure_download` | Yes | Sheets success | Same (`brochure_download`) |
| `whatsapp_click` | Yes | Click office `wa.me/91…` | `conversionClickTracking.js` |
| `phone_click` | Yes | Click office `tel:+91…` | Same |
| `career_apply` | Yes | Click `mailto:hr@ifranchise.in` | Same |

**Parameters pushed:** `page_path`, `page_title`, `source_page`, `form_type` (forms + career_apply); optional `link_location`, `role_id`.

**Not conversion-mapped (by design):** chatbot forms (`chatbot_brand`, `chatbot_investor`, `chatbot_strategy`).

---

## 2. Events reach dataLayer

**Repo / local build:** PASS — `trackEvent()` → `pushToDataLayer({ event, ...params })` in `gtm.js` when GTM snippet present.

**Production (2026-06-04 check):** FAIL — fetched `https://www.ifranchise.in/assets/index-DHvdkp7Q.js`; strings `contact_form_submit`, `whatsapp_click`, etc. **not present**. GTM + `page_view` + `dataLayer` are present.

**After deploy, verify:**

```javascript
// After each test action:
dataLayer.filter(e => e?.event === 'contact_form_submit')  // etc.
```

---

## 3. Events reach GTM

**Cannot confirm from codebase.** Requires:

- GTM published with 7 Custom Event triggers + 7 GA4 Event tags (see `docs/GTM_CONVERSION_SETUP.md`)
- GTM Preview: each action shows tag **Fired**

**Blockers if missing:** typo in trigger name, unpublished workspace, wrong Measurement ID.

---

## 4. Events reach GA4

**Cannot confirm without GA4 access.** After GTM is correct and site is deployed:

- **DebugView** — events with parameters within ~30s of test
- **Realtime** — event count by name
- Network tab — `google-analytics.com/g/collect` (or Google signals) on tag fire

---

## 5. Duplicate events

| Scenario | Risk | Mitigation in code |
|----------|------|---------------------|
| Double form submit (rapid click) | Low | `submissionGuard.js` — single in-flight promise per `formType:sourcePage` |
| Form success fired twice | Low | Only one `trackFormConversion` in `submitPipeline` on `result.success` |
| Failed validation / Sheets error | None | No conversion push |
| SPA `page_view` | Low | Deduped by `lastPageKey` in `gtm.js` |
| Double link click | Medium | No click dedup — two clicks = two events (expected) |
| GTM double tags | High if misconfigured | Use one GA4 Event tag per event; avoid duplicate triggers |
| Early click before init | Low | Click listener loads via `scheduleAnalytics` idle — clicks in first ~2–5s may be missed |

**No duplicate `trackEvent` call sites** outside `conversionEvents.js`.

---

## 6. GA4 DebugView

**Status: NOT VERIFIED** (no access to your GA4 property).

**Steps after deploy:**

1. Enable debug: GTM Preview and/or [GA Debugger extension](https://chrome.google.com/webstore/detail/google-analytics-debugger)
2. GA4 → Admin → **DebugView**
3. Run all 7 test actions on https://www.ifranchise.in
4. Confirm each event + parameters

---

## 7. Marked as conversions in GA4

**Status: NOT VERIFIED** (Admin-only).

**Required:** Admin → Data display → Events → **Mark as conversion** for all 7 names (or Conversions → New conversion event).

Events must receive at least one hit before they appear (DebugView is fastest).

---

## 8. GTM Preview — all events

**Status: NOT VERIFIED** (requires your GTM login).

| # | Test action | Expected dataLayer `event` | Expected tag |
|---|-------------|---------------------------|--------------|
| 1 | Submit contact form (success) | `contact_form_submit` | `GA4 - contact_form_submit` |
| 2 | Submit franchise inquiry modal | `franchise_inquiry_submit` | `GA4 - franchise_inquiry_submit` |
| 3 | Submit List Your Brand | `list_brand_submit` | `GA4 - list_brand_submit` |
| 4 | Submit brochure modal | `brochure_download` | `GA4 - brochure_download` |
| 5 | Click WhatsApp CTA | `whatsapp_click` | `GA4 - whatsapp_click` |
| 6 | Click Call us (`tel:`) | `phone_click` | `GA4 - phone_click` |
| 7 | Click careers Apply mailto | `career_apply` | `GA4 - career_apply` |

---

## Production readiness checklist

### Phase A — Code & deploy (blocking)

- [ ] Commit & push conversion files (`conversionEvents.js`, `conversionClickTracking.js`, `submitPipeline.js`, `ga4.js`)
- [ ] Deploy to Vercel production
- [ ] Confirm new JS bundle contains `contact_form_submit` (View Source → main JS hash changed; search bundle)

### Phase B — GTM (blocking)

- [ ] Create 6 DLV variables (see `docs/GTM_CONVERSION_SETUP.md`)
- [ ] Duplicate workflow: 7 triggers + 7 GA4 Event tags
- [ ] **Publish** container

### Phase C — Validation (blocking)

- [ ] GTM Preview: 7/7 tags fire, one fire per action
- [ ] dataLayer shows correct parameters
- [ ] GA4 DebugView: 7/7 events
- [ ] No duplicate fires per single action
- [ ] Mark all 7 as conversions in GA4

### Phase D — Optional hardening

- [ ] Init click tracking earlier (if first-second clicks matter)
- [ ] GA4 Exploration: conversions by `source_page`

---

## Verdict

**Not production-ready today** for end-to-end conversion measurement. Application implementation is complete and correct in the repository, but **production does not serve that code yet**, and **GTM/GA4 configuration cannot be validated from the repo alone**.

**Minimum path to green:**

1. Deploy latest code to www.ifranchise.in  
2. Publish GTM conversion tags (duplicate setup ~15 min)  
3. Run GTM Preview + DebugView checklist (30 min)  
4. Mark 7 events as conversions in GA4  
