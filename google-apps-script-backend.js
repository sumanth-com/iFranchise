/**
 * iFranchise Form Submission Backend
 * Google Apps Script Web App for handling all form submissions
 * 
 * This script handles POST requests from the frontend and routes data
 * to the appropriate Google Sheet tab based on form_type.
 * 
 * Deployment: Deploy as Web App with "Anyone" access
 * 
 * @version 1.0.0
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

/**
 * Sheet tab names - must match exactly with your Google Sheet tabs
 */
const SHEET_TABS = {
  contact: 'Contact_Leads',
  brand_application: 'Brand_Applications',
  chatbot_brand: 'Chatbot_Brands',
  chatbot_investor: 'Chatbot_Investors',
  chatbot_strategy: 'Chatbot_Strategy',
  brochure_download: 'Brochure_Downloads',
  franchise_inquiry: 'Franchise_Inquiries'
};

/**
 * Column headers for each sheet tab
 * These will be created if they don't exist
 */
const SHEET_HEADERS = {
  Contact_Leads: [
    'Timestamp',
    'Source Page',
    'Name',
    'Email',
    'Phone',
    'Company',
    'Message',
    'Submitted At'
  ],
  Brand_Applications: [
    'Timestamp',
    'Source Page',
    'Brand Name',
    'Industry',
    'Locations',
    'Contact Name',
    'Contact Email',
    'Contact Phone',
    'Description',
    'Submitted At'
  ],
  Chatbot_Brands: [
    'Timestamp',
    'Source Page',
    'Brand Name',
    'Industry',
    'Locations',
    'Cities',
    'Investment',
    'Contact Name',
    'Contact Phone',
    'Submitted At'
  ],
  Chatbot_Investors: [
    'Timestamp',
    'Source Page',
    'Industries',
    'Budget',
    'Cities',
    'Timeline',
    'Contact Name',
    'Contact Phone',
    'Submitted At'
  ],
  Chatbot_Strategy: [
    'Timestamp',
    'Source Page',
    'Name',
    'Phone',
    'Email',
    'Preferred Date',
    'Preferred Time',
    'Message',
    'Submitted At'
  ],
  Brochure_Downloads: [
    'Timestamp',
    'Source Page',
    'Name',
    'Email',
    'Phone',
    'Franchise ID',
    'Franchise Name',
    'Message',
    'Submitted At'
  ],
  Franchise_Inquiries: [
    'Timestamp',
    'Source Page',
    'Franchise ID',
    'Franchise Name',
    'Franchise Type',
    'Full Name',
    'Email',
    'Phone',
    'Preferred City',
    'Message',
    'Submitted At'
  ]
};

// ============================================================================
// MAIN HANDLER
// ============================================================================

/**
 * Main function that handles all HTTP requests
 * Routes to appropriate handler based on HTTP method
 */
function doPost(e) {
  return handleRequest(e);
}

function doGet(e) {
  return handleRequest(e);
}

/**
 * Parse JSON payload from POST body or form field (browser-friendly).
 */
function parseRequestPayload(e) {
  if (!e) return null;

  if (e.parameter && e.parameter.payload) {
    try {
      return JSON.parse(String(e.parameter.payload));
    } catch (parseError) {
      console.error('Failed to parse e.parameter.payload:', parseError);
    }
  }

  if (e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (parseError) {
      console.error('Failed to parse e.postData.contents:', parseError);
    }
  }

  return null;
}

/**
 * Central request handler
 * Processes incoming requests and returns appropriate response
 */
function handleRequest(e) {
  const lock = LockService.getScriptLock();
  var lockHeld = false;

  try {
    try {
      lock.waitLock(10000);
      lockHeld = true;
    } catch (lockError) {
      console.warn('Lock not acquired, continuing submission:', lockError);
    }

    if (!e) {
      return createResponse({
        success: false,
        error: 'No data received. Please use POST with a JSON payload.',
      }, 400);
    }

    const payload = parseRequestPayload(e);
    if (!payload) {
      return createResponse({
        success: false,
        error: 'Invalid or missing payload. Send JSON via POST body or form field "payload".',
      }, 400);
    }
    // Validate payload shape
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
      return createResponse({
        success: false,
        error: 'Empty or invalid payload. Please send valid JSON data.',
      }, 400);
    }
    // Validate required fields
    if (!payload.form_type || !payload.sheet_tab || !payload.data) {
      return createResponse({
        success: false,
        error: 'Missing required fields: form_type, sheet_tab, or data',
      }, 400);
    }

    const result = processSubmission(payload);

    return createResponse(result, result.success ? 200 : 400);
  } catch (error) {
    console.error('Error in handleRequest:', error);
    return createResponse({
      success: false,
      error: 'Internal server error: ' + error.toString(),
    }, 500);
  } finally {
    if (lockHeld) {
      lock.releaseLock();
    }
  }
}

// ============================================================================
// SUBMISSION PROCESSING
// ============================================================================

/**
 * Map display tab names to header config keys.
 */
function headerKeyForSheet(sheetName) {
  if (sheetName === 'Contact Leads') return 'Contact_Leads';
  return sheetName;
}

/**
 * Resolve sheet tab (handles legacy tab names like "Contact Leads").
 */
function resolveSheetTab(formType, requestedTab) {
  const expectedTab = SHEET_TABS[formType];
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  if (requestedTab === expectedTab && ss.getSheetByName(expectedTab)) {
    return expectedTab;
  }
  if (ss.getSheetByName(expectedTab)) {
    return expectedTab;
  }
  if (requestedTab && ss.getSheetByName(requestedTab)) {
    return requestedTab;
  }
  if (formType === 'contact' && ss.getSheetByName('Contact Leads')) {
    return 'Contact Leads';
  }
  return expectedTab;
}

/**
 * Process form submission and route to appropriate sheet
 */
function processSubmission(payload) {
  try {
    const { form_type, sheet_tab, data, source_page, submitted_at } = payload;
    
    // Validate form_type
    if (!SHEET_TABS[form_type]) {
      return {
        success: false,
        error: `Invalid form_type: ${form_type}. Valid types: ${Object.keys(SHEET_TABS).join(', ')}`
      };
    }
    
    const resolvedTab = resolveSheetTab(form_type, sheet_tab);

    // Get or create sheet
    const sheet = getOrCreateSheet(resolvedTab);
    
    // Ensure headers exist
    ensureHeaders(sheet, headerKeyForSheet(resolvedTab));
    
    // Prepare row data
    const rowData = prepareRowData(form_type, data, source_page, submitted_at);
    
    // Append row to sheet
    sheet.appendRow(rowData);
    
    // Log successful submission
    console.log(`Successfully submitted ${form_type} to ${resolvedTab}`);
    
    return {
      success: true,
      message: 'Form submitted successfully',
      data: {
        form_type: form_type,
        sheet_tab: resolvedTab,
        timestamp: new Date().toISOString()
      }
    };
    
  } catch (error) {
    console.error('Error in processSubmission:', error);
    return {
      success: false,
      error: 'Failed to process submission: ' + error.toString()
    };
  }
}

/**
 * Get or create sheet by name (supports common tab name variants).
 */
function getOrCreateSheet(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(sheetName);

  if (!sheet && sheetName === 'Contact_Leads') {
    sheet = ss.getSheetByName('Contact Leads');
  }
  if (!sheet && sheetName === 'Contact Leads') {
    sheet = ss.getSheetByName('Contact_Leads');
  }

  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    console.log(`Created new sheet: ${sheetName}`);
  }

  return sheet;
}

/**
 * Ensure sheet has proper headers
 */
function ensureHeaders(sheet, sheetName) {
  const headers = SHEET_HEADERS[sheetName];
  if (!headers) {
    throw new Error(`No headers defined for sheet: ${sheetName}`);
  }
  
  const lastRow = sheet.getLastRow();
  
  // Add headers if sheet is empty
  if (lastRow === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    // Freeze header row
    sheet.setFrozenRows(1);
    // Style header row
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#4285F4');
    headerRange.setFontColor('#FFFFFF');
  }
}

/**
 * Prepare row data based on form type
 */
function prepareRowData(formType, data, sourcePage, submittedAt) {
  const timestamp = new Date().toISOString();
  const submittedAtTime = submittedAt || timestamp;
  
  switch (formType) {
    case 'contact':
      return [
        timestamp,
        sourcePage || 'unknown',
        data.name || '',
        data.email || '',
        data.phone || '',
        data.company || '',
        data.message || '',
        submittedAtTime
      ];
      
    case 'brand_application':
      return [
        timestamp,
        sourcePage || 'unknown',
        data.brandName || '',
        data.industry || '',
        data.locations || '',
        data.contactName || '',
        data.contactEmail || '',
        data.contactPhone || '',
        data.description || '',
        submittedAtTime
      ];
      
    case 'chatbot_brand':
      return [
        timestamp,
        sourcePage || 'unknown',
        data.brand_name || '',
        data.industry || '',
        data.locations || '',
        data.cities || '',
        data.investment || '',
        data.contact_name || '',
        data.contact_phone || '',
        submittedAtTime
      ];
      
    case 'chatbot_investor':
      return [
        timestamp,
        sourcePage || 'unknown',
        data.industries || '',
        data.budget || '',
        data.cities || '',
        data.timeline || '',
        data.contact_name || '',
        data.contact_phone || '',
        submittedAtTime
      ];

    case 'chatbot_strategy':
      return [
        timestamp,
        sourcePage || 'unknown',
        data.name || '',
        data.phone || '',
        data.email || '',
        data.preferred_date || '',
        data.preferred_time || '',
        data.message || '',
        submittedAtTime
      ];

    case 'brochure_download':
      return [
        timestamp,
        sourcePage || 'unknown',
        data.name || '',
        data.email || '',
        data.phone || '',
        data.franchise_id || '',
        data.franchise_name || '',
        data.message || '',
        submittedAtTime
      ];

    case 'franchise_inquiry':
      return [
        timestamp,
        sourcePage || 'unknown',
        data.franchise_id || '',
        data.franchise_name || '',
        data.franchise_type || '',
        data.full_name || '',
        data.email || '',
        data.phone || '',
        data.city || '',
        data.message || '',
        submittedAtTime
      ];
      
    default:
      throw new Error(`Unknown form type: ${formType}`);
  }
}

// ============================================================================
// RESPONSE HELPERS
// ============================================================================

/**
 * Create JSON response with proper CORS headers
 */
function createResponse(data, statusCode) {
  const response = ContentService.createTextOutput();
  response.setMimeType(ContentService.MimeType.JSON);
  response.setContent(JSON.stringify(data));
  return response;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Test function to verify script is working
 * Run this manually from the Apps Script editor
 */
function testSubmission() {
  const testPayload = {
    form_type: 'contact',
    sheet_tab: 'Contact_Leads',
    source_page: 'test',
    submitted_at: new Date().toISOString(),
    data: {
      name: 'Test User',
      email: 'test@example.com',
      phone: '1234567890',
      company: 'Test Company',
      message: 'This is a test submission'
    }
  };
  
  const result = processSubmission(testPayload);
  console.log('Test submission result:', JSON.stringify(result, null, 2));
  return result;
}

/**
 * Setup function to create all sheets with headers
 * Run this once after deploying to a new spreadsheet
 */
function setupSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  Object.keys(SHEET_TABS).forEach(formType => {
    const sheetName = SHEET_TABS[formType];
    const sheet = getOrCreateSheet(sheetName);
    ensureHeaders(sheet, sheetName);
    console.log(`Setup complete for: ${sheetName}`);
  });
  
  console.log('All sheets setup complete!');
}

/**
 * Get submission statistics
 */
function getStats() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const stats = {};
  
  Object.values(SHEET_TABS).forEach(sheetName => {
    const sheet = ss.getSheetByName(sheetName);
    if (sheet) {
      const rowCount = sheet.getLastRow() - 1; // Subtract header row
      stats[sheetName] = rowCount > 0 ? rowCount : 0;
    } else {
      stats[sheetName] = 0;
    }
  });
  
  return stats;
}
