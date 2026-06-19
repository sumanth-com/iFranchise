/**
 * iFranchise Form Submission Backend
 * Google Apps Script Web App for handling all form submissions
 * 
 * This script handles POST requests from the frontend and routes data
 * to the appropriate Google Sheet tab based on form_type.
 * 
 * Deployment: Deploy as Web App with "Anyone" access
 * 
 * @version 1.1.0 — State/City columns; merges new headers without moving existing rows
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
  franchise_inquiry: 'Franchise_Inquiries',
  career_application: 'Career_Applications'
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
    'State',
    'City',
    'Submitted At'
  ],
  Brand_Applications: [
    'Timestamp',
    'Source Page',
    'Brand Name',
    'Industry',
    'Locations',
    'State',
    'City',
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
    'State',
    'City',
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
    'State',
    'Message',
    'Submitted At'
  ],
  Career_Applications: [
    'Timestamp',
    'Source Page',
    'Role ID',
    'Role Title',
    'Name',
    'Email',
    'Phone',
    'Resume Link',
    'Portfolio Link',
    'State',
    'City',
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
    
    // Ensure headers exist (adds new columns to the right — never deletes or shifts old rows)
    ensureHeaders(sheet, headerKeyForSheet(resolvedTab));

    const headerRow = getSheetHeaderRow(sheet);
    const rowValues = prepareRowValues(form_type, data, source_page, submitted_at);
    const rowData = buildRowArray(headerRow, rowValues);

    // Append row to sheet (unlimited submissions — no per-user caps)
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
 * Style header cells (new sheets or newly appended columns).
 */
function styleHeaderRange(sheet, row, startCol, colCount) {
  const headerRange = sheet.getRange(row, startCol, 1, colCount);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#4285F4');
  headerRange.setFontColor('#FFFFFF');
}

/**
 * Ensure sheet has headers. Existing data is never removed.
 * Missing columns from SHEET_HEADERS are appended to the right of row 1.
 */
function ensureHeaders(sheet, sheetName) {
  const targetHeaders = SHEET_HEADERS[sheetName];
  if (!targetHeaders) {
    throw new Error('No headers defined for sheet: ' + sheetName);
  }

  const lastRow = sheet.getLastRow();

  if (lastRow === 0) {
    sheet.getRange(1, 1, 1, targetHeaders.length).setValues([targetHeaders]);
    sheet.setFrozenRows(1);
    styleHeaderRange(sheet, 1, 1, targetHeaders.length);
    return;
  }

  const lastCol = Math.max(sheet.getLastColumn(), 1);
  const existingRow = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  const existingHeaders = existingRow.map(function (cell) {
    return String(cell || '').trim();
  });

  const missing = [];
  targetHeaders.forEach(function (header) {
    if (existingHeaders.indexOf(header) === -1) {
      missing.push(header);
    }
  });

  if (missing.length === 0) {
    return;
  }

  const startCol = lastCol + 1;
  sheet.getRange(1, startCol, 1, missing.length).setValues([missing]);
  styleHeaderRange(sheet, 1, startCol, missing.length);
  console.log('Added columns on ' + sheetName + ': ' + missing.join(', '));
}

/**
 * Read current header row (column order as stored in the sheet).
 */
function getSheetHeaderRow(sheet) {
  const lastCol = sheet.getLastColumn();
  if (lastCol === 0) {
    return [];
  }
  return sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(function (cell) {
    return String(cell || '').trim();
  });
}

/**
 * Build append row aligned to the sheet's header row (safe when columns were added later).
 */
function buildRowArray(headerRow, valuesByHeader) {
  return headerRow.map(function (header) {
    if (!header) {
      return '';
    }
    if (Object.prototype.hasOwnProperty.call(valuesByHeader, header)) {
      var value = valuesByHeader[header];
      return value === null || value === undefined ? '' : value;
    }
    return '';
  });
}

function normalizePhone(phone) {
  if (phone === null || phone === undefined || phone === '') {
    return '';
  }
  if (typeof phone === 'string') {
    return phone;
  }
  if (typeof phone === 'object') {
    if (phone.phone) {
      return String(phone.phone);
    }
    if (phone.phoneDialCode && phone.phoneLocal) {
      return '+' + String(phone.phoneDialCode).replace(/^\+/, '') + String(phone.phoneLocal);
    }
  }
  return String(phone);
}

/**
 * Prepare row values keyed by header name (form-type specific).
 */
function prepareRowValues(formType, data, sourcePage, submittedAt) {
  const timestamp = new Date().toISOString();
  const submittedAtTime = submittedAt || timestamp;
  const base = {
    'Timestamp': timestamp,
    'Source Page': sourcePage || 'unknown',
    'Submitted At': submittedAtTime,
  };

  switch (formType) {
    case 'contact':
      return Object.assign({}, base, {
        'Name': data.name || '',
        'Email': data.email || '',
        'Phone': normalizePhone(data.phone),
        'Company': data.company || '',
        'Message': data.message || '',
        'State': data.state || '',
        'City': data.city || '',
      });

    case 'brand_application':
      return Object.assign({}, base, {
        'Brand Name': data.brandName || '',
        'Industry': data.industry || '',
        'Locations': data.locations || '',
        'State': data.state || '',
        'City': data.city || '',
        'Contact Name': data.contactName || '',
        'Contact Email': data.contactEmail || '',
        'Contact Phone': normalizePhone(data.contactPhone),
        'Description': data.description || '',
      });

    case 'chatbot_brand':
      return Object.assign({}, base, {
        'Brand Name': data.brand_name || '',
        'Industry': data.industry || '',
        'Locations': data.locations || '',
        'Cities': data.cities || '',
        'Investment': data.investment || '',
        'Contact Name': data.contact_name || '',
        'Contact Phone': normalizePhone(data.contact_phone),
      });

    case 'chatbot_investor':
      return Object.assign({}, base, {
        'Industries': data.industries || '',
        'Budget': data.budget || '',
        'Cities': data.cities || '',
        'Timeline': data.timeline || '',
        'Contact Name': data.contact_name || '',
        'Contact Phone': normalizePhone(data.contact_phone),
      });

    case 'chatbot_strategy':
      return Object.assign({}, base, {
        'Name': data.name || '',
        'Phone': normalizePhone(data.phone),
        'Email': data.email || '',
        'Preferred Date': data.preferred_date || '',
        'Preferred Time': data.preferred_time || '',
        'Message': data.message || '',
      });

    case 'brochure_download':
      return Object.assign({}, base, {
        'Name': data.name || '',
        'Email': data.email || '',
        'Phone': normalizePhone(data.phone),
        'Franchise ID': data.franchise_id || '',
        'Franchise Name': data.franchise_name || '',
        'State': data.state || '',
        'City': data.city || '',
        'Message': data.message || '',
      });

    case 'franchise_inquiry':
      return Object.assign({}, base, {
        'Franchise ID': data.franchise_id || '',
        'Franchise Name': data.franchise_name || '',
        'Franchise Type': data.franchise_type || '',
        'Full Name': data.full_name || '',
        'Email': data.email || '',
        'Phone': normalizePhone(data.phone),
        'Preferred City': data.city || '',
        'State': data.state || '',
        'Message': data.message || '',
      });

    case 'career_application':
      return Object.assign({}, base, {
        'Role ID': data.role_id || '',
        'Role Title': data.role_title || '',
        'Name': data.name || '',
        'Email': data.email || '',
        'Phone': normalizePhone(data.phone),
        'Resume Link': data.resume_link || '',
        'Portfolio Link': data.portfolio_link || '',
        'State': data.state || '',
        'City': data.city || '',
        'Message': data.message || '',
      });

    default:
      throw new Error('Unknown form type: ' + formType);
  }
}

/**
 * @deprecated Use prepareRowValues + buildRowArray
 */
function prepareRowData(formType, data, sourcePage, submittedAt) {
  const values = prepareRowValues(formType, data, sourcePage, submittedAt);
  const headers = SHEET_HEADERS[SHEET_TABS[formType]];
  if (!headers) {
    throw new Error('Unknown form type: ' + formType);
  }
  return buildRowArray(headers, values);
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
      state: 'Karnataka',
      city: 'Bengaluru',
      message: 'This is a test submission'
    }
  };
  
  const result = processSubmission(testPayload);
  console.log('Test submission result:', JSON.stringify(result, null, 2));
  return result;
}

/**
 * Test career apply form routing (run from Apps Script editor).
 */
function testCareerSubmission() {
  const testPayload = {
    form_type: 'career_application',
    sheet_tab: 'Career_Applications',
    source_page: 'careers_role_test',
    submitted_at: new Date().toISOString(),
    data: {
      role_id: 'social-media-content-creator-intern',
      role_title: 'Social Media & Content Creator Intern',
      name: 'Test Applicant',
      email: 'test@example.com',
      phone: '9876543210',
      resume_link: 'https://drive.google.com/example',
      portfolio_link: '',
      state: 'Maharashtra',
      city: 'Mumbai',
      message: 'Career apply test row'
    }
  };

  const result = processSubmission(testPayload);
  console.log('Career test result:', JSON.stringify(result, null, 2));
  return result;
}

/**
 * Setup / migrate all sheets: creates tabs if missing and appends any new header columns.
 * Safe to run on a live spreadsheet — existing rows are not deleted or modified.
 */
function setupSheets() {
  Object.keys(SHEET_TABS).forEach(function (formType) {
    const sheetName = SHEET_TABS[formType];
    const sheet = getOrCreateSheet(sheetName);
    ensureHeaders(sheet, headerKeyForSheet(sheetName));
    console.log('Headers OK for: ' + sheetName);
  });

  console.log('All sheets ready. Existing data preserved; new columns added where needed.');
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
