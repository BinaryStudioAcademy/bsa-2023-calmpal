import { UploadFileContentTypeToExtensions } from './upload-file-content-type-to-extensions.js';

const ExceptionRule = {
  UPLOAD_FILE_CONTENT_TYPES: Object.keys(UploadFileContentTypeToExtensions),
  UPLOAD_FILE_EXTENSIONS: Object.values(UploadFileContentTypeToExtensions),
} as const;

export { ExceptionRule };
