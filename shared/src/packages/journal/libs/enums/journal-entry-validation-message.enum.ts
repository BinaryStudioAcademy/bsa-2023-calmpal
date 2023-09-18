import { JourneyEntryValidationRule } from './journal-entry-validation-rule.enum.js';

const JournalEntryValidationMessage = {
  TITLE_REQUIRED: 'Title is required.',
  TITLE_MUST_BE_LESS_THAN_255: `Title must be less than ${JourneyEntryValidationRule.MAXIMUM_TITLE_LENGTH} characters.`,
  TEXT_REQUIRED: 'Text is required.',
} as const;

export { JournalEntryValidationMessage };
