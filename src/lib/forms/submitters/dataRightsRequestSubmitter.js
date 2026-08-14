import { FORM_TYPES } from '../constants/formTypes.js';
import { validateDataRightsRequestForm } from '../validators/dataRightsRequestValidator.js';
import { transformDataRightsRequestData } from '../transformers/dataRightsRequestTransformer.js';
import { createFormSubmitter } from '../utils/createFormSubmitter.js';

export const submitDataRightsRequest = createFormSubmitter({
  formType: FORM_TYPES.DATA_RIGHTS_REQUEST,
  validate: validateDataRightsRequestForm,
  transform: transformDataRightsRequestData,
  defaultSourcePage: 'data_rights_request',
});
