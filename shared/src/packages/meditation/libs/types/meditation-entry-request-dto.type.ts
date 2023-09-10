import { type ContentType } from '#libs/enums/enums.js';
import { type ValueOf } from '#libs/types/value-of.type.js';

type MeditationEntryRequestDto = {
  topicName: string;
  mediaUrl: string;
  contentType: ValueOf<typeof ContentType>;
};

export { type MeditationEntryRequestDto };
