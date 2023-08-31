import { type ContentType, type ValueOf } from '#index.js';

type AWSFileUploadRequestDto = {
  fileKey: string;
  buffer: Buffer;
  contentType: ValueOf<typeof ContentType>;
};

export { type AWSFileUploadRequestDto };
