import joi from 'joi';

import {
  SurveyValidationMessage,
  SurveyValidationRule,
} from '../enums/enums.js';
import { type SurveyRequestDto } from '../types/types.js';

const CreateSurveyValidationSchema = joi.object<SurveyRequestDto, true>({
  userId: joi.number().integer().required().messages({
    'any.required': SurveyValidationMessage.USER_ID_REQUIRED,
    'string.empty': SurveyValidationMessage.USER_ID_REQUIRED,
  }),
  preferences: joi
    .array()
    .items(
      joi
        .string()
        .max(SurveyValidationRule.MAXIMUM_PREFERENCE_ITEM_LENGTH)
        .min(SurveyValidationRule.MINIMUM_PREFERENCE_LENGTH),
    )
    .required()
    .messages({
      'string.max': SurveyValidationMessage.MAXIMUM_PREFERENCE_ITEM_LENGTH,
      'array.min': SurveyValidationMessage.MINIMUM_PREFERENCE_LENGTH,
    }),
});

export { CreateSurveyValidationSchema };
