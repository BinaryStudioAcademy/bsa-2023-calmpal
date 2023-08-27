import joi from 'joi';

import {
  SurveyTextareaOptions,
  SurveyValidationMessage,
} from '../enums/enums.js';
import { type SurveyInputDto } from '../types/types.js';

const minArrayLength = 1;

const surveyInput = joi.object<SurveyInputDto, true>({
  option: joi.array().items(joi.string()).min(minArrayLength).messages({
    'array.min': SurveyValidationMessage.OPTION_REQUIRED,
  }),
  textarea: joi.string().when('option', {
    is: joi
      .array()
      .has(joi.string().valid(SurveyTextareaOptions.OTHER))
      .min(minArrayLength),
    then: joi.string().trim().required().messages({
      'any.required': SurveyValidationMessage.TEXT_REQUIRED,
      'string.empty': SurveyValidationMessage.TEXT_REQUIRED,
    }),
    otherwise: joi.allow(''),
  }),
});

export { surveyInput };
