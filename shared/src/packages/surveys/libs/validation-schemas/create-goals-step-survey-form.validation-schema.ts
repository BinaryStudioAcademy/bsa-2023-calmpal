import joi from 'joi';

import {
  SurveyValidationMessage,
  SurveyValidationRule,
} from '../enums/enums.js';

type SurveyInputDto = {
  goals: string[];
  other: string;
};

const createGoalsSurveyForm = joi.object<SurveyInputDto, true>({
  goals: joi.array().items(joi.string()),
  other: joi.string().when('goals', {
    is: joi.array().has(joi.string().valid('Other')),
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

export { createGoalsSurveyForm };
