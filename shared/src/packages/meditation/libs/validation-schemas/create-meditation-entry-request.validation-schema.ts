import joi from 'joi';

import { ContentType } from '#libs/enums/enums.js';

import { MeditationEntryValidationMessage } from '../enums/enums.js';
import { type MeditationEntryCreateRequestDto } from '../types/types.js';

const createMeditationEntryRequest = joi.object<
  MeditationEntryCreateRequestDto,
  true
>({
  file: joi
    .object({
      mimetype: joi.string().valid(ContentType.MPEG).required().messages({
        'any.only': MeditationEntryValidationMessage.MPEG_REQUIRED,
      }),
    })
    .unknown(true)
    .required(),
});

export { createMeditationEntryRequest };
