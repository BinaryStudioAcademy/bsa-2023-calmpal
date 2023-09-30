import joi from 'joi';

import { OTHER_CATEGORY } from '../constants/constants.js';
import {
  SurveyValidationMessage,
  SurveyValidationRule,
} from '../enums/enums.js';

type SurveyInputDto = {
  preferences?: string[];
  feelings?: string[];
  goals?: string[];
  worries?: string[];
  journalingExperience?: string;
  meditationExperience?: string;
  other?: string;
};

const createStepSurveyForm = joi.object<SurveyInputDto, true>({
  preferences: joi
    .array()
    .items(joi.string())
    .min(SurveyValidationRule.MINIMUM_PREFERENCE_LENGTH)
    .messages({
      'array.min': SurveyValidationMessage.OPTION_REQUIRED,
    })
    .optional(),
  feelings: joi.array().items(joi.string()).optional(),
  goals: joi.array().items(joi.string()).optional(),
  worries: joi.array().items(joi.string()).optional(),
  meditationExperience: joi.string().optional(),
  journalingExperience: joi.string().optional(),

  other: joi
    .string()
    .optional()
    .when('preferences', {
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
    })
    .when('feelings', {
      then: joi.allow(''),
    })
    .when('goals', {
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
    })
    .when('worries', {
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
    })
    .when('meditationExperience', {
      then: joi.allow(''),
    })
    .when('journalingExperience', {
      then: joi.allow(''),
    }),
});

export { createStepSurveyForm };
