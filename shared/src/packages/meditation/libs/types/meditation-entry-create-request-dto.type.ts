import { type MultipartFile } from '@fastify/multipart';

type MeditationEntryCreateRequestDto = {
  file: MultipartFile;
};

export { type MeditationEntryCreateRequestDto };
