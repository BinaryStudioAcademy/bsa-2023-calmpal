import { type ContentType, type ValueOf } from '#index.js';

type FileGetAllItemResponseDto = {
  id: number;
  url: string;
  contentType: ValueOf<typeof ContentType>;
};

export { type FileGetAllItemResponseDto };
