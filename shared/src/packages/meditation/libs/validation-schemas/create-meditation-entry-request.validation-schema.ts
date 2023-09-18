import joi from 'joi';

import { ContentType } from '#libs/enums/enums.js';

import { MeditationEntryValidationMessage } from '../enums/enums.js';
import { type MeditationEntryCreateFormDataDto } from '../types/types.js';

const createMeditationEntryRequest = joi.object<
  MeditationEntryCreateFormDataDto,
  true
>({
  name: joi
    .object({
      value: joi.string().required().messages({
        'any.required': MeditationEntryValidationMessage.NAME_REQUIRED,
        'string.emplty': MeditationEntryValidationMessage.NAME_REQUIRED,
      }),
      mimetype: joi.string().valid(ContentType.TEXT).required().messages({
        'any.only': MeditationEntryValidationMessage.MPEG_REQUIRED,
      }),
    })
    .unknown(true)
    .required()
    .messages({
      'object.base': MeditationEntryValidationMessage.NAME_REQUIRED,
    }),
  file: joi
    .object({
      mimetype: joi.string().valid(ContentType.MPEG).required().messages({
        'any.only': MeditationEntryValidationMessage.MPEG_REQUIRED,
      }),
    })
    .unknown(true)
    .required()
    .messages({
      'object.base': MeditationEntryValidationMessage.FILE_REQUIRED,
    }),
});

export { createMeditationEntryRequest };
