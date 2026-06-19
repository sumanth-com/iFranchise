import { INDIAN_STATES, isKnownCityInState, resolveCityInState } from '../../../data/indianStatesCities.js';

/**
 * Validate state + city fields on form data.
 * @param {object} data - Mutated form data object
 * @param {object} errors - Error map to populate
 * @param {{ required?: boolean }} [options]
 */
export function validateStateCityOnData(data, errors, { required = true } = {}) {
  const state = String(data.state ?? '').trim();
  const city = String(data.city ?? '').trim();

  if (!state) {
    if (required) errors.state = 'Please select a state';
    else data.state = '';
  } else if (!INDIAN_STATES.includes(state)) {
    errors.state = 'Please select a valid state';
  } else {
    data.state = state;
  }

  if (!city) {
    if (required) errors.city = 'Please select or enter your city';
    else data.city = '';
  } else if (city.length < 2) {
    errors.city = 'City must be at least 2 characters';
  } else if (data.state && isKnownCityInState(data.state, city)) {
    data.city = resolveCityInState(data.state, city) ?? city;
  } else if (city.length > 100) {
    errors.city = 'City name is too long';
  } else {
    data.city = city;
  }
}
