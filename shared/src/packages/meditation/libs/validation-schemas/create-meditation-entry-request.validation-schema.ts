import joi from 'joi';

import { ContentType } from '#libs/enums/enums.js';

import { MeditationEntryValidationMessage } from '../enums/enums.js';
import { type MeditationEntryCreateRequestDto } from '../types/types.js';

const createMeditationEntryRequest = joi.object<
  MeditationEntryCreateRequestDto,
  true
>({
  mediaUrl: joi.string().trim().required().messages({
    'any.required': MeditationEntryValidationMessage.MEDIA_URL_REQUIRED,
    'string.required': MeditationEntryValidationMessage.MEDIA_URL_REQUIRED,
    'string.empty': MeditationEntryValidationMessage.MEDIA_URL_REQUIRED,
  }),
  contentType: joi.string().valid(ContentType.MPEG).required().messages({
    'any.only': MeditationEntryValidationMessage.MPEG_REQUIRED,
  }),
});

export { createMeditationEntryRequest };
