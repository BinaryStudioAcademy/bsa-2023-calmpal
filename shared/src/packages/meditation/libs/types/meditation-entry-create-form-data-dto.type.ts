import { type MultipartFile, type MultipartValue } from '@fastify/multipart';

type MeditationEntryCreateFormDataDto = {
  name: MultipartValue<string>;
  file: MultipartFile;
};

export { type MeditationEntryCreateFormDataDto };
