import { ContentType } from './content-type.enum.js';

const UploadFileContentTypeToExtensions = {
  [ContentType.PNG]: 'PNG',
  [ContentType.JPEG]: 'JPEG',
  [ContentType.MPEG]: 'MPEG',
} as const;

export { UploadFileContentTypeToExtensions };
