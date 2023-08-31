import { type ContentType } from '#libs/enums/enums.js';
import { type ValueOf } from '#libs/types/types.js';

type S3FileUploadRequestDto = {
  fileKey: string;
  buffer: Buffer;
  contentType: ValueOf<typeof ContentType>;
};

export { type S3FileUploadRequestDto };
