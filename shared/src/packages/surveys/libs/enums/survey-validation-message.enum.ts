const SurveyValidationMessage = {
  USER_ID_REQUIRED: 'User id is required.',
  MAXIMUM_PREFERENCE_ITEM_LENGTH: 'Preference`s item must be less than 1000.',
  MINIMUM_PREFERENCE_LENGTH: 'Preferences should have at least 1 item.',
} as const;

export { SurveyValidationMessage };
