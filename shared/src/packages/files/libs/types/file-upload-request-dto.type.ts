import { type ContentType } from '#libs/enums/enums.js';
import { type ValueOf } from '#libs/types/types.js';

type FileUploadRequestDto = {
  buffer: Buffer;
  name?: string;
  contentType: ValueOf<typeof ContentType>;
};

export { type FileUploadRequestDto };
