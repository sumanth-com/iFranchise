import { FORM_TYPES } from '../constants/formTypes.js';
import { validateApplicationForm } from '../validators/applicationValidator.js';
import { transformApplicationData } from '../transformers/applicationTransformer.js';
import { createFormSubmitter } from '../utils/createFormSubmitter.js';

export const submitBrandApplication = createFormSubmitter({
  formType: FORM_TYPES.BRAND_APPLICATION,
  validate: validateApplicationForm,
  transform: transformApplicationData,
  defaultSourcePage: 'brand_owners_page',
});
