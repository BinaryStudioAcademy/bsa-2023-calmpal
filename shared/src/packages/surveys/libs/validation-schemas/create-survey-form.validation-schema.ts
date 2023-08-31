import joi from 'joi';

import { PREFERENCES_OTHER_CATEGORY } from '../constants/constants.js';
import { SurveyValidationMessage } from '../enums/enums.js';
import { type SurveyInputDto } from '../types/types.js';

const MINIMUM_ARRAY_LENGTH = 1;

const createSurveyForm = joi.object<SurveyInputDto, true>({
  preferences: joi
    .array()
    .items(joi.string())
    .min(MINIMUM_ARRAY_LENGTH)
    .messages({
      'array.min': SurveyValidationMessage.OPTION_REQUIRED,
    }),
  other: joi.string().when('preferences', {
    is: joi
      .array()
      .has(joi.string().valid(PREFERENCES_OTHER_CATEGORY))
      .min(MINIMUM_ARRAY_LENGTH),
    then: joi.string().trim().required().messages({
      'any.required': SurveyValidationMessage.TEXT_REQUIRED,
      'string.empty': SurveyValidationMessage.TEXT_REQUIRED,
    }),
    otherwise: joi.allow(''),
  }),
});

export { createSurveyForm };
