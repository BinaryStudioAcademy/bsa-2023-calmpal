import joi from 'joi';

import {
  SurveyValidationMessage,
  SurveyValidationRule,
} from '../enums/enums.js';
import { type SurveyRequestDto } from '../types/types.js';

const createSurveyValidationSchema = joi.object<SurveyRequestDto, true>({
  userId: joi.number().integer().strict().required().messages({
    'number.base': SurveyValidationMessage.USER_ID_MUST_BE_NUMBER,
  }),
  preferences: joi
    .array()
    .items(
      joi
        .string()
        .max(SurveyValidationRule.MAXIMUM_PREFERENCE_ITEM_LENGTH)
        .min(SurveyValidationRule.MINIMUM_PREFERENCE_LENGTH)
        .messages({
          'string.max': SurveyValidationMessage.MAXIMUM_PREFERENCE_ITEM_LENGTH,
        }),
    )
    .required()
    .messages({
      'array.min': SurveyValidationMessage.MINIMUM_PREFERENCE_LENGTH,
    }),
  journaling_experience: joi
    .array()
    .items(
      joi
        .string()
        .max(SurveyValidationRule.MAXIMUM_PREFERENCE_ITEM_LENGTH)
        .min(SurveyValidationRule.MINIMUM_PREFERENCE_LENGTH)
        .messages({
          'string.max': SurveyValidationMessage.MAXIMUM_PREFERENCE_ITEM_LENGTH,
        }),
    )
    .required()
    .messages({
      'array.min': SurveyValidationMessage.MINIMUM_PREFERENCE_LENGTH,
    }),
});

export { createSurveyValidationSchema };
