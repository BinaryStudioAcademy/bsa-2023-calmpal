import { type ContentType, type ValueOf } from '#index.js';

type FileUploadRequestDto = {
  buffer: Buffer;
  contentType: ValueOf<typeof ContentType>;
};

export { type FileUploadRequestDto };
