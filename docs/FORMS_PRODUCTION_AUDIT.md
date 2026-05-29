# Forms Production Audit — iFranchise

**Date:** 2026-05-29  
**Hosting:** Vercel (`vercel.json`)  
**Live domain:** https://www.ifranchise.in

---

## Root cause

| Environment | Behavior |
|-------------|----------|
| **localhost** | `VITE_GOOGLE_APPS_SCRIPT_URL` loaded from `.env` → forms POST to Google Apps Script → rows appear in Sheets |
| **Production (before fix)** | `.env` is **not deployed** to Vercel → build had **empty endpoint** → requests never reached Apps Script. `no-cors` fallback could still show “success” in the UI without writing to Sheets |

**Primary fix:** Ensure the Apps Script URL is available at **build time** (Vercel env vars) and **runtime** (`public/forms-endpoint.json`), with startup validation and real CORS response handling.

---

## Forms verified (all use `runFormSubmission` → `submitToGoogleSheets`)

| Form | Submitter | Sheet tab |
|------|-----------|-----------|
| Contact Us | `submitContactForm` | `Contact_Leads` |
| Homepage contact modal | `submitContactForm` | `Contact_Leads` |
| List Your Brand | `submitBrandApplication` | `Brand_Applications` |
| Chatbot — Brand | `submitChatbotLead` | `Chatbot_Brands` |
| Chatbot — Investor | `submitChatbotLead` | `Chatbot_Investors` |
| Chatbot — Strategy call | `submitStrategyCall` | `Chatbot_Strategy` |
| Brochure download | `submitBrochureDownload` | `Brochure_Downloads` |
| Franchise inquiry | `submitFranchiseInquiry` | `Franchise_Inquiries` |
| **Careers** | — | **No form** (marketing page only) |

---

## Files changed

| File | Purpose |
|------|---------|
| `src/lib/forms/utils/formLogger.js` | Production-safe logging (no PII) |
| `src/lib/forms/formBootstrap.js` | Startup endpoint validation + `window.__IFR_FORM_HEALTH__` |
| `src/lib/forms/utils/resolveFormEndpoint.js` | Build env + `/forms-endpoint.json` fallback |
| `src/lib/forms/utils/googleSheetsClient.js` | CORS-only success path, structured errors |
| `src/lib/forms/utils/submitPipeline.js` | Pipeline logging |
| `src/lib/forms/FORM_REGISTRY.js` | Central registry for audits |
| `src/main.jsx` | Calls `bootstrapFormPipeline()` on load |
| `scripts/write-forms-endpoint.mjs` | Writes `public/forms-endpoint.json` at build |
| `scripts/assert-forms-env.mjs` | Fails build if endpoint missing |
| `package.json` | Build runs assert + write scripts |
| `public/forms-endpoint.json` | Runtime fallback URL on Vercel |
| `vercel.json` | Cache headers for `forms-endpoint.json` |
| `ENV_CONNECTION_GUIDE.md` | Vercel-specific instructions |

---

## Production checklist (Vercel)

1. **Environment variables** (Settings → Environment Variables → Production + Preview):
   - `VITE_GOOGLE_APPS_SCRIPT_URL` = your Apps Script **Web app** `/exec` URL  
   - `VITE_SITE_URL` = `https://www.ifranchise.in`  
   - `VITE_GA_MEASUREMENT_ID` = `G-SSHRXE8TFM`

2. **Redeploy** after saving variables.

3. **Google Apps Script**
   - Paste latest `google-apps-script-backend.js`
   - Deploy → **New deployment** → Web app  
   - Execute as: **Me**  
   - Who has access: **Anyone**  
   - Run `setupSheets()` once in the script editor if tabs are missing

4. **Verify live**
   - Open https://www.ifranchise.in/forms-endpoint.json → `url` must be your `/exec` URL  
   - In browser console: `window.__IFR_FORM_HEALTH__` → `ready: true`  
   - Submit Contact form → check `Contact_Leads` tab  
   - Console logs: `[iFranchise Forms] {"event":"submission_success",...}`

---

## Submission limits

- **No** frontend rate limits on total submissions  
- **Only** `submissionGuard.js` blocks duplicate **concurrent** submits (double-click); unlimited repeat submissions allowed  

---

## Adding a new form

1. Add `FORM_TYPES` + `SHEET_TABS` entry  
2. Create validator + transformer + `createFormSubmitter({...})`  
3. Register in `FORM_REGISTRY.js`  
4. Wire UI to the submitter (use `useFormSubmission` or `runFormSubmission`)  
5. Add sheet tab + headers in `google-apps-script-backend.js` and run `setupSheets()`

No changes to `googleSheetsClient.js` required.

---

## Production verification

After deploy:

- [ ] `forms-endpoint.json` returns valid URL  
- [ ] `__IFR_FORM_HEALTH__.ready === true`  
- [ ] Contact form row in `Contact_Leads`  
- [ ] List Your Brand row in `Brand_Applications`  
- [ ] Chatbot test row in `Chatbot_Brands` or `Chatbot_Investors`  
- [ ] Brochure / inquiry rows in respective tabs  

---

## Notes

- `netlify.toml` is **not used** on Vercel.  
- Do not commit `.env`; commit `public/forms-endpoint.json` only if it contains the production URL (optional backup).  
- Prefer Vercel env vars as the source of truth so URLs can rotate without code changes.
