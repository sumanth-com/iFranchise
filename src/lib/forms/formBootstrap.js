/**
 * Startup validation for the form → Google Sheets pipeline (production + dev).
 */

import { FORM_REGISTRY } from './FORM_REGISTRY.js';
import { FORM_TYPES } from './constants/formTypes.js';
import { SHEET_TABS } from './constants/formEndpoints.js';
import {
  hasBuildTimeFormEndpoint,
  resolveFormEndpointUrl,
  getFormEndpointUrlSync,
  isValidFormEndpointUrl,
} from './utils/resolveFormEndpoint.js';
import { logFormInfo, logFormError, logFormWarn } from './utils/formLogger.js';

let bootstrapPromise = null;
let healthState = {
  ready: false,
  buildTimeConfigured: false,
  runtimeConfigured: false,
  endpointValid: false,
  registryCount: FORM_REGISTRY.length,
  formTypes: Object.keys(FORM_TYPES).length,
  sheetTabs: Object.keys(SHEET_TABS).length,
};

export function getFormHealth() {
  return { ...healthState };
}

/**
 * Resolve endpoint early so first form submit does not wait on /forms-endpoint.json.
 */
export function bootstrapFormPipeline() {
  if (!bootstrapPromise) {
    bootstrapPromise = runBootstrap();
  }
  return bootstrapPromise;
}

async function runBootstrap() {
  healthState.buildTimeConfigured = hasBuildTimeFormEndpoint();

  const url = await resolveFormEndpointUrl();
  healthState.runtimeConfigured = Boolean(url);
  healthState.endpointValid = isValidFormEndpointUrl(url);
  healthState.ready = healthState.endpointValid;
  healthState.resolvedAt = new Date().toISOString();

  if (typeof window !== 'undefined') {
    window.__IFR_FORM_HEALTH__ = {
      ...healthState,
      syncUrl: Boolean(getFormEndpointUrlSync()),
      registry: FORM_REGISTRY.map((f) => f.id),
    };
  }

  if (!healthState.endpointValid) {
    logFormError('startup_misconfigured', {
      code: 'CONFIG_ERROR',
      endpointReady: false,
      debug: import.meta.env.DEV
        ? {
            buildTime: healthState.buildTimeConfigured,
            runtime: healthState.runtimeConfigured,
            hint: 'Set VITE_GOOGLE_APPS_SCRIPT_URL in Vercel → Settings → Environment Variables, then redeploy.',
          }
        : undefined,
    });
  } else {
    logFormInfo('startup_ready', {
      endpointReady: true,
      debug: import.meta.env.DEV ? { urlHost: new URL(url).hostname } : undefined,
    });
  }

  if (!healthState.buildTimeConfigured && healthState.runtimeConfigured) {
    logFormWarn('startup_runtime_fallback', {
      code: 'RUNTIME_ENDPOINT',
      endpointReady: true,
      debug: import.meta.env.DEV ? 'Using /forms-endpoint.json' : undefined,
    });
  }

  return healthState;
}
