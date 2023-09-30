import { type MultipartFile, type MultipartValue } from '@fastify/multipart';

type MeditationEntryCreateRequestDto = {
  name: MultipartValue<string>;
  file: MultipartFile;
};

export { type MeditationEntryCreateRequestDto };
