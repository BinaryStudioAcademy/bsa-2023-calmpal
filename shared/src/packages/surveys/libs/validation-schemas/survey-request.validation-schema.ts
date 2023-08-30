import joi from 'joi';

import { SurveyValidationMessage } from '../enums/enums.js';
import { type SurveyRequestDto } from '../types/types.js';

const SurveyValidationSchema = joi.object<SurveyRequestDto, true>({
  userId: joi.number().integer().required().messages({
    'any.required': SurveyValidationMessage.USER_ID_REQUIRED,
  }),
  preferences: joi.array().items(joi.string()).required().messages({
    'any.required': SurveyValidationMessage.PREFERENCES_REQUIRED,
  }),
});

export { SurveyValidationSchema };
