# GTM conversion setup guide — iFranchise

**Container:** `GTM-P6Z67GFD`  
**GA4 Measurement ID:** `G-SSHRXE8TFM`  
**Site:** https://www.ifranchise.in

The website pushes conversion events to `window.dataLayer` with `event` set to the names below. GTM must listen with **Custom Event** triggers and forward them to GA4 with **GA4 Event** tags.

---

## Before you start (one-time)

### A. Confirm GA4 Configuration tag exists

1. Open [Google Tag Manager](https://tagmanager.google.com) → container **GTM-P6Z67GFD**.
2. **Tags** → you should already have a **Google Analytics: GA4 Configuration** tag with Measurement ID `G-SSHRXE8TFM`.
3. If missing: **New** → **Google Analytics: GA4 Configuration** → Measurement ID `G-SSHRXE8TFM` → Trigger **All Pages** → Save.

**Screenshot reference:** Tag list showing a tag type “Google Analytics: GA4 Configuration” with ID `G-SSHRXE8TFM`.

### B. Create Data Layer Variables (reuse for all 7 events)

**Variables** → **New** → **Data Layer Variable** for each row:

| Variable name (GTM) | Data Layer Variable Name | Type |
|---------------------|--------------------------|------|
| `DLV - page_path` | `page_path` | Data Layer Variable |
| `DLV - page_title` | `page_title` | Data Layer Variable |
| `DLV - form_type` | `form_type` | Data Layer Variable |
| `DLV - source_page` | `source_page` | Data Layer Variable |
| `DLV - role_id` | `role_id` | Data Layer Variable |
| `DLV - link_location` | `link_location` | Data Layer Variable |

Leave **Data Layer Version** as Version 2. No default value required.

**Screenshot reference:** Variable configuration panel with “Data Layer Variable Name” = `page_path`.

### C. Tag template you will duplicate

For every conversion below you will create:

- **Trigger:** Custom Event (unique event name per conversion)
- **Tag:** Google Analytics: GA4 Event

**Publish** only after Preview testing all events you care about.

---

## Event 1: `contact_form_submit`

### What the site sends

```javascript
{
  event: 'contact_form_submit',
  page_path: '/contact',           // example
  page_title: 'Contact | iFranchise',
  form_type: 'contact',
  source_page: 'contact_page'     // or 'homepage_contact'
}
```

**When it fires:** After a successful Google Sheets submit on Contact page or homepage contact modal.

---

### 1. GTM Trigger

| Field | Value |
|-------|--------|
| **Trigger type** | Custom Event |
| **Event name** | `contact_form_submit` |
| **This trigger fires on** | All Custom Events |
| **Trigger name** | `CE - contact_form_submit` |

**Steps:** Triggers → New → Custom Event → fill table → Save.

**Screenshot reference:** Custom Event trigger with “Event name” field exactly `contact_form_submit`.

---

### 2. GTM Tag

| Field | Value |
|-------|--------|
| **Tag type** | Google Analytics: GA4 Event |
| **Configuration Tag** | Your existing GA4 Configuration (`G-SSHRXE8TFM`) |
| **Event Name** | `contact_form_submit` |
| **Trigger** | `CE - contact_form_submit` |
| **Tag name** | `GA4 - contact_form_submit` |

**Event Parameters** (Add parameter → pick variable):

| Parameter name | Value |
|----------------|--------|
| `page_path` | `{{DLV - page_path}}` |
| `page_title` | `{{DLV - page_title}}` |
| `form_type` | `{{DLV - form_type}}` |
| `source_page` | `{{DLV - source_page}}` |

**Screenshot reference:** GA4 Event tag “Event Parameters” section with four rows mapped to Data Layer Variables.

---

### 3. GA4 Event Name

`contact_form_submit` (same as dataLayer `event` and GTM tag Event Name).

---

### 4. Parameters to pass

| GA4 parameter | Source | Example values |
|---------------|--------|------------------|
| `page_path` | dataLayer | `/contact`, `/` |
| `page_title` | dataLayer | document title |
| `form_type` | dataLayer | `contact` |
| `source_page` | dataLayer | `contact_page`, `homepage_contact` |

---

### 5. Test in GTM Preview

1. GTM → **Preview** → connect to `https://www.ifranchise.in` (or your Vercel preview URL with GTM snippet).
2. Go to **/contact** (or homepage → open contact modal).
3. Submit the form with valid test data (must succeed — success UI appears).
4. In Tag Assistant:
   - **Data Layer** tab → find object with `"event": "contact_form_submit"`.
   - **Tags** tab → `GA4 - contact_form_submit` should show **Tags Fired**.
5. Optional console check on site:

```javascript
dataLayer.filter(e => e?.event === 'contact_form_submit')
```

**Screenshot reference:** Tag Assistant left panel “Summary” with your GA4 event tag listed under “Tags Fired” after form success.

---

### 6. Mark as conversion in GA4

1. [analytics.google.com](https://analytics.google.com) → property **G-SSHRXE8TFM**.
2. **Admin** (gear) → **Data display** → **Events**.
3. Wait until `contact_form_submit` appears (after a real hit, often within minutes in DebugView / up to 24h in Events list).
4. Toggle **Mark as conversion** ON for `contact_form_submit`.

**Alternative:** **Admin** → **Data display** → **Conversions** → **New conversion event** → enter `contact_form_submit`.

**Screenshot reference:** Events table with star/toggle “Mark as conversion” enabled for `contact_form_submit`.

---

## Event 2: `franchise_inquiry_submit`

### What the site sends

```javascript
{
  event: 'franchise_inquiry_submit',
  page_path: '/franchise-details/odette',  // example
  page_title: '...',
  form_type: 'franchise_inquiry',
  source_page: 'franchise_details_inquiry'
}
```

**When it fires:** Franchise inquiry modal submits successfully (any franchise detail page).

---

### 1. GTM Trigger

| Field | Value |
|-------|--------|
| **Trigger type** | Custom Event |
| **Event name** | `franchise_inquiry_submit` |
| **Trigger name** | `CE - franchise_inquiry_submit` |

---

### 2. GTM Tag

| Field | Value |
|-------|--------|
| **Tag type** | Google Analytics: GA4 Event |
| **Event Name** | `franchise_inquiry_submit` |
| **Trigger** | `CE - franchise_inquiry_submit` |
| **Tag name** | `GA4 - franchise_inquiry_submit` |

**Event Parameters:** same four as Event 1 (`page_path`, `page_title`, `form_type`, `source_page`).

---

### 3. GA4 Event Name

`franchise_inquiry_submit`

---

### 4. Parameters to pass

| Parameter | Example |
|-----------|---------|
| `page_path` | `/franchise-details/{slug}` |
| `page_title` | Franchise page title |
| `form_type` | `franchise_inquiry` |
| `source_page` | `franchise_details_inquiry` |

---

### 5. Test in GTM Preview

1. Preview → open any franchise detail page with inquiry CTA.
2. Open inquiry modal → complete and submit → wait for success state.
3. Confirm dataLayer `franchise_inquiry_submit` and tag **GA4 - franchise_inquiry_submit** fired.

---

### 6. Mark as conversion in GA4

**Admin** → **Events** → enable **Mark as conversion** for `franchise_inquiry_submit`.

---

## Event 3: `list_brand_submit`

### What the site sends

```javascript
{
  event: 'list_brand_submit',
  page_path: '/list-your-brand',
  page_title: '...',
  form_type: 'brand_application',
  source_page: 'list_your_brand_hero'
}
```

**When it fires:** List Your Brand form on `/list-your-brand` submits successfully.

---

### 1. GTM Trigger

| Field | Value |
|-------|--------|
| **Event name** | `list_brand_submit` |
| **Trigger name** | `CE - list_brand_submit` |

---

### 2. GTM Tag

| Field | Value |
|-------|--------|
| **Event Name** | `list_brand_submit` |
| **Tag name** | `GA4 - list_brand_submit` |
| **Trigger** | `CE - list_brand_submit` |

**Event Parameters:** `page_path`, `page_title`, `form_type`, `source_page`.

---

### 3. GA4 Event Name

`list_brand_submit`

---

### 4. Parameters to pass

| Parameter | Example |
|-----------|---------|
| `form_type` | `brand_application` |
| `source_page` | `list_your_brand_hero` |

---

### 5. Test in GTM Preview

1. Go to **/list-your-brand**.
2. Submit the hero/application form successfully.
3. Verify dataLayer + tag fire.

---

### 6. Mark as conversion in GA4

Mark `list_brand_submit` as conversion in **Admin** → **Events**.

---

## Event 4: `brochure_download`

### What the site sends

```javascript
{
  event: 'brochure_download',
  page_path: '/franchise-details/kasturi',  // example
  page_title: '...',
  form_type: 'brochure_download',
  source_page: 'franchise_details_brochure'
}
```

**When it fires:** Brochure download modal form succeeds (brand must have a PDF).

---

### 1. GTM Trigger

| Field | Value |
|-------|--------|
| **Event name** | `brochure_download` |
| **Trigger name** | `CE - brochure_download` |

---

### 2. GTM Tag

| Field | Value |
|-------|--------|
| **Event Name** | `brochure_download` |
| **Tag name** | `GA4 - brochure_download` |
| **Trigger** | `CE - brochure_download` |

**Event Parameters:** `page_path`, `page_title`, `form_type`, `source_page`.

---

### 3. GA4 Event Name

`brochure_download`

---

### 4. Parameters to pass

| Parameter | Example |
|-----------|---------|
| `form_type` | `brochure_download` |
| `source_page` | `franchise_details_brochure` |

---

### 5. Test in GTM Preview

1. Open a franchise with brochure (e.g. Kasturi).
2. Click download brochure → fill modal → submit.
3. Confirm `brochure_download` in dataLayer and tag fired.

---

### 6. Mark as conversion in GA4

Mark `brochure_download` as conversion.

---

## Event 5: `whatsapp_click`

### What the site sends

```javascript
{
  event: 'whatsapp_click',
  page_path: '/franchise-details/...',
  page_title: '...',
  source_page: '/franchise-details/...',  // pathname when clicked
  link_location: 'franchise-inquiry-rail__whatsapp'  // optional, first CSS class
}
```

**When it fires:** User clicks site WhatsApp link (`https://wa.me/91…` for office number). Not blog share buttons.

**Where to click:** Franchise inquiry rail/modal WhatsApp CTA, or any link using `SITE_CONTACT_WHATSAPP_URL`.

---

### 1. GTM Trigger

| Field | Value |
|-------|--------|
| **Event name** | `whatsapp_click` |
| **Trigger name** | `CE - whatsapp_click` |

---

### 2. GTM Tag

| Field | Value |
|-------|--------|
| **Event Name** | `whatsapp_click` |
| **Tag name** | `GA4 - whatsapp_click` |
| **Trigger** | `CE - whatsapp_click` |

**Event Parameters:**

| Parameter name | Value |
|----------------|--------|
| `page_path` | `{{DLV - page_path}}` |
| `page_title` | `{{DLV - page_title}}` |
| `source_page` | `{{DLV - source_page}}` |
| `link_location` | `{{DLV - link_location}}` (optional; may be empty) |

---

### 3. GA4 Event Name

`whatsapp_click`

---

### 4. Parameters to pass

| Parameter | Notes |
|-----------|--------|
| `page_path` | Full path + query at click time |
| `page_title` | Document title |
| `source_page` | Pathname (e.g. `/contact`) |
| `link_location` | First CSS class on `<a>` if present |

---

### 5. Test in GTM Preview

1. Preview site → open page with WhatsApp button (franchise inquiry UI).
2. Click WhatsApp (new tab may open — tag should still fire on click).
3. dataLayer shows `whatsapp_click`; tag fires once per click.

---

### 6. Mark as conversion in GA4

Mark `whatsapp_click` as conversion.

---

## Event 6: `phone_click`

### What the site sends

```javascript
{
  event: 'phone_click',
  page_path: '/contact',
  page_title: '...',
  source_page: '/contact',
  link_location: '...'  // optional
}
```

**When it fires:** Click `tel:+91…` for main office number (`9129130303`).

**Where to click:** Contact page “Call us”, legal footer phone, homepage contact items, etc.

---

### 1. GTM Trigger

| Field | Value |
|-------|--------|
| **Event name** | `phone_click` |
| **Trigger name** | `CE - phone_click` |

---

### 2. GTM Tag

| Field | Value |
|-------|--------|
| **Event Name** | `phone_click` |
| **Tag name** | `GA4 - phone_click` |
| **Trigger** | `CE - phone_click` |

**Event Parameters:** `page_path`, `page_title`, `source_page`, `link_location` (optional).

---

### 3. GA4 Event Name

`phone_click`

---

### 4. Parameters to pass

Same structure as `whatsapp_click` (no `form_type`).

---

### 5. Test in GTM Preview

1. Go to **/contact**.
2. Click **Call us** `tel:` link.
3. Confirm `phone_click` in dataLayer and tag fired.

---

### 6. Mark as conversion in GA4

Mark `phone_click` as conversion.

---

## Event 7: `career_apply`

### What the site sends

```javascript
{
  event: 'career_apply',
  page_path: '/careers/social-media-intern',  // example
  page_title: '...',
  source_page: '/careers/social-media-intern',
  form_type: 'career_apply',
  role_id: 'social-media-intern'  // only on role detail URL
}
```

**When it fires:** User clicks **Apply** / **Email hr@ifranchise.in** mailto on careers pages.

---

### 1. GTM Trigger

| Field | Value |
|-------|--------|
| **Event name** | `career_apply` |
| **Trigger name** | `CE - career_apply` |

---

### 2. GTM Tag

| Field | Value |
|-------|--------|
| **Event Name** | `career_apply` |
| **Tag name** | `GA4 - career_apply` |
| **Trigger** | `CE - career_apply` |

**Event Parameters:**

| Parameter name | Value |
|----------------|--------|
| `page_path` | `{{DLV - page_path}}` |
| `page_title` | `{{DLV - page_title}}` |
| `source_page` | `{{DLV - source_page}}` |
| `form_type` | `{{DLV - form_type}}` |
| `role_id` | `{{DLV - role_id}}` |

---

### 3. GA4 Event Name

`career_apply`

---

### 4. Parameters to pass

| Parameter | Example |
|-----------|---------|
| `form_type` | `career_apply` |
| `role_id` | slug from `/careers/{slug}` or undefined on list page |
| `source_page` | `/careers` or `/careers/{slug}` |

---

### 5. Test in GTM Preview

1. Go to **/careers** (with active roles) or a role detail URL.
2. Click **Apply** mailto link.
3. Confirm `career_apply` in dataLayer; on detail page check `role_id` is populated.

---

### 6. Mark as conversion in GA4

Mark `career_apply` as conversion.

---

## After setup: publish and verify

### Publish GTM

1. **Submit** workspace → version name e.g. `GA4 conversions - 7 events`.
2. **Publish**.

### GA4 DebugView (recommended)

1. GA4 → **Admin** → **Data display** → **DebugView** (or install [GA Debugger extension](https://chrome.google.com/webstore/detail/google-analytics-debugger)).
2. With GTM Preview connected, repeat each test action.
3. Confirm each event name appears with parameters.

### Realtime

GA4 → **Reports** → **Realtime** → **Event count by Event name** — trigger test actions and watch events appear.

### Full checklist

| Event | Test action | dataLayer `event` | GA4 conversion marked |
|-------|-------------|-------------------|------------------------|
| contact_form_submit | Submit contact form | ✓ | ✓ |
| franchise_inquiry_submit | Submit inquiry modal | ✓ | ✓ |
| list_brand_submit | Submit list-your-brand | ✓ | ✓ |
| brochure_download | Submit brochure modal | ✓ | ✓ |
| whatsapp_click | Click WhatsApp CTA | ✓ | ✓ |
| phone_click | Click tel link | ✓ | ✓ |
| career_apply | Click Apply mailto | ✓ | ✓ |

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Event in dataLayer but tag not fired | Trigger event name typo; tag not linked to trigger; container not published |
| Tag fired, nothing in GA4 | Wrong Measurement ID; Configuration tag not firing; ad blocker |
| Form event never in dataLayer | Sheets submit failed; site not deployed with conversion code |
| Double page_view | Do not add All Pages History Change trigger for SPA (see `docs/GTM_SETUP.md`) |
| `link_location` / `role_id` empty | Normal on some pages; optional parameters |

---

## Quick duplicate workflow

After Event 1 is working:

1. **Duplicate** trigger → change Event name only.
2. **Duplicate** tag → change Event Name + trigger.
3. Preview one action per duplicate.
4. Publish once.

This reduces setup time for events 2–7.
