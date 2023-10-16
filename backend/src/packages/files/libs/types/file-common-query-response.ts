import { type ContentType } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

type FileCommonQueryResponse = {
  id: number;
  createdAt: string;
  updatedAt: string;
  url: string;
  contentType: ValueOf<typeof ContentType>;
};

export { type FileCommonQueryResponse };
