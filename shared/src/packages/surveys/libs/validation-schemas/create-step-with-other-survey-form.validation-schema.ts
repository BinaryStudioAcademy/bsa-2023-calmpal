import joi from 'joi';

import { PREFERENCES_OTHER_CATEGORY } from '../constants/constants.js';
import {
  SurveyValidationMessage,
  SurveyValidationRule,
} from '../enums/enums.js';

type SurveyInputDto = {
  preferences?: string[];
  goals?: string[];
  worries?: string[];
  other: string;
};

const createStepWithOtherSurveyForm = joi.object<SurveyInputDto, true>({
  preferences: joi
    .array()
    .items(joi.string())
    .min(SurveyValidationRule.MINIMUM_PREFERENCE_LENGTH)
    .messages({
      'array.min': SurveyValidationMessage.OPTION_REQUIRED,
    })
    .optional(),
  goals: joi.array().items(joi.string()).optional(),
  worries: joi.array().items(joi.string()).optional(),

  other: joi
    .string()
    .when('preferences', {
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
    })
    .when('goals', {
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
    })
    .when('worries', {
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

export { createStepWithOtherSurveyForm };
