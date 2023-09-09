import joi from 'joi';

import { JournalEntryValidationMessage } from '../enums/enums.js';
import { type JournalEntryCreateRequestDto } from '../types/types.js';

const createJournalEntryValidationSchema = joi.object<
  JournalEntryCreateRequestDto,
  true
>({
  userId: joi.number().integer().strict().required().messages({
    'number.base': JournalEntryValidationMessage.USER_ID_MUST_BE_NUMBER,
  }),
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
