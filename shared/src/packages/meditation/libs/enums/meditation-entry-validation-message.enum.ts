const MeditationEntryValidationMessage = {
  NAME_REQUIRED: 'Meditation name is required.',
  TEXT_REQUIRED: 'Only text can be as meditation name.',
  MEDIA_URL_REQUIRED: 'Media file url is required.',
  FILE_REQUIRED: 'File is required.',
  FILE_NAME_REQUIRED: 'File name is required.',
  SIZE_TOO_BIG: 'Size of an uploaded file should be less than 10MB.',
  MPEG_REQUIRED: 'Only files with MP3 extension are allowed.',
} as const;

export { MeditationEntryValidationMessage };
