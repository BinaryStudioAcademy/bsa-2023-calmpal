import { type ContentType, type ValueOf } from '#index.js';

type S3FileUploadRequestDto = {
  fileKey: string;
  buffer: Buffer;
  contentType: ValueOf<typeof ContentType>;
};

export { type S3FileUploadRequestDto };
