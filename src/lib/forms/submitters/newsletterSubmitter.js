import { FORM_TYPES } from '../constants/formTypes.js';
import { validateNewsletterForm } from '../validators/newsletterValidator.js';
import { transformNewsletterData } from '../transformers/newsletterTransformer.js';
import { runFormSubmission } from '../utils/submitPipeline.js';

export async function submitNewsletterForm(formData, sourcePage = 'blog_sidebar') {
  return runFormSubmission({
    formType: FORM_TYPES.NEWSLETTER,
    rawData: formData,
    sourcePage,
    validate: validateNewsletterForm,
    transform: transformNewsletterData,
  });
}
