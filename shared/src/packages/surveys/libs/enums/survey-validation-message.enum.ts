const SurveyValidationMessage = {
  USER_ID_MUST_BE_NUMBER: 'User id must be a number.',
  MAXIMUM_PREFERENCE_ITEM_LENGTH:
    'Preference`s item must be less than 1000 characters.',
  MINIMUM_PREFERENCE_LENGTH: 'Preferences should have at least 1 item.',
} as const;

export { SurveyValidationMessage };
