const JournalEntryValidationMessage = {
  USER_ID_MUST_BE_NUMBER: 'User id must be a number.',
  TITLE_REQUIRED: 'Title is required.',
  TITLE_MUST_BE_LESS_THAN_255: 'Title must be less than 255 characters.',
  TEXT_REQUIRED: 'Text is required.',
} as const;

export { JournalEntryValidationMessage };
