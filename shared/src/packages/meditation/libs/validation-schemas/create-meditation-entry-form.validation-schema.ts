import joi from 'joi';

import { ContentType } from '#libs/enums/enums.js';
import { FileUploadValidationRule } from '#packages/files/files.js';

import { MeditationEntryValidationMessage } from '../enums/enums.js';
import { type MeditationEntryCreateForm } from '../types/types.js';

const createMeditationEntryForm = joi.object<MeditationEntryCreateForm, true>({
  title: joi.string().trim().required().messages({
    'any.required': MeditationEntryValidationMessage.TOPIC_REQUIRED,
    'string.empty': MeditationEntryValidationMessage.TOPIC_REQUIRED,
  }),
  file: joi.object().required().unknown(true).messages({
    'object.base': MeditationEntryValidationMessage.FILE_REQUIRED,
  }),
  fileType: joi.string().valid(ContentType.MPEG).required().messages({
    'any.only': MeditationEntryValidationMessage.MPEG_REQUIRED,
  }),
  fileSize: joi
    .number()
    .max(FileUploadValidationRule.MAXIMUM_FILE_SIZE)
    .required()
    .messages({
      'number.max': MeditationEntryValidationMessage.SIZE_TOO_BIG,
    }),
});

export { createMeditationEntryForm };
