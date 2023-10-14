import { type ContentType } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/value-of.type.js';

type MeditationEntryGetAllItemResponseDto = {
  id: number;
  name: string;
  mediaUrl: string;
  contentType: ValueOf<typeof ContentType>;
  createdAt: Date;
  updatedAt: Date;
};

export { type MeditationEntryGetAllItemResponseDto };
