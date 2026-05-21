import { FORM_TYPES } from '../constants/formTypes.js';
import { validateJobApplicationForm } from '../validators/jobApplicationValidator.js';
import { transformJobApplicationData } from '../transformers/jobApplicationTransformer.js';
import { createFormSubmitter } from '../utils/createFormSubmitter.js';

export const submitJobApplication = createFormSubmitter({
  formType: FORM_TYPES.JOB_APPLICATION,
  validate: validateJobApplicationForm,
  transform: transformJobApplicationData,
  defaultSourcePage: 'career_detail',
});
