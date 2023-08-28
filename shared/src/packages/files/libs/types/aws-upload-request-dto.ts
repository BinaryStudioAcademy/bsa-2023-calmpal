import { type ContentType, type ValueOf } from '#index.js';

type AWSUploadRequestDto = {
  fileKey: string;
  buffer: Buffer;
  contentType: ValueOf<typeof ContentType>;
};

export { type AWSUploadRequestDto };
