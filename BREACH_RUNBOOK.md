# Personal Data Breach Response Runbook

> **REQUIRES LEGAL REVIEW**
>
> This is an operational technical draft, not legal advice. Incident roles, contacts, regulator details, notification tests, content and deadlines must be approved by the business and qualified Indian privacy counsel for the law and rules in force on the incident date. This runbook intentionally does not state a blanket 72-hour deadline.

## 1. Scope and known systems

Use this runbook for suspected unauthorised access, disclosure, alteration, loss, destruction, exfiltration or unavailability involving personal data handled by:

- Public website and Vercel deployment
- Google Apps Script form endpoint
- Google Sheets tabs: `Contact_Leads`, `Brand_Applications`, `Chatbot_*`, `Brochure_Downloads`, `Franchise_Inquiries`, `Career_Applications`, and `Data_Rights_Requests`
- Resend lead-notification email and recipient mailboxes, when enabled
- Google Tag Manager / Google Analytics configuration
- Operational accounts used to administer Vercel, Google, Resend, domain/DNS and source control
- Any confirmed downstream franchise-brand or service-provider recipient

The repository does not establish system owners, account administrators, Sheet access lists, backups, retention periods, vendor contract contacts or an appointed grievance/privacy officer.

## 2. Required contacts and roles

Complete and test this table before production use.

| Role | Named person / service | Primary contact | Backup contact |
|---|---|---|---|
| Incident commander | `[BUSINESS TO CONFIRM]` | `[TO CONFIRM]` | `[TO CONFIRM]` |
| Technical lead | `[BUSINESS TO CONFIRM]` | `[TO CONFIRM]` | `[TO CONFIRM]` |
| Google Workspace/Sheets owner | `[BUSINESS TO CONFIRM]` | `[TO CONFIRM]` | `[TO CONFIRM]` |
| Vercel/domain owner | `[BUSINESS TO CONFIRM]` | `[TO CONFIRM]` | `[TO CONFIRM]` |
| Privacy/grievance lead | `[BUSINESS/LEGAL TO CONFIRM]` | `[TO CONFIRM]` | `[TO CONFIRM]` |
| Indian privacy counsel | `[LEGAL TO CONFIRM]` | `[TO CONFIRM]` | `[TO CONFIRM]` |
| Communications lead | `[BUSINESS TO CONFIRM]` | `[TO CONFIRM]` | `[TO CONFIRM]` |
| Cyber insurer / forensics | `[BUSINESS TO CONFIRM IF APPLICABLE]` | `[TO CONFIRM]` | `[TO CONFIRM]` |

The public general contact currently found in the website is `contact@ifranchise.in`. Do not treat it as the internal incident escalation channel or an appointed statutory contact unless the business confirms that role.

## 3. Detection and intake

Potential signals include:

- Unexpected Google Sheet rows, formulas, access grants, downloads, deletions or sharing changes
- Apps Script execution spikes, errors, deployment changes or unfamiliar editors
- Vercel deployment/configuration changes, function spikes or unusual notification traffic
- Resend volume, recipient or API-key anomalies
- GTM container changes or unapproved tags
- Source-control alerts, leaked environment values or unauthorised commits
- User, employee, franchise-brand or vendor reports of unexpected contact or disclosure
- Public exposure in search results, shared links, logs, screenshots or third-party repositories

For every report, open an incident record immediately and preserve:

- Reporter, received time and channel
- Exact allegation and affected system
- URLs, screenshots, message headers and error text
- First known and last known timestamps
- Actions already taken
- Person assigned as incident commander

Do not copy personal data into chat tools, tickets or broad email lists unless approved and necessary.

## 4. Initial triage

### First 30–60 minutes

1. Assign an incident ID and incident commander.
2. Confirm the report without modifying the suspected evidence.
3. Classify current state: active, contained, ended, or unknown.
4. Identify systems and credentials potentially affected.
5. Estimate whether personal data is involved and which Sheet/form categories may be affected.
6. Restrict discussion to the approved incident channel.
7. Engage privacy counsel early where personal data may be involved.
8. Record every decision, time, actor and command/change.

### Severity guide

- **Critical:** active exfiltration; public Sheet; compromised administrator; bulk personal-data access; destructive activity; rights-request data exposed.
- **High:** confirmed unauthorised access with bounded scope; exposed API/vendor key; unauthorised lead emails; malicious Sheet formulas.
- **Medium:** attempted access blocked; limited accidental recipient disclosure; suspicious activity without confirmed access.
- **Low:** security event with no personal data and no credible path to access.

Severity is operational. Legal notification tests must be made separately.

## 5. Containment

Choose actions proportionate to evidence and record the reason.

### Google Apps Script / Sheets

- Disable or replace the public web-app deployment if abuse is active.
- Restrict Sheet sharing and remove unfamiliar users or links.
- Preserve current sharing/access and Apps Script execution evidence before changing it.
- Rotate affected Google account sessions and credentials using approved account procedures.
- Copy affected rows into a restricted evidence file; do not use an editable public copy.
- Do not delete suspicious rows until evidence is preserved.

### Vercel / website / source control

- Disable affected environment variables or functions.
- Roll back only to a known-good deployment after preserving deployment/configuration evidence.
- Revoke unauthorised sessions and rotate server-side credentials.
- If form safety cannot be established, temporarily show a clear unavailable message and direct users to an approved alternative.
- Do not expose temporary secrets through `VITE_` variables.

### Resend / email

- Revoke the affected Resend API key and disable lead notifications.
- Preserve message IDs, timestamps, recipients and provider events.
- Check whether recipient mailboxes or forwarding rules are compromised.

### GTM / analytics

- Pause or remove unapproved tags and publish only a reviewed known-good container version.
- Preserve container version history, actor and change timestamps.
- Disable analytics loading in the site if the live container cannot be trusted.

## 6. Evidence preservation

- Use UTC and retain original timezone information.
- Export logs in their original format where available.
- Record cryptographic hashes for exported evidence where the investigation process supports it.
- Preserve read-only copies of affected Sheet ranges, Apps Script versions, GTM versions, Vercel deployments and provider events.
- Record who collected each item, when, from where, and every transfer.
- Keep evidence access restricted and logged.
- Do not run cleanup scripts, edit rows or rotate credentials before capturing available evidence unless delay would materially increase harm; document emergency actions.

Evidence retention duration and legal hold procedure: `[LEGAL/BUSINESS TO CONFIRM]`.

## 7. Affected-data assessment

Create a data map for the incident:

| Question | Assessment |
|---|---|
| Affected system and owner | |
| Incident start/end and confidence | |
| Accessed, disclosed, altered, lost or unavailable | |
| Form/Sheet tabs affected | |
| Data fields involved | |
| Approximate records and unique people | |
| Data principals in India / other locations | |
| Children or other higher-risk individuals involved | |
| Rights/grievance request details involved | |
| Downstream recipients or franchise brands | |
| Encryption/access controls in place | |
| Evidence of acquisition or misuse | |
| Likely consequences and immediate harm-reduction steps | |
| Data restored / integrity verified | |

Do not infer affected-record counts from total Sheet rows without identifying the relevant time, access and export scope.

## 8. Legal and notification decision

> **REQUIRES LEGAL REVIEW**

Counsel and the confirmed privacy lead must document:

1. The DPDP Act/Rules provisions in force on the incident date.
2. Whether the event meets the applicable definition of a personal data breach.
3. The responsible Data Fiduciary and any processor obligations.
4. Whether notification to the Data Protection Board of India or another authority is required.
5. Whether affected Data Principals must be notified.
6. Applicable timing, required content, delivery channel and staged-update rules.
7. Whether other contractual, employment, cyber-insurance or sectoral notices apply.
8. Reasons for notifying or not notifying, approver and decision time.

Regulator identity, submission channel and deadline: `[LEGAL TO CONFIRM FOR INCIDENT DATE]`.

## 9. Communication templates

### Internal escalation

**Subject:** `[INCIDENT ID] Potential personal data breach — action required`

- Detected/reported:
- Current severity and state:
- Systems affected:
- Personal data potentially involved:
- Immediate containment:
- Evidence location:
- Decisions needed:
- Next update:
- Incident commander:

### Authority notification draft

> **REQUIRES LEGAL REVIEW — DO NOT SEND WITHOUT COUNSEL APPROVAL**

- Reporting organisation/legal entity: `[TO CONFIRM]`
- Contact person and details: `[TO CONFIRM]`
- Incident reference:
- Detection date/time and occurrence period:
- Nature and cause, including what is confirmed versus under investigation:
- Categories and approximate volume of personal data/data principals:
- Likely consequences:
- Containment and remediation completed/planned:
- Measures offered to affected people:
- Vendors/processors involved:
- Further-update plan:

### Affected-person notification draft

> **REQUIRES LEGAL REVIEW — DO NOT SEND WITHOUT COUNSEL APPROVAL**

**Subject:** Important information about your personal data

We are writing regarding `[plain-language incident description]`. On `[date/time]`, we identified `[confirmed facts]`. The information potentially involved was `[categories, not unnecessary copies of the data]`.

We have taken `[containment/remediation]`. You can consider `[specific, proportionate protective steps]`. For questions or assistance, contact `[confirmed incident/privacy channel]`.

What remains under investigation: `[facts]`. We will provide updates through `[channel]`.

## 10. Recovery and closure

Before restoring normal operations:

- Confirm compromised access is revoked and credentials are rotated.
- Verify Sheet sharing, Apps Script deployment, Vercel environment, Resend and GTM configuration against an approved baseline.
- Validate form writes, consent evidence and rights-request routing.
- Confirm monitoring is active.
- Obtain technical lead and incident commander approval.

Within `[BUSINESS TO DEFINE]` days:

- Complete root-cause analysis.
- Identify control and process failures.
- Assign remediation owners and deadlines.
- Confirm required notifications and follow-ups were completed.
- Update the data inventory, retention process, vendor list and this runbook.
- Conduct a lessons-learned review without attributing blame.

Closure requires documented approval from the incident commander, technical lead and confirmed privacy/legal reviewer.

## 11. Exercise and maintenance

- Tabletop exercise frequency: `[BUSINESS TO CONFIRM]`
- Contact validation frequency: `[BUSINESS TO CONFIRM]`
- Last exercise: `[NOT YET RECORDED]`
- Runbook owner: `[BUSINESS TO CONFIRM]`
- Next legal review: `[LEGAL TO CONFIRM]`
