# Google Apps Script Permissions Quick Reference

## Required Permissions

When you run the Google Apps Script for the first time, it will request the following permissions:

### 1. Spreadsheet Access
- **View and edit spreadsheets in Google Drive**
- Required to: Create sheets, add headers, append form submissions

### 2. Script Execution
- **Connect to an external service**
- Required to: Run as a Web App and accept HTTP requests

## How to Grant Permissions

### First Time Setup

When you click **Run** for `setupSheets` or `testSubmission`:

1. **"Authorization Required"** dialog appears
2. Click **Review Permissions**
3. Select your Google account
4. **"Google hasn't verified this app"** warning appears
5. Click **Advanced** (small link at the bottom)
6. Click **Go to iFranchise Form Backend (unsafe)** (at the very bottom)
7. Click **Allow**

### Web App Deployment

When you deploy as a Web App:

1. Follow the same steps as above
2. You may need to do this twice:
   - Once for script execution
   - Once for Web App deployment

## Why "Unsafe"?

Google shows this warning because:
- This is a custom script (not from Google's verified apps)
- It's normal for custom Apps Script projects
- Your own script is safe - you wrote it

## Permission Scopes

The script uses these OAuth scopes:

```
https://www.googleapis.com/auth/spreadsheets
https://www.googleapis.com/auth/script.external_request
```

These are the minimum required scopes for:
- Reading/writing to your Google Sheet
- Accepting HTTP POST requests from your website

## Revoking Permissions

If you need to revoke permissions later:

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Click **Third-party apps & account access**
3. Find "iFranchise Form Backend"
4. Click **Remove access**

## Troubleshooting Permissions

### "Authorization Required" Loop

**Solution:**
1. Clear browser cookies for script.google.com
2. Try in incognito/private mode
3. Ensure you're logged into the correct Google account

### "ScriptError: Authorization is required"

**Solution:**
1. Re-run the authorization flow
2. Make sure you clicked "Allow" on all permission screens
3. Check that you're using the same Google account as the spreadsheet owner

### Multiple Google Accounts

**Solution:**
1. Use incognito/private mode
2. Log in with only the account that owns the spreadsheet
3. Run the script from that account

## Security Best Practices

### For Development
- Use your personal Google account
- Test with the `testSubmission` function
- Keep the Web App URL in `.env` (not committed to git)

### For Production
- Consider using a service account (advanced)
- Add additional validation in the script
- Monitor the execution logs regularly
- Set up alerts for failed submissions

### Access Control

The Web App is deployed with:
- **Execute as**: Me (your account)
- **Who has access**: Anyone

This means:
- Anyone can send POST requests to your Web App
- The script runs under your account's permissions
- Your frontend can submit forms without authentication

**Note:** This is safe because:
- The script only writes to your spreadsheet
- No sensitive data is exposed
- Rate limiting is handled on the frontend

## Common Permission Errors

### Error: "Exception: You do not have permission to call SpreadsheetApp.openById"

**Cause:** Script doesn't have spreadsheet access

**Solution:** Re-run authorization flow and grant spreadsheet permissions

### Error: "Exception: Script function not found: doGet"

**Cause:** Script wasn't saved properly

**Solution:** Save the script (Ctrl+S) before deploying

### Error: "Service error: Spreadsheets"

**Cause:** Spreadsheet quota exceeded or service down

**Solution:** Wait a few minutes and try again, or check Google Workspace status

## Verification

To verify permissions are working:

1. Run `testSubmission` function
2. Check execution log for success message
3. Verify test row appears in Google Sheet
4. If all three work, permissions are correct
