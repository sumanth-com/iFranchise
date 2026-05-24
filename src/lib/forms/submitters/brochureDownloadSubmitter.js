import { FORM_TYPES } from '../constants/formTypes.js';
import { validateBrochureDownloadForm } from '../validators/brochureDownloadValidator.js';
import { transformBrochureDownloadData } from '../transformers/brochureDownloadTransformer.js';
import { createFormSubmitter } from '../utils/createFormSubmitter.js';

export const submitBrochureDownload = createFormSubmitter({
  formType: FORM_TYPES.BROCHURE_DOWNLOAD,
  validate: validateBrochureDownloadForm,
  transform: transformBrochureDownloadData,
  defaultSourcePage: 'franchise_details_brochure',
});
