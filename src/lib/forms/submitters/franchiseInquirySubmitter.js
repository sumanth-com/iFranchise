import { FORM_TYPES } from '../constants/formTypes.js';
import { validateFranchiseInquiryForm } from '../validators/franchiseInquiryValidator.js';
import { transformFranchiseInquiryData } from '../transformers/franchiseInquiryTransformer.js';
import { createFormSubmitter } from '../utils/createFormSubmitter.js';

export const submitFranchiseInquiry = createFormSubmitter({
  formType: FORM_TYPES.FRANCHISE_INQUIRY,
  validate: validateFranchiseInquiryForm,
  transform: transformFranchiseInquiryData,
  defaultSourcePage: 'franchise_details_inquiry',
});
