import { FileUploadContentTypeToExtension } from './file-upload-content-type-to-extension.enum.js';

const FileUploadValidationRule = {
  MAXIMUM_FILE_SIZE: 10_000_000,
  UPLOAD_FILE_CONTENT_TYPES: Object.keys(FileUploadContentTypeToExtension),
  UPLOAD_FILE_EXTENSIONS: Object.values(FileUploadContentTypeToExtension),
} as const;

export { FileUploadValidationRule };
