import joi from 'joi';

import {
  SurveyTextareaOptions,
  SurveyValidationMessage,
} from '../enums/enums.js';
import { type SurveyInputDto } from '../types/types.js';

const MINIMUM_ARRAY_LENGTH = 1;

const surveyInput = joi.object<SurveyInputDto, true>({
  options: joi.array().items(joi.string()).min(MINIMUM_ARRAY_LENGTH).messages({
    'array.min': SurveyValidationMessage.OPTION_REQUIRED,
  }),
  textarea: joi.string().when('options', {
    is: joi
      .array()
      .has(joi.string().valid(SurveyTextareaOptions.OTHER))
      .min(MINIMUM_ARRAY_LENGTH),
    then: joi.string().trim().required().messages({
      'any.required': SurveyValidationMessage.TEXT_REQUIRED,
      'string.empty': SurveyValidationMessage.TEXT_REQUIRED,
    }),
    otherwise: joi.allow(''),
  }),
});

export { surveyInput };
