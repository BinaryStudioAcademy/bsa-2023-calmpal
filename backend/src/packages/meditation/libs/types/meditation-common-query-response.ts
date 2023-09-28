import { type ContentType } from '#libs/enums/enums.js';
import { type ValueOf } from '#libs/types/types.js';

type MeditationCommonQueryResponse = {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  mediaUrl: string;
  contentType: ValueOf<typeof ContentType>;
  duration: number;
  userId: number | null;
  topic?: {
    name: string;
  };
};

export { type MeditationCommonQueryResponse };
