import { ContentType } from '../../../../libs/enums/content-type.enum.js';

const FileUploadContentTypeToExtension = {
  [ContentType.PNG]: 'PNG',
  [ContentType.JPEG]: 'JPEG',
  [ContentType.MPEG]: 'MPEG',
} as const;

export { FileUploadContentTypeToExtension };
