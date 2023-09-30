import joi from 'joi';

import {
  JournalEntryValidationMessage,
  JourneyEntryValidationRule,
} from '../enums/enums.js';
import { type JournalEntryCreateRequestDto } from '../types/types.js';

const createJournalEntry = joi.object<JournalEntryCreateRequestDto, true>({
  title: joi
    .string()
    .trim()
    .required()
    .max(JourneyEntryValidationRule.MAXIMUM_TITLE_LENGTH)
    .messages({
      'any.required': JournalEntryValidationMessage.TITLE_REQUIRED,
      'string.empty': JournalEntryValidationMessage.TITLE_REQUIRED,
      'string.max': JournalEntryValidationMessage.TITLE_MUST_BE_LESS_THAN,
    }),
  text: joi
    .string()
    .trim()
    .allow('')
    .pattern(JourneyEntryValidationRule.TEXT_PATTERN)
    .messages({
      'string.pattern.base': JournalEntryValidationMessage.INVALID_TEXT_FORMAT,
    }),
});

export { createJournalEntry };
