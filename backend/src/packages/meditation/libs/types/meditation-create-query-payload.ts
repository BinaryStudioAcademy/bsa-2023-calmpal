import { type ContentType } from '#libs/enums/enums.js';
import { type ValueOf } from '#libs/types/types.js';

type MeditationCreateQueryPayload = {
  id: number;
  mediaUrl: string;
  contentType: ValueOf<typeof ContentType>;
  topicId: number | null;
};

export { type MeditationCreateQueryPayload };
