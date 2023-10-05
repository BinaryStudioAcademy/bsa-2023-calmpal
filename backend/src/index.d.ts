import 'fastify';

import { type FileUploadRequestDto } from '#packages/files/files.js';
import { type UserAuthResponseDto } from '#packages/users/users.js';

declare module 'fastify' {
  interface FastifyRequest {
    user?: UserAuthResponseDto;
    fileBuffer?: FileUploadRequestDto;
  }
}
