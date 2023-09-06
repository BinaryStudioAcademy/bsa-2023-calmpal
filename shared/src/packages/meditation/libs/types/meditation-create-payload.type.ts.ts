import { type ContentType } from '#libs/enums/enums.js';
import { type ValueOf } from '#libs/types/types.js';

type MeditationCreatePayload = {
  topicName: string;
  file: File;
  contentType: ValueOf<typeof ContentType>;
};

export { type MeditationCreatePayload };
