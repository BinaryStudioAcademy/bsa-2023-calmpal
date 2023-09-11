import joi from 'joi';

import { JournalEntryValidationMessage } from '../enums/enums.js';
import { type JournalEntryCreateRequestDto } from '../types/types.js';

const createJournalEntryValidationSchema = joi.object<
  JournalEntryCreateRequestDto,
  true
>({
  title: joi.string().trim().required().messages({
    'any.required': JournalEntryValidationMessage.TITLE_REQUIRED,
    'string.empty': JournalEntryValidationMessage.TITLE_REQUIRED,
  }),
  text: joi.string().trim().required().messages({
    'any.required': JournalEntryValidationMessage.TEXT_REQUIRED,
    'string.empty': JournalEntryValidationMessage.TEXT_REQUIRED,
  }),
});

export { createJournalEntryValidationSchema };
