import { type ContentType } from '#libs/enums/enums.js';
import { type ValueOf } from '#libs/types/value-of.type.js';

type FileUploadResponseDto = {
  url: string;
  contentType: ValueOf<typeof ContentType>;
};

export { type FileUploadResponseDto };
