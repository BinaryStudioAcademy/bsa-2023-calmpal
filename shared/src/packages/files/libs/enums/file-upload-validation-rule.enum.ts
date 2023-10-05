import { ContentType } from '#libs/enums/enums.js';

const FileUploadValidationRule = {
  MAXIMUM_FILE_SIZE: 20_000_000,
  UPLOAD_FILE_CONTENT_TYPES: [
    ContentType.PNG,
    ContentType.JPEG,
    ContentType.MP3,
  ],
  UPLOAD_FILE_EXTENSIONS: ['png', 'jpg', 'jpeg', 'mp3'],
} as const;

export { FileUploadValidationRule };
