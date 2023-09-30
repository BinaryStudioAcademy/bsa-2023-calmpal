import joi from 'joi';

import { OTHER_CATEGORY } from '../constants/constants.js';
import {
  SurveyValidationMessage,
  SurveyValidationRule,
} from '../enums/enums.js';
import { type SurveyInputDto } from '../types/types.js';

const createSurveyForm = joi.object<SurveyInputDto, true>({
  preferences: joi
    .array()
    .items(joi.string())
    .min(SurveyValidationRule.MINIMUM_PREFERENCE_LENGTH)
    .messages({
      'array.min': SurveyValidationMessage.OPTION_REQUIRED,
    }),
  other: joi.string().when('preferences', {
    is: joi.array().has(joi.string().valid(OTHER_CATEGORY)),
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

export { createSurveyForm };
