const MeditationEntryValidationMessage = {
  TOPIC_REQUIRED: 'Topic name is required.',
  FILE_REQUIRED: 'File is required.',
  FILE_NAME_REQUIRED: 'File name is required.',
  SIZE_TOO_BIG: 'Size of an uploaded file should be less than 10MB.',
  MPEG_REQUIRED: 'Only files with MP3 extension are allowed.',
} as const;

export { MeditationEntryValidationMessage };
