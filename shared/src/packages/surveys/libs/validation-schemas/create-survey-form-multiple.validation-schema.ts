import joi from 'joi';

import { PREFERENCES_OTHER_CATEGORY } from '../constants/constants.js';
import {
  SurveyValidationMessage,
  SurveyValidationRule,
} from '../enums/enums.js';
import { type SurveyMultipleInputDto } from '../types/types.js';

const createSurveyFormMultiple = joi.object<SurveyMultipleInputDto, true>({
  preferences: joi
    .array()
    .items(joi.string())
    .min(SurveyValidationRule.MINIMUM_PREFERENCE_LENGTH)
    .messages({
      'array.min': SurveyValidationMessage.OPTION_REQUIRED,
    }),
  other: joi.string().when('preferences', {
    is: joi.array().has(joi.string().valid(PREFERENCES_OTHER_CATEGORY)),
    then: joi
      .string()
      .trim()
      .min(SurveyValidationRule.MINIMUM_PREFERENCE_LENGTH)
      .max(SurveyValidationRule.MAXIMUM_PREFERENCE_ITEM_LENGTH)
      .required()
      .messages({
        'any.required': SurveyValidationMessage.TEXT_REQUIRED,
        'string.empty': SurveyValidationMessage.TEXT_REQUIRED,
      }),
    otherwise: joi.allow(''),
  }),
});

export { createSurveyFormMultiple };
