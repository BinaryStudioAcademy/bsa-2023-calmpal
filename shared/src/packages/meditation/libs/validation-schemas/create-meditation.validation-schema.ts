import joi from 'joi';

import { ContentType } from '#index.js';

import { MeditationValidationMessage } from '../enums/enums.js';
import { type MeditationCreateValidation } from '../types/types.js';

const MAXIMUM_FILE_SIZE = 10_485_760;

const createMeditation = joi.object<MeditationCreateValidation, true>({
  title: joi.string().trim().required().messages({
    'any.required': MeditationValidationMessage.TITLE_REQUIRED,
    'string.required': MeditationValidationMessage.TITLE_REQUIRED,
    'string.empty': MeditationValidationMessage.TITLE_REQUIRED,
  }),
  file: joi
    .object()
    .keys({
      name: joi.string().trim().required().messages({
        'any.required': MeditationValidationMessage.FILE_NAME_REQUIRED,
        'string.required': MeditationValidationMessage.FILE_NAME_REQUIRED,
        'string.empty': MeditationValidationMessage.FILE_NAME_REQUIRED,
      }),
      type: joi.string().valid(ContentType.MPEG).required().messages({
        'any.only': MeditationValidationMessage.MPEG_REQUIRED,
      }),
      size: joi.number().max(MAXIMUM_FILE_SIZE).required().messages({
        'number.max': MeditationValidationMessage.FILE_REQUIRED,
      }),
    })
    .required()
    .messages({
      'object.base': MeditationValidationMessage.FILE_REQUIRED,
    }),
});

export { createMeditation };
