import { type ContentType } from '#libs/enums/enums.js';
import { type ValueOf } from '#libs/types/types.js';

type FileGetAllItemResponseDto = {
  id: number;
  url: string;
  contentType: ValueOf<typeof ContentType>;
  createdAt: Date;
  updatedAt: Date;
};

export { type FileGetAllItemResponseDto };
