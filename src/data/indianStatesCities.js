/**
 * Indian states / UTs and major cities for form state → city autocomplete.
 */

/** @type {Record<string, string[]>} */
export const CITIES_BY_STATE = {
  'Andhra Pradesh': [
    'Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Tirupati', 'Kakinada', 'Rajahmundry',
  ],
  'Arunachal Pradesh': ['Itanagar', 'Tawang', 'Pasighat', 'Ziro', 'Bomdila'],
  Assam: ['Guwahati', 'Dibrugarh', 'Silchar', 'Jorhat', 'Tezpur', 'Nagaon'],
  Bihar: ['Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur', 'Darbhanga', 'Purnia'],
  Chhattisgarh: ['Raipur', 'Bhilai', 'Bilaspur', 'Korba', 'Durg', 'Rajnandgaon'],
  Goa: ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa', 'Ponda'],
  Gujarat: [
    'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Gandhinagar', 'Anand',
  ],
  Haryana: ['Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Karnal', 'Rohtak', 'Hisar'],
  'Himachal Pradesh': ['Shimla', 'Manali', 'Dharamshala', 'Solan', 'Mandi', 'Kullu'],
  Jharkhand: ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar', 'Hazaribagh'],
  Karnataka: [
    'Bengaluru', 'Mysuru', 'Mangaluru', 'Hubballi', 'Belagavi', 'Davanagere', 'Ballari', 'Shivamogga',
  ],
  Kerala: [
    'Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam', 'Kannur', 'Alappuzha', 'Palakkad',
  ],
  'Madhya Pradesh': [
    'Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Ratlam', 'Rewa',
  ],
  Maharashtra: [
    'Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad', 'Solapur', 'Kolhapur', 'Navi Mumbai',
  ],
  Manipur: ['Imphal', 'Thoubal', 'Bishnupur', 'Churachandpur'],
  Meghalaya: ['Shillong', 'Tura', 'Jowai', 'Nongpoh'],
  Mizoram: ['Aizawl', 'Lunglei', 'Champhai', 'Serchhip'],
  Nagaland: ['Kohima', 'Dimapur', 'Mokokchung', 'Tuensang'],
  Odisha: ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Sambalpur', 'Puri'],
  Punjab: ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali', 'Pathankot'],
  Rajasthan: [
    'Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer', 'Bikaner', 'Alwar', 'Bhilwara',
  ],
  Sikkim: ['Gangtok', 'Namchi', 'Gyalshing', 'Mangan'],
  'Tamil Nadu': [
    'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Erode', 'Vellore',
  ],
  Telangana: ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam', 'Ramagundam'],
  Tripura: ['Agartala', 'Udaipur', 'Dharmanagar', 'Ambassa'],
  'Uttar Pradesh': [
    'Lucknow', 'Kanpur', 'Ghaziabad', 'Agra', 'Varanasi', 'Meerut', 'Prayagraj', 'Noida', 'Bareilly',
  ],
  Uttarakhand: ['Dehradun', 'Haridwar', 'Rishikesh', 'Haldwani', 'Roorkee', 'Nainital'],
  'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Siliguri', 'Asansol', 'Kharagpur', 'Bardhaman'],
  'Andaman and Nicobar Islands': ['Port Blair', 'Diglipur', 'Rangat'],
  Chandigarh: ['Chandigarh'],
  'Dadra and Nagar Haveli and Daman and Diu': ['Daman', 'Diu', 'Silvassa'],
  Delhi: ['New Delhi', 'Delhi', 'Dwarka', 'Rohini', 'Saket'],
  'Jammu and Kashmir': ['Srinagar', 'Jammu', 'Anantnag', 'Baramulla', 'Udhampur'],
  Ladakh: ['Leh', 'Kargil'],
  Lakshadweep: ['Kavaratti', 'Agatti'],
  Puducherry: ['Puducherry', 'Karaikal', 'Mahe', 'Yanam'],
};

export const INDIAN_STATES = Object.keys(CITIES_BY_STATE).sort((a, b) => a.localeCompare(b));

export function getCitiesForState(state) {
  if (!state) return [];
  return CITIES_BY_STATE[state] ?? [];
}

/**
 * Filter cities in a state by typed prefix (case-insensitive).
 * @param {string} state
 * @param {string} query
 * @param {number} [limit]
 */
export function filterCitiesByState(state, query, limit = 12) {
  const cities = getCitiesForState(state);
  const q = String(query ?? '').trim().toLowerCase();
  if (!q) return cities.slice(0, limit);
  return cities
    .filter((city) => city.toLowerCase().startsWith(q) || city.toLowerCase().includes(q))
    .slice(0, limit);
}

export function isKnownCityInState(state, city) {
  const normalized = String(city ?? '').trim().toLowerCase();
  if (!normalized) return false;
  return getCitiesForState(state).some((c) => c.toLowerCase() === normalized);
}

export function resolveCityInState(state, city) {
  const cities = getCitiesForState(state);
  const normalized = String(city ?? '').trim().toLowerCase();
  return cities.find((c) => c.toLowerCase() === normalized) ?? null;
}
