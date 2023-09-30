import joi from 'joi';

import { DELETE_ACCOUNT_OTHER_CATEGORY } from '../constants/constants.js';
import { UserValidationMessage, UserValidationRule } from '../enums/enums.js';
import { type DeleteAccountFormPayload } from '../types/types.js';

const deleteAccountForm = joi.object<DeleteAccountFormPayload, true>({
  checkboxes: joi
    .array()
    .items(joi.string())
    .min(UserValidationRule.MINIMUM_CHECKBOXES_COUNT)
    .messages({
      'array.min': UserValidationMessage.OPTION_REQUIRED,
    }),
  description: joi.string().when('checkboxes', {
    is: joi.array().has(joi.string().valid(DELETE_ACCOUNT_OTHER_CATEGORY)),
    then: joi.string().trim().required().messages({
      'any.required': UserValidationMessage.TEXT_REQUIRED,
      'string.empty': UserValidationMessage.TEXT_REQUIRED,
    }),
    otherwise: joi.allow(''),
  }),
});

export { deleteAccountForm };
