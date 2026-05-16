# Connect Web App URL to .env

## Step 1: Get Your Web App URL

After deploying your Google Apps Script as a Web App (see Deployment Guide), you'll receive a URL like:

```
https://script.google.com/macros/s/AKfycbxT3xN7y8z9q0w1e2r3t4y5u6v7w8x9y0z/exec
```

Copy this URL - you'll need it for the next step.

## Step 2: Update .env File

Open your project's `.env` file and add the Web App URL:

```env
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycbxT3xN7y8z9q0w1e2r3t4y5u6v7w8x9y0z/exec
VITE_APP_ENV=development
```

**Important:**
- Replace the example URL with your actual Web App URL
- Keep `VITE_APP_ENV=development` for local development
- Do not add quotes around the URL
- Do not add trailing slashes

## Step 3: Verify .env File

Your `.env` file should look exactly like this:

```env
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ACTUAL_SCRIPT_ID/exec
VITE_APP_ENV=development
```

## Step 4: Restart Development Server

After updating `.env`, you must restart your dev server for the changes to take effect:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## Step 5: Test the Connection

1. Open your website (localhost:5173)
2. Navigate to the Contact page
3. Fill out and submit the contact form
4. Check your browser console - you should see:
   ```
   [GoogleSheetsClient] Submission started
   [GoogleSheetsClient] Payload: {...}
   [GoogleSheetsClient] Sending request to: https://script.google.com/macros/s/...
   [GoogleSheetsClient] Request completed successfully
   ```
5. Check your Google Sheet - you should see the submission in Contact_Leads tab

## Troubleshooting

### Form Submission Fails

**Check:**
1. Web App URL in `.env` is correct (no typos)
2. Web App was deployed with "Anyone" access
3. Dev server was restarted after updating `.env`
4. Browser console for errors

### "Server configuration error" Message

**Cause:** `VITE_GOOGLE_APPS_SCRIPT_URL` is not set or empty

**Solution:** 
1. Check `.env` file exists
2. Verify URL is set correctly
3. Restart dev server

### "Network error" Message

**Cause:** Web App URL is incorrect or Web App is not deployed

**Solution:**
1. Verify Web App URL by opening it in browser
2. Should see: "Script function not found: doGet" (this is normal)
3. If you see 404 or other error, redeploy the Web App

### CORS Errors

**Cause:** Web App not deployed with correct settings

**Solution:**
1. Redeploy Web App
2. Ensure "Who has access" is set to "Anyone"
3. Ensure "Execute as" is set to "Me"

## Environment Variables Reference

### VITE_GOOGLE_APPS_SCRIPT_URL
- **Required:** Yes
- **Format:** Full Web App URL from Google Apps Script deployment
- **Example:** `https://script.google.com/macros/s/AKfycbx.../exec`
- **Purpose:** Endpoint for all form submissions

### VITE_APP_ENV
- **Required:** Yes
- **Format:** `development` or `production`
- **Default:** `development`
- **Purpose:** Environment indicator for logging and behavior

## Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Add the environment variable in your hosting platform:
   - Variable name: `VITE_GOOGLE_APPS_SCRIPT_URL`
   - Value: Your Web App URL
   - Variable name: `VITE_APP_ENV`
   - Value: `production`

2. Do NOT commit `.env` to git (it's in `.gitignore`)

3. Use `.env.example` as a template for team members

## Security Notes

- **Never commit `.env` to git** - it contains your Web App URL
- **Web App URL is not a secret** - it's designed to be public
- **Rate limiting is handled on the frontend** - in your code
- **Script validates all inputs** - before writing to sheet
- **Timestamps are added automatically** - for audit trail

## Quick Verification Command

To verify your `.env` is loaded correctly:

```bash
# In your terminal, run:
echo $VITE_GOOGLE_APPS_SCRIPT_URL
```

If it returns your URL, the environment variable is set correctly.

## Multiple Environments

If you need different Web Apps for different environments:

### Development
```env
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/DEV_SCRIPT_ID/exec
VITE_APP_ENV=development
```

### Production
```env
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/PROD_SCRIPT_ID/exec
VITE_APP_ENV=production
```

Use separate Google Sheets for each environment to keep test data separate from production data.
