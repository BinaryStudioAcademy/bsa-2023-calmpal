const JourneyEntryValidationRule = {
  MAXIMUM_TITLE_LENGTH: 300,
  TEXT_PATTERN: /^<p\b[^>]*>.*<\/p>$/,
} as const;

export { JourneyEntryValidationRule };
