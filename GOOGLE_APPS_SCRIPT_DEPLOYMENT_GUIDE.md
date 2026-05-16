# Google Apps Script Deployment Guide

## Overview

This guide will walk you through deploying the Google Apps Script backend to handle all form submissions from your iFranchise website.

## Prerequisites

- Google Account with access to Google Sheets
- Google Sheets created (or create during setup)
- Basic understanding of Google Apps Script

## Step 1: Create Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com)
2. Click "Blank" to create a new spreadsheet
3. Name it: `iFranchise Form Submissions`
4. Keep this tab open - you'll need the spreadsheet ID

## Step 2: Open Apps Script Editor

1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. This will open the Apps Script editor in a new tab
3. Delete any existing code in the editor

## Step 3: Add the Backend Code

1. Copy the entire contents of `google-apps-script-backend.js` from your project
2. Paste it into the Apps Script editor
3. Save the project (Ctrl+S or Cmd+S)
4. Name the project: `iFranchise Form Backend`

## Step 4: Setup Sheets

1. In the Apps Script editor, select the function `setupSheets` from the toolbar dropdown
2. Click **Run**
3. Grant permissions when prompted (see Permissions section below)
4. This will create all 7 sheet tabs with proper headers:
   - Contact_Leads
   - Franchise_Inquiries
   - Brand_Applications
   - Job_Applications
   - Chatbot_Brands
   - Chatbot_Investors
   - Newsletter_Subscribers

## Step 5: Test the Script

1. Select the function `testSubmission` from the toolbar dropdown
2. Click **Run**
3. Check the "Execution log" at the bottom - you should see:
   ```
   Successfully submitted contact to Contact_Leads
   Test submission result: { "success": true, ... }
   ```
4. Go back to your Google Sheet - you should see a test row in the Contact_Leads tab

## Step 6: Deploy as Web App

1. In the Apps Script editor, click the blue **Deploy** button (top right)
2. Select **New deployment**
3. Click the gear icon ⚙️ next to "Select type"
4. Choose **Web app**
5. Fill in the deployment settings:

   **Description**: `iFranchise Form Backend v1`
   
   **Execute as**: `Me` (your email address)
   
   **Who has access**: `Anyone` ⚠️ **IMPORTANT: This must be "Anyone" for your frontend to work**

6. Click **Deploy**
7. Grant permissions if prompted (same as Step 4)
8. Copy the **Web App URL** - it will look like:
   ```
   https://script.google.com/macros/s/AKfycbx.../exec
   ```

## Step 7: Connect to Frontend

1. Open your project's `.env` file
2. Add your Web App URL:

   ```env
   VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycbx.../exec
   VITE_APP_ENV=development
   ```

3. Save the `.env` file
4. Restart your development server: `npm run dev`

## Step 8: Test End-to-End

1. Open your website (localhost:5173)
2. Navigate to the Contact page
3. Fill out and submit the contact form
4. Check your Google Sheet - you should see the new submission in Contact_Leads
5. Test other forms (Franchise Inquiry, Brand Application, Job Application)

## Permissions Setup

### First Run Permissions

When you run the script for the first time, you'll see a permissions dialog:

1. **"Authorization Required"** - Click **Review Permissions**
2. Choose your Google account
3. **"Google hasn't verified this app"** - Click **Advanced**
4. Click **Go to iFranchise Form Backend (unsafe)** at the bottom
5. Click **Allow**

This grants the script permission to:
- Access your spreadsheets
- Create and modify sheets
- Add rows to sheets

### Web App Permissions

When deploying as a Web App, you may need to grant permissions again. Follow the same process as above.

## Important Notes

### Security Considerations

- **"Anyone" access** is required for the Web App to work from your frontend
- The script only accepts POST requests with JSON payloads
- All submissions are logged with timestamps
- Rate limiting is handled on the frontend (in your code)

### CORS Handling

The script handles CORS automatically:
- Accepts POST requests from any origin
- Returns JSON responses
- No additional CORS configuration needed

### Error Handling

The script includes comprehensive error handling:
- Invalid JSON payloads
- Missing required fields
- Invalid form types
- Sheet creation failures
- Network errors

### Monitoring

To check submission statistics:
1. In Apps Script editor, select `getStats` function
2. Click **Run**
3. Check execution log for submission counts per sheet

## Troubleshooting

### "Script function not found" Error

- Make sure you saved the script
- Refresh the Apps Script editor
- Try running the function again

### "Authorization Required" Loop

- Clear your browser cookies for script.google.com
- Try in incognito/private mode
- Make sure you're logged into the correct Google account

### Form Submissions Not Appearing

- Check the Web App URL in your `.env` is correct
- Check browser console for errors
- Verify the Web App was deployed with "Anyone" access
- Check Apps Script execution logs for errors

### "No data received" Error

- Verify your frontend is sending POST requests
- Check the payload structure matches expected format
- Ensure Content-Type is application/json

## Updating the Script

To make changes after deployment:

1. Edit the code in Apps Script editor
2. Save changes
3. Click **Deploy** → **Manage deployments**
4. Click the pencil icon ✏️ next to your deployment
5. Click **Edit** next to version
6. Select **New version**
7. Click **Deploy**

## Sheet Structure Reference

### Contact_Leads
- Timestamp, Source Page, Name, Email, Phone, Company, Message, Submitted At

### Franchise_Inquiries
- Timestamp, Source Page, Name, Email, Phone, Franchise Interest, Investment Budget, Timeline, Message, Submitted At

### Brand_Applications
- Timestamp, Source Page, Brand Name, Industry, Locations, Contact Name, Contact Email, Contact Phone, Description, Submitted At

### Job_Applications
- Timestamp, Source Page, Job Title, Name, Email, Phone, Resume URL, Cover Letter, Experience, Submitted At

### Chatbot_Brands
- Timestamp, Source Page, Brand Name, Industry, Locations, Cities, Investment, Contact Name, Contact Phone, Submitted At

### Chatbot_Investors
- Timestamp, Source Page, Industries, Budget, Cities, ROI, Timeline, Submitted At

### Newsletter_Subscribers
- Timestamp, Source Page, Email, Submitted At

## Support

If you encounter issues:
1. Check the Apps Script execution logs
2. Verify your Web App URL is correct
3. Ensure "Anyone" access is set on the Web App deployment
4. Test with the `testSubmission` function
