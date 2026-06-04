import { FORM_TYPES } from '../constants/formTypes.js';
import { validateCareerApplicationForm } from '../validators/careerApplicationValidator.js';
import { transformCareerApplicationData } from '../transformers/careerApplicationTransformer.js';
import { createFormSubmitter } from '../utils/createFormSubmitter.js';

export const submitCareerApplication = createFormSubmitter({
  formType: FORM_TYPES.CAREER_APPLICATION,
  validate: validateCareerApplicationForm,
  transform: transformCareerApplicationData,
  defaultSourcePage: 'careers_role_detail',
});
