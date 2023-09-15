import joi from 'joi';

import { ContentType } from '#libs/enums/enums.js';

import {
  MeditationEntryValidationMessage,
  MeditationEntryValidationRule,
} from '../enums/enums.js';
import { type MeditationEntryCreateForm } from '../types/types.js';

const createMeditationEntry = joi.object<MeditationEntryCreateForm, true>({
  title: joi.string().trim().required().messages({
    'any.required': MeditationEntryValidationMessage.TOPIC_REQUIRED,
    'string.empty': MeditationEntryValidationMessage.TOPIC_REQUIRED,
  }),
  file: joi
    .object({
      type: joi.string().valid(ContentType.MPEG).required().messages({
        'any.only': MeditationEntryValidationMessage.MPEG_REQUIRED,
      }),
      size: joi
        .number()
        .max(MeditationEntryValidationRule.MAXIMUM_FILE_SIZE)
        .required()
        .messages({
          'number.max': MeditationEntryValidationMessage.SIZE_TOO_BIG,
        }),
    })
    .required()
    .unknown(true)
    .messages({
      'object.base': MeditationEntryValidationMessage.FILE_REQUIRED,
    }),
});

export { createMeditationEntry };
