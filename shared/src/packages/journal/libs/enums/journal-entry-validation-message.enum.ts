import { JourneyEntryValidationRule } from './journal-entry-validation-rule.enum.js';

const JournalEntryValidationMessage = {
  TITLE_REQUIRED: 'Title is required.',
  TITLE_MUST_BE_LESS_THAN: `Title must be less than ${JourneyEntryValidationRule.MAXIMUM_TITLE_LENGTH} characters.`,
  INVALID_TEXT_FORMAT:
    'Invalid text format. It should start with "<p" and end with "</p>".',
} as const;

export { JournalEntryValidationMessage };
